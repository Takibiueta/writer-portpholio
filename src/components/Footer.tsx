import React from 'react';
import { Mail, Twitter, Linkedin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer = ({ onNavigate }: FooterProps) => {
  const navigation = [
    { name: 'HOME', page: 'home' },
    { name: 'ABOUT', page: 'about' },
    { name: 'WORKS', page: 'works' },
    { name: 'CONTACT', page: 'contact' },
  ];

  return (
    <footer className="border-t border-charcoal/10 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <p className="text-charcoal/60 text-sm leading-relaxed">
              戦略的なコンテンツ制作で<br />
              ビジネスの成長をサポートします
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-1">
            <h3 className="font-medium mb-4 tracking-wide">NAVIGATION</h3>
            <nav className="space-y-3">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => onNavigate(item.page)}
                  className="block text-sm text-charcoal/60 hover:text-charcoal transition-colors tracking-wide"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="font-medium mb-4 tracking-wide">CONNECT</h3>
            <div className="space-y-3 mb-6">
              <a 
                href="mailto:hello@kochillium.writer" 
                className="flex items-center space-x-2 text-sm text-charcoal/60 hover:text-charcoal transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>hello@kochillium.writer</span>
              </a>
            </div>
            
            <div className="flex space-x-3">
              <a 
                href="#" 
                className="w-10 h-10 bg-white/50 rounded-lg flex items-center justify-center
                         hover:bg-white/80 transition-colors duration-300 group"
              >
                <Twitter className="w-4 h-4 text-charcoal/60 group-hover:text-charcoal" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/50 rounded-lg flex items-center justify-center
                         hover:bg-white/80 transition-colors duration-300 group"
              >
                <Linkedin className="w-4 h-4 text-charcoal/60 group-hover:text-charcoal" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-charcoal/10 text-center">
          <p className="text-xs text-charcoal/40 tracking-widest">
            © 2024 Ko-ChilLium. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;