import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [phase, setPhase] = useState(1); // 1: circle expansion, 2: logo, 3: main copy, 4: scroll indicator

  useEffect(() => {
    const timers = [
      // Phase 1: Circle expansion (0-800ms)
      setTimeout(() => setPhase(2), 800),
      // Phase 2: Logo display (800-1400ms)
      setTimeout(() => setPhase(3), 1400),
      // Phase 3: Main copy (1400-2200ms)
      setTimeout(() => setPhase(4), 2200),
      // Phase 4: Complete loading (2200-3000ms)
      setTimeout(() => onComplete(), 3000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-cream z-50 overflow-hidden">
      {/* Phase 1: Circle Expansion */}
      <div 
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                   bg-cream rounded-full transition-all duration-800 ease-out ${
          phase >= 2 ? 'w-screen h-screen scale-150' : 'w-4 h-4'
        }`}
      />

      {/* Phase 2: Logo Display */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
        phase === 2 ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="w-16 h-16 border-2 border-charcoal rounded-full flex items-center justify-center">
          <span className="text-charcoal font-light text-xl tracking-wider">W</span>
        </div>
      </div>

      {/* Phase 3: Main Copy */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${
        phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-charcoal tracking-wider mb-4 text-center leading-tight cursive">
          Ko-ChilLium
        </h1>
        <p className="text-lg md:text-xl text-charcoal/70 tracking-wide font-light">
          Web Writer. Content Strategist.
        </p>
        
        {/* Decorative line */}
        <div className="w-24 h-0.5 bg-charcoal/30 mt-8 opacity-50"></div>
      </div>

      {/* Phase 4: Scroll Indicator */}
      <div className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 
                     flex flex-col items-center transition-all duration-500 delay-300 ${
        phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <span className="text-xs text-charcoal/50 tracking-widest mb-2 font-light">SCROLL</span>
        <ChevronDown className="w-4 h-4 text-charcoal/40 animate-bounce" />
      </div>

      {/* Background texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default LoadingScreen;