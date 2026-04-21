import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, brands, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Catalog.css';

const sortOptions = [
  { value: 'default', label: 'По умолчанию' },
  { value: 'price-asc', label: 'Цена: по возрастанию' },
  { value: 'price-desc', label: 'Цена: по убыванию' },
  { value: 'rating', label: 'По рейтингу' },
  { value: 'reviews', label: 'По отзывам' }
];

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || 'Все');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'Все');
  const [sortBy, setSortBy] = useState('default');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const brand = searchParams.get('brand');
    const category = searchParams.get('category');
    const searchQ = searchParams.get('search');
    if (brand) setSelectedBrand(brand);
    if (category) setSelectedCategory(category);
    if (searchQ) setSearch(searchQ);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedBrand !== 'Все') {
      result = result.filter(p => p.brand === selectedBrand);
    }

    if (selectedCategory !== 'Все') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    if (priceRange.min) {
      result = result.filter(p => p.price >= Number(priceRange.min));
    }
    if (priceRange.max) {
      result = result.filter(p => p.price <= Number(priceRange.max));
    }

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'reviews': result.sort((a, b) => b.reviews - a.reviews); break;
      default: break;
    }

    return result;
  }, [selectedBrand, selectedCategory, sortBy, search, priceRange]);

  const handleBrand = (brand) => {
    setSelectedBrand(brand);
    setSearchParams({});
  };

  const handleCategory = (cat) => {
    setSelectedCategory(cat);
    setSearchParams({});
  };

  const resetFilters = () => {
    setSelectedBrand('Все');
    setSelectedCategory('Все');
    setSortBy('default');
    setSearch('');
    setPriceRange({ min: '', max: '' });
    setSearchParams({});
  };

  const hasFilters = selectedBrand !== 'Все' || selectedCategory !== 'Все' || search || priceRange.min || priceRange.max;

  return (
    <div className="catalog">
      <div className="catalog__hero">
        <div className="container">
          <h1 className="catalog__title">Каталог</h1>
          <p className="catalog__sub">
            {filtered.length} товаров
            {selectedBrand !== 'Все' && ` · ${selectedBrand}`}
            {selectedCategory !== 'Все' && ` · ${selectedCategory}`}
          </p>
        </div>
      </div>

      <div className="container catalog__layout">
        {/* Sidebar */}
        <aside className={`catalog__sidebar ${filterOpen ? 'catalog__sidebar--open' : ''}`}>
          <div className="catalog__sidebar-header">
            <h3>Фильтры</h3>
            {hasFilters && (
              <button className="catalog__reset-btn" onClick={resetFilters}>Сбросить</button>
            )}
          </div>

          {/* Search */}
          <div className="filter-group">
            <h4 className="filter-group__title">Поиск</h4>
            <input
              type="text"
              placeholder="Название товара..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="filter-search"
            />
          </div>

          {/* Brands */}
          <div className="filter-group">
            <h4 className="filter-group__title">Бренд</h4>
            <div className="filter-group__options">
              {brands.map(brand => (
                <button
                  key={brand}
                  className={`filter-option ${selectedBrand === brand ? 'filter-option--active' : ''}`}
                  onClick={() => handleBrand(brand)}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="filter-group">
            <h4 className="filter-group__title">Категория</h4>
            <div className="filter-group__options">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-option ${selectedCategory === cat ? 'filter-option--active' : ''}`}
                  onClick={() => handleCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="filter-group">
            <h4 className="filter-group__title">Цена (Сом)</h4>
            <div className="filter-price">
              <input
                type="number"
                placeholder="От"
                value={priceRange.min}
                onChange={e => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                className="filter-price__input"
              />
              <span className="filter-price__sep">—</span>
              <input
                type="number"
                placeholder="До"
                value={priceRange.max}
                onChange={e => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                className="filter-price__input"
              />
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="catalog__main">
          {/* Toolbar */}
          <div className="catalog__toolbar">
            <button
              className="catalog__filter-toggle"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
              </svg>
              Фильтры
            </button>
            <p className="catalog__count">{filtered.length} товаров</p>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="catalog__sort"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Active filters */}
          {hasFilters && (
            <div className="catalog__active-filters">
              {selectedBrand !== 'Все' && (
                <span className="active-filter">
                  {selectedBrand}
                  <button onClick={() => setSelectedBrand('Все')}>✕</button>
                </span>
              )}
              {selectedCategory !== 'Все' && (
                <span className="active-filter">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory('Все')}>✕</button>
                </span>
              )}
              {search && (
                <span className="active-filter">
                  «{search}»
                  <button onClick={() => setSearch('')}>✕</button>
                </span>
              )}
            </div>
          )}

          {/* Products */}
          {filtered.length > 0 ? (
            <div className="catalog__grid">
              {filtered.map((product, i) => (
                <div key={product.id} style={{ animationDelay: `${i * 0.05}s` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="catalog__empty">
              <div className="catalog__empty-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  <line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
              </div>
              <h3>Ничего не найдено</h3>
              <p>Попробуйте изменить параметры фильтра</p>
              <button className="catalog__empty-btn" onClick={resetFilters}>Сбросить фильтры</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
