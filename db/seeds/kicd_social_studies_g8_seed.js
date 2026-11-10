// CBC Junior School Social Studies, Grade 8.
// Strands and sub-strands follow the KICD Grade 8 Social Studies design
// (see docs/audits/kicd_verified_from_site.md).

function stop(id, title, o) {
  return {
    id,
    title,
    status: 'available',
    conceptPrimer: {
      title: o.pt,
      tagline: o.tag,
      body: o.body + ' Common mistake: ' + o.mistake,
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
  stop('cbc_g8_soc_s1_2', 'Self-Improvement', {
    pt: 'Getting Better on Purpose',
    tag: 'Growth comes from knowing where you are, choosing a target, and working at it in small steps',
    body: 'Self-improvement means deliberately working to become better at something: a skill, a habit, a way of treating people. It begins with self-awareness, which is the honest understanding of your own strengths (things you do well) and weaknesses (things you find hard). Without it, effort is aimed at the wrong target. Next you set a goal. A useful goal is specific (it says exactly what), measurable (you can tell when you have reached it), achievable (possible with your time and resources), relevant (it matters to your life) and time-bound (it has a date). Big goals are split into small steps so that progress is visible and you do not give up. You also need habits, which are actions repeated until they become automatic, and you need feedback, which is information from teachers, parents or friends on how you are doing. Setbacks are normal; a person with a growth mindset treats a failure as information about what to change, not as proof that they cannot improve.',
    mistake: 'Believing that talent alone decides success. Most skills, from reading fluently to playing football, are built by regular practice, and a goal such as "do better in school" is too vague to act on.',
    formula: 'Goal = Specific + Measurable + Achievable + Relevant + Time-bound',
    badge: 'Goal ladder: strengths, weakness, goal, steps, review',
    ctx: 'A learner in a Kenyan day school who wants to improve in Kiswahili composition plans daily reading and weekly writing, and asks the teacher for feedback.',
    steps: [
      'Step 1: List your strengths and weaknesses honestly, because you can only improve what you can see clearly.',
      'Step 2: Choose one area and write a SMART goal, because a clear target tells you what to do and when you have succeeded.',
      'Step 3: Break the goal into small weekly steps, because small steps are easier to start and show progress.',
      'Step 4: Make the steps into a routine at a fixed time, because habits survive on repetition, not on motivation.',
      'Step 5: Ask for feedback and review each week, because it shows what is working and what to change.'
    ],
    ex: 'Wanjiru scores 45 percent in Mathematics and wants to improve. Step 1: she finds she understands fractions but loses marks on word problems. Step 2: her goal is "To raise my Mathematics score from 45 to 60 percent by the end-of-term test in 12 weeks." It is specific (Mathematics), measurable (60 percent), achievable (15 marks in 12 weeks), relevant and time-bound. Step 3: each week she solves five word problems. Step 4: she does them every day at 5 pm after fetching water. Step 5: every Friday her teacher marks them and she records the score. After four weeks she sees her accuracy rise, and she keeps the routine.',
    q: 'Think of one thing you can do now that you could not do two years ago. What did you do again and again to get there?',
    exam: 'Define self-improvement, state the parts of a SMART goal, and give steps a learner can take to achieve a personal goal.'
  }),
  stop('cbc_g8_soc_s1_3', 'Self- Esteem Assessment', {
    pt: 'How You See Your Own Worth',
    tag: 'Self-esteem is the opinion you hold of yourself, and it can be assessed and strengthened',
    body: 'Self-esteem is how much you value and respect yourself. People with healthy self-esteem accept their strengths and weaknesses, believe they deserve respect, and can say no or ask for help. Low self-esteem shows as constant self-criticism, fear of trying, giving in to peer pressure to win approval, or being very shy. Very high, unrealistic self-esteem shows as boasting and refusing to accept correction; this is arrogance, not confidence. Self-esteem is shaped by family, teachers, friends, success and failure, the way people speak to us, and what we see on media. To assess it, a person honestly answers questions such as: Do I feel I have good qualities? Can I accept a compliment? Do I recover after a mistake? Do I follow others even when I know it is wrong? The answers show where to work. It can be strengthened by setting and reaching small goals, replacing harsh self-talk with fair statements, choosing friends who respect you, helping others, and speaking to a trusted adult or the school counsellor when feelings are heavy.',
    mistake: 'Thinking that high self-esteem means being proud and better than others. Healthy self-esteem is respect for yourself and for others, and a learner can have it without being the top of the class.',
    formula: 'Self-esteem = what I believe about my own worth (low, healthy or inflated)',
    badge: 'Self-esteem scale from low to healthy to inflated',
    ctx: 'A Class 8 learner is teased about their accent after moving from a rural school to a town school, and learns to speak up and find friends who respect them.',
    steps: [
      'Step 1: Answer honest questions about how you think and act, because assessment starts with evidence, not guessing.',
      'Step 2: Compare your answers with the signs of low, healthy and inflated self-esteem, because that places where you are.',
      'Step 3: Identify what has shaped your view, such as people, events or media, because causes show what can be changed.',
      'Step 4: Choose actions to strengthen it, such as small goals and fair self-talk, because confidence grows from experience.',
      'Step 5: Seek help from a trusted adult or counsellor when needed, because some feelings are too heavy to carry alone.'
    ],
    ex: 'Brian answers five questions with Yes or No. 1. I believe I have good qualities: No. 2. I can accept a compliment: No. 3. I try new things even if I may fail: No. 4. I follow friends even when I know it is wrong: Yes. 5. I speak badly of myself often: Yes. Reading it: three answers point to low self-esteem, and two behaviours (following friends against his judgement, harsh self-talk) are warning signs. Next he looks for causes: since he failed a test he has been laughed at. His plan: set one small goal (finish all homework this week), replace "I am stupid" with "I did not prepare enough and I can improve", and talk to the class teacher. After a month he can answer Yes to question 3.',
    q: 'When a friend pushes you to do something you know is wrong, what is the feeling underneath that makes it hard to refuse?',
    exam: 'Describe signs of low and healthy self-esteem, factors that affect self-esteem, and ways of building it.'
  })
];

const S2 = [
  stop('cbc_g8_soc_s2_2', 'Community Service-Learning Project', {
    pt: 'Learning by Serving Your Community',
    tag: 'A service project turns what you learn in class into action that solves a real local problem',
    body: 'Community Service-Learning (CSL) is a way of learning in which learners identify a need in their community, plan and carry out a project to meet it, and then reflect on what they learned. A community is a group of people who live in the same area or share common interests. A need is something lacking that affects people, such as litter, a broken water point, or children who cannot read. The CSL cycle has clear stages: first you investigate and choose a need by talking to community members and observing; then you plan, stating the objective, the activities, the resources and who does what; then you act; then you evaluate, asking whether the need was met; and finally you reflect and share what you learned. Good projects are safe, respect local culture and the law, use resources that are available, and can be kept going after you leave. The skills you practise are teamwork, communication, leadership, problem solving and responsibility. Always seek permission from the school and the local leaders before you start.',
    mistake: 'Choosing a project because it sounds impressive without asking the community what it needs, or treating service as charity for a day instead of solving a problem and learning from it.',
    formula: 'CSL cycle: Investigate, Plan, Act, Evaluate, Reflect',
    badge: 'CSL cycle with five stages',
    ctx: 'Learners near a market in a Kenyan town notice rubbish blocking the drain and run a clean-up with the market committee and a tree-planting follow-up.',
    steps: [
      'Step 1: Investigate community needs by observing and interviewing, because the project must meet a real need.',
      'Step 2: Choose one need using clear criteria such as urgency, safety and available resources, because you cannot solve everything at once.',
      'Step 3: Write a plan with objective, activities, resources, roles and dates, because a plan avoids confusion and waste.',
      'Step 4: Get permission from the school and local leaders and then carry out the project, because it protects safety and builds trust.',
      'Step 5: Evaluate the results and reflect on what you learned, because this is what makes it learning, not only work.'
    ],
    ex: 'A class of 40 learners walks around the school neighbourhood and lists needs: litter near the bus stop, a dusty path, a lack of seats at the clinic. Step 2: they score each need out of 5 on urgency, safety, cost and time; litter scores highest. Step 3: objective, "To clear the bus-stop area of litter and place three bins within four weeks." Activities: collect rubbish, ask the shopkeepers to donate or make bins, tell the public by posters. Roles: four groups of ten. Step 4: the head teacher and the area chief agree; learners wear gloves and are supervised. Step 5: after four weeks they count bags collected, check the bins are in use, and write in a journal what they learned about teamwork and about why people litter.',
    q: 'If you walked through your neighbourhood tomorrow with the eyes of a problem-solver, what is the first need you would notice?',
    exam: 'List the stages of a CSL project, explain how to identify a community need, and state skills gained from a service project.'
  })
];

const S3 = [
  stop('cbc_g8_soc_s2_1', 'Scientific Theory about Human Origin', {
    pt: 'What the Evidence Says About Where People Came From',
    tag: 'Scientists build the story of human origin from fossils, tools and dating, and the evidence points to Africa',
    body: 'A scientific theory is an explanation built from evidence that has been tested and can be changed if new evidence appears. The scientific theory of human origin says that modern humans (Homo sapiens) developed over a very long time from earlier human-like beings, and that this process began in Africa. The main evidence is of four kinds. Fossils are the preserved remains of ancient bones and teeth found in rock. Artefacts are tools and objects made by early people, such as stone tools. Dating methods, for example radiocarbon dating for fairly recent remains and potassium-argon dating of volcanic rock for very old layers, show how old the finds are. Comparison of bodies shows similarity between humans and other primates. Archaeologists dig and record sites; palaeontologists study fossils. Stages are described as Australopithecus, Homo habilis (the handy person who made stone tools), Homo erectus (walked fully upright, used fire) and Homo sapiens. Many religions and communities hold other accounts of origin, and a learner can study the scientific one as a theory based on evidence while respecting other beliefs.',
    mistake: 'Thinking that humans descended from monkeys living today. The theory says humans and other primates share distant common ancestors, and that "theory" in science means a well-supported explanation, not a guess.',
    formula: 'Evidence + dating = theory: fossils, artefacts, dating methods, comparison',
    badge: 'Timeline of human ancestors with Rift Valley sites',
    ctx: 'Sites in Kenya such as Koobi Fora near Lake Turkana, Olorgesailie in the Rift Valley, and Kanam and Kanjera near Lake Victoria have yielded fossils and tools; the Turkana Boy skeleton is a Homo erectus find from near Lake Turkana.',
    steps: [
      'Step 1: Define theory, fossil and artefact, because the argument depends on knowing what counts as evidence.',
      'Step 2: Place the stages in order, from Australopithecus to Homo habilis, Homo erectus and Homo sapiens, because the theory is about change over time.',
      'Step 3: Explain how finds are dated, because age is what turns objects into a timeline.',
      'Step 4: Link finds to places such as the Rift Valley, because the evidence points to East Africa as a main region.',
      'Step 5: Explain why Rift Valley sites preserve fossils, because understanding the conditions explains why the evidence is where it is.'
    ],
    ex: 'A team digs at a site near a lake in the Rift Valley and finds stone tools in layer A and the bone of an early human in layer B, which lies below layer A. Step 1: the tools are artefacts, the bone is a fossil. Step 2: layers deposited first lie lower, so layer B is older than layer A. Step 3: volcanic ash in layer B is dated by potassium-argon, giving its age; the bone must be about that old. Step 4: the team writes that tools appear above an earlier human fossil in a region where many other finds exist. Step 5: they note that lake sediments and volcanic ash covered bones quickly, and faulting of the Rift Valley exposed old layers, which explains why the site preserved the evidence.',
    q: 'Why would a bone buried quickly by lake mud and ash survive for a very long time, while a bone left on open ground would not?',
    exam: 'Define theory, fossil and artefact; state the kinds of evidence for human origin; name early human stages and sites in Kenya.'
  }),
  stop('cbc_g8_soc_s3_2', 'Early Civilisations', {
    pt: 'The First Great Societies of Africa and the World',
    tag: 'A civilisation is a society with cities, government, writing and specialised work, and Africa had some of the earliest',
    body: 'A civilisation is an advanced stage of human society, marked by growth of towns, organised government, a system of writing or record keeping, farming that produces surplus food, specialised jobs, trade, religion and monumental building. Surplus food matters because when farmers produce more than they eat, some people can become builders, priests, soldiers or traders. Early civilisations grew along great rivers because the water and fertile silt made farming reliable. The best known in Africa is Ancient Egypt on the River Nile: its rulers were called pharaohs, it wrote in hieroglyphics on papyrus, built pyramids as royal tombs, and developed a calendar and mathematics for surveying land after the yearly flood. Other early civilisations include Mesopotamia between the Tigris and Euphrates, the Indus Valley and the Yellow River in China. In Africa, Kush and Axum are also early states, and the Swahili coastal towns developed later through Indian Ocean trade. Civilisations contributed ideas, writing, architecture, law and calendars that we still use or build on.',
    mistake: 'Thinking that civilisation only means big stone buildings, or that societies without cities were not advanced. The term describes a set of features together, and many African communities had complex systems of government and knowledge without being called civilisations in this narrow sense.',
    formula: 'Civilisation = surplus food + towns + government + writing + specialised work',
    badge: 'River valley map of early civilisations',
    ctx: 'Ancient Egypt on the Nile, Kush and Axum in Africa, and the Swahili city states on the Kenyan coast such as Gedi, Lamu and Mombasa.',
    steps: [
      'Step 1: Define civilisation and list its features, because you need a test to judge a society.',
      'Step 2: Explain why river valleys favoured early civilisations, because water, silt and transport made large-scale farming possible.',
      'Step 3: Show how surplus food leads to specialised work, because it explains how cities form.',
      'Step 4: Describe the achievements, such as writing, calendars and building, because they are the evidence of a civilisation.',
      'Step 5: Link to Kenya by looking at the Swahili coast, because it shows a later civilisation shaped by trade.'
    ],
    ex: 'Test Ancient Egypt against the features. Step 1: towns, yes (Memphis, Thebes); government, yes (pharaoh and officials); writing, yes (hieroglyphics on papyrus). Step 2: the Nile floods every year and leaves fertile silt, so farmers harvest reliably. Step 3: because harvest was more than needed, many people were scribes, builders and craftsmen instead of farming. Step 4: the yearly flood washed away field boundaries, so surveyors measured land again, which advanced geometry; pyramids show organised labour. Step 5: for comparison, check Gedi on the Kenyan coast: stone houses and a mosque, trade in gold, ivory and cloth with the Indian Ocean world, so it also shows towns, trade and specialised work. Conclusion: both qualify, one through river farming, the other through sea trade.',
    q: 'If a society had no surplus food, which of the features of a civilisation would you expect to be missing first, and why?',
    exam: 'Define civilisation, state its features, explain why early civilisations grew along rivers, and describe the achievements of Ancient Egypt.'
  }),
  stop('cbc_g8_soc_s3_3', 'Trans Saharan Slave Trade', {
    pt: 'People Forced Across the Desert',
    tag: 'The trans-Saharan trade moved captured Africans north across the desert for centuries',
    body: 'Slavery is the condition in which a person is owned by another and forced to work without freedom or pay. The trans-Saharan trade was a long-distance trade across the Sahara Desert linking West Africa with North Africa and the Mediterranean. Traders crossed in groups called caravans using camels, which can go many days without water. Goods going north included gold, ivory, kola nuts and captured people; goods going south included salt, cloth, beads and horses. Routes joined oases, which are places in the desert with water, and trading towns such as Timbuktu, Gao and Kano grew on the southern edge, with Tripoli, Tunis and Cairo to the north. Captives were taken in wars and raids and were sold and made to work as servants, soldiers and labourers. Effects on Africa included loss of people, fear and insecurity, the growth of some powerful states that controlled routes, and the spread of Islam and Arabic along the trade. The suffering of those enslaved was severe, and the trade eventually ended as trade patterns, laws and anti-slavery movements changed. It is one of several slave trades; the Indian Ocean and the trans-Atlantic trade were others.',
    mistake: 'Mixing up the trans-Saharan trade with the Atlantic trade. The trans-Saharan one went north across the desert by camel, the Atlantic one went west by ship, and enslaved people were a part of trade in goods, not the only trade.',
    formula: 'Camels + oases + caravan routes: West Africa to North Africa',
    badge: 'Map of Sahara caravan routes and trading towns',
    ctx: 'Kenyan learners can compare it with the Indian Ocean slave trade on the East African coast, where Zanzibar and Mombasa were centres, and with the efforts to end it.',
    steps: [
      'Step 1: Define slavery and trade, because the topic is about people forced to work and long-distance exchange.',
      'Step 2: Trace the routes on a map from West Africa across the Sahara to North Africa, because geography explains the trade.',
      'Step 3: Explain why camels and oases made it possible, because the desert is otherwise a barrier.',
      'Step 4: List goods and people exchanged in each direction, because it shows the purpose of the trade.',
      'Step 5: Explain effects on people and societies, because history is about consequences.'
    ],
    ex: 'A caravan leaves Kano carrying leather, ivory and captured people, and heads north to Tripoli. Step 1: the people carried are enslaved, which means they are owned and forced. Step 2: the route uses oases such as Agadez, which gives water on the way. Step 3: camels carry loads and walk many days between water holes, so a caravan of many camels can cross in about weeks. Step 4: on the return it brings salt, cloth and horses. Step 5: for West Africa, families lost members, villages lived in fear, and rulers who controlled the routes gained wealth and weapons, while the towns on the routes grew.',
    q: 'Why would a trade route across a desert depend so much on knowing where water is, and who therefore holds power?',
    exam: 'Define slavery, name the goods traded, name routes and towns, and explain the effects of the trans-Saharan slave trade on Africa.'
  }),
  stop('cbc_g8_soc_s3_4', 'Population Growth in Africa', {
    pt: 'Why Africa Has So Many Young People',
    tag: 'Population grows when births exceed deaths, and each factor has causes you can name',
    body: 'Population is the number of people living in a place. Population growth is the increase in that number. It has two parts. Natural increase is the difference between births and deaths. Migration is movement of people in or out; people who come in are immigrants and people who leave are emigrants. The birth rate is the number of births per 1000 people in a year, and the death rate is the number of deaths per 1000 people. If the birth rate is higher than the death rate, population grows. In many African countries death rates have fallen because of better health care, vaccination, clean water and food, while birth rates have stayed high for a time, so population grows quickly and many people are young. Causes of high birth rate include early marriage, a cultural value on large families, children helping on farms, and limited access to family planning and education. Effects include pressure on schools, health services, land, jobs and housing, but also a large young workforce that can drive development if educated and employed. Governments respond with education, family planning, health services, and job creation.',
    mistake: 'Thinking that a high population by itself means poverty or a high growth rate. What matters is growth rate and whether resources and jobs are growing with it.',
    formula: 'Natural increase = Birth rate - Death rate; Growth = natural increase + net migration',
    badge: 'Birth rate and death rate gap graph',
    ctx: 'Kenya has a young population, which is why classrooms, clinics and jobs for school leavers are major national concerns.',
    steps: [
      'Step 1: Define population, birth rate and death rate, because growth depends on them.',
      'Step 2: Subtract the death rate from the birth rate, because the difference is the natural increase.',
      'Step 3: Add migration, because people moving in or out also change the total.',
      'Step 4: Explain the causes behind high birth and falling death rates, because they explain why growth is fast.',
      'Step 5: Discuss the effects and responses, because planning follows from the numbers.'
    ],
    ex: 'A town has a birth rate of 35 per 1000 and a death rate of 10 per 1000. Step 1: both are per 1000 people per year. Step 2: natural increase is 35 - 10 = 25 per 1000, which is 2.5 percent a year. Step 3: suppose no migration, so growth is 2.5 percent. Step 4: the low death rate comes from clinics and clean water. Step 5: with 100 000 people, 2 500 extra people appear in a year (100 000 x 25 / 1000 = 2 500), who will need places in schools, so planners must build classrooms and water supply ahead of time.',
    q: 'If vaccination saves many more children each year but families keep having the same number of children, what happens to the population, and why?',
    exam: 'Define birth rate and death rate, calculate natural increase, give causes and effects of population growth, and suggest ways to manage it.'
  }),
  stop('cbc_g8_soc_s3_5', 'Diversity and Interpersonal skills', {
    pt: 'Getting On With People Who Are Different From You',
    tag: 'Diversity is the variety among people, and interpersonal skills are how we respect and work with it',
    body: 'Diversity means the differences among people, such as ethnic group, language, religion, gender, age, ability, culture and opinion. Kenya has many communities and languages, so diversity is part of daily life in school, market and church or mosque. Diversity can bring strengths such as new ideas, wider friendship, richer culture and trade, but it can also cause misunderstanding when people use stereotypes, which are fixed and often unfair ideas about a whole group, or prejudice, which is judging before knowing. Interpersonal skills are the abilities we use to relate with others. They include active listening (paying full attention and checking you understood), empathy (understanding how another person feels), respectful communication, cooperation, assertiveness (stating your view clearly without hurting others) and handling disagreement calmly. Good relationships depend on respect, honesty, trust and fairness. Kenya\'s Constitution protects people from unfair discrimination, and national values include unity and national cohesion. Practising these skills at school prepares learners to live peacefully in a diverse nation.',
    mistake: 'Believing that respecting differences means agreeing with everything, or that being assertive means being rude. You can disagree politely and still respect the person.',
    formula: 'Respect + listening + empathy + assertiveness = good interpersonal relations',
    badge: 'Circle of diverse learners working together',
    ctx: 'A Kenyan school has learners from different communities, languages and faiths who share a football team, a debating club and class tasks.',
    steps: [
      'Step 1: Identify the kinds of diversity around you, because you cannot respect what you do not notice.',
      'Step 2: Name stereotypes and prejudice and why they are unfair, because they are the main barrier.',
      'Step 3: Practise active listening and empathy, because understanding comes before judging.',
      'Step 4: Express your own view assertively, because respect goes both ways.',
      'Step 5: Cooperate on a shared goal, because working together builds trust.'
    ],
    ex: 'Two learners, Amina and Kiprono, argue over which day their group should meet because Amina attends a religious class on Friday afternoon. Step 1: the diversity is in religion and routine. Step 2: Kiprono first thinks "Amina is making excuses", which is a judgement before knowing. Step 3: he listens and says, "So Friday afternoon is not possible for you?" which checks he understood, and recognises she may feel left out. Step 4: Amina says clearly, "I can meet on Thursday or Saturday morning." Step 5: they agree on Thursday and share the tasks, and the group finishes on time. The skills used were listening, empathy, assertiveness and compromise.',
    q: 'Think of a time you judged someone before knowing them. What did you learn when you found out more?',
    exam: 'Define diversity, stereotype and prejudice; name interpersonal skills; explain benefits of diversity and ways of promoting respect.'
  }),
  stop('cbc_g8_soc_s3_6', 'Peaceful Conflict Resolutions', {
    pt: 'Settling Disputes Without Violence',
    tag: 'Conflict is normal; what matters is how we handle it',
    body: 'A conflict is a disagreement or clash of needs, interests or opinions between people or groups. Conflict is natural and not always bad, but when handled with violence it causes harm. Causes include competition for resources such as land, water or pasture, misunderstanding, unfairness, jealousy, differences in beliefs, and rumours. Peaceful methods of resolving conflict include negotiation (the sides talk directly and reach agreement), mediation (a neutral third person helps them reach agreement but does not decide), arbitration (a neutral person hears both and gives a decision they agreed to follow), reconciliation (restoring relationships after harm), and use of courts or elders as a last route. Traditional African societies used councils of elders, for example, who listened to both sides and guided a settlement, often with compensation and ceremonies of reconciliation. Good practice includes listening to each side, separating the problem from the person, focusing on interests, and looking for solutions that both sides can accept, called a win-win outcome. In school, peer mediators, guidance and counselling, and prefects handle conflicts. Peace brings development, safety and unity.',
    mistake: 'Thinking that giving in or avoiding the problem is the same as resolving it. Real resolution deals with the cause so both sides can live with the result.',
    formula: 'Listen + identify causes + generate options + agree + follow up',
    badge: 'Two sides and a mediator at a table',
    ctx: 'Councils of elders among Kenyan communities and modern national tools such as the National Cohesion and Integration Commission and Alternative Dispute Resolution in courts.',
    steps: [
      'Step 1: Stop and calm down, because anger blocks clear thinking.',
      'Step 2: Let each side tell their story without interruption, because both views are needed to see the real cause.',
      'Step 3: Identify the cause and what each person needs, because positions can hide shared interests.',
      'Step 4: Propose options and choose one both accept, because an agreement that both support will last.',
      'Step 5: Follow up, because many agreements fail without checking.'
    ],
    ex: 'Two groups of learners both want the school field at 4 pm: footballers and athletics team. Step 1: the captains stop the shouting. Step 2: each explains: footballers have a match on Saturday, athletes have a meet in two weeks. Step 3: the cause is one field and one time, not dislike. Step 4: a prefect mediates; they agree footballers use the field Monday and Wednesday and athletes Tuesday and Thursday, with Friday shared. Step 5: the games teacher checks after two weeks and the plan is adjusted. Both groups gain something, so it is a win-win result.',
    q: 'What is the difference between a mediator who helps you decide and a judge who decides for you, and when would you want each?',
    exam: 'Define conflict, give causes, explain methods of peaceful resolution (negotiation, mediation, arbitration, reconciliation) and describe traditional ways of settling disputes.'
  })
];

const S4 = [
  stop('cbc_g8_soc_s1_1', 'Map Reading and Interpretation', {
    pt: 'Reading a Map: Scale, Direction, Grid and Local Time',
    tag: 'A map is a flat drawing of a place to scale, and its key, scale and grid let you measure and locate',
    body: 'A map is a drawing of part of the Earth\'s surface seen from above and reduced to fit on paper. To read one you use its parts. The title says what area it shows. The key explains the symbols and colours. The scale tells how much the map is reduced: a representative fraction (RF) of 1:50 000 means 1 cm on the map is 50 000 cm, which is 500 m, on the ground. Direction is shown by the compass: north, south, east, west and between. Position is given by a grid reference: a topographical map is covered by vertical lines (eastings) and horizontal lines (northings); you read the eastings first, then the northings ("along the corridor before up the stairs"). Relief (the shape of the land) is shown by contour lines, which join places of the same height; lines close together mean a steep slope, lines far apart a gentle slope. Distance is found by measuring on the map and multiplying by the scale. Area can be found by counting grid squares. Location on the Earth is given by latitude (angle north or south of the Equator) and longitude (angle east or west of the Prime Meridian, which passes through Greenwich). Because the Earth turns 360 degrees in 24 hours, it turns 15 degrees every hour, or 1 degree every 4 minutes, so places further east have later local time than places west of them.',
    mistake: 'Reading the northing before the easting in a grid reference, or forgetting to convert centimetres on the map to kilometres on the ground. Also, when finding local time, adding for west and subtracting for east: east is ahead, so add; west is behind, so subtract.',
    formula: 'Ground distance = map distance x scale denominator; Time difference (minutes) = longitude difference x 4',
    badge: 'Topographical map with grid, contours and a longitude clock',
    ctx: 'Nairobi is at about 37 degrees East, so its local solar time is ahead of Greenwich time; learners use sheets of the Survey of Kenya at scales such as 1:50 000.',
    steps: [
      'Step 1: Read the title, key and scale first, because they tell you what the symbols and distances mean.',
      'Step 2: Find direction with the compass and grid with eastings then northings, because locating a place precisely needs a rule everyone follows.',
      'Step 3: Measure map distance with a ruler or string and multiply by the scale, because the map is a reduced picture.',
      'Step 4: Read relief from the contours (close together is steep), because they show the shape of the land.',
      'Step 5: For time, find the longitude difference, multiply by 4 minutes, and add if east or subtract if west, because the Sun reaches eastern places first.'
    ],
    ex: 'Part 1, distance. Two towns are 6.4 cm apart on a map of scale 1:50 000. Ground distance = 6.4 x 50 000 = 320 000 cm = 3 200 m = 3.2 km. Part 2, local time. When it is 12:00 noon at Greenwich (0 degrees), what is the local time at Nairobi, 37 degrees East? Longitude difference = 37 degrees. Time difference = 37 x 4 = 148 minutes = 2 hours 28 minutes. Nairobi is east, so we add: 12:00 + 2:28 = 14:28 (2:28 pm). Check: 37 degrees is about 2.5 hours at 15 degrees per hour, which agrees. Part 3, a place west: at 12:00 noon Greenwich, a place at 20 degrees West has 20 x 4 = 80 minutes difference, subtract: 10:40 am.',
    q: 'The Sun rises in the east. So if it is noon in Nairobi, is it already past noon or not yet noon in Kampala on the western side, and how do you know?',
    exam: 'Measure distance using scale, give a four or six figure grid reference, interpret contours, and calculate local time from longitude.'
  }),
  stop('cbc_g8_soc_s4_1', 'Weather and Climate', {
    pt: 'What the Air Is Doing Today and Over Many Years',
    tag: 'Weather is the day-to-day state of the atmosphere, climate is its average pattern over a long time',
    body: 'Weather is the condition of the atmosphere at a place over a short time: temperature, rainfall, wind, humidity (the amount of water vapour in the air), cloud cover, sunshine and pressure. Climate is the average weather of a place over a long period, usually about thirty years or more. Weather is recorded using instruments kept in a Stevenson screen, a white louvred box that shades them: a maximum and minimum thermometer for temperature, a rain gauge for rainfall in millimetres, a wind vane for wind direction (named by where it comes from), an anemometer for wind speed, a hygrometer for humidity and a barometer for pressure. Factors that influence the climate of a place include latitude (places near the Equator get more direct sunshine), altitude (temperature falls with height, about 6 degrees Celsius for every 1000 metres), distance from the sea, ocean currents, winds and relief, as when moist winds rise over mountains and drop rain on the windward side. Africa straddles the Equator, so it has climates from equatorial to desert. In Kenya, the long rains fall around March to May and the short rains around October to December, associated with the movement of the overhead sun and the Inter-Tropical Convergence Zone. Weather forecasts help farmers, pilots, fishermen and travellers.',
    mistake: 'Using the words weather and climate as if they mean the same. A rainy afternoon in a dry area is weather; a place having two rainy seasons is climate.',
    formula: 'Average temperature = sum of readings / number of readings; Range = maximum - minimum',
    badge: 'Stevenson screen with rain gauge and wind vane',
    ctx: 'Nairobi is cooler than Mombasa because it lies at higher altitude, and Lake Victoria and the Indian Ocean affect rainfall near them.',
    steps: [
      'Step 1: Separate weather from climate by time scale, because one is a moment and the other a long average.',
      'Step 2: Name each element and its instrument, because weather is measured, not guessed.',
      'Step 3: Record readings regularly and compute averages and ranges, because patterns appear in numbers.',
      'Step 4: Link the pattern to factors such as altitude and latitude, because they explain differences between places.',
      'Step 5: Use the climate pattern to explain activities such as farming seasons, because that shows why it matters.'
    ],
    ex: 'A school records daily maximum temperatures for five days in Celsius: 24, 26, 25, 27, 23. Step 1: this is weather (five days). Step 2: the instrument is a maximum thermometer in the Stevenson screen. Step 3: sum = 24+26+25+27+23 = 125; average = 125 / 5 = 25 degrees Celsius; range = 27 - 23 = 4 degrees. Step 4: another town 1500 metres higher would be about 1.5 x 6 = 9 degrees cooler on the same day, about 16 degrees, because temperature drops with altitude. Step 5: farmers use climate, not these five days, to decide planting time before the long rains.',
    q: 'If it rained heavily yesterday in a place that is normally dry, did the climate change? Explain.',
    exam: 'Distinguish weather and climate, name instruments and what they measure, compute average and range, and explain factors influencing climate.'
  }),
  stop('cbc_g8_soc_s4_2', 'Vegetation in Africa', {
    pt: 'Plants of Africa and the Climate Behind Them',
    tag: 'Vegetation is the natural plant cover, and climate decides which kind grows where',
    body: 'Vegetation is the plant life of an area. Natural vegetation grows without being planted by people. Africa\'s main vegetation types follow the climate and the distance from the Equator. Tropical rainforest grows near the Equator where it is hot and rainy all year, as in the Congo Basin; it has tall broad-leaved evergreen trees in layers and very high biodiversity. Savanna, tropical grassland with scattered trees, covers large areas on both sides of the rainforest, where there is a wet and a dry season, as in the Serengeti-Mara and Kenyan plains. Semi-desert and desert vegetation, such as short thorny shrubs and drought-resistant plants with deep or wide roots, small leaves or thick stems, grows where rainfall is low, as in northern Kenya and the Sahara and Namib. Mediterranean vegetation (shrubs and trees with hard leaves) grows in the far north and south with dry hot summers and wet winters. Montane vegetation changes with altitude on mountains such as Mount Kenya, from forest to bamboo to moorland to bare rock and ice. Mangrove forests grow in salty swampy coasts, including the Kenyan coast. Vegetation is important for timber, medicine, food, soil protection, water catchment, wildlife habitat and tourism. It is threatened by deforestation, overgrazing, fires and climate change, so we protect it by planting trees, controlled use, and law.',
    mistake: 'Imagining Africa is mostly rainforest or all savanna. Vegetation varies, and plants have adaptations: thorny small leaves in dry areas reduce water loss.',
    formula: 'Climate (rainfall + temperature) determines vegetation type',
    badge: 'Map of African vegetation belts from the Equator outward',
    ctx: 'Kenya\'s Mau Forest and Mount Kenya forests are water towers; the Maasai Mara is savanna; Arabuko-Sokoke on the coast is a coastal forest; mangroves line the coast near Lamu and Mombasa.',
    steps: [
      'Step 1: Define vegetation and its link to climate, because plants respond to water and warmth.',
      'Step 2: Place the belts on a map from the Equator outward, because the pattern is symmetrical north and south.',
      'Step 3: Describe each type and its adaptations, because form follows environment.',
      'Step 4: Give uses of vegetation, because they explain why it matters.',
      'Step 5: Explain threats and conservation, because people can change vegetation.'
    ],
    ex: 'A region has rain nearly every month and temperatures around 25 degrees Celsius all year. Step 1: abundant water and warmth means heavy plant growth. Step 2: near the Equator, so it fits the rainforest belt. Step 3: expect tall evergreen trees in layers, dense canopy, many species. Step 4: uses are timber, medicines, and protecting the soil. Step 5: if loggers clear it, the soil is washed away by heavy rain and rivers carry silt, so conservation requires selective logging and replanting. Compare a second region with two rainy and long dry seasons: scattered flat-topped acacia trees in grass, which is savanna, where grazing animals live.',
    q: 'Why might a plant with tiny, waxy leaves and deep roots survive in a place where a plant with big thin leaves would die?',
    exam: 'Name and locate African vegetation types, link them to climate, describe adaptations, and state uses and conservation of vegetation.'
  }),
  stop('cbc_g8_soc_s4_3', 'Historical sites and monuments in Africa', {
    pt: 'Places That Keep Africa\'s Story',
    tag: 'Historical sites and monuments are physical evidence of the past that we protect for learning and identity',
    body: 'A historical site is a place where important events happened or where evidence of the past remains, such as ruins, battlefields, caves or old towns. A monument is a structure built to remember a person or event, such as a statue, tomb or memorial, and some ancient monuments are the evidence of old civilisations. Examples in Africa include the Pyramids of Giza and the temples of Luxor in Egypt, the rock-hewn churches of Lalibela in Ethiopia, the stelae (tall carved stone pillars) of Axum, the ruins of Great Zimbabwe, and the old stone towns of the Swahili coast such as Gedi, Fort Jesus in Mombasa, Lamu Old Town and Kilwa in Tanzania. Many are recognised as World Heritage Sites by UNESCO. Their importance is that they teach history, show the skills of ancient people, strengthen national identity and pride, attract tourists who bring income and jobs, and support research. They are threatened by weather and weathering, careless visitors and vandalism, development, war and neglect. Protection includes laws, museums and the National Museums of Kenya, restoration, controlled tourism, and teaching communities to value them. In Kenya, sites are protected by law and by bodies such as the National Museums of Kenya.',
    mistake: 'Treating old buildings as unimportant or as only tourist places. They are evidence; once destroyed, they cannot be replaced.',
    formula: 'Site or monument = evidence of the past to learn from, protect and use wisely',
    badge: 'Map of African heritage sites',
    ctx: 'In Kenya, Fort Jesus in Mombasa, Gedi ruins near Malindi, Lamu Old Town and the Koobi Fora fossil sites are protected heritage.',
    steps: [
      'Step 1: Define historical site and monument, because the two are related but not the same.',
      'Step 2: Locate examples on a map of Africa, because place helps memory and link to region.',
      'Step 3: Say what each shows about the people who made it, because that is the historical value.',
      'Step 4: List the benefits to the country, because they justify protection.',
      'Step 5: Identify threats and protection measures, because communities must act to preserve them.'
    ],
    ex: 'Study Fort Jesus in Mombasa. Step 1: it is a historical site and a monument, a fortress built by the Portuguese in the late 1500s on the coast. Step 2: it stands on the Indian Ocean coast of Kenya. Step 3: it shows how the Portuguese tried to control Indian Ocean trade, and later passed to others who ruled the coast; its walls and layers show many periods. Step 4: it is a museum and a major tourist attraction. Step 5: sea salt and weather damage its stone; protection includes restoration, guarded access and visitor rules. Learners can show care by not writing on walls and by learning its story.',
    q: 'If this ruin were pulled down for a new building, what would be lost that money could not buy back?',
    exam: 'Define historical site and monument, name and locate examples in Africa and Kenya, explain their importance and ways of conserving them.'
  })
];

const S5 = [
  stop('cbc_g8_soc_s3_1', 'The Constitution of Kenya', {
    pt: 'The Supreme Law and How It Organises the State',
    tag: 'A constitution is the highest law that sets up government, limits its power and protects the people',
    body: 'A constitution is the supreme law of a country: it says how the state is organised, who holds power, how that power is limited, and what rights people have. Every other law must follow it, and a law that contradicts it is invalid. Kenya\'s current Constitution was promulgated (officially made law) in August 2010 after a referendum in which Kenyans voted for it. It replaced the independence Constitution. It begins with sovereignty of the people, meaning that all power belongs to the people, who exercise it directly or through elected representatives. The Constitution sets out national values and principles of governance, including patriotism, national unity, sharing and devolution of power, the rule of law, democracy, participation of the people, human dignity, equity, social justice, inclusiveness, equality, human rights, non-discrimination and protection of the marginalised, good governance, integrity, transparency and accountability, and sustainable development. It also provides for separation of powers among three arms: the Legislature (Parliament, which makes laws), the Executive (the President, Deputy President and Cabinet, who carry out laws and run government) and the Judiciary (the courts, which interpret laws and settle disputes). Separation of powers prevents one person or group from holding all power. Government is at two levels, national and county, a system called devolution. Each of the 47 counties has a governor and a county assembly. Kenyans may only change the Constitution by the procedures it sets out, and for some parts a referendum is required.',
    mistake: 'Believing the President can change any law or make rules for the courts. Under the separation of powers, each arm has its own role and the Constitution limits all of them.',
    formula: 'Three arms: Legislature makes laws, Executive implements laws, Judiciary interprets laws',
    badge: 'Diagram of three arms and two levels of government',
    ctx: 'Kenyans elect the President, governors, MPs, senators, women representatives and county assembly members; a dispute over a county road is handled under a county assembly law and, if needed, the courts.',
    steps: [
      'Step 1: Define a constitution and supremacy, because every other law gets its authority from it.',
      'Step 2: Explain sovereignty of the people, because it says where power comes from.',
      'Step 3: Name the three arms and what each does, because separation of powers is the main safeguard against abuse.',
      'Step 4: Explain two levels of government, because devolution brings services closer to the people.',
      'Step 5: Apply to a case, because the point of a constitution is to settle real questions.'
    ],
    ex: 'A county assembly passes a law that bans all street trading, and a trader says it is unfair. Step 1: the Constitution is supreme, so the county law must agree with it. Step 2: power belongs to the people, who elected the assembly, but the assembly has limits. Step 3: the assembly (a legislature at county level) made the law; the county executive enforces it; if the trader goes to court, the judiciary decides whether it breaks the Constitution, for instance the right to fair labour practices and to engage in trade. Step 4: because Kenya has devolution, the county can make laws on matters assigned to counties, such as markets, but not on matters assigned to the national government. Step 5: the court finds that the ban is too wide and orders the assembly to change it. This shows each arm and level acting within its role.',
    q: 'If one person could make laws, enforce them and judge those who break them, what could go wrong?',
    exam: 'Define a constitution, state the three arms and their functions, explain devolution and the national values and principles.'
  }),
  stop('cbc_g8_soc_s5_1', 'Human Rights', {
    pt: 'What Every Person Is Owed Simply for Being Human',
    tag: 'Human rights belong to everyone equally, and each right comes with responsibilities',
    body: 'Human rights are the basic freedoms and protections that belong to every person because they are human. They are universal (apply to all), inalienable (cannot be taken away, although some may be limited by law in fair ways), indivisible and equal. A responsibility is a duty that goes with a right: my right to be heard goes with my duty to listen to others. The Constitution of Kenya contains the Bill of Rights, which includes the right to life, equality and freedom from discrimination, human dignity, freedom and security of the person, freedom of conscience, religion and expression, privacy, freedom of movement, education, health care, housing, food and clean water, fair labour practices, access to information, protection of children, and a fair hearing. Some rights are civil and political (voting, speech), some are social and economic (education, health), and some belong to groups, such as children and persons with disabilities. Child rights include a name and nationality, free and compulsory basic education, protection from abuse, harmful cultural practices, child labour and neglect, and parental care. Rights may be violated by discrimination, abuse, child labour, early marriage, and denial of education. Protection comes from the courts, the Kenya National Commission on Human Rights, the police, the Children\'s Office and organisations such as Childline Kenya (116). The Universal Declaration of Human Rights of the United Nations (1948) is the international statement.',
    mistake: 'Thinking that rights mean freedom to do anything. Rights end where they harm the rights of others, and they come with responsibilities such as obeying the law and respecting others.',
    formula: 'Right + responsibility: my right ends where yours begins',
    badge: 'Scales balancing rights and responsibilities',
    ctx: 'A child in Kenya has a right to free basic education; a parent or guardian who keeps a child at home to work is violating it, and the area chief or children\'s officer can intervene.',
    steps: [
      'Step 1: Define rights and responsibilities, because the two always go together.',
      'Step 2: Identify the right involved in a situation using the Bill of Rights, because naming the right shows what is owed.',
      'Step 3: Decide whether it is being respected or violated, because a right is tested in practice.',
      'Step 4: Identify who is responsible for protecting it, because someone must act.',
      'Step 5: Choose the correct place to seek help, because a right is useful only if you know how to claim it.'
    ],
    ex: 'A 12-year-old, Atieno, is kept at home to sell vegetables every day instead of attending school. Step 1: the right is education, and the parent\'s responsibility is to provide care and schooling. Step 2: the Constitution gives every child the right to free and compulsory basic education. Step 3: she is denied it, so the right is violated; child labour that interferes with school is also prohibited. Step 4: the parent or guardian has the main duty, the government has a duty to provide schools, and the community should report. Step 5: a teacher or neighbour can talk to the family, report to the area chief, children\'s officer or call Childline Kenya on 116. Her responsibility is to attend school and cooperate once she is back.',
    q: 'If rights had no limits, what would happen when your right to play loud music meets your neighbour\'s right to rest?',
    exam: 'Define human rights, list rights in the Bill of Rights and child rights, link rights with responsibilities, and give ways of protecting rights.'
  }),
  stop('cbc_g8_soc_s5_2', 'Citizenship', {
    pt: 'Belonging to a Country, With Rights and Duties',
    tag: 'A citizen is a legal member of a country, and citizenship is acquired in defined ways',
    body: 'Citizenship is the legal status of belonging to a country, with its rights and duties. A citizen is a person recognised by the law of a country as a member. Under the Constitution of Kenya, a person is a citizen by birth or by registration. A citizen by birth is a person who on the day of birth had at least one parent who is a Kenyan citizen. A person may become a citizen by registration, for example through marriage to a Kenyan for a period set by law, or after living in Kenya lawfully for a period set by law and meeting the conditions of the Citizenship and Immigration Act. Dual citizenship, being a citizen of Kenya and another country at once, is allowed. Citizenship may be lost if a person gained it by fraud, among other grounds. A national identity card and a passport are documents that prove citizenship; a birth certificate is evidence of birth. Rights of citizens include the right to vote and to stand for office, to a passport, to move and live anywhere in Kenya, and to government services. Duties and responsibilities include obeying the law, paying taxes, voting, protecting public property, respecting others and the environment, serving the community, and defending the country\'s unity. Good citizenship also means participating in public life, for instance in public participation meetings on county budgets. National symbols include the flag, the coat of arms, the national anthem and the national pledge.',
    mistake: 'Thinking that only voting makes a good citizen, or that anyone born in Kenya is automatically a citizen regardless of parents. Citizenship is by law, and duties continue every day, not just on election day.',
    formula: 'Citizenship = membership (by birth or registration) + rights + responsibilities',
    badge: 'Citizen card with rights on one side and duties on the other',
    ctx: 'Kenyans aged 18 and above may register as voters with the Independent Electoral and Boundaries Commission and take part in elections; learners can practise citizenship by caring for school property and joining clean-ups.',
    steps: [
      'Step 1: Define citizenship and citizen, because the status comes from law.',
      'Step 2: Identify how citizenship is acquired, by birth or by registration, because each has conditions.',
      'Step 3: List the rights that come with it, because they are the benefits of membership.',
      'Step 4: List the duties, because the state works only when citizens do their part.',
      'Step 5: Apply to a situation, because good citizenship is shown in action.'
    ],
    ex: 'Mwangi was born in Nakuru to a Kenyan mother and a father who is not Kenyan. Step 1: the question is whether he is a citizen. Step 2: the Constitution says a person is a citizen by birth if on the day of birth at least one parent is a citizen. His mother is, so he is a citizen by birth. Step 3: he will be able to hold an identity card and passport and, at 18, to register and vote. Step 4: duties include obeying the law and paying tax when he earns. Step 5: when the school field is damaged, he joins the repair team, which shows duty to protect public property. Another case: Marta, born abroad to non-Kenyan parents, who has lived lawfully in Kenya and meets the legal conditions, can apply for citizenship by registration.',
    q: 'What do you owe a country that you did not choose to be born in, and what does it owe you?',
    exam: 'Define citizenship, explain how it is acquired in Kenya, state rights and duties of a citizen, and identify national symbols.'
  })
];

const STATIONS = [
  { id: 'cbc_g8_soc_s1', title: '1.0 Social Studies and Personal Management', strand: 'Strand 1.0: Social Studies and Personal Management', summary: 'Improving yourself and understanding your self-esteem.', subs: S1 },
  { id: 'cbc_g8_soc_s2', title: '2.0 Community Service Learning', strand: 'Strand 2.0: Community Service Learning', summary: 'Planning and carrying out a service project in your community.', subs: S2 },
  { id: 'cbc_g8_soc_s3', title: '3.0 People and Relationships', strand: 'Strand 3.0: People and Relationships', summary: 'Human origin, early civilisations, the trans-Saharan slave trade, population, diversity and peaceful conflict resolution.', subs: S3 },
  { id: 'cbc_g8_soc_s4', title: '4.0 Natural and Historic Built Environments', strand: 'Strand 4.0: Natural and Historic Built Environments', summary: 'Map reading, weather and climate, vegetation and historic sites in Africa.', subs: S4 },
  { id: 'cbc_g8_soc_s5', title: '5.0 Political Developments and Governance', strand: 'Strand 5.0: Political Developments and Governance', summary: 'The Constitution, human rights and citizenship.', subs: S5 }
];
const ICONS = ['SELF', 'CSL', 'PEOPLE', 'MAP', 'LAW'];

const map = {
  curriculum: 'CBC',
  grade: 8,
  subject: 'Social Studies',
  code: 'SOC-G8',
  trackPathway: 'Core',
  title: 'CBE Grade 8 (Junior School) Social Studies Metro Line',
  stations: STATIONS.map((s, i) => ({
    id: s.id, number: i + 1, title: s.title, strand: s.strand,
    icon: ICONS[i], status: 'available', summary: s.summary, subtopics: s.subs
  }))
};

module.exports = { maps: [map], retiredIds: [] };
