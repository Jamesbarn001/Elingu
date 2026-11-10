'use strict';
// CBC JUNIOR SCHOOL SOCIAL STUDIES, GRADE 7
// Five strands and twenty sub-strands, following the KICD Social Studies Grade 7 design
// (see docs/audits/kicd_verified_from_site.md). Replaces the earlier three-topic map (code SOC-G7).
// The three existing topics each match a KICD sub-strand, so they keep their ids and nothing is retired.
// Plain text only: no emoji.

function stop(id, title, primerTitle, tagline, body, formula, visualBadge, realWorldContext, socraticPrompt, examFocus, steps, workedExample) {
  return {
    id, title, status: 'available',
    conceptPrimer: { title: primerTitle, tagline, body, formula: formula || null, visualBadge, realWorldContext, explanationSteps: steps, workedExample },
    socraticPrompt, formulaBadge: formula || null, examFocus
  };
}

function P(id, title, o) {
  return stop(id, title, o.pt, o.tag, o.body, o.f || null, o.vis, o.ctx, o.q, o.exam,
    o.steps.map((s, i) => `Step ${i + 1}: ${s}`), o.ex.join('\n'));
}

const S1 = [], S2 = [], S3 = [], S4 = [], S5 = [];

const MAP = {
  curriculum: 'CBC',
  grade: 7,
  subject: 'Social Studies',
  code: 'SOC-G7',
  trackPathway: 'Core',
  title: 'CBE Grade 7 (Junior School) Social Studies Metro Line',
  description: 'Grade 7 Social Studies with five strands and twenty sub-strands, following the KICD Social Studies Grade 7 design.',
  notes: 'Strand and sub-strand names follow the KICD Grade 7 Social Studies design.',
  stations: [
    { id: 'cbc_g7_soc_st1', number: 1, title: '1.0 Social Studies Personal Development', strand: 'Strand 1.0: Social Studies Personal Development', icon: 'SELF', status: 'available',
      summary: 'Knowing yourself and spotting opportunities to meet needs in your community.', subtopics: S1 },
    { id: 'cbc_g7_soc_st2', number: 2, title: '2.0 People and Relationships', strand: 'Strand 2.0: People and Relationships', icon: 'PPL', status: 'available',
      summary: 'Where humans came from, early civilisations, slavery, trade and living together in peace.', subtopics: S2 },
    { id: 'cbc_g7_soc_st3', number: 3, title: '3.0 Community Service-Learning', strand: 'Strand 3.0: Community Service-Learning', icon: 'CSL', status: 'available',
      summary: 'Planning, doing and reflecting on a service project in your community.', subtopics: S3 },
    { id: 'cbc_g7_soc_st4', number: 4, title: '4.0 Natural and Historic Built Environments', strand: 'Strand 4.0: Natural and Historic Built Environments', icon: 'ENV', status: 'available',
      summary: 'Sources of history, agriculture, maps, the Earth in space, weather and fieldwork.', subtopics: S4 },
    { id: 'cbc_g7_soc_st5', number: 5, title: '5.0 Political Development and Governance', strand: 'Strand 5.0: Political Development and Governance', icon: 'GOV', status: 'available',
      summary: 'Political change in Africa, the Constitution, human rights, the African diaspora and citizenship.', subtopics: S5 }
  ]
};

// ===== CHUNK S1 =====
S1.push(P('cbc_g7_soc_s1_2', '1.1 Self-Exploration', {
  pt: 'Discovering Your Strengths, Interests and Values',
  tag: 'You cannot choose a good path until you know who is walking it',
  body: 'Self-exploration means looking carefully at yourself to learn what you are like. Four things are worth knowing. Your talents are things that come to you easily, such as singing or drawing. Your skills are abilities you have practised and improved, such as writing neatly or fixing a bicycle chain. Your interests are things you enjoy and want to spend time on. Your values are what you believe is important, such as honesty, hard work or caring for others. Your strengths are the things you do well; your weaknesses are areas where you need to grow. Knowing all this helps you make choices about friends, subjects and a future career, and helps you set goals, which are clear things you want to achieve. A weakness is not a fault: it is a place to improve.',
  f: 'Self-knowledge = talents + skills + interests + values + strengths and weaknesses',
  vis: 'A mirror with five labelled boxes around it',
  ctx: 'A learner in Machakos finds that she is good at explaining things to classmates, enjoys science and values helping others. She then thinks about teaching or medicine and sets a goal to improve her weak area, handwriting, over one term.',
  q: 'Think of something you were good at without much effort and something you became good at through practice. Which one is a talent and which is a skill?',
  exam: 'Defining talent, skill, interest, value, strength and weakness; identifying them in a short case; explaining how self-knowledge guides decisions and goals.',
  steps: [
    'Write down things people often praise you for, because others sometimes see strengths you overlook.',
    'List activities you enjoy even when nobody is watching, because these point to your interests.',
    'Separate what came naturally (talents) from what you learned by practice (skills), because skills can be grown in any area while talents show where growth is fastest.',
    'Name what matters most to you, such as honesty or family, because values guide hard decisions.',
    'Honestly list two weaknesses, because you can only improve what you admit.',
    'Set one specific goal that uses a strength or improves a weakness, with a time limit, because a vague wish is easy to abandon.'
  ],
  ex: [
    'Case: Otieno plays football well, dislikes writing, and always returns lost items to their owners.',
    'Talent or skill: he scores easily with little coaching, so football is a talent that he has also practised.',
    'Interest: football, since he plays in his free time.',
    'Value: honesty, shown by returning lost items.',
    'Weakness: writing. Goal: write a half-page diary entry each day for one term, then ask his teacher to check progress.',
    'Common mistake: thinking a weakness means you are bad or cannot change; it only marks where practice is needed.'
  ]
}));

