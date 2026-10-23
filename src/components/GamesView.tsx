import React, { useState, useEffect, useRef } from 'react';
import { storyChronologyEvents, memoryCardPairs, MemoryCard } from '../data/gamesData';
import { StoryEventItem } from '../types';
import confetti from 'canvas-confetti';
import { 
  Gamepad2, 
  Sparkles, 
  RotateCcw, 
  Trophy, 
  ArrowUp, 
  ArrowDown, 
  CheckCircle2, 
  XCircle, 
  Heart, 
  Crown, 
  Feather, 
  ShieldAlert, 
  Mountain, 
  Compass, 
  Play, 
  Pause 
} from 'lucide-react';
import { playTapSound, playWinSound, playDangerSound, playWolfHowl } from '../utils/audio';

export const GamesView: React.FC = () => {
  const [activeGame, setActiveGame] = useState<'runner' | 'memory' | 'chronology'>('runner');

  return (
    <div className="space-y-6 pb-20">
      {/* Game Mode Selector */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-amber-950/30 border border-slate-800 p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
              <span>Interaktiv o'yinlar</span>
              <span>·</span>
              <span>Ko'ngilochar va ta'limiy</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-1">
              Karrampo O'yinlari
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg">
              Loboning zakovatini his eting, xotirangizni charxlang va asar voqealari ketma-ketligini tiklang.
            </p>
          </div>
        </div>

        {/* Game Tabs */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-800 overflow-x-auto">
          <button
            onClick={() => {
              playTapSound();
              setActiveGame('runner');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
              activeGame === 'runner'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-900/20'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Loboning izidan (Mini-o'yin)</span>
          </button>

          <button
            onClick={() => {
              playTapSound();
              setActiveGame('memory');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
              activeGame === 'memory'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-900/20'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Xotira kartalari</span>
          </button>

          <button
            onClick={() => {
              playTapSound();
              setActiveGame('chronology');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
              activeGame === 'chronology'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-900/20'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Hikoya xronologiyasi</span>
          </button>
        </div>
      </div>

      {/* Render Active Game */}
      {activeGame === 'runner' && <WolfTrailRunner />}
      {activeGame === 'memory' && <MemoryCardsGame />}
      {activeGame === 'chronology' && <ChronologyOrderGame />}
    </div>
  );
};

/* -------------------------------------------------------------
 * 1. Mini-Game: "Loboning izidan: Karrampo vodiysi"
 * ------------------------------------------------------------- */
const WolfTrailRunner: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [lane, setLane] = useState<0 | 1 | 2>(1); // 0: chap, 1: o'rta, 2: o'ng
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(3);
  const [highScore, setHighScore] = useState(0);

  interface Obstacle {
    id: number;
    lane: 0 | 1 | 2;
    y: number; // 0 to 100%
    type: 'trap' | 'poison' | 'meat' | 'star';
  }

  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const laneRef = useRef<0 | 1 | 2>(lane);
  const nextObstacleIdRef = useRef<number>(1);

  // Keep laneRef in sync without triggering game loop restarts
  useEffect(() => {
    laneRef.current = lane;
  }, [lane]);

  const startGame = () => {
    playTapSound();
    playWolfHowl();
    setLane(1);
    laneRef.current = 1;
    setScore(0);
    setHealth(3);
    setObstacles([]);
    setIsGameOver(false);
    setIsPlaying(true);
    lastTimeRef.current = performance.now();
  };

  const moveLeft = () => {
    if (!isPlaying) return;
    playTapSound();
    setLane((prev) => (prev > 0 ? ((prev - 1) as 0 | 1 | 2) : 0));
  };

  const moveRight = () => {
    if (!isPlaying) return;
    playTapSound();
    setLane((prev) => (prev < 2 ? ((prev + 1) as 0 | 1 | 2) : 2));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') moveLeft();
      if (e.key === 'ArrowRight' || e.key === 'd') moveRight();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Game Loop
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    let spawnTimer = 0;

    const updateGame = (time: number) => {
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      spawnTimer += delta;
      if (spawnTimer > 1.1) {
        spawnTimer = 0;
        const randomLane = Math.floor(Math.random() * 3) as 0 | 1 | 2;
        const types: ('trap' | 'poison' | 'meat' | 'star')[] = ['trap', 'poison', 'meat', 'star'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        const newObsId = nextObstacleIdRef.current++;
        setObstacles((prev) => [
          ...prev,
          { id: newObsId, lane: randomLane, y: 0, type: randomType }
        ]);
      }

      setObstacles((prev) => {
        const nextList: Obstacle[] = [];
        let hit = false;
        let scoreAdd = 0;
        const currentLane = laneRef.current;

        for (const obs of prev) {
          const newY = obs.y + delta * 35; // speed

          // Collision detection near bottom (y between 78 and 92)
          if (newY >= 75 && newY <= 92 && obs.lane === currentLane) {
            if (obs.type === 'poison') {
              playDangerSound();
              setHealth((h) => {
                const nextH = h - 1;
                if (nextH <= 0) hit = true;
                return nextH;
              });
            } else if (obs.type === 'trap') {
              playDangerSound();
              setHealth((h) => {
                const nextH = h - 1;
                if (nextH <= 0) hit = true;
                return nextH;
              });
            } else if (obs.type === 'meat') {
              playWinSound();
              scoreAdd += 15;
            } else if (obs.type === 'star') {
              playWinSound();
              scoreAdd += 25;
            }
            continue; // Collided, do not keep
          }

          if (newY < 100) {
            nextList.push({ ...obs, y: newY });
          } else {
            // Reached bottom safely
            if (obs.type === 'poison' || obs.type === 'trap') {
              scoreAdd += 10; // Avoided danger!
            }
          }
        }

        if (scoreAdd > 0) {
          setScore((s) => {
            const newScore = s + scoreAdd;
            setHighScore((prevHigh) => Math.max(prevHigh, newScore));
            return newScore;
          });
        }

        if (hit) {
          setIsGameOver(true);
          setIsPlaying(false);
          playDangerSound();
        }

        return nextList;
      });

      requestRef.current = requestAnimationFrame(updateGame);
    };

    requestRef.current = requestAnimationFrame(updateGame);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, isGameOver]);

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-7 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Loboning jasorati: Karrampo yo'lagi</span>
            <span className="text-xs text-amber-400 font-normal bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
              Qopqon va zaharlarni chetlab o'ting!
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Zaharli go'sht va po'lat qopqonlardan qoching, halol o'ljalar va yulduzlarni to'plang.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Health */}
          <div className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart
                key={i}
                className={`w-4 h-4 ${i < health ? 'text-rose-500 fill-rose-500' : 'text-slate-700'}`}
              />
            ))}
          </div>

          {/* Score */}
          <div className="bg-slate-950 px-3 py-1 rounded-lg border border-slate-800 text-xs">
            Ball: <span className="text-amber-400 font-bold font-mono">{score}</span>
          </div>
        </div>
      </div>

      {/* Game Field */}
      <div className="relative w-full max-w-md mx-auto aspect-[3/4] bg-gradient-to-b from-slate-950 via-slate-900 to-amber-950/20 rounded-2xl border-2 border-slate-800 overflow-hidden shadow-2xl">
        {/* Canyon 3 lanes dividers */}
        <div className="absolute inset-0 grid grid-cols-3">
          <div className="border-r border-slate-800/60" />
          <div className="border-r border-slate-800/60" />
          <div />
        </div>

        {/* Obstacles and items */}
        {obstacles.map((obs) => {
          const leftPercent = obs.lane === 0 ? '16.6%' : obs.lane === 1 ? '50%' : '83.3%';
          let itemRender = null;
          if (obs.type === 'trap') {
            itemRender = (
              <div className="w-10 h-10 rounded-xl bg-rose-950/90 border border-rose-500/60 flex items-center justify-center text-xs text-rose-300 font-bold shadow-lg">
                ⚠️ Qopqon
              </div>
            );
          } else if (obs.type === 'poison') {
            itemRender = (
              <div className="w-10 h-10 rounded-xl bg-purple-950/90 border border-purple-500/60 flex items-center justify-center text-xs text-purple-300 font-bold shadow-lg">
                ☠️ Zahar
              </div>
            );
          } else if (obs.type === 'meat') {
            itemRender = (
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/60 flex items-center justify-center text-xs text-amber-300 font-bold shadow-lg">
                🥩 Go'sht
              </div>
            );
          } else {
            itemRender = (
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/60 flex items-center justify-center text-xs text-emerald-300 font-bold shadow-lg">
                ⭐ +25
              </div>
            );
          }

          return (
            <div
              key={`runner-obs-${obs.id}`}
              className="absolute -translate-x-1/2 transition-transform"
              style={{ left: leftPercent, top: `${obs.y}%` }}
            >
              {itemRender}
            </div>
          );
        })}

        {/* Player: Lobo */}
        {isPlaying && (
          <div
            className="absolute bottom-6 -translate-x-1/2 transition-all duration-150 flex flex-col items-center"
            style={{
              left: lane === 0 ? '16.6%' : lane === 1 ? '50%' : '83.3%'
            }}
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 font-black text-2xl flex items-center justify-center shadow-xl shadow-amber-500/30 ring-2 ring-white/40 animate-pulse">
              🐺
            </div>
            <span className="text-[10px] text-amber-300 font-bold mt-1 bg-black/60 px-1.5 rounded">
              Lobo
            </span>
          </div>
        )}

        {/* Overlay when not playing */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center space-y-4">
            {isGameOver ? (
              <>
                <div className="w-14 h-14 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-2xl border border-rose-500/40">
                  💔
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Lobo tuzoqqa tushdi!</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    To'plangan ball: <strong className="text-amber-400">{score}</strong> | Rekord: {highScore}
                  </p>
                </div>
                <button
                  onClick={startGame}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Qaytadan boshlash</span>
                </button>
              </>
            ) : (
              <>
                <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-3xl border border-amber-500/40">
                  🐺
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Karrampo vodiysi poygasi</h4>
                  <p className="text-xs text-slate-300 mt-1 max-w-xs">
                    Ovchilarning zaharli yemaklari va qopqonlarini chetlab o'ting. Chap/O'ng tugmalari bilan harakatlaning.
                  </p>
                </div>
                <button
                  onClick={startGame}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-xl inline-flex items-center gap-2"
                >
                  <Play className="w-5 h-5 fill-slate-950" />
                  <span>O'yinni boshlash</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Touch Controls for Mobile */}
      {isPlaying && (
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto pt-2">
          <button
            onClick={moveLeft}
            className="min-h-[52px] bg-slate-800 active:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 flex items-center justify-center gap-2 text-sm"
          >
            ← Chapga
          </button>
          <button
            onClick={moveRight}
            className="min-h-[52px] bg-slate-800 active:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 flex items-center justify-center gap-2 text-sm"
          >
            O'ngga →
          </button>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------
 * 2. Mini-Game: "Xotira Kartalari" (Memory Match)
 * ------------------------------------------------------------- */
const MemoryCardsGame: React.FC = () => {
  const generateDeck = () => {
    const deck: MemoryCard[] = [];
    let id = 1;
    memoryCardPairs.forEach((pair) => {
      deck.push({ ...pair, id: id++ });
      deck.push({ ...pair, id: id++ });
    });
    // Shuffle
    return deck.sort(() => Math.random() - 0.5);
  };

  const [cards, setCards] = useState<MemoryCard[]>(generateDeck());
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const resetGame = () => {
    playTapSound();
    setCards(generateDeck());
    setFlippedIndices([]);
    setMatchedPairs([]);
    setMoves(0);
    setIsWon(false);
  };

  const handleCardClick = (idx: number) => {
    if (flippedIndices.length === 2 || flippedIndices.includes(idx)) return;
    const card = cards[idx];
    if (matchedPairs.includes(card.pairKey)) return;

    playTapSound();
    const newFlipped = [...flippedIndices, idx];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const firstCard = cards[newFlipped[0]];
      const secondCard = cards[newFlipped[1]];

      if (firstCard.pairKey === secondCard.pairKey) {
        // Matched!
        playWinSound();
        const newMatched = [...matchedPairs, firstCard.pairKey];
        setMatchedPairs(newMatched);
        setFlippedIndices([]);

        if (newMatched.length === memoryCardPairs.length) {
          setIsWon(true);
          try {
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
          } catch {
            // ignore
          }
        }
      } else {
        // Not matched, flip back
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Crown': return <Crown className="w-6 h-6 text-amber-400" />;
      case 'Heart': return <Heart className="w-6 h-6 text-rose-400" />;
      case 'Feather': return <Feather className="w-6 h-6 text-sky-400" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-orange-400" />;
      case 'Mountain': return <Mountain className="w-6 h-6 text-emerald-400" />;
      case 'Compass': return <Compass className="w-6 h-6 text-purple-400" />;
      default: return <Sparkles className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-7 shadow-xl space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white">
            Bo'rilar to'dasi xotira kartalari
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Lobo, Blanka, Ernest Seton-Tompson va asar ramzlari juftliklarini toping.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-950 px-3 py-1 rounded-lg border border-slate-800 text-xs">
            Harakatlar: <span className="text-amber-400 font-bold font-mono">{moves}</span>
          </div>
          <button
            onClick={resetGame}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 flex items-center gap-1.5 border border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Qayta boshlash</span>
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-w-lg mx-auto">
        {cards.map((card, idx) => {
          const isFlipped = flippedIndices.includes(idx) || matchedPairs.includes(card.pairKey);
          return (
            <button
              key={`memory-card-${card.id}-${card.pairKey}-${idx}`}
              onClick={() => handleCardClick(idx)}
              className={`aspect-square rounded-xl p-2 flex flex-col items-center justify-center border transition-all text-center select-none ${
                isFlipped
                  ? 'bg-slate-950 border-amber-400/80 shadow-md scale-98'
                  : 'bg-slate-800/90 border-slate-700 hover:border-slate-600 hover:scale-102 cursor-pointer'
              }`}
            >
              {isFlipped ? (
                <>
                  {renderIcon(card.iconName)}
                  <div className="text-[11px] font-bold text-white mt-1 leading-tight">{card.name}</div>
                  <div className="text-[9px] text-slate-400 leading-tight">{card.subtitle}</div>
                </>
              ) : (
                <div className="text-xl text-slate-600 font-bold">🐺</div>
              )}
            </button>
          );
        })}
      </div>

      {isWon && (
        <div className="p-5 rounded-xl bg-amber-500/20 border border-amber-400/60 text-center space-y-2 max-w-md mx-auto">
          <Trophy className="w-8 h-8 text-amber-300 mx-auto" />
          <h4 className="text-base font-bold text-white">Barcha juftliklar topildi!</h4>
          <p className="text-xs text-slate-300">
            Siz {moves} ta harakatda o'yinni muvaffaqiyatli yakunladingiz.
          </p>
          <button
            onClick={resetGame}
            className="px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs shadow mt-1"
          >
            Yana o'ynash
          </button>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------
 * 3. Mini-Game: "Hikoya xronologiyasi" (Sequence Sorter)
 * ------------------------------------------------------------- */
const ChronologyOrderGame: React.FC = () => {
  // Shuffle events initially
  const [events, setEvents] = useState<StoryEventItem[]>(() =>
    [...storyChronologyEvents].sort(() => Math.random() - 0.5)
  );
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    playTapSound();
    const newEvents = [...events];
    const temp = newEvents[idx];
    newEvents[idx] = newEvents[idx - 1];
    newEvents[idx - 1] = temp;
    setEvents(newEvents);
    setChecked(false);
  };

  const moveDown = (idx: number) => {
    if (idx === events.length - 1) return;
    playTapSound();
    const newEvents = [...events];
    const temp = newEvents[idx];
    newEvents[idx] = newEvents[idx + 1];
    newEvents[idx + 1] = temp;
    setEvents(newEvents);
    setChecked(false);
  };

  const handleCheck = () => {
    playTapSound();
    let correct = true;
    for (let i = 0; i < events.length; i++) {
      if (events[i].order !== i + 1) {
        correct = false;
        break;
      }
    }
    setChecked(true);
    setIsCorrect(correct);
    if (correct) {
      playWinSound();
      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    } else {
      playDangerSound();
    }
  };

  const handleReset = () => {
    playTapSound();
    setEvents([...storyChronologyEvents].sort(() => Math.random() - 0.5));
    setChecked(false);
    setIsCorrect(false);
  };

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-7 shadow-xl space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white">
            Voqealar ketma-ketligini tiklash
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Lobo asaridagi muhim voqealarni yuqoriga/pastga surib, to'g'ri xronologik tartibda joylashtiring.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center gap-1.5 border border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Aralashtirish</span>
          </button>
          <button
            onClick={handleCheck}
            className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-900/30"
          >
            Tekshirish
          </button>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-2.5 max-w-xl mx-auto">
        {events.map((ev, idx) => {
          const isItemCorrect = checked && ev.order === idx + 1;
          const isItemWrong = checked && ev.order !== idx + 1;

          return (
            <div
              key={`chrono-${ev.id}-${idx}`}
              className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                isItemCorrect
                  ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-100'
                  : isItemWrong
                  ? 'bg-rose-950/40 border-rose-500/80 text-rose-100'
                  : 'bg-slate-950/70 border-slate-800 text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-800 text-amber-400 text-xs flex items-center justify-center font-bold font-mono shrink-0">
                  {idx + 1}
                </span>
                <p className="text-xs sm:text-sm leading-snug">{ev.text}</p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => moveUp(idx)}
                  disabled={idx === 0}
                  className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300"
                  title="Yuqoriga"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveDown(idx)}
                  disabled={idx === events.length - 1}
                  className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300"
                  title="Pastga"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {checked && (
        <div
          className={`p-4 rounded-xl border text-center text-xs font-medium max-w-xl mx-auto ${
            isCorrect
              ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
              : 'bg-rose-950/40 border-rose-500 text-rose-300'
          }`}
        >
          {isCorrect ? (
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Ajoyib! Barcha voqealar to'g'ri xronologik tartibda joylashtirildi.</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <XCircle className="w-4 h-4" />
              <span>Ayrim voqealar o'rni noto'g'ri. Qizil rangli qatorlar tartibini qayta tekshirib ko'ring.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
