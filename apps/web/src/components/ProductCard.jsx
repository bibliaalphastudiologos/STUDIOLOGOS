import { Lock, ExternalLink } from 'lucide-react';

export default function ProductCard({ product, onClick }) {
  return (
    <div
      className="group relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-yellow-500/50 transition-all duration-300 cursor-pointer"
      onClick={() => onClick(product)}
    >
      <div className="aspect-video bg-gray-800 overflow-hidden">
        {product.image ? (
          <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600">
            <span className="text-4xl">🎨</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-white text-sm">{product.title}</h3>
          {!product.available && <Lock size={14} className="text-gray-500 mt-0.5 flex-shrink-0" />}
        </div>
        {product.description && (
          <p className="text-gray-500 text-xs mt-1 line-clamp-2">{product.description}</p>
        )}
        {product.price && (
          <p className="text-yellow-400 font-bold text-sm mt-2">{product.price}</p>
        )}
      </div>
    </div>
  );
}