S1.push(P('cbc_g7_soc_s1_3', '1.2 Social Entrepreneurial Opportunities', {
  pt: 'Finding a Community Need and Meeting It',
  tag: 'A need in your community is an opportunity waiting for someone with a plan',
  body: 'An entrepreneur is a person who spots an opportunity and uses resources to turn it into a product or service. A need is something people must have, such as clean water or safe waste disposal; a want is something people would like but can live without. Social entrepreneurship means meeting a community need in a way that also earns enough to keep going, so that society benefits as well as the owner. A resource is anything used to do the work: time, money, tools, skills, materials. Examples include collecting plastic waste and turning it into fuel blocks or paving, or selling affordable school-uniform repairs. To judge an idea, ask three questions: who needs this, what do I need to make it happen, and how will it keep going? Starting small and testing the idea is wiser than spending a lot at once.',
  f: 'Opportunity = unmet community need + available resources + a workable plan',
  vis: 'A need on the left, resources on the right, a bridge labelled plan between them',
  ctx: 'In many Kenyan towns, youth groups collect plastic and sell it to recyclers, or run cooperative savings groups called chamas to fund small businesses. Both solve a community problem while giving the members income.',
  q: 'Walk through your school compound or market: what is one problem you see that people would pay a small amount to have solved?',
  exam: 'Defining entrepreneur, need, want, resource; identifying a social entrepreneurial opportunity in a community; listing resources and steps to start an enterprise.',
  steps: [
    'List problems in your community, such as littered streets or lack of repair services, because every problem is a possible opportunity.',
    'Choose a problem many people share and would value solving, because a larger demand makes the idea more likely to last.',
    'List the resources needed (skills, tools, money, time) and what you already have, because the gap shows what to find.',
    'Plan how the work will be paid for, such as small fees or selling a by-product, because an enterprise that loses money soon stops.',
    'Start with a small trial and ask users what to improve, because a small test costs little to correct.',
    'Review who benefits and what is left over after costs, because that shows if the enterprise is truly helping the community.'
  ],
  ex: [
    'Case: a group in a town has piles of plastic bottles on the roadside.',
    'Need: cleaner streets. Opportunity: bottles can be sold to recyclers by weight.',
    'Resources needed: gloves, sacks, a handcart, a few members, and a buyer. They already have members and sacks; they must find gloves and a buyer.',
    'Plan: collect twice a week, store in a shed, sell monthly. Income pays for gloves and gives each member a small share.',
    'Trial: collect for one month and record kilograms sold and money earned, then decide on improvement.',
    'Common mistake: thinking a social enterprise must make no money; it needs income to continue, but its goal is also to help the community.'
  ]
}));

// ===== CHUNK S2 =====
S2.push(P('cbc_g7_soc_s2_1', '2.1 Human Origin', {
  pt: 'How Scientists Explain Where Humans Came From',
  tag: 'Fossils and tools are the evidence; East Africa holds some of the richest of it',
  body: 'Human origin is the study of where and how the human species began. Scientists called palaeontologists study fossils, which are the preserved remains or traces of ancient living things, usually found in rock. Archaeologists study objects people made, called artefacts, such as stone tools. Together the evidence shows that humans developed over a very long time from earlier human-like creatures, called hominids, and that the earliest evidence is found in Africa, especially East Africa. This is the evolution theory of human origin: living things change slowly over many generations. Many African communities also have their own origin stories, passed down orally, which explain the beginning of their people and carry their values. These are traditional beliefs; the scientific explanation rests on physical evidence that can be tested. Religious teachings give a third explanation, creation by God. A learner should be able to describe each explanation respectfully and explain what evidence supports the scientific one.',
  f: 'Evidence (fossils + artefacts) -> dating -> explanation of human origin',
  vis: 'A timeline strip with a fossil skull and a stone tool',
  ctx: 'Kenya has important sites: Koobi Fora and the Turkana Basin near Lake Turkana, Olorgesailie in the Rift Valley, and Kanam and Kanjera near Lake Victoria. The National Museums of Kenya in Nairobi display fossils from these places, including work associated with the Leakey family of researchers.',
  q: 'If you found a very old bone in the soil, what questions would you ask to decide whether it belonged to a human ancestor?',
  exam: 'Defining fossil, artefact, hominid; naming Kenyan sites; comparing scientific, religious and traditional explanations; explaining why East Africa is important.',
  steps: [
    'Define the terms: fossil, artefact, hominid, evolution, because the explanations use them.',
    'Describe the scientific explanation: living things change over many generations, because that is the idea the fossils are used to test.',
    'Name the evidence: fossil bones and stone tools found in layers of rock, because older layers lie deeper.',
    'Place the evidence: Africa, especially East Africa, has the oldest finds, because the Rift Valley exposes old layers and preserved bones.',
    'Describe the religious and traditional explanations, because different communities hold them as part of their beliefs.',
    'Compare them and respect each, because a learner can understand a view without being forced to drop their own.'
  ],
  ex: [
    'Case: archaeologists dig at a site in the Rift Valley and find stone tools in a lower layer and pottery in a higher layer.',
    'Layers: soil settles over time, so the lower layer is older.',
    'Meaning: tool makers lived there before the pottery makers, so the lower tools show earlier human activity.',
    'Conclusion: the layers help build a time order of how people lived.',
    'Common mistake: saying humans came from monkeys. The theory says humans and apes share distant common ancestors; one living animal did not turn into another.'
  ]
}));

S2.push(P('cbc_g7_soc_s2_2', '2.2 Early Civilisation', {
  pt: 'What a Civilisation Is and Where It Began in Africa',
  tag: 'A civilisation is a society that has organised its food, work, rule and record-keeping',
  body: 'A civilisation is a society with a settled way of life in which people have developed farming, cities or towns, government, trade, skilled work and some way of keeping records such as writing. Early civilisations grew where land was fertile and water was reliable, often along rivers. In Africa the best known is ancient Egypt on the River Nile. Every year the Nile flooded and left rich silt, so farmers grew a surplus, which is more food than people need. A surplus meant some people could become craftspeople, priests, soldiers and officials instead of farmers. The Egyptians developed hieroglyphic writing, a calendar, irrigation (watering land by channels), mathematics for measuring land, and large buildings such as pyramids built as royal tombs. Other African civilisations also grew, such as Kush (in present-day Sudan) and Aksum (in present-day Ethiopia and Eritrea). Early civilisations left a legacy, which is what later people inherited from them.',
  f: 'Fertile land + water -> surplus food -> specialised work + government + writing = civilisation',
  vis: 'The River Nile with farms on its banks and a pyramid in the distance',
  ctx: 'Egypt lies to the north of Kenya; the Nile begins in the lakes and highlands of East Africa, and Lake Victoria is one of its sources. Kenyans can study the same ideas in their own past, for example the Swahili city-states of the coast, which grew through trade.',
  q: 'Why would a farmer who grows exactly enough to feed his own family not be able to become a full-time builder?',
  exam: 'Defining civilisation; explaining why the Nile valley supported one; listing achievements and their uses; naming other African civilisations.',
  steps: [
    'Start with food: a river supplies water and silt, so farmers produce a surplus, because without surplus no one can leave farming.',
    'Show specialisation: some people become craftspeople, builders or officials, because the surplus feeds them.',
    'Add organisation: a ruler and officials collect food, settle disputes and plan irrigation, because large groups need order.',
    'Add record-keeping: writing and counting record taxes and laws, because memory alone cannot manage a big society.',
    'Add trade: surplus goods and crafts are exchanged, because cities need materials their land does not provide.',
    'Name the legacy: calendar, writing, irrigation, building skills, because later societies built on them.'
  ],
  ex: [
    'Case: why did Egyptian civilisation grow along the Nile and not in the desert?',
    'The river flooded each year and left silt, so crops grew well.',
    'More food than needed fed craftspeople, scribes (writers) and officials.',
    'Scribes used hieroglyphs to record grain stores and taxes; officials organised irrigation channels.',
    'So farming, writing and government together formed a civilisation.',
    'Common mistake: thinking civilisation means only buildings. A society without pyramids can still be a civilisation if it has organised rule, trade and skills.'
  ]
}));

