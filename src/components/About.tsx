import React from 'react';
import { Award, Users, Target, Heart } from 'lucide-react';

const About = () => {
  const skills = [
    'SEOライティング',
    'コピーライティング',
    'コンテンツ戦略',
    'ブログ執筆',
    'プレスリリース',
    'SNSコンテンツ',
    'メルマガ執筆',
    'ホワイトペーパー'
  ];

  const achievements = [
    { icon: Award, label: '執筆記事数', value: '500+' },
    { icon: Users, label: 'クライアント数', value: '50+' },
    { icon: Target, label: 'SEO1位獲得', value: '100+' },
    { icon: Heart, label: '継続率', value: '95%' }
  ];

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light tracking-wider mb-6">ABOUT</h1>
          <div className="w-24 h-0.5 bg-charcoal mx-auto opacity-50"></div>
        </div>

        <div className="space-y-16">
          {/* Profile Section */}
          <section>
            <h2 className="text-2xl font-light tracking-wide mb-8 flex items-center">
              <span className="w-8 h-0.5 bg-charcoal mr-4"></span>
              PROFILE
            </h2>
            
            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-1">
                <div className="w-full h-80 rounded-lg overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="佐藤美咲のプロフィール写真"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-3 pinyon-script">pinyonScript</h3>
                  <p className="text-charcoal/70 leading-relaxed">
                    フリーランスのウェブライターとして5年間活動。企業のオウンドメディア運営から
                    SEOコンテンツ制作、コピーライティングまで幅広く手がけています。
                    特にBtoB領域での専門性が高く、複雑なビジネス課題を分かりやすく伝える
                    コンテンツ制作を得意としています。
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">経歴</h4>
                  <div className="space-y-2 text-sm text-charcoal/70">
                    <p>2019年 - 大手広告代理店にてコピーライター</p>
                    <p>2021年 - フリーランスとして独立</p>
                    <p>2022年 - SEOコンテンツ専門チーム設立</p>
                    <p>2024年 - 企業向けコンテンツ戦略コンサルティング開始</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Achievements */}
          <section>
            <h2 className="text-2xl font-light tracking-wide mb-8 flex items-center">
              <span className="w-8 h-0.5 bg-charcoal mr-4"></span>
              ACHIEVEMENTS
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div key={index} className="text-center p-6 bg-white/50 rounded-lg">
                    <Icon className="w-8 h-8 mx-auto mb-3 text-charcoal/60" />
                    <div className="text-2xl font-light text-charcoal mb-1">{achievement.value}</div>
                    <div className="text-xs text-charcoal/60 tracking-wide">{achievement.label}</div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-2xl font-light tracking-wide mb-8 flex items-center">
              <span className="w-8 h-0.5 bg-charcoal mr-4"></span>
              SKILLS
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <div 
                  key={index}
                  className="px-4 py-3 bg-white/50 text-center text-sm tracking-wide rounded-lg
                           hover:bg-white/80 transition-colors duration-300"
                >
                  {skill}
                </div>
              ))}
            </div>
          </section>

          {/* Philosophy */}
          <section>
            <h2 className="text-2xl font-light tracking-wide mb-8 flex items-center">
              <span className="w-8 h-0.5 bg-charcoal mr-4"></span>
              WRITING PHILOSOPHY
            </h2>
            
            <div className="bg-white/30 p-8 rounded-lg">
              <blockquote className="text-lg leading-relaxed text-charcoal/80 italic">
                「文章は読者との対話である」という信念のもと、常に読み手の立場に立ったコンテンツ制作を心がけています。
                複雑な情報を分かりやすく伝え、読者の課題解決に貢献することが私の使命です。
                データに基づいた戦略的なアプローチと、人の心に響く表現力を組み合わせることで、
                クライアントのビジネス成長に寄与するコンテンツを生み出しています。
              </blockquote>
              <div className="mt-6 text-right">
                <cite className="text-sm text-charcoal/60 tracking-wide cursive">— pinyonScript</cite>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;