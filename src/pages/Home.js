import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Home.css';

const bannerSlides = [
  {
    brand: 'Nike',
    headline: 'JUST DO IT',
    sub: 'Новая коллекция Air Max — для тех, кто не останавливается',
    cta: 'Смотреть Nike',
    query: 'Nike',
    bg: 'linear-gradient(135deg, #1a0a00 0%, #0a0a0a 50%, #0a0a1a 100%)',
    accent: '#ff6600',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80'
  },
  {
    brand: 'Adidas',
    headline: 'IMPOSSIBLE IS NOTHING',
    sub: 'Ultraboost 22 — каждый шаг возвращает тебе энергию',
    cta: 'Смотреть Adidas',
    query: 'Adidas',
    bg: 'linear-gradient(135deg, #00001a 0%, #0a0a0a 50%, #001a00 100%)',
    accent: '#0066cc',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=900&q=80'
  },
  {
    brand: 'Puma',
    headline: 'RUN THE STREETS',
    sub: 'Легендарный стиль Suede — классика, которая никогда не выходит из моды',
    cta: 'Смотреть Puma',
    query: 'Puma',
    bg: 'linear-gradient(135deg, #1a0000 0%, #0a0a0a 50%, #1a1a00 100%)',
    accent: '#cc0000',
    image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=900&q=80'
  }
];

const brandShowcase = [
  { name: 'Nike', color: '#ff6600', description: '340+ товаров', query: 'Nike', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
  { name: 'Adidas', color: '#0066cc', description: '280+ товаров', query: 'Adidas', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&q=80' },
  { name: 'Puma', color: '#cc0000', description: '190+ товаров', query: 'Puma', image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&q=80' },
  { name: 'Under Armour', color: '#e8002d', description: '210+ товаров', query: 'Under Armour', image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80' }
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const popularProducts = products.filter(p => p.badge).slice(0, 4);
  const newProducts = products.filter(p => p.badge === 'Новинка' || p.badge === 'Топ продаж');

  const slide = bannerSlides[activeSlide];

  return (
    <div className="home">
      {/* Hero Banner */}
      <section className="hero" style={{ background: slide.bg }}>
        <div className="hero__bg-image" style={{ backgroundImage: `url(${slide.image})` }} />
        <div className="container hero__content">
          <div className="hero__text">
            <span className="hero__brand-label" style={{ color: slide.accent }}>
              {slide.brand}
            </span>
            <h1 className="hero__headline">{slide.headline}</h1>
            <p className="hero__sub">{slide.sub}</p>
            <div className="hero__actions">
              <button
                className="hero__cta"
                style={{ background: slide.accent }}
                onClick={() => navigate(`/catalog?brand=${slide.query}`)}
              >
                {slide.cta}
              </button>
              <Link to="/catalog" className="hero__cta-secondary">
                Весь каталог
              </Link>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="hero__indicators">
          {bannerSlides.map((_, i) => (
            <button
              key={i}
              className={`hero__indicator ${i === activeSlide ? 'hero__indicator--active' : ''}`}
              onClick={() => setActiveSlide(i)}
              style={i === activeSlide ? { background: slide.accent } : {}}
            />
          ))}
        </div>

        <div className="hero__scroll-hint">
          <span>Прокрутите вниз</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </section>

      {/* Stats bar */}
      <section className="stats">
        <div className="container stats__inner">
          <div className="stats__item">
            <span className="stats__number">1000+</span>
            <span className="stats__label">Товаров</span>
          </div>
          <div className="stats__divider" />
          <div className="stats__item">
            <span className="stats__number">4</span>
            <span className="stats__label">Бренда</span>
          </div>
          <div className="stats__divider" />
          <div className="stats__item">
            <span className="stats__number">24/7</span>
            <span className="stats__label">Поддержка</span>
          </div>
          <div className="stats__divider" />
          <div className="stats__item">
            <span className="stats__number">Free</span>
            <span className="stats__label">Доставка от 5000₽</span>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="brands">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Наши бренды</h2>
            <Link to="/catalog" className="section-link">Все товары →</Link>
          </div>
          <div className="brands__grid">
            {brandShowcase.map(brand => (
              <button
                key={brand.name}
                className="brand-card"
                onClick={() => navigate(`/catalog?brand=${brand.query}`)}
              >
                <div className="brand-card__image-wrap">
                  <img src={brand.image} alt={brand.name} className="brand-card__image" />
                  <div className="brand-card__overlay" style={{ background: `${brand.color}22` }} />
                </div>
                <div className="brand-card__info">
                  <span className="brand-card__name" style={{ color: brand.color }}>{brand.name}</span>
                  <span className="brand-card__count">{brand.description}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Popular products */}
      <section className="popular">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Популярные товары</h2>
            <Link to="/catalog" className="section-link">Смотреть всё →</Link>
          </div>
          <div className="products-grid">
            {popularProducts.map((product, i) => (
              <div key={product.id} style={{ animationDelay: `${i * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature banner */}
      <section className="feature-banner">
        <div className="container">
          <div className="feature-banner__inner">
            <div className="feature-banner__text">
              <span className="feature-banner__label">Специальное предложение</span>
              <h2 className="feature-banner__title">НОВАЯ КОЛЛЕКЦИЯ<br /><span>УЖЕ ЗДЕСЬ</span></h2>
              <p className="feature-banner__sub">Эксклюзивные модели от всех топовых брендов. Будь первым, кто получит новинки сезона.</p>
              <Link to="/catalog" className="feature-banner__btn">Открыть каталог</Link>
            </div>
            <div className="feature-banner__visual">
              <div className="feature-banner__circle" />
              <img
                src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80"
                alt="New collection"
                className="feature-banner__image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* New arrivals */}
      <section className="new-arrivals">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Новинки и хиты</h2>
            <Link to="/catalog" className="section-link">Весь каталог →</Link>
          </div>
          <div className="products-grid">
            {products.slice(4, 8).map((product, i) => (
              <div key={product.id} style={{ animationDelay: `${i * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits">
        <div className="container benefits__grid">
          <div className="benefit-card">
            <div className="benefit-card__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
              </svg>
            </div>
            <h3>Быстрая доставка</h3>
            <p>Доставим ваш заказ за 1-3 дня по всей России</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-card__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h3>100% оригинал</h3>
            <p>Только сертифицированная продукция от официальных партнёров</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-card__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 1 0 .49-4.02"/>
              </svg>
            </div>
            <h3>Лёгкий возврат</h3>
            <p>30 дней на возврат без вопросов и лишних условий</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-card__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h3>Поддержка 24/7</h3>
            <p>Команда экспертов всегда готова помочь с выбором</p>
          </div>
        </div>
      </section>
    </div>
  );
}