S2.push(P('cbc_g7_soc_s2_3', '2.3 Slavery and Servitude', {
  pt: 'Slavery, Servitude and the Slave Trade',
  tag: 'Slavery treats people as property; understanding it explains why human rights matter',
  body: 'Slavery is a system in which a person is owned by another and forced to work without pay or freedom. Servitude is a wider word for being forced to serve another, including debt bondage, where a person works to pay off a debt, and forced labour. A slave trade is the buying and selling of enslaved people. Enslaved people were captured in wars and raids, kidnapped, or sold. Several slave trades affected Africa. The Trans-Saharan trade carried enslaved people across the Sahara Desert to North Africa. The Indian Ocean (East African) trade carried people from the coast and interior to Arabia, Persia and islands such as Zanzibar. The Trans-Atlantic trade carried millions of Africans to the Americas in crowded ships. Slavery harmed Africa: families were broken, communities lost young people, and fear and war increased. In the nineteenth century, campaigners and changing laws ended the trade and then slavery in stages; it is now illegal everywhere, but forms of forced labour and trafficking still exist and are crimes.',
  f: 'Slavery = ownership of a person + forced labour + no freedom',
  vis: 'A map of Africa with three arrows: across the Sahara, over the Indian Ocean, across the Atlantic',
  ctx: 'On the Kenyan coast, Mombasa and the old port of Malindi were part of the Indian Ocean trade routes. Freretown near Mombasa was set up in the nineteenth century as a settlement for freed enslaved people.',
  q: 'Why does a law that says "everyone is born free and equal" matter more to people whose history includes slavery?',
  exam: 'Defining slavery and servitude; naming the three slave trades and their routes; stating effects on Africa; explaining how the trade ended.',
  steps: [
    'Define slavery and servitude, because many people use the words loosely.',
    'Explain how people were enslaved: war captives, raids, kidnapping and debt, because this shows the trade relied on force.',
    'Trace the three routes on a map, because each had different destinations and times.',
    'List effects on Africa: loss of people, family separation, insecurity, because these show the harm to societies.',
    'Describe how the trade ended: campaigners, new laws and naval patrols, because change came from many causes.',
    'Link to the present: forced labour and human trafficking are crimes today, because the lesson is protecting freedom now.'
  ],
  ex: [
    'Case: a trader at an East African port in the nineteenth century buys captives from the interior.',
    'The captives are marched to the coast, which breaks families and empties villages of workers.',
    'Ships carry them across the Indian Ocean; this is the Indian Ocean trade route.',
    'Effect: fear of raids makes villages move or build defences and trade in other goods suffers.',
    'Today: a child forced to work without pay and unable to leave is a victim of forced labour, which Kenyan law forbids.',
    'Common mistake: thinking slavery was only the Atlantic trade. Africa had several trades, with different routes.'
  ]
}));

S2.push(P('cbc_g7_soc_s2_4', '2.4 Developments in Medium of Trade', {
  pt: 'From Barter to Money',
  tag: 'Each new way of trading solved a problem with the one before',
  body: 'Trade is the exchange of goods and services. A medium of trade is whatever is used to make the exchange. The earliest method was barter, exchanging one good directly for another, such as maize for a goat. Barter has problems. It needs a double coincidence of wants, meaning both people must want what the other has at the same moment. Goods may not be divisible (you cannot cut a goat into pieces), may spoil, and have no common measure of value. To solve this, societies used commodity money, goods accepted by everyone, such as cowrie shells, beads, salt, cattle or iron hoes. Later came metal coins, then paper notes, and today bank transfers and mobile money. Money works because it is a medium of exchange, a measure of value, and a store of value. Trade across the Sahara, the Indian Ocean coast and inland routes used all of these over time.',
  f: 'Barter -> commodity money -> coins -> notes -> mobile and electronic money',
  vis: 'A ladder: goat and maize, cowrie shell, coin, note, phone screen',
  ctx: 'Kenya\'s coast traded with Arabia, India and Persia long before colonial rule, and cowrie shells and beads were widely accepted. Today most Kenyans use M-Pesa, mobile money run by Safaricom, to pay for goods without handling cash.',
  q: 'You have a bag of maize and want a pair of shoes, but the shoe seller wants a goat. What could go wrong, and what would fix it?',
  exam: 'Defining barter and money; stating problems of barter; ordering the stages of money; explaining functions of money.',
  steps: [
    'Describe barter and give an example, because it is the starting point.',
    'List its problems: double coincidence of wants, no division, no common measure, because each led to a new solution.',
    'Show commodity money fixing the common-measure problem, because all goods can be priced in one item.',
    'Show coins and notes fixing carrying and dividing problems, because metal and paper are light and easily split into units.',
    'Show electronic money fixing distance and safety problems, because it moves without carrying cash.',
    'State the three functions of money, because they explain why it works.'
  ],
  ex: [
    'Case: Wanjiru has 20 kg of beans and wants cloth; the cloth seller wants salt.',
    'Barter problem: she must first find someone with salt who wants beans, then trade salt for cloth.',
    'With money: she sells beans for shillings, then buys cloth with the shillings.',
    'Money here is the medium of exchange, so she needs no one to match her wants.',
    'It also measures value: the beans and cloth have prices in the same unit.',
    'Common mistake: saying barter no longer happens. It still happens, but money is far more common.'
  ]
}));

S2.push(P('cbc_g7_soc_s2_5', '2.5 Diversity and Interpersonal Relationships', {
  pt: 'Living Well with People Who Are Different from You',
  tag: 'Difference is normal; respect and good communication make it a strength',
  body: 'Diversity means the many differences among people, such as ethnic group, language, religion, gender, age, ability and culture. Kenya has more than forty ethnic communities, and speaks Kiswahili and English officially along with many mother tongues. An interpersonal relationship is the connection between two or more people, for example with family, classmates and neighbours. Healthy relationships rely on respect (valuing others as they are), empathy (understanding another person\'s feelings), good communication (listening as well as speaking), honesty, and cooperation. A stereotype is a fixed, usually unfair idea about a whole group, and prejudice is a negative opinion formed before knowing a person. Discrimination is unfair treatment because of a difference. These harm relationships and the Constitution forbids discrimination. Positive ways to build relationships are active listening, apologising, sharing and working together.',
  f: 'Respect + empathy + listening + honesty = a healthy relationship across differences',
  vis: 'Circles of different colours overlapping in the centre',
  ctx: 'A Kenyan classroom, a matatu or a market gathers people from many communities. The motto of the Republic, Harambee, meaning "pull together", expresses cooperation across differences.',
  q: 'Have you ever judged someone before getting to know them? What changed once you did?',
  exam: 'Defining diversity, stereotype, prejudice, discrimination; giving examples; listing qualities of healthy relationships; handling a conflict case.',
  steps: [
    'Name the differences present in your class or community, because you cannot respect what you have not noticed.',
    'Separate fact from stereotype, because a stereotype treats everyone in a group as the same.',
    'Listen to understand, repeating what you heard, because many quarrels are misunderstandings.',
    'Show empathy by asking how the other person feels, because it leads to kinder choices.',
    'State your own view honestly without insult, because respect goes both ways.',
    'Look for something to do together, because shared work builds trust.'
  ],
  ex: [
    'Case: a new learner speaks little Kiswahili and others laugh at her accent.',
    'Spot the problem: the laughing is discrimination based on language; it makes her feel excluded.',
    'Empathy: imagine moving to a school where you did not understand the language.',
    'Action: a classmate sits with her, teaches her words and learns some of her mother tongue.',
    'Result: she joins the group work, and the class learns from her.',
    'Common mistake: treating tolerance as mere silence. Respect means actively including people, not only putting up with them.'
  ]
}));

