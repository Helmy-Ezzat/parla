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
      // المرحلة 1: الفهم (Understand) - 5 جمل
      {
        type: 'understand',
        speaker: 'Marco',
        speakerEmoji: '👨',
        text: 'Buongiorno!',
        textAr: 'صباح الخير!',
        emoji: '☀️'
      },
      {
        type: 'understand',
        speaker: 'أنت',
        speakerEmoji: '🙋',
        text: 'Buongiorno!',
        textAr: 'صباح الخير!',
        emoji: '👋'
      },
      {
        type: 'understand',
        speaker: 'Marco',
        speakerEmoji: '👨',
        text: 'Come stai?',
        textAr: 'كيف حالك؟',
        emoji: '🤔'
      },
      {
        type: 'understand',
        speaker: 'أنت',
        speakerEmoji: '🙋',
        text: 'Bene, grazie!',
        textAr: 'بخير، شكراً!',
        emoji: '😊'
      },
      {
        type: 'understand',
        speaker: 'Marco',
        speakerEmoji: '👨',
        text: 'Arrivederci!',
        textAr: 'مع السلامة!',
        emoji: '👋'
      },
      
      // المرحلة 2: الاختيار (Recognition)
      {
        type: 'recognition',
        audio: 'Come stai?',
        audioAr: 'كيف حالك؟',
        choices: [
          { it: 'Bene, grazie!', ar: 'بخير، شكراً!', correct: true },
          { it: 'Buongiorno!', ar: 'صباح الخير!', correct: false },
          { it: 'Arrivederci!', ar: 'مع السلامة!', correct: false }
        ],
        teach: 'Bene = بخير. Grazie = شكراً. الرد الأكثر شيوعاً في إيطاليا.'
      },
      {
        type: 'recognition',
        audio: 'Buonasera!',
        audioAr: 'مساء الخير!',
        choices: [
          { it: 'Buonasera!', ar: 'مساء الخير!', correct: true },
          { it: 'Buongiorno!', ar: 'صباح الخير!', correct: false },
          { it: 'Ciao!', ar: 'باي!', correct: false }
        ],
        teach: 'Buonasera = مساء الخير. تُستخدم من بعد الغداء حتى الليل.'
      },
      
      // المرحلة 3: المحادثة (Production)
      {
        type: 'production',
        prompt: 'Buongiorno!',
        promptAr: 'صباح الخير!',
        expectedAnswer: 'Buongiorno!',
        expectedAnswerAr: 'صباح الخير!',
        acceptedVariations: ['buongiorno', 'Buongiorno', 'BUONGIORNO'],
        teach: 'Buongiorno = صباح الخير. تُستخدم من الصباح حتى الغداء.'
      },
      {
        type: 'production',
        prompt: 'Come stai?',
        promptAr: 'كيف حالك؟',
        expectedAnswer: 'Bene, grazie!',
        expectedAnswerAr: 'بخير، شكراً!',
        acceptedVariations: ['bene grazie', 'Bene, grazie', 'bene, grazie!', 'Bene grazie'],
        teach: 'Bene, grazie = بخير، شكراً. الرد الأكثر شيوعاً.'
      },
      {
        type: 'production',
        prompt: 'Arrivederci!',
        promptAr: 'مع السلامة!',
        expectedAnswer: 'Arrivederci!',
        expectedAnswerAr: 'مع السلامة!',
        acceptedVariations: ['arrivederci', 'Arrivederci', 'ARRIVEDERCI'],
        teach: 'Arrivederci = مع السلامة (رسمي). Ciao = باي (غير رسمي).'
      }
    ]
  },
  {
    id: 'b2',
    emoji: '☕',
    title: 'في المقهى',
    setting: 'صباح في مقهى إيطالي. تريد طلب قهوة.',
    mission: 'تعلّم كيف تطلب في المقهى.',
    char: {
      name: 'Luca',
      role: 'نادل المقهى',
      emoji: '👨‍🍳'
    },
    xpReward: 50,
    steps: [
      // الفهم
      {
        type: 'understand',
        speaker: 'Luca',
        speakerEmoji: '👨‍🍳',
        text: 'Buongiorno! Cosa desidera?',
        textAr: 'صباح الخير! ماذا تريد؟',
        emoji: '☕'
      },
      {
        type: 'understand',
        speaker: 'أنت',
        speakerEmoji: '🙋',
        text: 'Vorrei un caffè, per favore.',
        textAr: 'أريد قهوة، من فضلك.',
        emoji: '☕'
      },
      {
        type: 'understand',
        speaker: 'Luca',
        speakerEmoji: '👨‍🍳',
        text: 'Subito!',
        textAr: 'حالاً!',
        emoji: '⚡'
      },
      {
        type: 'understand',
        speaker: 'Luca',
        speakerEmoji: '👨‍🍳',
        text: 'Ecco il caffè. Tre euro.',
        textAr: 'تفضل القهوة. ثلاثة يورو.',
        emoji: '💶'
      },
      {
        type: 'understand',
        speaker: 'أنت',
        speakerEmoji: '🙋',
        text: 'Grazie!',
        textAr: 'شكراً!',
        emoji: '🙏'
      },
      
      // الاختيار
      {
        type: 'recognition',
        audio: 'Cosa desidera?',
        audioAr: 'ماذا تريد؟',
        choices: [
          { it: 'Vorrei un caffè', ar: 'أريد قهوة', correct: true },
          { it: 'Buongiorno', ar: 'صباح الخير', correct: false },
          { it: 'Arrivederci', ar: 'مع السلامة', correct: false }
        ],
        teach: 'Vorrei = أريد (مهذب). Cosa desidera? = ماذا تريد؟'
      },
      
      // المحادثة
      {
        type: 'production',
        prompt: 'Cosa desidera?',
        promptAr: 'ماذا تريد؟',
        expectedAnswer: 'Vorrei un caffè',
        expectedAnswerAr: 'أريد قهوة',
        acceptedVariations: ['vorrei un caffe', 'Vorrei un caffè', 'vorrei un caffè'],
        teach: 'Vorrei un caffè = أريد قهوة. Vorrei أكثر أدباً من voglio.'
      },
      {
        type: 'production',
        prompt: 'Ecco il caffè.',
        promptAr: 'تفضل القهوة.',
        expectedAnswer: 'Grazie!',
        expectedAnswerAr: 'شكراً!',
        acceptedVariations: ['grazie', 'Grazie', 'GRAZIE', 'grazie!'],
        teach: 'Grazie = شكراً. الكلمة الأكثر استخداماً في إيطاليا!'
      }
    ]
  }
];

export const MAIN_STAGES: Stage[] = BEGINNER_STAGES;
