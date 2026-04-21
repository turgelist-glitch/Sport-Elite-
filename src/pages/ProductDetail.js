import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

const brandColors = {
  Nike: '#ff6600',
  Adidas: '#0066cc',
  Puma: '#cc0000',
  'Under Armour': '#e8002d'
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === Number(id));

  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [imgError, setImgError] = useState(false);

  const related = products.filter(p => p.brand === product?.brand && p.id !== product?.id).slice(0, 4);

  if (!product) {
    return (
      <div className="not-found">
        <div className="container">
          <h1>Товар не найден</h1>
          <p>Возможно, он был удалён или недоступен.</p>
          <button onClick={() => navigate('/catalog')} className="not-found__btn">
            Перейти в каталог
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    addToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const accentColor = brandColors[product.brand] || '#e8ff00';

  return (
    <div className="product-detail">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Главная</Link>
          <span>/</span>
          <Link to="/catalog">Каталог</Link>
          <span>/</span>
          <Link to={`/catalog?brand=${product.brand}`}>{product.brand}</Link>
          <span>/</span>
          <span className="breadcrumb__current">{product.name}</span>
        </nav>

        <div className="product-detail__grid">
          {/* Image */}
          <div className="product-detail__image-col">
            <div className="product-detail__image-wrap">
              {product.badge && (
                <span className="product-detail__badge">{product.badge}</span>
              )}
              {!imgError ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-detail__image"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="product-detail__image-placeholder">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21,15 16,10 5,21"/>
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="product-detail__info-col">
            <div className="product-detail__brand-row">
              <span
                className="product-detail__brand"
                style={{ color: accentColor }}
              >
                {product.brand}
              </span>
              <span className="product-detail__category">{product.category}</span>
            </div>

            <h1 className="product-detail__name">{product.name}</h1>

            <div className="product-detail__rating-row">
              <div className="product-detail__stars">
                {[1,2,3,4,5].map(star => (
                  <svg key={star} width="16" height="16" viewBox="0 0 24 24"
                    fill={star <= Math.round(product.rating) ? '#e8ff00' : 'transparent'}
                    stroke="#e8ff00" strokeWidth="1.5"
                  >
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                  </svg>
                ))}
              </div>
              <span className="product-detail__rating-val">{product.rating}</span>
              <span className="product-detail__reviews">{product.reviews} отзывов</span>
            </div>

            <div className="product-detail__price-row">
              <span className="product-detail__price">{product.price.toLocaleString('ru-RU')} ₽</span>
            </div>

            <p className="product-detail__description">{product.description}</p>

            {/* Colors */}
            <div className="product-detail__option-group">
              <h3 className="product-detail__option-label">Цвета</h3>
              <div className="product-detail__colors">
                {product.colors.map(color => (
                  <span key={color} className="product-detail__color-tag">{color}</span>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="product-detail__option-group">
              <h3 className={`product-detail__option-label ${sizeError ? 'product-detail__option-label--error' : ''}`}>
                {sizeError ? '⚠ Выберите размер' : 'Размер'}
              </h3>
              <div className="product-detail__sizes">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`product-detail__size-btn ${selectedSize === size ? 'product-detail__size-btn--active' : ''} ${sizeError ? 'product-detail__size-btn--error' : ''}`}
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    style={selectedSize === size ? { borderColor: accentColor, background: `${accentColor}22`, color: accentColor } : {}}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="product-detail__cta">
              <button
                className={`product-detail__add-btn ${added ? 'product-detail__add-btn--added' : ''}`}
                onClick={handleAddToCart}
                style={!added ? { background: accentColor } : {}}
              >
                {added ? (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                    Добавлено в корзину!
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
                    </svg>
                    Добавить в корзину
                  </>
                )}
              </button>
              <Link to="/cart" className="product-detail__cart-link">
                Перейти в корзину →
              </Link>
            </div>

            {/* Features */}
            <div className="product-detail__features">
              <div className="product-detail__feature">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
                </svg>
                Доставка 1-3 дня
              </div>
              <div className="product-detail__feature">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 1 0 .49-4.02"/>
                </svg>
                Возврат 30 дней
              </div>
              <div className="product-detail__feature">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                100% оригинал
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="product-detail__related">
            <div className="section-header">
              <h2 className="section-title">Другие товары {product.brand}</h2>
              <Link to={`/catalog?brand=${product.brand}`} className="section-link">
                Смотреть все →
              </Link>
            </div>
            <div className="products-grid products-grid--4">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
