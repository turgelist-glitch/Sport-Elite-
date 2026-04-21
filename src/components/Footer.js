import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <span>SPORT</span><span className="footer__logo-accent">ELITE</span>
          </Link>
          <p className="footer__tagline">Одевайся как чемпион.<br />Тренируйся как профессионал.</p>
          <div className="footer__socials">
            <a href="https://www.instagram.com/erjan_yrysbekov" target="_blank" rel="noreferrer" className="footer__social-link" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://t.me/+996707036925" target="_blank" rel="noreferrer" className="footer__social-link" aria-label="Telegram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            </a>
            <a href="#!" className="footer__social-link" aria-label="VK">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.713-1.033-1.01-1.49-.85-1.49.364v1.349c0 .38-.121.523-1.123.523-1.654 0-3.484-.994-4.773-2.852-1.933-2.729-2.456-4.773-2.456-5.196 0-.303.121-.587.602-.587h1.744c.448 0 .62.207.794.693.879 2.501 2.351 4.715 2.962 4.715.228 0 .331-.107.331-.697V9.841c-.07-1.251-.734-1.357-.734-1.805 0-.214.167-.432.44-.432h2.744c.375 0 .512.2.512.64v3.468c0 .376.166.51.271.51.228 0 .42-.134 1.013-.727 1.569-1.75 2.692-4.449 2.692-4.449.151-.303.42-.587.868-.587h1.744c.527 0 .645.27.527.64-.227.924-2.365 4.073-2.365 4.073-.182.303-.243.44 0 .773.166.228.72.7 1.089 1.12.678.757 1.196 1.396 1.334 1.837.151.44-.076.663-.544.663z"/></svg>
            </a>
          </div>
        </div>

        <div className="footer__links-group">
          <h4 className="footer__links-title">Каталог</h4>
          <ul className="footer__links">
            <li><Link to="/catalog?brand=Nike">Nike</Link></li>
            <li><Link to="/catalog?brand=Adidas">Adidas</Link></li>
            <li><Link to="/catalog?brand=Puma">Puma</Link></li>
            <li><Link to="/catalog?brand=Under Armour">Under Armour</Link></li>
          </ul>
        </div>

        <div className="footer__links-group">
          <h4 className="footer__links-title">Категории</h4>
          <ul className="footer__links">
            <li><Link to="/catalog?category=Кроссовки">Кроссовки</Link></li>
            <li><Link to="/catalog?category=Футболки">Футболки</Link></li>
            <li><Link to="/catalog?category=Костюмы">Костюмы</Link></li>
            <li><Link to="/catalog?category=Худи">Худи</Link></li>
            <li><Link to="/catalog?category=Шорты">Шорты</Link></li>
          </ul>
        </div>

        <div className="footer__links-group">
          <h4 className="footer__links-title">Компания</h4>
          <ul className="footer__links">
            <li><Link to="/about">О нас</Link></li>
            <li><Link to="/delivery">Доставка</Link></li>
            <li><Link to="/returns">Возврат</Link></li>
            <li><Link to="/contacts">Контакты</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© 2024 SportElite. Все права защищены.</p>
          <div className="footer__payment">
            <span className="footer__payment-icon">VISA</span>
            <span className="footer__payment-icon">МИР</span>
            <span className="footer__payment-icon">MC</span>
          </div>
        </div>
      </div>
    </footer>
  );
}