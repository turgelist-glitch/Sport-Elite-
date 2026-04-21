import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

export default function Header() {
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        <Link to="/" className="header__logo">
          <span className="header__logo-text">SPORT</span>
          <span className="header__logo-accent">ELITE</span>
        </Link>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          <NavLink to="/" className={({ isActive }) => `header__nav-link ${isActive ? 'active' : ''}`} onClick={() => setMenuOpen(false)} end>
            Главная
          </NavLink>
          <NavLink to="/catalog" className={({ isActive }) => `header__nav-link ${isActive ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
            Каталог
          </NavLink>
          <NavLink to="/catalog?brand=Nike" className="header__nav-link" onClick={() => setMenuOpen(false)}>Nike</NavLink>
          <NavLink to="/catalog?brand=Adidas" className="header__nav-link" onClick={() => setMenuOpen(false)}>Adidas</NavLink>
          <NavLink to="/catalog?brand=Puma" className="header__nav-link" onClick={() => setMenuOpen(false)}>Puma</NavLink>
          <NavLink to="/catalog?brand=Under Armour" className="header__nav-link" onClick={() => setMenuOpen(false)}>Under Armour</NavLink>
          <NavLink to="/about" className={({ isActive }) => `header__nav-link ${isActive ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
            О компании
          </NavLink>
          <NavLink to="/delivery" className={({ isActive }) => `header__nav-link ${isActive ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
            Доставка
          </NavLink>
          <NavLink to="/returns" className={({ isActive }) => `header__nav-link ${isActive ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
            Возврат
          </NavLink>
        </nav>

        <div className="header__actions">
          <button className="header__icon-btn" onClick={() => setSearchOpen(!searchOpen)} aria-label="Поиск">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>

          <Link to="/cart" className="header__cart-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {totalItems > 0 && <span className="header__cart-count">{totalItems}</span>}
          </Link>

          <button
            className={`header__burger ${menuOpen ? 'header__burger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="header__search-bar">
          <div className="container">
            <form onSubmit={handleSearch} className="header__search-form">
              <input
                type="text"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
                className="header__search-input"
              />
              <button type="submit" className="header__search-submit">Найти</button>
              <button type="button" className="header__search-close" onClick={() => setSearchOpen(false)}>✕</button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}