// CBC Junior School Social Studies, Grade 9.
// Strands and sub-strands follow the KICD Grade 9 Social Studies design
// (see docs/audits/kicd_verified_from_site.md).

function stop(id, title, o) {
  return {
    id,
    title,
    status: 'available',
    conceptPrimer: {
      title: o.pt,
      tagline: o.tag,
      body: o.body,
      formula: o.formula,
      visualBadge: o.badge,
      realWorldContext: o.ctx,
      explanationSteps: o.steps,
      workedExample: o.ex
    },
    socraticPrompt: o.q,
    formulaBadge: o.formula,
    examFocus: o.exam
  };
}

const S1 = [
  stop('cbc_g9_soc_s1_2', '1.1 Pathway Choices', {
    pt: `Choosing a Senior School Pathway`,
    tag: `A good choice starts from what you are good at, what you enjoy and what the work needs`,
    body: `A career is the work a person does over many years to earn a living and serve others. A pathway is the route of study in Senior School (Grades 10 to 12) that prepares you for a group of careers. In Kenya's Competency Based Curriculum there are three pathways: Science, Technology, Engineering and Mathematics (STEM), Social Sciences, and Arts and Sports Science. After Grade 9 learners sit the Kenya Junior School Education Assessment (KJSEA), and the school records, school-based assessment and the national assessment are used together with the learner's own choice when placement is done. A good decision rests on four things. Interests are the activities you enjoy. Abilities (aptitudes) are the things you do well, shown by your marks and by what you can do with your hands and mind. Values are what matters to you, such as helping people, earning well or working outdoors. Opportunities are the courses, institutions and jobs that exist. When these four overlap, the choice is likely to suit you. A choice made only because a friend chose it, or because a job looks glamorous, ignores the learner's own evidence and often leads to regret.`,
    formula: `Interests + Abilities + Values + Opportunities = Informed pathway choice`,
    badge: `[PATH] Pathway Compass`,
    ctx: `A learner in Kisumu who loves repairing radios and scores well in Mathematics and Integrated Science weighs STEM against her cousin's advice to follow Social Sciences.`,
    steps: [
      `Step 1: List your interests, for example what you do in free time. Reason: interests keep you motivated through hard years of study.`,
      `Step 2: Check your abilities using your school reports and teachers' comments across all learning areas. Reason: evidence is more reliable than a guess about yourself.`,
      `Step 3: Write down your values, such as helping others or being outdoors. Reason: a career that clashes with your values is tiring even when you are skilled at it.`,
      `Step 4: Find out which careers each pathway leads to and what subjects they need. Reason: a pathway is a means to a career, so you must know where it leads.`,
      `Step 5: Compare options, consult parents, teachers and counsellors, then decide and keep a second choice. Reason: advice widens what you see, but the decision must be yours, and a back-up protects you if placement differs.`
    ],
    ex: `Achieng enjoys repairing radios and phones, has strong marks in Mathematics and Integrated Science, and wants a job where she builds things. Step 1, interests: repairing devices. Step 2, abilities: strong Mathematics and Science records. Step 3, value: making useful things. Step 4: the STEM pathway leads to engineering, technology and applied science courses, and these need Mathematics and science subjects. Step 5: her teacher and parents agree, and she names Social Sciences as her second choice because she also likes debating. Her four points all lead to STEM, so STEM is her first choice, reached by evidence and not by pressure from her cousin.`,
    q: `If your best friend picks a pathway and you have never talked about your own strengths, what could go wrong if you simply follow?`,
    exam: `Name the three Senior School pathways; state factors to consider when choosing a pathway; explain why a learner should not choose a career only because of friends or prestige; link a learner's strengths to a suitable pathway.`
  }),
  stop('cbc_g9_soc_s1_3', '1.2 Pre-career Support Systems', {
    pt: `Who and What Helps You Prepare for a Career`,
    tag: `Support systems turn a wish into a plan`,
    body: `A support system is the people, institutions and services that help a learner prepare for a career. Support can be human or material. Human support includes parents and guardians, who guide and provide for the learner, teachers and the school counsellor, who give guidance and counselling, and mentors, who are experienced people that advise a younger person. Role models are people whose behaviour and success we wish to copy. Community support includes religious organisations, youth groups and professionals who give career talks. Material and institutional support includes the school library, career days, bursaries and scholarships (money to pay for education, offered by bodies such as county governments, constituency committees and private organisations) and information sources like course guides. Guidance and counselling means helping a person understand themselves and make wise decisions; it is not punishment. A learner also builds a personal support system by being honest about difficulties, asking questions and keeping a record of achievements. Support only works if the learner uses it: a counsellor cannot help someone who never asks.`,
    formula: `Career readiness = Self-knowledge + Information + Guidance + Resources`,
    badge: `[HELP] Support Network`,
    ctx: `A Grade 9 learner in Kitale who cannot easily afford fees uses a school career day, her counsellor and a bursary application to plan for Senior School.`,
    steps: [
      `Step 1: List the people already around you, such as family, teachers, counsellor and neighbours with jobs you admire. Reason: you cannot use support you have not noticed.`,
      `Step 2: Decide what you need from each, for example information, advice or money. Reason: a clear request gets a useful answer.`,
      `Step 3: Approach them and ask specific questions, such as what subjects a veterinary course requires. Reason: specific questions give facts, not vague encouragement.`,
      `Step 4: Look for material support such as bursaries, and note their requirements and deadlines. Reason: missing a deadline loses the chance even if you qualify.`,
      `Step 5: Record what you learned and review your plan. Reason: written plans can be corrected as you grow and as information changes.`
    ],
    ex: `Wanjiru wants to become a veterinary doctor but her family has limited money. Step 1: she lists her mother, her Agriculture teacher, the school counsellor and a veterinary officer who visits her village. Step 2: she needs course information from the officer, advice on subjects from the counsellor and fee support from the school. Step 3: she asks the officer which subjects a veterinary course requires and how long the study takes. Step 4: the counsellor shows her how to find bursary notices, and she writes the deadlines in her notebook. Step 5: she keeps all this in a career file and reviews it at the start of each term. The result is a plan that uses several supports, not just one.`,
    q: `Think of someone who helped you learn something important this year. Which kind of support was that, and how could you ask for more of it?`,
    exam: `Define a support system; identify human and material pre-career supports; explain the role of guidance and counselling and of mentors; state ways of accessing bursaries and career information.`
  })
];

