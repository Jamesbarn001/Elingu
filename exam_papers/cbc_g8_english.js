const { mcq, short, term, buildPaper } = require('./helpers');

const PASSAGE = `The Market Day

Every Saturday, Wanjiru wakes before the cockerel crows. She helps her grandmother pack tomatoes, sukuma wiki and a few ripe mangoes into two baskets. Then they walk three kilometres to the town market. By seven o'clock the stalls are already busy with customers bargaining over prices.

Wanjiru's grandmother always says, "A smile sells more than a shout." Today a tourist stopped at their stall and asked about the mangoes. Wanjiru smiled and offered him a slice so that he could taste it. He bought six mangoes and thanked her in Kiswahili. "Asante sana," he said.

Grandmother laughed and gave Wanjiru ten shillings for her good work. Wanjiru decided that she would save the money to buy a book.`;

module.exports = buildPaper({
  id: 'elingu_cbc_g8_english_set1',
  curriculum: 'CBC',
  grade: 8,
  gradeRange: [7, 9],
  subject: 'English',
  scale: 'CBC',
  title: 'Grade 8 English — Practice Paper 1',
  series: 'Elingu practice paper, KJSEA style',
  durationMinutes: 50,
  instructions: 'Answer all questions. Section A: grammar. Section B: vocabulary. Section C: read the passage, then answer. Section D: short answers. Spelling is not marked in Section C and D, but use the correct word.'
}, [
  {
    title: 'Section A — Grammar',
    instructions: 'Choose the correct answer. Each question is worth 1 mark.',
    questions: [
      mcq('Verbs', 'Choose the correct sentence.', ['She go to school every day.', 'She goes to school every day.', 'She going to school every day.', 'She gone to school every day.'], 'B', 'With "she" (third person singular) the present simple verb takes -s: goes.'),
      mcq('Tenses', 'What is the past tense of "buy"?', ['buyed', 'boughted', 'bought', 'buys'], 'C', '"Buy" is an irregular verb: buy, bought, bought.'),
      mcq('Nouns', 'What is the plural of "child"?', ['childs', 'childes', 'childrens', 'children'], 'D', '"Child" has an irregular plural: children.'),
      mcq('Prepositions', 'Choose the correct word: The book is ___ the table.', ['on', 'in', 'at', 'to'], 'A', 'A book resting on a surface is "on" the table.'),
      mcq('Agreement', 'Choose the correct sentence (subject and verb must agree).', ['Neither of the boys were late.', 'Neither of the boys was late.', 'Neither of the boys are late.', 'Neither of the boys be late.'], 'B', '"Neither" is singular, so it takes "was".'),
      mcq('Articles', 'Choose the correct word: She is ___ honest girl.', ['a', 'an', 'the', 'no word is needed'], 'B', '"Honest" begins with a vowel sound (the h is silent), so we use "an".'),
      mcq('Adverbs', 'Which word is an adverb in the sentence "She sang beautifully"?', ['She', 'sang', 'beautifully', 'None of them'], 'C', 'An adverb describes a verb. "Beautifully" tells us how she sang.'),
      mcq('Pronouns', 'Choose the correct word: Mary and ___ went to the shop.', ['me', 'I', 'myself', 'mine'], 'B', '"Mary and I" is the subject of the sentence, so we use "I".'),
      mcq('Reported speech', 'He said, "I am tired." Choose the correct reported speech.', ['He said that he is tired.', 'He said that he was tired.', 'He said that I was tired.', 'He said that he will be tired.'], 'B', 'In reported speech the present tense moves back to the past: am → was.'),
      mcq('Voice', 'Which sentence is the passive form of "The dog chased the cat"?', ['The cat chased the dog.', 'The dog was chased by the cat.', 'The cat was chased by the dog.', 'The cat is chasing the dog.'], 'C', 'In the passive, the object (the cat) becomes the subject: The cat was chased by the dog.'),
      mcq('Question tags', 'Choose the correct question tag: You are coming, ___?', ['are you', "aren't you", "don't you", "isn't it"], 'B', 'A positive statement takes a negative tag with the same verb: are → aren\'t you.'),
      mcq('Conjunctions', 'Choose the best word: I wanted to go out, ___ it was raining.', ['and', 'so', 'but', 'or'], 'C', '"But" joins two contrasting ideas.')
    ]
  },
  {
    title: 'Section B — Vocabulary',
    instructions: 'Choose the correct answer. Each question is worth 1 mark.',
    questions: [
      mcq('Synonyms', 'Choose the word that means the same as "enormous".', ['tiny', 'huge', 'quick', 'quiet'], 'B', '"Enormous" means very large, like "huge".'),
      mcq('Antonyms', 'Choose the word that means the opposite of "ancient".', ['old', 'modern', 'dirty', 'broken'], 'B', '"Ancient" means very old; the opposite is "modern".'),
      mcq('Homophones', 'Which word sounds the same as "write"?', ['wrote', 'rite', 'right', 'writer'], 'C', '"Write" and "right" sound the same but have different meanings and spelling.'),
      mcq('Words for people', 'What do we call a person who writes books?', ['author', 'actor', 'editor', 'teacher'], 'A', 'An author writes books.'),
      mcq('Idioms', 'What does the idiom "to break the ice" mean?', ['to damage something cold', 'to start a conversation in a friendly way', 'to be very angry', 'to run away'], 'B', 'Breaking the ice means making people feel relaxed so that they can talk.'),
      mcq('Spelling', 'Which word is spelt correctly?', ['neccessary', 'necessary', 'necesary', 'nessesary'], 'B', 'Necessary has one c and two s: ne-ces-sa-ry.')
    ]
  },
  {
    title: 'Section C — Reading comprehension',
    context: PASSAGE,
    instructions: 'Read the passage "The Market Day" (shown above each question), then answer.',
    questions: [
      short('Comprehension', 'At what time are the stalls already busy?', [{ any: ['seven', '7'] }], 1, 'By seven o\'clock the stalls are already busy.', 'Seven o\'clock'),
      short('Comprehension', 'How far do Wanjiru and her grandmother walk to the market?', [{ any: ['three kilometres', '3 kilometres', '3 km', 'three km', 'three kilometers', '3 kilometers'] }], 1, 'They walk three kilometres.', 'Three kilometres'),
      mcq('Comprehension', 'What does grandmother mean by "A smile sells more than a shout"?', ['Shouting is forbidden in the market.', 'Being friendly helps you to sell more.', 'Smiling makes goods cheaper.', 'Customers cannot hear shouting.'], 'B', 'Friendly behaviour attracts customers, so you sell more than if you shout.'),
      mcq('Comprehension', 'Why did Wanjiru offer the tourist a slice of mango?', ['She wanted to get rid of old fruit.', 'So that he could taste it before buying.', 'Because he asked for it free.', 'Because her grandmother told her to leave.'], 'B', 'She offered it "so that he could taste it".'),
      short('Comprehension', 'Name two things the family sells at the market.', [{ any: ['tomatoes', 'tomato'] }, { any: ['sukuma wiki', 'sukuma', 'kale'] }, { any: ['mangoes', 'mango'] }], 2, 'Tomatoes, sukuma wiki and mangoes (any two).', 'Tomatoes and mangoes'),
      short('Comprehension', 'What did Wanjiru decide to do with the ten shillings?', [{ any: ['buy a book', 'save', 'a book', 'book'] }], 1, 'She decided to save it to buy a book.', 'Save it to buy a book'),
      mcq('Vocabulary in context', 'In the passage, the word "bargaining" means…', ['arguing angrily', 'discussing a price until both sides agree', 'stealing', 'counting money'], 'B', 'Bargaining is discussing the price to agree on one.')
    ]
  },
  {
    title: 'Section D — Short answers',
    instructions: 'Write one word or a short answer.',
    questions: [
      term('Tenses', 'Rewrite "I eat rice" in the past tense.', ['i ate rice'], 1, 'The past tense of eat is ate: "I ate rice."'),
      term('Antonyms', 'Write a word that means the opposite of "generous".', ['mean', 'selfish', 'stingy'], 1, 'Opposites of generous include mean, selfish and stingy.'),
      term('Vocabulary', 'Write one word for "a place where books are kept and lent".', ['library', 'a library'], 1, 'A library.'),
      term('Plurals', 'Write the plural of "tooth".', ['teeth'], 1, 'Tooth → teeth (irregular plural).'),
      term('Verbs', 'Write the past participle of "write".', ['written'], 1, 'write, wrote, written.')
    ]
  }
]);
