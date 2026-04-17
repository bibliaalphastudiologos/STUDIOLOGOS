import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';
import { auth } from '../lib/firebase';
import { Button } from '../components/ui/button';

export default function AdminPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Painel Admin</h1>
          <Button variant="outline" onClick={() => signOut(auth).then(() => navigate('/'))} className="border-gray-700 text-gray-300">
            Sair
          </Button>
        </div>
        <p className="text-gray-400">Bem-vindo, {user.email}</p>
      </div>
    </div>
  );
}
