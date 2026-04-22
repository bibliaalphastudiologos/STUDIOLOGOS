import { X, ArrowRight } from 'lucide-react';

    export default function AccessModal({ product, onClose }) {
      if (!product) return null;

      return (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          onClick={onClose}
        >
          <div
            className="bg-[#0D0D0D] border border-[rgba(201,168,76,0.2)] p-10 max-w-md w-full relative"
            style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.7), 0 0 80px rgba(201,168,76,0.04)' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

            {/* Corner marks */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[rgba(201,168,76,0.3)]" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[rgba(201,168,76,0.3)]" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[rgba(201,168,76,0.3)]" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[rgba(201,168,76,0.3)]" />

            {/* Header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="sec-tag mb-2">Produto Selecionado</p>
                <h2 className="font-display text-white text-4xl tracking-wider uppercase leading-none">
                  {product.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-[#444] hover:text-[#888] transition-colors ml-4 mt-1 flex-shrink-0"
              >
                <X size={16} />
              </button>
            </div>

            {/* Divider */}
            <div className="gold-divider mb-6" />

            {product.description && (
              <p className="text-[rgba(240,237,230,0.4)] text-sm mb-6 leading-relaxed tracking-wide">
                {product.description}
              </p>
            )}

            {product.price && (
              <div className="mb-8">
                <p className="text-[#555] text-[10px] tracking-[3px] uppercase mb-2">Investimento</p>
                <p className="font-display text-[#C9A84C] text-5xl tracking-wider">{product.price}</p>
              </div>
            )}

            <a
              href="https://wa.me/5519993586153"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full mb-3"
              style={{ justifyContent: 'center' }}
            >
              Solicitar via WhatsApp
              <ArrowRight size={14} />
            </a>
            <button
              className="btn-secondary w-full"
              onClick={onClose}
              style={{ justifyContent: 'center' }}
            >
              Fechar
            </button>
          </div>
        </div>
      );
    }
    