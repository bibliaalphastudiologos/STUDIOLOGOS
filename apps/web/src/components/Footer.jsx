export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="text-yellow-400 font-bold text-lg">STUDIO LOGOS</span>
            <p className="text-gray-500 text-sm mt-1">studiologos.com.br</p>
          </div>
          <p className="text-gray-600 text-sm">© {new Date().getFullYear()} Studio Logos. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
