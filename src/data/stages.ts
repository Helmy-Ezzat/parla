import type { Stage } from '../types';

export const BEGINNER_STAGES: Stage[] = [
  {
    id: 'b1',
    emoji: '👋',
    title: 'التحية الأولى',
    setting: 'أنت في شارع إيطالي. شخص ودود يمر ويبتسم لك.',
    mission: 'تعلّم كيف تحيّي في أوقات مختلفة وكيف تودّع.',
    char: {
      name: 'Marco',
      role: 'جار إيطالي ودود',
      emoji: '👨'
    },
    xpReward: 50,
    steps: [
      {
        npc: 'Buongiorno!',
        npc_ar: 'صباح الخير!',
        hint: 'ردّ بنفس تحية الصباح',
        choices: [
          { it: 'Buongiorno!', ar: 'صباح الخير!', correct: true },
          { it: 'Buonasera!', ar: 'مساء الخير!', correct: false },
          { it: 'Buonanotte!', ar: 'تصبح على خير!', correct: false }
        ],
        teach: 'Buongiorno = صباح الخير. تُستخدم من الصباح حتى الغداء تقريباً.'
      },
      {
        npc: 'Come stai?',
        npc_ar: 'كيف حالك؟',
        hint: 'قل إنك بخير وشكراً',
        choices: [
          { it: 'Bene, grazie!', ar: 'بخير، شكراً!', correct: true },
          { it: 'Male.', ar: 'بشكل سيء.', correct: false },
          { it: 'Non lo so.', ar: 'لا أعرف.', correct: false }
        ],
        teach: 'Bene = بخير. Grazie = شكراً. معاً: الرد الأكثر شيوعاً في إيطاليا.'
      },
      {
        npc: 'Buonasera!',
        npc_ar: 'مساء الخير!',
        hint: 'ردّ بتحية المساء',
        choices: [
          { it: 'Buonasera!', ar: 'مساء الخير!', correct: true },
          { it: 'Buongiorno!', ar: 'صباح الخير! (وقت خاطئ)', correct: false },
          { it: 'Ciao!', ar: 'باي! (غير رسمي)', correct: false }
        ],
        teach: 'Buonasera = مساء الخير. تُستخدم من بعد الغداء حتى الليل.'
      },
      {
        npc: 'Arrivederci!',
        npc_ar: 'مع السلامة!',
        hint: 'ودّعه بنفس الطريقة',
        choices: [
          { it: 'Arrivederci!', ar: 'مع السلامة!', correct: true },
          { it: 'Buongiorno!', ar: 'صباح الخير!', correct: false },
          { it: 'Grazie!', ar: 'شكراً!', correct: false }
        ],
        teach: 'Arrivederci = مع السلامة (رسمي). Ciao = باي (غير رسمي مع الأصدقاء فقط).'
      }
    ]
  },
  {
    id: 'b2',
    emoji: '🙏',
    title: 'شكراً وعفواً',
    setting: 'في محل صغير. البائع يعطيك كيس التسوق.',
    mission: 'تعلّم كلمات الشكر والاعتذار الأساسية.',
    char: {
      name: 'Anna',
      role: 'صاحبة محل',
      emoji: '👩'
    },
    xpReward: 50,
    steps: [
      {
        npc: 'Prego, ecco la borsa.',
        npc_ar: 'تفضل، هذا الكيس.',
        hint: 'اشكرها',
        choices: [
          { it: 'Grazie!', ar: 'شكراً!', correct: true },
          { it: 'Arrivederci!', ar: 'مع السلامة!', correct: false },
          { it: 'Buongiorno!', ar: 'صباح الخير!', correct: false }
        ],
        teach: 'Grazie = شكراً. الكلمة الأكثر استخداماً في إيطاليا!'
      },
      {
        npc: 'Prego!',
        npc_ar: 'عفواً / على الرحب!',
        hint: 'قل لها ألف شكر',
        choices: [
          { it: 'Grazie mille!', ar: 'ألف شكر!', correct: true },
          { it: 'No grazie.', ar: 'لا شكراً.', correct: false },
          { it: 'Scusa.', ar: 'آسف.', correct: false }
        ],
        teach: 'Grazie mille = ألف شكر. Prego = عفواً / تفضل — رد على الشكر.'
      }
    ]
  }
];

