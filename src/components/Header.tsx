import React, { useState } from 'react';
import { Volume2, VolumeX, Smartphone, Monitor, Sparkles } from 'lucide-react';
import { playWolfHowl, playTapSound, toggleAmbientWilderness } from '../utils/audio';

interface HeaderProps {
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
  activeTabTitle: string;
}

export const Header: React.FC<HeaderProps> = ({
  isMobileFrame,
  setIsMobileFrame,
  activeTabTitle,
}) => {
  const [isHowling, setIsHowling] = useState(false);
  const [isAmbientOn, setIsAmbientOn] = useState(false);

  const handleHowl = () => {
    setIsHowling(true);
    playWolfHowl();
    setTimeout(() => setIsHowling(false), 3800);
  };

  const handleAmbientToggle = () => {
    playTapSound();
    const nextState = !isAmbientOn;
    toggleAmbientWilderness(nextState);
    setIsAmbientOn(nextState);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 text-slate-100">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Zone: Clean 1-line text wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-black text-lg shadow-md shadow-amber-900/30 ring-1 ring-amber-400/40">
            🐺
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold tracking-tight text-base sm:text-lg text-white">
                Lobo
              </span>
              <span className="text-xs text-amber-400 font-medium tracking-wide">
                Karrampo Qiroli
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-none hidden sm:block">
              Ernest Seton-Tompson asari
            </p>
          </div>
        </div>

        {/* Center: Current section badge */}
        <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800">
          <span>Bo'lim:</span>
          <span className="text-amber-300 font-medium">{activeTabTitle}</span>
        </div>

        {/* Right Zone: Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Ambient sound toggle */}
          <button
            onClick={handleAmbientToggle}
            title={isAmbientOn ? "O'rmon shabodasi: Yoqilgan" : "O'rmon shabodasini yoqish"}
            className={`min-h-[40px] px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors border ${
              isAmbientOn
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            {isAmbientOn ? <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{isAmbientOn ? "Shaboda faol" : "Tabiat sasi"}</span>
          </button>

          {/* Wolf Howl Trigger */}
          <button
            onClick={handleHowl}
            disabled={isHowling}
            title="Loboning ovozini tinglash"
            className={`min-h-[40px] px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm border ${
              isHowling
                ? 'bg-amber-500 text-slate-950 font-semibold border-amber-300 animate-pulse'
                : 'bg-amber-600/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${isHowling ? 'animate-spin' : ''}`} />
            <span>{isHowling ? "Uvillamoqda..." : "Bo'ri nolasini tinglash"}</span>
          </button>

          {/* Mobile frame view toggle for desktop screens */}
          <button
            onClick={() => {
              playTapSound();
              setIsMobileFrame(!isMobileFrame);
            }}
            title={isMobileFrame ? "Keng ekranga o'tish" : "Mobil ramkada ko'rish"}
            className="hidden lg:flex min-h-[40px] px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 items-center gap-1.5 transition-colors"
          >
            {isMobileFrame ? (
              <>
                <Monitor className="w-4 h-4 text-amber-400" />
                <span>Keng ekran</span>
              </>
            ) : (
              <>
                <Smartphone className="w-4 h-4 text-amber-400" />
                <span>Mobil ramka</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
