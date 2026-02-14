import React from 'react';
import './AllProducts.css'; // Reusing some basic styles

const AboutUs = () => {
    return (
        <div className="container" style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 className="section-title">About Us</h1>
            <div className="content-wrapper" style={{ lineHeight: '1.6', fontSize: '1.1rem', color: '#444' }}>
                <p>Welcome to RoboXpressbd, your number one source for all things robotics and drones. We're dedicated to providing you the very best of electronic components, with an emphasis on quality, affordability, and excellent customer service.</p>

                <h3 style={{ marginTop: '20px' }}>Our Mission</h3>
                <p>Founded in 2020, RoboXpressbd has come a long way from its beginnings in Dhaka. When we first started out, our passion for "DIY Robotics" drove us to start our own business.</p>

                <h3 style={{ marginTop: '20px' }}>What We Offer</h3>
                <p>We offer a wide range of products including:</p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginTop: '10px' }}>
                    <li>Drones and Drone Parts</li>
                    <li>Microcontrollers (Arduino, ESP32, etc.)</li>
                    <li>Sensors and Modules</li>
                    <li>3D Printing Supplies</li>
                    <li>Tools and Accessories</li>
                </ul>

                <h3 style={{ marginTop: '20px' }}>Contact Us</h3>
                <p>We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.</p>
                <p style={{ marginTop: '10px' }}>
                    <strong>Email:</strong> support@roboxpressbd.com<br />
                    <strong>Phone:</strong> +8801303897972<br />
                    <strong>Address:</strong> Notunbazar, Vatara, Dhaka-1212, Bangladesh
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