const S2 = [
  stop('cbc_g9_soc_s2_2', '2.1 Community Service-Learning Project', {
    pt: `Planning and Carrying Out a Community Project`,
    tag: `Learn by solving a real problem together with the community`,
    body: `Community Service-Learning (CSL) is a way of learning in which learners carry out a project that meets a real need in the community while applying what they have learned in class. A community is a group of people who share a place or interests, such as the families around a school. A need is something people lack that affects their well-being, for example clean water, safe waste disposal or a shortage of trees. A project is a planned set of activities with a goal, a time and resources. Good CSL follows stages. First you identify needs by observing, interviewing residents and listing problems. Then you choose one need using criteria: is it important, can learners really do something about it, is it safe, and do resources exist? Next you plan: write the goal, activities, who does what, materials, time and a budget. Then you act, keeping records. Afterwards you evaluate, asking what changed and what could be done better, and you reflect on what you learned, including values such as responsibility, cooperation and respect. A CSL project is done with the community, not for it: residents are consulted, and their permission is sought where land or property is involved. It differs from charity because it also builds the learner's skills.`,
    formula: `Identify need - Choose - Plan - Act - Evaluate - Reflect`,
    badge: `[PROJECT] CSL Cycle`,
    ctx: `Learners near a market in Nakuru notice plastic waste blocking the drain and organise a clean-up and a waste-sorting campaign with traders.`,
    steps: [
      `Step 1: Identify needs by walking around the community, interviewing people and listing problems. Reason: a project must answer a need people actually have.`,
      `Step 2: Choose one need using criteria such as importance, safety, cost and what learners can achieve. Reason: trying everything leads to doing nothing well.`,
      `Step 3: Plan the goal, activities, roles, materials, budget and dates, and get permission from leaders and owners. Reason: a written plan prevents confusion and respects the community.`,
      `Step 4: Carry out the activities, following safety rules and keeping a log of what is done. Reason: records are the evidence used for evaluation.`,
      `Step 5: Evaluate results against the goal, reflect on lessons, and report back to the community. Reason: this shows whether the need was met and teaches how to improve.`
    ],
    ex: `A class near a market lists three problems: blocked drains, a broken gate and noisy generators. Step 2: blocked drains is chosen because it harms health, learners can address it safely with gloves and adult supervision, and it needs few resources. Step 3: the goal is that the drain is clear and traders sort waste into two bins within four weeks; a teacher and the market chairperson give permission; the class prepares a materials list and a roster of who does what each week. Step 4: learners clear the area with gloves, set bins, and record the number of sacks collected each week. Step 5: they compare with the goal, find that two traders still dump waste, and plan a talk with them; they then present their findings to the market committee. The learners applied Science and Social Studies to a real problem and kept evidence at each stage.`,
    q: `If learners decide on a project without asking the people who will use it, what might they get wrong, even with good intentions?`,
    exam: `Define Community Service-Learning; list the stages of a CSL project; use criteria to choose a project; prepare a simple project plan; explain the importance of reflection and of involving the community.`
  })
];

const S3 = [
  stop('cbc_g9_soc_s2_1', '3.1 Socio-economic practices of early humans', {
    pt: `How Early Humans Lived, Worked and Fed Themselves`,
    tag: `Early people met their needs with tools, fire, shared work and, later, farming`,
    body: `Socio-economic practices are the ways people organise their lives (social) and obtain food and goods (economic). Archaeologists, who study the remains of past human activity, have found in East Africa some of the oldest evidence of human ancestors, which is why the region is called a cradle of humankind. Important Kenyan sites are around Lake Turkana (such as Koobi Fora and Nariokotome, where the skeleton of a young Homo erectus known as the Turkana Boy was found); another famous site is Olduvai Gorge in Tanzania. The Stone Age is the long period when people made tools mainly from stone, and it is divided into the Early, Middle and Late Stone Age. In the earlier periods people were hunter-gatherers: they hunted animals and gathered fruits, roots and honey, moved with the seasons in small groups and made shelters from branches or lived in caves and rock shelters. They made stone tools such as hand axes and scrapers, and later finer blades. Discovering how to control fire gave warmth, protection from animals, light and cooked food. Later, people domesticated animals (taming them for human use) and cultivated plants, which allowed them to settle in one place. Settling led to surplus food, storage, trade by barter (exchanging goods without money), pottery and larger communities. Remains such as bones, tools and rock paintings are our evidence; we cannot know everything, so historians speak of what the evidence suggests.`,
    formula: `Hunting and gathering -> Domestication and farming -> Settlement, surplus and trade`,
    badge: `[PAST] Stone Age Trail`,
    ctx: `Visiting the National Museum in Nairobi or reading about finds at Lake Turkana shows learners the tools and bones that tell how early people lived.`,
    steps: [
      `Step 1: Identify the evidence, such as stone tools, bones, fire remains and paintings. Reason: history of such early times has no writing, so objects are the only source.`,
      `Step 2: Work out what each object was used for. Reason: use shows what people needed and could do.`,
      `Step 3: Infer the way of life, for example movement, group size and food. Reason: a way of life is a conclusion built from several pieces of evidence, not from one.`,
      `Step 4: Compare earlier and later practices, such as gathering versus farming. Reason: comparison shows how and why change happened.`,
      `Step 5: State the effects of change, such as settlement, surplus and trade. Reason: effects explain how societies grew more complex.`
    ],
    ex: `Imagine archaeologists at a site near Lake Turkana find stone scrapers, animal bones with cut marks, ash layers and no remains of grain or pots. Step 1: scrapers, cut bones, ash. Step 2: scrapers prepared hides, cut marks show meat was butchered, ash shows fire was used. Step 3: no grain or pots suggests no farming and no long stay, so the group probably hunted and gathered and moved on. Step 4: compare with a later site that has grinding stones, pots and animal pens: that suggests farming and herding and staying in one place. Step 5: the later group could store food, so some people could specialise and trade. The conclusion is reasoned from evidence and stated as likely, not certain.`,
    q: `Why do you think staying in one place only became possible after people learned to grow their own food?`,
    exam: `Define archaeology, hunter-gatherer and domestication; name Kenyan or East African sites of early humans; describe the tools, fire and shelter of the Stone Age; explain how farming changed life; give sources of information on early humans.`
  }),
  stop('cbc_g9_soc_s3_2', '3.2 Indigenous knowledge systems in African Societies', {
    pt: `Knowledge That Africans Developed and Passed Down`,
    tag: `Indigenous knowledge is tested by generations of use and passed on by speaking, doing and example`,
    body: `Indigenous knowledge is the knowledge, skills and practices that a community has developed over many generations in its own environment. An indigenous knowledge system (IKS) is the way this knowledge is held, used and passed on. It is mostly passed on orally, by proverbs, riddles, stories, songs and by practice, with elders, parents and specialists teaching the young; some is also in art, tools and buildings. African societies developed knowledge in many fields. In health, herbalists used plants to treat illness and traditional birth attendants helped mothers. In farming, communities knew which crops suit which soils, practised mixed cropping and crop rotation, and built terraces on slopes to hold soil. In weather, herders and farmers read signs such as flowering of certain trees or the behaviour of birds to decide when to plant. In food preservation people dried, smoked and fermented foods. In environmental care, some forests and groves were protected as sacred places, which saved water sources and trees; the Kaya forests of the Mijikenda on the Kenyan coast are an example. Metal working, pottery and weaving supplied tools and goods. In governance and education, councils of elders settled disputes and initiation taught responsibilities. Indigenous knowledge is under threat because elders die without recording it, young people value only school knowledge, and some people take it without giving credit. It can be protected by recording it, teaching it in schools, valuing the people who hold it and combining it with modern science where it is proven useful.`,
    formula: `Observe - Practise - Test over generations - Pass on - Preserve`,
    badge: `[KNOW] Elders and Earth`,
    ctx: `A farmer in a hilly area builds terraces and plants beans between maize, using methods learned from grandparents, and today agricultural officers recommend similar practices.`,
    steps: [
      `Step 1: Identify the knowledge, for example herbal treatment, terraces or weather signs. Reason: you must be clear about what is being studied.`,
      `Step 2: Find who holds it, such as elders, herbalists or farmers. Reason: it lives in people, so losing them loses the knowledge.`,
      `Step 3: Explain how it is passed on, by stories, proverbs, apprenticeship and ceremonies. Reason: without writing, repetition and practice keep it accurate.`,
      `Step 4: Explain why it is useful, linking it to the environment and needs. Reason: knowledge that lasted many generations usually solved a real problem.`,
      `Step 5: State threats and ways to preserve it, such as recording and teaching. Reason: preservation needs deliberate action by the present generation.`
    ],
    ex: `A community uses a sacred grove where cutting trees is forbidden. Step 1: the knowledge is a rule that protects a forest. Step 2: elders guard the rule and teach it. Step 3: children learn it from stories of misfortune that follow those who cut trees. Step 4: the grove keeps the soil from washing away and a spring flowing, so the rule protected a real resource. Step 5: the threat is that young people may see the forest as empty land; the community can record the stories, teach the rule at school, and involve the elders in tree-planting. The belief and the benefit work together: the story keeps the rule, and the benefit shows why the rule is wise.`,
    q: `Can a belief we cannot test still protect something real? Think of a rule in your community that protects water, land or trees.`,
    exam: `Define indigenous knowledge; give examples in health, farming, weather and conservation; describe how it is passed on; state threats and ways of preserving it; explain its importance today.`
  }),
  stop('cbc_g9_soc_s3_3', '3.3 Poverty Reduction', {
    pt: `Understanding Poverty and How Societies Reduce It`,
    tag: `Poverty is the lack of means to meet basic needs; reducing it needs both income and opportunity`,
    body: `Poverty is a condition in which a person or household cannot meet basic needs such as food, clean water, shelter, clothing, health care and education. Absolute poverty means lacking even the minimum needed to survive; relative poverty means being much poorer than others in the same society. Poverty has causes. Some are personal or household, such as lack of skills or illness. Others are national or global: unemployment, drought and floods, poor roads and markets, corruption, rapid population growth where jobs do not grow as fast, conflict, and unequal sharing of resources. Poverty has effects: poor health, school dropout, crime, early marriage, migration to towns and insecurity. Societies reduce poverty in several ways. Education and skills training make a person employable. Entrepreneurship, starting and running small businesses, creates income and jobs. Better farming methods, irrigation and access to markets raise farm incomes. Governments provide social protection such as the Inua Jamii cash transfers for older persons and other vulnerable groups, and enterprise funds like the Uwezo Fund, the Youth Enterprise Development Fund and the Women Enterprise Fund. Counties and constituencies use public funds for bursaries, roads and water. Saving through groups (chamas) and cooperative societies helps people pool money. Good governance and fighting corruption ensure public money reaches its purpose. Poverty reduction also needs peace and care for the environment.`,
    formula: `Skills + Opportunities + Fair public spending + Savings = Lower poverty`,
    badge: `[LIFT] Pathways Out of Poverty`,
    ctx: `Women in a village form a chama, save weekly, and borrow from the pool to start a poultry business that pays school fees.`,
    steps: [
      `Step 1: Define the problem by finding which basic needs are not met. Reason: you cannot solve a problem you have not described.`,
      `Step 2: Find the causes, separating personal, local and national ones. Reason: different causes need different remedies.`,
      `Step 3: Choose strategies that match the causes, such as training for unemployment or irrigation for drought. Reason: a mismatched remedy wastes resources.`,
      `Step 4: Identify who acts: the household, community, county, national government and organisations. Reason: poverty reduction is a shared task.`,
      `Step 5: Check the result by asking whether incomes, health or schooling improved. Reason: effort only counts if it changes lives.`
    ],
    ex: `Imagine a chama of 10 members, each saving 200 shillings every week. Step 1: they lack money to start small businesses. Step 2: the cause is low and irregular income with no loan source. Step 3: they pool savings: 10 members x 200 = 2,000 shillings a week, so in 10 weeks 20,000 shillings. Step 4: the group acts together and a county officer trains them in poultry keeping. Step 5: one member borrows 10,000 shillings, buys chicks and feed, and repays 1,000 shillings a week over 10 weeks without interest, which the group agreed. The pool is still 20,000 shillings after repayment, so another member can borrow. Numbers here are only for illustration; the method shows how savings become capital that creates income.`,
    q: `If a family earns money but cannot send a child to school because the school is very far away, what part of the problem is income and what part is something else?`,
    exam: `Define poverty, absolute and relative poverty; give causes and effects; describe measures to reduce poverty by individuals, the community and government; name Kenyan government programmes and funds; explain the role of entrepreneurship and saving.`
  })
];

