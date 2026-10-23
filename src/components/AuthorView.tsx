import React, { useState } from 'react';
import { authorData, AuthorTimelineItem } from '../data/authorData';
import { 
  Compass, 
  BookOpen, 
  Calendar, 
  MapPin, 
  Palette, 
  Award, 
  Quote, 
  ZoomIn, 
  X, 
  Volume2, 
  VolumeX, 
  Check, 
  Sparkles 
} from 'lucide-react';
import { playTapSound } from '../utils/audio';

export const AuthorView: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'textbook' | 'biography' | 'timeline' | 'books'>('textbook');
  const [isReadingTextbook, setIsReadingTextbook] = useState(false);
  const [selectedTimelineItem, setSelectedTimelineItem] = useState<AuthorTimelineItem | null>(null);

  const handleReadTextbook = () => {
    playTapSound();
    if ('speechSynthesis' in window) {
      if (isReadingTextbook) {
        window.speechSynthesis.cancel();
        setIsReadingTextbook(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(authorData.textbookExcerpt);
        utterance.rate = 0.95;
        utterance.onend = () => setIsReadingTextbook(false);
        utterance.onerror = () => setIsReadingTextbook(false);
        window.speechSynthesis.speak(utterance);
        setIsReadingTextbook(true);
      }
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Hero Header with Author Portraits */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-stone-900 p-5 sm:p-8 border border-slate-800 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Main Author Portrait 1 (Uploaded asset image_0d9cf66a.png) */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center gap-4">
            <div className="relative group cursor-pointer" onClick={() => setSelectedImage(authorData.images.portraitFormal)}>
              <div className="w-44 h-56 sm:w-48 sm:h-60 rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl relative bg-slate-950">
                <img
                  src={authorData.images.portraitFormal}
                  alt="Ernest Seton-Tompson portreti"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[11px] font-medium">
                  <span>Rasmiy portret</span>
                  <ZoomIn className="w-3.5 h-3.5 text-amber-400 opacity-90" />
                </div>
              </div>
            </div>

            {/* Second Portrait (Uploaded asset image_089bb184.png) */}
            <div className="relative group cursor-pointer" onClick={() => setSelectedImage(authorData.images.portraitNature)}>
              <div className="w-32 h-40 rounded-xl overflow-hidden border border-slate-700 shadow-lg relative bg-slate-950">
                <img
                  src={authorData.images.portraitNature}
                  alt="Ernest Seton-Tompson tabiat qo'ynida"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between text-white text-[10px]">
                  <span>Tabiatda</span>
                  <ZoomIn className="w-3 h-3 text-amber-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Author Details & Bio Summary */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-amber-400 font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {authorData.birthPlace}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {authorData.lifeSpan}
              </span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {authorData.fullName}
              </h1>
              <p className="text-sm font-semibold text-amber-300 mt-1">
                {authorData.profession}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Inglizcha: <span className="text-slate-300 font-mono">{authorData.originalName}</span>
              </p>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {authorData.legacy}
            </p>

            {/* Key Accomplishments Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
              <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Palette className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Animalist rassom</div>
                  <div className="text-[10px] text-slate-400">O'z asarlariga rasm chizgan</div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Amerika skautlari</div>
                  <div className="text-[10px] text-slate-400">Dastur asoschisi</div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Tabiatshunos olim</div>
                  <div className="text-[10px] text-slate-400">Hayvonlar himoyachisi</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-900 rounded-xl border border-slate-800 overflow-x-auto">
        <button
          onClick={() => {
            playTapSound();
            setActiveTab('textbook');
          }}
          className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'textbook'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Darslikdagi asl matn</span>
        </button>

        <button
          onClick={() => {
            playTapSound();
            setActiveTab('biography');
          }}
          className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'biography'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Lobo va Muallif tarixi</span>
        </button>

        <button
          onClick={() => {
            playTapSound();
            setActiveTab('timeline');
          }}
          className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'timeline'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Hayot yo'li (1860–1946)</span>
        </button>

        <button
          onClick={() => {
            playTapSound();
            setActiveTab('books');
          }}
          className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'books'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Mashhur kitoblari</span>
        </button>
      </div>

      {/* Tab 1: Textbook Original Scan & Verbatim Content */}
      {activeTab === 'textbook' && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-7 space-y-5 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Maktab darsligidan rasmiy parcha
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  Ernest Seton-Tompson haqida ma'lumot
                </h3>
              </div>

              {'speechSynthesis' in window && (
                <button
                  onClick={handleReadTextbook}
                  className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-2 border transition-colors self-start sm:self-center ${
                    isReadingTextbook
                      ? 'bg-amber-500/20 text-amber-300 border-amber-400 animate-pulse'
                      : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-750'
                  }`}
                >
                  {isReadingTextbook ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span>{isReadingTextbook ? "Ovozni to'xtatish" : "Matnni ovozli tinglash"}</span>
                </button>
              )}
            </div>

            <div className="space-y-4">
              {/* Verified Text Pure Layout */}
              <div className="bg-slate-950/90 rounded-2xl p-6 sm:p-8 border border-slate-800 text-slate-100 text-base sm:text-lg leading-relaxed space-y-4 font-serif shadow-inner">
                <p className="first-letter:text-3xl sm:first-letter:text-4xl first-letter:font-bold first-letter:text-amber-400 first-letter:mr-1">
                  «Mashhur yozuvchi, rassom va tabiatshunos olim Ernest Seton-Tompson (1860–1946) Angliyadagi kichik shaharlardan birida tug'ilgan. Ernest olti yoshligida oilasi Kanadaga ko'chib o'tadi va shundan so'ng uning butun hayoti Shimoliy Amerika o'rmon va adirlarida kechadi.»
                </p>
                <p>
                  «Ernest Seton-Tompson bolaligidan tabiatga mehr qo'ydi, hayvonlarni kuzatib, ularni o'rgandi. Keyinchalik tabiat va hayvonlar haqida yozgan badiiy va ilmiy asarlari, ularga chizgan rasmlari unga shuhrat keltirdi. U asos solgan "Amerika skautlari" dasturi bolalar va o'smirlarni tabiat bilan tanishtirishga katta hissa qo'shdi.»
                </p>
              </div>

                {/* Key Points Checklist Extracted from Textbook */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Darslikdan o'rganilgan muhim faktlar:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800 flex items-start gap-2 text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>1860–1946</strong>: 86 yil umr ko'rgan</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800 flex items-start gap-2 text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Angliya</strong>: Tug'ilgan vatani</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800 flex items-start gap-2 text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>6 yoshida</strong>: Kanadaga ko'chib o'tgan</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800 flex items-start gap-2 text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Amerika skautlari</strong>: Dastur asoschisi</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Tab 2: Biography & The Lobo turning point */}
      {activeTab === 'biography' && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-4 shadow-xl">
            <h3 className="text-xl font-bold text-white">
              Ernest Seton-Tompson va Lobo: Hayotiy burilish nuqtasi
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed text-justify">
              {authorData.biographyOverview}
            </p>

            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/30 via-slate-950 to-slate-950 border border-amber-500/30 space-y-2 mt-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                <Quote className="w-4 h-4" />
                <span>Muallifning hayotiy iqrori</span>
              </div>
              <p className="text-sm italic text-amber-100 font-serif">
                "{authorData.quotes[1].quote}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Interactive Timeline */}
      {activeTab === 'timeline' && (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Xronologik jadval
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">
                Ernest Seton-Tompson hayot yo'li (1860 — 1946)
              </h3>
            </div>
          </div>

          <div className="relative border-l-2 border-slate-700 ml-4 sm:ml-6 space-y-6 py-2">
            {authorData.timeline.map((item, idx) => (
              <div key={`timeline-${item.year}-${idx}`} className="relative pl-6 sm:pl-8 group">
                {/* Dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-amber-400 group-hover:scale-125 transition-transform" />

                <div 
                  onClick={() => {
                    playTapSound();
                    setSelectedTimelineItem(item);
                  }}
                  className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {item.year}
                    </span>
                    <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {item.tag}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-300">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Famous Books Gallery */}
      {activeTab === 'books' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {authorData.famousWorks.map((book, bIdx) => (
            <div
              key={`book-${book.year}-${bIdx}`}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-base font-bold text-white">{book.title}</h4>
                  <p className="text-xs text-amber-400 font-mono italic">
                    {book.originalTitle} ({book.year})
                  </p>
                </div>
                <BookOpen className="w-5 h-5 text-amber-400 shrink-0" />
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {book.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Image Zoom Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-2xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 p-2 text-white bg-slate-800 hover:bg-slate-700 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedImage}
              alt="Kattalashtirilgan rasm"
              className="max-h-[82vh] w-auto object-contain rounded-xl shadow-2xl border border-slate-700"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}
    </div>
  );
};