export const MAIN_STAGES: Stage[] = [
  {
    id: 's1',
    emoji: '✈️',
    title: 'المطار — أول دقيقة',
    setting: 'وصلت للتو لمطار روما فيوميتشينو. ساعة متأخرة. تاكسي ينتظر بالخارج.',
    mission: 'تحيّ، اسأل عن التاكسي والسعر، اشكر وودّع.',
    char: {
      name: 'Paolo',
      role: 'مسافر إيطالي · متحدث سريع',
      emoji: '👨‍💼'
    },
    xpReward: 80,
    steps: [
      {
        npc: 'Buongiorno! Benvenuto a Roma!',
        npc_ar: 'صباح الخير! مرحباً بك في روما!',
        hint: 'ردّ عليه بتحية الصباح',
        choices: [
          { it: 'Buongiorno! Grazie!', ar: 'صباح الخير! شكراً!', correct: true },
          { it: 'Buonanotte!', ar: 'تصبح على خير!', correct: false },
          { it: 'Arrivederci!', ar: 'مع السلامة!', correct: false }
        ],
        teach: 'Buongiorno = صباح الخير (حتى الغداء). Buonanotte = تصبح على خير (النوم فقط).'
      },
      {
        npc: 'Stai bene? Hai bisogno di aiuto?',
        npc_ar: 'هل أنت بخير؟ هل تحتاج مساعدة؟',
        hint: 'قل إنك تحتاج مساعدة للتاكسي',
        choices: [
          { it: "Sì, grazie! Dov'è il taxi?", ar: 'نعم، شكراً! أين التاكسي؟', correct: true },
          { it: 'No, sto bene.', ar: 'لا، أنا بخير.', correct: false },
          { it: 'Non capisco.', ar: 'لا أفهم.', correct: false }
        ],
        teach: "Dov'è? = أين هو؟ — السؤال الأساسي للاستفسار عن المكان."
      },
      {
        npc: "Il taxi è fuori, all'uscita principale.",
        npc_ar: 'التاكسي بالخارج عند المخرج الرئيسي.',
        hint: 'اشكره بحرارة',
        choices: [
          { it: 'Grazie mille! Sei molto gentile!', ar: 'ألف شكر! أنت لطيف جداً!', correct: true },
          { it: 'Va bene.', ar: 'حسناً.', correct: false },
          { it: 'Arrivederci!', ar: 'مع السلامة!', correct: false }
        ],
        teach: 'Sei molto gentile = أنت لطيف جداً — جملة تُقدَّر كثيراً.'
      }
    ]
  },
  {
    id: 's2',
    emoji: '☕',
    title: 'المقهى — الطلب السريع',
    setting: 'صباح روما. المقهى مزدحم. زبائن خلفك ينتظرون.',
    mission: 'اطلب بسرعة وبإيطالية طبيعية. لا وقت للتردد!',
    char: {
      name: 'Luca',
      role: 'نادل المقهى · سريع',
      emoji: '👨‍🍳'
    },
    xpReward: 90,
    steps: [
      {
        npc: 'Prego! Cosa prende?',
        npc_ar: 'تفضل! ماذا ستأخذ؟',
        hint: 'اطلب قهوة وكرواسان',
        choices: [
          { it: 'Un caffè e un cornetto, per favore!', ar: 'قهوة وكرواسان من فضلك!', correct: true },
          { it: 'Non so ancora.', ar: 'لا أعرف بعد.', correct: false },
          { it: 'Un momento.', ar: 'لحظة.', correct: false }
        ],
        teach: 'Cornetto = الكرواسان الإيطالي. Un caffè = قهوة اسبريسو.'
      },
      {
        npc: 'Ecco! Tre euro e cinquanta.',
        npc_ar: 'تفضل! ثلاثة يورو وخمسون سنتاً.',
        hint: 'ادفع وأبدِ رأيك بالقهوة',
        choices: [
          { it: 'Eccoli! Il caffè è ottimo!', ar: 'تفضل! القهوة رائعة!', correct: true },
          { it: 'È caro.', ar: 'إنه غالٍ.', correct: false },
          { it: 'Ok.', ar: 'حسناً.', correct: false }
        ],
        teach: 'Ottimo = رائع/ممتاز. Eccoli = تفضل (للمال).'
      }
    ]
  }
];
