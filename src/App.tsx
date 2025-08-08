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
  const [startFade, setStartFade] = useState(false);

  const handleLoadingComplete = () => {
    // ローディング終了時にすぐにフェードを開始
    setStartFade(true);

    // 5秒かけて opacity を 0 から 100 に滑らかに上げる
    const startTime = Date.now();
    const duration = 5000; // 5 seconds

    const animateOpacity = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1); // 0 〜 1
      const currentOpacity = Math.round(progress * 100); // 0 〜 100

      setOpacity(currentOpacity);

      if (progress < 1) {
        requestAnimationFrame(animateOpacity);
      } else {
        // アニメーション完了後、0.1秒後にローディング画面を非表示
        setTimeout(() => {
          setIsLoading(false);
        }, 100);
      }
    };

    requestAnimationFrame(animateOpacity);
  };

  // opacity の値を CSS 用の値に変換
  const getOpacityStyle = () => {
    return {
      opacity: opacity / 100,
      transition: 'none', // JS アニメーションを使うので CSS の transition は無効化
    };
  };

  useEffect(() => {
    // フェイルセーフ: 20秒経過したら強制的にローディング画面を終了
    const fallbackId = setTimeout(() => {
      setStartFade(true);
      setIsLoading(false);
    }, 20000); // Fallback: 20 seconds total

    return () => {
      clearTimeout(fallbackId);
    };
  }, []);

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
      {/* メインサイトの内容 - opacity で表示／非表示を制御 */}
      <div
        className={`transition-opacity duration-[5000ms] ease-out ${
          startFade ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Header currentPage={currentPage} onNavigate={setCurrentPage} />
        <main>{renderCurrentPage()}</main>
        <Footer onNavigate={setCurrentPage} />
      </div>

      {/* ローディング画面のオーバーレイ */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
    </div>
  );
}

export default App;