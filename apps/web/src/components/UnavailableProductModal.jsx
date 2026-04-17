import { X, Clock } from 'lucide-react';
import { Button } from './ui/button';

export default function UnavailableProductModal({ product, onClose }) {
  if (!product) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-gray-900 rounded-2xl border border-gray-700 p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <Clock size={20} className="text-yellow-400" />
            <h2 className="text-white font-bold text-xl">Em Breve</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white"><X size={20} /></button>
        </div>
        <p className="text-gray-300 font-medium mb-2">{product.title}</p>
        <p className="text-gray-400 text-sm mb-6">Este produto ainda está em desenvolvimento. Fique de olho nas novidades!</p>
        <Button variant="outline" className="w-full border-gray-700 text-gray-300" onClick={onClose}>
          Fechar
        </Button>
      </div>
    </div>
  );
}
