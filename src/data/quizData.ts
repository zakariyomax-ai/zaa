import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  // 1. Darslik va Tarjima haqida savollar
  {
    id: 1,
    category: 'textbook',
    question: "Darslikdagi «Lobo» hikoyasini o'zbek tiliga kim mahorat bilan tarjima qilgan?",
    options: [
      "Tog'ay Murod",
      "Abdulla Qahhor",
      "O'tkir Hoshimov",
      "Erkin Vohidov"
    ],
    correctIndex: 0,
    explanation: "Darslikning 39-beti so'ngida aniq ko'rsatilganidek, asarni mashhur o'zbek adibi Tog'ay Murod tarjima qilgan."
  },
  {
    id: 2,
    category: 'textbook',
    question: "Darslik lug'atida «arloni» so'ziga qanday izoh berilgan?",
    options: [
      "Yetakchi, sardor",
      "Keksa ovchi",
      "Katta dara",
      "Yovvoyi o'simlik"
    ],
    correctIndex: 0,
    explanation: "32-betdagi darslik lug'atida: «arloni – yetakchi, sardor» deb keltirilgan."
  },
  {
    id: 3,
    category: 'textbook',
    question: "Ispan tilida «Lobo» so'zi qanday ma'noni anglatadi?",
    options: [
      "Sher",
      "Burgut",
      "Bo'ri",
      "Qoplon"
    ],
    correctIndex: 2,
    explanation: "32-betdagi darslik lug'atiga ko'ra: «Lobo (ispancha) – bo'ri» degan ma'noni bildiradi."
  },
  {
    id: 4,
    category: 'textbook',
    question: "«G'unajin» so'zi darslik lug'atida qanday izohlangan?",
    options: [
      "Urg'ochi qoramol",
      "Yosh bo'ri bolasi",
      "Kichik qopqon",
      "Ovchi oti"
    ],
    correctIndex: 0,
    explanation: "33-betdagi darslik lug'atida: «g'unajin – urg'ochi qoramol» deb yozilgan."
  },
  {
    id: 5,
    category: 'textbook',
    question: "Darslik xotimasida aytilgan «uch musibat» nimalardan iborat?",
    options: [
      "Kuch-quvvatidan, erkidan va juftidan ayrilish",
      "Ochlik, sovuq va qopqon",
      "Galasidan, o'ljasidan va darasidan mahrum bo'lish",
      "Yaralanish, kasallik va qarilik"
    ],
    correctIndex: 0,
    explanation: "39-betda: «U ham kuch-quvvatidan (sherdek), ham erkidan (burgutdek), ham juftidan (kaptardek) ayrildi» deb ta'riflangan."
  },

  // 2. Muallif Ernest Seton-Tompson haqida savollar (Darslikdagi rasmdan)
  {
    id: 6,
    category: 'author',
    question: "Ernest Seton-Tompson qaysi yillarda yashab ijod etgan?",
    options: [
      "1860 — 1946-yillar",
      "1880 — 1960-yillar",
      "1850 — 1920-yillar",
      "1875 — 1955-yillar"
    ],
    correctIndex: 0,
    explanation: "Darslik ma'lumotiga ko'ra, mashhur yozuvchi, rassom va tabiatshunos olim Ernest Seton-Tompson 1860–1946-yillarda yashagan."
  },
  {
    id: 7,
    category: 'author',
    question: "Ernest Seton-Tompson qayerda tug'ilgan va necha yoshida Kanadaga ko'chgan?",
    options: [
      "Angliyada tug'ilgan, 6 yoshida Kanadaga ko'chgan",
      "AQShda tug'ilgan, 10 yoshida ko'chgan",
      "Kanadada tug'ilgan, 15 yoshida Angliyaga borgan",
      "Fransiyada tug'ilgan, 3 yoshida ko'chgan"
    ],
    correctIndex: 0,
    explanation: "Darslik matnida: «Ernest Seton-Tompson Angliyadagi kichik shaharlardan birida tug'ilgan. Ernest olti yoshligida oilasi Kanadaga ko'chib o'tadi» deb yozilgan."
  },
  {
    id: 8,
    category: 'author',
    question: "Ernest Seton-Tompson bolalarni tabiat bilan tanishtirish uchun qaysi dasturga asos solgan?",
    options: [
      "«Amerika skautlari» dasturi",
      "«Yosh tabiatshunoslar» klubi",
      "«Yashil dunyo» jamiyati",
      "«Sayyohlar ittifoqi»"
    ],
    correctIndex: 0,
    explanation: "Darslik matnida: «U asos solgan 'Amerika skautlari' dasturi bolalar va o'smirlarni tabiat bilan tanishtirishga katta hissa qo'shdi» deyilgan."
  },

  // 3. Hikoya voqealari bo'yicha savollar
  {
    id: 9,
    category: 'story',
    question: "Loboning umri so'ngida uning galasida nechta bo'ri qolgan edi?",
    options: [
      "Bor-yo'g'i 5 ta pahlavon bo'ri",
      "30 dan ortiq bo'ri",
      "Faqat o'zi va Blanka",
      "15 ta bo'ri"
    ],
    correctIndex: 0,
    explanation: "32-bet matnida: «Loboning umri so'ngida uning galasida bor-yo'g'i beshta bo'ri qoldi. Ammo beshtasiyam shon-shuhrat qozongan, kuch-quvvatli bo'ri» deb yozilgan."
  },
  {
    id: 10,
    category: 'story',
    question: "Chorvadorlar Loboni tutgan odamga qancha mukofot puli tikishgan edi?",
    options: [
      "100 dollar",
      "500 dollar",
      "1000 dollar",
      "5000 dollar"
    ],
    correctIndex: 2,
    explanation: "34-betda: «mukofot Kurrumpoda hali-hozirgacha ko'z ko'rmagan, quloq eshitmagan bahoga – ming dollarga yetdi» deyilgan."
  },
  {
    id: 11,
    category: 'story',
    question: "Lobo Seton-Tompson pishloqqa joylagan strixnin zaharini qanday fosh etgan?",
    options: [
      "Daryoga oqizib yuborgan",
      "Pishloqlarni bir joyga to'plab, o'z tezagi bilan ko'mib ketgan",
      "Qopqonlarga qisib qo'ygan",
      "Qushlarga tashlab bergan"
    ],
    correctIndex: 1,
    explanation: "35-betda: «Lobo pishloqlarni yemay, og'zida bir joyga olib borib to'plab, o'zining tezagi bilan ko'mib ketganini ko'rdim. Bu Loboning mening hiylayi nayrangimga nisbatan bildirgan nafrati ifodasi edi»."
  },
  {
    id: 12,
    category: 'story',
    question: "Seton-Tompson Loboni tutish uchun daradagi so'qmoqlarga nechta po'lat qopqon qo'ygan edi?",
    options: [
      "130 ta po'lat qopqon",
      "20 ta qopqon",
      "50 ta qopqon",
      "300 ta qopqon"
    ],
    correctIndex: 0,
    explanation: "37-bet matnida: «Hammasi bo'lib bir yuz o'ttizta po'latdan yasalgan bo'ri qopqon bo'ldi. Qopqonlarni daraga boradigan so'qmoqlarning har bittasiga to'rttadan qo'yib chiqdim» deb yozilgan."
  },
  {
    id: 13,
    category: 'story',
    question: "Tutqunlikka tushgan Lobo odamlar bergan go'sht va suvga qanday munosabat bildirdi?",
    options: [
      "Hammasini yeb qo'ydi",
      "Qayrilib ham qaramadi, dasht-u daralarga termilib yotdi",
      "Idishlarni ag'darib tashladi",
      "G'azab bilan qafasni g'ajib tashladi"
    ],
    correctIndex: 1,
    explanation: "39-betda: «Men Loboning oldiga go'sht bilan suv qo'ydim, ammo u qayrilib ham qaramadi. U bag'rini yerga berib, sariq ko'zlarini o'zi hukm surgan olis dasht-u daralarga tikib yotardi»."
  }
];
