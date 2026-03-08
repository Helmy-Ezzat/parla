interface SplashProps {
  onStart: () => void;
}

export default function Splash({ onStart }: SplashProps) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial from-amber-600/15 to-transparent pointer-events-none" />
      
      <div className="text-center px-7 py-10 max-w-md w-full animate-[riseIn_0.8s_cubic-bezier(0.22,1,0.36,1)_both]">
        <div className="flex gap-1.5 justify-center mb-7">
          <span className="h-0.5 w-8 rounded-full bg-[#009246]" />
          <span className="h-0.5 w-8 rounded-full bg-stone-100" />
          <span className="h-0.5 w-8 rounded-full bg-[#ce2b37]" />
        </div>

        <h1 className="font-cormorant text-[5.5rem] font-bold italic text-amber-700 leading-none tracking-[-3px] mb-2 drop-shadow-[0_0_80px_rgba(200,151,90,0.2)]">
          Parla
        </h1>

        <p className="text-[0.82rem] text-gray-500 tracking-[3px] uppercase mb-12">
          تكلّم إيطالي · بالذكاء الاصطناعي
        </p>

        <div className="bg-stone-100 border border-stone-200 rounded-2xl p-5 mb-7 text-right">
          <div className="flex items-start gap-3 mb-3.5">
            <span className="text-lg flex-shrink-0 mt-0.5">🎭</span>
            <p className="text-[0.85rem] text-gray-600 leading-relaxed">
              <strong className="text-gray-900 font-semibold">مواقف حقيقية</strong> — مطعم، فندق، شارع، محطة. لا جمل عشوائية.
            </p>
          </div>
          
          <div className="flex items-start gap-3 mb-3.5">
            <span className="text-lg flex-shrink-0 mt-0.5">🧠</span>
            <p className="text-[0.85rem] text-gray-600 leading-relaxed">
              <strong className="text-gray-900 font-semibold">تغذية راجعة فورية</strong> — اعرف على الفور ماذا أصبت وماذا أخطأت.
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="text-lg flex-shrink-0 mt-0.5">⚡</span>
            <p className="text-[0.85rem] text-gray-600 leading-relaxed">
              <strong className="text-gray-900 font-semibold">15 دقيقة يومياً</strong> تكفيك للتكلم في أي موقف.
            </p>
          </div>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-gradient-to-br from-amber-700 to-amber-500 text-white font-semibold text-base py-4 px-6 rounded-xl shadow-lg shadow-amber-600/30 hover:shadow-xl hover:shadow-amber-600/40 hover:-translate-y-0.5 active:scale-[0.97] transition-all flex items-center justify-center gap-2"
        >
          ابدأ رحلتك <span>→</span>
        </button>
      </div>
    </div>
  );
}
