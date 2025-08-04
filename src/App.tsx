import React, { useState, useEffect } from 'react';
import { Menu, X, ExternalLink, ArrowRight, Mail, Twitter, Linkedin } from 'lucide-react';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import Works from './components/Works';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [startFade, setStartFade] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const handleLoadingComplete = () => {
    // Start the fade transition
    setStartFade(true);
    // Complete loading after 3 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'about':
        return <About />;
      case 'works':
        return <Works />;
      case 'contact':
        return <Contact />;
      default:
        return <Hero onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-cream text-charcoal relative">
      {/* Main site content - always rendered but controlled by opacity */}
      <div className={`transition-opacity duration-[3000ms] ease-out ${
        startFade ? 'opacity-100' : 'opacity-0'
      }`}>
      <div className={`transition-opacity duration-[5000ms] ease-out ${
        startFade ? 'opacity-100' : 'opacity-0'
      }`}>
        <Header currentPage={currentPage} onNavigate={setCurrentPage} />
        <main>
          {renderCurrentPage()}
        </main>
        <Footer onNavigate={setCurrentPage} />
      </div>
      </div>
      
      {/* Loading screen overlay */}
      {isLoading && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}
    </div>
  );
}

export default App;