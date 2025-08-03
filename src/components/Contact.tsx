import React, { useState } from 'react';
import { Mail, Twitter, Linkedin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light tracking-wider mb-6">CONTACT</h1>
          <p className="text-charcoal/60 text-lg max-w-2xl mx-auto leading-relaxed">
            お仕事のご相談、お見積りのご依頼など、お気軽にお問い合わせください。
            通常24時間以内にご返信いたします。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-light tracking-wide mb-8 flex items-center">
              <span className="w-8 h-0.5 bg-charcoal mr-4"></span>
              お問い合わせフォーム
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-charcoal/70 mb-2 tracking-wide">
                    お名前 *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/50 border border-charcoal/10 rounded-lg
                             focus:outline-none focus:border-charcoal/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-charcoal/70 mb-2 tracking-wide">
                    会社名
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/50 border border-charcoal/10 rounded-lg
                             focus:outline-none focus:border-charcoal/30 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-charcoal/70 mb-2 tracking-wide">
                  メールアドレス *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/50 border border-charcoal/10 rounded-lg
                           focus:outline-none focus:border-charcoal/30 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-charcoal/70 mb-2 tracking-wide">
                    プロジェクトタイプ
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/50 border border-charcoal/10 rounded-lg
                             focus:outline-none focus:border-charcoal/30 transition-colors"
                  >
                    <option value="">選択してください</option>
                    <option value="blog">ブログ記事</option>
                    <option value="seo">SEO記事</option>
                    <option value="copy">コピーライティング</option>
                    <option value="strategy">コンテンツ戦略</option>
                    <option value="other">その他</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-charcoal/70 mb-2 tracking-wide">
                    ご予算
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/50 border border-charcoal/10 rounded-lg
                             focus:outline-none focus:border-charcoal/30 transition-colors"
                  >
                    <option value="">選択してください</option>
                    <option value="50k">〜5万円</option>
                    <option value="100k">5万円〜10万円</option>
                    <option value="300k">10万円〜30万円</option>
                    <option value="500k">30万円〜50万円</option>
                    <option value="more">50万円以上</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-charcoal/70 mb-2 tracking-wide">
                  メッセージ *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white/50 border border-charcoal/10 rounded-lg
                           focus:outline-none focus:border-charcoal/30 transition-colors resize-none"
                  placeholder="プロジェクトの詳細、希望納期、その他ご要望などをお聞かせください"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-charcoal text-cream py-4 rounded-lg
                         hover:bg-charcoal/90 transition-colors duration-300
                         flex items-center justify-center space-x-2 tracking-wide"
              >
                <Send className="w-4 h-4" />
                <span>送信する</span>
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-light tracking-wide mb-8 flex items-center">
              <span className="w-8 h-0.5 bg-charcoal mr-4"></span>
              お気軽にご連絡ください
            </h2>

            <div className="space-y-8">
              <div>
                <p className="text-charcoal/70 leading-relaxed mb-6">
                  企業のオウンドメディア運営、SEOコンテンツ制作、コピーライティングなど、
                  幅広いライティング業務に対応いたします。まずはお気軽にご相談ください。
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-charcoal/70">
                    <Mail className="w-5 h-5" />
                    <span>hello@kochillium.writer</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-4">SNS</h3>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-white/50 rounded-lg flex items-center justify-center
                             hover:bg-white/80 transition-colors duration-300 group"
                  >
                    <Twitter className="w-5 h-5 text-charcoal/60 group-hover:text-charcoal" />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-white/50 rounded-lg flex items-center justify-center
                             hover:bg-white/80 transition-colors duration-300 group"
                  >
                    <Linkedin className="w-5 h-5 text-charcoal/60 group-hover:text-charcoal" />
                  </a>
                </div>
              </div>

              <div className="bg-white/30 p-6 rounded-lg">
                <h3 className="font-medium mb-3">対応可能な業務</h3>
                <ul className="space-y-2 text-sm text-charcoal/70">
                  <li>• ブログ記事・コラム執筆</li>
                  <li>• SEO記事制作</li>
                  <li>• コピーライティング</li>
                  <li>• プレスリリース</li>
                  <li>• メルマガ・SNSコンテンツ</li>
                  <li>• コンテンツ戦略立案</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;