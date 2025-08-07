import React, { useState, useEffect } from 'react';
import { Menu, X, ExternalLink, ArrowRight, Mail, Twitter, Linkedin } from 'lucide-react';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import Works from './components/Works';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FontTest from './components/FontTest';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [opacity, setOpacity] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');
  const [startFade, setStartFade] = useState(false);

  const handleLoadingComplete = () => {
    // Start fade immediately when called
    setStartFade(true);
    
    // Start smooth linear opacity animation: 0 to 100 over exactly 5 seconds
    const startTime = Date.now();
    const duration = 5000; // 5 seconds
    
    const animateOpacity = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1); // 0 to 1
      const currentOpacity = Math.round(progress * 100); // 0 to 100
      
      setOpacity(currentOpacity);
      
      if (progress < 1) {
        requestAnimationFrame(animateOpacity);
      } else {
        // Remove loading screen immediately after animation completes
        setTimeout(() => {
          setIsLoading(false);
        }, 100);
      }
    };
    
    requestAnimationFrame(animateOpacity);
  };

  // Convert opacity percentage to CSS opacity value
  const getOpacityStyle = () => {
    return {
      opacity: opacity / 100,
      transition: 'none' // Remove CSS transition since we're animating with JS
    };
  };

  useEffect(() => {
    setTimeout(() => {
      setStartFade(true);
      setIsLoading(false);
    }, 15000); // Fallback: 15 seconds total
  }, []);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'about':
        return <About />;
      case 'works':
        return <Works />;
      case 'contact':
        return <Contact />;
      case 'font-test':
        return <FontTest />;
      default:
        return <Hero onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-cream text-charcoal relative">
      {/* Main site content - always rendered but controlled by opacity */}
      <div className={`transition-opacity duration-[5000ms] ease-out ${
        startFade ? 'opacity-100' : 'opacity-0'
      }`}>
        <Header currentPage={currentPage} onNavigate={setCurrentPage} />
        <main>
          {renderCurrentPage()}
        </main>
        <Footer onNavigate={setCurrentPage} />
      </div>
      
      {/* Loading screen overlay */}
      {isLoading && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}
    </div>
  );
}

export default App;