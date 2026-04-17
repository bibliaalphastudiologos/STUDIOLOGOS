import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { BookOpen, Menu, LogOut, Settings, LogIn, Shield } from 'lucide-react';

export default function Header() {
  const { user, userDoc, isAdmin, isApproved, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  const statusBadge = () => {
    if (!userDoc) return null;
    if (isAdmin) return <span className="text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full font-medium">Admin</span>;
    if (isApproved) return <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full font-medium">Aprovado</span>;
    return <span className="text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded-full font-medium">Pendente</span>;
  };

  return (
    <header className="sticky top-0 z-50 bg-amber-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <BookOpen className="h-6 w-6 text-amber-300" />
          <span className="text-white">Bíblia Alpha</span>
          <span className="text-amber-300">Digital</span>
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full hover:bg-amber-800 transition p-1 pr-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL} />
                    <AvatarFallback className="bg-amber-300 text-amber-900 text-xs font-bold">
                      {(user.displayName || user.email || '?')[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm hidden sm:block max-w-[140px] truncate">{user.displayName || user.email}</span>
                  {statusBadge()}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <div className="px-3 py-2">
                  <p className="font-medium text-sm truncate">{user.displayName || 'Usuário'}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                {isAdmin && (
                  <DropdownMenuItem onClick={() => navigate('/admin')} className="gap-2 cursor-pointer">
                    <Shield className="h-4 w-4" /> Gerenciar usuários
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleLogout} className="gap-2 text-red-600 cursor-pointer">
                  <LogOut className="h-4 w-4" /> Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => navigate('/login')}
              size="sm"
              className="bg-amber-600 hover:bg-amber-500 text-white gap-2"
            >
              <LogIn className="h-4 w-4" /> Entrar
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
