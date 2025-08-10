import React from 'react';
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/hero-bg.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-wider mb-6 leading-tight text-charcoal logo-font">
          Ko-ChilLium
        </h1>
        <p className="text-lg md:text-xl mb-8 text-white">
          高知の魅力をあなたに
        </p>
        <Link
          to="about"
          smooth={true}
          duration={500}
          className="inline-block px-6 py-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-colors cursor-pointer"
        >
          詳しく見る
        </Link>
      </div>
    </section>
  );
};

export default Hero;