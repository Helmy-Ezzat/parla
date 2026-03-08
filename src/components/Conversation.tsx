import { useState, useEffect, useRef } from 'react';
import type { Stage, SessionState, Choice } from '../types';

interface ConversationProps {
  stage: Stage;
  onComplete: (xp: number, correct: number, total: number, vocab: string[]) => void;
  onBack: () => void;
}

interface Message {
  type: 'npc' | 'user' | 'typing';
  text?: string;
  textAr?: string;
  isCorrect?: boolean;
  correction?: string;
  teach?: string;
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
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [showChoices, setShowChoices] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show context card first
    setTimeout(() => {
      showNextStep();
    }, 700);
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const showNextStep = () => {
    if (session.stepIdx >= stage.steps.length) {
      onComplete(session.xp, session.correct, session.total, session.vocab);
      return;
    }

    const step = stage.steps[session.stepIdx];
    
    // Show typing indicator
    setMessages(prev => [...prev, { type: 'typing' }]);
    
    setTimeout(() => {
      // Remove typing, add NPC message
      setMessages(prev => [
        ...prev.filter(m => m.type !== 'typing'),
        {
          type: 'npc',
          text: step.npc,
          textAr: step.npc_ar
        }
      ]);
      
      // Speak the text
      speak(step.npc);
      
      // Show choices after a delay
      setTimeout(() => {
        setShowChoices(true);
      }, 500);
    }, 900 + Math.random() * 600);
  };

  const handleChoiceClick = (choice: Choice, index: number) => {
    if (selectedChoice !== null) return;
    
    setSelectedChoice(index);
    setShowChoices(false);
    
    const step = stage.steps[session.stepIdx];
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

    // Add user message
    setMessages(prev => [
      ...prev,
      {
        type: 'user',
        text: choice.it,
        textAr: choice.ar,
        isCorrect: choice.correct,
        correction: choice.correct ? undefined : step.choices.find(c => c.correct)?.it,
        teach: step.teach
      }
    ]);

    // Update session
    setSession({
      ...session,
      stepIdx: session.stepIdx + 1,
      xp: newXp,
      correct: newCorrect,
      total: newTotal,
      vocab: newVocab
    });

    // Move to next step
    setTimeout(() => {
      setSelectedChoice(null);
      showNextStep();
    }, 2400);
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

  const currentStep = stage.steps[session.stepIdx];

  return (
    <div className="min-h-screen flex flex-col bg-stone-100">
      {/* WhatsApp-style Header */}
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
          <div className="text-xs text-gray-500 truncate">{stage.char.role}</div>
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
        <div className="text-[0.83rem] text-gray-700 leading-relaxed mb-2">
          {stage.setting}
        </div>
        <div className="text-[0.78rem] text-gray-900 font-medium pt-2 border-t border-amber-200">
          🎯 {stage.mission}
        </div>
      </div>

      {/* Chat Area - WhatsApp style */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-2"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d6d3ce' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      >
        {messages.map((msg, idx) => (
          <div key={idx} className="animate-[riseIn_0.35s_cubic-bezier(0.22,1,0.36,1)_both]">
            {msg.type === 'typing' ? (
              <div className="flex items-center gap-2 mb-2">
                <div className="text-xs text-gray-500">{stage.char.name}</div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.15s' }} />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.3s' }} />
                </div>
              </div>
            ) : msg.type === 'npc' ? (
              <div className="flex justify-start">
                <div className="max-w-[85%]">
                  <div className="bg-white border border-stone-200 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl px-4 py-3 shadow-sm">
                    <div
                      onClick={() => speak(msg.text!)}
                      className="font-cormorant text-lg text-gray-900 leading-relaxed mb-1 cursor-pointer hover:text-amber-700 transition-colors"
                      dir="ltr"
                    >
                      {msg.text}
                    </div>
                    <div className="text-[0.77rem] text-gray-500 leading-relaxed" dir="rtl">
                      {msg.textAr}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-end">
                <div className="max-w-[85%]">
                  <div className={`rounded-tl-2xl rounded-bl-2xl rounded-br-2xl px-4 py-3 shadow-sm ${
                    msg.isCorrect
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    <div
                      onClick={() => speak(msg.text!)}
                      className="font-cormorant text-lg leading-relaxed mb-1 cursor-pointer transition-colors"
                      dir="ltr"
                      style={{ color: msg.isCorrect ? '#15803d' : '#b91c1c' }}
                    >
                      {msg.text}
                    </div>
                    <div className="text-[0.73rem] text-gray-600 leading-relaxed mb-2" dir="rtl">
                      {msg.textAr}
                    </div>
                    
                    <div className={`inline-flex items-center gap-1.5 text-[0.7rem] font-semibold px-2.5 py-1 rounded-full ${
                      msg.isCorrect
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : 'bg-red-100 text-red-700 border border-red-300'
                    }`}>
                      {msg.isCorrect ? '✅ صحيح' : '❌ خطأ'}
                    </div>
                    
                    {!msg.isCorrect && msg.correction && (
                      <div className="mt-3 bg-white/80 border border-stone-300 rounded-xl p-3 text-[0.78rem] leading-relaxed" dir="rtl">
                        <div className="font-cormorant text-[0.95rem] text-amber-700 mb-1" dir="ltr">
                          {msg.correction}
                        </div>
                        {msg.teach && <div className="text-gray-600">{msg.teach}</div>}
                      </div>
                    )}
                    
                    {msg.isCorrect && msg.teach && (
                      <div className="mt-3 bg-white/80 border border-green-200 rounded-xl p-3 text-[0.78rem] text-gray-600 leading-relaxed" dir="rtl">
                        {msg.teach}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Area - WhatsApp style */}
      <div className="bg-white border-t border-stone-200 px-4 py-3">
        {currentStep && showChoices && (
          <>
            <div className="text-center text-xs text-gray-500 mb-2 min-h-[18px]">
              {currentStep.hint && `💡 ${currentStep.hint}`}
            </div>
            
            <div className="space-y-2">
              {currentStep.choices.map((choice, idx) => (
                <button
                  key={idx}
                  onClick={() => handleChoiceClick(choice, idx)}
                  disabled={selectedChoice !== null}
                  className={`w-full bg-white border-2 rounded-2xl px-4 py-3 text-right transition-all hover:border-amber-600 hover:bg-amber-50 active:scale-[0.98] ${
                    selectedChoice === idx
                      ? choice.correct
                        ? 'border-green-500 bg-green-50 pointer-events-none'
                        : 'border-red-500 bg-red-50 pointer-events-none'
                      : selectedChoice !== null
                      ? 'opacity-30 pointer-events-none'
                      : 'border-stone-300'
                  }`}
                >
                  <div className="font-cormorant text-lg text-gray-900 mb-0.5" dir="ltr">
                    {choice.it}
                  </div>
                  <div className="text-[0.73rem] text-gray-500" dir="rtl">
                    {choice.ar}
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
