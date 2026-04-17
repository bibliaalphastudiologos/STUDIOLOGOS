import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-yellow-400 font-bold text-xl tracking-wide">STUDIO LOGOS</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#produtos" className="text-gray-300 hover:text-white transition-colors text-sm">Produtos</a>
            <a href="#sobre" className="text-gray-300 hover:text-white transition-colors text-sm">Sobre</a>
            <a href="#contato" className="text-gray-300 hover:text-white transition-colors text-sm">Contato</a>
          </nav>
          <button className="md:hidden text-gray-300" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 py-4 px-4 space-y-3">
          <a href="#produtos" className="block text-gray-300 hover:text-white">Produtos</a>
          <a href="#sobre" className="block text-gray-300 hover:text-white">Sobre</a>
          <a href="#contato" className="block text-gray-300 hover:text-white">Contato</a>
        </div>
      )}
    </header>
  );
}
