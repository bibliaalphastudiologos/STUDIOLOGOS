export default function Footer() {
  return (
    <footer className="bg-[#070707] border-t border-[rgba(201,168,76,0.12)] py-14 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="flex items-center gap-1 mb-2">
              <span className="font-display text-[#C9A84C] text-2xl tracking-widest">STUDIO</span>
              <span className="font-display text-white text-2xl tracking-widest">LOGOS</span>
            </div>
            <p className="text-[#444] text-[10px] tracking-[2px] uppercase">studiologos.com.br</p>
          </div>

          <nav className="flex flex-wrap gap-6">
            <a href="#produtos" className="text-[#444] hover:text-[#C9A84C] transition-colors text-[11px] tracking-[2px] uppercase">Produtos</a>
            <a href="#sobre" className="text-[#444] hover:text-[#C9A84C] transition-colors text-[11px] tracking-[2px] uppercase">Sobre</a>
            <a href="#contato" className="text-[#444] hover:text-[#C9A84C] transition-colors text-[11px] tracking-[2px] uppercase">Contato</a>
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-[rgba(255,255,255,0.04)]">
          <p className="text-[#2E2E2E] text-xs tracking-[1px]">
            {"©"} {new Date().getFullYear()} Studio Logos. Todos os direitos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
}
