import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPage: string;                // 'home' | 'about' | 'works' | 'contact'
  onNavigate: (page: string) => void;
}

const NAV = [
  { name: 'HOME', page: 'home' },
  { name: 'ABOUT', page: 'about' },
  { name: 'WORKS', page: 'works' },
  { name: 'CONTACT', page: 'contact' },
];

const Header = ({ currentPage, onNavigate }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleGo = (page: string) => {
    onNavigate(page);
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur border-b border-charcoal/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Row */}
        <div className="flex h-16 items-center justify-between">
          {/* Brand (ロゴは筆記体) */}
          <button
            onClick={() => handleGo('home')}
            className="logo-font text-2xl tracking-wide hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal/30 rounded"
            aria-label="Go to Home"
          >
            Ko-ChilLium
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV.map((item) => {
              const active = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleGo(item.page)}
                  aria-current={active ? 'page' : undefined}
                  className={[
                    // ベース
                    'relative px-3 py-2 text-sm tracking-widest rounded',
                    'transition-transform duration-200 ease-out',
                    // “ポコっ”と浮く演出
                    'hover:-translate-y-0.5 hover:scale-105 active:translate-y-0 active:scale-100',
                    'motion-reduce:transform-none motion-reduce:transition-none',
                    // 色
                    active ? 'text-charcoal' : 'text-charcoal/70 hover:text-charcoal',
                    // フォーカスリング
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal/30',
                  ].join(' ')}
                >
                  {item.name}
                  {/* アクティブ下線（スッと伸びる） */}
                  <span
                    aria-hidden="true"
                    className={[
                      'pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-1 h-0.5 bg-charcoal',
                      'transition-all duration-200 ease-out',
                      active ? 'w-8 opacity-100' : 'w-0 opacity-0 group-hover:w-8',
                    ].join(' ')}
                  />
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal/30"
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <nav
            id="mobile-nav"
            className="md:hidden border-t border-charcoal/10 py-3"
          >
            <ul className="flex flex-col">
              {NAV.map((item) => {
                const active = currentPage === item.page;
                return (
                  <li key={item.page}>
                    <button
                      onClick={() => handleGo(item.page)}
                      aria-current={active ? 'page' : undefined}
                      className={[
                        'w-full text-left px-2 py-3 text-sm tracking-widest rounded',
                        'transition-transform duration-150 ease-out',
                        // モバイルでも“ポコっ”
                        'hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0',
                        'motion-reduce:transform-none motion-reduce:transition-none',
                        active ? 'text-charcoal font-medium' : 'text-charcoal/70 hover:text-charcoal',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal/30',
                      ].join(' ')}
                    >
                      {item.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;