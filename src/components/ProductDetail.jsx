
import React, { useState, useEffect } from 'react';
import './ProductDetail.css';

const ProductDetail = ({ product, onBack }) => {
    // 1. Data Store for Products
    // We maintain specific rich data for products here to handle clicking "Featured Products"
    const productDatabase = {
        "Hummingbird 305 Flight Stack": {
            description: `Optimized for 5" to 10" Drones | Up to 8S LiPo Support | Built for Power & Durability

Hummingbird 305 Stack combines advanced control with unmatched power.

This stack is built for serious freestyle and long-range missions, featuring the Hummingbird 305 Flight Controller with a high-speed F722 MCU, built-in 2.4GHz ExpressLRS Diversity Receiver, and full support for Betaflight & iNAV firmware. Designed with a TCXO oscillator and barometer, it's ready for precise GPS navigation and auto-return missions.

Matched with the Hummingbird 305 4in1 ESC, this power system supports up to 80A continuous for 10 seconds and 100A burst for 3 seconds per channel on 3-8S LiPo, delivering insane performance with robust protection. The ESC features 3oz 6-layer gold-plated PCB with blind vias, AT32F421 MCU + integrated Gate Driver, and 3x massive onboard TVS diodes, eliminating the need for external surge protection.`,
            structuredDescription: {
                overview: [
                    "The Hummingbird line of flight stacks are a great entry level FPV system. They are simple, affordable, and have an ultra-immersive performance. The Hummingbird 305 has an integrated four band, 32-channel receiver, and USB charging. It puts ease-of-use first and lets pilots focus on the full FPV experience without worrying about extra charging cables or accessory components.",
                    "Version 3 of the Hummingbird Stack is a very mature design. It has an included onboard DVR, uses an integrated channel scanner to pick up the strongest video feed and has an improved 800 x 480 TFT resolution display for a crisper image. The onboard OSD shows video signal strength, battery lifetime, and selected channel. The Hummingbird 305 is the ideal choice for a new pilot looking for a complete, high-quality headset."
                ],
                specifications: {
                    "Brand Name": "Hummingbird",
                    "Item Name": "305 Flight Stack",
                    "Item NO.": "HB-305-V3"
                },
                details: [
                    { label: "Color", value: "Black and Gold" },
                    { label: "Optic", value: "" },
                    { label: "FOV (field of view)", value: "N/A" },
                    { label: "Format", value: "N/A" }
                ],
                sections: [
                    {
                        title: "Micro Display:",
                        items: [
                            "Display: WQVGA 4.3 inch display",
                            "Resolution: 800 X 480 TFT"
                        ]
                    },
                    {
                        title: "Electrical:",
                        items: [
                            "DVR: Analog video recording",
                            "SD card support to 32GB (AVI file)",
                            "Support playback recording file",
                            "Firmware upgrade via SD card"
                        ]
                    },
                    {
                        title: "Wireless Receiver:",
                        content: "40 channels, single high sensitive receiver including RaceBand frequencies(auto scan and find strongest channel)"
                    },
                    {
                        title: "OSD:",
                        content: "Channel info, RSSI info and battery status (disappear after 4s, press any button to show up)"
                    },
                    {
                        title: "Interfaces:",
                        items: [
                            "USB charge port",
                            "Micro-SD card slot"
                        ]
                    },
                    {
                        title: "Package Included:",
                        items: [
                            "1x Hummingbird 305 FC",
                            "1x Hummingbird 80A ESC",
                            "1x XT60 Pigtail",
                            "1x 18650 2600mAh Li-ion Battery(built-in headset)"
                        ]
                    }
                ]
            },
            features: [
                { img: "https://placehold.co/1200x600/111111/ff9900?text=Hummingbird+305+Stack+Features", alt: "Feature Banner" },
                { img: "https://placehold.co/1200x500/222222/ffffff?text=80A+Continuous+Current+Support", alt: "Amps Feature" },
                { img: "https://placehold.co/1200x500/111111/ff9900?text=Supports+3-8S+Lipo", alt: "Lipo Feature" },
                { img: "https://placehold.co/1200x500/222222/ffffff?text=Designed+for+Real+Quality", alt: "Quality Feature" },
                { img: "https://placehold.co/1200x500/111111/ff9900?text=True+Plug+and+Play", alt: "Plug and Play" }
            ],
            specsFC: [
                { k: "MCU", v: "STM32F722RET6 (216MHz)" },
                { k: "Gyro", v: "MPU6000 / ICM-42688-P" },
                { k: "Barometer", v: "BMP280" },
                { k: "OSD", v: "AT7456E (Analog)" },
                { k: "Input Voltage", v: "3-8S LiPo" }
            ],
            specsESC: [
                { k: "MCU", v: "AT32F421" },
                { k: "Input", v: "3-8S LiPo" },
                { k: "Current", v: "80A Continuous / 100A Burst" },
                { k: "Firmware", v: "BLHeli_S / Bluejay" }
            ]
        },
        "Hummingbird 200 RaceSpec Stack": {
            description: `The Hummingbird 200 RaceSpec Stack is a purpose-built 20x20 flight stack designed from the ground up for competitive 5" FPV racing. Co-developed with professional racers and tested rigorously over half a year of real racing conditions, this stack delivers the durability, precision, and simplicity that race pilots demand.

At the heart of the system is the Hummingbird 200 Flight Controller, powered by a blazing-fast AT32F435 MCU at 288MHz, offering performance that surpasses even F722 processors. It features the highly respected ICM-42688 gyro with dedicated LDO power, and a built-in UART-based ExpressLRS 2.4GHz receiver with dual ceramic patch antennas and a TCXO oscillator for unmatched signal stability. This design eliminates the need for external receivers, simplifying builds and improving reliability during crashes.

Paired with the FC is the Hummingbird 200 4in1 ESC, rated for 80A continuous for 10 seconds and 100A burst for 3 seconds per channel, supporting 3-6S LiPo input. Built on a 6-layer 3oz copper PCB with blind vias and gold plating, this ESC is engineered to survive repeated abuse. It features three massive onboard TVS diodes for voltage spike protection and four corner-mounted capacitor pads for larger builds.

A standout feature is the 3D reinforced motor pad design—with solderable surfaces on the top, bottom, and side—ensuring rock-solid motor wire attachment that won't rip off even in hard crashes.

Priced at just $99, this stack shatters expectations, offering elite-level performance and racer-driven durability at a fraction of the market price. Built by racers, for racers.`,
            features: [
                { img: "https://placehold.co/1200x600/111111/d4af37?text=Hummingbird+200+RaceSpec+Stack", alt: "RaceSpec Banner" },
                { img: "https://placehold.co/1200x500/222222/ffffff?text=Built+Compact+for+Race+Day+Reliability", alt: "Reliability Feature" },
                { img: "https://placehold.co/1200x500/111111/d4af37?text=Blazing+Fast+AT32F435+MCU", alt: "MCU Feature" },
                { img: "https://placehold.co/1200x500/222222/ffffff?text=80A+AM32+ESC+Powerhouse", alt: "ESC Power" }
            ],
            specsFC: [
                { k: "MCU", v: "AT32F435 (288MHz)" },
                { k: "Gyro", v: "ICM-42688 (LDO Powered)" },
                { k: "Receiver", v: "UART ELRS 2.4GHz w/ Dual Patch Antennas" },
                { k: "Oscillator", v: "TCXO" },
                { k: "Mounting", v: "20x20mm" }
            ],
            specsESC: [
                { k: "Current", v: "80A Cont / 100A Burst" },
                { k: "Input", v: "3-6S LiPo" },
                { k: "Firmware", v: "AM32" },
                { k: "Protection", v: "3x Onboard TVS Diodes" }
            ]
        }
    };

    // Default fallback data (Hummingbird 305)
    // We use this if NO product is passed, or if the passed product isn't in our "database".
    const defaultProduct = {
        title: "Hummingbird 305 Flight Stack – F722 FC with Built-in ELRS + 80A 4in1 ESC",
        vendor: "Hummingbird",
        price: 109.99,
        originalPrice: 119.98,
        sku: "01AB31+00AI26",
        barcode: "NBD5291+NBD5521",
        reviews: 12,
        description: productDatabase["Hummingbird 305 Flight Stack"].description,
        images: ["https://v2.newbeedrone.com/cdn/shop/files/Stack_360x.jpg?v=1700000000"]
    };

    // Safely Construct Active Product
    // If 'product' exists (from listing), it might only have { title, price, image }.
    const activeProduct = product ? {
        ...defaultProduct,
        title: product.title || defaultProduct.title,
        vendor: product.vendor || defaultProduct.vendor,
        price: product.price || defaultProduct.price,
        comparePrice: product.originalPrice || defaultProduct.originalPrice,
        images: product.image ? [product.image] : (product.images || defaultProduct.images),
        sku: product.sku || defaultProduct.sku,
        barcode: product.barcode || defaultProduct.barcode,
        reviews: product.reviews || defaultProduct.reviews
        // Description will be determined below based on title match
    } : defaultProduct;

    // Lookup Rich Content
    let richContent = productDatabase["Hummingbird 305 Flight Stack"]; // Default
    if (activeProduct.title.includes("200 RaceSpec")) {
        richContent = productDatabase["Hummingbird 200 RaceSpec Stack"];
    } else if (activeProduct.title.includes("305")) {
        richContent = productDatabase["Hummingbird 305 Flight Stack"];
    }

    // Merge rich description back into activeProduct for display
    activeProduct.description = richContent.description;
    activeProduct.structuredDescription = richContent.structuredDescription;

    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description'); // 'description', 'specification', 'reviews'
    const [mainImage, setMainImage] = useState(
        (activeProduct.images && activeProduct.images.length > 0)
            ? activeProduct.images[0]
            : ''
    );

    useEffect(() => {
        if (activeProduct.images && activeProduct.images.length > 0) {
            setMainImage(activeProduct.images[0]);
        }
    }, [activeProduct]);

    return (
        <div className="product-detail-page">
            <div className="container">
                {/* Header Breadcrumbs & Nav */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', fontSize: '0.8rem', color: '#666', textTransform: 'uppercase' }}>
                    <div className="breadcrumbs">
                        HOME <span style={{ margin: '0 5px' }}>›</span> FEATURED PRODUCTS <span style={{ margin: '0 5px' }}>›</span> {activeProduct.title}
                    </div>
                    <div className="product-nav-links" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ display: 'flex', gap: '10px', marginRight: '20px' }}>
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1.5"></circle></svg>
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33zM9.75 15.02l5.75-3.27-5.75-3.27z"></path></svg>
                        </div>
                        <a href="#" style={{ textDecoration: 'none', color: '#333' }}>← Previous Product</a>
                        <span style={{ color: '#ccc' }}>|</span>
                        <a href="#" style={{ textDecoration: 'none', color: '#333' }}>Next Product →</a>
                    </div>
                </div>

                <div className="product-detail-grid">
                    {/* Left: Image Gallery */}
                    <div className="product-gallery">
                        <div className="main-image-container">
                            <div className="image-placeholder-large">
                                <img
                                    src={mainImage}
                                    alt={activeProduct.title}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://placehold.co/600x600/1a1a1a/ffffff?text=Product+Image';
                                    }}
                                />
                            </div>
                        </div>
                        <div className="thumbnail-list">
                            {activeProduct.images && activeProduct.images.length > 1 ? (
                                activeProduct.images.map((img, i) => (
                                    <div key={i} className="thumbnail-item" onClick={() => setMainImage(img)}>
                                        <img src={img} alt={`Thumb ${i}`} />
                                    </div>
                                ))
                            ) : (
                                [1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="thumbnail-item">
                                        <img src={`https://placehold.co/100x100/eeeeee/999999?text=${i}`} alt="placeholder" />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="product-info-column">

                        <h1 className="pd-title">{activeProduct.title}</h1>

                        <div className="pd-rating">
                            <span className="stars">★★★★★</span>
                            <span className="review-count">{activeProduct.reviews} reviews</span>
                        </div>

                        <div className="pd-vendor">{activeProduct.vendor}</div>

                        <div className="pd-price-row">
                            <span className="current-price">$ {Number(activeProduct.price).toFixed(2)}</span>
                            {activeProduct.comparePrice && (
                                <span className="compare-price">Compare at $ {Number(activeProduct.comparePrice).toFixed(2)}</span>
                            )}
                        </div>

                        <div className="pd-meta">
                            <p>Product Barcode: {activeProduct.barcode}</p>
                            <p>SKU: {activeProduct.sku}</p>
                        </div>

                        <div className="pd-quantity">
                            <label>QUANTITY</label>
                            <div className="qty-selector">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                                <input type="text" value={quantity} readOnly />
                                <button onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>
                        </div>


                        <div className="pd-actions">
                            <button className="btn-add-to-cart">ADD TO CART</button>
                        </div>


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

                {/* Bottom Expanded Description View */}
                <div className="product-long-description">

                    {/* Description Tab Content */}
                    {activeTab === 'description' && (
                        <div className="description-tab-content">
                            {/* Structured Description Layout */}
                            {activeProduct.structuredDescription ? (
                                <div className="structured-description">
                                    <div className="sd-overview">
                                        <h4>Overview:</h4>
                                        {activeProduct.structuredDescription.overview.map((p, i) => (
                                            <p key={i}>{p}</p>
                                        ))}
                                    </div>

                                    <div className="sd-specs-list">
                                        <h4>Specifications:</h4>
                                        {Object.entries(activeProduct.structuredDescription.specifications).map(([key, val]) => (
                                            <div key={key} className="sd-spec-item">
                                                <span className="sd-label">{key}:</span> <span className="sd-value">{val}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="sd-details-grid">
                                        {activeProduct.structuredDescription.details.map((detail, i) => (
                                            <div key={i} className="sd-detail-item">
                                                <span className="sd-label">{detail.label}:</span>
                                                {detail.value && <span className="sd-value"> {detail.value}</span>}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="sd-sections">
                                        {activeProduct.structuredDescription.sections.map((section, i) => (
                                            <div key={i} className="sd-section">
                                                <h4>{section.title}</h4>
                                                {section.items ? (
                                                    <ul className="sd-list">
                                                        {section.items.map((item, j) => (
                                                            <li key={j}>{item}</li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p>{section.content}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                /* Fallback to old description if no structured data */
                                <div className="text-description-container">
                                    <div className="description-text" dangerouslySetInnerHTML={{ __html: activeProduct.description }} />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Specification Tab Content */}
                    {activeTab === 'specification' && (
                        <>
                            {/* Specs Table Section */}
                            <div className="specs-section">
                                <h2>Technical Details</h2>
                                <table className="specs-table">
                                    <tbody>
                                        {/* Prefer CSV attributes if available */}
                                        {activeProduct.specifications && Object.keys(activeProduct.specifications).length > 0 ? (
                                            Object.entries(activeProduct.specifications).map(([k, v], i) => (
                                                <tr key={i}><td>{k}</td><td>{v}</td></tr>
                                            ))
                                        ) : activeProduct.structuredDescription && activeProduct.structuredDescription.specifications ? (
                                            /* If we have structured manual data (e.g. for demo item) */
                                            Object.entries(activeProduct.structuredDescription.specifications).map(([k, v], i) => (
                                                <tr key={i}><td>{k}</td><td>{v}</td></tr>
                                            ))
                                        ) : (
                                            /* Fallback to basic info if nothing else */
                                            <>
                                                <tr><td>Brand</td><td>{activeProduct.vendor || 'N/A'}</td></tr>
                                                <tr><td>SKU</td><td>{activeProduct.sku || 'N/A'}</td></tr>
                                                <tr><td>Category</td><td>{activeProduct.category || 'N/A'}</td></tr>
                                            </>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {/* Reviews Tab Content */}
                    {activeTab === 'reviews' && (
                        <div className="reviews-section">
                            <h3>Customer Reviews</h3>
                            <div className="review-item">
                                <div className="review-header">
                                    <span className="stars">★★★★★</span>
                                    <span className="review-author">John Doe</span>
                                </div>
                                <p className="review-text">Excellent product! The build quality is top-notch and the performance is outstanding.</p>
                            </div>
                            <div className="review-item">
                                <div className="review-header">
                                    <span className="stars">★★★★☆</span>
                                    <span className="review-author">Jane Smith</span>
                                </div>
                                <p className="review-text">Great product overall. Easy to install and works perfectly with my setup.</p>
                            </div>
                            <div className="review-item">
                                <div className="review-header">
                                    <span className="stars">★★★★★</span>
                                    <span className="review-author">Mike Johnson</span>
                                </div>
                                <p className="review-text">Amazing value for the price. Highly recommended for anyone looking for a quality flight stack.</p>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
