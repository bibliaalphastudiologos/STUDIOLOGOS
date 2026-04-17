
import React from 'react';
import { Link } from 'react-router-dom';
import { redirectToBibleAlpha } from '@/lib/redirects.js';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-12">
          
          <div className="md:col-span-5">
            <Link to="/" className="inline-block mb-4">
              <span className="font-playfair text-2xl font-semibold text-foreground tracking-widest uppercase">
                STUDIO LOGOS
              </span>
            </Link>
            <p className="font-outfit text-muted-foreground max-w-sm text-sm leading-relaxed">
              A Coleção Definitiva de Teologia Premium. Explore o conhecimento sagrado através de uma experiência digital minimalista e sofisticada.
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <h3 className="font-outfit text-foreground font-medium mb-4 tracking-widest uppercase text-xs">
              Plataforma
            </h3>
            <ul className="space-y-3">
              {['Bíblia Alpha', 'Catálogo Completo', 'Autores', 'Logos Play'].map((item) => (
                <li key={item}>
                  {item === 'Bíblia Alpha' ? (
                    <button 
                      onClick={redirectToBibleAlpha}
                      className="font-outfit text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 text-left w-full"
                    >
                      {item}
                    </button>
                  ) : (
                    <Link to="#" className="font-outfit text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                      {item}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-outfit text-foreground font-medium mb-4 tracking-widest uppercase text-xs">
              Sobre
            </h3>
            <ul className="space-y-3">
              {['Nossa História', 'Contato', 'Termos de Uso', 'Privacidade'].map((item) => (
                <li key={item}>
                  <Link to="#" className="font-outfit text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-outfit text-xs text-muted-foreground">
            © {new Date().getFullYear()} Studio Logos. Todos os direitos reservados.
          </p>
          
          <div className="flex space-x-6">
            <a 
              href="https://www.instagram.com/bibliaalphadigital/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-outfit text-xs tracking-widest uppercase"
            >
              Instagram
            </a>
            <a 
              href="https://www.youtube.com/@bibliaalpha.ericksilva" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-outfit text-xs tracking-widest uppercase"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
