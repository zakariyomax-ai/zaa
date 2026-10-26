import React, { useState, useEffect } from 'react';
import {
  fullStoryTitle,
  fullStorySubtitle,
  storyAttribution,
  fullStoryParagraphs,
  storyVocabulary,
  storyQuestions,
  storyCharacters
} from '../data/storyData';
import { Character } from '../types';
import {
  Volume2,
  VolumeX,
  BookOpen,
  Users,
  HelpCircle,
  Feather,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';
import { playTapSound, playWolfHowl } from '../utils/audio';

export const StoryView: React.FC = () => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggleSpeech = () => {
    playTapSound();
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const textToRead = `${fullStoryTitle}. ${fullStoryParagraphs.join(' ')}`;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = 0.93;
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }
    }
  };

  const getTextClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-lg sm:text-xl leading-relaxed';
      case 'xlarge':
        return 'text-xl sm:text-2xl leading-loose';
      default:
        return 'text-base sm:text-lg leading-relaxed';
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      {/* Compact Editorial Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 px-4 py-3 rounded-2xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              playTapSound();
              setSelectedCharacter(storyCharacters[0]);
            }}
            className="min-h-[40px] px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-medium flex items-center gap-1.5 border border-slate-700 transition-colors"
          >
            <Users className="w-4 h-4 text-amber-400" />
            <span>Qahramonlar</span>
          </button>

          <button
            onClick={() => {
              playTapSound();
              playWolfHowl();
            }}
            className="min-h-[40px] px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-xs text-amber-300 font-semibold flex items-center gap-1.5 border border-amber-500/30 transition-colors"
          >
            <Volume2 className="w-4 h-4 text-amber-400" />
            <span>Bo'ri ovozi</span>
          </button>

          {'speechSynthesis' in window && (
            <button
              onClick={handleToggleSpeech}
              className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 border transition-colors ${
                isSpeaking
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isSpeaking ? "To'xtatish" : 'Tinglash'}</span>
            </button>
          )}
        </div>

        {/* Font Size Selector */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              playTapSound();
              setFontSize('normal');
            }}
            className={`min-h-[32px] px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
              fontSize === 'normal'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Standart shrift"
          >
            A
          </button>
          <button
            onClick={() => {
              playTapSound();
              setFontSize('large');
            }}
            className={`min-h-[32px] px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
              fontSize === 'large'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Kattaroq shrift"
          >
            A+
          </button>
          <button
            onClick={() => {
              playTapSound();
              setFontSize('xlarge');
            }}
            className={`min-h-[32px] px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
              fontSize === 'xlarge'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Eng katta shrift"
          >
            A++
          </button>
        </div>
      </div>

      {/* Single Unbroken Justified Column for the Entire Lobo Story */}
      <article className="rounded-2xl bg-slate-900/95 border border-slate-800 px-6 py-8 sm:px-10 sm:py-12 shadow-2xl">
        {/* Story Heading */}
        <header className="text-center pb-8 mb-8 border-b border-slate-800 space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs text-amber-400 font-medium">
            <span>Ernest Seton-Tompson</span>
            <span aria-hidden="true">·</span>
            <span>{fullStorySubtitle}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-serif">
            {fullStoryTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            {storyAttribution}
          </p>
        </header>

        {/* Continuous Single-Column Flush-Justified Body Text */}
        <div className={`space-y-5 text-slate-100 font-serif ${getTextClass()}`}>
          {fullStoryParagraphs.map((paragraph, idx) => (
            <p
              key={`lobo-story-para-${idx}`}
              className="text-justify hyphens-auto tracking-normal"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Translator Signature at End of Column */}
        <footer className="mt-10 pt-6 border-t border-slate-800 flex items-center justify-end gap-2 text-sm text-amber-400 font-serif italic">
          <Feather className="w-4 h-4" />
          <span>{storyAttribution}</span>
        </footer>
      </article>

      {/* Optional Collapsible Glossary & Questions Below the Finished Story */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden">
        <button
          onClick={() => {
            playTapSound();
            setShowGlossary(!showGlossary);
          }}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-800/40 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold text-white">
              Lug'at va mulohaza savollari
            </span>
          </div>
          {showGlossary ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {showGlossary && (
          <div className="px-6 pb-6 pt-2 border-t border-slate-800 space-y-6">
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Asardagi so'zlar izohi
              </h3>
              <div className="space-y-2 text-sm text-slate-300">
                {storyVocabulary.map((vocab, idx) => (
                  <div
                    key={`vocab-item-${idx}`}
                    className="py-1.5 border-b border-slate-800/60 last:border-b-0"
                  >
                    <strong className="text-white font-semibold">{vocab.word}</strong> — {vocab.meaning}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>Mulohaza uchun savollar</span>
              </div>
              <ol className="list-decimal list-inside space-y-2.5 text-sm text-slate-300 leading-relaxed">
                {storyQuestions.map((q, qIdx) => (
                  <li key={`story-question-${qIdx}`}>{q}</li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>

      {/* Characters Modal */}
      {selectedCharacter && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedCharacter(null)}
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Asar qahramonlari</h3>
              <button
                onClick={() => setSelectedCharacter(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                aria-label="Yopish"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Character Switcher Buttons */}
            <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              {storyCharacters.map((char, cIdx) => {
                const isActive = char.name === selectedCharacter.name;
                return (
                  <button
                    key={`char-select-${cIdx}`}
                    onClick={() => {
                      playTapSound();
                      setSelectedCharacter(char);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {char.name}
                  </button>
                );
              })}
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-lg font-bold text-white">{selectedCharacter.name}</h4>
                <p className="text-xs text-amber-400 font-medium mt-0.5">
                  {selectedCharacter.role}
                </p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed text-justify">
                {selectedCharacter.description}
              </p>

              <div className="pt-2 border-t border-slate-800">
                <span className="text-xs font-semibold text-slate-400 block mb-1.5">
                  Xususiyatlari:
                </span>
                <p className="text-xs text-amber-300">
                  {selectedCharacter.traits.join(' · ')}
                </p>
              </div>

              <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
                <span className="text-xs font-semibold text-rose-400 block mb-1">
                  Qahramon qismati:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedCharacter.fate}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