const S3B = [
  stop('cbc_g9_soc_s3_4', '3.4 Population Structure', {
    pt: `Reading Age-Sex Pyramids and Dependency`,
    tag: `A population pyramid shows how many people of each age and sex a country has`,
    body: `Population structure is the make-up of a population by age and sex. It is shown on a population pyramid, a graph of two bar sets back to back: males on the left, females on the right, with age groups (usually five-year groups) stacked from youngest at the bottom to oldest at the top. The width of each bar shows how many people, or what percentage of the population, are in that group. A wide base means many children, which comes from a high birth rate. A narrow top means few old people, because many die before old age, so life expectancy (the average years a newborn is expected to live) is lower. A pyramid that is broad at the bottom and narrows steeply is typical of a fast-growing population, as in Kenya. A pyramid whose sides are more upright means low birth and death rates and slow growth. Age groups are also divided into the young dependants (0 to 14), the working-age group (15 to 64) and the old dependants (65 and above). Dependants are people who rely on the working-age group for support. The dependency ratio compares them: dependency ratio = (number aged 0 to 14 + number aged 65 and above) divided by (number aged 15 to 64), multiplied by 100. A high ratio means each worker supports many people, so households and governments must spend more on schools, health and food. A large young population is a challenge now but can become a strength if jobs and skills are provided as they grow up.`,
    formula: `Dependency ratio = (Aged 0-14 + Aged 65+) / (Aged 15-64) x 100`,
    badge: `[POP] Pyramid Reader`,
    ctx: `Kenya's population pyramid has a wide base, so planners must provide many classrooms and later many jobs.`,
    steps: [
      `Step 1: Read the horizontal axis for the size of each group and the vertical axis for age. Reason: both axes carry the data, and mixing them gives wrong answers.`,
      `Step 2: Compare left (male) with right (female) bars. Reason: differences show how the sexes are balanced at each age.`,
      `Step 3: Describe the shape: wide or narrow base, how fast the sides narrow, and the top. Reason: shape tells birth rate and life expectancy.`,
      `Step 4: Add the age groups into 0 to 14, 15 to 64 and 65 and above. Reason: the three groups are what the dependency ratio needs.`,
      `Step 5: Calculate and interpret the ratio. Reason: the number shows how heavy the burden on workers is and what the country must plan for.`
    ],
    ex: `Imagine a country in which 40% of people are aged 0 to 14, 56% are aged 15 to 64 and 4% are 65 and above. Step 1 and 2: we are using percentages for both sexes together. Step 3: 40% in the youngest group means a wide base; only 4% at the top means few old people. Step 4: dependants = 40 + 4 = 44; workers = 56. Step 5: ratio = 44 / 56 x 100 = 78.6, so about 79 dependants for every 100 workers. Interpretation: each 100 workers support about 79 children and elders; the country needs schools and health care for children, and jobs for those who will soon enter working age. If the base becomes smaller and the middle bigger, the ratio would fall.`,
    q: `If a country has very many children, what does that tell you about the next 15 years of its schools, jobs and housing?`,
    exam: `Define population structure, life expectancy, dependants and dependency ratio; describe a pyramid with a wide base; calculate the dependency ratio from given figures; explain the effects of a high dependency ratio and ways of handling them.`
  }),
  stop('cbc_g9_soc_s3_5', '3.5 Peaceful Conflict Resolution', {
    pt: `Settling Disputes Without Violence`,
    tag: `Conflict is normal; how it is handled decides whether it harms or teaches`,
    body: `A conflict is a disagreement in which people or groups have opposing needs, interests or beliefs. Conflict is a normal part of life and is not always bad; it becomes harmful when it turns into violence. Causes include competition for scarce resources such as land, water and pasture, differences in values, misunderstanding and poor communication, unfair treatment, jealousy, political rivalry, and cultural or religious intolerance. Conflicts may be within a person, between individuals, within a family, between communities or between countries. Violent conflict has effects such as deaths and injuries, displacement of people, destruction of property, hunger, school closure and mistrust that lasts for years. Peaceful methods of resolving conflict include dialogue (talking openly), negotiation (the people in dispute discuss and agree themselves), mediation (a neutral third person helps the parties find their own agreement), arbitration (a neutral person hears both sides and makes a decision that the parties agreed to accept), reconciliation (repairing relationships after a conflict) and the courts of law. Traditional Kenyan communities have councils of elders, such as the Njuri Ncheke of the Meru and the Kaya elders of the Mijikenda, that settled disputes. The Constitution of Kenya recognises alternative dispute resolution, including traditional mechanisms, provided they do not conflict with the Bill of Rights. The National Cohesion and Integration Commission works to promote harmony among Kenya's communities. Skills that support peace are active listening, controlling anger, respecting other views and looking for a solution in which both sides gain something.`,
    formula: `Understand causes - Dialogue - Negotiate or mediate - Agree - Reconcile`,
    badge: `[PEACE] Resolution Ladder`,
    ctx: `Two neighbouring communities share a water point; elders and local leaders meet and agree on a timetable for watering livestock.`,
    steps: [
      `Step 1: Stop and calm down, then state the problem without blame. Reason: anger blocks listening.`,
      `Step 2: Let each side explain its needs while the other listens. Reason: people often discover that their real needs are not opposed.`,
      `Step 3: List possible solutions together. Reason: more options make agreement more likely.`,
      `Step 4: If the parties cannot agree, bring in a neutral person to mediate or decide. Reason: a neutral person is not defending either side.`,
      `Step 5: Write down or publicly state the agreement and repair relations. Reason: a clear agreement prevents new disputes, and reconciliation prevents revenge.`
    ],
    ex: `Two villages use one borehole. In the dry season, queues are long and fights break out. Step 1: elders from both sides ask the youth to stop fighting and meet. Step 2: Village A explains that its cattle need water in the morning; Village B says its women collect water in the morning for homes. Step 3: options include separate times, a second borehole or a fee for maintenance. Step 4: because they cannot agree on the fee, a respected elder from a neutral village mediates. Step 5: they agree that cattle drink from midday to evening and homes collect in the morning, and each village chooses two people to monitor the schedule and report problems. The agreement was reached because both needs were considered, not because one side won.`,
    q: `Think of a quarrel you saw end badly. At what point could it have been handled differently, and what would have been the first step?`,
    exam: `Define conflict; give causes and effects of conflict at different levels; explain dialogue, negotiation, mediation, arbitration and reconciliation; describe traditional and modern institutions for peace; state skills for peaceful resolution.`
  }),
  stop('cbc_g9_soc_s3_6', '3.6 Healthy Relationships', {
    pt: `Building Respectful and Safe Relationships`,
    tag: `A healthy relationship is based on respect, honesty and safety for both people`,
    body: `A relationship is the way two or more people connect and behave towards each other. Relationships exist with family, friends, classmates, teachers and neighbours. Healthy relationships have certain signs: respect for each other's feelings and views, honesty, trust, good communication, support, shared responsibility and the freedom to say no. Boundaries are limits that a person sets for what they accept in how they are treated, for example about their body, time, belongings and privacy. Consent means freely agreeing to something, and it can be refused or withdrawn at any time; a person who is pressured, tricked or threatened has not given consent, and a child cannot legally consent to sexual activity. Peer pressure is the influence of people of your age to behave in a certain way; it can be positive, such as encouragement to study, or negative, such as pressure to try drugs, skip school or bully others. Unhealthy or harmful relationships show control, insults, threats, jealousy that limits your freedom, violence, secrecy that you are asked to keep, or any touching you are uncomfortable with. Skills for healthy relationships include assertiveness (stating your view firmly and respectfully), active listening, managing anger, saying no, resolving disagreements without violence and choosing friends carefully. During adolescence, feelings change quickly; talking to a trusted adult is wise. If a person is being abused or threatened, it is not their fault; they should tell a trusted adult such as a parent, teacher or counsellor, and in Kenya a child can call Childline Kenya on 116, a free line.`,
    formula: `Respect + Honesty + Boundaries + Consent = Healthy relationship`,
    badge: `[BOND] Healthy Circle`,
    ctx: `A learner is pressured by classmates to join them skipping afternoon lessons and must decide how to refuse without losing friendships.`,
    steps: [
      `Step 1: Notice how you feel in the relationship: safe and respected, or anxious and controlled. Reason: feelings are an early warning.`,
      `Step 2: Name the behaviour that worries you, such as pressure or insults. Reason: naming it separates the behaviour from the person.`,
      `Step 3: State your boundary clearly and calmly. Reason: people cannot respect a limit they have not heard.`,
      `Step 4: If the behaviour continues, leave the situation and tell a trusted adult. Reason: safety matters more than keeping a friendship that harms you.`,
      `Step 5: Use support such as the counsellor or Childline Kenya 116, and choose friends who respect you. Reason: support protects you, and good friends strengthen good choices.`
    ],
    ex: `Classmates tell Brian to skip afternoon lessons to join them. Step 1: Brian feels uneasy because he wants to stay. Step 2: the behaviour is pressure to break school rules. Step 3: he says, "I am staying for the lesson, you can go if you choose." Step 4: when they call him names, he walks to the classroom and later tells his class teacher about the pressure. Step 5: the teacher advises him to sit with friends who attend lessons and the counsellor offers a talk. Brian kept his decision, avoided harm and found a safe adult, and the cost was a few unkind words that he can bear.`,
    q: `What is the difference between a friend who disagrees with you and a person who pressures you, and how would you tell them apart?`,
    exam: `Define relationship, boundary, consent and peer pressure; list signs of healthy and unhealthy relationships; explain skills for dealing with peer pressure; state where to seek help, including Childline Kenya 116.`
  })
];

