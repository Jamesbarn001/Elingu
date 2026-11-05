// ══════════════════════════════════════════════════════════════
// KICD COMPETENCY-BASED EDUCATION (CBE) — KISWAHILI ROADMAP
// Covers Upper Primary (Grade 6), JSS (Grades 7-9), & Senior School (Grade 10)
// Authentic KICD Syllabus Strands & Sub-strands (Mada Kuu na Mada Ndogo)
// ══════════════════════════════════════════════════════════════

const CBC_KISWAHILI_MAPS = {
  // ────────────────────────────────────────────────────────────
  // GRADE 8 (JUNIOR SCHOOL JSS)
  // ────────────────────────────────────────────────────────────
  8: {
    curriculum: 'CBC',
    grade: 8,
    subject: 'Kiswahili',
    title: 'Grade 8 Kiswahili Metro Line',
    stations: [
      {
        id: 'cbc_g8_kisw_s1',
        number: 1,
        title: 'Sarufi na Matumizi ya Lugha',
        strand: 'Mada Kuu 1: Sarufi',
        icon: '🗣️',
        status: 'available',
        summary: 'Upatanisho wa ngeli, nyakati na hali, aina za maneno, na miundo ya sentensi.',
        subtopics: [
          {
            id: 'cbc_g8_kisw_s1_1',
            title: 'Upatanisho wa Ngeli (A-WA hadi PA-KU-MU)',
            status: 'available',
            conceptPrimer: {
              title: 'Mlingano wa Nomino na Kitenzi',
              tagline: 'Kila nomino ina ngeli yake inayotawala viambishi vya maneno mengine',
              body: 'Katika lugha ya Kiswahili, nomino zote zimepangwa katika makundi yanayoitwa ngeli kulingana na jinsi zinavyoanza katika umoja na wingi. Nomino inapotumika katika sentensi, huamuru viambishi vitakavyotokea kwenye vitenzi, vivumishi, na viwakilishi. Huu ndio mlingano wa kisarufi (grammatical concord).',
              explanationSteps: [
                'Hatua 1: Tambua nomino katika sentensi na chunguza umbo lake katika umoja na wingi (k.m., Kiti / Viti).',
                'Hatua 2: Bainisha ngeli inayohusika (k.m., Kiti-Viti kipo katika ngeli ya KI-VI).',
                'Hatua 3: Hakikisha viambishi awali vya kitenzi vinalingana: Kiti ki-meanguka, Viti vi-meanguka.'
              ],
              workedExample: 'Nomino: Embe / Maembe (Ngeli ya LI-YA).\nUmoja: Embe li-meiva na li-tamalika vizuri.\nWingi: Maembe ya-meiva na ya-tamalika vizuri.',
              formula: 'Kiambishi cha Ngeli + Shina la Kitenzi = Muundo Sahihi',
              visualBadge: '🧩 Kadi za Mlingano wa Ngeli',
              realWorldContext: 'Kuzungumza na kuandika Kiswahili sanifu katika hotuba za shule, habari za redio, na vitabu.'
            },
            socraticPrompt: 'Ukipewa sentensi "Gari linaenda", ukibadilisha neno "Gari" kuwa wingi "Magari", ni nini kinachotokea kwenye kitenzi na kwa nini?',
            examFocus: 'Tathmini ya KJSEA: Kurekebisha makosa ya upatanisho wa ngeli katika aya fupi chini ya dakika 3.'
          },
          {
            id: 'cbc_g8_kisw_s1_2',
            title: 'Nyakati na Hali (-na-, -li-, -ta-, -me-, -ki-)',
            status: 'available',
            conceptPrimer: {
              title: 'Uwakilishaji wa Wakati Kisarufi',
              tagline: 'Viambishi vya kati huonyesha lini tendo lilipotendeka na jinsi lilivyofanyika',
              body: 'Tendo linaweza kutendeka sasa hivi (-na-), lilipita zamani (-li-), litatokea baadaye (-ta-), limetimia sasa hivi (-me-), au lina masharti/muendelezo (-ki-). Viambishi hivi huingizwa mara tu baada ya kiambishi awali cha nafsi au ngeli.',
              explanationSteps: [
                'Hatua 1: Tambua nafsi au mtenda (k.m., "A-" kwa yeye, "Wa-" kwa wao).',
                'Hatua 2: Chagua kiambishi sahihi cha wakati kulingana na tukio (-na- uliopo, -li- uliopita, -ta- ujao, -me- timilifu).',
                'Hatua 3: Unganisha na shina la kitenzi: A-li-soma (zamani), A-na-soma (sasa), A-ta-soma (baadaye).'
              ],
              workedExample: 'Shina: -cheza. Nafsi: Ni- (mimi).\nUliopita: Ni-li-cheza mpira jana.\nTimilifu: Ni-me-cheza mpira leo asubuhi.',
              formula: 'Kiambishi cha Nafsi + Kiambishi cha Wakati + Shina la Kitenzi',
              visualBadge: '⏳ Mstari wa Nyakati na Matukio',
              realWorldContext: 'Kueleza ripoti za matukio ya kihistoria na ratiba za safari za kila siku.'
            },
            socraticPrompt: 'Kuna tofauti gani kimaana kati ya sentensi "Mwanafunzi amesoma kitabu" na "Mwanafunzi alisoma kitabu"?',
            examFocus: 'KJSEA Model Item: Kubainisha viambishi vya nyakati na hali katika sentensi mseto.'
          }
        ]
      },
      {
        id: 'cbc_g8_kisw_s2',
        number: 2,
        title: 'Kusoma na Ufahamu wa Matini',
        strand: 'Mada Kuu 2: Kusoma',
        icon: '📖',
        status: 'available',
        summary: 'Kusoma kwa kina, kudadisi wazo kuu, msamiati muktadhani, na ufupisho wa makala.',
        subtopics: [
          {
            id: 'cbc_g8_kisw_s2_1',
            title: 'Kutambua Wazo Kuu na Ufupisho wa Makala',
            status: 'available',
            conceptPrimer: {
              title: 'Kung’oa Ngano Kutoka Kwenye Makapi',
              tagline: 'Ufupisho ni kutoa ujumbe msingi bila kupoteza kiini wala maana asilia',
              body: 'Kila aya huwa na wazo kuu (topic sentence) ambalo hubeba ujumbe mzito, huku sentensi nyingine zikiwa mifano au ufafanuzi. Ufupisho mzuri unachuja mifano na maneno ya ziada na kubakiza vidokezo muhimu kwa maneno yako mwenyewe.',
              explanationSteps: [
                'Hatua 1: Soma makala mara ya kwanza ili kuelewa ujumbe wa jumla.',
                'Hatua 2: Soma mara ya pili ukipigia mstari vidokezo vikuu (hoja muhimu za mwandishi).',
                'Hatua 3: Andika vidokezo hivyo katika aya moja iliyoshikamana ukitumia viunganishi fasaha, bila kubadilisha maana.'
              ],
              workedExample: 'Aya asilia: "Mazingira safi huleta afya bora, huzuia maradhi kama kipindupindu, na huongeza maisha marefu kwa jamii yetu."\nUfupisho: "Usafi wa mazingira unalinda afya na kuzuia magonjwa ya jamii."',
              formula: 'Wazo Kuu + Hoja Muhimu - Mifano ya Ziada = Ufupisho Bora',
              visualBadge: '🔍 Kichujio cha Hoja Muhimu',
              realWorldContext: 'Kuandaa taarifa fupi za mikutano, muhtasari wa habari, na majumuisho ya vitabu.'
            },
            socraticPrompt: 'Ikiwa makala ina maneno 200 na umeambiwa ufupishe kwa maneno 50, ni vitu gani vya kwanza unapaswa kuondoa bila kupoteza kiini?',
            examFocus: 'Mtihani wa KJSEA: Kuandika ufupisho wa maneno 60-70 ukizingatia mtiririko na idadi kamili ya maneno.'
          }
        ]
      },
      {
        id: 'cbc_g8_kisw_s3',
        number: 3,
        title: 'Kuandika: Insha na Mawasiliano Rasmi',
        strand: 'Mada Kuu 3: Kuandika',
        icon: '✍️',
        status: 'available',
        summary: 'Uandishi wa insha za masimulizi, wasifu binafsi (CV), barua rasmi, na dayalojia.',
        subtopics: [
          {
            id: 'cbc_g8_kisw_s3_1',
            title: 'Kuandika Wasifu Binafsi (Curriculum Vitae - CV)',
            status: 'available',
            conceptPrimer: {
              title: 'Kujieleza Kitaalamu kwenye Karatasi',
              tagline: 'Wasifu binafsi unaonyesha utambulisho, elimu, ujuzi, na wadhamini kwa mpangilio rasmi',
              body: 'Wasifu binafsi (CV) ni hati rasmi inayoelezea sifa za mtu: maelezo ya kibinafsi, usuli wa masomo, uzoefu wa kazi, ujuzi maalum (kama vile kompyuta na michezo), lugha anazomudu, na wadhamini wanaomjua vyema.',
              explanationSteps: [
                'Sehemu 1: Maelezo ya Kibinafsi (Jina kamili, Tarehe ya kuzaliwa, Anuani, Barua pepe).',
                'Sehemu 2: Historia ya Kielimu (Kuanzia kiwango cha juu hadi cha chini).',
                'Sehemu 3: Ujuzi na Hobi (Vipaji, uongozi, michezo).',
                'Sehemu 4: Wadhamini Wawili (Watu wanaoaminika na anwani zao kamili).'
              ],
              workedExample: 'Kichwa: WASIFU BINAFSI WA JUMA BAKARI\n1. Maelezo ya Kibinafsi: Jina, Jinsia, Uraia: Mkenya.\n2. Elimu: 2024–Sasa: Shule ya Upili ya Vijana.\n3. Wadhamini: Bw. Ali Hassan (Mwalimu Mkuu).',
              formula: 'Utambulisho + Elimu + Ujuzi + Wadhamini = CV Kamili',
              visualBadge: '📄 Ramani ya Mpangilio wa CV',
              realWorldContext: 'Kuomba kazi, kujiunga na vilabu vya shule, au kutuma maombi ya ufadhili wa masomo.'
            },
            socraticPrompt: 'Kwa nini katika wasifu binafsi (CV) tunaanza na elimu au uzoefu wa hivi karibuni badala ya kuanza na shule ya chekechea?',
            examFocus: 'KICD Writing Portfolio: Mpangilio nadhifu, lugha rasmi isiyo na ucheshi, na kufuata kanuni za uandishi.'
          }
        ]
      },
      {
        id: 'cbc_g8_kisw_s4',
        number: 4,
        title: 'Fasihi Simulizi na Utamaduni',
        strand: 'Mada Kuu 4: Fasihi Simulizi',
        icon: '🎭',
        status: 'available',
        summary: 'Semi, ngano, nyimbo za kitamaduni, vitendawili, na mighani ya mashujaa.',
        subtopics: [
          {
            id: 'cbc_g8_kisw_s4_1',
            title: 'Ngano na Nyimbo za Kitamaduni',
            status: 'available',
            conceptPrimer: {
              title: 'Urithi wa Simulizi za Jamii',
              tagline: 'Fasihi simulizi hupitishwa kwa njia ya mdomo ili kuelimisha, kuadhibu na kuburudisha',
              body: 'Ngano ni hadithi za kimapokeo (ngano za wanyama, mashujaa, au mazimwi). Kila ngano huwa na wahusika, mandhari, mgogoro, na funzo la maadili. Nyimbo za kitamaduni (bembeleza, nyimbo za kazi, nyimbo za harusi) huambatana na miondoko ya jamii.',
              explanationSteps: [
                'Hatua 1: Tambua tanzu ya fasihi simulizi (Hadithi, Ushairi simulizi, au Semi).',
                'Hatua 2: Chunguza mbinu za uwasilishaji (matumizi ya sauti, ishara, na ushirikishwaji wa hadhira).',
                'Hatua 3: Changanua maadili na mafunzo kwa jamii ya sasa.'
              ],
              workedExample: 'Ngano ya Sungura na Fisi: Sungura anawakilisha werevu huku Fisi akiwakilisha uroho. Funzo: Ulafi huleta majuto.',
              formula: 'Msimulizi + Hadhira + Ujumbe wa Maadili = Fasihi Hai',
              visualBadge: '🔥 Simulizi Pembeni mwa Moto',
              realWorldContext: 'Kuelewa mizizi ya kitamaduni na kutumia hekima za asili kutatua migogoro ya kisasa.'
            },
            socraticPrompt: 'Ni sifa gani za fasihi simulizi zinazoifanya iwe tofauti na fasihi andishi inayopatikana vitabuni?',
            examFocus: 'KJSEA Fasihi: Kueleza majukumu ya jamii na sifa za mtambaji mahiri wa ngano.'
          }
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // GRADE 10 (SENIOR SCHOOL CBE — COMPULSORY)
  // ────────────────────────────────────────────────────────────
  10: {
    curriculum: 'CBC',
    grade: 10,
    subject: 'Kiswahili',
    title: 'Grade 10 Kiswahili Metro Line',
    stations: [
      {
        id: 'cbc_g10_kisw_s1',
        number: 1,
        title: 'Uchanganuzi wa Sentensi na Sarufi Miundo',
        strand: 'Mada Kuu 1: Sarufi ya Kina',
        icon: '🔬',
        status: 'available',
        summary: 'Uchanganuzi wa sentensi sahili, ambatani na changamano kwa mishale na matawi.',
        subtopics: [
          {
            id: 'cbc_g10_kisw_s1_1',
            title: 'Miundo ya Sentensi (Sahili, Ambatani, Changamano)',
            status: 'available',
            conceptPrimer: {
              title: 'Majengo ya Sentensi za Kiswahili',
              tagline: 'Kila sentensi imejengwa na Shamirisho, Kiima na KiPredicate',
              body: 'Sentensi sahili ina wazo moja na kitenzi kikuu kimoja. Sentensi ambatani inajumuisha sentensi sahili mbili au zaidi zilizounganishwa na viunganishi kama "na", "lakini". Sentensi changamano ina kishazi huru na kishazi tegemezi (mara nyingi kikitumia viambishi kama -po-, -ki-, au -ambaye-).',
              explanationSteps: [
                'Hatua 1: Chunguza idadi ya vitenzi vilivyomo kwenye sentensi.',
                'Hatua 2: Tambua kama kuna vishazi vinavyojitegemea pekee au kama kuna kishazi kinachotegemea kingine.',
                'Hatua 3: Bainisha aina: Tendo 1 = Sahili; Vitendo 2 vinavyolingana = Ambatani; Kishazi tegemezi + Kishazi huru = Changamano.'
              ],
              workedExample: 'Sahili: Mwanafunzi amefaulu mtihani.\nAmbatani: Mwanafunzi alisoma kwa bidii na akafaulu mtihani.\nChangamano: Mwanafunzi aliyesoma kwa bidii amefaulu mtihani.',
              formula: 'KN (Kikundi Nomino) + KT (Kikundi Tenzi) = Sentensi Kamili',
              visualBadge: '🌳 Mchoro wa Matawi ya Sentensi',
              realWorldContext: 'Kusoma makala changamano za kisheria, insha za kiusomi, na riwaya.'
            },
            socraticPrompt: 'Sentensi "Mwalimu alipoingia darasani, wanafunzi walisimama" ni ya aina gani kati ya sahili, ambatani au changamano, na unaithibitishaje?',
            examFocus: 'KSSEA Senior Secondary: Kuchanganua sentensi changamano kwa jedwali na michoro ya matawi.'
          }
        ]
      },
      {
        id: 'cbc_g10_kisw_s2',
        number: 2,
        title: 'Fasihi Andishi: Riwaya, Tamthilia na Ushairi',
        strand: 'Mada Kuu 2: Fasihi Andishi',
        icon: '📚',
        status: 'available',
        summary: 'Uchambuzi wa maudhui, dhamira, migogoro na wahusika katika vitabu teule.',
        subtopics: [
          {
            id: 'cbc_g10_kisw_s2_1',
            title: 'Uchambuzi wa Wahusika na Maudhui Teule',
            status: 'available',
            conceptPrimer: {
              title: 'Kuvumbua Ujumbe Uliofichwa Kwenye Fasihi',
              tagline: 'Wahusika ni vioo vya jamii vinavyobeba mawazo na falsafa ya mwandishi',
              body: 'Kusoma kitabu cha fasihi kunahitaji zaidi ya kufuatilia hadithi tu. Mwanafunzi anapaswa kuelewa maudhui makuu (k.m. ufisadi, uongozi mbaya, nafasi ya mwanamke, elimu) na jinsi mwandishi anavyotumia wahusika wakuu na wadogo kusukuma mbele ujumbe wake.',
              explanationSteps: [
                'Hatua 1: Ainisha wahusika (mhusika mkuu, mhusika hasimu, wahusika wajenzi).',
                'Hatua 2: Chunguza mabadiliko ya mhusika (bapa au mduara).',
                'Hatua 3: Linganisha matendo ya wahusika na uhalisia wa jamii yetu ya leo.'
              ],
              workedExample: 'Maudhui ya Uongozi: Mhusika kiongozi anapopuuza ushauri wa wananchi na kusababisha migomo shuleni au kijijini.',
              formula: 'Matendo ya Mhusika + Migogoro = Funzo la Maudhui',
              visualBadge: '🎭 Kioo cha Jamii',
              realWorldContext: 'Kukuza uwezo wa kutafakari kwa kina kuhusu uongozi, haki za binadamu na maendeleo.'
            },
            socraticPrompt: 'Ni kwa nini mwandishi wa tamthilia au riwaya mara nyingi humweka mhusika mwenye dosari badala ya mhusika mkamilifu asiye na kosa lolote?',
            examFocus: 'KSSEA Paper 3: Maswali ya muktadha na insha za dondoo za fasihi andishi.'
          }
        ]
      }
    ]
  }
};

module.exports = CBC_KISWAHILI_MAPS;
