import React from 'react';

const FontTest = () => {
  const fontExamples = [
    {
      name: 'システムフォント（確実）',
      className: 'font-sans',
      css: 'font-family: system-ui, sans-serif',
      reliability: '✅ 100%'
    },
    {
      name: 'Google Fonts（確実）',
      className: 'font-japanese-sans',
      css: 'font-family: "Noto Sans JP", sans-serif',
      reliability: '✅ 99%'
    },
    {
      name: 'Dancing Script（英語のみ）',
      className: 'cursive',
      css: 'font-family: "Dancing Script", cursive',
      reliability: '✅ 99%'
    },
    {
      name: '游ゴシック（Windows/Mac標準）',
      className: '',
      css: 'font-family: "Yu Gothic", "游ゴシック", sans-serif',
      reliability: '⚠️ OS依存',
      style: { fontFamily: '"Yu Gothic", "游ゴシック", sans-serif' }
    },
    {
      name: 'Times New Roman（英語向け）',
      className: '',
      css: 'font-family: "Times New Roman", serif',
      reliability: '✅ 95%',
      style: { fontFamily: '"Times New Roman", serif' }
    },
    {
      name: 'Arial（英語向け）',
      className: '',
      css: 'font-family: "Arial", sans-serif',
      reliability: '✅ 95%',
      style: { fontFamily: '"Arial", sans-serif' }
    },
    {
      name: 'ヒラギノ角ゴ（Mac限定）',
      className: '',
      css: 'font-family: "Hiragino Kaku Gothic Pro", sans-serif',
      reliability: '❌ Mac のみ',
      style: { fontFamily: '"Hiragino Kaku Gothic Pro", sans-serif' }
    },
    {
      name: 'メイリオ（Windows限定）',
      className: '',
      css: 'font-family: "Meiryo", sans-serif',
      reliability: '❌ Windows のみ',
      style: { fontFamily: '"Meiryo", sans-serif' }
    },
    {
      name: '存在しないフォント',
      className: '',
      css: 'font-family: "NonExistentFont", sans-serif',
      reliability: '❌ 表示されない',
      style: { fontFamily: '"NonExistentFont", sans-serif' }
    }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">フォント表示テスト</h1>
      
      <div className="space-y-6">
        {fontExamples.map((example, index) => (
          <div key={index} className="bg-white/50 p-6 rounded-lg border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">{example.name}</h3>
              <span className="text-sm px-3 py-1 bg-gray-100 rounded-full">
                {example.reliability}
              </span>
            </div>
            
            <div className="mb-4">
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                {example.css}
              </code>
            </div>
            
            <div 
              className={`text-2xl p-4 bg-cream rounded border-l-4 border-charcoal ${example.className}`}
              style={example.style}
            >
              <div>Ko-ChilLium コーチルリウム</div>
              <div className="text-lg text-charcoal/70 mt-2">
                Misaki Sato 佐藤美咲
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 p-6 bg-yellow-50 rounded-lg">
        <h3 className="text-lg font-medium mb-3">💡 フォント選択のコツ</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• <strong>Google Fonts</strong>を使えば確実に表示される</li>
          <li>• <strong>フォールバック</strong>を必ず設定する</li>
          <li>• <strong>システムフォント</strong>は軽量で高速</li>
          <li>• <strong>商用フォント</strong>はライセンスに注意</li>
          <li>• <strong>日本語対応</strong>を確認する</li>
        </ul>
      </div>
    </div>
  );
};

export default FontTest;