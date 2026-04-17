import ProductCard from './ProductCard';

const PRODUCTS = [
  { id: 1, title: 'Logo Profissional', description: 'Design exclusivo para sua marca', price: 'R$ 297', available: true, image: null },
  { id: 2, title: 'Kit Identidade Visual', description: 'Logo + cartão + papelaria completa', price: 'R$ 597', available: true, image: null },
  { id: 3, title: 'Branding Premium', description: 'Identidade completa com manual de marca', price: 'R$ 1.297', available: true, image: null },
  { id: 4, title: 'Pack Redes Sociais', description: 'Templates editáveis para Instagram e mais', price: 'Em breve', available: false, image: null },
];

export default function Shelf({ onProductClick }) {
  return (
    <section id="produtos" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">Nossos Produtos</h2>
        <p className="text-gray-400 mb-10">Soluções criativas para a sua marca</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} onClick={onProductClick} />
          ))}
        </div>
      </div>
    </section>
  );
}