S2.push(P('cbc_g7_soc_s2_6', '2.6 Peaceful Coexistence', {
  pt: 'Living Together in Peace',
  tag: 'Peace is not the absence of disagreement; it is handling disagreement without harm',
  body: 'Peaceful coexistence means different people and groups living side by side without violence, sharing resources and respecting each other\'s rights. A conflict is a disagreement or clash of interests, which is a normal part of life; it becomes harmful when it turns to violence. Causes include competition for resources such as land, water or pasture, misunderstanding, prejudice, unfairness and poor leadership. Peaceful ways to resolve conflict include dialogue (talking it through), negotiation (agreeing on terms), mediation (a neutral person helps both sides), and arbitration (a neutral person decides). In many Kenyan communities, councils of elders have long settled disputes. Ways to promote peace include respecting laws, sharing resources fairly, forgiving, tolerance, and joint activities such as sport and cultural festivals. National institutions such as the courts and the National Cohesion and Integration Commission also support peace.',
  f: 'Conflict -> dialogue / negotiation / mediation -> agreement -> peace',
  vis: 'Two groups at a table with a neutral person between them',
  ctx: 'Where communities share grazing land and water, such as in parts of northern Kenya, elders and peace committees work to settle disputes. In schools, peer mediators and guidance teachers do the same.',
  q: 'Two friends both want the last seat in the bus. What three different ways could they settle it peacefully?',
  exam: 'Defining conflict and peaceful coexistence; listing causes of conflict; describing and distinguishing methods of resolution; suggesting peace-building actions.',
  steps: [
    'Name the cause of the conflict, because a solution must address it.',
    'Let each side tell its story without interruption, because both need to feel heard.',
    'List what each side needs, not only what they demand, because needs can often both be met.',
    'Choose a method: talk directly, negotiate, or use a neutral mediator, because the right method depends on how serious the quarrel is.',
    'Agree on fair terms and write or state them clearly, because vague agreements break down.',
    'Review later and keep respect, because peace needs maintenance.'
  ],
  ex: [
    'Case: two villages share one well. In a dry season, one village draws more water, and the other is angry.',
    'Cause: competition for a scarce resource.',
    'Both send representatives to elders who act as mediators, and each side explains its needs.',
    'Agreement: fixed drawing times for each village and a joint committee to repair the well.',
    'Outcome: both villages get water and the committee meets monthly to check the arrangement.',
    'Common mistake: thinking a mediator decides the outcome. A mediator helps the sides agree; an arbitrator decides.'
  ]
}));

// ===== CHUNK S3 =====
S3.push(P('cbc_g7_soc_s3_2', '3.1 Community Service-Learning Project', {
  pt: 'Planning, Doing and Reflecting on a Service Project',
  tag: 'You learn most when you serve a real need and then think about what happened',
  body: 'Community Service-Learning (CSL) is a way of learning in which learners carry out a project that serves a real need in the community and then reflect on what they learned. A community is a group of people who share a place or interests, such as a school, a village or an estate. A project is a planned piece of work with a start, an end and a goal. A CSL project passes through stages. First, identify a need by observing and asking people. Second, plan: set a clear goal, list the tasks, resources, people responsible and dates, and think about risks and safety. Third, act: carry out the plan as a team. Fourth, reflect: ask what went well, what was hard, what you learned and what you would change. Fifth, share the results with the community and the school. Skills you gain include teamwork, communication, leadership, problem-solving, responsibility and respect for others. Always get permission from teachers and community leaders, and work in a safe way with an adult present. Examples: tree planting, cleaning a market, painting a school wall, visiting elderly people, or teaching younger children to read.',
  f: 'Identify need -> plan -> act -> reflect -> share',
  vis: 'A cycle of five arrows with a hand planting a seedling in the centre',
  ctx: 'Kenyan learners often join Scouts, environmental clubs and tree-planting days. A class near a river might choose to clean its bank because litter blocks the water and spreads disease.',
  q: 'If you could improve one thing in the community around your school in a month, what would it be, and how would you know it worked?',
  exam: 'Defining CSL; listing the stages of a project and giving reasons; planning a project with goal, tasks and resources; reflecting on learning and skills.',
  steps: [
    'Observe and ask people about their needs, because a project that answers a real need is useful.',
    'Choose one need that the group can realistically handle in the time given, because a small finished project beats a big unfinished one.',
    'Write the goal, tasks, people responsible, materials, dates and safety rules, because a written plan stops confusion.',
    'Seek permission from the teacher and community leaders, because they know rules and risks you may not.',
    'Carry out the work as a team, with each member having a role and a record kept of what is done, because evidence is needed to check progress.',
    'Reflect on what went well, what went wrong and what you learned, because reflection turns activity into learning.',
    'Share results and thank those who helped, because the community should see the benefit and the work can be continued.'
  ],
  ex: [
    'Case: a class of 40 notices litter blocking the drain beside the school gate.',
    'Need: cleaner drain to prevent flooding. Goal: clear it and put up two bins in one Saturday.',
    'Plan: groups of 5, each with gloves, sacks and a rake; adults supervise near the road; the county or school provides collection.',
    'Roles: 2 groups clear, 2 groups sort recyclables, 1 group makes signs.',
    'Reflect: the work took longer than planned because there were not enough sacks. Next time, count materials earlier.',
    'Skills gained: teamwork, planning and responsibility.',
    'Common mistake: treating the project as just a task. The learning step, reflection, is part of CSL.'
  ]
}));

