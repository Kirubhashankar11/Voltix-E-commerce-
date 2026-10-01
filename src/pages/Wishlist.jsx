import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="container py-5 my-5 text-center fade-in">
        <i className="bi bi-heart text-muted-custom display-1 mb-4 opacity-50 d-block"></i>
        <h2 className="fw-bold mb-3">Your wishlist is waiting for something special.</h2>
        <p className="text-muted-custom mb-5">Keep track of your favorite items here.</p>
        <Link to="/products" className="btn btn-primary btn-lg rounded-pill px-5">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container py-5 fade-in">
      <div className="d-flex align-items-center justify-content-between mb-5">
        <h1 className="fw-bold mb-0">My Wishlist <span className="text-muted-custom fs-4 fw-normal">({wishlist.length})</span></h1>
      </div>

      <div className="row g-4">
        {wishlist.map(product => (
          <div key={product.id} className="col-12 col-md-6 col-lg-3">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
