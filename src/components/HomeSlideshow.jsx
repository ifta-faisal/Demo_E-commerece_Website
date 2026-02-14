import React, { useState, useEffect } from 'react';
import './HomeSlideshow.css';
import lionBeeBanner from '../assets/lionbee_banner.png';
import hdFpvCollection from '../assets/hd_fpv_collection.png';
import antigravityA1 from '../assets/antigravity_a1.png';

const HomeSlideshow = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            type: 'custom',
            title: 'ADP750',
            subtitle: 'POWER SUPPLY',
            specs: ['750W', '62.5A', '12V'],
            image: null, // Custom CSS background
            link: '#'
        },
        {
            type: 'image',
            image: antigravityA1,
            title: 'ANTIGRAVITY A1',
            subtitle: "THE WORLD'S FIRST 360 DRONE",
            link: '#'
        },
        {
            type: 'image',
            image: lionBeeBanner,
            title: 'LionBee 3inch',
            subtitle: 'Long Range ELRS 2.4 AIO Developer kit',
            link: '#'
        },
        {
            type: 'image',
            image: hdFpvCollection,
            title: 'HD FPV Collection',
            subtitle: 'Explore our digital whoops & drones',
            link: '#'
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // 5 seconds per slide

        return () => clearInterval(interval);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <section className="home-slideshow">
            <div className="slides-viewport">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentSlide ? 'active' : ''} ${slide.type}`}
                        style={slide.type === 'image' ? { backgroundImage: `url(${slide.image})` } : {}}
                    >
                        {slide.type === 'custom' && (
                            <div className="custom-slide-bg">
                                <div className="custom-slide-content">
                                    <div className="text-header-group">
                                        <h1 className="main-title">
                                            <span className="stylized-A">A</span>DP750
                                        </h1>
                                        <h2 className="sub-title">POWER SUPPLY</h2>
                                    </div>

                                    <div className="content-row">
                                        <div className="specs-column">
                                            {slide.specs.map((spec, i) => (
                                                <div key={i} className="spec-item">{spec}</div>
                                            ))}
                                        </div>

                                        <div className="image-placement">
                                            {/* CSS Mockup of the Product */}
                                            <div className="power-supply-mock">
                                                <div className="psu-face top">
                                                    <span className="brand-badge">ToolkitRC</span>
                                                    <div className="face-title">
                                                        <span className="stylized-A-small">A</span>DP750
                                                        <span className="face-sub">POWER SUPPLY</span>
                                                    </div>
                                                    <span className="website">www.toolkitrc.com</span>
                                                </div>
                                                <div className="psu-face side">
                                                    <div className="usb-port"></div>
                                                    <div className="xt60-ports">
                                                        <div className="xt60"></div>
                                                        <div className="xt60"></div>
                                                        <div className="xt60"></div>
                                                    </div>
                                                </div>
                                                <div className="psu-face front">
                                                    <span className="model-text">ADP750</span>
                                                    <span className="display-text">12V | 62.5A</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {slide.type === 'image' && (
                            <div className="image-slide-content">
                                <h2>{slide.title}</h2>
                                <p>{slide.subtitle}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="slide-dots">
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                    ></span>
                ))}
            </div>
        </section>
    );
};

export default HomeSlideshow;
