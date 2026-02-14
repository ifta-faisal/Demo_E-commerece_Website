import React from 'react';
import './FeaturedBrands.css';

const brands = [
    "NewBeeDrone", "3DR", "APD", "AXISFLYING", "BetaFPV", "CADDX", "GemFan", "CNHL", "CUAV",
    "DIATONE", "DJI", "Droning", "E-flite", "EMAX", "BETAFPV", "FPVCycle", "GEPRC", "GNB",
    "Happymodel", "HGLRC", "HOTA", "Holybro", "iFlight", "JHEMCU", "ISDT", "Lumenier",
    "Matek", "ORQA", "RadioMaster", "RunCam", "RushFPV", "Skyzone", "T-Motor", "TBS",
    "ToolkitRC", "VIFLY", "Walksnail", "SEQURE"
];

const FeaturedBrands = () => {
    const getImagePath = (brandName) => {
        try {
            // Try to load the image from assets/brands folder
            return new URL(`../assets/brands/${brandName.toLowerCase()}.png`, import.meta.url).href;
        } catch {
            return null;
        }
    };

    return (
        <section className="brands-section container">
            <h2 className="section-heading">FEATURED BRANDS</h2>
            <div className="brands-grid-logos">
                {brands.map((brand, i) => (
                    <div key={i} className="brand-logo-item">
                        <img
                            src={getImagePath(brand)}
                            alt={brand}
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'block';
                            }}
                        />
                        <span className="brand-fallback" style={{ display: 'none' }}>{brand}</span>
                    </div>
                ))}
            </div>

            <div className="floating-rewards-btn">
                <div className="coin-icon">$</div>
                <span>Earn NewBeePoints</span>
            </div>
            <div className="floating-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <span>TOP</span>
            </div>
        </section>
    );
};

export default FeaturedBrands;
