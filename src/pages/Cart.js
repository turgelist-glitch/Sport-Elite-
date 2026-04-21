import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);

  const discount = promoApplied ? Math.round(totalPrice * 0.1) : 0;
  const finalPrice = totalPrice - discount;
  const delivery = finalPrice >= 5000 ? 0 : 490;

  const handlePromo = () => {
    if (promoCode.toUpperCase() === 'SPORT10') {
      setPromoApplied(true);
      setPromoError(false);
    } else {
      setPromoError(true);
      setPromoApplied(false);
    }
  };

  const handleOrder = () => {
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="cart">
        <div className="container cart__success">
          <div className="cart__success-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22,4 12,14.01 9,11.01"/>
            </svg>
          </div>
          <h1 className="cart__success-title">Заказ оформлен!</h1>
          <p className="cart__success-sub">
            Спасибо за покупку. Мы свяжемся с вами в ближайшее время для подтверждения.
          </p>
          <div className="cart__success-actions">
            <button onClick={() => navigate('/catalog')} className="cart__success-btn">
              Продолжить покупки
            </button>
            <Link to="/" className="cart__success-link">На главную</Link>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart">
        <div className="container cart__empty-state">
          <div className="cart__empty-icon">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <h1 className="cart__empty-title">Корзина пуста</h1>
          <p className="cart__empty-sub">
            Перейдите в каталог, чтобы выбрать товары
          </p>
          <Link to="/catalog" className="cart__empty-btn">
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="container">
        <div className="cart__header">
          <h1 className="cart__title">Корзина</h1>
          <span className="cart__items-count">{totalItems} товар{totalItems === 1 ? '' : totalItems < 5 ? 'а' : 'ов'}</span>
        </div>

        <div className="cart__layout">
          {/* Items */}
          <div className="cart__items">
            <div className="cart__items-header">
              <button className="cart__clear-btn" onClick={clearCart}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                </svg>
                Очистить корзину
              </button>
            </div>

            {cartItems.map(item => (
              <div key={item.cartKey} className="cart-item">
                <div className="cart-item__image-wrap">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item__image"
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                </div>

                <div className="cart-item__info">
                  <div className="cart-item__brand">{item.brand}</div>
                  <h3 className="cart-item__name">{item.name}</h3>
                  <div className="cart-item__meta">
                    <span className="cart-item__size">Размер: {item.selectedSize}</span>
                    <span className="cart-item__category">{item.category}</span>
                  </div>
                </div>

                <div className="cart-item__controls">
                  <div className="cart-item__qty">
                    <button
                      className="cart-item__qty-btn"
                      onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="cart-item__qty-val">{item.quantity}</span>
                    <button
                      className="cart-item__qty-btn"
                      onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item__price">
                    {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                  </div>
                  <button
                    className="cart-item__remove"
                    onClick={() => removeFromCart(item.cartKey)}
                    aria-label="Удалить"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="cart__summary">
            <h2 className="cart__summary-title">Итого</h2>

            <div className="cart__summary-rows">
              <div className="cart__summary-row">
                <span>Товары ({totalItems})</span>
                <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
              </div>
              {promoApplied && (
                <div className="cart__summary-row cart__summary-row--discount">
                  <span>Скидка (SPORT10)</span>
                  <span>−{discount.toLocaleString('ru-RU')} ₽</span>
                </div>
              )}
              <div className="cart__summary-row">
                <span>Доставка</span>
                <span>{delivery === 0 ? <span className="cart__free-delivery">Бесплатно</span> : `${delivery} ₽`}</span>
              </div>
              {delivery > 0 && (
                <p className="cart__delivery-hint">
                  До бесплатной доставки: {(5000 - (totalPrice - discount)).toLocaleString('ru-RU')} ₽
                </p>
              )}
            </div>

            {/* Promo */}
            <div className="cart__promo">
              <h3 className="cart__promo-title">Промокод</h3>
              <div className="cart__promo-form">
                <input
                  type="text"
                  placeholder="Введите промокод"
                  value={promoCode}
                  onChange={e => {
                    setPromoCode(e.target.value);
                    setPromoError(false);
                  }}
                  className={`cart__promo-input ${promoError ? 'cart__promo-input--error' : ''} ${promoApplied ? 'cart__promo-input--success' : ''}`}
                  disabled={promoApplied}
                />
                <button
                  className="cart__promo-btn"
                  onClick={handlePromo}
                  disabled={promoApplied || !promoCode}
                >
                  {promoApplied ? '✓' : 'OK'}
                </button>
              </div>
              {promoError && <p className="cart__promo-error">Неверный промокод</p>}
              {promoApplied && <p className="cart__promo-success">Скидка 10% применена!</p>}
              <p className="cart__promo-hint">Попробуйте: SPORT10</p>
            </div>

            <div className="cart__summary-total">
              <span>К оплате</span>
              <span>{(finalPrice + delivery).toLocaleString('ru-RU')} ₽</span>
            </div>

            <button className="cart__checkout-btn" onClick={handleOrder}>
              Оформить заказ
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
              </svg>
            </button>

            <div className="cart__payment-icons">
              <span>VISA</span>
              <span>МИР</span>
              <span>MC</span>
              <span>SBP</span>
            </div>

            <Link to="/catalog" className="cart__continue-link">
              ← Продолжить покупки
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
