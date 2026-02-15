import { useState, useEffect } from 'react';
import './App.css';
import './components/FeaturedProducts.css'; // Import the premium styles
import Header from './components/Header';
import Hero from './components/Hero';
import HomeSlideshow from './components/HomeSlideshow';
import Footer from './components/Footer';
import axios from 'axios';

import AllProducts from './components/AllProducts';
import ProductDetailModal from './components/ProductDetailModal';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import OrderReceivedPage from './components/OrderReceivedPage';
import AboutUs from './components/AboutUs';
import ShippingReturns from './components/ShippingReturns';
import TermsConditions from './components/TermsConditions';

const App = () => {
  const [products, setProducts] = useState([]);
  // Retrieve state from local storage or default
  const [view, setView] = useState(() => localStorage.getItem('app_view') || 'home');
  const [selectedProduct, setSelectedProduct] = useState(() => {
    const saved = localStorage.getItem('app_selected_product');
    return saved ? JSON.parse(saved) : null;
  });
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('app_cart_items');
    return saved ? JSON.parse(saved) : [];
  });
  const [productCategory, setProductCategory] = useState(() => localStorage.getItem('app_product_category') || null);
  const [productVendor, setProductVendor] = useState(() => localStorage.getItem('app_product_vendor') || null);

  // Persistence Effects
  useEffect(() => { localStorage.setItem('app_view', view); }, [view]);
  useEffect(() => {
    if (selectedProduct) localStorage.setItem('app_selected_product', JSON.stringify(selectedProduct));
    else localStorage.removeItem('app_selected_product');
  }, [selectedProduct]);
  useEffect(() => { localStorage.setItem('app_cart_items', JSON.stringify(cartItems)); }, [cartItems]);
  useEffect(() => {
    if (productCategory) localStorage.setItem('app_product_category', productCategory);
    else localStorage.removeItem('app_product_category');
  }, [productCategory]);
  useEffect(() => {
    if (productVendor) localStorage.setItem('app_product_vendor', productVendor);
    else localStorage.removeItem('app_product_vendor');
  }, [productVendor]);

  const [wishlistCount, setWishlistCount] = useState(0);
  const [lastOrder, setLastOrder] = useState(null);

  // Derived state for header count
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [theme, setTheme] = useState(() => {
    // Check localStorage or default to light
    return localStorage.getItem('theme') || 'light';
  });

  // Currency State
  const [currency, setCurrency] = useState('BDT');
  const EXCHANGE_RATE = 123.80; // 1 USD = 123.80 BDT

  const convertPrice = (priceInBDT) => {
    if (currency === 'USD') {
      return `$${(priceInBDT / EXCHANGE_RATE).toFixed(2)}`;
    }
    return `৳${priceInBDT.toFixed(2)}`;
  };

  useEffect(() => {
    // Apply theme to document root
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error("Failed to fetch products", err));
  }, []);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() !== '') {
      setView('products');
      setSelectedProduct(null);
      window.scrollTo(0, 0);
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event) => {
      // If we have state in the history, use it
      if (event.state) {
        setView(event.state.view);
        setSelectedProduct(event.state.selectedProduct || null);

        // Handle optional params
        // Note: productCategory and setProductCategory would need to be updated 
        // using the persisted or passed values.
        // But previously we removed the useState for productCategory in the file view?
        // Wait, looking at the previous file content (Step 452), lines 31-32 define:
        // const [productCategory, setProductCategory] = useState(...)
        // So they exist.

        if (event.state.category !== undefined) setProductCategory(event.state.category);
        if (event.state.vendor !== undefined) setProductVendor(event.state.vendor);
        if (event.state.searchQuery !== undefined) setSearchQuery(event.state.searchQuery);

      } else {
        // Fallback or Initial Load? 
        // If there's no state, we might rely on the localStorage persistence 
        // that we just set up. But popstate usually means we went back to a "null" state entry?
        // Actually, usually the initial entry has no state unless we replaceState on load.
        // Let's just reload the view from the current persisted storage if null, or default to home.
        // Simpler: behave like a fresh load, let the localStorage init take over? 
        // No, popstate doesn't re-run init.
        // Let's assume hitting "Back" out of our app (if possible) is handled by browser.
        // If we are IN the app, popping to a null state usually means the initial entry.
        // Let's try to map the URL hash if possible, or just default.
        setView('home');
        setSelectedProduct(null);
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Replace current state on initial load
    window.history.replaceState({
      view,
      selectedProduct,
      category: productCategory,
      vendor: productVendor,
      searchQuery
    }, '');

    return () => window.removeEventListener('popstate', handlePopState);
  }, []); // Run once on mount

  const handleNavigate = (page, category = null, vendor = null) => {
    // Push new state
    const newState = { view: page, category, vendor, searchQuery: '' };
    window.history.pushState(newState, '', `#${page}`);

    setView(page);
    window.scrollTo(0, 0);
    setSelectedProduct(null);
    if (page === 'home') {
      setSearchQuery('');
    }
    setProductCategory(category);
    setProductVendor(vendor);
  };

  const showProductDetail = (p) => {
    // Push new state
    const newState = { view: 'product-detail', selectedProduct: p };
    // Safe ID for URL
    const safeId = p.sku || p.name.replace(/\s+/g, '-').toLowerCase();
    window.history.pushState(newState, '', `#product/${safeId}`);

    setSelectedProduct(p);
    // Switch to full page view for product
    setView('product-detail');
    window.scrollTo(0, 0);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
    // Return to home or products depending on history (simplified here to home or products)
    if (searchQuery) {
      setView('products');
    } else {
      setView('home');
    }
  };

  const handleAddToCart = (product, qty = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.name === product.name); // Using name as ID for now since ID might be missing in CSV
      if (existing) {
        return prev.map(item =>
          item.name === product.name ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const handleUpdateCartQty = (productId, newQty) => {
    setCartItems(prev => prev.map(item => item.id === productId || item.name === productId ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveCartItem = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId && item.name !== productId));
  };

  const handleAddToWishlist = () => {
    setWishlistCount(prev => prev + 1);
  };

  const handleCheckout = () => {
    setView('checkout');
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = (details) => {
    // Generate order object
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shippingCost = details?.shippingCost || 150;
    const total = subtotal + shippingCost;
    const items = cartItems.map(item => ({
      productId: item._id || '000000000000000000000000', // Mock Object ID if missing
      name: item.name,
      quantity: item.quantity,
      price: item.price
    }));

    // Prepare payload for backend
    const orderPayload = {
      userId: '507f1f77bcf86cd799439011', // Dummy guest ID until auth is ready or fetch real ID if stored
      items: items,
      billingDetails: details.billingDetails,
      shippingMethod: details.shippingMethod,
      shippingCost: shippingCost,
      paymentMethod: details.paymentMethod,
    };

    axios.post('http://localhost:5000/api/orders', orderPayload)
      .then(response => {
        console.log('Order created:', response.data);
        // Use the server's order object for the receipt if available
        const serverOrder = response.data.order;

        const clientOrder = {
          orderNumber: serverOrder?.orderId || serverOrder?._id || Math.floor(10000 + Math.random() * 90000),
          date: new Date().toLocaleDateString(),
          total: serverOrder?.totalAmount || total,
          paymentMethod: serverOrder?.paymentMethod || details.paymentMethod,
          cartItems: [...cartItems],
          subtotal: subtotal,
          shippingCost: shippingCost,
          shippingMethod: details.shippingMethod,
          billing: details.billingDetails
        };

        setLastOrder(clientOrder);
        setCartItems([]);
        setView('order-received');
        window.scrollTo(0, 0);
      })
      .catch(error => {
        console.error('Error placing order:', error);
        alert('Failed to place order. Please try again. check console for details');
      });


  };

  return (
    <div className="app-container">
      <Header
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={toggleTheme}
        onSearch={handleSearch}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        currency={currency}
        setCurrency={setCurrency}
      />

      {view === 'home' && (
        <>
          <Hero onNavigate={handleNavigate} />
          <section className="featured-section container" style={{ maxWidth: '1300px', margin: '0 auto', padding: '60px 20px', position: 'relative' }}>
            <h2 className="section-heading">FEATURED PRODUCTS</h2>

            {products.length === 0 ? (
              <p style={{ textAlign: 'center' }}>Loading products...</p>
            ) : (
              <div className="product-grid-4">
                {products.slice(0, 4).map((p, idx) => (
                  <div className="product-card-v2" key={idx} onClick={() => showProductDetail(p)} style={{ cursor: 'pointer' }}>
                    <div className="card-image-wrapper">
                      <div className="image-container">
                        {p.imageUrl ? (
                          <img src={p.imageUrl} alt={p.name} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>No Image</div>
                        )}
                        <div className="text-overlay">
                          <h3>{p.name.split(' ').slice(0, 3).join(' ')}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="card-details">
                      <p className="product-title" title={p.name} style={{ minHeight: '60px', fontSize: '0.9rem', lineHeight: '1.4' }}>{p.name}</p>
                      <div className="price-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
                        <span className="sale-price" style={{ fontSize: '1.1rem', color: '#d50055' }}>{convertPrice(p.price)}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(p, 1);
                          }}
                          style={{
                            background: '#000',
                            border: 'none',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            padding: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            transition: 'transform 0.2s, background 0.2s',
                            width: '32px',
                            height: '32px'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                            e.currentTarget.style.background = '#d50055';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.background = '#000';
                          }}
                        >
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </section>
        </>
      )}

      {view === 'products' && (
        <AllProducts products={filteredProducts} onProductClick={showProductDetail} initialCategory={productCategory} initialVendor={productVendor} convertPrice={convertPrice} />
      )}

      {view === 'product-detail' && selectedProduct && (
        <div className="product-page-wrapper">
          <ProductDetailModal
            product={selectedProduct}
            allProducts={products}
            onClose={closeProductDetail}
            isPage={true}
            onAddToCart={(qty) => handleAddToCart(selectedProduct, qty)}
            onAddToWishlist={handleAddToWishlist}
            convertPrice={convertPrice}
            onNavigateToProduct={showProductDetail}
            onAddToCartAny={handleAddToCart}
          />
        </div>
      )}

      {/* Removed the modal popover logic since we are using full page view now */}

      {view === 'free-offers' && <div style={{ padding: '50px', textAlign: 'center' }}><h2>Free Offers Page</h2><p>Coming Soon!</p></div>}
      {view === 'daily-deals' && <div style={{ padding: '50px', textAlign: 'center' }}><h2>Daily Deals Page</h2><p>Coming Soon!</p></div>}
      {view === 'cart' && <CartPage cartItems={cartItems} onUpdateQuantity={handleUpdateCartQty} onRemoveItem={handleRemoveCartItem} onCheckout={handleCheckout} convertPrice={convertPrice} />}
      {view === 'checkout' && <CheckoutPage cartItems={cartItems} onPlaceOrder={handlePlaceOrder} convertPrice={convertPrice} />}
      {view === 'order-received' && <OrderReceivedPage orderData={lastOrder} convertPrice={convertPrice} />}
      {view === 'login' && <div style={{ padding: '50px', textAlign: 'center' }}><h2>Login</h2><p>Login functionality coming soon.</p></div>}
      {view === 'about' && <AboutUs />}
      {view === 'shipping' && <ShippingReturns />}
      {view === 'terms' && <TermsConditions />}

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
