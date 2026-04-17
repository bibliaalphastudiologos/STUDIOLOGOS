import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { collection, query, onSnapshot, doc, updateDoc, orderBy } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { auth, db } from '../lib/firebase';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const STATUS_LABELS = {
  pending: { label: 'Pendente', className: 'bg-yellow-600 hover:bg-yellow-600 text-white' },
  approved: { label: 'Aprovado', className: 'bg-green-600 hover:bg-green-600 text-white' },
  rejected: { label: 'Rejeitado', className: 'bg-red-600 hover:bg-red-600 text-white' },
};

export default function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    if (!loading && !isAdmin) navigate('/login');
  }, [isAdmin, loading, navigate]);

  useEffect(() => {
    if (!isAdmin) return;
    const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      setUsers(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, [isAdmin]);

  const updateStatus = async (uid, status) => {
    setActionLoading(uid + status);
    try {
      await updateDoc(doc(db, 'users', uid), { status, updatedAt: new Date() });
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = filter === 'all' ? users : users.filter(u => u.status === filter);
  const counts = {
    all: users.length,
    pending: users.filter(u => u.status === 'pending').length,
    approved: users.filter(u => u.status === 'approved').length,
    rejected: users.filter(u => u.status === 'rejected').length,
  };

  if (loading || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="border-b border-gray-800 bg-gray-900 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Painel Administrativo</h1>
            <p className="text-gray-400 text-sm">Gerenciamento de acessos — StudioLogos</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              {user?.photoURL && <img src={user.photoURL} className="w-8 h-8 rounded-full" alt="" />}
              <span>{user?.email}</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => signOut(auth).then(() => navigate('/'))} className="border-gray-700 text-gray-300 hover:bg-gray-800">
              Sair
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { key: 'all', label: 'Total', color: 'text-white', bg: 'bg-gray-800' },
            { key: 'pending', label: 'Pendentes', color: 'text-yellow-400', bg: 'bg-yellow-900/20 border border-yellow-800' },
            { key: 'approved', label: 'Aprovados', color: 'text-green-400', bg: 'bg-green-900/20 border border-green-800' },
            { key: 'rejected', label: 'Rejeitados', color: 'text-red-400', bg: 'bg-red-900/20 border border-red-800' },
          ].map(({ key, label, color, bg }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`rounded-xl p-4 text-left transition-all ${bg} ${filter === key ? 'ring-2 ring-blue-500' : ''}`}
            >
              <p className="text-gray-400 text-sm">{label}</p>
              <p className={`text-3xl font-bold ${color}`}>{counts[key]}</p>
            </button>
          ))}
        </div>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">
              {filter === 'all' ? 'Todos os usuários' : `Usuários — ${STATUS_LABELS[filter]?.label}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-4xl mb-3">📭</p>
                <p>Nenhum usuário nesta categoria.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map(u => (
                  <div key={u.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl bg-gray-800/60 border border-gray-700/50 p-4">
                    <div className="flex items-center gap-3">
                      {u.photoURL ? (
                        <img src={u.photoURL} alt={u.name} className="w-10 h-10 rounded-full flex-shrink-0" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 text-lg flex-shrink-0">
                          {u.name?.[0] || u.email?.[0] || '?'}
                        </div>
                      )}
                      <div>
                        <p className="text-white font-medium">{u.name || 'Sem nome'}</p>
                        <p className="text-gray-400 text-sm">{u.email}</p>
                        {u.createdAt?.seconds && (
                          <p className="text-gray-600 text-xs">
                            Solicitou em {new Date(u.createdAt.seconds * 1000).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge className={STATUS_LABELS[u.status]?.className || ''}>
                        {STATUS_LABELS[u.status]?.label || u.status}
                      </Badge>
                      {u.status !== 'approved' && (
                        <Button
                          size="sm"
                          onClick={() => updateStatus(u.id, 'approved')}
                          disabled={actionLoading === u.id + 'approved'}
                          className="bg-green-700 hover:bg-green-600 text-white text-xs"
                        >
                          ✓ Aprovar
                        </Button>
                      )}
                      {u.status !== 'rejected' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateStatus(u.id, 'rejected')}
                          disabled={actionLoading === u.id + 'rejected'}
                          className="border-red-700 text-red-400 hover:bg-red-900/30 text-xs"
                        >
                          ✗ Rejeitar
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
