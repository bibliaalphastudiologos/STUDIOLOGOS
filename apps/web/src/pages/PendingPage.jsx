import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';

export default function PendingPage() {
  const { user, userStatus } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const statusInfo = {
    pending: {
      icon: '⏳',
      title: 'Acesso Pendente',
      description: 'Seu cadastro foi recebido! Aguarde a aprovação do administrador.',
      color: 'text-yellow-400',
      bg: 'bg-yellow-900/20 border-yellow-700/50',
    },
    rejected: {
      icon: '❌',
      title: 'Acesso Negado',
      description: 'Infelizmente seu acesso não foi aprovado. Entre em contato com o administrador.',
      color: 'text-red-400',
      bg: 'bg-red-900/20 border-red-700/50',
    },
  };

  const info = statusInfo[userStatus] || statusInfo.pending;

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardHeader className="text-center">
          <div className="text-5xl mb-3">{info.icon}</div>
          <CardTitle className={`text-2xl ${info.color}`}>{info.title}</CardTitle>
          <CardDescription className="text-gray-400 text-base">{info.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {user && (
            <div className={`rounded-lg border p-4 ${info.bg}`}>
              <div className="flex items-center gap-3">
                {user.photoURL && (
                  <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full" />
                )}
                <div>
                  <p className="text-white font-medium">{user.displayName}</p>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
              </div>
            </div>
          )}
          {userStatus === 'pending' && (
            <div className="text-center text-gray-500 text-sm">
              <p>Você receberá acesso assim que o administrador aprovar seu cadastro.</p>
            </div>
          )}
          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            Sair da conta
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
