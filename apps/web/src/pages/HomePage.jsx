import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import Shelf from '../components/Shelf';
import AccessModal from '../components/AccessModal';
import UnavailableProductModal from '../components/UnavailableProductModal';

export default function HomePage() {
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [showUnavailableModal, setShowUnavailableModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    if (!product.available) {
      setSelectedProduct(product);
      setShowUnavailableModal(true);
    } else {
      setSelectedProduct(product);
      setShowAccessModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      <main>
        <HeroSection />
        <Shelf onProductClick={handleProductClick} />
      </main>
      <Footer />
      {showAccessModal && (
        <AccessModal
          product={selectedProduct}
          onClose={() => setShowAccessModal(false)}
        />
      )}
      {showUnavailableModal && (
        <UnavailableProductModal
          product={selectedProduct}
          onClose={() => setShowUnavailableModal(false)}
        />
      )}
    </div>
  );
}
