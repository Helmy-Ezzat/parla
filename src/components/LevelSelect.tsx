import { useState } from 'react';

interface LevelSelectProps {
  onSelect: (level: string) => void;
}

export default function LevelSelect({ onSelect }: LevelSelectProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const levels = [
    {
      id: 'zero',
      icon: '🆕',
      title: 'مبتدئ تماماً',
      desc: 'ما سمعت إيطالية في حياتي. سنبدأ من الصفر.'
    },
    {
      id: 'basic',
      icon: '📖',
      title: 'عندي أساس بسيط',
      desc: 'أعرف بعض الكلمات. أريد تطوير المحادثة.'
    },
    {
      id: 'intermediate',
      icon: '💬',
      title: 'متوسط',
      desc: 'أستطيع التحدث. أريد الطلاقة والثقة.'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="max-w-md w-full py-8 animate-[riseIn_0.5s_ease_both]">
        <h2 className="font-cormorant text-4xl font-bold mb-1.5 leading-tight">
          ما مستواك في<br />
          <em className="text-amber-700 italic">الإيطالية؟</em>
        </h2>
        
        <p className="text-[0.85rem] text-gray-500 mb-8 leading-relaxed">
          سنبني رحلتك بناءً على مستواك الحقيقي.
        </p>

        <div className="space-y-2.5">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => setSelected(level.id)}
              className={`w-full bg-stone-100 border-2 rounded-2xl p-5 flex items-center gap-4 text-right transition-all hover:border-amber-600 hover:bg-amber-50 ${
                selected === level.id ? 'border-amber-600 bg-amber-50' : 'border-stone-200'
              }`}
            >
              <span className="text-3xl flex-shrink-0">{level.icon}</span>
              <div>
                <div className="font-bold text-[0.97rem] mb-0.5">{level.title}</div>
                <div className="text-[0.77rem] text-gray-500 leading-snug">{level.desc}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6">
          <button
            onClick={() => selected && onSelect(selected)}
            disabled={!selected}
            className={`w-full bg-gradient-to-br from-amber-700 to-amber-500 text-white font-semibold text-base py-4 px-6 rounded-xl shadow-lg shadow-amber-600/30 transition-all flex items-center justify-center gap-2 ${
              selected
                ? 'hover:shadow-xl hover:shadow-amber-600/40 hover:-translate-y-0.5 active:scale-[0.97]'
                : 'opacity-40 cursor-not-allowed'
            }`}
          >
            استمر <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