// ===== CHUNK S4 =====
S4.push(P('cbc_g7_soc_s4_1', '4.1 Historical Information', {
  pt: 'How We Know About the Past',
  tag: 'History is built from evidence, and evidence comes from different kinds of sources',
  body: 'History is the study of past events and how people lived. Historical information is what we know about the past, and it comes from sources. A source is anything that gives information about the past. Oral sources are stories, songs, proverbs and traditions passed by word of mouth. Written sources are books, letters, newspapers and government records. Archaeological sources are objects dug from the ground, such as tools, pottery and buildings. Others include linguistics (the study of languages), genealogy (family trees), and museums and photographs. Primary sources come from the time being studied or from people who were there; secondary sources are made later by people who were not there, such as a textbook. Each source has strengths and weaknesses. Oral tradition can be forgotten or changed in retelling; written records may favour the writer\'s view. A careful historian compares several sources to check them, a process called corroboration.',
  f: 'Source (oral, written, archaeological) -> checked against other sources -> reliable history',
  vis: 'Three boxes labelled oral, written, archaeological joining into one history book',
  ctx: 'Elders in many Kenyan communities tell migration and clan stories; the Fort Jesus at Mombasa and ruins at Gedi are archaeological sources of the coastal past; the Kenya National Archives in Nairobi keeps written records.',
  q: 'If your grandmother and a school book tell different stories about the same event, how could you decide which is more reliable?',
  exam: 'Defining history and source; classifying sources; giving strengths and weaknesses of oral sources; distinguishing primary and secondary sources.',
  steps: [
    'Identify what type of source you have, because each type has its own uses and limits.',
    'Ask who made it, when and why, because a record may reflect its maker\'s view.',
    'Decide whether it is primary or secondary, because eyewitness sources are usually closer to events.',
    'Compare with at least one different type of source, because agreement raises confidence.',
    'Note differences and possible reasons, such as memory or bias, because they show how to read the sources.',
    'Draw a careful conclusion that says what is certain and what is not, because history should not claim more than the evidence shows.'
  ],
  ex: [
    'Case: a clan elder says his people settled near a hill long ago. A dig at the hill finds old pottery and tools.',
    'Source types: the elder is oral (a primary tradition); the pottery is archaeological.',
    'Comparison: both point to people living at the hill, so the oral account is supported.',
    'Limit: the digging cannot tell the clan\'s name, and the elder may have forgotten details, so some points stay uncertain.',
    'Conclusion: people lived at the hill; the exact date and clan need more evidence.',
    'Common mistake: dismissing oral sources as unreliable. They are valuable but must be cross-checked like any source.'
  ]
}));

S4.push(P('cbc_g7_soc_s4_2', '4.2 Historical Development of Agriculture', {
  pt: 'From Gathering Food to Farming',
  tag: 'Farming changed how people lived, because food could be grown rather than found',
  body: 'Agriculture is growing crops and keeping animals for food and other uses. Early humans were hunter-gatherers: they hunted animals and gathered wild fruits, roots and honey, and moved from place to place following food. Over many thousands of years, people learned to grow crops (cultivation) and to keep animals (domestication), which means taming and breeding animals for human use. This is often called the agricultural revolution. It allowed people to settle permanently, produce a surplus, grow in numbers, and form villages and towns. Early farmers used digging sticks and hoes; later came the plough drawn by animals, iron tools, irrigation and terracing. Today farming uses tractors, fertilisers, improved seeds and technology. In Africa, crops such as sorghum, millet and yams were farmed early, and cattle, sheep and goats were kept. Later crops such as maize and cassava arrived from the Americas. Farming systems include pastoralism (keeping herds and moving them to find pasture), subsistence farming (growing mainly for the family) and commercial farming (growing mainly to sell).',
  f: 'Hunting and gathering -> cultivation + domestication -> settlement -> surplus -> trade and towns',
  vis: 'Left: a hunter with a spear. Right: a farmer with a plough and a field',
  ctx: 'Kenya is known for tea, coffee, flowers and maize; Maasai and Turkana people practise pastoralism; many families farm small plots mainly for their own food.',
  q: 'Why could a village form beside a farm but not around a group that depends only on wild fruit?',
  exam: 'Defining agriculture, domestication, pastoralism; comparing hunter-gatherers and farmers; listing effects of farming; naming types of farming.',
  steps: [
    'Describe how hunter-gatherers lived, because they are the starting point.',
    'Show how cultivation and domestication gave a steadier food supply, because food could be planned.',
    'Explain settlement: crops need tending, so people stayed in one place, because fields cannot be moved.',
    'Show surplus and its effects: specialised crafts, trade, larger populations, because food freed some people for other work.',
    'List improvements in tools and methods over time, because they raised yields.',
    'Compare farming types in Kenya today, because the learner should relate history to life now.'
  ],
  ex: [
    'Case: compare a hunter-gatherer band with a farming village.',
    'The band moves with the seasons; it carries little and stays small because a lot of food cannot be stored.',
    'The village plants crops and keeps goats; granaries store grain for the dry season.',
    'Stored food lets the village grow larger and support a potter and a blacksmith.',
    'Result: farming leads to permanent settlement, bigger populations and specialised work.',
    'Common mistake: thinking farming had only benefits. It also brought risks such as drought, pests and disease, and competition over land.'
  ]
}));

S4.push(P('cbc_g7_soc_s1_1', '4.3 Maps and Map Work', {
  pt: 'Reading Maps: Scale, Direction, Grid References and Relief',
  tag: 'A map is a drawing of the ground from above, shrunk by a known amount',
  body: 'A map is a flat drawing of an area as seen from above, drawn to scale. A scale tells how much the real distance has been reduced. It can be a statement (1 cm represents 1 km), a ratio (1:50 000, meaning 1 unit on the map equals 50 000 of the same units on the ground) or a line scale (a ruler on the map). Direction is shown with the compass: the four cardinal points are North, East, South, West, with North-East, South-East, South-West and North-West between them. A key (legend) explains the symbols. Position is given with a grid reference: map lines running up and down are eastings and those running across are northings. Always read eastings first (along the bottom, "along the corridor") and then northings ("up the stairs"). Relief is the shape of the land. It is shown with contour lines, which join places of equal height above sea level. Where contours are close together the slope is steep; where wide apart the slope is gentle. A map also shows physical features (rivers, hills) and human ones (roads, schools, towns).',
  f: 'Ground distance = map distance x scale   |   Grid reference: eastings first, then northings',
  vis: 'A contour map with a grid, a compass rose and a line scale',
  ctx: 'The Survey of Kenya produces topographical maps of the country. A traveller from Nairobi to Naivasha can use a map to read distance, direction and the steep slope down the Rift Valley escarpment.',
  q: 'If two contour lines are drawn almost touching on a map, what would it feel like to walk there?',
  exam: 'Converting map distance to ground distance with a scale; giving direction and grid references; interpreting contours; using a key.',
  steps: [
    'Read the key first, because symbols differ between maps.',
    'Find the scale, because every distance depends on it.',
    'Measure the map distance with a ruler in centimetres, because the scale is defined in map units.',
    'Multiply by the scale, then convert to km, because the answer is wanted in real units.',
    'For a position, read the eastings first, then the northings, because the order is a fixed rule.',
    'For slope, compare contour spacing, because close lines show steep land.'
  ],
  ex: [
    'Case: two towns are 6 cm apart on a map of scale 1:50 000.',
    'Ground distance = 6 x 50 000 = 300 000 cm.',
    'Convert: 100 cm = 1 m, so 300 000 cm = 3 000 m.',
    '1 000 m = 1 km, so 3 000 m = 3 km.',
    'Check with the statement scale: 1:50 000 means 1 cm = 500 m, so 6 cm = 3 000 m = 3 km. They agree.',
    'Grid reference: a school is at the crossing of easting 34 and northing 56, so the reference is 3456 (four-figure), eastings first.',
    'Common mistake: giving the northing first, or forgetting to convert centimetres to kilometres.'
  ]
}));

