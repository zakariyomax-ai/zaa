/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveTab } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { StoryView } from './components/StoryView';
import { AuthorView } from './components/AuthorView';
import { PuzzleView } from './components/PuzzleView';
import { QuizView } from './components/QuizView';
import { GamesView } from './components/GamesView';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('story');
  const [isMobileFrame, setIsMobileFrame] = useState(false);

  const tabTitles: Record<ActiveTab, string> = {
    story: 'Lobo hikoyasi',
    author: 'Ernest Seton-Tompson',
    puzzle: 'Pazllar',
    quiz: 'Testlar',
    games: "Interaktiv o'yinlar",
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Header */}
      <Header
        isMobileFrame={isMobileFrame}
        setIsMobileFrame={setIsMobileFrame}
        activeTabTitle={tabTitles[activeTab]}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-start p-3 sm:p-6 w-full">
        {isMobileFrame ? (
          /* Mobile Phone Mockup Frame for Realistic Mobile App feel */
          <div className="w-full max-w-[420px] rounded-[44px] border-[8px] border-slate-800 bg-slate-950 shadow-2xl overflow-hidden relative min-h-[780px] flex flex-col ring-1 ring-slate-700/60 my-2">
            {/* Phone Speaker/Dynamic Island Mock */}
            <div className="pt-2 pb-1 bg-slate-950 flex justify-center items-center z-30">
              <div className="w-24 h-4 bg-slate-900 rounded-full flex items-center justify-center border border-slate-800">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-950 mr-1.5" />
                <div className="w-2 h-2 rounded-full bg-slate-800" />
              </div>
            </div>

            {/* Scrollable Viewport */}
            <div className="flex-1 overflow-y-auto px-3 pt-2 pb-24 scrollbar-thin">
              {activeTab === 'story' && <StoryView />}
              {activeTab === 'author' && <AuthorView />}
              {activeTab === 'puzzle' && <PuzzleView />}
              {activeTab === 'quiz' && <QuizView />}
              {activeTab === 'games' && <GamesView />}
            </div>

            {/* Bottom Home Indicator */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-700 rounded-full z-50 pointer-events-none" />
          </div>
        ) : (
          /* Full Responsive Viewport */
          <div className="w-full max-w-5xl mx-auto">
            {activeTab === 'story' && <StoryView />}
            {activeTab === 'author' && <AuthorView />}
            {activeTab === 'puzzle' && <PuzzleView />}
            {activeTab === 'quiz' && <QuizView />}
            {activeTab === 'games' && <GamesView />}
          </div>
        )}
      </main>

      {/* Mobile-First Fixed Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