const S4 = [
  stop('cbc_g9_soc_s1_1', '4.1 Topographical maps', {
    pt: `Scale, Grid References, Contours and Gradient`,
    tag: `A topographical map is a scaled picture of the land from above, read with its key`,
    body: `A topographical map shows natural features (rivers, hills, vegetation) and human-made features (roads, railways, buildings, boundaries) of an area in detail, drawn to scale and using symbols explained in the key. The scale is the relation between a distance on the map and the same distance on the ground. A representative fraction (RF) such as 1:50,000 means 1 unit on the map equals 50,000 of the same units on the ground, so 1 cm represents 50,000 cm, which is 500 m. To convert, multiply the map distance by the scale number, then change to kilometres by dividing by 100,000 (since 100,000 cm make 1 km). Position is given by a grid reference. The map is covered by numbered vertical lines (eastings) and horizontal lines (northings). A six-figure reference gives easting first and then northing: read the two easting digits, estimate tenths of the next square for the third figure, then do the same for the northing. Remember: along the corridor, then up the stairs. Relief, the shape of the land, is shown by contour lines, which join places of equal height above sea level. The vertical interval is the height difference between two successive contours. Where contours are close together, the slope is steep; where wide apart, gentle. Closed rings of rising height show a hill; V-shapes pointing uphill show valleys; a spot height gives an exact height; a trigonometrical station is a surveyed point. Gradient is the steepness of a slope: gradient = vertical interval divided by horizontal distance, both in the same units. Direction is given by a bearing, an angle measured clockwise from north, from 0 to 360 degrees.`,
    formula: `Ground distance = Map distance x Scale number  |  Gradient = Vertical interval / Horizontal distance`,
    badge: `[MAP] Contour Reader`,
    ctx: `A hiker preparing for the Ngong Hills or Mount Kenya routes reads contours to see where the climb is steepest.`,
    steps: [
      `Step 1: Read the title, key and scale before anything else. Reason: symbols and scale differ from map to map.`,
      `Step 2: Locate features using the grid, eastings first, then northings. Reason: the agreed order prevents two readers giving different positions.`,
      `Step 3: Measure map distance with a ruler or string for curves. Reason: roads and rivers bend, and a straight ruler under-measures.`,
      `Step 4: Convert to ground distance with the scale and change units. Reason: map centimetres mean nothing until converted to real distance.`,
      `Step 5: Study contours for relief and slope, and calculate gradient if needed. Reason: contours tell steepness, drainage and the shape of the land.`
    ],
    ex: `On a map of scale 1:50,000, two points are 4.2 cm apart. The contour interval is 20 m and the two points are 5 contours apart, the lower on the 1,600 m contour. Step 1: scale 1:50,000. Step 2: distance on the map is 4.2 cm. Step 3: ground distance = 4.2 x 50,000 = 210,000 cm. Step 4: 210,000 / 100,000 = 2.1 km, which is 2,100 m. Step 5: vertical difference = 5 x 20 m = 100 m, so the upper point is on the 1,700 m contour, and gradient = 100 / 2,100 = about 1 in 21. This is a gentle slope. Compare: if the same 100 m rise occurred over 0.5 km (500 m), the gradient would be 1 in 5, which is steep, and the contours would be much closer together on the map.`,
    q: `If two contour lines on a map almost touch, what is the land like between them, and how would you decide whether to walk or cycle there?`,
    exam: `Interpret map symbols; give four- and six-figure grid references; calculate distance using the scale; identify landforms from contours; calculate gradient; give a bearing between two points; describe drainage, vegetation and settlement of an area.`
  }),
  stop('cbc_g9_soc_s4_2', '4.2 Internal Land Forming Processes', {
    pt: `How Forces Inside the Earth Shape the Land`,
    tag: `Heat and pressure within the Earth fold, break and lift the crust, and build volcanoes`,
    body: `Internal (endogenic) land forming processes are forces that originate inside the Earth and change the surface. The Earth has layers: the thin outer crust, the thick mantle beneath it and the core at the centre. The crust is broken into large moving pieces called plates. Heat in the mantle moves the plates very slowly, so where plates pull apart, push together or slide past each other, the crust is stressed. Folding happens when rock layers are squeezed by compression and bend into upfolds (anticlines) and downfolds (synclines); large folding forms fold mountains. Faulting happens when rock layers break and move along a crack called a fault. Tension (pulling apart) can make blocks drop between faults to form a rift valley, as in the Great Rift Valley that crosses Kenya, while blocks left standing become block (horst) mountains. Volcanicity is the movement of molten rock (magma) to the surface or into the crust. Magma that reaches the surface is called lava; it builds volcanic mountains such as Mount Kenya (now extinct), while Mount Longonot is a volcano that last erupted long ago and is considered dormant. An extinct volcano is not expected to erupt again; a dormant one has not erupted for a long time but could. Earthquakes are shaking of the ground caused by sudden release of stress in the crust; the point underground where it starts is the focus and the point on the surface directly above is the epicentre. Earthquakes are recorded by a seismograph. These processes cause both benefits and hazards: fertile volcanic soils, geothermal power (for example at Olkaria near Naivasha), minerals and scenic landforms, but also eruptions, earthquakes and loss of life and property.`,
    formula: `Compression -> Folding  |  Tension -> Faulting and rift valleys  |  Magma to surface -> Volcanoes`,
    badge: `[EARTH] Inner Forces`,
    ctx: `Lakes Naivasha, Nakuru and Bogoria and the escarpments seen from the Great Rift Valley viewpoint near Limuru show faulting at work.`,
    steps: [
      `Step 1: Identify the layers of the Earth and the plates. Reason: movement of plates is the source of stress.`,
      `Step 2: Determine the kind of force: compression, tension or heat moving magma. Reason: the type of force decides the landform produced.`,
      `Step 3: Name the process: folding, faulting or volcanicity. Reason: each process has its own landforms.`,
      `Step 4: Link the process to the landform seen on the ground. Reason: this connects theory to what you can observe.`,
      `Step 5: State benefits and hazards for people. Reason: people choose where to live and build using these facts.`
    ],
    ex: `Consider the Great Rift Valley in Kenya. Step 1: the African plate is slowly being stretched in East Africa. Step 2: stretching is tension. Step 3: the crust cracks into parallel faults; the central block drops between them. Step 4: the dropped block is the rift valley floor, the steep sides are escarpments, and volcanoes such as Longonot and Menengai sit along it because magma finds paths up the cracks. Step 5: the floor holds lakes and fertile soils, geothermal steam produces electricity at Olkaria, but the area also experiences earthquakes, so buildings need care. The valley is explained by one force, tension, producing several linked features.`,
    q: `What is common to a rift valley and a volcano in East Africa, and why are they found so close together?`,
    exam: `Describe the structure of the Earth; define folding, faulting, volcanicity and earthquake; explain formation of rift valleys and block mountains; give examples in Kenya and East Africa; state positive and negative effects; describe volcanic landforms.`
  }),
  stop('cbc_g9_soc_s4_3', '4.3 Multipurpose River Projects in Africa', {
    pt: `Using One River for Many Purposes`,
    tag: `A dam can give power, water and flood control, but it also changes land and lives`,
    body: `A multipurpose river project is a development in which a river is used for several purposes at once, usually by building a dam across it to store water in a reservoir (an artificial lake). The purposes include generating hydroelectric power (electricity from falling water turning turbines), irrigation (supplying water to crops), water for homes and industries, flood control, fishing, transport on the lake, tourism and recreation. Examples in Africa are the Aswan High Dam on the Nile in Egypt, the Akosombo Dam on the Volta River in Ghana, the Kariba Dam on the Zambezi River between Zambia and Zimbabwe, and, in Kenya, the Seven Forks scheme on the Tana River (Masinga, Kamburu, Gitaru, Kindaruma and Kiambere dams), and in Ethiopia the Grand Ethiopian Renaissance Dam on the Blue Nile. A good site has a narrow valley for a short dam wall, a large catchment so that rain fills the reservoir, strong rock to hold the dam, and a market for the power and water. The benefits are cheap renewable power, steady water for farming, less flood damage and new fisheries. The problems include displacement of people and loss of farmland and heritage under the reservoir, silt (soil carried by the river) filling the reservoir over time, spread of water-related diseases like malaria and bilharzia, loss of habitats and reduced flow downstream, which can affect people and farms there. Because rivers cross borders, countries sharing a river must cooperate, and disputes over how much water each can use are settled by negotiation. Planning therefore needs an environmental impact assessment and fair compensation of those displaced.`,
    formula: `Dam + Reservoir = Power + Irrigation + Water supply + Flood control + Fishing`,
    badge: `[RIVER] Dam and Reservoir`,
    ctx: `Much of Kenya's hydroelectric power comes from dams on the Tana River, and Lake Masinga is also used for fishing.`,
    steps: [
      `Step 1: Choose the site: narrow valley, strong rock, large catchment and nearby users. Reason: these lower cost and make sure the reservoir fills.`,
      `Step 2: Build the dam and let the reservoir form. Reason: stored water allows control through the year, not only in the rains.`,
      `Step 3: Release water through turbines for electricity and into canals for irrigation. Reason: one store serves several uses.`,
      `Step 4: Manage the effects: resettle and compensate people, control silt by protecting the catchment, and monitor disease. Reason: without management, the costs fall on the poor and shorten the dam's life.`,
      `Step 5: Judge the project by comparing benefits and costs. Reason: a project is worthwhile only if overall gain exceeds overall harm.`
    ],
    ex: `Judge a proposed dam on a river with a large catchment. Step 1: the valley is narrow with solid rock, so the wall is short and stable; the catchment receives reliable rain. Step 2 and 3: the reservoir will supply a power station, an irrigation canal and a town. Step 4: 500 families live in the valley floor; they must be compensated and resettled with land, schools and water, and the farmers upstream will plant trees to reduce silt. Step 5: benefits are power and farming income and flood protection; costs are displacement and habitat loss. The planners decide the project is acceptable only if the compensation is fair and silt control is funded. This shows that a decision weighs both columns, not one.`,
    q: `Who gains from a dam and who loses, and what should a fair government do about those who lose?`,
    exam: `Define multipurpose project; name examples in Africa and Kenya; state factors for locating a dam; give benefits and problems; explain how problems are managed; explain why neighbouring countries must cooperate on shared rivers.`
  }),
  stop('cbc_g9_soc_s4_4', '4.4 Management and Conservation of the Environment', {
    pt: `Caring for the Environment`,
    tag: `Conservation is using resources so that they last for future generations`,
    body: `The environment is everything around us: land, water, air, plants, animals and the things people build. Environmental degradation is the damage or decline of the environment. Its causes include deforestation (clearing forests for farms, charcoal and settlement), overgrazing, poor farming that leads to soil erosion, pollution of air, water and land by factories, vehicles, sewage and plastic waste, careless mining, encroachment on wetlands and forests, and poaching. Effects include loss of soil fertility, floods and landslides, drying of rivers, loss of species, health problems and climate change. Conservation means protecting and using resources wisely. Management means planning and controlling how resources are used. Methods include afforestation (planting trees where there were none) and reforestation (replanting where forest was cut), terracing and contour ploughing to hold soil, mulching and cover crops, controlled grazing, treating waste and recycling, using clean energy, protecting wetlands and water catchments, and setting up national parks and reserves. The reduce, reuse, recycle approach cuts waste. The Constitution of Kenya makes protecting the environment a duty of the state and of every person and sets a goal of at least ten per cent tree cover. The Environmental Management and Coordination Act established the National Environment Management Authority (NEMA), which requires an environmental impact assessment, a study of how a project will affect the environment, before large developments. Wangari Maathai's Green Belt Movement, which mobilised communities, especially women, to plant trees, is an example of community action that won her the Nobel Peace Prize in 2004. Lasting solutions need laws, education, and the participation of the people who live near the resources.`,
    formula: `Cause of damage -> Effect -> Conservation measure -> Monitoring`,
    badge: `[GREEN] Conservation Loop`,
    ctx: `Schools plant trees during the rainy season and community groups protect springs and riverbanks in places like the Mau and Aberdare catchments.`,
    steps: [
      `Step 1: Identify the problem, such as gullies in a field or a polluted stream. Reason: you must see the damage before you can address it.`,
      `Step 2: Find its cause, for example clearing vegetation on a slope. Reason: treating only the effect lets the damage continue.`,
      `Step 3: Select a measure that matches the cause, such as terraces or planting grass. Reason: the measure must remove or reduce the cause.`,
      `Step 4: Involve the people who use the land and set rules or laws. Reason: conservation fails if the community does not support it.`,
      `Step 5: Monitor and maintain, for example by checking that trees survive. Reason: planting without care often fails.`
    ],
    ex: `A hillside farm has deep gullies after heavy rain. Step 1: soil is washing away and the stream below is muddy. Step 2: the farmer ploughs up and down the slope and has cleared trees. Step 3: the measures are contour ploughing, terraces and planting Napier grass strips and trees on the steepest section. Step 4: neighbours agree to do the same, because water flows from one farm to the next. Step 5: the farmer checks gullies after each rainy season and fills them with stones. Over seasons, runoff slows, soil stays on the farm, and the stream clears. One farm cannot solve it alone since water crosses boundaries, which is why neighbours join.`,
    q: `If a stream is polluted upstream, who suffers downstream, and why does that make environmental care a shared duty?`,
    exam: `Define environment, degradation and conservation; give causes and effects of degradation; describe conservation measures; explain the role of the Constitution, NEMA and environmental impact assessment; give examples of community action such as the Green Belt Movement.`
  }),
  stop('cbc_g9_soc_s4_5', '4.5 World Heritage Sites in Africa', {
    pt: `Places the World Agrees to Protect`,
    tag: `A World Heritage Site has outstanding value for all humanity and must be preserved`,
    body: `Heritage is what we inherit from the past and pass to the future. A World Heritage Site is a place that the United Nations Educational, Scientific and Cultural Organization (UNESCO) has listed because it has outstanding universal value, meaning it is important to all people, not only the country where it lies. Sites are cultural (made by people, such as old towns, forts and monuments), natural (such as national parks, lakes and mountains) or mixed (both). A country nominates a site, experts assess it, and if it is accepted the country promises to protect it. In Kenya, listed sites include Lamu Old Town, Fort Jesus in Mombasa, Thimlich Ohinga in Migori County, the Sacred Mijikenda Kaya Forests, Lake Turkana National Parks, Mount Kenya National Park and Natural Forest, and the Kenya Lake System in the Great Rift Valley. Elsewhere in Africa examples include the Pyramids of Giza and the ancient Memphis area in Egypt, Great Zimbabwe, the Serengeti National Park in Tanzania, Robben Island in South Africa, the rock-hewn churches of Lalibela in Ethiopia and Mosi-oa-Tunya (Victoria Falls) shared by Zambia and Zimbabwe. Benefits of listing include tourism income, jobs, education and research, pride and protection of knowledge about the past. Threats include pollution, uncontrolled building, population pressure, poaching, climate change, vandalism, war and too many visitors. Protection includes laws, trained guides and rangers, controlling visitor numbers, involving local people, and international funds and expertise. Communities must benefit if they are to protect a site.`,
    formula: `Outstanding value -> Listing -> Protection -> Tourism and learning for all`,
    badge: `[HERITAGE] Treasures of Africa`,
    ctx: `Visitors to Fort Jesus in Mombasa and Lamu Old Town learn about trade across the Indian Ocean and the buildings of the Swahili coast.`,
    steps: [
      `Step 1: Identify the site and say whether it is cultural, natural or mixed. Reason: the type decides how it is protected.`,
      `Step 2: Describe what makes it special. Reason: value is the reason for listing.`,
      `Step 3: State the benefits to the country and the local community. Reason: benefits give people a reason to protect it.`,
      `Step 4: Identify the threats. Reason: protection must target the real dangers.`,
      `Step 5: Propose protection measures that involve the community. Reason: laws alone fail without local support.`
    ],
    ex: `Take Lamu Old Town. Step 1: it is a cultural site. Step 2: it is one of the oldest continuously lived-in towns on the East African coast, with stone houses, narrow streets and Swahili architecture and traditions. Step 3: tourism provides jobs for boat operators, guides and craftspeople, and the town is a place to learn Swahili history. Step 4: threats are crumbling coral-stone buildings, rubbish and sewage, and uncontrolled building of modern structures. Step 5: measures are repairing old buildings with traditional methods, controlling new construction, managing waste, and training local residents as guides. The example shows how one site fits all five steps and why community involvement runs through them.`,
    q: `If a site belongs to one country but matters to the whole world, who should pay for protecting it, and why?`,
    exam: `Define heritage and World Heritage Site; classify sites as cultural, natural or mixed; name Kenyan and African sites; state benefits, threats and protection measures; explain the role of UNESCO and of local communities.`
  })
];