S4.push(P('cbc_g7_soc_s4_4', '4.4 Earth and the Solar System', {
  pt: 'Our Planet in Space: Rotation, Revolution and Their Effects',
  tag: 'Day, night and the seasons come from how the Earth moves',
  body: 'The solar system is the Sun and everything that travels around it: eight planets, their moons, and smaller bodies. In order from the Sun the planets are Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune. A star is a huge ball of hot, glowing gas; the Sun is our nearest star. The Earth is nearly round and tilted on its axis, an imaginary line through the North and South Poles. Rotation is the spinning of the Earth on its axis, once in about 24 hours, from west to east. It causes day and night, because only the half of Earth facing the Sun is lit, and it makes the Sun appear to rise in the east and set in the west. Revolution is the Earth\'s movement around the Sun, taking about 365 and a quarter days. This is why we add one day every four years in a leap year. Because the axis is tilted while Earth revolves, the amount of sunlight in different places changes through the year, giving seasons in places away from the Equator. The Moon revolves around the Earth in about a month and gives rise to phases and, together with the Sun, to ocean tides. An eclipse happens when one body blocks light from another.',
  f: 'Rotation (24 hours) -> day and night   |   Revolution (about 365 and a quarter days) + tilt -> seasons',
  vis: 'The Sun, the Earth with a tilted axis and an orbit path',
  ctx: 'Kenya lies on the Equator, so day and night are about equal in length all year, close to 12 hours each, and it has little seasonal change in temperature. Countries far from the Equator have clear summer and winter.',
  q: 'If the Earth stopped rotating, what would happen to the side facing the Sun?',
  exam: 'Naming planets in order; defining rotation and revolution; explaining their effects; explaining why Kenya has similar day lengths all year.',
  steps: [
    'Place the Sun at the centre and name planets in order outward, because the order shows the arrangement.',
    'Describe rotation as spinning on the axis in 24 hours, because this is a daily motion.',
    'Link rotation to day and night and to sunrise and sunset, because each place faces the Sun for half a turn.',
    'Describe revolution around the Sun in a year, because this is a yearly motion.',
    'Add the tilt of the axis, because without it the Earth would have no seasons.',
    'Describe the Moon and eclipses, because they complete the picture of nearby bodies.'
  ],
  ex: [
    'Case: why does Nairobi have about 12 hours of daylight all year?',
    'Nairobi is close to the Equator, which is the circle halfway between the poles.',
    'At the Equator, the line separating day from night passes through the poles, so half the Equator is lit at all times.',
    'Therefore each rotation gives about 12 hours of day and 12 of night, whatever the time of year.',
    'Common mistake: confusing rotation and revolution. Rotation makes a day; revolution makes a year.'
  ]
}));

S4.push(P('cbc_g7_soc_s4_5', '4.5 Weather', {
  pt: 'Weather Elements and How We Measure Them',
  tag: 'Weather is what the air is doing today; measuring it lets us record and predict',
  body: 'Weather is the state of the atmosphere (the layer of air around the Earth) at a place over a short time, such as a day. Climate is the average weather of a place over many years, so weather changes daily but climate stays about the same. The elements of weather are temperature (how hot or cold the air is, measured in degrees Celsius with a thermometer), rainfall (water falling from the sky, measured in millimetres with a rain gauge), wind (moving air, with direction from a wind vane and speed from an anemometer), humidity (how much water vapour is in the air, measured with a hygrometer), atmospheric pressure (the weight of air, measured with a barometer), cloud cover (how much sky is covered) and sunshine. Instruments are kept in a Stevenson screen, a white box with slats that shades them while letting air flow, placed on short grass away from buildings so readings are fair. Weather stations record readings at set times each day. Forecasts use these readings to predict weather, helping farmers, pilots and fishermen.',
  f: 'Weather = temperature + rainfall + wind + humidity + pressure + cloud + sunshine, at a time and place',
  vis: 'A Stevenson screen with a rain gauge and a wind vane beside it',
  ctx: 'The Kenya Meteorological Department gives forecasts that guide farmers on when to plant at the start of the long rains (roughly March to May) and short rains (roughly October to December).',
  q: 'Why is a thermometer placed in a shaded white box instead of in direct sun?',
  exam: 'Defining weather and climate; naming elements, instruments and units; explaining the Stevenson screen; using records.',
  steps: [
    'Name the weather element, because each has its own instrument.',
    'Choose the matching instrument, such as a rain gauge for rainfall, because the right tool gives a true reading.',
    'Place it correctly, for example the thermometer in the shade, because direct sun would measure the sun and not the air.',
    'Read at the same times each day and record with units, because comparisons need consistent data.',
    'Calculate averages or totals, such as the daily mean temperature, because patterns show up in numbers.',
    'Use the records to describe the weather or to predict, because that is the purpose of measuring.'
  ],
  ex: [
    'Case: rainfall in millimetres over five days is 0, 4, 12, 0 and 9.',
    'Total = 0 + 4 + 12 + 0 + 9 = 25 mm.',
    'Mean per day = 25 divided by 5 = 5 mm.',
    'Days with rain = 3 out of 5.',
    'Interpretation: a wet spell with uneven rain; farmers might wait for steadier rain before sowing.',
    'Common mistake: calling one hot day "the climate". One day is weather; climate is a long-term average.'
  ]
}));

S4.push(P('cbc_g7_soc_s4_6', '4.6 Fieldwork', {
  pt: 'Studying a Place by Going There',
  tag: 'Fieldwork is learning outside the classroom with a plan, tools and a report',
  body: 'Fieldwork is the collection of first-hand information outside the classroom by observing, measuring, interviewing and recording. It lets learners see real places and build skills in observation and analysis. Fieldwork has three stages. Before: choose a topic and objectives (what you want to find out), make a hypothesis or key questions, visit or read about the area, prepare tools such as a notebook, pencil, tape measure, camera, map and questionnaires, plan the route and rules, and get permission and safety advice. During: observe and record, using sketches, notes, counts, measurements, photographs and interviews, and keep to the rules and the group. After: sort and organise the data, present it using tables, graphs and maps, analyse it, draw conclusions, and write a report with an introduction, objectives, methods, findings, conclusion and recommendations. Primary data is collected by you directly; secondary data comes from books or records. Ethical rules: ask permission, respect people and property, protect the environment and take nothing without agreement.',
  f: 'Prepare (aims, tools, safety) -> collect data -> present and analyse -> report',
  vis: 'Three boxes in a row: before, during, after, with a notebook and a tape measure',
  ctx: 'Typical Kenyan fieldwork sites include a nearby river, market, farm, weather station, county government office or historic site such as Fort Jesus.',
  q: 'You want to find out how a river changes along its course. What would you measure and where?',
  exam: 'Stages and activities of fieldwork; tools; types of data; writing objectives; presenting and reporting findings.',
  steps: [
    'State a clear aim, such as comparing river width at two points, because it guides what to collect.',
    'Prepare tools, route, rules and permission, because lack of preparation wastes time and creates risk.',
    'Collect data in a planned order with units and times, because careless records cannot be analysed.',
    'Sketch and take notes as well as measurements, because words and drawings capture what numbers miss.',
    'Organise data into tables and graphs, because patterns show more clearly.',
    'Write conclusions that answer the aim and add recommendations, because a report should lead to action.'
  ],
  ex: [
    'Case: a class studies a stream. Aim: find how width differs between a point near the source and one downstream.',
    'Tools: tape measure, notebook, pegs, stopwatch, safety rope.',
    'Data: near the source the stream is 1.5 m wide; downstream it is 4.5 m wide.',
    'Compare: 4.5 divided by 1.5 = 3, so the downstream width is three times the upstream width.',
    'Conclusion: the stream widens as it flows, because more water joins it from tributaries.',
    'Recommendation: repeat in the rainy season to see if width changes.',
    'Common mistake: collecting data with no clear aim, then not knowing what to write.'
  ]
}));

