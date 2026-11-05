// ══════════════════════════════════════════════════════════════
// KICD CBC LANGUAGES, HUMANITIES & APPLIED SUBJECTS SEED DATA
// Covers English (G7-G10), Kiswahili (G7-G10 Dual-Track),
// Social Studies, Pre-Technical, Agriculture, Essential Maths, CSL, etc.
// ══════════════════════════════════════════════════════════════

function stop(id, title, primerTitle, tagline, body, formula, visualBadge, realWorldContext, socraticPrompt, examFocus, steps = [], workedExample = '') {
  return {
    id,
    title,
    status: 'available',
    conceptPrimer: {
      title: primerTitle,
      tagline,
      body,
      formula,
      visualBadge,
      realWorldContext,
      explanationSteps: steps.length ? steps : [
        'Step 1: Analyze the context, audience, and structural rules of the strand.',
        'Step 2: Apply the linguistic, analytical, or practical framework systematically.',
        'Step 3: Review for clarity, precision, and alignment with KICD competency rubrics.'
      ],
      workedExample: workedExample || `Model Example: ${realWorldContext} (${formula})`
    },
    socraticPrompt,
    formulaBadge: formula,
    examFocus
  };
}

const CBC_LANGUAGES_OTHER_MAPS = [
  // ────────────────────────────────────────────────────────────
  // KICD GRADE 8 ENGLISH (Preserving IDs cbc_g8_eng_s1_1, cbc_g8_eng_s1_2, cbc_g8_eng_s2_1, cbc_g8_eng_s3_1)
  // ────────────────────────────────────────────────────────────
  {
    curriculum: 'CBC',
    grade: 7,
    subject: 'English',
    code: 'ENG-G7',
    trackPathway: 'Core',
    title: 'CBE Grade 7 (Junior School) English Metro Line',
    stations: [
      {
        id: 'cbc_g7_eng_s1',
        number: 1,
        title: '1.0 Listening and Speaking',
        strand: 'Strand 1.0: Listening and Speaking',
        icon: '🎙️',
        status: 'available',
        summary: 'Conversational politeness, minimal pairs pronunciation, oral narratives, and active listening.',
        subtopics: [
          stop('cbc_g7_eng_s1_1', '1.1 Oral Narratives, Trickster Tales & Pronunciation', 'Voice Projection, Tonal Variation & Facial Expressions', 'Oral performance brings traditional stories to life', 'Oral narratives (trickster, monster,etiological stories) use opening formulas ("Once upon a time..."), tonal variation, gestures, mimicry, and closing formulas to engage an audience and convey moral lessons.', 'Opening Formula + Body/Conflict + Performance Cues + Moral Lesson', '🎭 Oral Storyteller Stage', 'Performing hare and hyena trickster stories during the Kenya National Drama & Film Festival.', 'How would you change your voice tone and posture when voicing a cunning hare versus a greedy hyena?', 'KJSEA Oral Literature: Identifying features of trickster narratives and performance techniques.')
        ]
      },
      {
        id: 'cbc_g7_eng_s2',
        number: 2,
        title: '2.0 Reading & Comprehension',
        strand: 'Strand 2.0: Reading',
        icon: '📖',
        status: 'available',
        summary: 'Skimming and scanning, library reference skills, poetry elements, and class reader characters.',
        subtopics: [
          stop('cbc_g7_eng_s2_1', '2.1 Skimming for Gist vs Scanning for Specific Facts', 'Strategic Reading Speeds', 'Skim the headlines for main ideas; scan the lines for target keywords', 'Skimming reads titles, topic sentences, and conclusions rapidly to grasp the general overview. Scanning sweeps the text looking for a specific date, name, or figure without reading every word.', 'Skimming = General Idea (Gist)  |  Scanning = Specific Fact/Number', '🔍 Reading Lens Strategy', 'Scanning a bus timetable at Nairobi Railways terminus for departure times vs skimming a newspaper.', 'If you need to find a specific phone number in a directory, do you skim or scan, and why?', 'KJSEA Reading Comprehension: Locating factual details and summarizing main ideas.')
        ]
      },
      {
        id: 'cbc_g7_eng_s3',
        number: 3,
        title: '3.0 Grammar in Use',
        strand: 'Strand 3.0: Grammar in Use',
        icon: '📝',
        status: 'available',
        summary: 'Countable and uncountable nouns, personal and possessive pronouns, regular/irregular verbs, and comparatives.',
        subtopics: [
          stop('cbc_g7_eng_s3_1', '3.1 Nouns, Quantifiers & Comparative Adjectives', 'Agreement & Degree of Comparison', 'Short adjectives take -er/-est; longer adjectives take more/most', 'Uncountable nouns (information, luggage, furniture, advice) take singular verbs and quantifiers like "much" or "a piece of". Adjectives compare two items using the comparative degree and three or more using the superlative.', 'One item: Positive  |  Two items: Comparative (-er / more)  |  Three+: Superlative (-est / most)', '⚖️ Adjective Degree Ladder', 'Correcting common Kenyan L1 errors like "furnitures" or "more better".', 'Why is the sentence "The principal gave us many good advices" grammatically incorrect, and how do we fix it?', 'KJSEA Grammar: Correcting uncountable noun pluralization and double comparatives.')
        ]
      },
      {
        id: 'cbc_g7_eng_s4',
        number: 4,
        title: '4.0 Writing',
        strand: 'Strand 4.0: Writing',
        icon: '✍️',
        status: 'available',
        summary: 'Paragraph structure, friendly letters, narrative composition, and punctuation mechanics.',
        subtopics: [
          stop('cbc_g7_eng_s4_1', '4.1 Paragraph Unity: Topic, Supporting & Concluding Sentences', 'The Hamburger Paragraph Model', 'One controlling idea per paragraph supported by concrete evidence', 'A well-structured paragraph opens with a clear Topic Sentence stating the main point, develops it with 2–3 Supporting Sentences (examples, facts, sensory details), and closes with a Concluding/Clincher Sentence.', 'Topic Sentence + Supporting Details + Clincher = Unified Paragraph', '🍔 Paragraph Structure Blueprint', 'Writing clear narrative and descriptive compositions for school assessments.', 'What happens to a reader\'s understanding when a writer crams three unrelated topics into a single paragraph?', 'KJSEA Writing Assessment: Paragraph cohesion, transitions, and punctuation accuracy.')
        ]
      }
    ]
  },

  {
    curriculum: 'CBC',
    grade: 8,
    subject: 'English',
    code: 'ENG-G8',
    trackPathway: 'Core',
    title: 'CBE Grade 8 (Junior School) English Metro Line',
    stations: [
      {
        id: 'cbc_g8_eng_s1',
        number: 1,
        title: '1.0 Grammar in Use: Tenses, Aspects & Clauses',
        strand: 'Strand 1.0: Grammar in Use',
        icon: '📝',
        status: 'available',
        summary: 'Present perfect vs past simple, active and passive voice, modal verbs of obligation, and relative clauses.',
        subtopics: [
          stop('cbc_g8_eng_s1_1', '1.1 Present Perfect vs Past Simple in Narrative Context', 'Connecting Past Actions to Present Reality', 'Past simple isolates an event in finished time; present perfect connects it to now', 'When you say "I lost my pen," the focus is on a finished past event. When you say "I have lost my pen," the focus is on the present consequence (I do not have a pen right now!). Present perfect always bridges the past and the immediate present moment.', 'Subject + have/has + V3 (Past Participle)', '🌉 Time-Bridge Diagram', 'Writing police statements, news reports, and academic research updates.', 'Why does a doctor ask "Have you taken your medication?" instead of "Did you take your medication?" when examining you today?', 'KJSEA Assessment: Identifying tense shifts in short prose passages and correcting aspect errors.'),
          stop('cbc_g8_eng_s1_2', '1.2 Active vs Passive Voice & Objective Tone', 'Putting the Action or the Recipient in the Spotlight', 'Active voice highlights who did it; passive voice highlights what was done', 'In active voice, the subject acts: "The ranger rescued the baby elephant." In passive voice, the object becomes the subject because the action or result matters more than the doer: "The baby elephant was rescued by the ranger." Science and journalism use passive voice to maintain objective neutrality.', 'Object + form of [be] + Past Participle + [by Agent]', '🔄 Focus Shift Beam', 'Writing laboratory reports, official government gazettes, and formal news bulletins.', 'In a science experiment report, why do we write "5 ml of acid was added" instead of "I added 5 ml of acid"?', 'KJSEA Model Question: Converting active sentences to formal passive voice without changing meaning.')
        ]
      },
      {
        id: 'cbc_g8_eng_s2',
        number: 2,
        title: '2.0 Reading Comprehension & Critical Analysis',
        strand: 'Strand 2.0: Reading & Comprehension',
        icon: '📖',
        status: 'available',
        summary: 'Explicit vs inferential meaning, figurative language, and tone detection.',
        subtopics: [
          stop('cbc_g8_eng_s2_1', '2.1 Inferential Reading & Uncovering Implicit Meaning', 'Reading Between the Written Lines', 'Authors provide clues in actions and sensory details rather than stating facts directly', 'Direct (explicit) reading finds facts stated right on the page. Inferential reading uses textual evidence plus common-sense reasoning to deduce what the author implies.', 'Text Clue + Prior Knowledge = Valid Inference', '🕵️ Textual Detective Magnifier', 'Critical news analysis, evaluating digital media credibility, and literary appreciation.', 'If a character says "Oh brilliant, another flat tyre in the rain," what tone are they using, and how do words reveal their actual emotion?', 'KJSEA Reading Paper: Supporting inferential claims with exact quotes from the passage.')
        ]
      },
      {
        id: 'cbc_g8_eng_s3',
        number: 3,
        title: '3.0 Functional Writing: Formal Letters & Minutes',
        strand: 'Strand 3.0: Functional Writing',
        icon: '✉️',
        status: 'available',
        summary: 'Format, register, and conventions for letters of application, apologies, and meeting records.',
        subtopics: [
          stop('cbc_g8_eng_s3_1', '3.1 Formal Letter Format & Professional Register', 'The Architecture of Professional Correspondence', 'Two addresses, clear reference line, formal salutation, and concise objective paragraphs', 'A formal letter requires the sender\'s address, date, recipient\'s designation and address, formal salutation (Dear Sir/Madam or Dear Mr. Ochieng), an underlined Subject Reference (RE: ...), structured paragraphs, and matching sign-off.', 'Address + Date + Recipient + Salutation + RE + Body + Valediction', '📐 Formal Letter Grid', 'Writing scholarship inquiries, job applications, or formal community requests to local leaders.', 'Why do we end with "Yours faithfully" when we begin with "Dear Sir/Madam", but switch to "Yours sincerely" when we write "Dear Dr. Mwangi"?', 'KICD Functional Writing: 100% compliance with layout points and zero informal slang or abbreviations.')
        ]
      }
    ]
  },

  {
    curriculum: 'CBC',
    grade: 9,
    subject: 'English',
    code: 'ENG-G9',
    trackPathway: 'Core',
    title: 'CBE Grade 9 (Junior School Capstone) English Metro Line',
    stations: [
      {
        id: 'cbc_g9_eng_s1',
        number: 1,
        title: '1.0 Listening and Speaking: Negotiation & Diphthongs',
        strand: 'Strand 1.0: Listening and Speaking',
        icon: '🎙️',
        status: 'available',
        summary: 'Stress placement in noun-verb pairs, negotiation skills, and impromptu speeches.',
        subtopics: [
          stop('cbc_g9_eng_s1_1', '1.1 Word Stress in Noun-Verb Homographs & Negotiation', 'First-Syllable Stress for Nouns; Second-Syllable Stress for Verbs', 'Shifting syllable stress changes part of speech and meaning', 'In two-syllable words like REcord (noun) vs reCORD (verb), EXport (noun) vs exPORT (verb), and PREsent (noun) vs preSENT (verb), stress falls on the first syllable for nouns/adjectives and on the second syllable for verbs.', 'Noun = \'OB-ject (1st syllable)  |  Verb = ob-\'JECT (2nd syllable)', '🔊 Phonetic Stress Wave', 'Delivering clear public debates and negotiating fair market prices.', 'How does the pronunciation of the word "conduct" change in "His conduct was exemplary" versus "They will conduct an experiment"?', 'KJSEA Grade 9 Capstone: Identifying stressed syllables in sentences.')
        ]
      },
      {
        id: 'cbc_g9_eng_s2',
        number: 2,
        title: '2.0 Reading & Intensive Literary Analysis',
        strand: 'Strand 2.0: Reading',
        icon: '📖',
        status: 'available',
        summary: 'Characterisation, themes, poetic persona, rhyme schemes, and note-making.',
        subtopics: [
          stop('cbc_g9_eng_s2_1', '2.1 Poetic Persona, Rhyme Scheme & Imagery', 'Decoding Sound Patterns and Figurative Pictures', 'Label end-rhymes alphabetically (ababcdcd) to uncover poetic structure', 'Poems communicate compressed emotion through imagery (similes, metaphors, personification, symbolism) and sound devices (alliteration, assonance, consonance, onomatopoeia, rhyme).', 'Regular Rhyme (abab) = Musical Harmony/Order  |  Free Verse = Natural Speech', '🎭 Poetic Stanza & Sound Decoder', 'Analyzing East African poetry on environmental conservation and social justice.', 'What is the difference between the poet (the author) and the persona (the speaking voice) in a poem?', 'KJSEA Literature: Describing rhyme schemes and explaining the effectiveness of metaphors.')
        ]
      },
      {
        id: 'cbc_g9_eng_s3',
        number: 3,
        title: '3.0 Grammar in Use: Conditionals & Question Tags',
        strand: 'Strand 3.0: Grammar in Use',
        icon: '📝',
        status: 'available',
        summary: 'Zero, First, Second, and Third conditional clauses, question tags, and direct/indirect speech.',
        subtopics: [
          stop('cbc_g9_eng_s3_1', '3.1 Conditional Clauses (If-Clauses) & Question Tags', 'Hypothetical Realities & Polarity Reversal in Tags', 'Positive statement takes a negative tag; negative statement takes a positive tag', 'First conditional expresses likely future outcomes (If + present simple, will + infinitive). Second conditional expresses improbable/imaginary present (If + past simple, would + infinitive). Third conditional expresses unfulfilled past regret (If + past perfect, would have + V3).', 'Type 1: If + V1 → will V  |  Type 2: If + V2 → would V  |  Type 3: If + had V3 → would have V3', '🔀 Conditional Timeline & Tag Polarity', 'Discussing scientific hypotheses and polite conversational confirmation.', 'Why do we say "She rarely comes late, does she?" with a positive tag even though there is no word "not" in the sentence?', 'KJSEA Grammar: Supplying correct question tags after words like "hardly", "seldom", "little", and "let\'s".')
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // KICD GRADE 10 ENGLISH (Exact Official KICD Table: 4 Strands, 19 Sub-strands)
  // 1.0 Listening and Speaking [1.1–1.5]
  // 2.0 Reading [2.1–2.5]
  // 3.0 Grammar in Use [3.1–3.4]
  // 4.0 Writing [4.1–4.5]
  // ────────────────────────────────────────────────────────────
  {
    curriculum: 'CBC',
    grade: 10,
    subject: 'English',
    code: 'ENG-G10',
    trackPathway: 'Core',
    title: 'CBE Grade 10 (Senior School) English Metro Line',
    stations: [
      {
        id: 'cbc_g10_eng_s1',
        number: 1,
        title: '1.0 Listening and Speaking',
        strand: 'Strand 1.0: Listening and Speaking',
        icon: '🏛️',
        status: 'available',
        summary: 'Etiquette and turn-taking, phonetic stress and intonation, persuasive rhetoric (Ethos, Pathos, Logos), debate, and oral literature.',
        subtopics: [
          stop('cbc_g10_eng_s1_0', '1.1 Etiquette, Turn-Taking & Active Listening in Formal Discourse', 'Collaborative Dialogue & Non-Verbal Cues', 'Respectful interruption, paraphrasing, and eye contact build productive discourse', 'Effective formal communication relies on turn-taking cues, polite interjections ("If I may add...", "With due respect..."), active listening posture, and empathetic feedback.', 'Active Listening = Attention + Non-Verbal Nod/Eye Contact + Paraphrasing + Relevant Question', '🤝 Parliamentary & Panel Etiquette', 'Participating in Kenya National Youth Parliament debates and school student council panels.', 'How can a speaker politely reclaim the floor when interrupted during a formal panel discussion?', 'KSSEA English Paper 1 Oral Skills: Identifying polite turn-taking expressions and active listening indicators.'),
          stop('cbc_g10_eng_s1_2', '1.2 Pronunciation, Phonemic Transcription, Stress & Intonation', 'Falling vs Rising Intonation & Emphatic Stress', 'Falling tone signals certainty/wh-questions; Rising tone signals yes/no inquiry or surprise', 'Intonation is the rise and fall of voice pitch across an utterance. Falling intonation (↘) is used in declarative statements, commands, and WH-questions. Rising intonation (↗) is used in Yes/No questions, listing items, and polite requests.', 'WH-Question ("Where are you going? ↘") vs Yes/No ("Are you ready? ↗")', '🎵 Pitch Contour & Emphatic Stress Map', 'Delivering news broadcasts and interpreting speaker attitude through sentence stress.', 'How does the meaning of the sentence "I did not say she stole the money" change when you stress "I" versus when you stress "money"?', 'KSSEA English Paper 1: Marking rising/falling intonation arrows and identifying silent letters and homophones.'),
          stop('cbc_g10_eng_s1_1', '1.3 Persuasive Oratory & The Rhetorical Triangle: Ethos, Pathos & Logos', 'The Three Pillars of Persuasion', 'True conviction requires credible character, emotional resonance, and watertight logic', 'First articulated by Aristotle and used in every major historical address: Ethos establishes authority and moral integrity; Pathos connects with the audience\'s values and empathy; Logos provides reasoned arguments, statistics, and cause-and-effect proof.', 'Ethos (Credibility) + Logos (Logic) + Pathos (Emotion) = Persuasion', '🔺 The Rhetorical Triangle', 'Public debates, legal advocacy, university essays, and environmental conservation speeches.', 'If a campaign speech uses emotional stories without citing a single verifiable statistic or policy plan, which rhetorical appeal is missing?', 'KSSEA English Paper 2: Analyzing argumentative discourse and identifying stylistic devices with textual evidence.'),
          stop('cbc_g10_eng_s1_4', '1.4 Debate, Negotiation & Conflict Resolution Strategies', 'Win-Win Consensus &Principled Negotiation', 'Separate the people from the problem and focus on shared interests over rigid positions', 'Principled negotiation follows four stages: preparation, opening positions, bargaining with objective criteria, and win-win closure. Effective negotiators use calm register, concession markers ("While we acknowledge X, we propose Y"), and active listening.', 'Position (What I want) → Underlying Interest (Why I need it) → Win-Win Compromise', '⚖️ Principled Negotiation Bridge', 'Resolving community resource disputes or negotiating club budgets with school administration.', 'Why does conceding a minor point early in a negotiation often strengthen your ability to secure your primary objective?', 'KSSEA English Oral Skills: Writing and completing negotiation dialogues using diplomatic register.'),
          stop('cbc_g10_eng_s1_5', '1.5 Oral Literature Fieldwork, Classification & Performance', 'Collecting, Transcribing & Analyzing Living Folklore', 'Fieldwork preserves indigenous songs, proverbs, riddles, and epics in authentic context', 'Oral literature genres include Oral Narratives (myths, legends, ogre, trickster), Oral Poetry/Songs (lullabies, dirges, panegyrics, work songs), and Short Forms (proverbs, riddles, tongue-twisters, puns). Fieldwork involves pre-visit preparation, observation/interview/recording, and transcription.', 'Riddle Cycle: Invitation → Acceptance → Challenge (Riddle) → Guesses → Prize → Solution', '🥁 Oral Literature Fieldwork & Genre Matrix', 'Recording traditional harvest songs and proverbs from community elders across Kenyan counties.', 'What are two advantages and two limitations of using live video recording during oral literature fieldwork?', 'KSSEA Oral Literature: Analyzing the socio-economic functions of songs/proverbs and fieldwork methodology.')
        ]
      },
      {
        id: 'cbc_g10_eng_s2',
        number: 2,
        title: '2.0 Reading',
        strand: 'Strand 2.0: Reading',
        icon: '📖',
        status: 'available',
        summary: 'Intensive critical reading, extensive literary analysis, summary and note-making, stylistic devices, and digital media literacy.',
        subtopics: [
          stop('cbc_g10_eng_s2_1', '2.1 Intensive Reading: Critical Comprehension, Inference & Attitude', 'Unpacking Authorial Intent & Textual Evidence', 'Every claim about a passage must be anchored in specific diction and context clues', 'Intensive reading demands close analysis of literal facts, implied inferences, logical structure, and vocabulary in context. When answering comprehension questions, paraphrase in your own words unless explicitly asked to "quote".', 'Claim + Textual Evidence + Analytical Explanation = Full Marks', '🔬 Close Reading Magnifier', 'Analyzing constitutional clauses, scientific editorials, and literary extracts.', 'How do you distinguish between an author\'s objective factual statement and their subjective opinion in an editorial?', 'KSSEA English Paper 2: Answering comprehension questions with grammatical precision and contextual vocabulary explanations.'),
          stop('cbc_g10_eng_s2_2', '2.2 Extensive Reading: Set Books, Characterisation & Thematic Analysis', 'Character Arcs, Conflict & Societal Mirrors', 'Characters reveal their traits through actions, dialogue, thoughts, and reactions of others', 'Literary analysis examines how plot conflict, setting, characterisation (dynamic vs static, round vs flat), and stylistic choices advance central themes (governance, integrity, gender equity, resilience, technology).', 'Character Trait (Adjective) + Specific Textual Illustration + Thematic Link', '📚 Literary Character & Theme Web', 'Analyzing prescribed Senior School novels and plays for national assessments.', 'Why must a character trait always be stated as an adjective (e.g. "courageous", "manipulative") rather than a noun or verb?', 'KSSEA English Paper 2 & 3: Answering excerpt context questions and writing 20-mark literary essays with four clear illustrations.'),
          stop('cbc_g10_eng_s2_3', '2.3 Summarising & Note-Making Techniques', 'Distilling Core Points Under Strict Word Limits', 'Identify key points in rough notes, then link them in smooth continuous prose', 'Summary writing requires: (1) Reading the prompt to isolate the exact target aspect, (2) Extracting numbered rough points, (3) Condensing into a single paragraph of continuous prose using transition markers (Furthermore, Moreover, Consequently) without lifting whole sentences verbatim, and (4) Obeying the exact word limit.', 'Rough Points → Eliminate Examples/Repetition → Connect with Transitions → Count Words', '✂️ Precision Summary Condenser', 'Writing executive summaries of policy reports and board briefings.', 'In a 60-word summary exam question, why does an examiner stop awarding points after the 60th word?', 'KSSEA English Paper 2 Summary Question: Writing in complete sentences (not bullets) strictly within the word limit.'),
          stop('cbc_g10_eng_s2_4', '2.4 Stylistic Devices, Tone & Mood in Prose and Poetry', 'Irony, Satire, Symbolism, Juxtaposition & Diction', 'Tone is the speaker\'s attitude; Mood is the emotional atmosphere evoked in the reader', 'Authors craft meaning using Verbal/Situational/Dramatic Irony, Satire, Sarcasm, Hyperbole, Euphemism, Paradox, Oxymoron, and Vivid Imagery. Always identify the device, quote the illustration, and explain what it reveals about character or theme.', 'Tone = Speaker\'s Attitude (e.g. cynical, nostalgic)  |  Mood = Reader\'s Feeling (e.g. tense, sombre)', '🎨 Tone vs Mood Spectrum', 'Detecting satire and irony in Kenyan newspaper columns and political cartoons.', 'What is the difference between situational irony and dramatic irony in a stage play?', 'KSSEA Poetry & Excerpt Analysis: Describing tone/mood with accurate adjectives and explaining effectiveness of irony.'),
          stop('cbc_g10_eng_s2_5', '2.5 Media Literacy, Fact-Checking & Evaluating Digital Information', 'Detecting Bias, Deepfakes, Clickbait & Fallacies', 'Cross-reference primary sources, author credentials, and empirical evidence', 'Digital literacy requires evaluating online sources using the CRAAP framework (Currency, Relevance, Authority, Accuracy, Purpose), spotting logical fallacies (ad hominem, straw man, false dilemma, slippery slope), and verifying citations.', 'CRAAP Test: Currency • Relevance • Authority • Accuracy • Purpose', '🛡️ Digital Fact-Check Shield', 'Verifying viral social media claims and health misinformation before sharing.', 'How does an "ad hominem" fallacy attempt to derail a legitimate scientific or policy debate?', 'KSSEA Critical Reading: Identifying bias, propaganda techniques, and logical fallacies in media texts.')
        ]
      },
      {
        id: 'cbc_g10_eng_s3',
        number: 3,
        title: '3.0 Grammar in Use',
        strand: 'Strand 3.0: Grammar in Use',
        icon: '📝',
        status: 'available',
        summary: 'Word classes, phrasal verbs, complex noun phrases, clause hierarchy, inversion, reported speech, and register.',
        subtopics: [
          stop('cbc_g10_eng_s3_1', '3.1 Word Classes, Phrasal Verbs & Complex Noun Phrases', 'Pre-Modifiers, Head Nouns, Post-Modifiers & Idiomatic Particles', 'A phrasal verb combines a root verb with a preposition/adverb particle to create a new idiomatic meaning', 'Complex noun phrases follow [Determiner + Pre-modifying Adjectives + HEAD NOUN + Prepositional/Participle/Relative Post-modifier]. Phrasal verbs (put off = postpone, call off = cancel, look into = investigate, put up with = tolerate) must be learned in context.', 'Noun Phrase = [Determiner] + [Pre-modifiers] + HEAD NOUN + [Post-modifiers]', '🧩 Noun Phrase & Phrasal Verb Builder', 'Replacing informal phrasal verbs with formal single-word equivalents in official reports.', 'In the noun phrase "The three tall marathon runners from Eldoret who won gold", which single word is the Head Noun?', 'KSSEA Grammar: Replacing underlined words with correct phrasal verbs and analyzing noun/prepositional phrases.'),
          stop('cbc_g10_eng_s3_2', '3.2 Sentence Structures: Simple, Compound, Complex & Inversion', 'Subordination, Relative Clauses & Negative Adverbial Fronting', 'Fronting a negative adverbial ("No sooner...", "Hardly...") triggers subject-auxiliary inversion', 'Complex sentences combine one independent main clause with one or more subordinate clauses (noun, adjectival/relative, or adverbial). When a sentence begins with a negative or restrictive adverbial (No sooner... than, Hardly/Scarcely... when, Not only... but also, Little did...), invert the auxiliary verb before the subject.', 'No sooner + had + Subject + V3 ... than + Past Simple', '🏗️ Clause Hierarchy & Inversion Flip', 'Writing sophisticated academic and legal prose.', 'Rewrite starting with "No sooner": "As soon as the referee blew the final whistle, the stadium erupted in cheers."', 'KSSEA English Paper 2 Grammar: Rewriting sentences using "No sooner... than", "Hardly... when", and "Unless".'),
          stop('cbc_g10_eng_s3_3', '3.3 Direct and Indirect Speech, Active and Passive Transformations', 'Backshifting Tenses, Deictic Shifts & Impersonal Passive', 'Reporting past speech shifts tense one step back and updates time/place pointers', 'When converting Direct Speech to Indirect (Reported) Speech with a past reporting verb ("said"), backshift tenses (present → past, past → past perfect, will → would), shift pronouns, and update time markers (today → that day, tomorrow → the following day, yesterday → the previous day, here → there).', 'Direct: "I will finish tomorrow" → Reported: She said that she would finish the following day', '🔄 Tense Backshift & Deictic Compass', 'Reporting witness testimonies in journalism and writing formal meeting minutes.', 'Why does the tense NOT backshift when reporting a universal scientific truth like "The teacher said that water boils at 100°C at sea level"?', 'KSSEA Grammar: Transforming interrogative and imperative sentences into indirect speech and passive voice.'),
          stop('cbc_g10_eng_s3_4', '3.4 Cohesive Devices, Modality, Subjunctive Mood & Register Shifts', 'Logical Transitions, Epistemic Modals & Formal Subjunctive', 'Cohesion binds sentences into a seamless argument; Register matches language to social context', 'Cohesive devices signal logical relationships: Contrast (however, nevertheless, whereas), Result (consequently, therefore), Addition (moreover, furthermore), Concession (albeit, notwithstanding). The formal subjunctive ("The board recommended that he be appointed") uses the base verb after verbs of demand or recommendation.', 'Demand/Recommend + that + Subject + Base Verb (Subjunctive)', '🔗 Discourse Cohesion & Register Dial', 'Drafting parliamentary motions, policy briefs, and academic essays.', 'Why is "The committee insisted that the treasurer resigns immediately" corrected to "...that the treasurer resign immediately" in formal English?', 'KSSEA Grammar: Using correlative conjunctions, subjunctive mood, and transition connectors accurately.')
        ]
      },
      {
        id: 'cbc_g10_eng_s4',
        number: 4,
        title: '4.0 Writing',
        strand: 'Strand 4.0: Writing',
        icon: '✍️',
        status: 'available',
        summary: 'Argumentative essays, institutional writing (minutes, memos, reports), professional CVs and emails, creative prose, and citation.',
        subtopics: [
          stop('cbc_g10_eng_s4_1', '4.1 Paragraphing, Cohesion & Argumentative Essay Architecture', 'Thesis Statement, Counter-Argument Refutation & Synthesis', 'Strong argumentative essays anticipate and dismantle the opposing view with evidence', 'An argumentative essay opens with a hook and clear Thesis Statement, presents 3–4 body paragraphs each anchored in a topic sentence + empirical evidence, addresses and refutes the strongest counter-argument, and concludes by synthesizing the stakes.', 'Introduction (Thesis) → Pro Arguments (PEEL) → Counter-Argument & Rebuttal → Conclusion', '🏛️ Argumentative Essay Pillar Blueprint', 'Writing national competition essays and university entrance papers.', 'Why does acknowledging and refuting a counter-argument make your essay more persuasive than ignoring the opposing side completely?', 'KSSEA English Paper 3: Discursive and argumentative essay scoring on content, organization, and linguistic maturity.'),
          stop('cbc_g10_eng_s4_2', '4.2 Institutional Writing: Minutes, Memoranda & Official Investigative Reports', 'Formal Governance Documentation & Action Tracking', 'Minutes record collective resolutions in passive/reported voice; Reports present findings and recommendations', 'Official Minutes require: Title (MINUTES OF...), Members Present, Apologies, Absent, Preliminaries, Confirmation of Previous Minutes, Matters Arising, Agenda Items (numbered MIN 1/03/2026), AOB, and Adjournment + Signature block. Investigative Reports use Title, Introduction/Terms of Reference, Procedure/Methodology, Findings, Conclusion, and Recommendations.', 'Minutes: Present → Apologies → Confirmation → Matters Arising → Business → AOB → Sign-off', '📋 Official Minutes & Report Template', 'Serving as secretary of a school board, cooperative society, or youth organization.', 'Why are official meeting minutes written in reported speech and passive voice rather than verbatim dialogue?', 'KSSEA English Paper 1 Functional Writing: 20-mark question on Minutes, Investigative Reports, or Internal Memoranda.'),
          stop('cbc_g10_eng_s4_3', '4.3 Professional Correspondence: CVs, Cover Letters & Formal Emails', 'Tailoring Career Documents for Clarity and Impact', 'A Curriculum Vitae summarizes qualifications; a Cover Letter connects them to the specific role', 'A modern CV includes Contact Profile, Personal Statement, Education (reverse chronological), Work/Leadership Experience, Skills & Certifications, Achievements, and Referees. A Cover Letter is a formal one-page letter highlighting why the applicant fits the specific organization.', 'Reverse Chronological Order: Most Recent Qualification First → Earlier Qualifications', '💼 Professional CV & Cover Letter Portfolio', 'Applying for university scholarships, internships at Konza Technopolis, or leadership roles.', 'Why should education and experience entries on a CV always be listed in reverse chronological order?', 'KSSEA Functional Writing: Combining a formal application letter with a structured Curriculum Vitae.'),
          stop('cbc_g10_eng_s4_4', '4.4 Creative, Descriptive & Imaginative Writing', 'Show, Don\'t Tell: Sensory Imagery, Pacing & Narrative Tension', 'Engage all five senses and vary sentence length to control emotional pacing', 'Masterful imaginative writing uses concrete sensory details (sight, sound, smell, touch, taste), dynamic verbs instead of weak adverbs, in-media-res openings, realistic dialogue, and varied sentence rhythms (short punchy sentences for tension; longer flowing sentences for reflection).', 'Sensory Details + Figurative Language + Varied Sentence Rhythm = Vivid Prose', '🖋️ Sensory Storyteller Palette', 'Writing short stories anchored in authentic Kenyan urban and rural settings.', 'Compare "The man was very angry" with "Mwangi\'s jaw clenched as his knuckles whitened around the table edge"—why is the second version more powerful?', 'KSSEA English Paper 3 Imaginative Composition: Starting or ending with a given sentence without altering a single word of the prompt.'),
          stop('cbc_g10_eng_s4_5', '4.5 Academic Integrity, Citation, Referencing & Research Summaries', 'In-Text Citations, Bibliography & Avoiding Plagiarism', 'Paraphrase source ideas and credit authors using standardized APA/MLA conventions', 'Academic research requires distinguishing direct quotations (in quotation marks with page number) from paraphrased syntheses, maintaining academic honesty (zero plagiarism), and formatting a consistent Reference List (Author, Year, Title, Publisher/URL).', 'APA In-Text: (Ngugi, 2024, p. 42)  |  Reference: Author, A. (Year). Title. Publisher.', '🎓 Academic Citation & Integrity Standard', 'Writing Senior School Community Service Learning (CSL) and STEM research project reports.', 'Why must you still include an in-text citation even when you have rewritten another author\'s idea completely in your own words?', 'KSSEA Research & Study Skills: Formatting bibliographies and synthesizing multi-source notes.')
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // KICD GRADES 7, 8, 9, 10 KISWAHILI (Preserving G8 IDs & Grade 10 Unified Dual-Track: Kiswahili Lugha + Fasihi ya Kiswahili)
  // ────────────────────────────────────────────────────────────
  {
    curriculum: 'CBC',
    grade: 7,
    subject: 'Kiswahili',
    code: 'KISW-G7',
    trackPathway: 'Core',
    title: 'CBE Grade 7 (Junior School) Kiswahili Metro Line',
    stations: [
      {
        id: 'cbc_g7_kisw_s1',
        number: 1,
        title: '1.0 Kusikiliza na Kuzungumza: Maamkizi, Matamshi na Tanzu za Fasihi Simulizi',
        strand: 'Mada Kuu 1.0: Kusikiliza na Kuzungumza',
        icon: '🗣️',
        status: 'available',
        summary: 'Maamkizi na adabu za lugha, sauti tata (/b/ na /mb/, /d/ na /nd/), na utanzu wa hadithi.',
        subtopics: [
          stop('cbc_g7_kisw_s1_1', '1.1 Adabu za Maamkizi, Sauti Tata na Hadithi za Fasihi Simulizi', 'Mawasiliano Yenye Heshima na Ufasaha wa Sauti', 'Maamkizi hutegemea umri, wakati na uhusiano wa wazungumzaji', 'Kiswahili kina utajiri wa maamkizi kulingana na rika na wakati (Shikamoo → Marahaba, Hujambo → Sijambo, Sabalkheri → Alkheri, Masalkheri → Alkheri). Ufasaha wa matamshi hutofautisha sauti tata kama /l/ na /r/ au /ch/ na /sh/.', 'Shikamoo (kwa mkubwa) → Marahaba  |  Sabalkheri (asubuhi) → Alkheri', '🎙️ Jedwali la Maamkizi na Sauti', 'Kusalimiana kwa heshima nyumbani, shuleni na katika mikutano ya kijamii.', 'Kwa nini ni muhimu kutofautisha matamshi ya maneno "kula" na "kura" katika mazungumzo?', 'Tathmini ya KJSEA: Kutambua majibu sahihi ya maamkizi na sifa za mtambaji wa hadithi.')
        ]
      },
      {
        id: 'cbc_g7_kisw_s2',
        number: 2,
        title: '2.0 Kusoma na Kuandika: Ufahamu na Insha za Masimulizi',
        strand: 'Mada Kuu 2.0: Kusoma na Kuandika',
        icon: '📖',
        status: 'available',
        summary: 'Kusoma kwa ufahamu, matumizi ya kamusi, alama za uakifishaji, na insha za barua ya kirafiki.',
        subtopics: [
          stop('cbc_g7_kisw_s2_1', '2.1 Matumizi ya Kamusi, Ufahamu na Barua ya Kirafiki', 'Mpangilio wa Alfabeti na Muundo wa Barua ya Kindugu', 'Kamusi huonyesha tahajia, aina ya neno, ngeli na maana mbalimbali', 'Katika kamusi, maneno hupangwa kialfabeti kwa kuzingatia konsonanti na irabu. Barua ya kirafiki huwa na anwani moja ya mwandishi (juu kulia), tarehe, mwanzo wa barua (Kwa mpendwa...), mwili wenye aya, na hitimisho.', 'Anwani ya Mwandishi + Tarehe + Salamu + Mwili wa Barua + Hitimisho', '📚 Ukurasa wa Kamusi na Muundo wa Barua', 'Kuandika barua kwa jamaa na kutafuta maana ya msamiati mpya kwenye Kamusi ya Kiswahili Sanifu.', 'Unapotafuta kitenzi "tembea" au "andika" kwenye kamusi ya Kiswahili, kwa nini hakipatikani chini ya kiambishi "ku-"?', 'KJSEA Kiswahili: Kupanga maneno kialfabeti na kuandika barua ya kirafiki yenye muundo kamili.')
        ]
      },
      {
        id: 'cbc_g7_kisw_s3',
        number: 3,
        title: '3.0 Sarufi: Ngeli za Nomino (A-WA, U-I, LI-YA, KI-VI) na Aina za Maneno',
        strand: 'Mada Kuu 3.0: Sarufi na Matumizi ya Lugha',
        icon: '🧩',
        status: 'available',
        summary: 'Aina za nomino, uainishaji wa ngeli kwa misingi ya kisintaksia, vitenzi, vivumishi na vielezi.',
        subtopics: [
          stop('cbc_g7_kisw_s3_1', '3.1 Aina za Nomino na Upatanisho wa Ngeli (A-WA, U-I, LI-YA, KI-VI)', 'Msingi wa Sintaksia ya Kiswahili Sanifu', 'Ngeli za kisasa huainishwa kulingana na viambishi vya upatanisho wa kisarufi kwenye kitenzi', 'Nomino za viumbe hai wenye uhai (binadamu, wanyama, ndege, samaki, wadudu) huingia katika ngeli ya A-WA (k.m. Kipepeo a-naruka / Vipepeo wa-naruka). Miti na mimea huingia katika U-I (Mti u-meanguka / Miti i-meanguka).', 'Viumbe Hai Wote → Ngeli ya A-WA (Umoja: a-, Wingi: wa-)', '🦋 Jedwali la Ngeli za Kisintaksia', 'Kuzungumza Kiswahili sanifu bila kuchanganya ngeli za wanyama na vitu visivyo na uhai.', 'Kwa nini neno "Kifaru" huwekwa katika ngeli ya A-WA badala ya ngeli ya KI-VI?', 'KJSEA Sarufi: Kuandika sentensi katika umoja na wingi kwa kuzingatia upatanisho sahihi wa ngeli.')
        ]
      }
    ]
  },

  {
    curriculum: 'CBC',
    grade: 8,
    subject: 'Kiswahili',
    code: 'KISW-G8',
    trackPathway: 'Core',
    title: 'CBE Grade 8 (Junior School) Kiswahili Metro Line',
    stations: [
      {
        id: 'cbc_g8_kisw_s1',
        number: 1,
        title: '1.0 Sarufi na Matumizi ya Lugha',
        strand: 'Mada Kuu 1.0: Sarufi',
        icon: '🗣️',
        status: 'available',
        summary: 'Upatanisho wa ngeli, nyakati na hali, aina za maneno, na miundo ya sentensi.',
        subtopics: [
          stop(
            'cbc_g8_kisw_s1_1',
            '1.1 Upatanisho wa Ngeli (A-WA hadi PA-KU-MU)',
            'Mlingano wa Nomino na Kitenzi',
            'Kila nomino ina ngeli yake inayotawala viambishi vya maneno mengine',
            'Katika lugha ya Kiswahili, nomino zote zimepangwa katika makundi yanayoitwa ngeli kulingana na upatanisho wa kisarufi. Nomino inapotumika katika sentensi, huamuru viambishi vitakavyotokea kwenye vitenzi, vivumishi, na viwakilishi.',
            'Kiambishi cha Ngeli + Shina la Kitenzi = Muundo Sahihi',
            '🧩 Kadi za Mlingano wa Ngeli',
            'Kuzungumza na kuandika Kiswahili sanifu katika hotuba za shule, habari za redio, na vitabu.',
            'Ukipewa sentensi "Gari linaenda", ukibadilisha neno "Gari" kuwa wingi "Magari", ni nini kinachotokea kwenye kitenzi na kwa nini?',
            'Tathmini ya KJSEA: Kurekebisha makosa ya upatanisho wa ngeli katika aya fupi chini ya dakika 3.',
            [
              'Hatua 1: Tambua nomino katika sentensi na chunguza umbo lake katika umoja na wingi (k.m., Kiti / Viti).',
              'Hatua 2: Bainisha ngeli inayohusika (k.m., Kiti-Viti kipo katika ngeli ya KI-VI).',
              'Hatua 3: Hakikisha viambishi awali vya kitenzi vinalingana: Kiti ki-meanguka, Viti vi-meanguka.'
            ],
            'Nomino: Embe / Maembe (Ngeli ya LI-YA).\nUmoja: Embe li-meiva na li-taliwa vizuri.\nWingi: Maembe ya-meiva na ya-taliwa vizuri.'
          ),
          stop('cbc_g8_kisw_s1_2', '1.2 Nyakati na Hali (-na-, -li-, -ta-, -me-, -ki-)', 'Uwakilishaji wa Wakati Kisarufi', 'Viambishi vya kati huonyesha lini tendo lilipotendeka na jinsi lilivyofanyika', 'Tendo linaweza kutendeka sasa hivi (-na-), lilipita zamani (-li-), litatokea baadaye (-ta-), limetimia sasa hivi (-me-), au lina masharti/muendelezo (-ki-).', 'Kiambishi cha Nafsi + Kiambishi cha Wakati + Shina la Kitenzi', '⏳ Mstari wa Nyakati na Matukio', 'Kueleza ripoti za matukio ya kihistoria na ratiba za safari za kila siku.', 'Kuna tofauti gani kimaana kati ya sentensi "Mwanafunzi amesoma kitabu" na "Mwanafunzi alisoma kitabu"?', 'KJSEA Model Item: Kubainisha viambishi vya nyakati na hali katika sentensi mseto.')
        ]
      },
      {
        id: 'cbc_g8_kisw_s2',
        number: 2,
        title: '2.0 Kusoma na Ufahamu wa Matini',
        strand: 'Mada Kuu 2.0: Kusoma',
        icon: '📖',
        status: 'available',
        summary: 'Kusoma kwa kina, kudadisi wazo kuu, msamiati muktadhani, na ufupisho wa makala.',
        subtopics: [
          stop('cbc_g8_kisw_s2_1', '2.1 Kutambua Wazo Kuu na Ufupisho wa Makala', 'Kung’oa Ngano Kutoka Kwenye Makapi', 'Ufupisho ni kutoa ujumbe msingi bila kupoteza kiini wala maana asilia', 'Kila aya huwa na wazo kuu ambalo hubeba ujumbe mzito, huku sentensi nyingine zikiwa mifano au ufafanuzi. Ufupisho mzuri unachuja mifano na maneno ya ziada na kubakiza vidokezo muhimu.', 'Wazo Kuu + Hoja Muhimu - Mifano ya Ziada = Ufupisho Bora', '🔍 Kichujio cha Hoja Muhimu', 'Kuandaa taarifa fupi za mikutano, muhtasari wa habari, na majumuisho ya vitabu.', 'Ikiwa makala ina maneno 200 na umeambiwa ufupishe kwa maneno 50, ni vitu gani vya kwanza unapaswa kuondoa bila kupoteza kiini?', 'Mtihani wa KJSEA: Kuandika ufupisho wa maneno 60-70 ukizingatia mtiririko na idadi kamili ya maneno.')
        ]
      },
      {
        id: 'cbc_g8_kisw_s3',
        number: 3,
        title: '3.0 Kuandika: Insha na Mawasiliano Rasmi',
        strand: 'Mada Kuu 3.0: Kuandika',
        icon: '✍️',
        status: 'available',
        summary: 'Uandishi wa insha za masimulizi, wasifu binafsi (CV), barua rasmi, na dayalojia.',
        subtopics: [
          stop('cbc_g8_kisw_s3_1', '3.1 Kuandika Wasifu Binafsi (Curriculum Vitae - CV)', 'Kujieleza Kitaalamu kwenye Karatasi', 'Wasifu binafsi unaonyesha utambulisho, elimu, ujuzi, na wadhamini kwa mpangilio rasmi', 'Wasifu binafsi (CV) ni hati rasmi inayoelezea sifa za mtu: maelezo ya kibinafsi, usuli wa masomo, uzoefu wa kazi, ujuzi maalum, lugha anazomudu, na wadhamini wanaomjua vyema.', 'Utambulisho + Elimu + Ujuzi + Wadhamini = CV Kamili', '📄 Ramani ya Mpangilio wa CV', 'Kuomba kazi, kujiunga na vilabu vya shule, au kutuma maombi ya ufadhili wa masomo.', 'Kwa nini katika wasifu binafsi (CV) tunaanza na elimu au uzoefu wa hivi karibuni badala ya kuanza na shule ya chekechea?', 'KICD Writing Portfolio: Mpangilio nadhifu, lugha rasmi isiyo na ucheshi, na kufuata kanuni za uandishi.')
        ]
      },
      {
        id: 'cbc_g8_kisw_s4',
        number: 4,
        title: '4.0 Fasihi Simulizi na Utamaduni',
        strand: 'Mada Kuu 4.0: Fasihi Simulizi',
        icon: '🎭',
        status: 'available',
        summary: 'Semi, ngano, nyimbo za kitamaduni, vitendawili, na mighani ya mashujaa.',
        subtopics: [
          stop('cbc_g8_kisw_s4_1', '4.1 Ngano na Nyimbo za Kitamaduni', 'Urithi wa Simulizi za Jamii', 'Fasihi simulizi hupitishwa kwa njia ya mdomo ili kuelimisha, kuonya na kuburudisha', 'Ngano ni hadithi za kimapokeo (hurafa, hekaya, visakale, mighani). Kila ngano huwa na wahusika, mandhari, mgogoro, na funzo la maadili.', 'Msimulizi + Hadhira + Ujumbe wa Maadili = Fasihi Hai', '🔥 Simulizi Pembeni mwa Moto', 'Kuelewa mizizi ya kitamaduni na kutumia hekima za asili kutatua migogoro ya kisasa.', 'Ni sifa gani za fasihi simulizi zinazoifanya iwe tofauti na fasihi andishi inayopatikana vitabuni?', 'KJSEA Fasihi: Kueleza majukumu ya jamii na sifa za mtambaji mahiri wa ngano.')
        ]
      }
    ]
  },

  {
    curriculum: 'CBC',
    grade: 9,
    subject: 'Kiswahili',
    code: 'KISW-G9',
    trackPathway: 'Core',
    title: 'CBE Grade 9 (Junior School Capstone) Kiswahili Metro Line',
    stations: [
      {
        id: 'cbc_g9_kisw_s1',
        number: 1,
        title: '1.0 Sarufi: Mnyambuliko wa Vitenzi na Usemi Halisi / Usemi wa Taarifa',
        strand: 'Mada Kuu 1.0: Sarufi na Matumizi ya Lugha',
        icon: '🗣️',
        status: 'available',
        summary: 'Kauli za vitenzi (kutenda, kutendea, kutendwa, kutendeka, kutendana, kutendesha) na kubadili usemi.',
        subtopics: [
          stop('cbc_g9_kisw_s1_1', '1.1 Kauli za Mnyambuliko wa Vitenzi na Usemi wa Taarifa', 'Viambishi Tamati vya Kauli na Mabadiliko ya Nafsi', 'Kauli ya kutendea huonyesha kwa ajili ya nani; kutendwa huonyesha mpokeaji wa tendo', 'Vitenzi vya Kiswahili hunyambuliwa kwa kuongeza viambishi kabla ya irabu ya mwisho: soma → somea (kutendea), somwa (kutendwa), someka (kutendeka), somana (kutendana), somesha (kutendesha).', 'Shina + [-e-/-i-] (Kutendea)  |  Shina + [-w-] (Kutendwa)  |  Shina + [-esh-/-ish-] (Kutendesha)', '🔄 Gurudumu la Mnyambuliko wa Vitenzi', 'Kutoa taarifa sahihi za habari na kunyambua vitenzi katika uandishi wa insha.', 'Kitenzi "pika" kinabadilikaje katika kauli ya kutendea na kauli ya kutendewa?', 'KJSEA Gredi ya 9: Kunyambua vitenzi tata (kama "la", "nywa", "pa", "fa") na kubadilisha usemi halisi kuwa wa taarifa.')
        ]
      },
      {
        id: 'cbc_g9_kisw_s2',
        number: 2,
        title: '2.0 Kuandika na Kusoma: Barua Rasmi, Shajara na Uchambuzi wa Tamthilia',
        strand: 'Mada Kuu 2.0: Kusoma na Kuandika',
        icon: '✍️',
        status: 'available',
        summary: 'Muundo wa barua rasmi yenye anwani mbili, uandishi wa shajara na ratiba, na uhakiki wa tamthilia.',
        subtopics: [
          stop('cbc_g9_kisw_s2_1', '2.1 Muundo wa Barua Rasmi na Uhakiki wa Tamthilia', 'Anwani Mbili, Kumbukumbu (Mada) na Lugha Rasmi', 'Barua rasmi hufuata muundo mahsusi wa kiofisi bila maneno ya mtaani', 'Barua rasmi ina anwani ya mwandishi (juu kulia), tarehe, anwani ya mpokeaji (kushoto), salamu rasmi (Kwa Bwana/Bibi), mada iliyopigiwa mstari (MINT: / KUH: ...), mwili wenye hoja fupi, na hitimisho (Wako mwaminifu + sahihi + jina).', 'Anwani ya Mwandishi + Tarehe + Anwani ya Mpokeaji + Salamu + KUH: + Mwili + Hitimisho', '✉️ Kielelezo cha Barua Rasmi', 'Kuandika barua ya kuomba nafasi ya kazi au ufadhili wa masomo kwa lugha ya Kiswahili.', 'Kuna tofauti gani kuu tatu za kimuundo kati ya barua rasmi na barua ya kirafiki?', 'KJSEA Insha: Kuandika barua rasmi yenye muundo na sajili kamili ya kiofisi.')
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // KICD GRADE 10 KISWAHILI (Unified Sidebar Subject with Dual-Track Stations:
  // Track A: Kiswahili Lugha [1.0–4.0]
  // Track B: Fasihi ya Kiswahili [5.0–7.0])
  // ────────────────────────────────────────────────────────────
  {
    curriculum: 'CBC',
    grade: 10,
    subject: 'Kiswahili',
    code: 'KISW-G10',
    trackPathway: 'Core',
    title: 'CBE Grade 10 (Senior School) Kiswahili (Lugha na Fasihi) Metro Line',
    stations: [
      {
        id: 'cbc_g10_kisw_lugha_1',
        number: 1,
        title: '1.0 Kiswahili Lugha: Kusikiliza na Kuzungumza (Isimujamii)',
        strand: 'Strand 1.0: Kiswahili Lugha — Kusikiliza na Kuzungumza',
        icon: '🎙️',
        status: 'available',
        summary: 'Isimujamii na sajili za lugha (kortini, bungeni, hospitalini, biashara), matamshi bora, na hotuba.',
        subtopics: [
          stop('cbc_g10_kisw_l1_1', '1.1 Isimujamii: Sajili za Lugha katika Miktadha Mbalimbali', 'Uteuzi wa Msamiati na Muundo Kulingana na Muktadha', 'Lugha hubadilika kulingana na mahali, mada, uhusiano na lengo la mawasiliano', 'Isimujamii huchunguza uhusiano kati ya lugha na jamii. Sajili ya mahakamani hutumia msamiati wa kisheria (mshukiwa, mlalamishi, rufaa, kifungu cha sheria); sajili ya bungeni hutumia lugha ya heshima (Mheshimiwa Spika, hoja ya nidhamu, mswada); sajili ya biashara hutumia lugha ya kushawishi na kupunguza bei.', 'Muktadha + Wahusika + Mada = Sifa za Sajili Husika', '⚖️ Sajili za Mahakamani, Bungeni na Sokoni', 'Kubaini sajili katika vipindi vya bunge, mahakamani, matangazo ya biashara na hospitalini nchini Kenya.', 'Ni sifa gani tano za kimuundo na kimsamiati zinazotofautisha sajili ya mahakamani na sajili ya uwanjani wa kandanda?', 'KSSEA Kiswahili Karatasi ya 2: Maswali ya Isimujamii—kutambua muktadha na kutoa sifa za sajili kwa mifano.')
        ]
      },
      {
        id: 'cbc_g10_kisw_lugha_2',
        number: 2,
        title: '2.0 Kiswahili Lugha: Kusoma (Ufahamu na Ufupisho wa Kina)',
        strand: 'Strand 2.0: Kiswahili Lugha — Kusoma',
        icon: '📖',
        status: 'available',
        summary: 'Kusoma kwa kina, uchambuzi wa matini changamano, mbinu za ufupisho, na matumizi ya maktaba.',
        subtopics: [
          stop('cbc_g10_kisw_l2_1', '2.1 Kusoma kwa Kina, Ufahamu na Ufupisho wa Matini Changamano', 'Kuchuja Kiini cha Hoja kwa Mtiririko Sanifu', 'Ufupisho huunganisha hoja kuu kwa viunganishi bila kubadilisha dhamira ya mwandishi', 'Katika kusoma kwa kina, msomaji huchambua maana ya juu na maana fiche, mwelekeo wa mwandishi, na msamiati muktadhani. Katika ufupisho, dondoo kuu huorodheshwa kwenye matayarisho kisha kuunganishwa katika aya moja au mbili kwa lugha nathari.', 'Matayarisho (Hoja Kuu) → Nakala Safi (Aya Iliyoshikamana kwa Viunganishi)', '📑 Uchambuzi wa Matini na Ufupisho', 'Kusoma na kufupisha ripoti za kitaifa na tahariri za magazeti ya Taifa Leo.', 'Kwa nini ni kosa kuingiza maoni yako binafsi au mifano mipya wakati wa kufupisha kifungu cha ufahamu?', 'KSSEA Kiswahili Karatasi ya 2: Ufahamu (alama 15) na Ufupisho (alama 15) kwa kuzingatia idadi ya maneno.')
        ]
      },
      {
        id: 'cbc_g10_kisw_lugha_3',
        number: 3,
        title: '3.0 Kiswahili Lugha: Kuandika (Insha za Kiuchunguzi na Kiutendaji)',
        strand: 'Strand 3.0: Kiswahili Lugha — Kuandika',
        icon: '✍️',
        status: 'available',
        summary: 'Uandishi wa kumbukumbu za mikutano, ripoti za uchunguzi, hotuba, mahojiano, na insha za hoja.',
        subtopics: [
          stop('cbc_g10_kisw_l3_1', '3.1 Insha za Kiutendaji: Kumbukumbu za Mkutano na Ripoti Rasmi', 'Muundo Rasmi wa Kumbukumbu na Ripoti za Kamati', 'Kumbukumbu hurekodi maazimio ya mkutano kwa mpangilio wa ajenda', 'Kumbukumbu za mkutano zinajumuisha: Kichwa (KUMBUKUMBU ZA MKUTANO WA...), Waliohudhuria, Waliotoa Udhuru, Wasiotoa Udhuru, Waalikwa, KUMB 1/2026 Kufunguliwa kwa Mkutano, Kusomwa na Kuthibitishwa kwa Kumbukumbu za Awali, Yatokanayo, Ajenda Kuu, Mengineyo, na Kufunga Mkutano (Sahihi ya Mwenyekiti na Katibu).', 'Kichwa + Mahudhurio + Uthibitisho + Yatokanayo + Ajenda + Mengineyo + Sahihi', '📋 Muundo wa Kumbukumbu za Mkutano', 'Kuandika kumbukumbu za mkutano wa Baraza la Wanafunzi au Chama cha Mazingira shuleni.', 'Sehemu ya "Yatokanayo na Kumbukumbu za Mkutano Uliopita" ina umuhimu gani katika kumbukumbu za mkutano?', 'KSSEA Kiswahili Karatasi ya 1: Swali la lazima la Insha ya Kiutendaji (Kumbukumbu, Ripoti, au Barua Rasmi).')
        ]
      },
      {
        id: 'cbc_g10_kisw_s1',
        number: 4,
        title: '4.0 Kiswahili Lugha: Matumizi ya Lugha na Sarufi Miundo',
        strand: 'Strand 4.0: Kiswahili Lugha — Matumizi ya Lugha na Sarufi',
        icon: '🔬',
        status: 'available',
        summary: 'Mofimu na viambishi, vishazi huru na tegemezi, miundo ya sentensi (sahili, ambatani, changamano), na uchanganuzi.',
        subtopics: [
          stop(
            'cbc_g10_kisw_s1_1',
            '4.1 Miundo ya Sentensi (Sahili, Ambatani, Changamano) na Uchanganuzi',
            'Majengo ya Sentensi za Kiswahili (KN + KT)',
            'Sentensi sahili ina kishazi huru kimoja; changamano ina kishazi tegemezi na kishazi huru',
            'Sentensi sahili ina wazo moja na kitenzi kikuu kimoja. Sentensi ambatani huunganisha vishazi huru viwili au zaidi kwa viunganishi (na, lakini, bali, au). Sentensi changamano ina kishazi tegemezi (kinachotambulishwa na o-rejeshi au viambishi vya masharti -ki-, -nge-, -ngali-) pamoja na kishazi huru.',
            'S → KN (Kikundi Nomino) + KT (Kikundi Tenzi)',
            '🌳 Mchoro wa Matawi na Visanduku vya Sentensi',
            'Kuchanganua sentensi changamano katika maandishi ya kitaaluma na kisheria.',
            'Sentensi "Mwalimu alipoingia darasani, wanafunzi walisimama" ni ya aina gani kati ya sahili, ambatani au changamano, na unaithibitishaje?',
            'KSSEA Kiswahili Karatasi ya 2: Kuchanganua sentensi kwa njia ya mishale, visanduku (jedwali), na matawi.',
            [
              'Hatua 1: Chunguza idadi ya vitenzi na vishazi vilivyomo kwenye sentensi.',
              'Hatua 2: Tambua kama kuna vishazi vinavyojitegemea pekee au kama kuna kishazi kinachotegemea kingine.',
              'Hatua 3: Bainisha KN (Nomino, Kivumishi, Kishazi Tegemezi) na KT (Kitenzi, Shamirisho, Chagizo).'
            ],
            'Sahili: Mwanafunzi amefaulu mtihani.\nAmbatani: Mwanafunzi alisoma kwa bidii na akafaulu mtihani.\nChangamano: Mwanafunzi aliyesoma kwa bidii amefaulu mtihani.'
          ),
          stop('cbc_g10_kisw_l4_2', '4.2 Shamirisho (Kipozi, Kitondo, Ala) na Chagizo katika Sentensi', 'Majukumu ya Nomino na Vielezi Ndani ya Kikundi Tenzi (KT)', 'Kipozi hupokea tendo moja kwa moja; Kitondo hunufaika; Ala ni kifaa kilichotumika', 'Katika Kikundi Tenzi (KT): Shamirisho Kipozi ni nomino inayopokea tendo moja kwa moja; Shamirisho Kitondo ni mtendewa anayefaidika au kuathirika (kitenzi huwa katika kauli ya kutendea); Shamirisho Ala ni kifaa kilichotumika kutendea kazi. Chagizo ni kielezi kinachofafanua kitenzi.', 'Mama alimpikia mtoto (Kitondo) uji (Kipozi) kwa sufuria (Ala) jikoni (Chagizo)', '🎯 Utambulisho wa Shamirisho na Chagizo', 'Kubainisha vipashio vya kisarufi katika sentensi za Kiswahili.', 'Katika sentensi "Fundi alimshonea mwanafunzi sare mpya kwa cherehani haraka", tambua Kipozi, Kitondo, Ala na Chagizo.', 'KSSEA Sarufi: Kutofautisha Shamirisho Kipozi, Kitondo na Ala pamoja na aina za Chagizo.')
        ]
      },
      {
        id: 'cbc_g10_kisw_fasihi_1',
        number: 5,
        title: '5.0 Fasihi ya Kiswahili: Fasihi Simulizi (Tanzu na Vipera)',
        strand: 'Strand 5.0: Fasihi ya Kiswahili — Fasihi Simulizi',
        icon: '🥁',
        status: 'available',
        summary: 'Tanzu nne za Fasihi Simulizi (Hadithi, Semi, Ushairi Simulizi, Maigizo), ngomezi, miviga, na utafiti wa nyanjani.',
        subtopics: [
          stop('cbc_g10_kisw_f1_1', '5.1 Tanzu na Vipera vya Fasihi Simulizi: Hadithi, Semi, Maigizo na Ngomezi', 'Hazina ya Utamaduni, Falsafa na Sanaa ya Jamii', 'Fasihi simulizi ni hai, shirikishi, na hubadilika kulingana na muktadha na hadhira', 'Fasihi Simulizi imegawanyika katika tanzu kuu: (1) Hadithi (ngano za hurafa, hekaya, mighani, visakale, tarihi), (2) Ushairi Simulizi (nyimbo, maghani, majigambo/vivugo, ತಂಬiko), (3) Semi (methali, vitendawili, nahau, misemo, vitanza ndimi), na (4) Maigizo (miviga, matambiko, ngomezi).', 'Tanzu za Fasihi Simulizi = Hadithi + Ushairi Simulizi + Semi + Maigizo', '🎭 Ramani ya Tanzu na Vipera vya Fasihi Simulizi', 'Kuhifadhi na kuwasilisha mighani ya mashujaa wa jamii za Kenya kama Fumo Liyongo na Mekatilili wa Menza.', 'Tofautisha kati ya "Majigambo (Vivugo)" na "Pembezi (Tondozi)" katika utanzu wa maghani ya ushairi simulizi.', 'KSSEA Fasihi Karatasi ya 3: Swali la Fasihi Simulizi—kuchambua sifa, umuhimu, na mbinu za ukusanyaji data nyanjani.')
        ]
      },
      {
        id: 'cbc_g10_kisw_fasihi_2',
        number: 6,
        title: '6.0 Fasihi ya Kiswahili: Ushairi (Arudhi, Bahari na Uchambuzi)',
        strand: 'Strand 6.0: Fasihi ya Kiswahili — Ushairi',
        icon: '📜',
        status: 'available',
        summary: 'Arudhi za ushairi wa kimapokeo na kisasa (tarbia, takhmisa, masivina), mizani, vina, uhuru wa mshairi, na lugha ya nathari.',
        subtopics: [
          stop('cbc_g10_kisw_f2_1', '6.1 Arudhi za Ushairi, Bahari za Mashairi na Uhuru wa Mshairi', 'Sanaa ya Vina, Mizani, Mishororo na Kibwagizo', 'Shairi la Tarbia lina mishororo minne katika kila ubeti na vipande viwili au vitatu', 'Uchambuzi wa ushairi unazingatia: Muundo/Umbo (idadi ya beti, mishororo kwa ubeti: tathlitha=3, tarbia=4, takhmisa=5; vipande: ukwapi, utao, mwandamizi; vina vya kati na mwisho; mizani; kibwagizo vs kimalizio), Bahari (mtiririko, ukara, ukaraguni, kikwamba, msuko, маsivina/huru), na Uhuru wa Mshairi (inkisari, mazida, tabdila, kuboronga sarufi).', 'Tarbia = Mishororo 4 kwa Ubeti  |  Mizani ya kawaida = 8, 8 (jumla 16)', '📐 Kipimo cha Vina na Mizani ya Ubeti', 'Kutunga na kuchambua mashairi katika tamasha za muziki na mashindano ya kitaifa.', 'Mshairi anapofupisha neno "alipokuja" kuwa "alipokuya" au "sikiliza" kuwa "skiza" ili kutosheleza vina au mizani, ametumia uhuru upi wa kishairi?', 'KSSEA Fasihi Karatasi ya 3: Kuchambua muundo wa shairi, kuandika ubeti kwa lugha nathari, na kubainisha toni na dhamira.')
        ]
      },
      {
        id: 'cbc_g10_kisw_s2',
        number: 7,
        title: '7.0 Fasihi ya Kiswahili: Bunilizi (Riwaya, Tamthilia na Hadithi Fupi)',
        strand: 'Strand 7.0: Fasihi ya Kiswahili — Bunilizi',
        icon: '📚',
        status: 'available',
        summary: 'Uchambuzi wa dhamira, maudhui, wahusika, mandhari, migogoro, na mbinu za uandishi katika vitabu teule.',
        subtopics: [
          stop(
            'cbc_g10_kisw_s2_1',
            '7.1 Uchambuzi wa Wahusika, Maudhui na Mbinu za Kifasihi katika Bunilizi',
            'Kuvumbua Ujumbe Uliofichwa Kwenye Riwaya, Tamthilia na Hadithi Fupi',
            'Wahusika ni vioo vya jamii vinavyobeba mawazo, migogoro na falsafa ya mwandishi',
            'Kusoma kitabu cha bunilizi (riwaya, tamthilia, hadithi fupi) kunahitaji kuchambua Fani na Maudhui. Maudhui makuu (uongozi bora, ufisadi, haki za kijinsia, elimu, mabadiliko ya tabianchi) hujengwa kupitia wahusika (wakuu, wadogo, bapa, duara, foili) na mbinu za uandishi (jazanda, kinaya, majazi, kisengere nyuma/mbele, taharuki, taswira).',
            'Fani (Wahusika + Mandhari + Mbinu za Lugha) + Maudhui = Kazi Bora ya Bunilizi',
            '🎭 Kioo cha Jamii na Uchambuzi wa Bunilizi',
            'Kuhakiki vitabu teule vya shule za upili na kuoanisha maudhui na uhalisia wa jamii ya Kenya.',
            'Ni kwa nini mwandishi wa tamthilia au riwaya mara nyingi humweka mhusika mwenye dosari badala ya mhusika mkamilifu asiye na kosa lolote?',
            'KSSEA Kiswahili Karatasi ya 3: Kujibu maswali ya dondoo (kutaja msemaji, msemewa, mahali na sababu) na insha za kujadili maudhui.',
            [
              'Hatua 1: Katika swali la dondoo, weka dondoo katika muktadha kwa kutaja: (a) Nani anasema, (b) Anasema na nani, (c) Wakiwa wapi, na (d) Kufuatia tukio gani.',
              'Hatua 2: Bainisha sifa za wahusika kwa kutumia vivumishi na kutolea ithibati kutoka kitabuni.',
              'Hatua 3: Changanua tamathali za usemi na mbinu za sanaa zilizotumika katika dondoo.'
            ],
            'Maudhui ya Uongozi: Mhusika kiongozi anapopuuza ushauri wa wananchi na kusababisha migogoro, mwandishi hutumia kinaya na jazanda kukashifu ubinafsi.'
          )
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // KICD ADDITIONAL PLATFORM SUBJECTS (Ensuring 100% DB Coverage)
  // ────────────────────────────────────────────────────────────
  // SOCIAL STUDIES (Grades 7, 8, 9)
  ...[7, 8, 9].map(g => ({
    curriculum: 'CBC',
    grade: g,
    subject: 'Social Studies',
    code: `SOC-G${g}`,
    trackPathway: 'Core',
    title: `CBE Grade ${g} (Junior School) Social Studies Metro Line`,
    stations: [
      {
        id: `cbc_g${g}_soc_s1`,
        number: 1,
        title: '1.0 Natural and the Built Environments in Africa',
        strand: 'Strand 1.0: Natural and the Built Environments',
        icon: '🗺️',
        status: 'available',
        summary: 'Map reading and interpretation, latitudes and longitudes, physical features of Africa, weather, and climate.',
        subtopics: [
          stop(`cbc_g${g}_soc_s1_1`, '1.1 Topographical Map Reading, Scales & Local Time Calculation', 'Grid References, Contours & 4 Minutes per Degree of Longitude', 'Earth rotates 360° in 24 hours (15° per hour or 1° every 4 minutes)', 'Topographical maps represent 3D relief using contour lines, spot heights, and trigonometrical stations. Local solar time increases by 4 minutes for every 1° of longitude East of Greenwich (0°) and decreases going West.', 'Time Difference (min) = ΔLongitude (°) × 4 minutes  |  East = Add, West = Subtract', '🧭 Topographical Map & Meridian Clock', 'Calculating local time in Nairobi (37°E) when a live football match kicks off in London (0°).', 'If it is 12:00 noon at Greenwich (0°), what is the local time in Nairobi located at longitude 37°E?', 'KJSEA Social Studies: Calculating map area of irregular shapes (full squares + half squares) and local time.')
        ]
      },
      {
        id: `cbc_g${g}_soc_s2`,
        number: 2,
        title: '2.0 People, Population and Social Organizations',
        strand: 'Strand 2.0: People and Population',
        icon: '👥',
        status: 'available',
        summary: 'Human origin and early civilizations in Africa, migration patterns, population structure, and peaceful conflict resolution.',
        subtopics: [
          stop(`cbc_g${g}_soc_s2_1`, '2.1 Cradle of Humankind, Pre-Colonial Civilizations & Demographic Pyramids', 'East African Rift Valley Fossils & Population Dynamics', 'Archaeological sites in Turkana and Olduvai Gorge prove Africa is the cradle of humanity', 'Prehistoric hominid fossils (Australopithecus, Homo habilis, Turkana Boy Homo erectus) discovered along the East African Rift Valley confirm human origins. Population pyramids display age-sex distribution to guide national planning.', 'Dependency Ratio = [(Pop <15 + Pop >64) ÷ Working Pop (15–64)] × 100', '🏺 Koobi Fora Archaeological Map & Population Pyramid', 'Studying fossil discoveries at Koobi Fora (Lake Turkana) and Olorgesailie in Kenya.', 'Why are most early human fossil sites in East Africa concentrated along the floor of the Great Rift Valley?', 'KJSEA Social Studies: Interpreting age-sex population pyramids of Kenya versus developed nations.')
        ]
      },
      {
        id: `cbc_g${g}_soc_s3`,
        number: 3,
        title: '3.0 Political Developments, Governance and Citizenship',
        strand: 'Strand 3.0: Political Developments and Governance',
        icon: '🏛️',
        status: 'available',
        summary: 'The Constitution of Kenya 2010, Bill of Rights, National and County devolved governments, and African Union.',
        subtopics: [
          stop(`cbc_g${g}_soc_s3_1`, '3.1 The Constitution of Kenya (2010), Devolution & Human Rights', 'Sovereignty of the People, Three Arms of Government & 47 Counties', 'Separation of powers provides checks and balances between Legislature, Executive, and Judiciary', 'The Constitution of Kenya (2010) establishes two levels of government (National and 47 County Governments) that are distinct and inter-dependent, alongside the Bill of Rights (Chapter Four) protecting fundamental freedoms.', 'National Government + 47 County Governments = Devolved Governance', '🇰🇪 Constitutional Devolution Structure', 'Understanding how County Assemblies and County Executive Committees deliver local healthcare and ECDE.', 'Why did the Constitution of Kenya (2010) introduce 47 devolved county governments instead of keeping all power centralized in Nairobi?', 'KJSEA Citizenship: Distinguishing functions of the National Assembly, the Senate, and County Assemblies.')
        ]
      }
    ]
  })),

  // PRE-TECHNICAL STUDIES (Grades 7, 8, 9)
  ...[7, 8, 9].map(g => ({
    curriculum: 'CBC',
    grade: g,
    subject: 'Pre-Technical Studies',
    code: `PTECH-G${g}`,
    trackPathway: 'Core',
    title: `CBE Grade ${g} (Junior School) Pre-Technical Studies Metro Line`,
    stations: [
      {
        id: `cbc_g${g}_ptech_s1`,
        number: 1,
        title: '1.0 Foundations of Pre-Technical Studies & Workshop Safety',
        strand: 'Strand 1.0: Foundations of Pre-Technical Studies',
        icon: '🛠️',
        status: 'available',
        summary: 'Workshop safety rules, PPE, fire safety, engineering materials (metals, non-metals, composites), and technical drawing.',
        subtopics: [
          stop(`cbc_g${g}_ptech_s1_1`, '1.1 Technical Drawing: Isometric, Oblique & Orthographic Projections', 'Universal Visual Language of Engineers and Artisans', 'Orthographic projection maps a 3D object onto Front, Plan (Top), and End views', 'Technical drawing communicates exact dimensions using standardized lines (continuous thick for visible outlines, dashed for hidden details, chain-thin for centre lines) and isometric (30° axes) or orthographic views.', 'Isometric Axes = 30° to Horizontal  |  Scale = Drawing Length : Actual Length', '📐 Isometric 30° Cube & Orthographic Views', 'Reading architectural floor plans and furniture joinery blueprints in Kenyan workshops.', 'Why do engineers use dashed lines in an orthographic drawing instead of omitting hidden internal edges?', 'KJSEA Pre-Technical Studies: Identifying drawing instruments and sketching isometric blocks.')
        ]
      },
      {
        id: `cbc_g${g}_ptech_s2`,
        number: 2,
        title: '2.0 Computer Concepts, Visual Programming & Entrepreneurship',
        strand: 'Strand 2.0: Communication, Computing and Entrepreneurship',
        icon: '💻',
        status: 'available',
        summary: 'Computer hardware/software basics, cyber safety, Scratch/spreadsheet modeling, bookkeeping, and ethical entrepreneurship.',
        subtopics: [
          stop(`cbc_g${g}_ptech_s2_1`, '2.1 Financial Bookkeeping, Cash Books & Digital Spreadsheets', 'The Fundamental Accounting Equation (Assets = Capital + Liabilities)', 'Every business transaction balances resources owned against how they were financed', 'Entrepreneurs track business health using the accounting equation: Assets (cash, stock, equipment, debtors) = Capital (owner\'s equity) + Liabilities (loans, creditors). Spreadsheets automate totals using formulas like `=SUM(B2:B10)`.', 'Assets (A) = Capital (C) + Liabilities (L)  |  Net Profit = Gross Profit - Expenses', '📊 Balance Sheet & Spreadsheet Formula Grid', 'Managing inventory and mobile money receipts for a local juakali or agribusiness enterprise.', 'If a trader starts a shop with KES 50,000 of her own savings and takes a bank loan of KES 30,000 to buy stock, what is the total value of the business Assets?', 'KJSEA Pre-Technical: Solving missing values in Assets = Capital + Liabilities and classifying current vs fixed assets.')
        ]
      }
    ]
  })),

  // AGRICULTURE & NUTRITION (Grades 7, 8, 9)
  ...[7, 8, 9].map(g => ({
    curriculum: 'CBC',
    grade: g,
    subject: 'Agriculture & Nutrition',
    code: `AGRI-G${g}`,
    trackPathway: 'Core',
    title: `CBE Grade ${g} (Junior School) Agriculture & Nutrition Metro Line`,
    stations: [
      {
        id: `cbc_g${g}_agri_s1`,
        number: 1,
        title: '1.0 Conservation of Resources & Soil Management',
        strand: 'Strand 1.0: Conservation of Resources',
        icon: '🌾',
        status: 'available',
        summary: 'Soil erosion control (terraces, gabions, strip cropping), water harvesting, minimum tillage, and organic composting.',
        subtopics: [
          stop(`cbc_g${g}_agri_s1_1`, '1.1 Soil Erosion Control, Water Harvesting & Compost Manure', 'Protecting Topsoil Fertility & Retaining Rainwater Runoff', 'Contour ploughing, terracing, and gabions slow runoff velocity so water infiltrates soil', 'Soil erosion progresses from splash → sheet → rill → gully erosion. Porous rock-filled wire gabions heal gullies; Fanya-juu terraces and mulching conserve soil moisture in semi-arid areas.', 'Splash → Sheet → Rill → Gully Erosion  |  Control: Mulching, Terraces, Gabions', '🌱 Fanya-Juu Terrace & Compost Heap Layers', 'Building Fanya-juu terraces in Machakos and Makueni to harvest seasonal rains for green grams and mangoes.', 'Why do farmers place a layer of wood ash and topsoil in a four-heap organic compost pit?', 'KJSEA Agriculture & Nutrition: Matching erosion types to control structures and explaining water retention pits.')
        ]
      },
      {
        id: `cbc_g${g}_agri_s2`,
        number: 2,
        title: '2.0 Food Production, Value Addition & Balanced Nutrition',
        strand: 'Strand 2.0: Food Production Processes and Hygiene',
        icon: '🥗',
        status: 'available',
        summary: 'Crop establishment, poultry/livestock hygiene, nutrient conservation in cooking, and agro-processing value addition.',
        subtopics: [
          stop(`cbc_g${g}_agri_s2_1`, '2.1 Agro-Processing Value Addition & Nutrient Conservation', 'Extending Shelf-Life and Multiplying Farm Gate Returns', 'Processing raw perishables into dried, milled, or packaged goods prevents post-harvest loss', 'Value addition transforms raw farm produce into high-value products (e.g. raw milk → mala/yoghurt; sweet potatoes → flour/crisps; mangoes → dried flakes/juice). Cooking vegetables with minimal water and a lid preserves water-soluble Vitamin C and B-complex.', 'Raw Produce ⎯[Processing + Packaging + Branding]→ Extended Shelf-Life & Higher Income', '🥛 Value Addition Chain & Nutrient Conservation', 'Dairy cooperatives in Kiambu and Nyandarua pasteurizing and packaging fermented milk (lala) and yoghurt.', 'Why does boiling sukuma wiki (kale) in a large pot of water for 30 minutes and pouring away the water destroy most of its nutritional value?', 'KJSEA Agriculture & Nutrition: Explaining methods of conserving vitamins during food preparation and value addition.')
        ]
      }
    ]
  })),

  // RELIGIOUS EDUCATION & CREATIVE ARTS & SPORTS (Grades 7, 8, 9)
  ...[7, 8, 9].map(g => ({
    curriculum: 'CBC',
    grade: g,
    subject: 'Religious Education',
    code: `REL-G${g}`,
    trackPathway: 'Core',
    title: `CBE Grade ${g} (Junior School) Religious Education Metro Line`,
    stations: [
      {
        id: `cbc_g${g}_rel_s1`,
        number: 1,
        title: '1.0 Stewardship of Creation, Moral Values & Social Justice',
        strand: 'Strand 1.0: Creation, Sacred Teachings and Ethical Living',
        icon: '🕊️',
        status: 'available',
        summary: 'Human responsibility over the environment, integrity, compassion, family cohesion, and peaceful coexistence.',
        subtopics: [
          stop(`cbc_g${g}_rel_s1_1`, '1.1 Environmental Stewardship, Integrity & Servant Leadership', 'Caring for Creation and Upholding Truthfulness in Society', 'True leadership serves the vulnerable with honesty, justice, and humility', 'Sacred teachings across religious traditions emphasize human stewardship over nature, honesty in commerce, care for orphans and the vulnerable, and resolving disputes through forgiveness and restorative justice.', 'Belief + Ethical Action + Community Service = Upright Citizenship', '🕊️ Stewardship & Ethical Values Compass', 'Organizing inter-faith tree planting and charity drives in local Kenyan communities.', 'How can young learners practice environmental stewardship and integrity in their daily school life?', 'KJSEA Religious Education: Applying moral values to contemporary ethical dilemmas including cyberbullying and corruption.')
        ]
      }
    ]
  })),

  ...[7, 8, 9].map(g => ({
    curriculum: 'CBC',
    grade: g,
    subject: 'Creative Arts & Sports',
    code: `ARTS-G${g}`,
    trackPathway: 'Core',
    title: `CBE Grade ${g} (Junior School) Creative Arts & Sports Metro Line`,
    stations: [
      {
        id: `cbc_g${g}_arts_s1`,
        number: 1,
        title: '1.0 Foundations of Creative Arts, Music Rhythm & Athletics',
        strand: 'Strand 1.0: Performing Arts, Visual Arts and Sports',
        icon: '🎨',
        status: 'available',
        summary: 'Elements of visual art (line, tone, texture), musical time signatures and Kenyan folk songs, and middle-distance athletics.',
        subtopics: [
          stop(`cbc_g${g}_arts_s1_1`, '1.1 Rhythm, Time Signatures, Perspective Drawing & Athletic Pacing', 'Harmony in Motion, Sound and Visual Form', 'Time signatures organize musical beats; linear perspective creates 3D depth on a flat canvas', 'In music, a 4/4 time signature has 4 crotchet (quarter-note) beats per bar. In visual arts, one-point perspective converges parallel lines toward a vanishing point on the horizon. In athletics, pacing and baton exchange inside the 20m takeover zone determine relay success.', 'Semibreve (4 beats) • Minim (2) • Crotchet (1) • Quaver (½)', '🎵 Musical Staff & Vanishing Point Perspective', 'Training for school athletics championships and performing Kenyan cultural folk dances.', 'In a 3/4 musical time signature, what does the top number 3 and the bottom number 4 tell the performer?', 'KJSEA Creative Arts & Sports: Grouping musical notes into bars, shading 3D forms, and explaining relay baton rules.')
        ]
      }
    ]
  })),

  // GRADE 10 ESSENTIAL MATHEMATICS, COMMUNITY SERVICE LEARNING, HISTORY, GEOGRAPHY, BUSINESS
  {
    curriculum: 'CBC',
    grade: 10,
    subject: 'Essential Mathematics',
    code: 'EMATH-G10',
    trackPathway: 'Core',
    title: 'CBE Grade 10 (Senior School) Essential Mathematics Metro Line',
    stations: [
      {
        id: 'cbc_g10_emath_s1',
        number: 1,
        title: '1.0 Consumer Numeracy, Taxation (PAYE & VAT) & Financial Planning',
        strand: 'Strand 1.0: Financial Literacy and Consumer Numeracy',
        icon: '💼',
        status: 'available',
        summary: 'Personal budgeting, KRA PAYE tax bands, 16% VAT eTIMS calculations, SACCO dividends, and mobile money tariffs.',
        subtopics: [
          stop('cbc_g10_emath_s1_1', '1.1 Income Tax (PAYE), Personal Relief, SHIF/Housing Levy & Net Pay', 'Stepping Through Graduated Tax Brackets', 'Net Pay = Gross Income − (PAYE Tax after Personal Relief + Statutory Deductions)', 'Progressive income tax divides taxable income into graduated slabs, taxing each slice at its bracket rate before subtracting monthly Personal Relief (KES 2,400) to find net PAYE payable.', 'PAYE Payable = Gross Tax Across Brackets − Personal Relief (KES 2,400)', '🧾 KRA Graduated Tax Slab Calculator', 'Calculating monthly payslip deductions and 16% VAT on eTIMS receipts in Kenya.', 'Why does earning a salary raise that pushes you into a higher tax bracket never result in taking home less net money overall?', 'KSSEA Essential Mathematics: Computing net salary from gross pay, graduated tax brackets, and personal relief.')
        ]
      },
      {
        id: 'cbc_g10_emath_s2',
        number: 2,
        title: '2.0 Practical Geometry, Scale Plans & Applied Statistics',
        strand: 'Strand 2.0: Practical Measurement and Data Interpretation',
        icon: '📊',
        status: 'available',
        summary: 'Floor plan costing, bill of quantities, inflation indices, and interpreting statistical charts.',
        subtopics: [
          stop('cbc_g10_emath_s2_1', '2.1 Costing Floor Plans, Packaging & Consumer Price Index (CPI)', 'Translating Scale Blueprints into Material Budgets', 'Convert scale lengths to real metres before calculating floor area and tile counts', 'When costing a building or event space from a 1:100 scale drawing, multiply drawing centimetres by 100 to obtain real centimetres (or 1 cm = 1 m), compute total area, add 10% wastage allowance for cutting tiles, and multiply by unit price.', 'Total Material Cost = ⌈(Room Area ÷ Single Tile Area) × 1.10⌉ × Price per Tile', '📐 Floor Plan Material Estimator', 'Estimating paint litres, floor tiles, and roofing sheets for a community hall project.', 'Why must a builder convert linear scale dimensions into real lengths BEFORE multiplying length by width to find floor area?', 'KSSEA Essential Mathematics: Preparing a simple Bill of Quantities (BoQ) from a scaled room diagram.')
        ]
      }
    ]
  },

  {
    curriculum: 'CBC',
    grade: 10,
    subject: 'Community Service Learning',
    code: 'CSL-G10',
    trackPathway: 'Core',
    title: 'CBE Grade 10 (Senior School) Community Service Learning (CSL) Metro Line',
    stations: [
      {
        id: 'cbc_g10_csl_s1',
        number: 1,
        title: '1.0 Community Needs Assessment & Ethical Project Design',
        strand: 'Strand 1.0: Civic Engagement and Project Cycle',
        icon: '🤝',
        status: 'available',
        summary: 'Identifying community gaps, stakeholder mapping, SMART objectives, action planning, and reflective portfolios.',
        subtopics: [
          stop('cbc_g10_csl_s1_1', '1.1 The 4-Stage CSL Action Cycle: Needs Assessment to Sustainability', 'Evidence-Based Civic Action with Local Stakeholders', 'Assess Needs → Design Ethically → Implement Collaboratively → Evaluate & Sustain', 'Community Service Learning integrates classroom academics with real community problem-solving: (1) Needs Assessment via interviews/observation, (2) Project Design with SMART goals and stakeholder mapping, (3) Action Implementation, and (4) Impact Evaluation & Portfolio Reflection.', 'Needs Assessment → SMART Plan → Collaborative Action → Impact Reflection', '🌍 4-Stage CSL Civic Action Wheel', 'Designing a school-community clean water filtration, digital literacy, or urban tree-nursery initiative.', 'Why is it essential to interview local community members during a Needs Assessment before deciding what project to build for them?', 'KSSEA CSL Portfolio Rubric: Documenting baseline problem data, stakeholder roles, budget resources, and measurable impact.')
        ]
      }
    ]
  },

  {
    curriculum: 'CBC',
    grade: 10,
    subject: 'History and Citizenship',
    code: 'HIST-G10',
    trackPathway: 'Social Sciences',
    title: 'CBE Grade 10 (Senior School) History and Citizenship Metro Line',
    stations: [
      {
        id: 'cbc_g10_hist_s1',
        number: 1,
        title: '1.0 Pre-Colonial State Formation, Anti-Colonial Resistance & Constitutionalism',
        strand: 'Strand 1.0: Historical Transformations and Governance',
        icon: '📜',
        status: 'available',
        summary: 'African state systems, scramble and partition of Africa, Mau Mau and nationalist movements, and constitutional democracy.',
        subtopics: [
          stop('cbc_g10_hist_s1_1', '1.1 Primary vs Secondary Historical Sources & Anti-Colonial Nationalism', 'Corroborating Archival, Oral and Archaeological Evidence', 'Cross-checking multiple perspectives eliminates historical bias', 'Historians reconstruct the past by triangulating archaeological artifacts, oral traditions, linguistics, and written archives. Analyzing Kenya\'s struggle for independence links early primary resistance (Nandi, Giriama, Gusii) to constitutional politics and armed liberation.', 'Source Criticism = Provenance (Who/When) + Corroboration + Contextual Analysis', '🏛️ Historical Source Triangulation Triangle', 'Visiting the Kenya National Archives and Dedan Kimathi monument in Nairobi.', 'Why must a historian compare colonial official dispatches with African oral testimonies when writing about the 1895–1905 Nandi Resistance?', 'KSSEA History & Citizenship: Analyzing causes and consequences of historical treaties and constitutional milestones.')
        ]
      }
    ]
  },

  {
    curriculum: 'CBC',
    grade: 10,
    subject: 'Geography',
    code: 'GEO-G10',
    trackPathway: 'Social Sciences',
    title: 'CBE Grade 10 (Senior School) Geography Metro Line',
    stations: [
      {
        id: 'cbc_g10_geo_s1',
        number: 1,
        title: '1.0 Geomorphology: Plate Tectonics, Faulting & The Great Rift Valley',
        strand: 'Strand 1.0: Physical Geography and Landforms',
        icon: '🌋',
        status: 'available',
        summary: 'Internal earth movements, tensional and compressional faulting, vulcanicity, and GIS/topographical map work.',
        subtopics: [
          stop('cbc_g10_geo_s1_1', '1.1 Formation of the Great Rift Valley, Escarpments & Volcanic Landforms', 'Tensional Divergent Tectonics & Graben Subsidence', 'When parallel normal faults pull apart, the central crustal block sinks to form a Rift Valley', 'Tensional forces within the East African Somalian and Nubian tectonic plates create parallel normal faults. The central block subsides to form the Rift Valley floor (graben), flanked by steep fault scarps (Mau, Elgeyo, Aberdare escarpments) and volcanic cones (Mt. Longonot, Mt. Suswa, Menengai).', 'Tensional Stress → Parallel Normal Faults → Central Block Subsidence (Graben)', '🏔️ Rift Valley Graben & Horst Block Diagram', 'Observing the Mau Escarpment, Lake Naivasha, and geothermal steam vents at Hell\'s Gate National Park.', 'How does the formation of a Rift Valley by tensional forces differ from its formation by compressional forces?', 'KSSEA Geography Paper 1: Drawing well-labeled cross-sections showing normal faults, escarpments, and rift valley formation.')
        ]
      }
    ]
  },

  {
    curriculum: 'CBC',
    grade: 10,
    subject: 'Business Studies',
    code: 'BUS-G10',
    trackPathway: 'Social Sciences',
    title: 'CBE Grade 10 (Senior School) Business Studies Metro Line',
    stations: [
      {
        id: 'cbc_g10_bus_s1',
        number: 1,
        title: '1.0 Demand, Supply, Market Equilibrium & Financial Statements',
        strand: 'Strand 1.0: Economics, Commerce and Accounting',
        icon: '📈',
        status: 'available',
        summary: 'Laws of demand and supply, equilibrium price shifts, business ownership forms, and double-entry ledger accounting.',
        subtopics: [
          stop('cbc_g10_bus_s1_1', '1.1 Market Equilibrium, Price Elasticity & Double-Entry Bookkeeping', 'Where Quantity Demanded Equals Quantity Supplied', 'For every debit entry, there must be a corresponding credit entry of equal value', 'In a free market, price adjusts until Quantity Demanded equals Quantity Supplied (Equilibrium). A non-price determinant shifts the entire curve; a change in the good\'s own price causes movement along the curve. In accounting, Debit the receiver / asset increase; Credit the giver / liability increase.', 'Equilibrium: Q_d(P) = Q_s(P)  |  Double Entry: Total Debits = Total Credits', '⚖️ Supply-Demand Equilibrium Cross & T-Accounts', 'Analyzing tomato price fluctuations at Wakulima Market during rainy vs dry seasons.', 'What happens to the equilibrium price and quantity of maize flour if a bumper harvest increases supply while consumer demand remains constant?', 'KSSEA Business Studies: Sketching demand/supply curve shifts and balancing two-column cash books and trial balances.')
        ]
      }
    ]
  }
];

module.exports = CBC_LANGUAGES_OTHER_MAPS;
