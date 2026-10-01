import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState(null); // null, 'checking', 'success', 'error'

  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      if (foundProduct.colors && foundProduct.colors.length > 0) {
        setSelectedColor(foundProduct.colors[0]);
      }
    } else {
      navigate('/products');
    }
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (!product) {
    return <div className="min-vh-100"></div>;
  }

  const handleAddToCart = () => {
    addToCart({ ...product, selectedColor }, quantity);
  };

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (pincode.length !== 6) {
      showToast('Please enter a valid 6-digit pincode', 'error');
      return;
    }
    setDeliveryStatus('checking');
    setTimeout(() => {
      // Simulate fake validation
      if (['110001', '400001', '560001', '600001', '700001'].includes(pincode)) {
        setDeliveryStatus('success');
      } else {
        setDeliveryStatus('success'); // just allow all for frontend demo
      }
    }, 1000);
  };

  return (
    <div className="container py-5 fade-in">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb small">
          <li className="breadcrumb-item"><button className="btn btn-link p-0 text-decoration-none text-muted-custom" onClick={() => navigate('/')}>Home</button></li>
          <li className="breadcrumb-item"><button className="btn btn-link p-0 text-decoration-none text-muted-custom" onClick={() => navigate('/products')}>Products</button></li>
          <li className="breadcrumb-item"><button className="btn btn-link p-0 text-decoration-none text-muted-custom" onClick={() => navigate(`/products?category=${product.category}`)}>{product.category}</button></li>
          <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
        </ol>
      </nav>

      <div className="row g-5">
        {/* Container 1: Image Gallery */}
        <div className="col-lg-6">
          <div className="position-sticky" style={{ top: '100px' }}>
            <div className="card surface-card border-0 overflow-hidden mb-3">
              <div className="position-absolute top-0 start-0 p-3 z-2">
                {product.discount > 0 && <span className="badge bg-danger fs-6 px-3 py-2 rounded-pill">-{product.discount}% OFF</span>}
              </div>
              <div className="theme-bg-light p-4 d-flex align-items-center justify-content-center" style={{ height: '500px' }}>
                <img 
                  src={product.images[activeImage]} 
                  alt={product.name} 
                  className="img-fluid object-fit-contain w-100 h-100 fade-in"
                  style={{ maxHeight: '100%' }}
                />
              </div>
            </div>
            
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="d-flex gap-3 overflow-auto pb-2">
                {product.images.map((img, idx) => (
                  <div 
                    key={idx} 
                    className={`card border cursor-pointer ${activeImage === idx ? 'border-primary shadow-sm' : 'border-light'} overflow-hidden flex-shrink-0`}
                    style={{ width: '80px', height: '80px', cursor: 'pointer' }}
                    onClick={() => setActiveImage(idx)}
                  >
                    <img src={img} alt={`Thumb ${idx}`} className="w-100 h-100 object-fit-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Container 2 & beyond: Product Info */}
        <div className="col-lg-6">
          <div className="mb-4">
            <h1 className="fw-bold mb-2">{product.name}</h1>
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="d-flex align-items-center text-warning">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-half"></i>
                <span className="text-muted-custom ms-2 text-decoration-underline">{product.rating} ({product.reviews} reviews)</span>
              </div>
              <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3">In Stock</span>
            </div>
            
            <div className="mb-4">
              <span className="display-5 fw-bold text-primary mb-0 me-3">₹{product.price.toLocaleString()}</span>
              {product.discount > 0 && (
                <span className="fs-4 text-muted-custom text-decoration-line-through">₹{product.originalPrice.toLocaleString()}</span>
              )}
              <p className="text-success small mt-1 fw-medium">Inclusive of all taxes</p>
            </div>
          </div>

          <hr className="opacity-10 mb-4" />

          {/* Container 3: Description */}
          <div className="mb-4">
            <h6 className="fw-bold text-uppercase tracking-wider text-muted-custom mb-3">Description</h6>
            <p className="lead fs-6 text-muted-custom">{product.description}</p>
          </div>

          {/* Container 5: Colors/Variants */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-4">
              <h6 className="fw-bold text-uppercase tracking-wider text-muted-custom mb-3">Select Color: <span className="text-body fw-bold">{selectedColor}</span></h6>
              <div className="d-flex gap-3">
                {product.colors.map((color, idx) => (
                  <button 
                    key={idx}
                    className={`btn border px-4 py-2 rounded-pill ${selectedColor === color ? 'border-primary border-2 fw-bold text-primary bg-primary bg-opacity-10' : 'btn-light text-muted-custom'}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Container 6: Quantity & Actions */}
          <div className="mb-5">
            <h6 className="fw-bold text-uppercase tracking-wider text-muted-custom mb-3">Quantity</h6>
            <div className="d-flex align-items-center gap-4 flex-wrap">
              {/* Quantity Selector */}
              <div className="d-flex align-items-center border rounded-pill p-1" style={{ width: '130px', backgroundColor: 'var(--surface-color)' }}>
                <button className="btn btn-sm btn-link text-decoration-none px-3" style={{ color: 'var(--text-color)' }} onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <i className="bi bi-dash-lg"></i>
                </button>
                <input 
                  type="text" 
                  className="form-control border-0 bg-transparent text-center fw-bold p-0" 
                  value={quantity} 
                  readOnly 
                  style={{ width: '30px', color: 'var(--text-color)' }}
                />
                <button className="btn btn-sm btn-link text-decoration-none px-3" style={{ color: 'var(--text-color)' }} onClick={() => setQuantity(quantity + 1)}>
                  <i className="bi bi-plus-lg"></i>
                </button>
              </div>

              {/* Add to Cart */}
              <button className="btn btn-primary btn-lg rounded-pill px-5 flex-grow-1" onClick={handleAddToCart}>
                <i className="bi bi-bag-plus me-2"></i> Add to Cart
              </button>

              {/* Wishlist */}
              <button 
                className={`btn btn-icon border ${isInWishlist(product.id) ? 'border-danger text-danger bg-danger bg-opacity-10' : 'btn-light text-muted'}`}
                style={{ width: '48px', height: '48px' }}
                onClick={() => toggleWishlist(product)}
                title={isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                <i className={`bi ${isInWishlist(product.id) ? 'bi-heart-fill fs-5' : 'bi-heart fs-5'}`}></i>
              </button>
            </div>
          </div>

          {/* Container 7: Delivery Info */}
          <div className="card surface-card border-0 theme-bg-light p-4 mb-4">
            <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
              <i className="bi bi-truck text-primary"></i> Delivery Options
            </h6>
            <form onSubmit={handlePincodeCheck} className="mb-3">
              <div className="input-group">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Enter 6-digit Pincode" 
                  maxLength="6"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                />
                <button className="btn btn-dark" type="submit" disabled={deliveryStatus === 'checking'}>
                  {deliveryStatus === 'checking' ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Check'}
                </button>
              </div>
            </form>
            {deliveryStatus === 'success' && (
              <div className="text-success small mb-3 fade-in d-flex align-items-center gap-1">
                <i className="bi bi-check-circle-fill"></i> Delivery available. Order now to get it by {new Date(Date.now() + 3*24*60*60*1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}.
              </div>
            )}
            <ul className="list-unstyled mb-0 small text-muted-custom">
              <li className="mb-2"><i className="bi bi-box-seam me-2"></i> Free shipping on orders over ₹1000</li>
              <li className="mb-2"><i className="bi bi-arrow-return-left me-2"></i> 7 Days Replacement Policy</li>
              <li><i className="bi bi-shield-check me-2"></i> 1 Year Warranty</li>
            </ul>
          </div>

          {/* Container 4: Specifications */}
          <div className="mt-5 pt-3 border-top">
            <h4 className="fw-bold mb-4">Specifications</h4>
            <div className="table-responsive">
              <table className="table table-borderless table-striped">
                <tbody>
                  {Object.entries(product.specifications).map(([key, val], idx) => (
                    <tr key={idx}>
                      <th className="text-muted-custom fw-semibold" style={{ width: '40%' }}>{key}</th>
                      <td className="fw-medium">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