// ===== CHUNK S5 =====
S5.push(P('cbc_g7_soc_s5_1', '5.1 Political Development in Africa', {
  pt: 'From Traditional Rule to Colonialism to Independence',
  tag: 'Africa was governed by its own systems, then by colonial powers, then won back self-rule',
  body: 'Political development means how the way people are governed has changed over time. Before colonial rule, Africans governed themselves in different ways. Some societies were centralised, with a king or chief and officials, such as the Buganda kingdom. Others were decentralised, ruled by councils of elders and clan leaders with no single ruler, as among many Kenyan communities. Colonialism is the control of one country by another, which takes over its land, government and resources. In the late nineteenth century European powers met at the Berlin Conference (1884 to 1885) and agreed rules for dividing Africa, so borders were drawn with little regard for African communities. Colonial rule brought taxes, forced labour, loss of land and unequal laws. Africans resisted: some by fighting, such as the Nandi under their leader Koitalel, others later by forming political associations, trade unions and parties. Nationalism is the strong desire of a people to rule themselves. After the Second World War, nationalist movements grew, and from the late 1950s many countries gained independence, meaning freedom from foreign rule. Ghana in 1957 was the first in sub-Saharan Africa; Kenya became independent on 12 December 1963.',
  f: 'Traditional rule -> colonial rule -> resistance and nationalism -> independence',
  vis: 'A timeline with four blocks: traditional, colonial, nationalism, independence',
  ctx: 'In Kenya, resistance included the Nandi, the Mau Mau movement in the 1950s, and political parties such as KANU and KADU. Kenya became a republic in 1964.',
  q: 'Why might borders drawn by outsiders cause problems for communities that were split by them?',
  exam: 'Defining colonialism, nationalism, independence; comparing centralised and decentralised states; stating effects of colonial rule; naming Kenya\'s independence date.',
  steps: [
    'Describe pre-colonial systems of rule, because they show Africans governed themselves.',
    'Explain why colonial powers wanted African land and resources, because the motive explains their actions.',
    'Describe the Berlin Conference and artificial borders, because they shaped modern states.',
    'List effects of colonial rule such as taxes, loss of land and unequal laws, because they led to complaints.',
    'Show resistance turning to organised nationalism, because organised movements won negotiation power.',
    'Give the independence dates and what they changed, because they mark the return of self-rule.'
  ],
  ex: [
    'Case: a colonial tax is imposed on every adult man.',
    'Effect: to pay in money, men must work for wages on European farms, because the tax is demanded in cash.',
    'Result: labour moves away from home farms and families lose income and land use.',
    'Reaction: complaints grow, and associations form to demand fair treatment, which feeds nationalism.',
    'Common mistake: saying Africans were not governed before colonialism. They had many working systems.'
  ]
}));

S5.push(P('cbc_g7_soc_s3_1', '5.2 The Constitution of Kenya', {
  pt: 'The Supreme Law and How Kenya Is Governed',
  tag: 'A constitution is the highest set of rules that every person and office must obey',
  body: 'A constitution is a set of basic rules that says how a country is governed and what rights citizens have. Kenya\'s current Constitution was promulgated, meaning officially put into force, on 27 August 2010. It is the supreme law: any other law that conflicts with it is invalid. It opens with the Preamble, then is divided into chapters. Chapter 4 is the Bill of Rights. Important ideas include sovereignty of the people (power belongs to the people), the separation of powers and devolution. The state has three arms. The Legislature (Parliament, made up of the National Assembly and the Senate) makes laws. The Executive (the President, Deputy President and Cabinet) carries out laws and runs the government. The Judiciary (the courts) interprets the law and settles disputes. Separating them prevents one person or body from holding all power, and each checks the others. Devolution is the sharing of power and resources between the national government and the 47 county governments, so decisions are made closer to the people. Each county has a governor and a county assembly. The Constitution is changed only by a special process, which often includes a vote of the people, so that it is protected from casual change.',
  f: 'Legislature (makes laws) + Executive (runs government) + Judiciary (interprets laws) = separation of powers',
  vis: 'Three pillars labelled with the three arms of government under a roof labelled Constitution',
  ctx: 'Kenyans voted in a referendum in August 2010 to approve the Constitution. Today a county government in your area runs services such as health centres and local roads.',
  q: 'What could go wrong if the same person could make the laws, enforce them and judge people who break them?',
  exam: 'Defining constitution and promulgation; naming the three arms and their functions; explaining separation of powers and devolution; stating why a constitution matters.',
  steps: [
    'Define constitution, because the word is the basis of the topic.',
    'State when the current one began, 27 August 2010, and that it is the supreme law, because other laws must follow it.',
    'Name the three arms and give one job each, because the jobs show how government works.',
    'Explain separation of powers as checks and balances, because power shared is safer than power held by one.',
    'Explain devolution with the 47 counties, because it brings services closer to people.',
    'Give examples of each arm acting, because examples fix the ideas.'
  ],
  ex: [
    'Case: a new road law is needed.',
    'Legislature: Parliament debates and passes the law.',
    'Executive: the ministry and officials build and manage the road under the law.',
    'Judiciary: if someone claims the law is unfair or breaks the Constitution, a court decides.',
    'Check: the court can declare the law invalid if it conflicts with the Constitution, so Parliament cannot ignore the supreme law.',
    'Common mistake: thinking the President makes all laws. Laws are made by Parliament; the President carries them out.'
  ]
}));

