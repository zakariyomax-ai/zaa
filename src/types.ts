export type ActiveTab = 'story' | 'author' | 'puzzle' | 'quiz' | 'games';

export interface VocabularyWord {
  word: string;
  meaning: string;
}

export interface TextbookPageSection {
  pageNumber: number;
  imageSrc: string;
  pageTitle: string;
  subtitle: string;
  paragraphs: string[];
  vocabulary?: VocabularyWord[];
  textbookQuestion?: string;
  keyQuote?: string;
  illustrationNote?: string;
}

export interface Character {
  name: string;
  role: string;
  description: string;
  traits: string[];
  fate: string;
}

export interface QuizQuestion {
  id: number;
  category: 'story' | 'author' | 'nature' | 'textbook';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface StoryEventItem {
  id: number;
  text: string;
  order: number;
}
