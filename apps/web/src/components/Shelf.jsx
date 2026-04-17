
import React, { useRef, useState, useEffect, useCallback, memo } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import ProductCard from './ProductCard.jsx';
import VideoCard from './VideoCard.jsx';

const Shelf = memo(({ title, items = [], cardType = 'product' }) => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = useCallback((direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.offsetWidth * 0.75;
      
      container.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  }, []);

  const onScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 10);
    }
  }, []);

  useEffect(() => {
    onScroll();
    // Re-check arrows on window resize
    window.addEventListener('resize', onScroll);
    return () => window.removeEventListener('resize', onScroll);
  }, [onScroll, items]);

  return (
    <section className="mb-20 md:mb-28 relative group/shelf">
      <div className="px-6 md:px-12 mb-8">
        <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-foreground tracking-wide">
          {title}
        </h2>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        
        {/* Left Arrow */}
        {showLeftArrow && (
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 flex items-center justify-start opacity-0 group-hover/shelf:opacity-100 transition-opacity duration-300 pointer-events-none">
            <button
              onClick={() => handleScroll('left')}
              className="ml-4 md:ml-8 bg-card text-foreground p-3 rounded-full shadow-minimal hover:shadow-minimal-hover border border-border transition-all duration-300 pointer-events-auto active:scale-95"
              aria-label="Rolar para esquerda"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
        )}

        {/* Scrollable Area - Optimized with content-visibility and native lazy loading */}
        <div 
          ref={scrollContainerRef}
          onScroll={onScroll}
          className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide px-6 md:px-12 pb-8 pt-2 snap-x snap-mandatory"
          style={{ 
            overscrollBehaviorX: 'contain',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {items.map((item, index) => (
            <div key={item.id || index} className="snap-start shrink-0">
              {cardType === 'video' ? (
                <VideoCard video={item} />
              ) : (
                <ProductCard product={item} />
              )}
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 flex items-center justify-end opacity-0 group-hover/shelf:opacity-100 transition-opacity duration-300 pointer-events-none">
            <button
              onClick={() => handleScroll('right')}
              className="mr-4 md:mr-8 bg-card text-foreground p-3 rounded-full shadow-minimal hover:shadow-minimal-hover border border-border transition-all duration-300 pointer-events-auto active:scale-95"
              aria-label="Rolar para direita"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
        
      </div>
    </section>
  );
}, (prevProps, nextProps) => prevProps.title === nextProps.title && prevProps.items.length === nextProps.items.length);

export default Shelf;
