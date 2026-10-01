import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  // Pick random products for trending and best sellers
  const trending = products.slice(0, 4);
  const bestSellers = products.slice(4, 8);

  const categories = [
    { name: 'Smart Watches', icon: 'bi-smartwatch', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=400' },
    { name: 'Earbuds', icon: 'bi-earbuds', image: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&q=80&w=400' },
    { name: 'Headphones', icon: 'bi-headset', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400' },
    { name: 'Speakers', icon: 'bi-speaker', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=400' }
  ];

  const features = [
    { title: 'Fast Delivery', desc: 'Free shipping on orders over ₹1000', icon: 'bi-truck' },
    { title: 'Secure Payments', desc: '100% secure payment gateways', icon: 'bi-shield-check' },
    { title: 'Easy Returns', desc: '7-day hassle-free returns', icon: 'bi-arrow-return-left' },
    { title: 'Genuine Products', desc: 'Direct from brand', icon: 'bi-patch-check' }
  ];

  return (
    <div className="fade-in">
      {/* 1. Hero Section */}
      <section className={`position-relative overflow-hidden ${isDarkMode ? 'bg-black' : 'bg-dark'}`} style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <img 
          src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=1920" 
          alt="Premium Smartwatch Hero"
          className="position-absolute w-100 h-100 object-fit-cover opacity-50"
          style={{ zIndex: 0 }}
        />
        <div className="container position-relative z-1 text-white py-5">
          <div className="row">
            <div className="col-lg-7 slide-up">
              <span className="badge bg-primary px-3 py-2 rounded-pill mb-4 fs-6">New Release</span>
              <h1 className="display-3 fw-bold mb-4 tracking-tight">Technology That <br/><span className="text-primary">Moves With You</span></h1>
              <p className="lead mb-5 opacity-75 fw-normal" style={{ maxWidth: '600px' }}>
                Experience the next generation of premium consumer electronics. 
                Designed for the bold, engineered for perfection.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <button onClick={() => navigate('/products')} className="btn btn-primary btn-lg px-5 rounded-pill shadow">
                  Shop Now
                </button>
                <button onClick={() => navigate('/products?category=Smart Watches')} className="btn btn-outline-light btn-lg px-5 rounded-pill">
                  Explore Collection
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Categories */}
      <section className="py-5 my-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Shop by Category</h2>
            <div className="bg-primary mx-auto rounded" style={{ height: '4px', width: '60px', marginTop: '15px' }}></div>
          </div>
          <div className="row g-4">
            {categories.map((cat, idx) => (
              <div key={idx} className="col-6 col-md-3">
                <div 
                  className="card surface-card border-0 text-center cursor-pointer h-100"
                  onClick={() => navigate(`/products?category=${cat.name}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="p-4 d-flex flex-column align-items-center justify-content-center h-100">
                    <i className={`bi ${cat.icon} display-4 text-primary mb-3`}></i>
                    <h5 className="fw-bold mb-0">{cat.name}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Trending Products */}
      <section className="py-5" style={{ backgroundColor: 'var(--hover-bg)' }}>
        <div className="container py-4">
          <div className="d-flex justify-content-between align-items-end mb-5">
            <div>
              <h2 className="fw-bold mb-2">Trending Right Now</h2>
              <p className="text-muted-custom mb-0">Discover what others are loving</p>
            </div>
            <Link to="/products" className="btn btn-outline-primary d-none d-md-block">View All</Link>
          </div>
          <div className="row g-4">
            {trending.map(product => (
              <div key={product.id} className="col-12 col-md-6 col-lg-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="text-center mt-4 d-md-none">
            <Link to="/products" className="btn btn-outline-primary w-100">View All Products</Link>
          </div>
        </div>
      </section>

      {/* 4. Best Sellers */}
      <section className="py-5 my-4">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Our Best Sellers</h2>
            <div className="bg-primary mx-auto rounded" style={{ height: '4px', width: '60px', marginTop: '15px' }}></div>
          </div>
          <div className="row g-4">
            {bestSellers.map(product => (
              <div key={product.id} className="col-12 col-md-6 col-lg-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Promotional Banner */}
      <section className="container mb-5 pb-4">
        <div className="card border-0 rounded-4 overflow-hidden shadow-lg position-relative" style={{ minHeight: '400px' }}>
          <img 
            src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=1200" 
            alt="Promo"
            className="position-absolute w-100 h-100 object-fit-cover"
          />
          <div className="position-absolute w-100 h-100" style={{ background: 'linear-gradient(90deg, rgba(11,15,25,0.9) 0%, rgba(11,15,25,0.4) 100%)' }}></div>
          <div className="position-relative z-1 d-flex align-items-center h-100 p-4 p-md-5">
            <div className="text-white" style={{ maxWidth: '500px' }}>
              <span className="text-primary fw-bold text-uppercase tracking-wider mb-2 d-block">Special Offer</span>
              <h2 className="display-5 fw-bold mb-4">Upgrade Your Everyday</h2>
              <p className="lead mb-4 opacity-75">Get up to 50% off on premium noise-cancelling headphones. Limited time offer.</p>
              <button onClick={() => navigate('/products?category=Headphones')} className="btn btn-primary btn-lg rounded-pill px-4">
                Shop Audio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why Choose Us */}
      <section className="py-5" style={{ backgroundColor: 'var(--hover-bg)' }}>
        <div className="container py-4">
          <div className="row g-4 text-center">
            {features.map((feat, idx) => (
              <div key={idx} className="col-6 col-lg-3">
                <div className="mb-3 d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary rounded-circle" style={{ width: '80px', height: '80px' }}>
                  <i className={`bi ${feat.icon} fs-1`}></i>
                </div>
                <h5 className="fw-bold">{feat.title}</h5>
                <p className="text-muted-custom small mb-0">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Customer Reviews */}
      <section className="py-5 my-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">What Our Customers Say</h2>
            <div className="bg-primary mx-auto rounded" style={{ height: '4px', width: '60px', marginTop: '15px' }}></div>
          </div>
          <div className="row g-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="col-md-4">
                <div className="card surface-card border-0 h-100 p-4">
                  <div className="text-warning mb-3">
                    <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
                  </div>
                  <p className="fst-italic text-muted-custom mb-4 flex-grow-1">
                    "{i === 1 ? 'The Voltix Chronos Pro is amazing. Battery life is stellar and it looks incredibly premium on the wrist.' : i === 2 ? 'Sound quality on the AirBuds Pro is unmatched at this price point. The ANC is a lifesaver during my commute.' : 'Fast delivery and genuine products. Will definitely buy again from Voltix.'}"
                  </p>
                  <div className="d-flex align-items-center gap-3">
                    <img src={`https://i.pravatar.cc/150?img=${i+10}`} alt="Customer" className="rounded-circle" width="50" height="50" />
                    <div>
                      <h6 className="fw-bold mb-0">{i === 1 ? 'Rahul Sharma' : i === 2 ? 'Priya Singh' : 'Amit Patel'}</h6>
                      <span className="text-muted-custom small">Verified Buyer</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
