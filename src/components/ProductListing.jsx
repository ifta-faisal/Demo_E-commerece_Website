
import React, { useState } from 'react';
import './ProductListing.css';

const ProductListing = ({ onProductClick }) => {
    // Dummy Data matching screenshot somewhat
    const products = [
        {
            id: 1,
            title: "Antigravity A1 8K 360 Drone Standard Bundle",
            vendor: "ANTIGRAVITY",
            price: 1599.00,
            image: "https://v2.newbeedrone.com/cdn/shop/files/AIO_6df8b5b6-7512-424a-a128-09099857648e_360x.jpg?v=1704928099",
            stock: true
        },
        {
            id: 2,
            title: "Antigravity A1 8K 360 Drone Infinity Bundle",
            vendor: "ANTIGRAVITY",
            price: 1999.00,
            image: "https://v2.newbeedrone.com/cdn/shop/files/Frame_360x.jpg?v=1704928135",
            stock: true
        },
        {
            id: 3,
            title: "Antigravity A1 8K 360 Drone Explorer Bundle",
            vendor: "ANTIGRAVITY",
            price: 1899.00,
            image: "https://v2.newbeedrone.com/cdn/shop/files/Kit_360x.jpg?v=1704928156",
            stock: true
        },
        {
            id: 4,
            title: "TrueRC X-AIR 5.8 Mk. II (45deg)",
            vendor: "TRUERC",
            price: 39.99,
            image: "https://v2.newbeedrone.com/cdn/shop/files/PM03D_360x.jpg?v=1704870000",
            stock: true
        },
        {
            id: 5,
            title: "HDZero Gamma 45A HD-Ready AIO With Built-In ELRS",
            vendor: "HDZERO",
            price: 89.99,
            image: "https://v2.newbeedrone.com/cdn/shop/files/Filters_360x.jpg?v=1704860000",
            stock: true
        },
        {
            id: 6,
            title: "HDZero Camera Switcher 2",
            vendor: "HDZERO",
            price: 29.99,
            image: "https://v2.newbeedrone.com/cdn/shop/files/Lens_360x.jpg?v=1704860100",
            stock: true
        },
        {
            id: 7,
            title: "HDZero Rear-Mount Battery Case With SD Card Reader",
            vendor: "HDZERO",
            price: 59.99,
            image: "https://v2.newbeedrone.com/cdn/shop/files/AirUnit_360x.jpg?v=1704860200",
            soldOut: true,
            stock: false
        },
        {
            id: 8,
            title: "Flywoo O4 Wide Air Unit Pro 155° FOV",
            vendor: "FLYWOO",
            price: 189.99,
            image: "https://v2.newbeedrone.com/cdn/shop/products/NitroNectar_360x.jpg?v=1600000000",
            soldOut: true,
            stock: false
        },
        {
            id: 9,
            title: "NewBeeDrone LionBee Long Range ELRS2.4 AIO FlightControl",
            vendor: "NEWBEEDRONE",
            price: 69.99,
            image: "https://v2.newbeedrone.com/cdn/shop/products/Keychain_360x.jpg?v=1600000000",
            stock: true
        },
        {
            id: 10,
            title: "NewBeeDrone LionBee 3inch Frame",
            vendor: "NEWBEEDRONE",
            price: 14.99,
            image: "https://v2.newbeedrone.com/cdn/shop/files/AER_360x.jpg?v=1704000000",
            stock: true
        },
        {
            id: 11,
            title: "NewBeeDrone LionBee 3inch Long Range ELRS2.4 AIO Developer Kit",
            vendor: "NEWBEEDRONE",
            price: 159.99,
            image: "https://v2.newbeedrone.com/cdn/shop/files/Kit_360x.jpg?v=1704928156",
            stock: true
        },
        {
            id: 12,
            title: "Holybro PM03D Power Module With I2C Digital Power Monitoring",
            vendor: "HOLYBRO",
            price: 51.59,
            image: "https://v2.newbeedrone.com/cdn/shop/files/PM03D_360x.jpg?v=1704870000",
            stock: true
        }
    ];

    return (
        <div className="product-listing-page">
            <div className="page-header-centered">
                <h1>All Products</h1>
            </div>

            <div className="container main-layout">
                <div className="collection-title-row">
                    <h2>All Products</h2>
                </div>

                <div className="toolbar-full-width">
                    <div className="view-options">
                        <span>View As</span>
                        <button className="view-btn active" title="Grid View">
                            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"></path></svg>
                        </button>
                        <button className="view-btn" title="List View">
                            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>
                        </button>
                    </div>
                    <div className="sort-options">
                        <span className="sort-dropdown">Created Descending <span className="chevron">⌄</span></span>
                        <span className="product-count">1705 Products</span>
                    </div>
                </div>

                <div className="content-row">
                    {/* Sidebar */}
                    <aside className="sidebar">
                        <div className="filter-group">
                            <div className="filter-title">STOCK STATUS</div>
                            <ul className="filter-options">
                                <li>
                                    <div className="checkbox-wrap">
                                        <input type="checkbox" id="instock" />
                                        <label htmlFor="instock">In Stock</label>
                                    </div>
                                    <span className="count">(1121)</span>
                                </li>
                                <li>
                                    <div className="checkbox-wrap">
                                        <input type="checkbox" id="outofstock" />
                                        <label htmlFor="outofstock">Out Of Stock</label>
                                    </div>
                                    <span className="count">(584)</span>
                                </li>
                            </ul>
                        </div>

                        <div className="filter-group">
                            <div className="filter-title">VENDOR</div>
                            <ul className="filter-options">
                                {['3BHobby', '3DR', 'Amass', 'Antigravity', 'Aokoda', 'NewBeeDrone'].map((v, i) => (
                                    <li key={v}>
                                        <div className="checkbox-wrap">
                                            <input type="checkbox" />
                                            <label>{v}</label>
                                        </div>
                                        <span className="count">({Math.floor(Math.random() * 50) + 1})</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="view-more-link" style={{ fontSize: '0.8rem', color: '#666', marginTop: '10px', cursor: 'pointer' }}>View More</div>
                        </div>

                        <div className="filter-group">
                            <div className="filter-title">PRODUCT TYPE</div>
                            <ul className="filter-options">
                                {['3D Printing Lab', 'Accessories', 'Action Camera & Accessories', 'Antennas', 'Bags & Cases', 'Batteries'].map((v, i) => (
                                    <li key={v}>
                                        <div className="checkbox-wrap">
                                            <input type="checkbox" />
                                            <label>{v}</label>
                                        </div>
                                        <span className="count">({Math.floor(Math.random() * 100) + 1})</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="filter-group">
                            <div className="filter-title">PRICE</div>
                            <ul className="filter-options">
                                {['Under $ 10', '$ 10 - $ 50', '$ 50 - $ 100', '$ 100 - $ 250', '$ 250 - $ 500', '$ 500 - $ 1,000'].map(p => (
                                    <li key={p}>
                                        <div className="checkbox-wrap">
                                            <input type="checkbox" />
                                            <label>{p}</label>
                                        </div>
                                        <span className="count">({Math.floor(Math.random() * 600) + 1})</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Main Grid */}
                    <div className="product-grid-wrapper">
                        <div className="product-grid">
                            {products.map(product => (
                                <div className="product-card" key={product.id} onClick={() => onProductClick && onProductClick(product)} style={{ cursor: 'pointer' }}>
                                    {product.soldOut && <span className="sold-out-badge">Sold Out</span>}
                                    {product.onSale && <span className="old-sale-badge">On Sale</span>}

                                    <div style={{ width: '100%', height: '220px', background: 'transparent', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {product.image.includes('http') ? (
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                                onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
                                            />
                                        ) : null}
                                        <div style={{ display: 'none', flexDirection: 'column', alignItems: 'center' }}>
                                            <span>📷</span>
                                            <span style={{ fontSize: '0.7rem', marginTop: '5px' }}>Image</span>
                                        </div>
                                    </div>

                                    <div className="product-info">
                                        <h3 className="product-title">{product.title}</h3>
                                        <div className="product-vendor">{product.vendor}</div>
                                        <div className="product-price">
                                            ${product.price.toFixed(2)}
                                            {product.originalPrice && <span className="old-price">${product.originalPrice.toFixed(2)}</span>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pagination">
                            <button className="page-btn arrow-btn"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg></button>
                            <button className="page-btn active">1</button>
                            <button className="page-btn number-btn">2</button>
                            <button className="page-btn number-btn">3</button>
                            <span className="page-dots">...</span>
                            <button className="page-btn number-btn">72</button>
                            <button className="page-btn arrow-btn"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListing;
