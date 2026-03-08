import { useState, useEffect, useRef } from 'react';
import type { Stage, SessionState, Step, UnderstandStep, RecognitionStep, ProductionStep } from '../types';

interface ConversationProps {
  stage: Stage;
  onComplete: (xp: number, correct: number, total: number, vocab: string[]) => void;
  onBack: () => void;
}

export default function Conversation({ stage, onComplete, onBack }: ConversationProps) {
  const [session, setSession] = useState<SessionState>({
    stage,
    stepIdx: 0,
    xp: 0,
    correct: 0,
    total: 0,
    vocab: []
  });
  
  const [currentPhase, setCurrentPhase] = useState<'understand' | 'recognition' | 'production'>('understand');
  const [understandMessages, setUnderstandMessages] = useState<UnderstandStep[]>([]);
  const [showContinue, setShowContinue] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState<{ correct: boolean; teach: string } | null>(null);
  
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    startCurrentStep();
  }, [session.stepIdx]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [understandMessages, currentPhase]);

  const startCurrentStep = () => {
    if (session.stepIdx >= stage.steps.length) {
      onComplete(session.xp, session.correct, session.total, session.vocab);
      return;
    }

    const step = stage.steps[session.stepIdx];
    
    if (step.type === 'understand') {
      setCurrentPhase('understand');
      setUnderstandMessages(prev => [...prev, step]);
      speak(step.text);
      
      // Check if next step is also understand
      const nextStep = stage.steps[session.stepIdx + 1];
      if (nextStep?.type === 'understand') {
        setTimeout(() => {
          setSession(s => ({ ...s, stepIdx: s.stepIdx + 1 }));
        }, 2000);
      } else {
        setTimeout(() => {
          setShowContinue(true);
        }, 1500);
      }
    } else if (step.type === 'recognition') {
      setCurrentPhase('recognition');
      setSelectedChoice(null);
      setFeedback(null);
      speak(step.audio);
    } else if (step.type === 'production') {
      setCurrentPhase('production');
      setInputValue('');
      setFeedback(null);
      speak(step.prompt);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    }
  };

  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'it-IT';
    utterance.rate = 0.85;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  };

  const handleContinue = () => {
    setShowContinue(false);
    setSession(s => ({ ...s, stepIdx: s.stepIdx + 1 }));
  };

  const handleRecognitionChoice = (choiceIdx: number) => {
    if (selectedChoice !== null) return;
    
    const step = stage.steps[session.stepIdx] as RecognitionStep;
    const choice = step.choices[choiceIdx];
    
    setSelectedChoice(choiceIdx);
    
    const newTotal = session.total + 1;
    let newCorrect = session.correct;
    let newXp = session.xp;
    let newVocab = [...session.vocab];

    if (choice.correct) {
      newCorrect++;
      newXp += 10;
      newVocab.push(choice.it);
    } else {
      newXp += 2;
    }

    setFeedback({ correct: choice.correct, teach: step.teach });
    setSession({
      ...session,
      xp: newXp,
      correct: newCorrect,
      total: newTotal,
      vocab: newVocab
    });

    setTimeout(() => {
      setSession(s => ({ ...s, stepIdx: s.stepIdx + 1 }));
    }, 2500);
  };

  const handleProductionSubmit = () => {
    const step = stage.steps[session.stepIdx] as ProductionStep;
    const userInput = inputValue.trim().toLowerCase();
    const expected = step.expectedAnswer.toLowerCase();
    const variations = step.acceptedVariations?.map(v => v.toLowerCase()) || [];
    
    const isCorrect = userInput === expected || variations.includes(userInput);
    
    const newTotal = session.total + 1;
    let newCorrect = session.correct;
    let newXp = session.xp;
    let newVocab = [...session.vocab];

    if (isCorrect) {
      newCorrect++;
      newXp += 15;
      newVocab.push(step.expectedAnswer);
    } else {
      newXp += 3;
    }

    setFeedback({ correct: isCorrect, teach: step.teach });
    setSession({
      ...session,
      xp: newXp,
      correct: newCorrect,
      total: newTotal,
      vocab: newVocab
    });

    setTimeout(() => {
      setSession(s => ({ ...s, stepIdx: s.stepIdx + 1 }));
    }, 2500);
  };

  const currentStep = stage.steps[session.stepIdx];

  return (
    <div className="min-h-screen flex flex-col bg-stone-100">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-10 shadow-sm">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-lg border border-stone-300 text-gray-600 hover:border-amber-600 hover:text-amber-600 transition-colors flex items-center justify-center text-sm"
        >
          ←
        </button>
        
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-amber-500 flex items-center justify-center text-xl flex-shrink-0">
          {stage.char.emoji}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="font-cormorant text-lg font-bold leading-none truncate">
            {stage.char.name}
          </div>
          <div className="text-xs text-gray-500 truncate">
            {currentPhase === 'understand' && '📖 الفهم'}
            {currentPhase === 'recognition' && '🎯 الاختيار'}
            {currentPhase === 'production' && '💬 المحادثة'}
          </div>
        </div>
        
        <div className="font-mono-dm text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
          +{session.xp} XP
        </div>
      </div>

      {/* Context Card */}
      <div className="px-4 py-3 bg-amber-50 border-b border-amber-100">
        <div className="text-[0.62rem] font-bold tracking-[2.5px] uppercase text-amber-700 mb-1.5">
          {stage.emoji} {stage.title}
        </div>
        <div className="text-[0.83rem] text-gray-700 leading-relaxed">
          {stage.setting}
        </div>
      </div>

      {/* Chat Area */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto px-4 py-3"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d6d3ce' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      >
        {/* Understand Phase */}
        {currentPhase === 'understand' && (
          <div className="space-y-3">
            {understandMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.speaker === 'أنت' ? 'justify-end' : 'justify-start'} animate-[riseIn_0.35s_ease_both]`}
              >
                <div className="max-w-[85%]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{msg.speakerEmoji}</span>
                    <span className="text-xs text-gray-500 font-medium">{msg.speaker}</span>
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-3 shadow-sm ${
                      msg.speaker === 'أنت'
                        ? 'bg-amber-50 border border-amber-200'
                        : 'bg-white border border-stone-200'
                    }`}
                  >
                    <div
                      onClick={() => speak(msg.text)}
                      className="font-cormorant text-xl text-gray-900 leading-relaxed mb-1 cursor-pointer hover:text-amber-700 transition-colors"
                      dir="ltr"
                    >
                      {msg.text}
                    </div>
                    <div className="text-sm text-gray-500 leading-relaxed" dir="rtl">
                      {msg.textAr}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {showContinue && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={handleContinue}
                  className="bg-gradient-to-br from-amber-700 to-amber-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all"
                >
                  استمر ← المرحلة التالية
                </button>
              </div>
            )}
          </div>
        )}

        {/* Recognition Phase */}
        {currentPhase === 'recognition' && currentStep?.type === 'recognition' && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="bg-white border-2 border-amber-600 rounded-2xl px-6 py-4 shadow-lg max-w-md">
                <div className="text-center mb-3">
                  <div className="text-sm text-gray-500 mb-2">🔊 استمع واختر الإجابة الصحيحة</div>
                  <button
                    onClick={() => speak(currentStep.audio)}
                    className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full hover:bg-amber-200 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 3.5a1.5 1.5 0 00-3 0V7H5.5A1.5 1.5 0 004 8.5v3A1.5 1.5 0 005.5 13H7v3.5a1.5 1.5 0 003 0V13h1.5a1.5 1.5 0 001.5-1.5v-3A1.5 1.5 0 0011.5 7H10V3.5z" />
                    </svg>
                    أعد الاستماع
                  </button>
                </div>
                <div className="font-cormorant text-2xl text-center text-gray-900 mb-1" dir="ltr">
                  {currentStep.audio}
                </div>
                <div className="text-sm text-center text-gray-500" dir="rtl">
                  {currentStep.audioAr}
                </div>
              </div>
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              {currentStep.choices.map((choice, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRecognitionChoice(idx)}
                  disabled={selectedChoice !== null}
                  className={`w-full bg-white border-2 rounded-2xl px-5 py-4 text-right transition-all ${
                    selectedChoice === idx
                      ? choice.correct
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : selectedChoice !== null
                      ? 'opacity-40 cursor-not-allowed border-stone-200'
                      : 'border-stone-300 hover:border-amber-600 hover:bg-amber-50 active:scale-[0.98]'
                  }`}
                >
                  <div className="font-cormorant text-xl text-gray-900 mb-1" dir="ltr">
                    {choice.it}
                  </div>
                  <div className="text-sm text-gray-500" dir="rtl">
                    {choice.ar}
                  </div>
                </button>
              ))}
            </div>

            {feedback && (
              <div className={`max-w-md mx-auto p-4 rounded-2xl ${
                feedback.correct ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
              }`}>
                <div className="text-center mb-2">
                  <span className="text-2xl">{feedback.correct ? '✅' : '❌'}</span>
                  <span className="text-lg font-bold ml-2">
                    {feedback.correct ? 'ممتاز!' : 'حاول مرة أخرى'}
                  </span>
                </div>
                <div className="text-sm text-gray-700 text-center" dir="rtl">
                  {feedback.teach}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Production Phase */}
        {currentPhase === 'production' && currentStep?.type === 'production' && (
          <div className="space-y-4">
            <div className="flex justify-start">
              <div className="max-w-[85%]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{stage.char.emoji}</span>
                  <span className="text-xs text-gray-500 font-medium">{stage.char.name}</span>
                </div>
                <div className="bg-white border border-stone-200 rounded-2xl px-4 py-3 shadow-sm">
                  <div
                    onClick={() => speak(currentStep.prompt)}
                    className="font-cormorant text-xl text-gray-900 leading-relaxed mb-1 cursor-pointer hover:text-amber-700 transition-colors"
                    dir="ltr"
                  >
                    {currentStep.prompt}
                  </div>
                  <div className="text-sm text-gray-500 leading-relaxed" dir="rtl">
                    {currentStep.promptAr}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-gray-600 py-2">
              💬 اكتب ردك بالإيطالية
            </div>

            {feedback && (
              <div className={`max-w-md mx-auto p-4 rounded-2xl ${
                feedback.correct ? 'bg-green-50 border-2 border-green-200' : 'bg-amber-50 border-2 border-amber-200'
              }`}>
                <div className="text-center mb-2">
                  <span className="text-2xl">{feedback.correct ? '🎉' : '💡'}</span>
                  <span className="text-lg font-bold ml-2">
                    {feedback.correct ? 'رائع!' : 'الإجابة الصحيحة:'}
                  </span>
                </div>
                {!feedback.correct && (
                  <div className="font-cormorant text-xl text-center text-amber-700 mb-2" dir="ltr">
                    {(currentStep as ProductionStep).expectedAnswer}
                  </div>
                )}
                <div className="text-sm text-gray-700 text-center" dir="rtl">
                  {feedback.teach}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Area */}
      {currentPhase === 'production' && !feedback && (
        <div className="bg-white border-t border-stone-200 px-4 py-3">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && inputValue.trim() && handleProductionSubmit()}
              placeholder="اكتب إجابتك هنا..."
              className="flex-1 bg-stone-100 border-2 border-stone-300 rounded-full px-4 py-3 text-base focus:outline-none focus:border-amber-600 transition-colors"
              dir="ltr"
            />
            <button
              onClick={handleProductionSubmit}
              disabled={!inputValue.trim()}
              className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-700 active:scale-95 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