S5.push(P('cbc_g7_soc_s5_3', '5.3 Human Rights', {
  pt: 'Rights, Responsibilities and Protection',
  tag: 'Every person has rights simply by being human, and each right comes with a duty to respect the rights of others',
  body: 'Human rights are the basic freedoms and protections that belong to every person because they are human; nobody gives them and nobody may take them away unfairly. Examples are the right to life, equality and freedom from discrimination, human dignity, freedom of expression, education, health, and freedom from slavery and torture. Children have special rights, set out in the Constitution and in the Children Act, including the right to a name and nationality, free and compulsory basic education, protection from abuse and harmful practices, and parental care. Rights are linked to responsibilities, which are things you should do: respecting other people\'s rights, obeying laws, and caring for property. Rights may be limited by law when needed, for example to protect others\' safety. Rights can be abused through discrimination, child labour, abuse and denial of education. Protection comes from the Constitution, the courts, the Kenya National Commission on Human Rights, the police, children\'s officers, chiefs and community leaders. Internationally, the United Nations adopted the Universal Declaration of Human Rights in 1948.',
  f: 'Right + Responsibility = respect for oneself and others',
  vis: 'A scale with Rights on one side and Responsibilities on the other, balanced',
  ctx: 'In Kenya, Childline 116 is a free helpline for children needing help; a child facing abuse can report to a teacher, the chief or a children\'s officer.',
  q: 'If you have the right to speak freely, what responsibility comes with it when you are speaking about another person?',
  exam: 'Defining human rights; listing children\'s rights; pairing rights with responsibilities; identifying violations in a case and where to report.',
  steps: [
    'State the right clearly, because you must name it to defend it.',
    'Link it to a duty, because one person\'s right ends where another\'s begins.',
    'Check whether any limit by law applies, because rights can be limited only for a good reason.',
    'Decide whether the case is a violation, because not every disagreement is a rights abuse.',
    'Identify who can help, such as a teacher, chief or children\'s officer, because each case needs the right route.',
    'Suggest a peaceful action, because rights are best protected by lawful means.'
  ],
  ex: [
    'Case: a 12-year-old girl is kept at home to cook and is not allowed to go to school.',
    'Right affected: the right to education.',
    'Is it a violation? Yes, because basic education is a right and compulsory, and a child cannot be denied it.',
    'Responsibility on the family: allow the child to learn; on the child: attend and study.',
    'Action: a teacher or neighbour reports to the chief or a children\'s officer; Childline 116 can also advise.',
    'Common mistake: thinking rights mean doing whatever you want. Rights come with duties and limits.'
  ]
}));

S5.push(P('cbc_g7_soc_s5_4', '5.4 African Diasporas', {
  pt: 'Africans and Their Descendants Living Abroad',
  tag: 'Millions of people across the world trace roots to Africa, and they keep shaping culture and politics',
  body: 'A diaspora is a community of people who live outside their ancestral homeland but keep ties to it. The African diaspora includes people of African descent in the Americas, the Caribbean, Europe and elsewhere. Much of it began with the Trans-Atlantic slave trade, in which millions of Africans were forcibly taken to the Americas, so they did not choose to leave. More recent diaspora comes from people moving by choice, to study, work or escape conflict. Members of the diaspora preserved African culture in music, food, language, religion and storytelling; many forms of music such as jazz, blues, reggae and samba have African roots. Diaspora leaders took part in ideas of freedom: Pan-Africanism is the idea that Africans and people of African descent share interests and should work together for freedom and unity. Figures linked to it include W. E. B. Du Bois, Marcus Garvey and Kwame Nkrumah of Ghana. The African Union, formed in 2002 to replace the Organisation of African Unity, recognises the diaspora as part of Africa\'s development. Diaspora contributions today include sending money to family (remittances), investing, sharing skills and promoting African culture.',
  f: 'Forced migration (slave trade) + later migration -> diaspora; diaspora -> culture, ideas and remittances',
  vis: 'A world map with arrows from Africa to the Americas, the Caribbean and Europe',
  ctx: 'Many Kenyans live abroad, and money they send home through mobile and bank transfers supports families, school fees and businesses.',
  q: 'Why might someone whose ancestors were taken from Africa centuries ago still feel a link to the continent?',
  exam: 'Defining diaspora and Pan-Africanism; explaining causes of the diaspora; stating contributions of the diaspora to Africa and to the world.',
  steps: [
    'Define diaspora and name where it is found, because it is a worldwide community.',
    'Explain the forced cause, the slave trade, and the voluntary causes such as work and study, because both exist.',
    'Show cultural survival in music, food and language, because it proves ties to Africa.',
    'Explain Pan-Africanism and leaders, because the diaspora took part in the fight against oppression.',
    'List current contributions such as remittances and skills, because ties still have effects today.',
    'Link to the African Union, because it shows official recognition.'
  ],
  ex: [
    'Case: a Kenyan nurse works abroad and sends part of her pay home each month.',
    'This is a voluntary diaspora: she chose to move to work.',
    'Remittance: money sent home pays her younger brother\'s school fees.',
    'Skills: she may return or train others, adding to Kenya\'s health system.',
    'Compare: descendants of enslaved Africans in the Americas did not choose to leave, but they also keep cultural links.',
    'Common mistake: assuming the diaspora began and ended with the slave trade. It also includes recent migration.'
  ]
}));

S5.push(P('cbc_g7_soc_s5_5', '5.5 Citizenship', {
  pt: 'Being a Citizen of Kenya',
  tag: 'Citizenship is belonging to a country, with the rights and duties that come with it',
  body: 'A citizen is a person who legally belongs to a country and is entitled to its protection and rights. Citizenship is the status of being a citizen. Under the Constitution of Kenya, a person can be a citizen by birth (for example, when at the time of birth at least one parent is a Kenyan citizen) or by registration (for example, through marriage to a Kenyan or after lawful residence for a long period, following the legal process). A non-citizen living in the country is a foreigner or alien. Citizens have rights such as protection by law, a passport, and the right to vote and stand for election once they are of age. Citizens also have duties: obey the law, pay taxes, vote, respect others, protect public property and the environment, and defend the country\'s unity. Good citizens take part in community life, report wrongdoing through the right channels, and help others. National symbols that unite citizens include the flag, the Coat of Arms, the National Anthem, the Constitution and the public holidays. The national values and principles of governance in the Constitution include patriotism, unity, equity, respect for human rights, integrity, transparency and accountability.',
  f: 'Citizenship = belonging (birth or registration) + rights + duties',
  vis: 'A Kenyan flag with two columns labelled rights and duties',
  ctx: 'Kenyan citizens aged 18 or more can register as voters and take part in elections. Citizens carry a national identity card from adulthood. Public holidays such as Jamhuri Day on 12 December and Madaraka Day on 1 June mark the country\'s history.',
  q: 'Which one duty of a citizen could you carry out this week, even before you are old enough to vote?',
  exam: 'Defining citizen and citizenship; ways of becoming a citizen; rights and duties; national symbols and values; qualities of a good citizen.',
  steps: [
    'Define citizenship and say how one becomes a citizen, because the legal basis comes first.',
    'List the rights that follow, because they are the benefits of belonging.',
    'List the matching duties, because rights depend on everyone doing their part.',
    'Name national symbols and values, because they express what unites citizens.',
    'Give practical examples of good citizenship at school and at home, because citizenship starts where you are.',
    'Say what good citizenship avoids, such as corruption and destroying property, because behaviour has a cost for others.'
  ],
  ex: [
    'Case: a learner finds a lost wallet at school.',
    'Value involved: integrity, which means being honest even when nobody watches.',
    'Duty: return it to the owner or hand it to a teacher.',
    'Effect: the owner trusts the school, and the learner builds a good name.',
    'Link: honesty in small things prepares a citizen for honesty in public service.',
    'Common mistake: thinking citizenship begins only at voting age. Duties such as respect, care for property and honesty apply now.'
  ]
}));

// ===== END =====

module.exports = {
  maps: [MAP],
  retiredIds: []
};
