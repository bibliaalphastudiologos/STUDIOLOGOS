import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#070707]/90 backdrop-blur-md border-b border-[rgba(201,168,76,0.12)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-1">
            <span className="font-display text-[#C9A84C] text-2xl tracking-widest">STUDIO</span>
            <span className="font-display text-white text-2xl tracking-widest">LOGOS</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#produtos" className="text-[#666] hover:text-[#F0EDE6] transition-colors text-[11px] tracking-[2px] uppercase font-medium">Produtos</a>
            <a href="#sobre" className="text-[#666] hover:text-[#F0EDE6] transition-colors text-[11px] tracking-[2px] uppercase font-medium">Sobre</a>
            <a href="#contato" className="text-[#666] hover:text-[#F0EDE6] transition-colors text-[11px] tracking-[2px] uppercase font-medium">Contato</a>
          </nav>
          <button
            className="md:hidden text-[#666] hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-[#0A0A0A] border-t border-[rgba(201,168,76,0.10)] py-5 px-6 space-y-4">
          <a href="#produtos" onClick={() => setMenuOpen(false)} className="block text-[#666] hover:text-white text-[11px] tracking-[2px] uppercase transition-colors">Produtos</a>
          <a href="#sobre" onClick={() => setMenuOpen(false)} className="block text-[#666] hover:text-white text-[11px] tracking-[2px] uppercase transition-colors">Sobre</a>
          <a href="#contato" onClick={() => setMenuOpen(false)} className="block text-[#666] hover:text-white text-[11px] tracking-[2px] uppercase transition-colors">Contato</a>
        </div>
      )}
    </header>
  );
}
