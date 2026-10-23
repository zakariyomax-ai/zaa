import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  Shuffle, 
  RotateCcw, 
  Eye, 
  Trophy, 
  Sparkles, 
  Hash, 
  Clock, 
  X
} from 'lucide-react';
import { playTapSound, playWinSound } from '../utils/audio';

interface PuzzleImage {
  id: string;
  name: string;
  src: string;
  authorLabel: string;
}

const PUZZLE_IMAGES: PuzzleImage[] = [
  {
    id: 'lobo-pack-32',
    name: 'Lobo va galasi (32-bet)',
    src: '/assets/aistudio/image_79f99cdd.png',
    authorLabel: 'Darslik rangli rasmi'
  },
  {
    id: 'lobo-sketch-39',
    name: 'Lobo nigohi (39-bet)',
    src: '/assets/aistudio/image_c3538cbe.png',
    authorLabel: 'Seton-Tompson chizgan rasm'
  },
  {
    id: 'author-formal',
    name: 'Ernest Seton-Tompson',
    src: '/assets/aistudio/image_0d9cf66a.png',
    authorLabel: 'Muallif portreti'
  },
  {
    id: 'blanca-trap-37',
    name: 'Blanka (37-bet)',
    src: '/assets/aistudio/image_c9715f44.png',
    authorLabel: '1894-yilgi tarixiy rasm'
  },
  {
    id: 'author-nature',
    name: 'Seton-Tompson tabiatda',
    src: '/assets/aistudio/image_089bb184.png',
    authorLabel: 'Shimoliy Amerika'
  }
];

