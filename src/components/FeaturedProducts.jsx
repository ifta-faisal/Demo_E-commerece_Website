import React from 'react';
import './FeaturedProducts.css';
import hb305Img from '../assets/hummingbird_305_stack.png';
import hb200Img from '../assets/hummingbird_200_racespec.png';
import nx69_550Img from '../assets/nitro_nectar_nx69_550mah.png';
import nx69_300Img from '../assets/nitro_nectar_gold_300mah.png';

const products = [
    {
        id: 1,
        title: "Hummingbird 305 Flight Stack - F722 FC with Built-in ELRS + 80A 4in1 ESC",
        brand: "HUMMINGBIRD",
        image: hb305Img,
        tag: "ON SALE",
        originalPrice: "৳119.98",
        salePrice: "৳109.99",
        overlayText: "Hummingbird 305 Stack"
    },
    {
        id: 2,
        title: "Hummingbird 200 RaceSpec Stack", // Simplified for lookup match
        brand: "HUMMINGBIRD",
        image: hb200Img,
        tag: "ON SALE",
        originalPrice: "৳109.98",
        salePrice: "৳99.99",
        overlayText: "Hummingbird 200 RaceSpec Stack"
    },
    {
        id: 3,
        title: "NewBeeDrone Nitro Nectar NX69 550mAh 1S 80C HV LiPo Battery",
        brand: "NEWBEEDRONE",
        image: nx69_550Img,
        tag: "ON SALE",
        originalPrice: "৳59.45",
        salePrice: "৳10.69",
        overlayText: "NewBeeDrone Nitro Nectar NX69 550mAh 1S 80C HV LiPo Battery"
    },
    {
        id: 4,
        title: "NewBeeDrone Nitro Nectar NX69 300mAh 1S 80C HV LiPo Battery 4xBatteries",
        brand: "NEWBEEDRONE",
        image: nx69_300Img,
        tag: "ON SALE",
        originalPrice: "৳84.95",
        salePrice: "৳16.99",
        overlayText: "NX69 Nitro Nectar Gold 300mAh"
    }
];

const FeaturedProducts = ({ onProductClick }) => {
    const handleCardClick = (p) => {
        if (onProductClick) {
            // Normalize data for ProductDetail
            const priceNum = parseFloat(p.salePrice.replace('৳', ''));
            const origNum = parseFloat(p.originalPrice.replace('৳', ''));

            onProductClick({
                title: p.title,
                vendor: p.brand,
                price: priceNum,
                originalPrice: origNum,
                image: p.image,
                description: undefined, // Let ProductDetail use default extended description for now as it matches screenshot
                images: [p.image] // Start with main image
            });
        }
    };

    return (
        <section className="featured-section container">
            <h2 className="section-heading">FEATURED PRODUCTS</h2>

            <div className="product-grid-4">
                {products.map(p => (
                    <div className="product-card-v2" key={p.id} onClick={() => handleCardClick(p)} style={{ cursor: 'pointer' }}>
                        <div className="card-image-wrapper">
                            <span className="sale-badge">{p.tag}</span>
                            <div className="image-container">
                                <img src={p.image} alt={p.title} />
                                <div className="text-overlay">
                                    <h3>{p.overlayText}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="card-details">
                            <p className="product-title">{p.title}</p>
                            <p className="product-brand">{p.brand}</p>
                            <div className="price-container">
                                <span className="original-price">{p.originalPrice}</span>
                                <span className="sale-price">{p.salePrice}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedProducts;
