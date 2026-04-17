import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { redirectToBibleAlpha } from '@/lib/redirects.js';
import { useAuth } from '@/context/AuthContext';
import AccessModal from '@/components/AccessModal';

const ProductCard = memo(({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user, isApproved, isAdmin } = useAuth();

  const handleClick = (e) => {
    e.preventDefault();
    const isBibliaAlpha = product?.title?.includes('BÃ­blia Alpha');

    if (isBibliaAlpha) {
      if (!user || (!isApproved && !isAdmin)) {
        setShowModal(true);
        return;
      }
      redirectToBibleAlpha();
      return;
    }

    if (!user || (!isApproved && !isAdmin)) {
      setShowModal(true);
      return;
    }

    const link = product?.url || product?.link;
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  const coverSrc = product?.image || product?.cover;

  return (
    <>
      <motion.div
        onClick={handleClick}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "50px" }}
        transition={{ duration: 0.4 }}
        className="group cursor-pointer w-[160px] sm:w-[180px] md:w-[200px] flex-none flex flex-col will-change-transform"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleClick(e);
        }}
      >
        <div className="w-full aspect-[2/3] overflow-hidden rounded-sm bg-muted mb-3 relative shadow-sm transition-shadow duration-300 group-hover:shadow-minimal-hover">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" aria-hidden="true" />
          )}
          {coverSrc && (
            <img
              src={coverSrc}
              alt={product?.title}
              loading="lazy"
              decoding="async"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          )}
          {(!user || (!isApproved && !isAdmin)) && (
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-300 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100">
              <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full shadow">
                {!user ? 'Fazer Login' : 'Acesso Pendente'}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="font-outfit text-sm font-medium text-foreground line-clamp-2 leading-snug">
            {product?.title}
          </h3>
          {product?.author && (
            <p className="font-outfit text-xs text-muted-foreground truncate">{product.author}</p>
          )}
          {product?.category && (
            <span className="inline-block mt-1 text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-sm font-medium w-fit">
              {product.category}
            </span>
          )}
        </div>
      </motion.div>

      <AccessModal open={showModal} onClose={() => setShowModal(false)} />
    </>
  );
});

ProductCard.displayName = 'ProductCard';
export default ProductCard;
