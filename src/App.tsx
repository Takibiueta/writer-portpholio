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
  const [showContent, setShowContent] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Start fade-in animation after loading completes
    setTimeout(() => setShowContent(true), 200);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

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
    <div className={`min-h-screen bg-cream text-charcoal transition-opacity duration-3000 ease-out ${
      showContent ? 'opacity-100' : 'opacity-0'
    }`}>
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>
        {renderCurrentPage()}
      </main>
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}

export default App;