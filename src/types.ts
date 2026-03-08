export interface Choice {
  it: string;
  ar: string;
  correct: boolean;
}

export interface Step {
  npc: string;
  npc_ar: string;
  hint: string;
  choices: Choice[];
  teach: string;
}

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
