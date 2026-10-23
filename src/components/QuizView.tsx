import React, { useState } from 'react';
import { quizQuestions } from '../data/quizData';
import { QuizQuestion } from '../types';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  RotateCcw, 
  HelpCircle, 
  Sparkles, 
  ArrowRight,
  Flame,
  Award
} from 'lucide-react';
import { playTapSound, playWinSound, playDangerSound } from '../utils/audio';

export const QuizView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'textbook' | 'author' | 'story'>('all');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ question: QuizQuestion; selected: number; isCorrect: boolean }[]>([]);

  const filteredQuestions = quizQuestions.filter((q) => {
    if (selectedCategory === 'all') return true;
    return q.category === selectedCategory;
  });

  const question = filteredQuestions[currentIdx];

  const handleSelectOption = (optIdx: number) => {
    if (isAnswered) return;
    playTapSound();
    setSelectedOption(optIdx);
    setIsAnswered(true);

    const isCorrect = optIdx === question.correctIndex;
    if (isCorrect) {
      playWinSound();
      setScore((prev) => prev + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
    } else {
      playDangerSound();
      setStreak(0);
    }

    setUserAnswers((prev) => [
      ...prev,
      { question, selected: optIdx, isCorrect }
    ]);
  };

  const handleNextQuestion = () => {
    playTapSound();
    if (currentIdx < filteredQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      playWinSound();
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }
  };

  const handleRestart = (category: 'all' | 'textbook' | 'author' | 'story' = selectedCategory) => {
    playTapSound();
    setSelectedCategory(category);
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setIsCompleted(false);
    setUserAnswers([]);
  };

  const getBadgeTitle = (percent: number) => {
    if (percent === 100) return "Karrampo Qiroli Bilimdoni 👑";
    if (percent >= 80) return "Tabiatshunos Olim 🎓";
    if (percent >= 60) return "Zukko Izquvar 🐺";
    return "Yosh Kitobxon 📖";
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Quiz Header & Category Filters */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-amber-950/30 border border-slate-800 p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
              <span>Bilimni sinash</span>
              <span>·</span>
              <span>Darslik va asar asosida</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-1">
              Interaktiv Testlar
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg">
              Ernest Seton-Tompson hayoti, Tog'ay Murod tarjimasi va darslikdagi Lobo hikoyasi bo'yicha bilimlaringizni sinab ko'ring.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            {streak > 1 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/40 text-xs font-bold animate-bounce">
                <Flame className="w-4 h-4 fill-orange-400" />
                <span>{streak} ketma-ket to'g'ri!</span>
              </div>
            )}
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-medium text-slate-300">
              Ball: <span className="text-amber-400 font-bold font-mono">{score}</span>
            </div>
          </div>
        </div>

        {/* Filter categories */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-800 overflow-x-auto">
          <button
            onClick={() => handleRestart('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-300 hover:text-white'
            }`}
          >
            Barchasi ({quizQuestions.length})
          </button>
          <button
            onClick={() => handleRestart('textbook')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === 'textbook'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-300 hover:text-white'
            }`}
          >
            Darslik va Lug'at (5)
          </button>
          <button
            onClick={() => handleRestart('author')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === 'author'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-300 hover:text-white'
            }`}
          >
            Seton-Tompson (3)
          </button>
          <button
            onClick={() => handleRestart('story')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === 'story'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-300 hover:text-white'
            }`}
          >
            Lobo sarguzashtlari (5)
          </button>
        </div>
      </div>

      {!isCompleted ? (
        /* Question Card */
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-8 shadow-xl space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between gap-4 text-xs">
            <span className="text-slate-400 font-medium">
              Savol: <strong className="text-white">{currentIdx + 1}</strong> / {filteredQuestions.length}
            </span>
            <div className="flex-1 max-w-xs bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / filteredQuestions.length) * 100}%` }}
              />
            </div>
            <span className="text-amber-400 font-mono text-[11px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              {question.category === 'author' ? 'Muallif' : 'Hikoya'}
            </span>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
              {question.question}
            </h2>
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {question.options.map((option, optIdx) => {
              const isSelected = selectedOption === optIdx;
              const isCorrect = optIdx === question.correctIndex;

              let btnStyle = 'bg-slate-950/70 border-slate-800 text-slate-200 hover:border-slate-700';

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200 font-semibold';
                } else {
                  btnStyle = 'bg-slate-950/30 border-slate-800/40 text-slate-500';
                }
              }

              return (
                <button
                  key={`q-${question.id}-opt-${optIdx}`}
                  onClick={() => handleSelectOption(optIdx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-3 min-h-[52px] ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 text-xs flex items-center justify-center font-bold shrink-0">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="text-sm leading-snug">{option}</span>
                  </div>

                  {isAnswered && (
                    <div className="shrink-0">
                      {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                      {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Alert */}
          {isAnswered && (
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-1.5 animate-in fade-in">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>To'liq izoh va manba:</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {question.explanation}
              </p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNextQuestion}
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-900/30 transition-all"
              >
                <span>{currentIdx < filteredQuestions.length - 1 ? 'Keyingi savol' : 'Natijalarni ko\'rish'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results & Certificate Card */
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-9 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center border-2 border-amber-400/50 shadow-inner">
            <Trophy className="w-9 h-9 text-amber-300" />
          </div>

          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/30 mb-2">
              {getBadgeTitle(Math.round((score / filteredQuestions.length) * 100))}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Test yakunlandi!
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Siz {filteredQuestions.length} ta savoldan {score} tasiga to'g'ri javob berdingiz ({Math.round((score / filteredQuestions.length) * 100)}%).
            </p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] text-slate-400">To'g'ri</div>
              <div className="text-lg font-bold text-emerald-400">{score}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] text-slate-400">Noto'g'ri</div>
              <div className="text-lg font-bold text-rose-400">{filteredQuestions.length - score}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] text-slate-400">Maks. seriya</div>
              <div className="text-lg font-bold text-amber-400">{maxStreak}</div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => handleRestart()}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs inline-flex items-center gap-2 shadow-lg shadow-amber-900/30"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Qaytadan ishlash</span>
            </button>
          </div>

          {/* Detailed Question Review */}
          <div className="text-left pt-6 border-t border-slate-800 space-y-3">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Javoblar tahlili:
            </h4>
            <div className="space-y-2">
              {userAnswers.map((item, idx) => (
                <div
                  key={`ans-${item.question.id}-${idx}`}
                  className={`p-3 rounded-xl border text-xs ${
                    item.isCorrect
                      ? 'bg-emerald-950/20 border-emerald-900/50 text-slate-200'
                      : 'bg-rose-950/20 border-rose-900/50 text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {item.isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1">
                      <div className="font-medium text-white">{item.question.question}</div>
                      <div className="text-slate-400">
                        To'g'ri javob: <span className="text-emerald-300 font-medium">{item.question.options[item.question.correctIndex]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
