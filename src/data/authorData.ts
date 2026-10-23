export interface AuthorTimelineItem {
  year: string;
  title: string;
  description: string;
  tag: string;
}

export interface AuthorBook {
  title: string;
  originalTitle: string;
  year: string;
  description: string;
}

export const authorData = {
  fullName: "Ernest Seton-Tompson",
  originalName: "Ernest Thompson Seton",
  lifeSpan: "1860 — 1946",
  profession: "Mashhur yozuvchi, rassom va tabiatshunos olim",
  birthPlace: "Saus-Shilds, Angliya",
  legacy: "Amerika skautlari va Woodcraft harakati asoschisi, animalist adabiyot otasi",
  
  // User uploaded image assets
  images: {
    portraitFormal: "/assets/aistudio/image_0d9cf66a.png", // Vintage portrait with suit & bow
    portraitNature: "/assets/aistudio/image_089bb184.png", // Outdoor natural portrait
    textbookScan: "/assets/aistudio/image_4f0fc208.png"    // Original textbook paragraph scan
  },

  // Exact verbatim text from textbook scan (image_4f0fc208.png)
  textbookExcerpt: `Mashhur yozuvchi, rassom va tabiatshunos olim Ernest Seton-Tompson (1860- 1946) Angliyadagi kichik shaharlardan birida tug'ilgan. Ernest olti yoshligida oilasi Kanadaga ko'chib o'tadi va shundan so'ng uning butun hayoti Shimoliy Amerika o'rmon va adirlarida kechadi.

Ernest Seton-Tompson bolaligidan tabiatga mehr qo'ydi, hayvonlarni kuzatib, ularni o'rgandi. Keyinchalik tabiat va hayvonlar haqida yozgan badiiy va ilmiy asarlari, ularga chizgan rasmlari unga shuhrat keltirdi. U asos solgan "Amerika skautlari" dasturi bolalar va o'smirlarni tabiat bilan tanishtirishga katta hissa qo'shdi.`,

  biographyOverview: `Ernest Seton-Tompson jahon animalistik adabiyotining eng ulug' namoyandalaridan biridir. U birinchilardan bo'lib hayvonlarga oddiy o'lja yoki qo'rqinchli yirtqich sifatida emas, balki his-tuyg'ularga, yuksak aql-idrokka, sadoqat va g'ururga ega bo'lgan mustaqil shaxsiyat sifatida qaradi.

1893-yilda u Nyu-Meksiko shtatidagi Karrampo vodiysiga afsonaviy bo'rilar podshosi Loboni ovlash uchun chaqiriladi. Biroq Loboning aqlbovardas aqli, qopqonlarni fosh etishi, o'z yo'ldoshi Blankaga bo'lgan samimiy muhabbati va tutqunlikdagi mag'rur o'limi yozuvchining butun qalbini larzaga soladi. Bu voqeadan so'ng Seton-Tompson ovchilikdan butunlay voz kechib, hayvonlarni himoya qilish, tabiatni asrash va yosh avlodni o'rmon sirlariga mehr bilan o'rgatish yo'lini tanladi.`,

  timeline: [
    {
      year: "1860",
      title: "Angliyada tavallud topishi",
      description: "Angliyaning shimoli-sharqidagi Saus-Shilds shahrida dunyoga keldi.",
      tag: "Bolalik"
    },
    {
      year: "1866",
      title: "Kanadaga ko'chib o'tish (6 yosh)",
      description: "Olti yoshligida oilasi bilan Kanadaga ko'chib ketdi. Uning butun bolaligi va yoshligi Shimoliy Amerika o'rmon va adirlarida kechdi.",
      tag: "Kanada davri"
    },
    {
      year: "1879",
      title: "San'at akademiyasi va tabiatni o'rganish",
      description: "Londondagi Qirollik San'at akademiyasida tahsil oldi. O'z asarlariga mohirona illyustratsiyalar chizish mahoratini egalladi.",
      tag: "Rassomlik"
    },
    {
      year: "1893",
      title: "Karrampoda Lobo bilan uchrashuv",
      description: "Nyu-Meksikoga Loboni ovlashga bordi. Loboning jasorati va fojeasi uning hayotga qarashini butunlay o'zgartirdi.",
      tag: "Burilish nuqtasi"
    },
    {
      year: "1898",
      title: "\"Yovvoyi hayvonlar haqida\" kitobi nashri",
      description: "\"Wild Animals I Have Known\" kitobi nashr etilib, jahon bo'ylab beqiyos shuhrat qozondi. Asar boshida Lobo tarixi turardi.",
      tag: "Adabiy parvoz"
    },
    {
      year: "1902",
      title: "\"Woodcraft Indians\" harakatiga asos solishi",
      description: "Yoshlarni tabiat bag'rida yashash, chodir qurish, o'rmonni asrash va jismoniy chiniqishga o'rgatuvchi harakat tuzdi.",
      tag: "Tashkilotchi"
    },
    {
      year: "1910",
      title: "\"Amerika skautlari\" dasturiga asos solinishi",
      description: "Robert Baden-Pauell bilan hamkorlikda Boy Scouts of America tashkilotini tuzdi va uning birinchi Bosh Skauti bo'ldi.",
      tag: "Skautlik"
    },
    {
      year: "1946",
      title: "Buyuk hayot xotimasi",
      description: "Nyu-Meksiko shtatining Santa-Fe shahrida 86 yoshida vafot etdi. U tabiatshunoslik va adabiyotga ulkan meros qoldirdi.",
      tag: "Meros"
    }
  ] as AuthorTimelineItem[],

  famousWorks: [
    {
      title: "Lobo — Karrampo qiroli",
      originalTitle: "Lobo, the King of Currumpaw",
      year: "1894",
      description: "Mag'rur bo'ri Lobo va uning sevgilisi Blanka haqidagi eng ta'sirli va fojiali hayotiy asar."
    },
    {
      title: "Yovvoyi yo'rg'a",
      originalTitle: "The Pacing Mustang",
      year: "1898",
      description: "Hech kim jilovlay olmagan erkinlik timsoli — asov poygachi tulpor haqidagi qissa."
    },
    {
      title: "Kichik yovvoyilar",
      originalTitle: "Two Little Savages",
      year: "1903",
      description: "O'rmonda o'z kuchlari bilan yashashni o'rgangan bolalar va tabiat sirlari haqidagi mashhur sarguzasht."
    },
    {
      title: "Rolf o'rmonda",
      originalTitle: "Rolf in the Woods",
      year: "1911",
      description: "Hindular hayoti va yovvoyi tabiat bilan uyg'un yashash odoblari ifodalangan ibratli roman."
    }
  ] as AuthorBook[],

  quotes: [
    {
      quote: "Men hayvonlar haqida yozganimda ularni insondek o'ylaydigan qilmayman, chunki ular o'z holicha ham ulug'vor va azizdir.",
      context: "Hayvonlar psixologiyasi haqida"
    },
    {
      quote: "Lobo menga yovvoyi tabiat dushmani emas, balki uning eng g'ururli shohi ekanini ko'rsatdi.",
      context: "Lobo bilan to'qnashuvdan keyin"
    },
    {
      quote: "Har bir yosh bola o'rmon sasini eshita olishi va tabiat bilan do'stlashishi kerak.",
      context: "Skautlar ta'limoti"
    }
  ]
};