const S5 = [
  stop('cbc_g9_soc_s3_1', '5.1 The Constitution of Kenya', {
    pt: `The Supreme Law and How Power Is Organised`,
    tag: `The Constitution says who holds power, how it is shared and how it is limited`,
    body: `A constitution is the supreme law of a country: it sets out how the state is organised, what powers government has, and the rights of the people. The Constitution of Kenya was approved by Kenyans in a referendum (a direct vote on one question) in August 2010 and promulgated, meaning officially made law, on 27 August 2010. It replaced the independence constitution. It declares that all sovereign power belongs to the people of Kenya (Article 1), meaning that leaders only exercise power given by the people, and that the Constitution is supreme (Article 2), so any law or act that conflicts with it is void. It has 18 chapters, covering among others the Bill of Rights, citizenship, the structure of government, land and the environment, leadership and integrity, devolved government and public finance. Article 10 lists national values and principles of governance: patriotism, national unity, sharing and devolution of power, the rule of law, democracy and participation of the people, human dignity, equity, social justice, inclusiveness, equality, human rights, non-discrimination, protection of the marginalised, good governance, integrity, transparency, accountability and sustainable development. Power is shared among three arms of government to prevent abuse, a principle called separation of powers: the Executive (the President, Deputy President and Cabinet) carries out the laws; the Legislature (Parliament, made up of the National Assembly and the Senate) makes laws; and the Judiciary (the courts) interprets laws and settles disputes. Power is also shared between two levels of government, the national government and 47 county governments; this is devolution. Each county has an elected governor and an elected county assembly. Devolution aims to bring services closer to people, promote participation and share national resources more fairly.`,
    formula: `People hold sovereign power -> Constitution is supreme -> Power shared among Executive, Legislature, Judiciary and between national and county governments`,
    badge: `[LAW] Constitution Chart`,
    ctx: `A county assembly passes a county law on markets, a county health department runs a dispensary, and a court can still strike down either if it conflicts with the Constitution.`,
    steps: [
      `Step 1: Identify the question: who should make, carry out or judge the matter? Reason: each arm has its own role.`,
      `Step 2: Decide whether it is a national or a county matter. Reason: the Constitution divides functions between the two levels.`,
      `Step 3: Name the responsible institution, such as Parliament, the Governor or the High Court. Reason: this fixes responsibility and shows who answers for the result.`,
      `Step 4: Check against the Constitution, including the Bill of Rights and national values. Reason: the Constitution is supreme.`,
      `Step 5: Identify who can challenge a wrong action, such as citizens through the courts. Reason: power is limited only if someone can check it.`
    ],
    ex: `Suppose a county government wants to build a new market. Step 1: building and running local markets is an administrative action by the county. Step 2: under the Constitution, county governments are responsible for county markets, so this is a county function. Step 3: the County Assembly approves the budget and the county executive builds the market. Step 4: the plan must respect national values, including public participation, so residents must be invited to give views, and no group may be unfairly excluded. Step 5: if traders find that they were not consulted, they can petition the assembly or go to court. The example shows how the same question touches three arms, two levels and the people.`,
    q: `Why might a country divide power among three arms rather than let one leader or group decide everything?`,
    exam: `Define constitution, sovereignty, supremacy of the Constitution, separation of powers and devolution; name the three arms and their roles; state national values and principles in Article 10; describe the two levels of government; explain the importance of devolution.`
  }),
  stop('cbc_g9_soc_s5_2', '5.2 Civic Engagement in Governance', {
    pt: `Taking Part in How You Are Governed`,
    tag: `Citizens take part by voting, giving views, asking for accountability and serving`,
    body: `Civic engagement means citizens taking part in public affairs to improve their community and influence decisions. A citizen is a person who belongs to a country by birth or registration and has rights and duties there. The Constitution says that sovereign power belongs to the people, who exercise it directly or through elected representatives. Forms of engagement include voting in elections (a Kenyan citizen who is 18 or older and registered may vote, and registration and elections are run by the Independent Electoral and Boundaries Commission, IEBC), standing for leadership when qualified, public participation, petitions, attending public meetings (barazas), community projects and volunteering, joining civil society groups, using lawful media to raise issues and paying taxes honestly. Public participation is giving people a real chance to give views before decisions are made on laws, plans and budgets; the Constitution requires it, for example in county budgeting and in making laws. To take part well, a citizen needs information, so they should read the proposal, attend the meeting, and give reasons and not only complaints. Citizens also demand accountability, meaning leaders explain and answer for how they used power and public money. Engagement should be peaceful and lawful, respect the rights of others, and be based on facts and not rumours. The benefits are better decisions, projects the community actually needs, less corruption and a stronger sense of belonging. Barriers include lack of information, fear, apathy (not caring) and expense of travelling to meetings.`,
    formula: `Information + Voice + Lawful action = Effective civic engagement`,
    badge: `[CIVIC] Citizen Voice`,
    ctx: `A county invites residents to a public hearing on next year's budget, where a group of parents asks for money for water in schools.`,
    steps: [
      `Step 1: Find out what decision is being made and when. Reason: you cannot take part in what you do not know about.`,
      `Step 2: Study the proposal and consult others affected. Reason: informed views carry more weight than guesses.`,
      `Step 3: Present your views in the forum provided, with reasons and, where possible, evidence. Reason: reasons let leaders weigh the view.`,
      `Step 4: Follow up to see whether views were considered. Reason: participation that ends at the meeting does not hold leaders accountable.`,
      `Step 5: Keep taking part by voting, monitoring projects and joining groups. Reason: governance is continuous, not a single event.`
    ],
    ex: `Parents in a ward notice that the proposed county budget gives nothing for school water. Step 1: they learn the budget hearing is on a stated date at the ward office. Step 2: they count how many schools lack water by asking head teachers. Step 3: at the hearing, a parent representative presents a list of schools and the cost of water tanks, and asks that it be included. Step 4: later they check the approved budget and find a line for water tanks in three schools. Step 5: they form a committee to watch the work. The result was partial, three of the schools, not all, which shows that engagement can be effective yet still need further follow-up.`,
    q: `If someone says "my one voice will not change anything", what example would you give to show that it can?`,
    exam: `Define civic engagement, citizen, public participation and accountability; list ways citizens take part; explain the role of the IEBC; give benefits and barriers; describe responsible and lawful participation.`
  }),
  stop('cbc_g9_soc_s5_3', '5.3 Kenya Bill of Rights', {
    pt: `Rights, Their Limits and Responsibilities`,
    tag: `Rights belong to every person, but using them must respect the rights of others`,
    body: `A right is something every person is entitled to simply because they are human. The Bill of Rights is Chapter Four of the Constitution of Kenya. It says rights belong to each individual and are not given by the state; the state must respect, protect and promote them (Article 19). It applies to all law and binds all state organs and all persons (Article 20). Examples include the right to life (Article 26); equality and freedom from discrimination (27), so no one may be treated unfairly because of race, sex, age, disability, religion, ethnic or social origin and similar grounds; human dignity (28); freedom and security of the person, including freedom from torture and cruel treatment (29); freedom of expression (33); privacy (31); freedom of conscience, religion and belief (32); freedom of movement and residence (39); the right to fair trial (50); and economic and social rights (43), which include the highest attainable standard of health, adequate housing, food, clean and safe water, social security and education. Children have special rights (Article 53): a name and nationality, free and compulsory basic education, protection from abuse, neglect, harmful cultural practices and child labour, and the right to parental care. Rights are not unlimited. Article 24 allows a right to be limited by law only when this is reasonable and justifiable in an open and democratic society based on human dignity, equality and freedom; for example, freedom of expression does not cover hate speech or incitement to violence. Every right comes with responsibilities: to respect others' rights, obey the law, take care of public property and protect the environment. If a right is violated, a person can go to a court, and bodies like the Kenya National Commission on Human Rights and the Commission on Administrative Justice help. Duty bearers include government, but also parents, teachers and individuals.`,
    formula: `My right + Your right + Responsibility = Rights in balance`,
    badge: `[RIGHTS] Bill of Rights`,
    ctx: `A child who is denied school because of disability, or who is made to work during school hours, has had rights under the Bill of Rights violated.`,
    steps: [
      `Step 1: Identify the situation and the persons involved. Reason: you must know whose right is at stake.`,
      `Step 2: Name the right affected, such as education or dignity. Reason: naming it links the case to the Constitution.`,
      `Step 3: Decide whether it was violated and by whom. Reason: a duty bearer is held responsible only if the act is identified.`,
      `Step 4: Check whether any limitation under Article 24 applies. Reason: some rights may lawfully be limited, but only when reasonable and justified.`,
      `Step 5: Choose the right response: speak up, report to a trusted adult, authority or commission, or go to court. Reason: remedies exist only if used.`
    ],
    ex: `A school refuses to admit a girl who uses a wheelchair, saying it has no ramp. Step 1: the girl and the school management. Step 2: rights involved are education, equality and non-discrimination, and dignity; Article 53 gives every child basic education. Step 3: refusing admission because of disability is discrimination, so the school, a duty bearer, has violated her rights. Step 4: a school may say its building is not accessible, but that is not a justified limit because the school can build a ramp, so no Article 24 limitation applies. Step 5: her parents report to the sub-county education office and may seek help from a human rights body or the court; the school builds a ramp. Her right was upheld by action, not by waiting.`,
    q: `If your freedom to speak could hurt another person's dignity, where should the line be drawn, and who decides?`,
    exam: `Define right and Bill of Rights; identify specific rights and relate them to Articles; state children's rights; explain limitation of rights and responsibilities; describe institutions that protect rights and what to do when rights are violated.`
  }),
  stop('cbc_g9_soc_s5_4', '5.4 Cultural Globalisation', {
    pt: `Cultures Meeting Across the World`,
    tag: `Technology and trade spread ideas, music and styles across borders, with gains and losses`,
    body: `Culture is the way of life of a people: language, food, dress, music, beliefs, values and customs. Globalisation is the growing connection of countries through trade, travel, communication and technology. Cultural globalisation is the spread of ideas, products, languages and ways of life across the world, so that cultures influence each other. Cultural diffusion is the movement of cultural features from one society to another. The main drivers are the internet and social media, television and film, music, international trade and brands, tourism, migration, education abroad and global sports. Examples in Kenya include Kenyan music mixing local languages with global styles, the popularity of international football leagues, global fashion and fast food, and Sheng, a mixed language that borrows from Kiswahili, English and mother tongues. Benefits include exchange of knowledge and skills, easier learning of languages, new markets for Kenyan music, art and food, greater understanding between peoples and access to information. Costs include the decline of local languages and traditions when young people stop using them, imitation of foreign lifestyles without thought, promotion of values that clash with local values, growth of consumerism, loss of local industries to imported goods and exposure to harmful or false content. Communities can respond by valuing and teaching their languages, celebrating cultural festivals, such as school music and drama festivals, protecting heritage, producing local content, and choosing what to adopt after thinking about whether it respects human dignity and the law. Cultures have always changed through contact; the question is not whether to change but to choose wisely what to keep and what to adopt.`,
    formula: `Technology + Trade + Travel = Cultural exchange -> Adopt wisely, preserve what matters`,
    badge: `[GLOBE] Culture Crossroads`,
    ctx: `A song recorded in Nairobi in Sheng and Kiswahili is heard by listeners in other countries through streaming platforms, while a learner in Eldoret learns a dance seen on a video platform.`,
    steps: [
      `Step 1: Identify the cultural item, such as a dance, a food or a language. Reason: you need a clear object to analyse.`,
      `Step 2: Find how it spread: media, trade, tourism or migration. Reason: the route explains why it spread.`,
      `Step 3: Describe its benefits to the receiving society. Reason: people adopt things because they offer something.`,
      `Step 4: Describe any harm to local culture or values. Reason: a balanced view weighs both sides.`,
      `Step 5: Decide what to adopt, adapt or preserve, and act. Reason: individuals and communities can shape the outcome.`
    ],
    ex: `A teenager notices friends speaking mostly English and Sheng and rarely their mother tongue. Step 1: the item is language use. Step 2: it spreads through school, television and online content. Step 3: benefits are being able to communicate widely and to join the global conversation. Step 4: the harm is that the mother tongue may not be passed to the next generation, and with it the stories and proverbs it carries. Step 5: the teenager decides to speak the mother tongue at home, ask grandparents for stories and join the school cultural club, while continuing to learn English and Kiswahili. The decision keeps the gains of globalisation and protects what would otherwise be lost.`,
    q: `Which part of your culture would you most want your grandchildren to still know, and what would you have to do now to make that happen?`,
    exam: `Define culture, globalisation, cultural globalisation and cultural diffusion; state the drivers; give positive and negative effects on Kenyan society; describe ways of preserving culture while benefiting from globalisation.`
  })
];

