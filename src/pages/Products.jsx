import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products as allProducts } from '../data/products';

const useQuery = () => new URLSearchParams(useLocation().search);

const Products = () => {
  const query = useQuery();
  const searchParam = query.get('search') || '';
  const categoryParam = query.get('category') || '';

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(searchParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sortOption, setSortOption] = useState('popular');
  const [priceRange, setPriceRange] = useState(10000);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Smart Watches', 'Earbuds', 'Headphones', 'Speakers', 'Accessories'];

  useEffect(() => {
    // Simulate network request
    setIsLoading(true);
    const timer = setTimeout(() => {
      let result = [...allProducts];

      // Filter by search
      if (searchTerm) {
        result = result.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
      }

      // Filter by category
      if (selectedCategory && selectedCategory !== 'All') {
        result = result.filter(p => p.category === selectedCategory);
      }

      // Filter by price
      result = result.filter(p => p.price <= priceRange);

      // Sorting
      switch (sortOption) {
        case 'price-low':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          // Assume ID defines newest (simplification)
          result.sort((a, b) => b.id.localeCompare(a.id));
          break;
        case 'popular':
        default:
          result.sort((a, b) => b.reviews - a.reviews);
          break;
      }

      setFilteredProducts(result);
      setIsLoading(false);
    }, 600); // 600ms fake loading

    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory, sortOption, priceRange]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setPriceRange(15000);
    setSortOption('popular');
  };

  return (
    <div className="container py-5 fade-in">
      <div className="row mb-4 align-items-center">
        <div className="col-md-6 mb-3 mb-md-0">
          <h1 className="fw-bold mb-1">Our Collection</h1>
          <p className="text-muted-custom mb-0">Discover premium electronics</p>
        </div>
        <div className="col-md-6 d-flex justify-content-md-end gap-2">
          <button className="btn btn-outline-primary d-lg-none flex-grow-1" onClick={() => setShowFilters(!showFilters)}>
            <i className="bi bi-funnel me-2"></i> Filters
          </button>
          <select 
            className="form-select w-auto" 
            value={sortOption} 
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="popular">Popularity</option>
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      <div className="row g-4">
        {/* Filters Sidebar */}
        <div className={`col-lg-3 ${showFilters ? 'd-block' : 'd-none d-lg-block'}`}>
          <div className="card surface-card border-0 p-4 sticky-lg-top" style={{ top: '100px', zIndex: 10 }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">Filters</h5>
              <button className="btn btn-link text-decoration-none p-0 text-muted-custom small" onClick={handleClearFilters}>Clear All</button>
            </div>

            {/* Search */}
            <div className="mb-4">
              <label className="form-label fw-semibold small text-uppercase text-muted-custom">Search</label>
              <div className="position-relative">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Find a product..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button 
                    className="btn border-0 position-absolute end-0 top-50 translate-middle-y text-muted-custom p-1 me-1"
                    onClick={() => setSearchTerm('')}
                  >
                    <i className="bi bi-x"></i>
                  </button>
                )}
              </div>
            </div>

            {/* Categories */}
            <div className="mb-4">
              <label className="form-label fw-semibold small text-uppercase text-muted-custom mb-3">Categories</label>
              <div className="d-flex flex-column gap-2">
                {categories.map(cat => (
                  <div className="form-check" key={cat}>
                    <input 
                      className="form-check-input" 
                      type="radio" 
                      name="category" 
                      id={`cat-${cat}`} 
                      checked={selectedCategory === cat || (cat === 'All' && !selectedCategory)}
                      onChange={() => setSelectedCategory(cat)}
                    />
                    <label className="form-check-label" htmlFor={`cat-${cat}`}>
                      {cat}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-2">
              <label className="form-label fw-semibold small text-uppercase text-muted-custom d-flex justify-content-between">
                <span>Max Price</span>
                <span className="text-primary fw-bold">₹{priceRange.toLocaleString()}</span>
              </label>
              <input 
                type="range" 
                className="form-range" 
                min="500" 
                max="15000" 
                step="500"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
              />
              <div className="d-flex justify-content-between text-muted-custom small mt-1">
                <span>₹500</span>
                <span>₹15,000+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="col-lg-9">
          {isLoading ? (
            <div className="row g-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="col-12 col-md-6 col-lg-4">
                  <div className="card surface-card border-0 h-100 p-3">
                    <div className="skeleton-box mb-3" style={{ height: '200px' }}></div>
                    <div className="skeleton-box mb-2" style={{ height: '20px', width: '40%' }}></div>
                    <div className="skeleton-box mb-3" style={{ height: '28px', width: '80%' }}></div>
                    <div className="skeleton-box" style={{ height: '24px', width: '30%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div>
              <div className="text-muted-custom mb-3 small">
                Showing {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''}
              </div>
              <div className="row g-4">
                {filteredProducts.map(product => (
                  <div key={product.id} className="col-12 col-md-6 col-lg-4">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-search display-1 text-muted-custom mb-4 opacity-50"></i>
              <h3 className="fw-bold mb-3">No products found</h3>
              <p className="text-muted-custom mb-4">We couldn't find any products matching your current filters.</p>
              <button className="btn btn-primary" onClick={handleClearFilters}>
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
