import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const categoryImageMap = {
  Home: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
  Outdoors: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=900&q=80',
  Furniture: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
  Electronics: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
  Apparel: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
  Accessories: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80',
};

const categorySubtypes = {
  Home: ['All', 'Lighting', 'Decor', 'Kitchen'],
  Furniture: ['All', 'Seating', 'Desk', 'Storage'],
  Electronics: ['All', 'Audio', 'Visual', 'Work'],
  Outdoors: ['All', 'Hiking', 'Travel', 'Camping'],
  Apparel: ['All', 'Basics', 'Outerwear', 'Active'],
  Accessories: ['All', 'Wearables', 'Travel', 'Tech'],
};

const products = [
  { id: 1, name: 'Aurora Lamp', category: 'Home', subcategory: 'Lighting', brand: 'Luma', price: 189, color: 'Warm white', rating: 4.8, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80' },
  { id: 2, name: 'Flow Bottle', category: 'Outdoors', subcategory: 'Travel', brand: 'North', price: 42, color: 'Forest', rating: 4.6, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80' },
  { id: 3, name: 'Summit Chair', category: 'Furniture', subcategory: 'Seating', brand: 'Oak & Co.', price: 320, color: 'Oak', rating: 4.9, image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=900&q=80' },
  { id: 4, name: 'Pulse Headphones', category: 'Electronics', subcategory: 'Audio', brand: 'Echo', price: 260, color: 'Graphite', rating: 4.7, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80' },
  { id: 5, name: 'Harbor Throw', category: 'Home', subcategory: 'Decor', brand: 'North', price: 76, color: 'Sand', rating: 4.5, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=80' },
  { id: 6, name: 'Solstice Backpack', category: 'Outdoors', subcategory: 'Hiking', brand: 'Terra', price: 138, color: 'Slate', rating: 4.6, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80' },
  { id: 7, name: 'Vista Monitor', category: 'Electronics', subcategory: 'Visual', brand: 'Luma', price: 482, color: 'Black', rating: 4.8, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80' },
  { id: 8, name: 'Drift Desk', category: 'Furniture', subcategory: 'Desk', brand: 'Oak & Co.', price: 540, color: 'Walnut', rating: 4.9, image: categoryImageMap.Furniture },
  { id: 9, name: 'Cloud Speaker', category: 'Electronics', subcategory: 'Audio', brand: 'Echo', price: 180, color: 'White', rating: 4.4, image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80' },
  { id: 10, name: 'Ridge Hoodie', category: 'Apparel', subcategory: 'Outerwear', brand: 'Terra', price: 96, color: 'Stone', rating: 4.7, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80' },
  { id: 11, name: 'Breeze Mat', category: 'Home', subcategory: 'Decor', brand: 'Aster', price: 58, color: 'Ivory', rating: 4.3, image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=900&q=80' },
  { id: 12, name: 'Summit Trek', category: 'Outdoors', subcategory: 'Hiking', brand: 'Terra', price: 210, color: 'Copper', rating: 4.8, image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=900&q=80' },
  { id: 13, name: 'Nomad Stool', category: 'Furniture', subcategory: 'Seating', brand: 'Aster', price: 154, color: 'Terracotta', rating: 4.5, image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=900&q=80' },
  { id: 14, name: 'Mira Watch', category: 'Accessories', subcategory: 'Wearables', brand: 'Luma', price: 240, color: 'Silver', rating: 4.7, image: categoryImageMap.Accessories },
  { id: 15, name: 'Dune Mug', category: 'Home', subcategory: 'Kitchen', brand: 'Aster', price: 26, color: 'Clay', rating: 4.4, image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80' },
  { id: 16, name: 'Element Tee', category: 'Apparel', subcategory: 'Basics', brand: 'North', price: 44, color: 'Midnight', rating: 4.6, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80' },
];

const categoryOptions = ['All', 'Home', 'Furniture', 'Electronics', 'Outdoors', 'Apparel', 'Accessories'];
const brandOptions = ['All', 'Luma', 'North', 'Oak & Co.', 'Echo', 'Terra', 'Aster'];
const priceOptions = [120, 200, 350, 500];
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

const numberFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

function getInitialParamValue(searchParams, key, fallback) {
  const value = searchParams.get(key);
  if (value == null || value === '') return fallback;
  return value;
}

function clampPage(value, totalPages) {
  if (!Number.isFinite(value)) return 1;
  return Math.min(Math.max(value, 1), totalPages || 1);
}

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cartCount, setCartCount] = useState(0);
  const [addedProductIds, setAddedProductIds] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const drawerRef = useRef(null);
  const firstFilterButtonRef = useRef(null);
  const renderCountRef = useRef(0);

  const searchTerm = getInitialParamValue(searchParams, 'q', '');
  const selectedCategory = getInitialParamValue(searchParams, 'category', 'All');
  const selectedSubcategory = getInitialParamValue(searchParams, 'subcat', 'All');
  const selectedBrand = getInitialParamValue(searchParams, 'brand', 'All');
  const selectedPrice = Number(getInitialParamValue(searchParams, 'price', '500')) || 500;
  const selectedSort = getInitialParamValue(searchParams, 'sort', 'featured');
  const currentPage = Math.max(Number(getInitialParamValue(searchParams, 'page', '1')) || 1, 1);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const updateSearchParam = useCallback(
    (key, value) => {
      const next = new URLSearchParams(searchParams);
      if (value === '' || value === 'All' || value === '1') {
        next.delete(key);
      } else {
        next.set(key, String(value));
      }
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  const updateSearchParams = useCallback(
    (updates) => {
      const next = new URLSearchParams(searchParams);
      Object.entries(updates).forEach(([key, value]) => {
        if (value === '' || value === 'All' || value === '1') {
          next.delete(key);
        } else {
          next.set(key, String(value));
        }
      });
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  const handleSearchChange = useCallback(
    (event) => {
      const nextValue = event.target.value;
      updateSearchParams({ q: nextValue, page: 1 });
    },
    [updateSearchParams],
  );

  const resetFilters = useCallback(() => {
    setSearchParams({}, { replace: true });
    setIsFiltersOpen(false);
  }, [setSearchParams]);

  useEffect(() => {
    renderCountRef.current += 1;
    console.debug('[FilterMart render]', renderCountRef.current, {
      searchTerm,
      selectedCategory,
      selectedBrand,
      selectedPrice,
      selectedSort,
      currentPage,
    });
  });

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && isFiltersOpen) {
        setIsFiltersOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isFiltersOpen]);

  useEffect(() => {
    if (!isFiltersOpen) return;
    const focusTarget = drawerRef.current?.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    focusTarget?.focus();
  }, [isFiltersOpen]);

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    const results = products.filter((product) => {
      const matchesQuery =
        query === '' ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.color.toLowerCase().includes(query) ||
        product.subcategory.toLowerCase().includes(query);

      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSubcategory =
        selectedCategory === 'All' ||
        selectedSubcategory === 'All' ||
        product.subcategory === selectedSubcategory;
      const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand;
      const matchesPrice = product.price <= selectedPrice;

      return matchesQuery && matchesCategory && matchesSubcategory && matchesBrand && matchesPrice;
    });

    switch (selectedSort) {
      case 'price-low':
        return [...results].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...results].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...results].sort((a, b) => b.rating - a.rating);
      default:
        return results;
    }
  }, [searchTerm, selectedCategory, selectedBrand, selectedPrice, selectedSort]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / 6));
  const safeCurrentPage = clampPage(currentPage, totalPages);

  const paginatedProducts = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * 6;
    return filteredProducts.slice(startIndex, startIndex + 6);
  }, [filteredProducts, safeCurrentPage]);

  const updateSelection = useCallback(
    (key, value) => {
      if (key === 'category') {
        updateSearchParams({ category: value, subcat: 'All', page: 1 });
        return;
      }

      if (key === 'subcat') {
        updateSearchParams({ subcat: value, page: 1 });
        return;
      }

      updateSearchParams({ [key]: value, page: 1 });
    },
    [updateSearchParams],
  );

  const handlePageChange = useCallback(
    (nextPage) => {
      const next = clampPage(nextPage, totalPages);
      updateSearchParam('page', next);
    },
    [totalPages, updateSearchParam],
  );

  const resultsSummary = filteredProducts.length === 1 ? '1 result' : `${filteredProducts.length} results`;
  const activeSubcategories = selectedCategory === 'All' ? [] : categorySubtypes[selectedCategory] || ['All'];
  const cartProducts = useMemo(
    () => products.filter((product) => addedProductIds[product.id]),
    [addedProductIds],
  );

  const handleAddToCart = useCallback((productId) => {
    setAddedProductIds((current) => {
      const isAdded = Boolean(current[productId]);

      setCartCount((count) => (isAdded ? Math.max(0, count - 1) : count + 1));

      return {
        ...current,
        [productId]: !isAdded,
      };
    });
  }, []);

  return (
    <div className="page-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Marketplace</p>
          <h1>FilterMart</h1>
        </div>

        <div className="topbar-actions">
          <button
            type="button"
            className="cart-badge"
            aria-live="polite"
            aria-expanded={isCartOpen}
            aria-controls="cart-drawer"
            onClick={() => setIsCartOpen(true)}
          >
            Cart <span>{cartCount}</span>
          </button>
          <label className="search-box" htmlFor="product-search">
            <span className="sr-only">Search products</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.5 3a7.5 7.5 0 015.9 12.8l4.4 4.4 1.4-1.4-4.4-4.4A7.5 7.5 0 1110.5 3zm0 2a5.5 5.5 0 100 11 5.5 5.5 0 000-11z"/></svg>
            <input
              id="product-search"
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search products, brands, categories"
              aria-label="Search products"
            />
          </label>

          <button type="button" className="secondary-button" onClick={() => setIsFiltersOpen(true)}>
            Filters
          </button>
        </div>
      </header>

      <main className="content-grid">
        <aside className="sidebar desktop-sidebar" aria-label="Product filters">
          <div className="panel-header">
            <h2>Filters</h2>
            <button type="button" className="link-button" onClick={resetFilters}>Reset</button>
          </div>

          <FilterGroup title="Category">
            {categoryOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={selectedCategory === option ? 'chip active' : 'chip'}
                onClick={() => updateSelection('category', option)}
              >
                {option}
              </button>
            ))}
          </FilterGroup>

          {selectedCategory !== 'All' && (
            <FilterGroup title="Subcategory">
              {activeSubcategories.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={selectedSubcategory === option ? 'chip active' : 'chip'}
                  onClick={() => updateSelection('subcat', option)}
                >
                  {option}
                </button>
              ))}
            </FilterGroup>
          )}

          <FilterGroup title="Brand">
            {brandOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={selectedBrand === option ? 'chip active' : 'chip'}
                onClick={() => updateSelection('brand', option)}
              >
                {option}
              </button>
            ))}
          </FilterGroup>

          <FilterGroup title="Max price">
            <div className="price-slider-wrap">
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={selectedPrice}
                onChange={(event) => updateSelection('price', Number(event.target.value))}
                aria-label="Set maximum price"
              />
              <div className="price-readout">
                <span>Up to</span>
                <strong>{numberFormatter.format(selectedPrice)}</strong>
              </div>
            </div>
          </FilterGroup>
        </aside>

        <section className="results-panel">
          <div className="results-toolbar">
            <div aria-live="polite" className="results-summary">
              {resultsSummary}
            </div>

            <label className="sort-select">
              <span>Sort</span>
              <select value={selectedSort} onChange={(event) => updateSelection('sort', event.target.value)}>
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="product-grid">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <article key={product.id} className="product-card" tabIndex={0}>
                  <div
                    className="product-visual"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(10,16,25,0.10), rgba(10,16,25,0.68)), url(${product.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="visual-badge">
                      <span aria-hidden="true">{product.category === 'Home' ? '🏡' : product.category === 'Outdoors' ? '🥾' : product.category === 'Furniture' ? '🪑' : product.category === 'Electronics' ? '🎧' : product.category === 'Apparel' ? '👕' : '✨'}</span>
                      <span>{product.category}</span>
                    </div>
                  </div>
                  <div className="product-body">
                    <div className="product-meta">
                      <span>{product.brand}</span>
                      <span>{product.rating.toFixed(1)} ★</span>
                    </div>
                    <h3>{product.name}</h3>
                    <p>{product.color}</p>
                    <div className="product-footer">
                      <strong>{numberFormatter.format(product.price)}</strong>
                      <div className="product-action-group">
                        {addedProductIds[product.id] ? (
                          <>
                            <span className="success-pill" aria-live="polite">Added</span>
                            <button
                              type="button"
                              className="remove-inline"
                              onClick={() => handleAddToCart(product.id)}
                            >
                              Remove
                            </button>
                          </>
                        ) : (
                          <button type="button" onClick={() => handleAddToCart(product.id)}>
                            Add to cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="empty-state">
                <h3>No products match your filters.</h3>
                <button type="button" className="primary-button" onClick={resetFilters}>Clear filters</button>
              </div>
            )}
          </div>

          {filteredProducts.length > 0 && (
            <nav className="pagination" aria-label="Pagination navigation">
              <button type="button" onClick={() => handlePageChange(safeCurrentPage - 1)} disabled={safeCurrentPage === 1}>
                Previous
              </button>
              <span>
                Page {safeCurrentPage} of {totalPages}
              </span>
              <button type="button" onClick={() => handlePageChange(safeCurrentPage + 1)} disabled={safeCurrentPage === totalPages}>
                Next
              </button>
            </nav>
          )}
        </section>
      </main>

      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
          <aside
            id="cart-drawer"
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="panel-header">
              <div>
                <p className="eyebrow">Your selection</p>
                <h2 id="cart-title">Cart ({cartCount})</h2>
              </div>
              <button type="button" className="close-button" onClick={() => setIsCartOpen(false)} aria-label="Close cart">
                ×
              </button>
            </div>

            {cartProducts.length > 0 ? (
              <div className="cart-items">
                {cartProducts.map((product) => (
                  <div className="cart-item" key={product.id}>
                    <img src={product.image} alt="" />
                    <div className="cart-item-details">
                      <strong>{product.name}</strong>
                      <span>{numberFormatter.format(product.price)}</span>
                    </div>
                    <button
                      type="button"
                      className="remove-cart-button"
                      onClick={() => handleAddToCart(product.id)}
                      aria-label={`Remove ${product.name} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="cart-empty">
                <p>Your cart is empty.</p>
                <span>Add a product to see it here.</span>
              </div>
            )}
          </aside>
        </div>
      )}

      {isFiltersOpen && (
        <div className="drawer-overlay" onClick={() => setIsFiltersOpen(false)}>
          <aside
            ref={drawerRef}
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="filter-title"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => {
              if (event.key === 'Tab') {
                const focusable = drawerRef.current?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                if (!focusable || !focusable.length) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                  event.preventDefault();
                  last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                  event.preventDefault();
                  first.focus();
                }
              }
            }}
          >
            <div className="panel-header">
              <h2 id="filter-title">Filters</h2>
              <button type="button" className="close-button" onClick={() => setIsFiltersOpen(false)} aria-label="Close filters">
                ×
              </button>
            </div>

            <div className="drawer-body">
              <FilterGroup title="Category">
                {categoryOptions.map((option) => (
                  <button
                    key={option}
                    ref={option === 'All' ? firstFilterButtonRef : null}
                    type="button"
                    className={selectedCategory === option ? 'chip active' : 'chip'}
                    onClick={() => {
                      updateSelection('category', option);
                      setIsFiltersOpen(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </FilterGroup>

              {selectedCategory !== 'All' && (
                <FilterGroup title="Subcategory">
                  {(categorySubtypes[selectedCategory] || ['All']).map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={selectedSubcategory === option ? 'chip active' : 'chip'}
                      onClick={() => {
                        updateSelection('subcat', option);
                        setIsFiltersOpen(false);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </FilterGroup>
              )}

              <FilterGroup title="Brand">
                {brandOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={selectedBrand === option ? 'chip active' : 'chip'}
                    onClick={() => {
                      updateSelection('brand', option);
                      setIsFiltersOpen(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </FilterGroup>

              <FilterGroup title="Max price">
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={selectedPrice}
                  onChange={(event) => updateSelection('price', Number(event.target.value))}
                  aria-label="Set maximum price in drawer"
                />
                <div className="price-readout">
                  <span>Up to</span>
                  <strong>{numberFormatter.format(selectedPrice)}</strong>
                </div>
              </FilterGroup>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ title, children }) {
  return (
    <div className="filter-group">
      <h3>{title}</h3>
      <div className="filter-options">{children}</div>
    </div>
  );
}

export default App;