function station(n, title, strandName, icon, summary, subs) {
  return { id: 'cbc_g9_soc_s' + n, number: n, title, strand: 'Strand ' + title.split(' ')[0] + ': ' + strandName, icon, status: 'available', summary, subtopics: subs };
}

const SOCIAL_STUDIES_G9_MAP = {
  curriculum: 'CBC',
  grade: 9,
  subject: 'Social Studies',
  code: 'SOC-G9',
  trackPathway: 'Core',
  title: 'CBE Grade 9 (Junior School) Social Studies Metro Line',
  description: 'Strands follow the KICD Grade 9 Social Studies design.',
  stations: [
    station(1, '1.0 Social Studies and Career Development', 'Social Studies and Career Development', 'CAR', 'Choosing a pathway and using support systems to prepare for a career.', S1),
    station(2, '2.0 Community Service-Learning', 'Community Service-Learning', 'CSL', 'Planning and carrying out a service project with the community.', S2),
    station(3, '3.0 People and Relationships', 'People and Relationships', 'PPL', 'Early humans, indigenous knowledge, poverty reduction, population structure, peaceful conflict resolution and healthy relationships.', S3.concat(S3B)),
    station(4, '4.0 Natural and Historic Built Environments', 'Natural and Historic Built Environments', 'ENV', 'Topographical maps, internal land forming processes, river projects, conservation and heritage sites.', S4),
    station(5, '5.0 Political Developments and Governance', 'Political Developments and Governance', 'GOV', 'The Constitution, civic engagement, the Bill of Rights and cultural globalisation.', S5)
  ]
};

module.exports = { maps: [SOCIAL_STUDIES_G9_MAP], retiredIds: [] };

