import React, { useState } from 'react';
import { textbookStoryPages, storyCharacters } from '../data/storyData';
import { Character, TextbookPageSection } from '../types';
import { 
  ChevronRight, 
  ChevronLeft, 
  Volume2, 
  BookOpen, 
  Users, 
  Quote, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  VolumeX,
  BookMarked,
  ListFilter,
  Check,
  Feather
} from 'lucide-react';
import { playTapSound, playWolfHowl } from '../utils/audio';

export const StoryView: React.FC = () => {
  const [currentPageIdx, setCurrentPageIdx] = useState(0);
  const [readingMode, setReadingMode] = useState<'page' | 'continuous'>('page');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [readPages, setReadPages] = useState<number[]>([32]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentPage = textbookStoryPages[currentPageIdx];

  const handleNext = () => {
    playTapSound();
    if (currentPageIdx < textbookStoryPages.length - 1) {
      const nextIdx = currentPageIdx + 1;
      setCurrentPageIdx(nextIdx);
      if (!readPages.includes(textbookStoryPages[nextIdx].pageNumber)) {
        setReadPages([...readPages, textbookStoryPages[nextIdx].pageNumber]);
      }
      stopSpeech();
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    playTapSound();
    if (currentPageIdx > 0) {
      setCurrentPageIdx(currentPageIdx - 1);
      stopSpeech();
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const handleSelectPage = (idx: number) => {
    playTapSound();
    setCurrentPageIdx(idx);
    if (!readPages.includes(textbookStoryPages[idx].pageNumber)) {
      setReadPages([...readPages, textbookStoryPages[idx].pageNumber]);
    }
    stopSpeech();
  };

  const handleToggleSpeech = (section?: TextbookPageSection) => {
    playTapSound();
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const target = section || currentPage;
        const textToRead = `${target.pageTitle}. ${target.subtitle}. ${target.paragraphs.join(' ')}`;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = 0.93;
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }
    }
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
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
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-amber-950/40 p-5 sm:p-7 border border-slate-800 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-amber-400 font-medium">
              <span>Maktab darsligi to'liq matni</span>
              <span>·</span>
              <span>Tog'ay Murod tarjimasi</span>
              <span>·</span>
              <span>32 — 39-betlar</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              LOBO (qisqartirib olindi)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Ernest Seton-Tompson qalamiga mansub, o'zbek adabiyotining ulug' adibi <strong>Tog'ay Murod</strong> mahorat bilan tarjima qilgan asl darslik matni.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                playTapSound();
                setSelectedCharacter(storyCharacters[0]);
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-medium flex items-center gap-1.5 border border-slate-700 transition-colors"
            >
              <Users className="w-4 h-4 text-amber-400" />
              <span>Qahramonlar</span>
            </button>
            <button
              onClick={() => {
                playTapSound();
                playWolfHowl();
              }}
              className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-xs text-amber-300 font-semibold flex items-center gap-1.5 border border-amber-500/40 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Bo'ri uvillashi</span>
            </button>
          </div>
        </div>

        {/* Story Reading Progress Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>O'qilgan sahifalar:</span>
            <span className="font-semibold text-white">{readPages.length} / {textbookStoryPages.length}</span>
          </div>
          <div className="flex-1 max-w-xs bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-amber-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${(readPages.length / textbookStoryPages.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Reading Mode Switcher & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => {
              playTapSound();
              setReadingMode('page');
            }}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors flex items-center gap-1.5 ${
              readingMode === 'page' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>Sahifama-sahifa</span>
          </button>
          <button
            onClick={() => {
              playTapSound();
              setReadingMode('continuous');
            }}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors flex items-center gap-1.5 ${
              readingMode === 'continuous' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>To'liq kitob holatida</span>
          </button>
        </div>

        {/* Audio Speech & Font Size Controls */}
        <div className="flex items-center gap-2">
          {'speechSynthesis' in window && (
            <button
              onClick={() => handleToggleSpeech()}
              title={isSpeaking ? "Ovozni to'xtatish" : "Sahifani ovozli tinglash"}
              className={`min-h-[36px] px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition-colors ${
                isSpeaking
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400 animate-pulse'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isSpeaking ? "To'xtatish" : "Tinglash"}</span>
            </button>
          )}

          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => {
                playTapSound();
                setFontSize('normal');
              }}
              className={`px-2.5 py-0.5 text-xs rounded font-medium ${fontSize === 'normal' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              title="Standart shrift"
            >
              A
            </button>
            <button
              onClick={() => {
                playTapSound();
                setFontSize('large');
              }}
              className={`px-2.5 py-0.5 text-xs rounded font-medium ${fontSize === 'large' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              title="Kattaroq shrift"
            >
              A+
            </button>
            <button
              onClick={() => {
                playTapSound();
                setFontSize('xlarge');
              }}
              className={`px-2.5 py-0.5 text-xs rounded font-medium ${fontSize === 'xlarge' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              title="Eng katta shrift"
            >
              A++
            </button>
          </div>
        </div>
      </div>

      {/* Page Tabs Strip (when in page mode) */}
      {readingMode === 'page' && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {textbookStoryPages.map((pg, idx) => {
            const isCurrent = idx === currentPageIdx;
            const isRead = readPages.includes(pg.pageNumber);
            return (
              <button
                key={`page-nav-${pg.pageNumber}`}
                onClick={() => handleSelectPage(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap shrink-0 flex items-center gap-2 transition-all border ${
                  isCurrent
                    ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md shadow-amber-900/20'
                    : isRead
                    ? 'bg-slate-900/90 text-slate-200 border-slate-700 hover:border-slate-600'
                    : 'bg-slate-900/40 text-slate-400 border-slate-800 hover:text-slate-300'
                }`}
              >
                {isRead && !isCurrent ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <BookMarked className={`w-3.5 h-3.5 ${isCurrent ? 'text-slate-950' : 'text-amber-400'}`} />
                )}
                <span>{pg.pageNumber}-bet</span>
              </button>
            );
          })}
        </div>
      )}

      {/* MODE 1: Single Page Reader */}
      {readingMode === 'page' && (
        <article className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-9 shadow-xl space-y-6">
          {/* Header Info */}
          <div className="pb-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                  Darslikning {currentPage.pageNumber}-beti
                </span>
                <span className="text-xs text-slate-400">· 8-sinf Adabiyot</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1.5">
                {currentPage.pageTitle}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {currentPage.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="text-xs text-slate-300 font-mono bg-slate-950 px-3 py-1 rounded-lg border border-slate-800 shrink-0 flex items-center gap-1.5">
                <Feather className="w-3.5 h-3.5 text-amber-400" />
                <span>Tog'ay Murod tarjimasi</span>
              </span>
            </div>
          </div>

          {/* Darslik Lug'ati */}
          {currentPage.vocabulary && currentPage.vocabulary.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <BookOpen className="w-4 h-4" />
                <span>Darslik lug'ati (Sahifadagi so'zlar ma'nosi):</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {currentPage.vocabulary.map((vocab, vIdx) => (
                  <div key={`curr-vocab-${currentPage.pageNumber}-${vIdx}`} className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-200 flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-amber-300 font-semibold">{vocab.word}</strong> — {vocab.meaning}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Darslikdagi mulohaza savoli */}
          {currentPage.textbookQuestion && (
            <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-500/40 space-y-1.5 text-xs text-sky-200">
              <div className="flex items-center gap-1.5 font-bold text-sky-400">
                <HelpCircle className="w-4 h-4" />
                <span>Darslikdagi mulohaza savoli:</span>
              </div>
              <p className="italic text-sm text-sky-100">
                «{currentPage.textbookQuestion}»
              </p>
            </div>
          )}

          {/* Pure Full Transcribed Text Paragraphs */}
          <div className={`space-y-5 text-slate-100 font-serif ${getTextClass()}`}>
            {currentPage.paragraphs.map((p, pIdx) => (
              <p key={`curr-para-${currentPage.pageNumber}-${pIdx}`} className="indent-6 sm:indent-8 text-justify leading-relaxed tracking-wide">
                {p}
              </p>
            ))}
          </div>

          {/* Key Quote Callout */}
          {currentPage.keyQuote && (
            <div className="my-6 rounded-xl bg-slate-950/90 p-5 border-l-4 border-amber-500 relative shadow-inner">
              <Quote className="w-7 h-7 text-amber-500/20 absolute right-3 top-3" />
              <blockquote className="text-base sm:text-lg italic text-amber-100 font-serif leading-relaxed">
                «{currentPage.keyQuote}»
              </blockquote>
              <p className="text-xs text-amber-400 mt-2 font-sans font-medium flex items-center gap-1.5">
                <span>— Tog'ay Murod tarjimasi</span>
                <span>·</span>
                <span>{currentPage.pageNumber}-bet</span>
              </p>
            </div>
          )}

          {/* Pagination Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800 gap-3">
            <button
              onClick={handlePrev}
              disabled={currentPageIdx === 0}
              className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 border transition-colors ${
                currentPageIdx === 0
                  ? 'opacity-40 cursor-not-allowed bg-slate-900 border-slate-800 text-slate-500'
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Oldingi sahifa ({currentPageIdx > 0 ? `${textbookStoryPages[currentPageIdx - 1].pageNumber}-bet` : ''})</span>
            </button>

            <span className="text-xs text-slate-400 font-medium">
              {currentPage.pageNumber} / 39-bet
            </span>

            <button
              onClick={handleNext}
              disabled={currentPageIdx === textbookStoryPages.length - 1}
              className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 border transition-colors ${
                currentPageIdx === textbookStoryPages.length - 1
                  ? 'opacity-40 cursor-not-allowed bg-slate-900 border-slate-800 text-slate-500'
                  : 'bg-amber-500 hover:bg-amber-400 border-amber-400 text-slate-950 font-bold shadow-md shadow-amber-900/20'
              }`}
            >
              <span>Keyingi sahifa ({currentPageIdx < textbookStoryPages.length - 1 ? `${textbookStoryPages[currentPageIdx + 1].pageNumber}-bet` : ''})</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </article>
      )}

      {/* MODE 2: Continuous Full Story Reader */}
      {readingMode === 'continuous' && (
        <div className="space-y-8">
          {textbookStoryPages.map((page, idx) => (
            <article
              key={page.pageNumber}
              className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-9 shadow-xl space-y-5"
            >
              <div className="pb-3 border-b border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                    {page.pageNumber}-bet
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {page.pageTitle}
                  </h3>
                </div>
                {'speechSynthesis' in window && (
                  <button
                    onClick={() => handleToggleSpeech(page)}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
                    title="Ushbu sahifani tinglash"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {page.vocabulary && page.vocabulary.length > 0 && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-1.5 text-xs">
                  <span className="font-bold text-amber-400 block">Lug'at:</span>
                  <div className="flex flex-wrap gap-2">
                    {page.vocabulary.map((v, vIdx) => (
                      <span key={`cont-vocab-${page.pageNumber}-${vIdx}`} className="bg-slate-950/80 px-2 py-1 rounded border border-slate-800 text-slate-200">
                        <strong className="text-amber-300">{v.word}</strong> — {v.meaning}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {page.textbookQuestion && (
                <div className="p-3.5 bg-sky-950/40 border border-sky-500/40 rounded-xl text-xs text-sky-200 italic">
                  <strong>Savol:</strong> «{page.textbookQuestion}»
                </div>
              )}

              <div className={`space-y-4 text-slate-100 font-serif ${getTextClass()}`}>
                {page.paragraphs.map((p, pIdx) => (
                  <p key={`cont-para-${page.pageNumber}-${pIdx}`} className="indent-6 sm:indent-8 text-justify leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

              {page.keyQuote && (
                <div className="my-4 rounded-xl bg-slate-950/90 p-4 border-l-4 border-amber-500">
                  <p className="text-sm italic text-amber-100 font-serif">
                    «{page.keyQuote}»
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>
      )}

      {/* Character Modal */}
      {selectedCharacter && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-750 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl">
                  🐺
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedCharacter.name}</h3>
                  <p className="text-xs text-amber-400 font-medium">{selectedCharacter.role}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCharacter(null)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
              >
                Yopish
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedCharacter.description}
            </p>

            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Asosiy xususiyatlari:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedCharacter.traits.map((trait, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-xs bg-slate-800 text-amber-300 px-2.5 py-1 rounded-lg border border-slate-700"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
              <span className="text-xs font-semibold text-rose-400 block mb-1">
                Qahramon qismati:
              </span>
              <p className="text-xs text-slate-300">
                {selectedCharacter.fate}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
