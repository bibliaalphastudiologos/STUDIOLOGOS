import { Lock } from 'lucide-react';

export default function ProductCard({ product, onClick }) {
  return (
    <div
      className="group relative bg-[#0C0C0C] overflow-hidden cursor-pointer transition-all duration-300"
      onClick={() => onClick(product)}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = 'inset 0 0 0 1px rgba(201,168,76,0.28), 0 0 40px rgba(201,168,76,0.05)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Top accent line on hover */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Image / placeholder */}
      <div className="aspect-video bg-[#080808] overflow-hidden relative">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center relative">
            {/* Subtle grid background */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
            {/* Gold monogram mark */}
            <div className="relative flex flex-col items-center gap-3">
              <div
                className="w-10 h-10 flex items-center justify-center border border-[rgba(201,168,76,0.22)] group-hover:border-[rgba(201,168,76,0.5)] transition-colors duration-300"
                style={{ background: 'rgba(201,168,76,0.04)' }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(201,168,76,0.45)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:stroke-[rgba(201,168,76,0.75)] transition-colors duration-300"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div
                className="h-px w-8 opacity-20 group-hover:opacity-50 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to right, transparent, #C9A84C, transparent)' }}
              />
            </div>
            {/* Radial glow on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'radial-gradient(circle at center, rgba(201,168,76,0.06) 0%, transparent 70%)' }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-[#F0EDE6] text-sm tracking-wide leading-snug">
            {product.title}
          </h3>
          {!product.available && (
            <Lock size={12} className="text-[#444] mt-0.5 flex-shrink-0" />
          )}
        </div>
        {product.description && (
          <p className="text-[rgba(240,237,230,0.35)] text-xs leading-relaxed mb-3 line-clamp-2">
            {product.description}
          </p>
        )}
        {product.price && (
          <div className="flex items-center justify-between">
            <span className={`font-bold text-sm tracking-wide ${product.available ? 'text-[#C9A84C]' : 'text-[#444] text-xs'}`}>
              {product.price}
            </span>
            {product.available && (
              <span className="text-[10px] text-[rgba(201,168,76,0.5)] tracking-[2px] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Ver &#8594;
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
