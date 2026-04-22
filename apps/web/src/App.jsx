import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
