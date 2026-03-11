// src/components/Hero.jsx

import React from 'react';
import heroRightImage from '../../assets/groceryweb/grocery.png';  // ← your right-side produce image
import { color } from 'chart.js/helpers';

const Hero = () => {
  return (
    <section 
      className="py-5 py-lg-5" 
      style={{ 
        backgroundColor: '#ffffff', // or '#f8f9fa' / your preferred light bg
      }}
    >
      <div className="container">
        <div className="row align-items-center">

          {/* LEFT - Text Content */}
          <div className="col-lg-6 mb-5 mb-lg-0 order-lg-1">
            <h1
              className="display-4 fw-bold mb-3"
              style={{ 
                fontFamily: 'Manrope, sans-serif', 
                lineHeight: '1.15',
                color: '#24231D', // dark text to match footer style
              }}
            >
              Your trusted
              <br />
              <span style={{ color: '#EC5609' }}>Grocery Wholesale</span>
              <br />
              Partner
            </h1>

            <p
              className="fs-5 mb-4 pe-lg-4"
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 400,
                color: '#555555',
                lineHeight: '1.6',
                maxWidth: '520px',
              }}
            >
              Empowering your retail business with exclusive bulk pricing, 24-hour
              fulfillment, and over 5,000+ top-quality SKUs.
            </p>

            <a
              href="/shop" // ← update to your real route
              className="btn btn-lg px-5 py-3 fw-semibold text-white"
              style={{
                backgroundColor: '#EC5609',
                borderRadius: '50px',
                fontFamily: 'Manrope, sans-serif',
                fontSize: '1.125rem',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#d14c08';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(236,86,9,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#EC5609';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Shop Now
            </a>
          </div>

          {/* RIGHT - Image Card with Overlay */}
          <div className="col-lg-6 order-lg-2">
            <div 
              className="position-relative rounded-4 overflow-hidden shadow-lg"
              style={{
                maxHeight: '520px',           // adjust based on your image aspect ratio
                backgroundColor: '#000',
              }}
            >
              <img
                src={heroRightImage}
                alt="Fresh grocery wholesale produce"
                className="w-100 h-100 object-fit-cover"
                style={{ 
                  display: 'block',
                  minHeight: '420px',
                }}
              />

              {/* Overlay box at bottom-right of the image */}
              <div
                className="position-absolute bottom-0 end-0 m-3 m-md-4 p-3 p-md-4 text-white rounded-3"
                style={{
                  backgroundColor: 'rgba(71, 70, 70, 0.68)',
                  maxWidth: '85%',              // responsive width
                  backdropFilter: 'blur(5px)',
                  fontFamily: 'Manrope, sans-serif',
                }}
              >
                <p className="mb-0 fw-medium" style={{ fontSize: '1.1rem', color:'#fff' }}>
                  Daily inventory updates from top FMCG brands
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;