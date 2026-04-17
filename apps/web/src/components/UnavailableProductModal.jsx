import { X, Clock } from 'lucide-react';

export default function UnavailableProductModal({ product, onClose }) {
  if (!product) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#0D0D0D] border border-[rgba(201,168,76,0.15)] p-8 max-w-md w-full relative"
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-[rgba(201,168,76,0.4)]" />

        <div className="flex justify-between items-start mb-5">
          <div className="flex items-center gap-3">
            <Clock size={18} className="text-[#C9A84C]" />
            <h2 className="font-display text-white text-2xl tracking-wider uppercase">Em Breve</h2>
          </div>
          <button onClick={onClose} className="text-[#555] hover:text-white transition-colors ml-4 flex-shrink-0">
            <X size={18} />
          </button>
        </div>

        <p className="text-[rgba(240,237,230,0.7)] font-medium text-sm mb-2 tracking-wide">
          {product.title}
        </p>
        <p className="text-[rgba(240,237,230,0.38)] text-sm mb-8 leading-relaxed">
          Este produto ainda esta em desenvolvimento. Fique de olho nas novidades!
        </p>

        <button className="btn-secondary w-full" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}
