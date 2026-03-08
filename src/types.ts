export interface Choice {
  it: string;
  ar: string;
  correct: boolean;
}

export interface UnderstandStep {
  type: 'understand';
  speaker: string;
  speakerEmoji: string;
  text: string;
  textAr: string;
  image?: string;
}

export interface RecognitionStep {
  type: 'recognition';
  audio: string;
  audioAr: string;
  choices: Choice[];
  teach: string;
}

export interface ProductionStep {
  type: 'production';
  prompt: string;
  promptAr: string;
  expectedAnswer: string;
  expectedAnswerAr: string;
  acceptedVariations?: string[];
  teach: string;
}

export type Step = UnderstandStep | RecognitionStep | ProductionStep;

export interface Character {
  name: string;
  role: string;
  emoji: string;
}

export interface Stage {
  id: string;
  emoji: string;
  title: string;
  setting: string;
  mission: string;
  char: Character;
  xpReward: number;
  steps: Step[];
}

export interface GameState {
  level: string | null;
  xp: number;
  stageDone: Record<string, boolean>;
}

export interface SessionState {
  stage: Stage | null;
  stepIdx: number;
  xp: number;
  correct: number;
  total: number;
  vocab: string[];
}
