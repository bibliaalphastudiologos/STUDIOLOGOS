export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#070707]">

      {/* Grid background */}
      <div className="hero-grid" />

      {/* Glow orb top-right */}
      <div
        className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.09) 0%, transparent 65%)', filter: 'blur(80px)' }}
      />
      {/* Glow orb bottom-left */}
      <div
        className="absolute bottom-[-100px] left-[-150px] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 65%)', filter: 'blur(80px)' }}
      />

      <div className="max-w-7xl mx-auto w-full pt-28 pb-20 relative z-10">
        <div className="max-w-3xl border-l-2 border-[#C9A84C] pl-8 sm:pl-12">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 border border-[rgba(201,168,76,0.25)] bg-[rgba(201,168,76,0.05)] text-[#C9A84C] text-[10px] font-semibold tracking-[3px] uppercase py-2 px-4 mb-10"
            style={{ animation: 'fadeUp 0.6s ease 0.1s both' }}
          >
            <span className="badge-dot" />
            Design de Excelencia
          </div>

          {/* Heading */}
          <h1
            className="font-display text-[clamp(56px,10vw,110px)] leading-none tracking-wider text-white mb-4 uppercase"
            style={{ animation: 'fadeUp 0.7s ease 0.2s both' }}
          >
            TRANSFORME<br />
            <span className="text-[#C9A84C]">SUA MARCA</span>
          </h1>

          {/* Subheading */}
          <p
            className="text-lg sm:text-xl text-[rgba(240,237,230,0.45)] mb-3 leading-relaxed max-w-lg"
            style={{ animation: 'fadeUp 0.7s ease 0.3s both' }}
          >
            com{' '}
            <span className="text-[rgba(201,168,76,0.9)] font-medium">identidade visual</span>
          </p>

          {/* Description */}
          <p
            className="text-sm text-[rgba(240,237,230,0.38)] max-w-md mb-14 leading-relaxed"
            style={{ animation: 'fadeUp 0.7s ease 0.4s both' }}
          >
            Logos profissionais, kits de identidade visual e materiais criativos para elevar seu negocio.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap items-center gap-4"
            style={{ animation: 'fadeUp 0.7s ease 0.5s both' }}
          >
            <a href="#produtos" className="btn-primary">
              Ver Produtos
            </a>
            <a href="#sobre" className="btn-secondary">
              Sobre Nos
            </a>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#555] text-[10px] tracking-[3px] uppercase"
        style={{ animation: 'fadeUp 0.8s ease 1s both' }}
      >
        <span>Scroll</span>
        <div className="scroll-bar" />
      </div>

    </section>
  );
            }
