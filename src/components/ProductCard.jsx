import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1550009158-9ebf6d1736de?auto=format&fit=crop&q=80&w=805'; // fallback electronic image
  };

  return (
    <div className="card surface-card h-100 border-0 overflow-hidden position-relative group">
      <div className="position-absolute top-0 end-0 p-3 z-2">
        <button 
          className={`btn btn-light rounded-circle shadow-sm p-2 d-flex align-items-center justify-content-center ${isInWishlist(product.id) ? 'text-danger' : 'text-muted'}`}
          style={{ width: '36px', height: '36px' }}
          onClick={() => toggleWishlist(product)}
        >
          <i className={`bi ${isInWishlist(product.id) ? 'bi-heart-fill' : 'bi-heart'}`}></i>
        </button>
      </div>
      
      {product.discount > 0 && (
        <div className="position-absolute top-0 start-0 p-3 z-2">
          <span className="badge bg-danger rounded-pill px-2 py-1">-{product.discount}%</span>
        </div>
      )}

      <Link to={`/products/${product.id}`} className="text-decoration-none">
        <div className="overflow-hidden theme-bg-light" style={{ height: '240px' }}>
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="card-img-top w-100 h-100 object-fit-cover" 
            onError={handleImageError}
            style={{ transition: 'transform 0.4s ease' }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>
      </Link>
      
      <div className="card-body d-flex flex-column p-4">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <span className="text-muted-custom small fw-medium text-uppercase tracking-wider">{product.category}</span>
          <div className="d-flex align-items-center gap-1 text-warning small">
            <i className="bi bi-star-fill"></i>
            <span className="text-muted-custom">{product.rating}</span>
          </div>
        </div>
        
        <Link to={`/products/${product.id}`} className="text-decoration-none mb-auto">
          <h5 className="card-title fw-bold mb-3" style={{ color: 'var(--text-color)' }}>{product.name}</h5>
        </Link>
        
        <div className="d-flex align-items-end justify-content-between mt-3">
          <div>
            <div className="fs-5 fw-bold text-primary">₹{product.price.toLocaleString()}</div>
            {product.discount > 0 && (
              <div className="text-muted-custom small text-decoration-line-through">₹{product.originalPrice.toLocaleString()}</div>
            )}
          </div>
          <button 
            className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center p-0" 
            style={{ width: '40px', height: '40px' }}
            onClick={() => addToCart(product)}
            title="Add to Cart"
          >
            <i className="bi bi-bag-plus fs-5"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
