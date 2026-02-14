import React from 'react';
import './Hero.css';
import lionBeeBanner from '../assets/lionbee_banner.png';
import antigravityA1 from '../assets/antigravity_a1.png';
import hdFpvCollection from '../assets/hd_fpv_collection.png';
import readyToFlyKit from '../assets/ready_to_fly_kit.png';
import followUs from '../assets/follow_us_social.png';
import firmwareDownload from '../assets/firmware_download.png';
import tradeIn from '../assets/trade_in_promo.png';
import dailyDeals from '../assets/daily_deals_promo.png';
import newBanner from '../assets/new.webp';

const Hero = () => {
    return (
        <section className="hero-section" style={{ maxWidth: '1350px', margin: '0 auto', padding: '25px 25px 40px' }}>
            {/* Top Hero Section */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', height: '450px' }}>


                {/* Main Banner - Stay in the Air with internal grid */}
                <div style={{
                    flex: '2',
                    backgroundImage: `url(${newBanner})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '10px',
                    padding: '40px',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                </div>


                {/* Side Banner - LionBee */}
                <div style={{
                    flex: '1',
                    position: 'relative',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    backgroundColor: '#111'
                }}>
                    <img
                        src={lionBeeBanner}
                        alt="LionBee"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: 0.85
                        }}
                    />
                    <div style={{
                        position: 'absolute',
                        bottom: '30px',
                        right: '30px',
                        textAlign: 'right',
                        zIndex: 2
                    }}>
                        <h2 style={{
                            fontSize: '1.2rem',
                            fontWeight: '600',
                            color: 'white',
                            marginBottom: '5px',
                            textShadow: '0 2px 8px rgba(0,0,0,0.8)'
                        }}>NewBeeDrone</h2>
                        <h1 style={{
                            fontSize: '1.6rem',
                            fontWeight: '800',
                            lineHeight: '1.2',
                            color: 'white',
                            textShadow: '0 2px 8px rgba(0,0,0,0.8)'
                        }}>
                            LionBee 3inch long range<br />
                            ELRS 2.4 AIO Developer kit
                        </h1>
                    </div>
                </div>
            </div>

            {/* Secondary Bottom Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', gridAutoRows: '380px' }}>
                {/* HD FPV Collection */}
                <div style={{
                    backgroundImage: `url(${hdFpvCollection})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '10px',
                    padding: '35px',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '500', color: 'white', margin: 0, lineHeight: '1.1' }}>
                        HD FPV Collection
                    </h2>
                    <p style={{ fontSize: '1rem', color: 'white', opacity: 0.95, marginTop: '8px' }}>
                        Explore our digital whoops & drones
                    </p>
                </div>

                {/* Ready to Fly */}
                <div style={{
                    backgroundImage: `url(${readyToFlyKit})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '10px',
                    padding: '35px',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '500', color: 'white', margin: 0, lineHeight: '1.1' }}>
                        Ready to Fly
                    </h2>
                    <p style={{ fontSize: '1rem', color: 'white', opacity: 0.95, marginTop: '8px' }}>
                        Professionally tuned PID settings for<br />
                        Smooth & precise flight right out of the box
                    </p>
                </div>

                {/* 2x2 Sub Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '15px' }}>
                    <div style={{
                        backgroundImage: `url(${followUs})`, backgroundSize: 'cover', backgroundPosition: 'center',
                        borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        textAlign: 'center', padding: '20px', position: 'relative', overflow: 'hidden'
                    }}>
                        <h3 style={{
                            color: 'white', fontSize: '1.3rem', fontWeight: '800', lineHeight: '1.1',
                            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                        }}>Follow us!</h3>
                    </div>
                    <div style={{
                        backgroundImage: `url(${firmwareDownload})`, backgroundSize: 'cover', backgroundPosition: 'center',
                        borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        textAlign: 'center', padding: '20px', position: 'relative', overflow: 'hidden'
                    }}>
                        <h3 style={{
                            color: 'white', fontSize: '1.3rem', fontWeight: '800', lineHeight: '1.1',
                            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                        }}>Firmware<br />Download</h3>
                    </div>
                    <div style={{
                        backgroundImage: `url(${tradeIn})`, backgroundSize: 'cover', backgroundPosition: 'center',
                        borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        textAlign: 'center', padding: '20px', position: 'relative', overflow: 'hidden'
                    }}>
                        <h3 style={{
                            color: 'white', fontSize: '1.3rem', fontWeight: '800', lineHeight: '1.1',
                            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                        }}>NX69 $2.50<br />TRADE-IN</h3>
                    </div>
                    <div style={{
                        backgroundImage: `url(${dailyDeals})`, backgroundSize: 'cover', backgroundPosition: 'center',
                        borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        textAlign: 'center', padding: '20px', position: 'relative', overflow: 'hidden'
                    }}>
                        <h3 style={{
                            color: 'white', fontSize: '1.3rem', fontWeight: '800', lineHeight: '1.1',
                            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                        }}>DAILY<br />DEALS</h3>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
