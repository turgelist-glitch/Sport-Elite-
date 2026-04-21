import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const brandColors = {
    Nike: '#ff6600',
    Adidas: '#0066cc',
    Puma: '#cc0000',
    'Under Armour': '#e8002d'
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes[Math.floor(product.sizes.length / 2)];
    addToCart(product, defaultSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card__image-wrap">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            className="product-card__image"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="product-card__image-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/>
            </svg>
          </div>
        )}
        {product.badge && (
          <span className="product-card__badge">{product.badge}</span>
        )}
        <div
          className="product-card__brand-tag"
          style={{ background: brandColors[product.brand] || '#333' }}
        >
          {product.brand}
        </div>
        <div className="product-card__overlay">
          <button
            className={`product-card__add-btn ${added ? 'product-card__add-btn--added' : ''}`}
            onClick={handleQuickAdd}
          >
            {added ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20,6 9,17 4,12"/>
                </svg>
                Добавлено
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
                </svg>
                В корзину
              </>
            )}
          </button>
        </div>
      </div>
      <div className="product-card__info">
        <div className="product-card__meta">
          <span className="product-card__category">{product.category}</span>
          <div className="product-card__rating">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#e8ff00">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
            </svg>
            <span>{product.rating}</span>
          </div>
        </div>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__price">{product.price.toLocaleString('ky-KG')} сом</p>
      </div>
    </Link>
  );
}
