import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [phase, setPhase] = useState(1); // 1: movie, 2: white screen, 3: pinyonScript typewriter, 4: Misaki typewriter, 5: complete
  const [fadeOverlayOpacity, setFadeOverlayOpacity] = useState(0);
  const [displayedKoChillium, setDisplayedKoChillium] = useState('');
  const [displayedMisaki, setDisplayedMisaki] = useState('');
  const [wordOpacities, setWordOpacities] = useState([0, 0, 0]); // 焦らず、比べず、美しく
  const [movieEnded, setMovieEnded] = useState(false);
  const koChilliumText = 'Ko-ChilLium';
  const misakiText = 'Misaki Sato';
  const words = ['焦らず', '比べず', '美しく'];

  useEffect(() => {
    const timers = [
      // Phase 1: Movie plays, start fade overlay at 4 seconds
      setTimeout(() => {
        // Start fade overlay animation
        const startTime = Date.now();
        const duration = 1500; // 1.5 seconds fade
        
        const animateFade = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          setFadeOverlayOpacity(progress * 100);
          
          if (progress < 1) {
            requestAnimationFrame(animateFade);
          }
        };
        
        requestAnimationFrame(animateFade);
      }, 4000),
      // Phase 2: Movie ends, transition to white screen
      setTimeout(() => {
        setMovieEnded(true);
        setPhase(2);
      }, 5000),
      // Phase 3: White screen for 1 second
      setTimeout(() => setPhase(3), 6000),
      // Phase 4: Ko-ChilLium typewriter starts (6000ms)
      // Phase 5: Misaki typewriter starts (after Ko-ChilLium completes)
      // Phase 6: Complete loading (after both typewriters finish)
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  // Handle movie end event
  const handleMovieEnd = () => {
    setMovieEnded(true);
    setPhase(2);
  };

  // pinyonScript typewriter effect
  useEffect(() => {
    if (phase === 3) {
      let currentIndex = 0;
      const typewriterInterval = setInterval(() => {
        if (currentIndex <= koChilliumText.length) {
          setDisplayedKoChillium(koChilliumText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typewriterInterval);
          // Start Misaki typewriter after pinyonScript completes
          setTimeout(() => setPhase(4), 300);
        }
      }, 100); // 100ms per character

      return () => clearInterval(typewriterInterval);
    }
  }, [phase, koChilliumText]);

  // Misaki Sato typewriter effect
  useEffect(() => {
    if (phase === 4) {
      let currentIndex = 0;
      const typewriterInterval = setInterval(() => {
        if (currentIndex <= misakiText.length) {
          setDisplayedMisaki(misakiText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typewriterInterval);
          // Start words fade-in after 2 seconds
          setTimeout(() => {
            setPhase(5);
          }, 2000);
        }
      }, 80); // Slightly faster for subtitle

      return () => clearInterval(typewriterInterval);
    }
  }, [phase, misakiText]);

  // Words fade-in effect
  useEffect(() => {
    if (phase === 5) {
      const fadeInWord = (wordIndex: number) => {
        const startTime = Date.now();
        const duration = 1000; // 1 second per word
        
        const animateOpacity = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // 1秒で0%から100%まで線形に変化
          const opacity = progress * 100;
          
          setWordOpacities(prev => {
            const newOpacities = [...prev];
            newOpacities[wordIndex] = opacity;
            return newOpacities;
          });
          
          if (progress < 1) {
            requestAnimationFrame(animateOpacity);
          } else {
            // Next word or complete
            if (wordIndex < words.length - 1) {
              // 1秒間隔で次の単語を開始
              setTimeout(() => fadeInWord(wordIndex + 1), 1000);
            } else {
              // All words completed, wait 3 seconds then start main site fade
              setTimeout(() => {
                setPhase(6);
                onComplete();
              }, 8000); // 5秒から8秒に延長して「美しく」をより長く表示
            }
          }
        };
        
        requestAnimationFrame(animateOpacity);
      };
      
      // Start with first word
      fadeInWord(0);
    }
  }, [phase, words.length, onComplete]);

  return (
    <div className="fixed inset-0 bg-cream z-50 overflow-hidden flex items-center justify-center">
      {/* Phase 1: Opening Movie */}
      {phase === 1 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black relative">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            onEnded={handleMovieEnd}
          >
            <source src="/videos/opening-movie.mp4" type="video/mp4" />
            <source src="/videos/opening-movie.webm" type="video/webm" />
            {/* Fallback for browsers that don't support video */}
            <div className="flex items-center justify-center h-full">
              <p className="text-white text-xl">Loading...</p>
            </div>
          </video>
          {/* Fade overlay for seamless transition */}
          <div 
            className="absolute inset-0 bg-white pointer-events-none transition-none"
            style={{ 
              opacity: fadeOverlayOpacity / 100
            }}
          />
        </div>
      )}

      {/* Phase 2: White Screen */}
      {phase === 2 && (
        <div className="absolute inset-0 bg-white"></div>
      )}

      {/* Phase 3-5: Logo and Typewriter Effects (no background/border) */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${
        phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        {/* Logo Container (no background/border) */}
        <div className="relative px-12 py-16">
          {/* pinyonScript with typewriter effect */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-charcoal tracking-wider text-center leading-tight mb-2 pinyon-script">
            {phase >= 3 ? (
              <>
                {displayedKoChillium}
                <span className={`inline-block w-0.5 h-16 bg-charcoal ml-1 ${
                  displayedKoChillium.length < koChilliumText.length ? 'animate-pulse' : 'opacity-0'
                }`}></span>
              </>
            ) : (
              <span className="opacity-0">{koChilliumText}</span>
            )}
          </h1>
          
          {/* Misaki Sato with typewriter effect */}
          <p className="text-xl md:text-2xl text-charcoal/70 tracking-wide font-serif text-center">
            {phase >= 4 ? (
              <>
                {displayedMisaki}
                <span className={`inline-block w-0.5 h-6 bg-charcoal/70 ml-1 ${
                  displayedMisaki.length < misakiText.length ? 'animate-pulse' : 'opacity-0'
                }`}></span>
              </>
            ) : (
              <span className="opacity-0">{misakiText}</span>
            )}
          </p>
          
          {/* Three words fade-in */}
          <div className="mt-8 flex justify-center space-x-8">
            {phase >= 5 ? (
              <>
                <p 
                  className="text-lg md:text-xl text-charcoal/60 tracking-wide font-serif transition-none"
                  style={{ opacity: wordOpacities[0] / 100 }}
                >
                  焦らず
                </p>
                <p 
                  className="text-lg md:text-xl text-charcoal/60 tracking-wide font-serif transition-none"
                  style={{ opacity: wordOpacities[1] / 100 }}
                >
                  比べず
                </p>
                <p 
                  className="text-lg md:text-xl text-charcoal/60 tracking-wide font-serif transition-none"
                  style={{ opacity: wordOpacities[2] / 100 }}
                >
                  美しく
                </p>
              </>
            ) : (
              <>
                <p className="text-lg md:text-xl text-transparent tracking-wide font-serif">
                  焦らず
                </p>
                <p className="text-lg md:text-xl text-transparent tracking-wide font-serif">
                  比べず
                </p>
                <p className="text-lg md:text-xl text-transparent tracking-wide font-serif">
                  美しく
                </p>
              </>
            )}
          </div>
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