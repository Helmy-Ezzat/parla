import type { Stage, GameState } from '../types';

interface MapProps {
  stages: Stage[];
  gameState: GameState;
  onStageClick: (stageId: string) => void;
}

export default function Map({ stages, gameState, onStageClick }: MapProps) {
  const levelLabels: Record<string, string> = {
    zero: 'مبتدئ · A1',
    basic: 'أساس · A1-A2',
    intermediate: 'متوسط · A2'
  };

  const totalXP = stages.reduce((sum, st) => sum + st.xpReward, 0);
  const progress = Math.min(100, Math.round((gameState.xp / totalXP) * 100));

  const nextStage = stages.find((st, i) => {
    const done = gameState.stageDone[st.id];
    return !done && (i === 0 || gameState.stageDone[stages[i - 1]?.id]);
  }) || stages.find(st => !gameState.stageDone[st.id]) || stages[0];

  const hasProgress = Object.keys(gameState.stageDone || {}).length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-stone-50 px-5 pb-20">
      <div className="max-w-lg mx-auto">
        <div className="py-9 text-center">
          <h1 className="font-cormorant text-3xl font-bold italic text-amber-700 tracking-tight mb-1">
            Parla
          </h1>
          <p className="text-xs text-gray-500 tracking-[2px] uppercase">
            {levelLabels[gameState.level || 'zero']}
          </p>
        </div>

        <div className="bg-stone-100 border border-stone-200 rounded-2xl p-4 mb-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-500 font-medium">تقدمك الكلي</span>
            <span className="font-mono-dm text-xs text-amber-700">{gameState.xp} XP</span>
          </div>
          <div className="h-1 bg-stone-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-700 to-amber-500 rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-stone-100 border-2 border-amber-600/35 rounded-3xl p-5 mb-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent" />
          
          <div className="text-[0.6rem] font-bold tracking-[2.5px] uppercase text-amber-700 mb-2.5">
            {hasProgress ? 'واصل من حيث توقفت' : 'ابدأ رحلتك'}
          </div>
          
          <h3 className="font-cormorant text-2xl font-bold leading-tight mb-1.5">
            {nextStage.emoji} {nextStage.title}
          </h3>
          
          <p className="text-[0.78rem] text-gray-600 leading-relaxed mb-4">
            {nextStage.setting}
          </p>
          
          <div className="flex gap-1.5 flex-wrap mb-4">
            <span className="bg-stone-200 border border-stone-300 rounded-full px-2.5 py-0.5 text-[0.67rem] text-gray-600">
              {nextStage.char.emoji} {nextStage.char.name}
            </span>
            <span className="bg-stone-200 border border-stone-300 rounded-full px-2.5 py-0.5 text-[0.67rem] text-gray-600">
              {nextStage.char.role}
            </span>
            <span className="bg-stone-200 border border-stone-300 rounded-full px-2.5 py-0.5 text-[0.67rem] text-gray-600">
              +{nextStage.xpReward} XP
            </span>
          </div>
          
          <button
            onClick={() => onStageClick(nextStage.id)}
            className="w-full bg-gradient-to-br from-amber-700 to-amber-500 text-white font-bold text-[0.95rem] py-4 px-5 rounded-xl shadow-lg shadow-amber-600/30 hover:shadow-xl hover:shadow-amber-600/40 hover:-translate-y-0.5 active:scale-[0.97] transition-all flex items-center justify-center gap-2"
          >
            <span>▶</span> {hasProgress ? 'واصل التعلم' : 'ابدأ التعلم'}
          </button>
        </div>

        {stages.length > 1 && (
          <div className="text-[0.63rem] font-bold tracking-[2.5px] uppercase text-gray-500 mb-3 pt-1">
            جميع المراحل
          </div>
        )}

        <div className="space-y-3">
          {stages.map((stage, i) => {
            const done = gameState.stageDone[stage.id];
            const isNext = !done && (i === 0 || gameState.stageDone[stages[i - 1]?.id]);
            const locked = !done && !isNext;

            return (
              <button
                key={stage.id}
                onClick={() => !locked && onStageClick(stage.id)}
                disabled={locked}
                className={`w-full bg-stone-100 border rounded-3xl p-5 text-right transition-all relative overflow-hidden ${
                  locked
                    ? 'opacity-45 cursor-not-allowed border-stone-200'
                    : done
                    ? 'border-green-500/20 hover:border-green-500/30 hover:-translate-y-0.5 hover:shadow-lg'
                    : 'border-stone-200 hover:border-amber-600/30 hover:-translate-y-0.5 hover:shadow-lg'
                }`}
              >
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent to-transparent transition-opacity ${
                  done ? 'via-green-500 opacity-100' : !locked ? 'via-amber-600 opacity-0 group-hover:opacity-100' : ''
                }`} />
                
                <div className="flex items-start justify-between mb-2.5">
                  <span className="text-3xl">{stage.emoji}</span>
                  {locked ? (
                    <span className="text-[0.63rem] font-bold tracking-[1.5px] uppercase px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500">
                      🔒 مغلق
                    </span>
                  ) : done ? (
                    <span className="text-[0.63rem] font-bold tracking-[1.5px] uppercase px-2.5 py-0.5 rounded-full bg-green-100 text-green-600">
                      ✓ مكتمل
                    </span>
                  ) : (
                    <span className="text-[0.63rem] font-bold tracking-[1.5px] uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700">
                      ▶ التالي
                    </span>
                  )}
                </div>
                
                <h3 className="font-cormorant text-xl font-bold leading-tight mb-1">
                  {stage.title}
                </h3>
                
                <p className="text-[0.78rem] text-gray-600 leading-relaxed mb-3">
                  {stage.setting}
                </p>
                
                <div className="flex gap-1.5 flex-wrap">
                  <span className="bg-stone-200 border border-stone-300 rounded-full px-2.5 py-0.5 text-[0.67rem] text-gray-600">
                    {stage.char.emoji} {stage.char.name}
                  </span>
                  <span className="bg-stone-200 border border-stone-300 rounded-full px-2.5 py-0.5 text-[0.67rem] text-gray-600">
                    {stage.char.role}
                  </span>
                  <span className="bg-stone-200 border border-stone-300 rounded-full px-2.5 py-0.5 text-[0.67rem] text-gray-600">
                    +{stage.xpReward} XP
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
