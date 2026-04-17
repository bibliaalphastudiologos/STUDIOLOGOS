import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogOverlay
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bell, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const UnavailableProductModal = ({ isOpen, onClose }) => {
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNotifyMe = () => {
    setIsSubscribing(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubscribing(false);
      toast.success("Notificação ativada", {
        description: "Avisaremos você assim que este item estiver disponível.",
      });
      onClose();
    }, 800);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.96, 
      y: 10,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="modal-overlay-glass z-50 transition-all duration-500" />
      
      {/* We strip shadcn's default styling on DialogContent to take full control with framer-motion */}
      <DialogContent 
        className="p-0 border-none bg-transparent shadow-none sm:max-w-lg z-50 overflow-visible outline-none focus:outline-none focus:ring-0"
        hideCloseButton
      >
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="glass-panel rounded-3xl shadow-elegant overflow-hidden relative w-full"
            >
              {/* Subtle elegant gradient top border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/40 via-primary to-primary/40 opacity-80" />
              
              {/* Close Button - Absolute */}
              <button 
                onClick={onClose}
                className="absolute top-5 right-5 p-2 rounded-full text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 sm:p-12 flex flex-col items-center text-center">
                
                {/* Typography Header */}
                <motion.div variants={itemVariants} className="space-y-4 w-full">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-1">
                    Exclusividade
                  </span>
                  
                  <h2 className="font-playfair text-3xl sm:text-4xl text-foreground font-semibold tracking-tight text-balance">
                    Obra em Preparação
                  </h2>
                  
                  {/* Decorative separator */}
                  <div className="flex items-center justify-center gap-2 py-2">
                    <div className="h-[1px] w-8 bg-border" />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                    <div className="h-[1px] w-8 bg-border" />
                  </div>
                  
                  <p className="font-outfit text-base sm:text-lg text-muted-foreground leading-relaxed max-w-[36ch] mx-auto text-balance">
                    Agradecemos seu interesse no acervo do StudioLogos. Esta obra está passando por curadoria e em breve integrará nossa biblioteca premium.
                  </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div variants={itemVariants} className="w-full mt-10 space-y-3 sm:space-y-0 sm:flex sm:gap-4 sm:justify-center">
                  <Button 
                    onClick={handleNotifyMe}
                    disabled={isSubscribing}
                    className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 h-14 px-8 rounded-xl font-medium text-base transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group"
                  >
                    {isSubscribing ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                        />
                        Processando...
                      </span>
                    ) : (
                      <>
                        <Bell className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                        <span>Notifique-me</span>
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={onClose} 
                    className="w-full sm:w-auto h-14 px-8 rounded-xl font-medium text-base border-border bg-transparent hover:bg-muted/50 hover:text-foreground transition-all duration-300"
                  >
                    Fechar
                  </Button>
                </motion.div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default UnavailableProductModal;