export const PuzzleView: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<PuzzleImage>(PUZZLE_IMAGES[0]);
  const [gridSize, setGridSize] = useState<3 | 4>(3); // 3x3 or 4x4
  const [tiles, setTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [showNumbers, setShowNumbers] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  const totalTiles = gridSize * gridSize;
  const emptyTileValue = totalTiles - 1; // Last index is blank

  // Initialize solved state
  const getSolvedTiles = useCallback(() => {
    return Array.from({ length: totalTiles }, (_, i) => i);
  }, [totalTiles]);

  // Check if current tiles are in solved order
  const checkWin = (currentTiles: number[]) => {
    for (let i = 0; i < currentTiles.length; i++) {
      if (currentTiles[i] !== i) return false;
    }
    return true;
  };

  // Perform random legal moves to guarantee solvability
  const shuffleTiles = useCallback(() => {
    playTapSound();
    let current = getSolvedTiles();
    let blankPos = totalTiles - 1;
    const moveCount = gridSize === 3 ? 80 : 160;

    for (let m = 0; m < moveCount; m++) {
      const neighbors: number[] = [];
      const row = Math.floor(blankPos / gridSize);
      const col = blankPos % gridSize;

      if (row > 0) neighbors.push(blankPos - gridSize); // Up
      if (row < gridSize - 1) neighbors.push(blankPos + gridSize); // Down
      if (col > 0) neighbors.push(blankPos - 1); // Left
      if (col < gridSize - 1) neighbors.push(blankPos + 1); // Right

      const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
      // Swap blank with random neighbor
      const temp = current[blankPos];
      current[blankPos] = current[randomNeighbor];
      current[randomNeighbor] = temp;
      blankPos = randomNeighbor;
    }

    setTiles([...current]);
    setMoves(0);
    setElapsedTime(0);
    setStartTime(Date.now());
    setIsWon(false);
  }, [getSolvedTiles, gridSize, totalTiles]);

  // Initial load or size change
  useEffect(() => {
    shuffleTiles();
  }, [shuffleTiles, gridSize, selectedImage]);

  // Timer interval
  useEffect(() => {
    if (!startTime || isWon) return;
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime, isWon]);

  // Move tile if adjacent to empty slot
  const handleTileClick = (index: number) => {
    if (isWon) return;
    const emptyIndex = tiles.indexOf(emptyTileValue);
    if (emptyIndex === -1) return;

    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    const emptyRow = Math.floor(emptyIndex / gridSize);
    const emptyCol = emptyIndex % gridSize;

    const isAdjacent =
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow);

    if (isAdjacent) {
      playTapSound();
      const newTiles = [...tiles];
      newTiles[emptyIndex] = newTiles[index];
      newTiles[index] = emptyTileValue;

      setTiles(newTiles);
      setMoves((prev) => prev + 1);

      if (checkWin(newTiles)) {
        setIsWon(true);
        playWinSound();
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header Info */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-amber-950/30 border border-slate-800 p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
              <span>Interaktiv o'yin</span>
              <span>·</span>
              <span>Diqqat va mantiq</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-1">
              Rasm Pazli (Sliding Puzzle)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg">
              Katakchalarni bo'sh joyga siljitib, Ernest Seton-Tompson portretini yoki Lobo suratini to'liq yig'ing.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              onClick={() => setShowPreview(true)}
              className="min-h-[40px] px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-medium flex items-center gap-1.5 border border-slate-700 transition-colors"
            >
              <Eye className="w-4 h-4 text-amber-400" />
              <span>Namunani ko'rish</span>
            </button>
            <button
              onClick={shuffleTiles}
              className="min-h-[40px] px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-xs text-slate-950 font-bold flex items-center gap-1.5 shadow-md shadow-amber-900/30 transition-colors"
            >
              <Shuffle className="w-4 h-4" />
              <span>Aralashtirish</span>
            </button>
          </div>
        </div>

        {/* Status bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-800">
          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-amber-400" />
            <div>
              <div className="text-[10px] text-slate-400">Vaqt</div>
              <div className="text-sm font-bold font-mono text-white tabular-nums">{formatTime(elapsedTime)}</div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-2.5">
            <RotateCcw className="w-4 h-4 text-sky-400" />
            <div>
              <div className="text-[10px] text-slate-400">Yurishlar</div>
              <div className="text-sm font-bold font-mono text-white tabular-nums">{moves} ta</div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-2.5">
            <Hash className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="text-[10px] text-slate-400">Qiyinlik</div>
              <div className="text-xs font-bold text-white">
                {gridSize === 3 ? '3x3 (Oson)' : '4x4 (Murakkab)'}
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-slate-400">Raqamlar</div>
              <div className="text-xs font-medium text-white">{showNumbers ? 'Ochiq' : 'Yopiq'}</div>
            </div>
            <button
              onClick={() => {
                playTapSound();
                setShowNumbers(!showNumbers);
              }}
              className="text-xs px-2 py-1 rounded bg-slate-800 text-amber-300 hover:bg-slate-700"
            >
              O'zgartirish
            </button>
          </div>
        </div>
      </div>

      {/* Image & Difficulty Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {PUZZLE_IMAGES.map((img) => (
            <button
              key={img.id}
              onClick={() => {
                playTapSound();
                setSelectedImage(img);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                selectedImage.id === img.id
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              {img.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 self-end sm:self-center">
          <button
            onClick={() => {
              playTapSound();
              setGridSize(3);
            }}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              gridSize === 3 ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            3 x 3
          </button>
          <button
            onClick={() => {
              playTapSound();
              setGridSize(4);
            }}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              gridSize === 4 ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            4 x 4
          </button>
        </div>
      </div>

      {/* Main Puzzle Board */}
      <div className="flex flex-col items-center justify-center py-2">
        <div
          className="relative bg-slate-950 p-3 rounded-2xl border-2 border-slate-800 shadow-2xl max-w-sm sm:max-w-md w-full aspect-square"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`,
            gap: '4px',
          }}
        >
          {tiles.map((tileVal, idx) => {
            const isEmpty = tileVal === emptyTileValue;
            if (isEmpty) {
              return (
                <div
                  key={`empty-tile-slot-${idx}`}
                  className="rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-center"
                >
                  <span className="text-slate-700 text-xs">Bo'sh</span>
                </div>
              );
            }

            // Original target position of this tile in solved state
            const targetRow = Math.floor(tileVal / gridSize);
            const targetCol = tileVal % gridSize;
            const xPercent = (targetCol / (gridSize - 1)) * 100;
            const yPercent = (targetRow / (gridSize - 1)) * 100;

            return (
              <button
                key={`puzzle-tile-${tileVal}`}
                onClick={() => handleTileClick(idx)}
                className="relative rounded-xl overflow-hidden border border-slate-700/80 shadow-md group active:scale-95 transition-transform cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
                style={{
                  backgroundImage: `url(${selectedImage.src})`,
                  backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                  backgroundPosition: `${xPercent}% ${yPercent}%`,
                }}
              >
                {/* Number Overlay */}
                {showNumbers && (
                  <span className="absolute top-1 left-1 bg-black/70 backdrop-blur-xs text-amber-300 font-bold text-[10px] sm:text-xs px-1.5 py-0.5 rounded shadow">
                    {tileVal + 1}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Win Card Banner */}
        {isWon && (
          <div className="mt-6 max-w-md w-full p-6 rounded-2xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-900 border-2 border-amber-400 text-center space-y-3 shadow-2xl animate-in fade-in">
            <div className="w-14 h-14 rounded-full bg-amber-500/30 text-amber-400 mx-auto flex items-center justify-center text-2xl shadow-inner">
              <Trophy className="w-8 h-8 text-amber-300" />
            </div>
            <h3 className="text-xl font-extrabold text-white">
              Tabriklaymiz! Pazl yig'ildi!
            </h3>
            <p className="text-xs text-slate-300">
              Siz {moves} ta harakat bilan {formatTime(elapsedTime)} daqiqada rasmni to'liq terib chiqdingiz.
            </p>
            <div className="pt-2">
              <button
                onClick={shuffleTiles}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-900/40 inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Yana o'ynash</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowPreview(false)}
        >
          <div className="relative max-w-sm w-full bg-slate-900 border border-slate-750 rounded-2xl p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">To'liq namuna surati</h4>
              <button onClick={() => setShowPreview(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="rounded-xl overflow-hidden border border-slate-700 aspect-square bg-slate-950">
              <img
                src={selectedImage.src}
                alt={selectedImage.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-xs text-amber-400 text-center font-medium">
              {selectedImage.name} ({selectedImage.authorLabel})
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
