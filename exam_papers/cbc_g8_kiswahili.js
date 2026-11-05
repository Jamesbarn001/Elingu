const { mcq, term, buildPaper } = require('./helpers');

module.exports = buildPaper({
  id: 'elingu_cbc_g8_kiswahili_set1',
  curriculum: 'CBC',
  grade: 8,
  gradeRange: [7, 9],
  subject: 'Kiswahili',
  scale: 'CBC',
  title: 'Kiswahili Darasa la Nane — Mtihani wa Mazoezi 1',
  series: 'Mtihani wa mazoezi wa Elingu, mtindo wa KJSEA',
  durationMinutes: 40,
  instructions: 'Jibu maswali yote. Sehemu A: chagua jibu sahihi. Sehemu B: andika jibu fupi. Kila swali lina alama 1.'
}, [
  {
    title: 'Sehemu A — Chagua jibu sahihi',
    instructions: 'Kila swali lina alama 1.',
    questions: [
      mcq('Sarufi: Ngeli na wingi', 'Wingi wa "mtoto" ni…', ['mtoto', 'watoto', 'vitoto', 'wtoto'], 'B', 'Mtoto ni ngeli ya A-WA, kwa hivyo wingi ni watoto.'),
      mcq('Msamiati: Vinyume', 'Kinyume cha "mrefu" ni…', ['mkubwa', 'mwembamba', 'mfupi', 'mnene'], 'C', 'Mrefu ≠ mfupi.'),
      mcq('Sarufi: Vitenzi', 'Katika sentensi "Mama anapika chakula", kitenzi ni…', ['anapika', 'Mama', 'chakula', 'hakuna'], 'A', 'Kitenzi ni neno linaloonyesha tendo. Anapika ni kitenzi.'),
      mcq('Sarufi: Ngeli na wingi', 'Wingi wa "kitabu" ni…', ['kitabu', 'vitabu', 'zitabu', 'witabu'], 'B', 'Kitabu ni ngeli ya KI-VI, kwa hivyo wingi ni vitabu.'),
      mcq('Msamiati: Visawe', 'Kisawe cha "furaha" ni…', ['huzuni', 'raha', 'hasira', 'chuki'], 'B', 'Furaha na raha zinakaribiana kwa maana.'),
      mcq('Sarufi: Nomino', 'Neno "Nairobi" ni nomino ya…', ['kawaida', 'pekee', 'dhahania', 'wingi'], 'B', 'Jina la mahali maalumu ni nomino ya pekee.'),
      mcq('Sarufi: Nyakati', 'Sentensi "Nilikula ugali" iko katika wakati gani?', ['uliopita', 'uliopo', 'ujao', 'wa mazoea'], 'A', 'Kiambishi -li- kinaonyesha wakati uliopita.'),
      mcq('Sarufi: Nyakati', 'Kiambishi cha wakati ujao ni…', ['-li-', '-na-', '-ta-', '-me-'], 'C', '-ta- huonyesha wakati ujao, k.m. atakuja.'),
      mcq('Methali', 'Methali "Haraka haraka haina baraka" ina maana…', ['Mtu mwepesi hushinda kila wakati.', 'Kufanya jambo kwa haraka kunaweza kuleta makosa.', 'Baraka hupatikana kwa kukimbia.', 'Haraka ni jambo zuri sana.'], 'B', 'Methali hii inaonya kwamba kufanya mambo kwa pupa huleta makosa.'),
      mcq('Msamiati', 'Mtu anayefundisha shuleni huitwa…', ['daktari', 'mwalimu', 'mkulima', 'dereva'], 'B', 'Mwalimu hufundisha shuleni.'),
      mcq('Msamiati', 'Mahali ambapo wagonjwa hupata matibabu huitwa…', ['soko', 'hospitali', 'kanisa', 'uwanja'], 'B', 'Wagonjwa hutibiwa hospitalini.'),
      mcq('Msamiati: Siku za wiki', 'Siku inayofuata Jumatano ni…', ['Jumanne', 'Alhamisi', 'Ijumaa', 'Jumamosi'], 'B', 'Jumatatu, Jumanne, Jumatano, Alhamisi, Ijumaa, Jumamosi, Jumapili.'),
      mcq('Msamiati: Vinyume', 'Kinyume cha "ndani" ni…', ['juu', 'chini', 'nje', 'mbele'], 'C', 'Ndani ≠ nje.'),
      mcq('Hesabu kwa Kiswahili', 'Namba 20 kwa Kiswahili ni…', ['kumi', 'thelathini', 'ishirini', 'arobaini'], 'C', '20 = ishirini.'),
      mcq('Sarufi: Ngeli na wingi', 'Wingi wa "ndege" (mnyama anayeruka) ni…', ['ndege', 'wandege', 'vindege', 'ndegee'], 'A', 'Ndege ni ngeli ya I-ZI na wingi wake ni ndege (hubaki vilevile).')
    ]
  },
  {
    title: 'Sehemu B — Majibu mafupi',
    instructions: 'Andika neno moja au maneno machache.',
    questions: [
      term('Ngeli na wingi', 'Andika wingi wa "mti".', ['miti'], 1, 'Mti → miti (ngeli ya U-I).'),
      term('Vinyume', 'Andika kinyume cha "juu".', ['chini'], 1, 'Juu ≠ chini.'),
      term('Msamiati', 'Andika kwa Kiswahili: "water".', ['maji'], 1, 'Water = maji.'),
      term('Miezi', 'Taja mwezi wa kwanza wa mwaka.', ['januari'], 1, 'Mwezi wa kwanza ni Januari.'),
      term('Ngeli na wingi', 'Andika wingi wa "mwalimu".', ['walimu'], 1, 'Mwalimu → walimu (ngeli ya A-WA).'),
      term('Methali', 'Kamilisha methali: "Mwacha mila ni ____".', ['mtumwa'], 1, 'Mwacha mila ni mtumwa.'),
      term('Methali', 'Kamilisha methali: "Haba na haba hujaza ____".', ['kibaba'], 1, 'Haba na haba hujaza kibaba.'),
      term('Nyakati', 'Andika "I read" kwa Kiswahili katika wakati uliopita.', ['nilisoma'], 1, 'Ni- (mimi) + -li- (uliopita) + soma = nilisoma.'),
      term('Maarifa ya jumla', 'Taja jina la mji mkuu wa Kenya.', ['nairobi'], 1, 'Mji mkuu wa Kenya ni Nairobi.'),
      term('Msamiati', 'Andika kwa Kiswahili: "book".', ['kitabu'], 1, 'Book = kitabu.')
    ]
  }
]);
