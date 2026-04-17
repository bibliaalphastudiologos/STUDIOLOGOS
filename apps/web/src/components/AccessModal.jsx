import { X, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

export default function AccessModal({ product, onClose }) {
  if (!product) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-gray-900 rounded-2xl border border-gray-700 p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-white font-bold text-xl">{product.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white"><X size={20} /></button>
        </div>
        {product.description && <p className="text-gray-400 text-sm mb-4">{product.description}</p>}
        {product.price && <p className="text-yellow-400 font-bold text-2xl mb-6">{product.price}</p>}
        <Button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold" onClick={() => alert('Em breve: integração com pagamento!')}>
          Adquirir Agora
        </Button>
      </div>
    </div>
  );
}
