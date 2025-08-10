import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';

interface HeroProps {
  onNavigate: (page: string) => void;
}

const Hero = ({ onNavigate }: HeroProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 背景スライド用（/public/images に存在しない場合は外部URLへ差し替えOK）
  const backgroundImages = [
    '/images/image1.jpg',
    '/images/image2.jpg',
    '/images/image3.jpg',
    '/images/image4.jpg',
  ];

  useEffect(() => {
    const displayDuration = 3000; // 3秒表示
    const fadeDuration = 5000;    // 5秒フェード
    const total = displayDuration + fadeDuration;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex(nextImageIndex);
        setNextImageIndex((nextImageIndex + 1) % backgroundImages.length);
        setIsTransitioning(false);
      }, fadeDuration);
    }, total);

    return () => clearInterval(interval);
  }, [backgroundImages.length, nextImageIndex]);

  // ===== タイプライティング（ロゴをPinyon Scriptで）=====
  const title = 'Ko-ChilLium';
  const [typed, setTyped] = useState('');
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    let i = 0;
    const typeSpeed = 110; // 1文字あたりの速度
    const typeId = setInterval(() => {
      i++;
      setTyped(title.slice(0, i));
      if (i >= title.length) clearInterval(typeId);
    }, typeSpeed);

    const cursorId = setInterval(() => setCursorOn((v) => !v), 500);

    return () => {
      clearInterval(typeId);
      clearInterval(cursorId);
    };
  }, []);

  const featuredWorks = [
    {
      title: 'Tech Startup Blog Series',
      category: 'BLOG',
      description:
        'スタートアップ企業のテクノロジーブログシリーズを執筆。複雑な技術概念を分かりやすく解説し、月間PV数を3倍に向上させました。',
      image:
        'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
      year: '2024',
    },
    {
      title: 'E-commerce Product Copy',
      category: 'COPYWRITING',
      description:
        'ファッションECサイトの商品説明文を制作。購買欲を喚起するコピーライティングにより、コンバージョン率が25%向上しました。',
      image:
        'https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg?auto=compress&cs=tinysrgb&w=800',
      year: '2024',
    },
    {
      title: 'SEO Content Strategy',
      category: 'SEO',
      description:
        'SaaSツールのSEOコンテンツ戦略を策定・執筆。検索順位1位を複数キーワードで獲得し、オーガニック流入を200%向上させました。',
      image:
        'https://images.pexels.com/photos/6476808/pexels-photo-6476808.jpeg?auto=compress&cs=tinysrgb&w=800',
      year: '2024',
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section with Background Slideshow */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0">
          <div
            className={`absolute inset-0 transition-opacity duration-[5000ms] ease-in-out z-0 ${
              !isTransitioning ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={backgroundImages[currentImageIndex]}
              alt={`Background ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                // ローカル画像が無い場合に灰色化を避ける
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          <div
            className={`absolute inset-0 transition-opacity duration-[5000ms] ease-in-out z-0 ${
              isTransitioning ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={backgroundImages[nextImageIndex]}
              alt={`Background ${nextImageIndex + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Content（タイトルはタイプライティング＋Pinyon Script） */}
        <div className="text-center max-w-4xl mx-auto relative z-10 p-12 bg-cream/90 backdrop-blur-sm rounded-2xl">
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-light tracking-wider mb-6 leading-tight text-charcoal logo-font"
            aria-label="Ko-ChilLium"
          >
            {typed}
            <span
              aria-hidden="true"
              className={`inline-block w-[0.5ch] ml-1 align-baseline ${cursorOn ? 'opacity-80' : 'opacity-0'}`}
            >
              |
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-charcoal/70 tracking-wide font-serif">
            Misaki Sato
          </p>
        </div>

        {/* Scroll Indicator → works へスムーズスクロール */}
        <ScrollLink
          to="works"
          smooth
          duration={600}
          offset={-80}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center animate-fade-in relative z-10 cursor-pointer"
        >
          <span className="text-xs text-charcoal/50 tracking-widest mb-2 font-light">SCROLL</span>
          <ChevronDown className="w-4 h-4 text-charcoal/40 animate-bounce" />
        </ScrollLink>
      </section>

      {/* Featured Works */}
      <section id="works" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-4">FEATURED WORKS</h2>
            <p className="text-charcoal/60 text-lg">厳選された執筆実績をご紹介します</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredWorks.map((work, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onClick={() => onNavigate('works')}
              >
                <div className="overflow-hidden rounded-lg mb-4">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs tracking-widest text-charcoal/50 font-medium">
                      {work.category}
                    </span>
                    <span className="text-xs text-charcoal/40">{work.year}</span>
                  </div>
                  <h3 className="text-xl font-medium group-hover:text-charcoal/70 transition-colors">
                    {work.title}
                  </h3>
                  <p className="text-charcoal/60 text-sm leading-relaxed line-clamp-3">
                    {work.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <ScrollLink
              to="works"
              smooth
              duration={600}
              offset={-80}
              className="inline-flex items-center space-x-2 px-8 py-3 border border-charcoal text-charcoal hover:bg-charcoal hover:text-cream transition-all duration-300 tracking-wide cursor-pointer"
            >
              <span>View More</span>
              <ArrowRight className="w-4 h-4" />
            </ScrollLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;