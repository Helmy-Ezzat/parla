import { useEffect, useState } from 'react';
import type { Stage } from '../types';

interface SessionDoneProps {
  stage: Stage;
  xp: number;
  correct: number;
  total: number;
  vocab: string[];
  onBackToMap: () => void;
  onReplay: () => void;
}

export default function SessionDone({
  stage,
  xp,
  correct,
  total,
  vocab,
  onBackToMap,
  onReplay
}: SessionDoneProps) {
  const [showBars, setShowBars] = useState(false);
  
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const bonus = percentage >= 80 ? 30 : percentage >= 60 ? 15 : 0;
  const totalXp = xp + bonus;
  
  const emoji = percentage >= 80 ? '🏆' : percentage >= 60 ? '💪' : '🌱';
  const title = percentage >= 80 ? 'ممتاز!' : percentage >= 60 ? 'جيد جداً!' : 'تمرّن أكثر!';

  useEffect(() => {
    setTimeout(() => setShowBars(true), 300);
  }, []);

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white border border-stone-200 rounded-3xl p-8 text-center shadow-lg animate-[riseIn_0.4s_ease_both]">
        <span className="text-6xl block mb-4">{emoji}</span>
        
        <h2 className="font-cormorant text-4xl font-bold mb-2">{title}</h2>
        
        <p className="text-[0.84rem] text-gray-600 mb-5 leading-relaxed">
          {stage.emoji} {stage.title}
          <br />
          <span className="text-gray-500">مع {stage.char.name}</span>
        </p>
        
        <div className="font-mono-dm text-xl text-amber-700 bg-amber-50 border border-amber-200 px-6 py-2 rounded-full inline-block mb-5">
          +{totalXp} XP {bonus > 0 && '🎁'}
        </div>

        {/* Score Bars */}
        <div className="mb-5 space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-[0.73rem] text-gray-600 w-20 text-right flex-shrink-0">الدقة</span>
            <div className="flex-1 h-1.5 bg-stone-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  percentage >= 70 ? 'bg-green-500' : 'bg-amber-600'
                }`}
                style={{ width: showBars ? `${percentage}%` : '0%' }}
              />
            </div>
            <span className="font-mono-dm text-xs text-gray-600 w-10 text-left flex-shrink-0">
              {percentage}%
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-[0.73rem] text-gray-600 w-20 text-right flex-shrink-0">XP المكتسب</span>
            <div className="flex-1 h-1.5 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-600 rounded-full transition-all duration-1000"
                style={{ width: showBars ? `${Math.min(100, totalXp)}%` : '0%' }}
              />
            </div>
            <span className="font-mono-dm text-xs text-gray-600 w-10 text-left flex-shrink-0">
              {totalXp}
            </span>
          </div>
        </div>

        {/* Vocabulary Learned */}
        {vocab.length > 0 && (
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 mb-5 text-right">
            <div className="text-[0.63rem] font-bold tracking-[2px] uppercase text-gray-500 mb-2.5">
              جمل تعلّمتها اليوم
            </div>
            <div className="flex flex-wrap gap-2">
              {vocab.map((word, idx) => (
                <span
                  key={idx}
                  className="bg-white border border-stone-300 rounded-lg px-3 py-1 font-cormorant text-[0.88rem] text-amber-700"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={onBackToMap}
            className="w-full bg-gradient-to-br from-amber-700 to-amber-500 text-white font-semibold text-base py-4 px-6 rounded-xl shadow-lg shadow-amber-600/30 hover:shadow-xl hover:shadow-amber-600/40 hover:-translate-y-0.5 active:scale-[0.97] transition-all flex items-center justify-center gap-2"
          >
            العودة للخريطة <span>→</span>
          </button>
          
          <button
            onClick={onReplay}
            className="w-full bg-white border-2 border-stone-300 text-gray-700 font-semibold text-[0.9rem] py-3 px-5 rounded-xl hover:border-amber-600 hover:text-amber-700 active:scale-[0.97] transition-all flex items-center justify-center gap-2"
          >
            🔁 أعِد المرحلة
          </button>
        </div>
      </div>
    </div>
  );
}
