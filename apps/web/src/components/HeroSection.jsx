export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          Transforme sua marca com
          <span className="text-yellow-400"> identidade visual</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
          Logos profissionais, kits de identidade visual e materiais criativos para elevar seu negócio.
        </p>
        <a
          href="#produtos"
          className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-4 rounded-lg transition-colors text-lg"
        >
          Ver Produtos
        </a>
      </div>
    </section>
  );
}
