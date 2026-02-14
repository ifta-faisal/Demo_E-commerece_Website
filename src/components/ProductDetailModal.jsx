import React, { useState } from 'react';
import './ProductDetailModal.css';

const ProductDetailModal = ({ product, allProducts, onClose, isPage, onAddToCart, onAddToWishlist, convertPrice }) => {
    if (!product) return null;
    const [mainImage, setMainImage] = useState(product.imageUrl);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description'); // 'description', 'specification', 'reviews'

    // Reset quantity when product changes
    React.useEffect(() => {
        setQuantity(1);
    }, [product]);

    const handleIncrease = () => setQuantity(prev => prev + 1);
    const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const handleAddToCart = () => {
        if (onAddToCart) onAddToCart(quantity);
        alert(`Added ${quantity} of ${product.name} to cart!`);
    };

    const handleShopPay = () => {
        alert("Redirecting to Shop Pay...");
    };

    const handleWishlist = () => {
        if (onAddToWishlist) onAddToWishlist();
        alert(`${product.name} added to your wishlist!`);
    };
    const images = product.images && product.images.length > 0 ? product.images : [product.imageUrl];

    const createMarkup = (html) => ({ __html: html });

    return (
        <div className={isPage ? "product-page-container" : "modal-overlay"} onClick={!isPage ? onClose : undefined}>
            <div className={isPage ? "product-page-content" : "modal-content"} onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>&times;</button>

                <div className="modal-split-layout">
                    {/* LEFT COLUMN: Gallery */}
                    <div className="modal-gallery-column">
                        <div className="main-image-container">
                            {mainImage ? (
                                <img src={mainImage} alt={product.name} />
                            ) : (
                                <div className="no-image-placeholder">No Image</div>
                            )}
                        </div>
                        <div className="thumbnail-strip">
                            {images.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`thumbnail ৳{mainImage === img ? 'active' : ''}`}
                                    onClick={() => setMainImage(img)}
                                >
                                    <img src={img} alt="thumbnail" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: details */}
                    <div className="modal-details-column">

                        <h1 className="modal-title">{product.name}</h1>

                        <div className="modal-availability">
                            Availability: <span className="availability-status">{product.stock > 0 ? 'In Stock' : 'Available on backorder'}</span>
                        </div>

                        <div className="modal-price-box">
                            <span className="modal-price">{convertPrice(product.price)}</span>
                        </div>

                        <div className="modal-divider"></div>

                        <div className="modal-quantity-section">
                            <label>QUANTITY</label>
                            <div className="qty-control">
                                <button onClick={handleDecrease}>-</button>
                                <input type="text" value={quantity} readOnly />
                                <button onClick={handleIncrease}>+</button>
                            </div>
                        </div>


                        <button className="add-to-cart-btn" onClick={handleAddToCart}>ADD TO CART</button>

                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="product-tabs-container">
                    <div className="product-tabs">
                        <button
                            className={`tab-button ${activeTab === 'description' ? 'active' : ''}`}
                            onClick={() => setActiveTab('description')}
                        >
                            Description
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'specification' ? 'active' : ''}`}
                            onClick={() => setActiveTab('specification')}
                        >
                            Specification
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
                            onClick={() => setActiveTab('reviews')}
                        >
                            Reviews
                        </button>
                    </div>
                </div>

                {/* Description Tab */}
                {activeTab === 'description' && (
                    <>
                        {/* BOTTOM: Description */}
                        <div className="modal-description-full">
                            <h2>{product.name}</h2>

                            <div
                                className="description-content"
                                dangerouslySetInnerHTML={createMarkup(product.description)}
                            />

                            {/* Feature Banners Stack (Vertical) */}
                            {images && images.length > 0 && (
                                <div className="feature-banner-stack">
                                    {images.slice(0, 5).map((img, i) => (
                                        <img key={i} src={img} alt={`feature-${i}`} className="feature-banner-img" />
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}

                {/* Specification Tab */}
                {activeTab === 'specification' && (
                    <div className="modal-description-full">
                        <div className="specification-table-container">
                            <table className="specification-table">
                                <tbody>
                                    {product.specifications && Object.keys(product.specifications).length > 0 ? (
                                        Object.entries(product.specifications).map(([key, value], index) => (
                                            <tr key={index}>
                                                <td className="spec-label">{key}</td>
                                                <td className="spec-value">{value}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <>
                                            <tr>
                                                <td className="spec-label">Weight</td>
                                                <td className="spec-value">N/A</td>
                                            </tr>
                                            <tr>
                                                <td className="spec-label">Brand</td>
                                                <td className="spec-value">{product.vendor || 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <td className="spec-label">Category</td>
                                                <td className="spec-value">{product.category || 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <td className="spec-label">SKU</td>
                                                <td className="spec-value">{product.sku || 'N/A'}</td>
                                            </tr>
                                        </>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                    <div className="modal-reviews-section">
                        <div className="reviews-container">
                            <div className="reviews-left">
                                <h3>Based on 0 reviews</h3>
                                <div className="overall-rating">
                                    <span className="rating-number">0.0</span>
                                    <span className="rating-label">overall</span>
                                </div>
                                <div className="rating-breakdown">
                                    <div className="rating-bar-item">
                                        <span className="stars-display">★★★★★</span>
                                        <div className="bar-container">
                                            <div className="bar-fill" style={{ width: '0%' }}></div>
                                        </div>
                                        <span className="bar-count">0</span>
                                    </div>
                                    <div className="rating-bar-item">
                                        <span className="stars-display">★★★★☆</span>
                                        <div className="bar-container">
                                            <div className="bar-fill" style={{ width: '0%' }}></div>
                                        </div>
                                        <span className="bar-count">0</span>
                                    </div>
                                    <div className="rating-bar-item">
                                        <span className="stars-display">★★★☆☆</span>
                                        <div className="bar-container">
                                            <div className="bar-fill" style={{ width: '0%' }}></div>
                                        </div>
                                        <span className="bar-count">0</span>
                                    </div>
                                    <div className="rating-bar-item">
                                        <span className="stars-display">★★☆☆☆</span>
                                        <div className="bar-container">
                                            <div className="bar-fill" style={{ width: '0%' }}></div>
                                        </div>
                                        <span className="bar-count">0</span>
                                    </div>
                                    <div className="rating-bar-item">
                                        <span className="stars-display">★☆☆☆☆</span>
                                        <div className="bar-container">
                                            <div className="bar-fill" style={{ width: '0%' }}></div>
                                        </div>
                                        <span className="bar-count">0</span>
                                    </div>
                                </div>
                            </div>
                            <div className="reviews-right">
                                <p className="review-notice">Only logged in customers who have purchased this product may leave a review.</p>
                            </div>
                        </div>
                        <div className="no-reviews-message">
                            There are no reviews yet.
                        </div>
                    </div>
                )}

                {/* RELATED PRODUCTS */}
                <div className="related-products-section">
                    <h2>You may also like</h2>
                    <div className="related-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '20px',
                        padding: '20px 40px'
                    }}>
                        {allProducts && allProducts
                            .filter(p => p.sku !== product.sku) // Exclude current
                            .slice(0, 4) // Take first 4
                            .map((p, idx) => (
                                <div className="ap-product-card" key={idx} style={{ border: '1px solid #eee' }}>
                                    <div className="ap-image-wrapper" style={{ height: '200px' }}>
                                        {p.imageUrl ? (
                                            <img src={p.imageUrl} alt={p.name} />
                                        ) : (
                                            <div style={{ color: '#ccc' }}>No Image</div>
                                        )}
                                    </div>
                                    <div className="ap-info">
                                        <div className="ap-title" style={{ fontSize: '0.9rem' }} title={p.name}>{p.name}</div>
                                        <div className="ap-price">{convertPrice(p.price)}</div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailModal;
