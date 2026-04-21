import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import About from './pages/About';
import Delivery from './pages/Delivery';
import Returns from './pages/Returns';
import Contacts from './pages/Contacts';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/delivery" element={<Delivery />} />
              <Route path="/returns" element={<Returns />} />
              <Route path="/contacts" element={<Contacts />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}