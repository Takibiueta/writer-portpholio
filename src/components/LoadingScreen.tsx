import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [phase, setPhase] = useState(1); // 1: hourglass animation, 2: logo fade in, 3: typewriter, 4: complete
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Ko-ChilLium';

  useEffect(() => {
    const timers = [
      // Phase 1: Hourglass animation (0-2000ms)
      setTimeout(() => setPhase(2), 2000),
      // Phase 2: Logo border fade in (2000-2300ms)
      setTimeout(() => setPhase(3), 2300),
      // Phase 3: Typewriter effect starts (2300ms)
      // Phase 4: Complete loading (after typewriter finishes)
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // Typewriter effect
  useEffect(() => {
    if (phase === 3) {
      let currentIndex = 0;
      const typewriterInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typewriterInterval);
          // Complete loading after typewriter finishes
          setTimeout(() => {
            setPhase(4);
            setTimeout(() => onComplete(), 500);
          }, 500);
        }
      }, 100); // 100ms per character

      return () => clearInterval(typewriterInterval);
    }
  }, [phase, fullText, onComplete]);

  return (
    <div className="fixed inset-0 bg-cream z-50 overflow-hidden flex items-center justify-center">
      {/* Phase 1: Hourglass Animation */}
      <div className={`transition-opacity duration-500 ${
        phase === 1 ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="relative">
          {/* Hourglass Container */}
          <div className="w-16 h-24 relative">
            {/* Top Glass */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-10 border-2 border-charcoal rounded-t-lg border-b-0">
              {/* Top Sand */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-200 to-amber-100 rounded-t-lg transition-all duration-2000 ease-out"
                   style={{
                     height: phase >= 1 ? '10%' : '90%',
                   }}>
              </div>
            </div>
            
            {/* Middle Neck */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-4 bg-charcoal/20">
              {/* Falling Sand Stream */}
              <div className={`absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-amber-200 transition-all duration-300 ${
                phase >= 1 ? 'h-4 opacity-100' : 'h-0 opacity-0'
              }`}></div>
            </div>
            
            {/* Bottom Glass */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-10 border-2 border-charcoal rounded-b-lg border-t-0">
              {/* Bottom Sand */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-amber-200 to-amber-100 rounded-b-lg transition-all duration-2000 ease-out"
                   style={{
                     height: phase >= 1 ? '90%' : '10%',
                   }}>
              </div>
            </div>
            
            {/* Hourglass Frame */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-14 h-24 border-2 border-charcoal rounded-lg"
                 style={{
                   clipPath: 'polygon(0 0, 100% 0, 100% 40%, 60% 50%, 100% 60%, 100% 100%, 0 100%, 0 60%, 40% 50%, 0 40%)'
                 }}>
            </div>
          </div>
          
          {/* Relaxing Text */}
          <div className="mt-8 text-center">
            <p className="text-charcoal/60 text-sm tracking-wide animate-pulse">
              ととのう時間...
            </p>
          </div>
        </div>
      </div>

      {/* Phase 2 & 3: Logo with Border and Typewriter Effect */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${
        phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        {/* Logo Container with Border */}
        <div className={`relative px-12 py-8 transition-all duration-300 ${
          phase >= 2 ? 'bg-cream/90 backdrop-blur-sm border border-charcoal/10' : 'bg-transparent border border-transparent'
        } rounded-2xl`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-charcoal tracking-wider text-center leading-tight cursive">
            {phase >= 3 ? (
              <>
                {displayedText}
                <span className={`inline-block w-0.5 h-16 bg-charcoal ml-1 ${
                  displayedText.length < fullText.length ? 'animate-pulse' : 'opacity-0'
                }`}></span>
              </>
            ) : (
              <span className="opacity-0">{fullText}</span>
            )}
          </h1>
        </div>
        
        {/* Subtitle - appears after typewriter completes */}
        <div className={`transition-all duration-500 delay-300 ${
          phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          <p className="text-lg md:text-xl text-charcoal/70 tracking-wide font-light mt-4">
            Web Writer. Content Strategist.
          </p>
          
          {/* Decorative line */}
          <div className="w-24 h-0.5 bg-charcoal/30 mt-8 opacity-50 mx-auto"></div>
          
          {/* Sauna-inspired subtitle */}
          <p className="text-xs text-charcoal/50 tracking-widest mt-4 font-light">
            SAUNA LOVER • CONTENT CREATOR
          </p>
        </div>
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