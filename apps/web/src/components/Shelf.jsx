import ProductCard from './ProductCard';

    const PRODUCTS = [
      {
        id: 1,
        title: 'Logo Profissional',
        description: 'Design exclusivo e atemporal, alinhado a identidade e posicionamento da sua marca.',
        price: 'R$ 297',
        available: true,
        image: null,
      },
      {
        id: 2,
        title: 'Kit Identidade Visual',
        description: 'Logo, cartao de visita e papelaria completa com padrao de excelencia.',
        price: 'R$ 597',
        available: true,
        image: null,
      },
      {
        id: 3,
        title: 'Branding Premium',
        description: 'Identidade visual completa com manual de marca, tipografia e paleta de cores.',
        price: 'R$ 1.297',
        available: true,
        image: null,
      },
      {
        id: 4,
        title: 'Pack Redes Sociais',
        description: 'Templates editaveis para Instagram e demais plataformas digitais.',
        price: 'Em breve',
        available: false,
        image: null,
      },
    ];

    export default function Shelf({ onProductClick }) {
      return (
        <section id="produtos" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#070707] relative z-10">
          <div className="max-w-7xl mx-auto">

            <div className="mb-14 border-l-2 border-[rgba(201,168,76,0.4)] pl-6">
              <span className="sec-tag">Portfolio</span>
              <h2 className="font-display text-[clamp(36px,6vw,64px)] text-white leading-none tracking-wider uppercase mb-3">
                Nossos <span className="text-[#C9A84C]">Produtos</span>
              </h2>
              <p className="text-[rgba(240,237,230,0.38)] text-sm tracking-wide max-w-md">
                Solucoes criativas para elevar o padrao da sua marca
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(201,168,76,0.08)]">
              {PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} onClick={onProductClick} />
              ))}
            </div>

          </div>
        </section>
      );
    }
    