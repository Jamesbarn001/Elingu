// ══════════════════════════════════════════════════════════════
// KICD COMPETENCY-BASED EDUCATION (CBE) — ENGLISH ROADMAP
// Covers Junior School (Grade 8) and Senior School (Grade 10)
// Authentic KICD Syllabus Strands & Learning Outcomes
// ══════════════════════════════════════════════════════════════

const CBC_ENGLISH_MAPS = {
  // ────────────────────────────────────────────────────────────
  // GRADE 8 (JUNIOR SCHOOL JSS)
  // ────────────────────────────────────────────────────────────
  8: {
    curriculum: 'CBC',
    grade: 8,
    subject: 'English',
    title: 'Grade 8 English Metro Line',
    stations: [
      {
        id: 'cbc_g8_eng_s1',
        number: 1,
        title: 'Grammar in Use: Tenses, Aspects & Clauses',
        strand: 'Strand 1: Grammar in Use',
        icon: '📝',
        status: 'available',
        summary: 'Present perfect vs past simple, modal verbs of obligation, and relative clauses.',
        subtopics: [
          {
            id: 'cbc_g8_eng_s1_1',
            title: 'Present Perfect vs Past Simple in Narrative Context',
            status: 'available',
            conceptPrimer: {
              title: 'Connecting Past Actions to Present Reality',
              tagline: 'Past simple isolates an event in finished time; present perfect connects it to now',
              body: 'When you say "I lost my pen," the focus is on a finished past event. When you say "I have lost my pen," the focus is on the present consequence (I do not have a pen right now!). Present perfect always bridges the past and the immediate present moment.',
              explanationSteps: [
                'Step 1: Check if the time frame is finished (yesterday, last year, in 2022 = Past Simple).',
                'Step 2: Check if the action has an ongoing effect or unexpired time frame (today, this week, already, yet = Present Perfect).',
                'Step 3: Structure: Subject + have/has + Past Participle (e.g., "She has completed her research project").'
              ],
              workedExample: 'Incorrect: "I have seen the pride of lions yesterday." (Yesterday is finished!)\nCorrect: "I saw the pride of lions yesterday." OR "I have seen lions before."',
              formula: 'Subject + have/has + V3 (Past Participle)',
              visualBadge: '🌉 Time-Bridge Diagram',
              realWorldContext: 'Writing police statements, news reports, and academic research updates.'
            },
            socraticPrompt: 'Why does a doctor ask "Have you taken your medication?" instead of "Did you take your medication?" when examining you today?',
            examFocus: 'KJSEA Assessment: Identifying tense shifts in short prose passages and correcting aspect errors.'
          },
          {
            id: 'cbc_g8_eng_s1_2',
            title: 'Active vs Passive Voice & Objective Tone',
            status: 'available',
            conceptPrimer: {
              title: 'Putting the Action or the Recipient in the Spotlight',
              tagline: 'Active voice highlights who did it; passive voice highlights what was done',
              body: 'In active voice, the subject acts: "The ranger rescued the baby elephant." In passive voice, the object becomes the subject because the action or result matters more than the doer: "The baby elephant was rescued by the ranger." Science and journalism use passive voice to maintain objective neutrality.',
              explanationSteps: [
                'Step 1: Identify the Subject (Doer), Verb (Action), and Object (Receiver).',
                'Step 2: Move the Object to the beginning of the sentence.',
                'Step 3: Add appropriate form of "to be" + Past Participle of main verb: is/was/were/been + V3.'
              ],
              workedExample: 'Active: "The scientists discovered a clean energy source."\nPassive: "A clean energy source was discovered by the scientists."',
              formula: 'Object + form of [be] + Past Participle + [by Agent]',
              visualBadge: '🔄 Focus Shift Beam',
              realWorldContext: 'Writing laboratory reports, official government gazettes, and formal news bulletins.'
            },
            socraticPrompt: 'In a science experiment report, why do we write "5 ml of acid was added" instead of "I added 5 ml of acid"?',
            examFocus: 'KJSEA Model Question: Converting active sentences to formal passive voice without changing meaning.'
          }
        ]
      },
      {
        id: 'cbc_g8_eng_s2',
        number: 2,
        title: 'Reading Comprehension & Critical Analysis',
        strand: 'Strand 2: Reading & Comprehension',
        icon: '📖',
        status: 'available',
        summary: 'Explicit vs inferential meaning, figurative language, and tone detection.',
        subtopics: [
          {
            id: 'cbc_g8_eng_s2_1',
            title: 'Inferential Reading & Uncovering Implicit Meaning',
            status: 'available',
            conceptPrimer: {
              title: 'Reading Between the Written Lines',
              tagline: 'Authors provide clues in actions and sensory details rather than stating facts directly',
              body: 'Direct (explicit) reading finds facts stated right on the page. Inferential reading uses textual evidence plus common-sense reasoning to deduce what the author implies. If a passage says "Kiprono stared at the untouched plate and chewed his lower lip as the clock chimed," you can infer anxiety without the author writing "He was nervous."',
              explanationSteps: [
                'Step 1: Read the question carefully to spot what is being asked about feelings, motives, or atmosphere.',
                'Step 2: Gather specific textual evidence (words, physical gestures, weather descriptions).',
                'Step 3: Combine: Evidence + Logical reasoning = Verified Inference.'
              ],
              workedExample: 'Text: "Dark clouds bruised the sky, and market traders swiftly packed their grains into sacks."\nInference: A sudden thunderstorm is imminent, which would destroy exposed dry grain.',
              formula: 'Text Clue + Prior Knowledge = Valid Inference',
              visualBadge: '🕵️ Textual Detective Magnifier',
              realWorldContext: 'Critical news analysis, evaluating digital media credibility, and literary appreciation.'
            },
            socraticPrompt: 'If a character says "Oh brilliant, another flat tyre in the rain," what tone are they using, and how do words reveal their actual emotion?',
            examFocus: 'KJSEA Reading Paper: Supporting inferential claims with exact quotes from the passage.'
          }
        ]
      },
      {
        id: 'cbc_g8_eng_s3',
        number: 3,
        title: 'Functional Writing: Formal Letters & Minutes',
        strand: 'Strand 3: Functional Writing',
        icon: '✉️',
        status: 'available',
        summary: 'Format, register, and conventions for letters of application, apologies, and meeting records.',
        subtopics: [
          {
            id: 'cbc_g8_eng_s3_1',
            title: 'Formal Letter Format & Professional Register',
            status: 'available',
            conceptPrimer: {
              title: 'The Architecture of Professional Correspondence',
              tagline: 'Two addresses, clear reference line, formal salutation, and concise objective paragraphs',
              body: 'A formal letter is an official document. It requires the sender\'s address at top-right (or left block in modern formats), the recipient\'s designation and address below, date, formal salutation (Dear Sir/Madam or Dear Mr. Ochieng), an underlined Subject Reference (RE: ...), three structured paragraphs, and the appropriate sign-off.',
              explanationSteps: [
                'Step 1: Check layout: Sender Address + Date + Recipient Address + Salutation + RE: Line.',
                'Step 2: Paragraph 1 states purpose; Paragraph 2 provides supporting details; Paragraph 3 states required action.',
                'Step 3: Sign-off rule: "Yours faithfully" if name is unknown; "Yours sincerely" if addressed to a named person.'
              ],
              workedExample: 'RE: REQUEST FOR PERMISSION TO VISIT OL PEJETA CONSERVANCY\nOpening: "I am writing on behalf of the Grade 8 Wildlife Club to formally request..."\nSign-off: "Yours faithfully, [Signature], Amina Yusuf (Club Secretary)."',
              formula: 'Address + Salutation + RE + Purpose + Details + Action + Valediction',
              visualBadge: '📐 Formal Letter Grid',
              realWorldContext: 'Writing scholarship inquiries, job applications, or formal community requests to local leaders.'
            },
            socraticPrompt: 'Why do we end with "Yours faithfully" when we begin with "Dear Sir/Madam", but switch to "Yours sincerely" when we write "Dear Dr. Mwangi"?',
            examFocus: 'KICD Functional Writing: 100% compliance with layout points and zero informal slang or abbreviations.'
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
    subject: 'English',
    title: 'Grade 10 English Metro Line',
    stations: [
      {
        id: 'cbc_g10_eng_s1',
        number: 1,
        title: 'Rhetoric, Stylistic Devices & Argumentation',
        strand: 'Strand 1: Advanced Discourse & Rhetoric',
        icon: '🏛️',
        status: 'available',
        summary: 'Ethos, pathos, logos, rhetorical questions, parallel structure, and persuasive speeches.',
        subtopics: [
          {
            id: 'cbc_g10_eng_s1_1',
            title: 'The Rhetorical Triangle: Ethos, Pathos & Logos',
            status: 'available',
            conceptPrimer: {
              title: 'The Three Pillars of Persuasion',
              tagline: 'True conviction requires credible character, emotional resonance, and watertight logic',
              body: 'First articulated by Aristotle and used in every major historical address: Ethos establishes authority and moral integrity; Pathos connects with the audience\'s values and empathy; Logos provides reasoned arguments, statistics, and cause-and-effect proof. A weak argument relies on only one; a master orator balances all three.',
              explanationSteps: [
                'Step 1: Identify Ethos: Does the speaker demonstrate lived experience, expertise, or trustworthy motives?',
                'Step 2: Identify Logos: What empirical data, logical deductions, or evidence are offered?',
                'Step 3: Identify Pathos: Which vivid metaphors, human stories, or evocative diction trigger empathy?'
              ],
              workedExample: 'Speech: "As a doctor with 20 years in public hospitals (Ethos), I have treated over 4,000 cases of preventable waterborne disease (Logos). Every child crying in those wards represents a family that deserves clean water today (Pathos)."',
              formula: 'Ethos (Credibility) + Logos (Logic) + Pathos (Emotion) = Persuasion',
              visualBadge: '🔺 The Rhetorical Triangle',
              realWorldContext: 'Public debates, legal advocacy, university essays, and environmental activism.'
            },
            socraticPrompt: 'If a political advertisement uses beautiful music and smiling children without citing a single policy or statistic, which rhetorical appeal is it overusing, and what is missing?',
            examFocus: 'KSSEA English Paper 2: Analyzing argumentative discourse and identifying stylistic devices with evidence.'
          }
        ]
      }
    ]
  }
};

module.exports = CBC_ENGLISH_MAPS;
