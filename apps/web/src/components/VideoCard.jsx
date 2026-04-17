
import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import UnavailableProductModal from './UnavailableProductModal.jsx';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog.jsx';
import { redirectToBibleAlpha } from '@/lib/redirects.js';

const VideoCard = memo(({ video }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    
    const isBibliaAlpha = video?.title?.includes('Bíblia Alpha');

    if (isBibliaAlpha) {
      redirectToBibleAlpha(e);
    } else if (video.embed) {
      setIsPlaying(true);
    } else if (video.url) {
      window.open(video.url, '_blank', 'noopener,noreferrer');
    } else {
      setIsModalOpen(true);
    }
  };

  const getResponsiveEmbed = (embedHtml) => {
    if (!embedHtml) return '';
    return embedHtml
      .replace(/width="[^"]*"/, 'width="100%"')
      .replace(/height="[^"]*"/, 'height="100%"');
  };

  const displaySubtitle = video.subtitle || 'Erick Silva, Pr The';

  return (
    <>
      <motion.div
        onClick={handleClick}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "50px" }}
        transition={{ duration: 0.4 }}
        className="group cursor-pointer w-[260px] sm:w-[320px] md:w-[380px] flex-none flex flex-col will-change-transform"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick(e);
          }
        }}
      >
        <div className="w-full aspect-video overflow-hidden rounded-sm bg-muted mb-4 relative shadow-sm transition-shadow duration-300 group-hover:shadow-minimal-hover">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" aria-hidden="true" />
          )}
          <img 
            src={video.image} 
            alt={`Thumbnail do vídeo: ${video.title}`}
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-500 motion-reduce:transition-none group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
          
          {video.embed && (
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md transform transition-transform duration-300 motion-reduce:transition-none group-hover:scale-110">
                <Play className="w-5 h-5 text-black ml-1" fill="currentColor" />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col px-1">
          {displaySubtitle && (
            <span className="font-outfit text-xs font-semibold text-primary uppercase tracking-widest mb-1.5 opacity-90">
              {displaySubtitle}
            </span>
          )}
          <h3 className="font-playfair text-lg font-medium text-foreground leading-snug mb-1.5 group-hover:text-primary transition-colors">
            {video.title}
          </h3>
          {video.description && (
            <p className="font-outfit text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {video.description}
            </p>
          )}
        </div>
      </motion.div>

      <UnavailableProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <Dialog open={isPlaying} onOpenChange={setIsPlaying}>
        <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-black border-none shadow-2xl">
          <DialogTitle className="sr-only">{video.title}</DialogTitle>
          {isPlaying && (
            <div 
              className="w-full aspect-video bg-black flex items-center justify-center"
              dangerouslySetInnerHTML={{ __html: getResponsiveEmbed(video.embed) }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}, (prevProps, nextProps) => prevProps.video.id === nextProps.video.id);

export default VideoCard;
