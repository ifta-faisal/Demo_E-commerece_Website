import React from 'react';
import './Header.css';
import img1 from '../assets/Controller.png';
import img2 from '../assets/Battery.jpg';
import img3 from '../assets/ExternalRF.jfif';
import img4 from '../assets/Accessories.jfif';
import img5 from '../assets/Googles.jpg';
import img6 from '../assets/VRX.jfif';
import img7 from '../assets/Anteena.jpg';
import img8 from '../assets/Accessoriese.jpg';
import img9 from '../assets/Battery_.jpg';
import img10 from '../assets/Charger.jpeg';
import img11 from '../assets/connectors.jpg';
import img12 from '../assets/esp.jpg';
import img13 from '../assets/DRONE&ACC.png';
import img14 from '../assets/Tools.jfif';
import img15 from '../assets/Printer.jpg';
import img16 from '../assets/Filament.jpg';
import logoHeader from '../assets/logo_header.png';

const Header = ({ onNavigate, theme, onToggleTheme, onSearch, cartCount, wishlistCount, currency, setCurrency }) => {
    const [searchTerm, setSearchTerm] = React.useState('');

    const handleInput = (e) => {
        setSearchTerm(e.target.value);
    };

    const triggerSearch = () => {
        if (onSearch) onSearch(searchTerm);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') triggerSearch();
    };
    return (
        <header className="header">
            {/* Main Header */}
            <div className="container main-header">
                {/* Logo Section - Click logo to go home */}
                <div className="logo-section" onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>
                    <img src={logoHeader} alt="RoboXpressbd" className="header-logo-image" style={{ maxHeight: '80px', width: 'auto' }} />
                </div>

                {/* Search Bar */}
                <div className="search-bar">
                    <div className="search-wrapper">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleInput}
                            onKeyDown={handleKeyDown}
                        />
                        <button className="search-icon-btn" onClick={triggerSearch}>
                            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Icons / Utilities */}
                <div className="header-icons">
                    {/* Notification Banner */}
                    <div className="notification-banner" style={{
                        position: 'absolute',
                        top: '-30px',
                        right: '0',
                        background: '#fff',
                        border: '2px solid #ff6b35',
                        borderRadius: '20px',
                        padding: '4px 12px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: '#ff0000',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                        <span>NEW: Lionbee 3inch LB 18650 Developer Kit</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>


                    <div className="utility-item">
                        {/* Simple native select for currency functionality */}
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            style={{ border: 'none', background: 'transparent', fontWeight: 'inherit', fontSize: 'inherit', cursor: 'pointer', outline: 'none' }}
                        >
                            <option value="USD">USD</option>
                            <option value="BDT">BDT</option>
                        </select>
                    </div>



                    <button className="icon-only-btn" onClick={() => onNavigate('login')}>
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </button>



                    <button className="icon-only-btn cart-btn" onClick={() => onNavigate('cart')}>
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <span className="cart-badge">{cartCount}</span>
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <nav className="container relative-nav-container">
                <ul className="main-nav-list">
                    <li className="nav-item has-dropdown">
                        <a href="#" className="highlight" onClick={(e) => e.preventDefault()}>DRONE</a>

                        {/* Mega Menu */}
                        <div className="mega-menu">
                            <div className="container">
                                <div className="mega-menu-grid">
                                    <div className="mega-column brand-column">
                                        <div className="logo-placeholder" onClick={() => onNavigate('about')} style={{ cursor: 'pointer' }}>
                                            {/* Matches Image 1 content somewhat - Brand logo or icon */}
                                            <div style={{ width: '100px', height: '100px', border: '5px solid black', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
                                                    <circle cx="50" cy="50" r="45" stroke="black" strokeWidth="5" />
                                                    <circle cx="35" cy="35" r="10" stroke="black" strokeWidth="5" />
                                                    <circle cx="65" cy="35" r="10" stroke="black" strokeWidth="5" />
                                                    <circle cx="35" cy="65" r="10" stroke="black" strokeWidth="5" />
                                                    <circle cx="65" cy="65" r="10" stroke="black" strokeWidth="5" />
                                                    <rect x="45" y="45" width="10" height="10" fill="#d50055" />
                                                </svg>
                                            </div>
                                        </div>
                                        <a href="#" className="menu-category-link" onClick={(e) => { e.preventDefault(); onNavigate('about'); }}>ABOUT THE BRAND</a>
                                    </div>
                                    <div className="mega-column">
                                        <h4>DRONES</h4>
                                        <div className="divider-line"></div>
                                        <ul>
                                            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('products', null, 'Dji'); }}>DRONE</a></li>
                                            <li><a href="#">HUMMINGBIRD BNF</a></li>
                                        </ul>
                                    </div>
                                    <div className="mega-column">
                                        <h4>PARTS</h4>
                                        <div className="divider-line"></div>
                                        <ul>
                                            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('products', 'Drone FC & ESC'); }}>FC & ESC</a></li>
                                            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('products', 'FRAMES'); }}>FRAMES</a></li>
                                            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('products', 'MOTORS'); }}>MOTORS</a></li>
                                            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('products', 'PROPELLERS'); }}>PROPELLERS</a></li>
                                            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('products', 'BATTERIES'); }}>BATTERIES</a></li>
                                            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('products'); }}>OTHER</a></li>
                                        </ul>
                                    </div>
                                    <div className="mega-column">
                                        <h4>EDUCATION</h4>
                                        <div className="divider-line"></div>
                                        <ul>
                                            <li><a href="#">KNOW BEFORE YOU FLY KITS</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('products'); }}>ALL PRODUCTS</a>
                    </li>
                    <li className="nav-item has-dropdown">
                        <a href="#" className="highlight">DRONES & PARTS</a>
                        <div className="mega-menu">
                            <div className="container">
                                <div className="mega-menu-grid">
                                    <div className="mega-column">
                                        <h4>ASSEMBLED DRONES</h4>
                                        <div className="divider-line"></div>
                                        <ul>
                                            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('products', 'Consumer Drones'); }}>CONSUMER DRONES</a></li>
                                            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('products', null, 'Dji'); }}>DJI DRONES</a></li>
                                            {/* <li><a href="#">HOLYBRO DEVELOPER KITS</a></li>
                                            <li><a href="#">FIXED WINGS</a></li>
                                            <li><a href="#">FPV BIND N' FLY & READY-TO-FLY</a></li> */}
                                        </ul>
                                    </div>
                                    <div className="mega-column">
                                        <h4>DRONE PARTS</h4>
                                        <div className="divider-line"></div>
                                        <ul>
                                            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('products', 'Batteries'); }}>BATTERIES</a></li>
                                            {/* <li><a href="#">CABLE</a></li> */}
                                            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('products', 'Drone FC & ESC'); }}>FC & ESC</a></li>
                                            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('products', 'Frames'); }}>FRAME</a></li>
                                            {/* <li><a href="#">GPS & BUZZER & REMOTE ID</a></li> */}
                                            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('products', 'Antennas'); }}>ANTENNAS</a></li>
                                        </ul>
                                    </div>
                                    <div className="mega-column">
                                        <h4>-</h4>
                                        <div className="divider-line" style={{ visibility: 'hidden' }}></div>
                                        <ul>
                                            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('products', 'Motors'); }}>MOTORS</a></li>
                                            {/* <li><a href="#">POWER MANAGEMENT UNIT</a></li> */}
                                            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('products', 'Propellers'); }}>PROPELLER</a></li>
                                            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('products', 'Radios & Tx Rx'); }}>RECEIVER</a></li>
                                            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('products', 'VTX'); }}>VTX CAMERA + SYSTEM</a></li>
                                            {/* <li><a href="#">OTHER</a></li> */}
                                        </ul>
                                    </div>
                                    {/* <div className="mega-column">
                                        <h4>INDUSTRIAL</h4>
                                        <div className="divider-line"></div>
                                        <ul>
                                            <li><a href="#">NDAA PRODUCTS</a></li>
                                            <li><a href="#">DEVELOPER KITS</a></li>
                                            <li><a href="#">FC & ESC</a></li>
                                            <li><a href="#">GPS & BUZZER & REMOTE ID</a></li>
                                        </ul>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item has-dropdown">
                        <a href="#" className="highlight">CONTROLLERS</a>
                        <div className="mega-menu">
                            <div className="container">
                                <div className="mega-menu-grid">
                                    <div className="mega-column mega-image-column">
                                        <div className="menu-image-wrapper">
                                            <img src={img1} alt="Remote Controller" />
                                        </div>
                                        <a href="#" className="menu-category-link" onClick={(e) => { e.preventDefault(); onNavigate('products', 'Radios & Tx Rx'); }}>REMOTE CONTROLLER</a>
                                    </div>
                                    <div className="mega-column mega-image-column">
                                        <div className="menu-image-wrapper">
                                            <img src={img2} alt="Batteries" />
                                        </div>
                                        <a href="#" className="menu-category-link" onClick={(e) => { e.preventDefault(); onNavigate('products', 'Batteries'); }}>BATTERIES</a>
                                    </div>
                                    <div className="mega-column mega-image-column">
                                        <div className="menu-image-wrapper">
                                            <img src={img3} alt="Controller External Module" />
                                        </div>
                                        <a href="#" className="menu-category-link" onClick={(e) => { e.preventDefault(); onNavigate('products', 'Radios & Tx Rx'); }}>CONTROLLER EXTERNAL MODULE</a>
                                    </div>
                                    <div className="mega-column mega-image-column">
                                        <div className="menu-image-wrapper">
                                            <img src={img4} alt="Accessories" />
                                        </div>
                                        <a href="#" className="menu-category-link" onClick={(e) => { e.preventDefault(); onNavigate('products', 'Accessories'); }}>ACCESSORIES</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item has-dropdown">
                        <a href="#" className="highlight">GOGGLES & VIDEO</a>
                        <div className="mega-menu">
                            <div className="container">
                                <div className="mega-menu-grid">
                                    <div className="mega-column mega-image-column">
                                        <div className="menu-image-wrapper">
                                            <img src={img5} alt="Goggles" />
                                        </div>
                                        <a href="#" className="menu-category-link" onClick={(e) => { e.preventDefault(); onNavigate('products', 'VTX'); }}>GOGGLES</a>
                                    </div>
                                    <div className="mega-column mega-image-column">
                                        <div className="menu-image-wrapper">
                                            <img src={img6} alt="Video Receiver Module" />
                                        </div>
                                        <a href="#" className="menu-category-link" onClick={(e) => { e.preventDefault(); onNavigate('products', 'VTX'); }}>VIDEO RECEIVER MODULE</a>
                                    </div>
                                    <div className="mega-column mega-image-column">
                                        <div className="menu-image-wrapper">
                                            <img src={img7} alt="Antennas" />
                                        </div>
                                        <a href="#" className="menu-category-link" onClick={(e) => { e.preventDefault(); onNavigate('products', 'Antennas'); }}>ANTENNAS</a>
                                    </div>
                                    <div className="mega-column mega-image-column">
                                        <div className="menu-image-wrapper">
                                            <img src={img8} alt="Accessories" />
                                        </div>
                                        <a href="#" className="menu-category-link" onClick={(e) => { e.preventDefault(); onNavigate('products', 'Controller Accessories'); }}>ACCESSORIES</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item has-dropdown">
                        <a href="#" className="highlight">BATTERIES & CHARGERS</a>
                        <div className="mega-menu">
                            <div className="container">
                                <div className="mega-menu-grid">
                                    <div className="mega-column mega-image-column">
                                        <div className="menu-image-wrapper">
                                            <img src={img2} alt="Drone Batteries" />
                                        </div>
                                        <a href="#" className="menu-category-link" onClick={(e) => { e.preventDefault(); onNavigate('products', 'Batteries'); }}>DRONE BATTERIES</a>
                                    </div>
                                    {/* <div className="mega-column mega-image-column">
                                        <div className="menu-image-wrapper">
                                            <img src={img9} alt="Controller Batteries" />
                                        </div>
                                        <a href="#" className="menu-category-link">CONTROLLER BATTERIES</a>
                                    </div> */}
                                    <div className="mega-column mega-image-column">
                                        <div className="menu-image-wrapper">
                                            <img src={img12} alt="Electronics" />
                                        </div>
                                        <a href="#" className="menu-category-link" onClick={(e) => { e.preventDefault(); onNavigate('products', 'Electronics'); }}>ELECTRONICS</a>
                                    </div>
                                    <div className="mega-column mega-image-column">
                                        <div className="menu-image-wrapper">
                                            <img src={img10} alt="Chargers" />
                                        </div>
                                        <a href="#" className="menu-category-link" onClick={(e) => { e.preventDefault(); onNavigate('products', 'Chargers'); }}>CHARGERS</a>
                                    </div>
                                    <div className="mega-column mega-image-column">
                                        <div className="menu-image-wrapper">
                                            <img src={img11} alt="Connectors & Adapters" />
                                        </div>
                                        <a href="#" className="menu-category-link" onClick={(e) => { e.preventDefault(); onNavigate('products', 'Batteries Accessories'); }}>CONNECTORS & ADAPTERS</a>
                                    </div>
                                    <div className="mega-column mega-image-column">
                                        <div className="menu-image-wrapper">
                                            <img src={img16} alt="Filament" />
                                        </div>
                                        <a href="#" className="menu-category-link" onClick={(e) => { e.preventDefault(); onNavigate('products', null, 'Sunlu'); }}>FILAMENT</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item has-dropdown">
                        <a href="#" className="highlight">OTHER</a>
                        <div className="mega-menu">
                            <div className="container">
                                <div className="mega-menu-grid">
                                    <div className="mega-column mega-image-column">
                                        <div className="menu-image-wrapper">
                                            <img src={img14} alt="Tools" />
                                        </div>
                                        <a href="#" className="menu-category-link" onClick={(e) => { e.preventDefault(); onNavigate('products', 'Tools'); }}>TOOLS</a>
                                    </div>
                                    <div className="mega-column mega-image-column">
                                        <div className="menu-image-wrapper">
                                            <img src={img13} alt="Racing & Flying Accessories" />
                                        </div>
                                        <a href="#" className="menu-category-link" onClick={(e) => { e.preventDefault(); onNavigate('products', 'Accessories'); }}>RACING & FLYING ACCESSORIES</a>
                                    </div>
                                    <div className="mega-column mega-image-column">
                                        <div className="menu-image-wrapper">
                                            <img src={img15} alt="Printer" />
                                        </div>
                                        <a href="#" className="menu-category-link" onClick={(e) => { e.preventDefault(); onNavigate('products', '3D Printing Lab'); }}>3D PRINTER</a>
                                    </div>
                                    <div className="mega-column link-list-column">
                                        <ul>
                                            <li><a href="#" className="menu-category-link" onClick={(e) => { e.preventDefault(); onNavigate('products', null, 'Foxeer'); }}>FOXEER</a></li>
                                            <div className="divider-line" style={{ width: '100%' }}></div>
                                            <li><a href="#" className="menu-category-link" onClick={(e) => { e.preventDefault(); onNavigate('products', '3D Printing Lab'); }}>3D PRINTING LAB</a></li>
                                            <div className="divider-line" style={{ width: '100%' }}></div>
                                            <li><a href="#" className="menu-category-link" onClick={(e) => { e.preventDefault(); onNavigate('products', null, 'Generic'); }}>GENERIC</a></li>
                                            <div className="divider-line" style={{ width: '100%' }}></div>
                                            <li><a href="#" className="menu-category-link" onClick={(e) => { e.preventDefault(); onNavigate('products', 'Consumer Drones'); }}>CONSUMER DRONES</a></li>
                                            <div className="divider-line" style={{ width: '100%' }}></div>
                                            <li><a href="#" className="menu-category-link" onClick={(e) => { e.preventDefault(); onNavigate('products', 'Action Camera & Accessories'); }}>ACTION CAMERA & ACCESSORIES</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('free-offers'); }}>FREE OFFERS</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('daily-deals'); }}>DAILY DEALS</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
