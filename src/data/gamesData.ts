import { StoryEventItem } from '../types';

export const storyChronologyEvents: StoryEventItem[] = [
  {
    id: 1,
    text: "Lobo Karrampo yaylovlarida to'dasi bilan hukmronlik qilib, chorvadorlarning barcha tuzoqlarini fosh etadi.",
    order: 1
  },
  {
    id: 2,
    text: "Chorvadorlar Ernest Seton-Tompsonni maxsus ovchi sifatida chaqirib, Loboga 1000 dollar mukofot va'da qilishadi.",
    order: 2
  },
  {
    id: 3,
    text: "Seton-Tompson strixnin zahari va ko'milgan qopqonlarni ishlatadi, ammo Lobo ularni tuproq sepib ochib tashlaydi.",
    order: 3
  },
  {
    id: 4,
    text: "Ovchi Loboning sevimli yo'ldoshi — oq bo'ri Blankani qopqonga tushirib o'ldiradi.",
    order: 4
  },
  {
    id: 5,
    text: "Lobo ayriliq alamida ehtiyotkorlikni unutib, Blankaning qonli izlari ortidan to'rt qopqonga tushadi.",
    order: 5
  },
  {
    id: 6,
    text: "Tutqunlikdagi Lobo odamlar taomini yemay, mag'rur holda jon beradi va Seton-Tompson qurolini tashlaydi.",
    order: 6
  }
];

export interface MemoryCard {
  id: number;
  pairKey: string;
  name: string;
  subtitle: string;
  iconName: string;
}

export const memoryCardPairs: Omit<MemoryCard, 'id'>[] = [
  { pairKey: 'lobo', name: 'Lobo', subtitle: 'Karrampo qiroli', iconName: 'Crown' },
  { pairKey: 'blanca', name: 'Blanka', subtitle: 'Oq bo\'ri', iconName: 'Heart' },
  { pairKey: 'author', name: 'Seton-Tompson', subtitle: 'Yozuvchi & olim', iconName: 'Feather' },
  { pairKey: 'trap', name: 'Po\'lat qopqon', subtitle: 'Ovchi quroli', iconName: 'ShieldAlert' },
  { pairKey: 'canyon', name: 'Karrampo darasi', subtitle: 'Nyu-Meksiko qirlari', iconName: 'Mountain' },
  { pairKey: 'scouts', name: 'Skautlik nishoni', subtitle: 'Yoshlar harakati', iconName: 'Compass' }
];
