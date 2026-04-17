import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Clock, Ban, LogIn } from 'lucide-react';

export default function AccessModal({ open, onClose }) {
  const { user, isPending, isBlocked, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogin() {
    onClose();
    navigate('/login');
  }

  async function handleLogout() {
    onClose();
    await logout();
    navigate('/login');
  }

  if (!open) return null;

  if (!user) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <div className="flex justify-center mb-2">
              <LogIn className="h-10 w-10 text-amber-600" />
            </div>
            <DialogTitle className="text-center">Login necessário</DialogTitle>
            <DialogDescription className="text-center">
              Você precisa fazer login para acessar este produto.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">Fechar</Button>
            <Button onClick={handleLogin} className="flex-1 bg-amber-600 hover:bg-amber-700">Fazer Login</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  if (isBlocked) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <div className="flex justify-center mb-2">
              <Ban className="h-10 w-10 text-red-500" />
            </div>
            <DialogTitle className="text-center">Acesso negado</DialogTitle>
            <DialogDescription className="text-center">
              Seu acesso foi bloqueado. Entre em contato com o administrador.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleLogout} className="w-full">Sair</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <div className="flex justify-center mb-2">
            <Clock className="h-10 w-10 text-amber-500" />
          </div>
          <DialogTitle className="text-center">Aguardando aprovação</DialogTitle>
          <DialogDescription className="text-center">
            Sua conta está pendente de aprovação. O administrador irá liberar seu acesso em breve.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="flex-1">Fechar</Button>
          <Button variant="outline" onClick={handleLogout} className="flex-1">Sair</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
