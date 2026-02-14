
import React from 'react';
import '../components/ProductListing.css'; // Reuse existing styles as it's identical layout

const DailyDeals = () => {
    // Dummy Data for Daily Deals based on screenshot
    const products = [
        {
            id: 1,
            title: "IFlight XING2 3110 1600KV (3 Motors)",
            vendor: "IFLIGHT",
            price: 54.99,
            originalPrice: 109.98,
            image: "https://v2.newbeedrone.com/cdn/shop/files/XING2_360x.jpg?v=1700000000",
            soldOut: true,
            onSale: false // Screenshot shows SOLD OUT badge, but price is discounted. Usually Sold Out takes precedence or both. Screenshot shows SOLD OUT (white/orange).
        },
        {
            id: 2,
            title: "OddityRC Mage Pro Frame Kit",
            vendor: "ODDITYRC",
            price: 39.99,
            originalPrice: 45.99,
            image: "https://v2.newbeedrone.com/cdn/shop/files/Mage_360x.jpg?v=1700000000",
            soldOut: true,
            onSale: false
        },
        {
            id: 3,
            title: "Holy Stone HS600 2-Axis Gimbal Drones With 4K EIS Camera For Adults, Integrated Remote ID, 2 Batteries 56-Min Flight Time, 10000 FT Range Transmission, GPS Drone With Brushless Motors, 4K/30FPS",
            vendor: "HOLY STONE",
            price: 289.99,
            originalPrice: 339.99,
            image: "https://v2.newbeedrone.com/cdn/shop/files/HS600_360x.jpg?v=1700000000",
            onSale: true
        },
        {
            id: 4,
            title: "GEPRC CineLog 35 HD CineWhoop Drone - Caddx Nebula Pro - TBS Crossfire 6S",
            vendor: "GEPRC",
            price: 379.99,
            originalPrice: 447.99,
            image: "https://v2.newbeedrone.com/cdn/shop/files/CineLog35_360x.jpg?v=1700000000",
            onSale: true
        },
        {
            id: 5,
            title: "IFlight iH3 O3 4S HD BNF",
            vendor: "IFLIGHT",
            price: 459.99,
            originalPrice: 559.99,
            image: "https://v2.newbeedrone.com/cdn/shop/files/iH3_360x.jpg?v=1700000000",
            onSale: true
        },
        {
            id: 6,
            title: "Foxeer Donut 5145 Props",
            vendor: "FOXEER",
            price: 3.59,
            originalPrice: 3.99,
            image: "https://v2.newbeedrone.com/cdn/shop/files/Donut_360x.jpg?v=1700000000",
            onSale: true
        },
        {
            id: 7,
            title: "Foxeer HDZero HD 720P Digital VTx Race Edition",
            vendor: "FOXEER",
            price: 59.90,
            originalPrice: 69.90,
            image: "https://v2.newbeedrone.com/cdn/shop/files/HDZero_360x.jpg?v=1700000000",
            onSale: true
        },
        {
            id: 8,
            title: "DJI Mic (1 TX + 1 RX)",
            vendor: "DJI",
            price: 199.00,
            originalPrice: 219.00,
            image: "https://v2.newbeedrone.com/cdn/shop/files/Mic_360x.jpg?v=1700000000",
            onSale: true
        }
    ];

    return (
        <div className="product-listing-page">
            <div className="page-header-centered">
                <h1>Daily Deals</h1>
            </div>

            <div className="container main-layout">
                <div className="collection-title-row">
                    <h2>Daily Deals</h2>
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
                        <span className="product-count">58 Products</span>
                    </div>
                </div>

                {/* Daily Deals layout doesn't show sidebar in the screenshot? 
                   Actually, looking at the screenshot, it spans full width? Or maybe the sidebar is cut off?
                   Wait, the screenshot shows 4 columns of products starting from the far left. 
                   If there was a sidebar, they would be pushed right.
                   The "View As" is aligned far left. 
                   It looks like a FULL WIDTH layout without sidebar for Daily Deals.
                */}
                <div className="content-row">
                    <div className="product-grid-wrapper" style={{ width: '100%' }}>
                        <div className="product-grid">
                            {products.map(product => (
                                <div className="product-card" key={product.id}>
                                    {product.soldOut && <span className="sold-out-badge">Sold Out</span>}
                                    {product.onSale && <span className="old-sale-badge">On Sale</span>}

                                    <div style={{ width: '100%', height: '220px', background: 'transparent', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {/* Placeholder Image Logic */}
                                        <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {/* In a real app we'd use the src. Here I'll mock the 'content' with text if image broken, 
                                                  but let's try to mimic the look with empty space if no image load. */}
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                                onError={(e) => {
                                                    // basic placeholder
                                                    e.target.style.display = 'none';
                                                    e.target.parentElement.innerHTML = '<span style="font-size:3rem; color:#eee;">📷</span>';
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="product-info">
                                        <h3 className="product-title">{product.title}</h3>
                                        <div className="product-vendor">{product.vendor}</div>
                                        <div className="product-price">
                                            {product.soldOut && product.originalPrice ? (
                                                <>
                                                    <span style={{ textDecoration: 'line-through', color: '#ccc', fontWeight: '400', marginRight: '5px' }}>${product.originalPrice}</span>
                                                    <span style={{ color: '#d50055' }}>${product.price}</span>
                                                </>
                                            ) : product.onSale ? (
                                                <>
                                                    <span style={{ textDecoration: 'line-through', color: '#ccc', fontWeight: '400', marginRight: '5px' }}>${product.originalPrice}</span>
                                                    <span style={{ color: '#d50055' }}>${product.price}</span>
                                                </>
                                            ) : (
                                                <span>${product.price}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailyDeals;
