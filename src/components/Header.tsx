import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header = ({ currentPage, onNavigate }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'HOME', page: 'home' },
    { name: 'ABOUT', page: 'about' },
    { name: 'WORKS', page: 'works' },
    { name: 'CONTACT', page: 'contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-cream/95 backdrop-blur-sm z-40 border-b border-charcoal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div></div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => onNavigate(item.page)}
                className={`text-sm tracking-wide transition-all duration-300 relative ${
                  currentPage === item.page 
                    ? 'text-charcoal' 
                    : 'text-charcoal/60 hover:text-charcoal'
                }`}
              >
                {item.name}
                {currentPage === item.page && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-charcoal"></div>
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-charcoal/10 py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    onNavigate(item.page);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left text-sm tracking-wide transition-colors ${
                    currentPage === item.page 
                      ? 'text-charcoal font-medium' 
                      : 'text-charcoal/60 hover:text-charcoal'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;