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
  const [opacity, setOpacity] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');

  const handleLoadingComplete = () => {
    // Start stepwise opacity animation: 20% every second for 5 seconds
    let step = 0;
    const opacityInterval = setInterval(() => {
      step++;
      setOpacity(step * 20);
      
      if (step >= 5) {
        clearInterval(opacityInterval);
        // Remove loading screen after animation completes
        setTimeout(() => {
          setIsLoading(false);
        }, 100);
      }
    }, 1000); // Every 1 second
  };

  // Convert opacity percentage to CSS opacity value
  const getOpacityStyle = () => {
    return {
      opacity: opacity / 100,
      transition: 'opacity 1s ease-out'
    };
  };

  const renderCurrentPage = () => {
      setIsLoading(false);
    }, 5000);
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
      <div style={getOpacityStyle()}>
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