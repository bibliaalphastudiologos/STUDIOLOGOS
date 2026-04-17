import { X } from 'lucide-react';

export default function AccessModal({ product, onClose }) {
  if (!product) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#0D0D0D] border border-[rgba(201,168,76,0.2)] p-8 max-w-md w-full relative"
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#C9A84C]" />

        <div className="flex justify-between items-start mb-5">
          <h2 className="font-display text-white text-3xl tracking-wider uppercase leading-none">
            {product.title}
          </h2>
          <button onClick={onClose} className="text-[#555] hover:text-white transition-colors ml-4 mt-1 flex-shrink-0">
            <X size={18} />
          </button>
        </div>

        {product.description && (
          <p className="text-[rgba(240,237,230,0.45)] text-sm mb-5 leading-relaxed">{product.description}</p>
        )}

        {product.price && (
          <p className="text-[#C9A84C] font-display text-4xl tracking-wider mb-8">{product.price}</p>
        )}

        <button
          className="btn-primary w-full"
          onClick={() => alert('Em breve: integracao com pagamento!')}
        >
          Adquirir Agora
        </button>
      </div>
    </div>
  );
}
