import React, { useState } from 'react';
import { ExternalLink, Calendar, Tag } from 'lucide-react';

/**
 * 実績一覧コンポーネント（アクセシビリティ改善版）
 *
 * 元の `Works.tsx` に以下の変更を加えています。
 * - 画像の `alt` テキストを、記事タイトルに「実績イメージ」という補足を付けたより説明的なものにしました。
 *   これにより、視覚的な内容が伝わりやすくなります。
 * - 年やカテゴリの横に配置されているアイコン（Calendar、Tag）を装飾目的として `aria-hidden="true"` と
 *   `focusable="false"` を追加し、スクリーンリーダーに余計な情報を与えないようにしました。
 */
const Works = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = ['ALL', 'BLOG', 'SEO', 'COPYWRITING', 'CONTENT STRATEGY'];

  const works = [
    {
      title: 'Tech Startup Blog Series',
      category: 'BLOG',
      year: '2024',
      client: 'TechFlow Inc.',
      description:
        'スタートアップ企業のテクノロジーブログシリーズを執筆。AI、ブロックチェーン、IoTなどの最新技術トレンドを分かりやすく解説し、月間PV数を50万から150万に向上させました。',
      image:
        'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Technology', 'B2B', 'Long-form'],
      metrics: 'PV数3倍向上'
    },
    {
      title: 'E-commerce Product Copy',
      category: 'COPYWRITING',
      year: '2024',
      client: 'Fashion Forward',
      description:
        'ファッションECサイトの商品説明文を全面リニューアル。ブランドの世界観を表現しながら購買欲を喚起するコピーライティングを実施し、コンバージョン率を大幅に改善しました。',
      image:
        'https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Fashion', 'E-commerce', 'Conversion'],
      metrics: 'CVR 25%向上'
    },
    {
      title: 'SEO Content Strategy',
      category: 'SEO',
      year: '2024',
      client: 'CloudTools Pro',
      description:
        'SaaSツールのSEOコンテンツ戦略を策定・執筆。競合分析から始まり、検索意図に合わせた記事設計により、複数のビッグキーワードで検索順位1位を獲得しました。',
      image:
        'https://images.pexels.com/photos/6476808/pexels-photo-6476808.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['SaaS', 'SEO', 'Strategy'],
      metrics: 'オーガニック流入200%向上'
    },
    {
      title: 'Healthcare Content Series',
      category: 'CONTENT STRATEGY',
      year: '2023',
      client: 'Medical Insights',
      description:
        '医療従事者向けの専門コンテンツシリーズを企画・執筆。複雑な医療情報を正確かつ分かりやすく伝え、業界内での信頼性とブランド認知度を向上させました。',
      image:
        'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Healthcare', 'B2B', 'Expert'],
      metrics: '専門家からの引用増加'
    },
    {
      title: 'Lifestyle Brand Storytelling',
      category: 'BLOG',
      year: '2023',
      client: 'Minimalist Living',
      description:
        'ライフスタイルブランドのストーリーテリングコンテンツを制作。ブランドの価値観とユーザーの感情を結びつける記事により、エンゲージメント率を劇的に向上させました。',
      image:
        'https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Lifestyle', 'Storytelling', 'Brand'],
      metrics: 'エンゲージメント率180%向上'
    },
    {
      title: 'B2B Lead Generation Content',
      category: 'CONTENT STRATEGY',
      year: '2023',
      client: 'Enterprise Solutions',
      description:
        'B2B企業のリードジェネレーションを目的としたコンテンツマーケティング戦略を実施。ホワイトペーパーやケーススタディの制作により、質の高いリードを獲得しました。',
      image:
        'https://images.pexels.com/photos/7688115/pexels-photo-7688115.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['B2B', 'Lead Gen', 'Whitepaper'],
      metrics: 'リード獲得数150%向上'
    }
  ];

  const filteredWorks = activeCategory === 'ALL' ? works : works.filter((work) => work.category === activeCategory);

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light tracking-wider mb-6">WORKS</h1>
          <p className="text-charcoal/70 text-lg max-w-2xl mx-auto leading-relaxed">
            様々な業界・ジャンルでの執筆実績をご紹介します。それぞれのプロジェクトで異なる課題に対し、戦略的なアプローチでコンテンツを制作しています。
          </p>
        </div>
        {/* カテゴリフィルター */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 text-sm tracking-wide transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-charcoal text-cream'
                  : 'border border-charcoal/20 text-charcoal hover:border-charcoal/40'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        {/* 実績グリッド */}
        <div className="grid md:grid-cols-2 gap-12">
          {filteredWorks.map((work, index) => (
            <article key={index} className="group cursor-pointer">
              <div className="overflow-hidden rounded-lg mb-6">
                <img
                  src={work.image}
                  alt={`${work.title} の実績イメージ`}
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-charcoal/60">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" aria-hidden="true" focusable="false" />
                      <span>{work.year}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Tag className="w-4 h-4" aria-hidden="true" focusable="false" />
                      <span>{work.category}</span>
                    </span>
                  </div>
                  <span className="text-xs font-medium text-green-600">{work.metrics}</span>
                </div>
                <h3 className="text-2xl font-medium group-hover:text-charcoal/70 transition-colors">
                  {work.title}
                </h3>
                <p className="text-charcoal/60 text-sm tracking-wide">Client: {work.client}</p>
                <p className="text-charcoal/80 leading-relaxed">{work.description}</p>
                <div className="flex flex-wrap gap-2">
                  {work.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-charcoal/5 text-charcoal/60 text-xs tracking-wide rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Works;