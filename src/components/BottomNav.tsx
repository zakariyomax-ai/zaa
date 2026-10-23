import React from 'react';
import { BookOpen, User, Puzzle, GraduationCap, Gamepad2 } from 'lucide-react';
import { ActiveTab } from '../types';
import { playTapSound } from '../utils/audio';

interface BottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs: { key: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { key: 'story', label: 'Hikoya', icon: BookOpen },
    { key: 'author', label: 'Muallif', icon: User },
    { key: 'puzzle', label: 'Pazl', icon: Puzzle },
    { key: 'quiz', label: 'Testlar', icon: GraduationCap },
    { key: 'games', label: "O'yinlar", icon: Gamepad2 },
  ];

  const handleTabClick = (key: ActiveTab) => {
    playTapSound();
    setActiveTab(key);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-1.5 shadow-2xl">
      <div className="max-w-md mx-auto grid grid-cols-5 gap-1 items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab.key)}
              className={`min-h-[48px] flex flex-col items-center justify-center rounded-xl transition-all ${
                isActive
                  ? 'text-amber-400 bg-amber-500/10 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'}`} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-400" />
                )}
              </div>
              <span className="text-[11px] leading-tight mt-1 whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
