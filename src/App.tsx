import { useState, useEffect } from 'react';
import Splash from './components/Splash';
import LevelSelect from './components/LevelSelect';
import Map from './components/Map';
import Conversation from './components/Conversation';
import SessionDone from './components/SessionDone';
import type { GameState, Stage } from './types';
import { BEGINNER_STAGES, MAIN_STAGES } from './data/stages';

const STORE_KEY = 'parla_v1';

function App() {
  const [screen, setScreen] = useState<'splash' | 'level' | 'map' | 'convo' | 'done'>('splash');
  const [gameState, setGameState] = useState<GameState>({
    level: null,
    xp: 0,
    stageDone: {}
  });
  const [currentStage, setCurrentStage] = useState<Stage | null>(null);
  const [sessionResults, setSessionResults] = useState<{
    xp: number;
    correct: number;
    total: number;
    vocab: string[];
  } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORE_KEY);
    if (saved) {
      const state = JSON.parse(saved);
      setGameState(state);
      
      if (state.level) {
        setScreen('map');
      } else {
        const seen = localStorage.getItem('parla_seen');
        setScreen(seen ? 'level' : 'splash');
      }
    }
  }, []);

  const saveState = (newState: GameState) => {
    setGameState(newState);
    localStorage.setItem(STORE_KEY, JSON.stringify(newState));
  };

  const handleStartJourney = () => {
    localStorage.setItem('parla_seen', '1');
    setScreen('level');
  };

  const handleLevelSelect = (level: string) => {
    const newState = { ...gameState, level };
    saveState(newState);
    setScreen('map');
  };

  const handleStageClick = (stageId: string) => {
    const stages = gameState.level === 'zero' ? BEGINNER_STAGES : MAIN_STAGES;
    const stage = stages.find(s => s.id === stageId);
    if (stage) {
      setCurrentStage(stage);
      setScreen('convo');
    }
  };

  const handleConversationComplete = (xp: number, correct: number, total: number, vocab: string[]) => {
    setSessionResults({ xp, correct, total, vocab });
    
    if (currentStage) {
      const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
      const bonus = percentage >= 80 ? 30 : percentage >= 60 ? 15 : 0;
      const totalXp = xp + bonus;
      
      const newState = {
        ...gameState,
        xp: gameState.xp + totalXp,
        stageDone: {
          ...gameState.stageDone,
          [currentStage.id]: true
        }
      };
      saveState(newState);
    }
    
    setScreen('done');
  };

  const handleBackToMap = () => {
    setCurrentStage(null);
    setSessionResults(null);
    setScreen('map');
  };

  const handleReplay = () => {
    setSessionResults(null);
    setScreen('convo');
  };

  const stages = gameState.level === 'zero' ? BEGINNER_STAGES : MAIN_STAGES;

  return (
    <>
      {screen === 'splash' && <Splash onStart={handleStartJourney} />}
      {screen === 'level' && <LevelSelect onSelect={handleLevelSelect} />}
      {screen === 'map' && (
        <Map
          stages={stages}
          gameState={gameState}
          onStageClick={handleStageClick}
        />
      )}
      {screen === 'convo' && currentStage && (
        <Conversation
          stage={currentStage}
          onComplete={handleConversationComplete}
          onBack={handleBackToMap}
        />
      )}
      {screen === 'done' && currentStage && sessionResults && (
        <SessionDone
          stage={currentStage}
          xp={sessionResults.xp}
          correct={sessionResults.correct}
          total={sessionResults.total}
          vocab={sessionResults.vocab}
          onBackToMap={handleBackToMap}
          onReplay={handleReplay}
        />
      )}
    </>
  );
}

export default App;
