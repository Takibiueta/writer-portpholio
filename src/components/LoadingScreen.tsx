import React, { useState, useEffect, useRef } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  // 1: movie, 3: pinyonScript typewriter, 4: Misaki typewriter, 5: words fade-in, 6: done
  const [phase, setPhase] = useState(1);
  const [fadeOverlayOpacity, setFadeOverlayOpacity] = useState(0);
  const [displayedKoChillium, setDisplayedKoChillium] = useState('');
  const [displayedMisaki, setDisplayedMisaki] = useState('');
  const [wordOpacities, setWordOpacities] = useState([0, 0, 0]); // 焦らず、比べず、美しく
  const [movieEnded, setMovieEnded] = useState(false);

  const koChilliumText = 'Ko-ChilLium';
  const misakiText = 'Misaki Sato';
  const words = ['焦らず', '比べず', '美しく'];

  // ===== Refs for stable callbacks & timers/RAFs =====
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  const completedRef = useRef(false); // 二重完了防止
  const rafIdsRef = useRef<number[]>([]);
  const timeoutIdsRef = useRef<number[]>([]);
  const intervalIdsRef = useRef<number[]>([]);

  const addRAF = (id: number) => rafIdsRef.current.push(id);
  const addTO = (id: number) => timeoutIdsRef.current.push(id);
  const addIV = (id: number) => intervalIdsRef.current.push(id);

  const clearAllTimers = () => {
    timeoutIdsRef.current.forEach(clearTimeout);
    timeoutIdsRef.current = [];
    intervalIdsRef.current.forEach(clearInterval);
    intervalIdsRef.current = [];
    rafIdsRef.current.forEach(cancelAnimationFrame);
    rafIdsRef.current = [];
  };

  const safeCallComplete = () => {
    if (completedRef.current) return;
    // Clear any pending timers/animations before finishing
    clearAllTimers();
    completedRef.current = true;
    setPhase(6);
    onCompleteRef.current?.();
  };

  // ===== Safety timer for the opening movie (6s fallback) =====
  useEffect(() => {
    if (movieEnded) return;
    const id = window.setTimeout(() => {
      if (!movieEnded) handleMovieEnd();
    }, 6000);
    addTO(id);
    return () => {
      clearTimeout(id);
    };
  }, [movieEnded]); // safety arm only once until movie ends

  // ===== Handle movie end -> fade overlay -> phase 3 =====
  const handleMovieEnd = () => {
    if (movieEnded) return; // guard
    setMovieEnded(true);

    const startTime = Date.now();
    const duration = 1500; // 1.5s fade

    const animateFade = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setFadeOverlayOpacity(progress * 100);

      if (progress < 1) {
        addRAF(requestAnimationFrame(animateFade));
      } else {
        // フェード完了後、0.5秒後に phase 3
        const afterFade = window.setTimeout(() => {
          setPhase(3);
        }, 500);
        addTO(afterFade);
      }
    };

    addRAF(requestAnimationFrame(animateFade));
  };

  // ===== Phase 3: "Ko-ChilLium" typewriter =====
  useEffect(() => {
    if (phase !== 3) return;

    let currentIndex = 0;
    const iv = window.setInterval(() => {
      if (currentIndex <= koChilliumText.length) {
        setDisplayedKoChillium(koChilliumText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(iv);
        // 0.3s 後に Phase 4
        const to = window.setTimeout(() => setPhase(4), 300);
        addTO(to);
      }
    }, 100);
    addIV(iv);

    return () => {
      clearInterval(iv);
    };
  }, [phase, koChilliumText]);

  // ===== Phase 4: "Misaki Sato" typewriter =====
  useEffect(() => {
    if (phase !== 4) return;

    let currentIndex = 0;
    const iv = window.setInterval(() => {
      if (currentIndex <= misakiText.length) {
        setDisplayedMisaki(misakiText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(iv);
        // 0.5s 後に Phase 5
        const to = window.setTimeout(() => setPhase(5), 500);
        addTO(to);
      }
    }, 80);
    addIV(iv);

    return () => {
      clearInterval(iv);
    };
  }, [phase, misakiText]);

  // ===== Phase 5: Words fade-in (strictly single-run, fully cleaned) =====
  useEffect(() => {
    if (phase !== 5) return;

    let unmounted = false;

    const fadeInWord = (wordIndex: number) => {
      const start = Date.now();
      const duration = 1000; // 1s per word

      const tick = () => {
        if (unmounted) return;
        const progress = Math.min((Date.now() - start) / duration, 1);
        const opacity = progress * 100;

        setWordOpacities(prev => {
          const next = [...prev];
          next[wordIndex] = opacity;
          return next;
        });

        if (progress < 1) {
          addRAF(requestAnimationFrame(tick));
        } else {
          if (wordIndex < words.length - 1) {
            // 次の単語を 1s 後に開始
            const to = window.setTimeout(() => fadeInWord(wordIndex + 1), 1000);
            addTO(to);
          } else {
            // 最後: 1s 待ってから、さらに 2.5s 待って完了
            const outer = window.setTimeout(() => {
              const completeTimer = window.setTimeout(() => {
                safeCallComplete();
              }, 2500);
              addTO(completeTimer);
            }, 1000);
            addTO(outer);
          }
        }
      };

      addRAF(requestAnimationFrame(tick));
    };

    fadeInWord(0);

    return () => {
      unmounted = true;
      clearAllTimers();
    };
  }, [phase]); // ★ phase のみ依存

  // ===== Cleanup on unmount (safety) =====
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-cream z-50 overflow-hidden flex items-center justify-center cursor-pointer"
      onClick={safeCallComplete} // クリックでスキップ
    >
      {/* Phase 1: Opening Movie */}
      {phase === 1 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black relative">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            onEnded={handleMovieEnd}
            onError={handleMovieEnd} // エラーでも必ず進める
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
            style={{ opacity: fadeOverlayOpacity / 100 }}
          />
        </div>
      )}

      {/* Phase 3-5: Logo and Typewriter Effects */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${
          phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {/* Logo Container (no background/border) */}
        <div className="relative px-12 py-16">
          {/* pinyonScript with typewriter effect */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-charcoal tracking-wider text-center leading-tight mb-2 pinyon-script">
            {phase >= 3 ? (
              <>
                {displayedKoChillium}
                <span
                  className={`inline-block w-0.5 h-16 bg-charcoal ml-1 ${
                    displayedKoChillium.length < koChilliumText.length
                      ? 'animate-pulse'
                      : 'opacity-0'
                  }`}
                />
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
                <span
                  className={`inline-block w-0.5 h-6 bg-charcoal/70 ml-1 ${
                    displayedMisaki.length < misakiText.length
                      ? 'animate-pulse'
                      : 'opacity-0'
                  }`}
                />
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

      {/* Skip hint */}
      <div className="absolute bottom-8 right-8 text-charcoal/30 text-sm tracking-wide">
        Click to skip
      </div>

      {/* Background texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default LoadingScreen;