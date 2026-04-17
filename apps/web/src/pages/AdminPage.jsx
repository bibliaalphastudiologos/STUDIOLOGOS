import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle, XCircle, Ban, RefreshCw, Users, Loader2 } from 'lucide-react';

const statusLabels = {
  pending: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800' },
  approved: { label: 'Aprovado', color: 'bg-green-100 text-green-800' },
  rejected: { label: 'Rejeitado', color: 'bg-red-100 text-red-800' },
  blocked: { label: 'Bloqueado', color: 'bg-gray-100 text-gray-800' },
};

export default function AdminPage() {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    if (!loading && !isAdmin) navigate('/', { replace: true });
  }, [isAdmin, loading]);

  useEffect(() => {
    if (isAdmin) loadUsers();
  }, [isAdmin]);

  async function loadUsers() {
    setFetching(true);
    try {
      const snap = await getDocs(collection(db, 'users'));
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      data.sort((a, b) => {
        const order = { pending: 0, approved: 1, blocked: 2, rejected: 3 };
        return (order[a.status] ?? 4) - (order[b.status] ?? 4);
      });
      setUsers(data);
    } catch (e) {
      console.error(e);
    } finally {
      setFetching(false);
    }
  }

  async function updateStatus(uid, status) {
    setUpdating(uid + status);
    try {
      await updateDoc(doc(db, 'users', uid), { status });
      setUsers(prev => prev.map(u => u.id === uid ? { ...u, status } : u));
    } catch (e) {
      console.error(e);
    } finally {
      setUpdating(null);
    }
  }

  if (loading || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      </div>
    );
  }

  if (!isAdmin) return null;

  const pending = users.filter(u => u.status === 'pending');
  const others = users.filter(u => u.status !== 'pending');

  return (
    <div className="min-h-screen bg-amber-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-amber-700" />
            <h1 className="text-2xl font-bold text-amber-900">Gerenciar Usuários</h1>
          </div>
          <Button variant="outline" onClick={loadUsers} className="gap-2">
            <RefreshCw className="h-4 w-4" /> Atualizar
          </Button>
        </div>

        {pending.length > 0 && (
          <Card className="border-yellow-200 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-yellow-800 flex items-center gap-2">
                <span className="bg-yellow-200 text-yellow-900 rounded-full px-2 py-0.5 text-sm font-bold">{pending.length}</span>
                Aguardando aprovação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pending.map(u => (
                <UserRow key={u.id} user={u} updating={updating} onUpdate={updateStatus} />
              ))}
            </CardContent>
          </Card>
        )}

        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-gray-700">Todos os usuários ({users.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {users.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-4">Nenhum usuário cadastrado ainda.</p>
            ) : (
              users.map(u => (
                <UserRow key={u.id} user={u} updating={updating} onUpdate={updateStatus} />
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function UserRow({ user, updating, onUpdate }) {
  const st = statusLabels[user.status] || statusLabels.pending;
  return (
    <div className="flex items-center justify-between gap-3 p-3 bg-white rounded-lg border border-gray-100">
      <div className="flex items-center gap-3 min-w-0">
        <Avatar className="h-9 w-9 flex-shrink-0">
          <AvatarImage src={user.photo} />
          <AvatarFallback className="bg-amber-100 text-amber-800 text-sm">
            {(user.name || user.email || '?')[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="font-medium text-sm text-gray-900 truncate">{user.name || 'Sem nome'}</p>
          <p className="text-xs text-gray-500 truncate">{user.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${st.color}`}>{st.label}</span>
        {user.status !== 'approved' && (
          <button
            onClick={() => onUpdate(user.id, 'approved')}
            disabled={!!updating}
            className="p-1 text-green-600 hover:text-green-800 disabled:opacity-40"
            title="Aprovar"
          >
            {updating === user.id + 'approved' ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
          </button>
        )}
        {user.status !== 'blocked' && (
          <button
            onClick={() => onUpdate(user.id, 'blocked')}
            disabled={!!updating}
            className="p-1 text-red-500 hover:text-red-700 disabled:opacity-40"
            title="Bloquear"
          >
            {updating === user.id + 'blocked' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Ban className="h-4 w-4" />}
          </button>
        )}
        {(user.status === 'approved' || user.status === 'blocked') && (
          <button
            onClick={() => onUpdate(user.id, 'rejected')}
            disabled={!!updating}
            className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-40"
            title="Rejeitar"
          >
            {updating === user.id + 'rejected' ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4" />}
          </button>
        )}
      </div>
    </div>
  );
}
