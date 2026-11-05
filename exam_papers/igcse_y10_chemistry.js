const { mcq, num, short, term, buildPaper } = require('./helpers');

module.exports = buildPaper({
  id: 'elingu_igcse_y10_chemistry_set1',
  curriculum: 'BRITISH',
  grade: 10,
  gradeRange: [10, 11],
  subject: 'Chemistry',
  scale: 'IGCSE',
  title: 'IGCSE Chemistry (Year 10) — Practice Paper 1',
  series: 'Elingu practice paper, Cambridge IGCSE style',
  durationMinutes: 60,
  calculatorAllowed: true,
  instructions: 'Answer all questions. Section A: choose one answer. Section B: type your answer; show working for 2-mark calculations. Relative atomic masses: H = 1, C = 12, O = 16, Na = 23, Mg = 24, S = 32, Ca = 40. Molar volume of a gas at room temperature and pressure = 24 dm³.'
}, [
  {
    title: 'Section A — Multiple choice',
    instructions: 'Each question is worth 1 mark.',
    questions: [
      mcq('States of matter', 'In which state of matter are the particles close together and fixed in position, vibrating?', ['Solid', 'Liquid', 'Gas', 'Plasma'], 'A', 'Particles in a solid are tightly packed in a regular pattern and only vibrate.'),
      mcq('Atomic structure', 'The atomic number of an element is defined as the number of…', ['protons in the nucleus', 'neutrons in the nucleus', 'protons plus neutrons', 'electrons in the outer shell'], 'A', 'Atomic (proton) number = number of protons.'),
      mcq('Atomic structure', 'Isotopes of an element have the same number of…', ['neutrons but different protons', 'protons but different neutrons', 'electrons but different protons', 'nucleons'], 'B', 'Isotopes are atoms of the same element (same protons) with different numbers of neutrons.'),
      mcq('Periodic table', 'What is the electronic configuration of magnesium (atomic number 12)?', ['2, 8, 2', '2, 8, 1', '2, 10', '2, 6, 4'], 'A', '12 electrons: 2 in the first shell, 8 in the second, 2 in the third.'),
      mcq('Bonding', 'Ionic bonding involves…', ['sharing of electrons', 'transfer of electrons', 'sharing of protons', 'attraction between molecules only'], 'B', 'A metal atom transfers electrons to a non-metal atom, forming oppositely charged ions.'),
      mcq('Acids and bases', 'What is the approximate pH of a strong acid such as hydrochloric acid?', ['1', '7', '10', '14'], 'A', 'Strong acids have a pH of about 0 to 2.'),
      mcq('Acids and bases', 'Which colour does blue litmus paper turn in an acid?', ['Red', 'Purple', 'Green', 'It stays blue'], 'A', 'Acids turn blue litmus red.'),
      mcq('Reactions of acids', 'Which gas is given off when calcium carbonate reacts with dilute hydrochloric acid?', ['Hydrogen', 'Oxygen', 'Carbon dioxide', 'Chlorine'], 'C', 'Carbonate + acid → salt + water + carbon dioxide.'),
      mcq('Electrolysis', 'During electrolysis, which electrode is the cathode?', ['The positive electrode', 'The negative electrode', 'The one made of carbon', 'The one that dissolves'], 'B', 'The cathode is the negative electrode. Positive ions (cations) move to it.'),
      mcq('Organic chemistry', 'Crude oil is separated into useful fractions by…', ['filtration', 'fractional distillation', 'crystallisation', 'electrolysis'], 'B', 'Fractions have different boiling points and are separated by fractional distillation.'),
      mcq('Organic chemistry', 'What is the general formula of the alkanes?', ['CₙH₂ₙ', 'CₙH₂ₙ₊₂', 'CₙH₂ₙ₋₂', 'CₙHₙ'], 'B', 'Alkanes are saturated hydrocarbons with formula CₙH₂ₙ₊₂, such as CH₄ and C₂H₆.'),
      mcq('Organic chemistry', 'Which of these compounds is an alkene?', ['CH₄', 'C₂H₆', 'C₂H₄', 'C₃H₈'], 'C', 'Alkenes have a C=C double bond and the formula CₙH₂ₙ: C₂H₄ is ethene.'),
      mcq('Rates of reaction', 'Which change will increase the rate of a reaction?', ['Lowering the temperature', 'Increasing the temperature', 'Using a larger piece of solid', 'Diluting the acid'], 'B', 'A higher temperature gives particles more energy, so more collisions are successful.'),
      mcq('Energetics', 'In an exothermic reaction, heat energy is…', ['taken in from the surroundings', 'given out to the surroundings', 'neither taken in nor given out', 'used to break all the bonds'], 'B', 'Exothermic reactions release heat, so the surroundings get warmer.'),
      mcq('Tests for gases', 'How is chlorine gas identified?', ['It relights a glowing splint.', 'It turns limewater milky.', 'It bleaches damp litmus paper.', 'It burns with a squeaky pop.'], 'C', 'Chlorine bleaches damp litmus paper white.')
    ]
  },
  {
    title: 'Section B — Calculations and short answers',
    instructions: 'Type your answer. Show working for 2-mark calculations.',
    questions: [
      num('Formula mass', 'Calculate the relative formula mass (Mr) of sulfuric acid, H₂SO₄.', 98, 2, { method: [{ any: ['2 + 32', '2+32', '4 x 16', '4 * 16', '64'] }], explanation: '(2 × 1) + 32 + (4 × 16) = 2 + 32 + 64 = 98.' }),
      num('Moles', 'Calculate the number of moles in 5.3 g of sodium carbonate, Na₂CO₃.', 0.05, 2, { tolerance: 0.0005, unit: ['mol'], method: [{ any: ['106'] }, { any: ['5.3/106', '5.3 / 106', '5.3 ÷ 106'] }], explanation: 'Mr = (2 × 23) + 12 + (3 × 16) = 106. Moles = 5.3 ÷ 106 = 0.05 mol.' }),
      num('Moles', 'Calculate the mass of 0.25 mol of calcium carbonate, CaCO₃.', 25, 2, { unit: ['g'], method: [{ any: ['100'] }, { any: ['0.25 x 100', '0.25 * 100', '0.25×100'] }], explanation: 'Mr = 100. Mass = 0.25 × 100 = 25 g.' }),
      num('Composition', 'Calculate the percentage by mass of magnesium in magnesium oxide, MgO.', 60, 2, { tolerance: 0.1, unit: ['%'], method: [{ any: ['24/40', '24 / 40', '24 ÷ 40', '40'] }], explanation: 'Mr of MgO = 24 + 16 = 40. (24 ÷ 40) × 100 = 60%.' }),
      num('Gas volumes', 'Calculate the volume of 0.1 mol of a gas at room temperature and pressure, in dm³.', 2.4, 2, { tolerance: 0.001, unit: ['dm3'], method: [{ any: ['0.1 x 24', '0.1 * 24', '0.1×24', '24'] }], explanation: 'Volume = moles × 24 = 0.1 × 24 = 2.4 dm³.' }),
      num('Concentration', 'A solution contains 0.2 mol of solute in 500 cm³. Calculate its concentration in mol/dm³.', 0.4, 2, { tolerance: 0.001, unit: ['mol/dm3', 'mol dm-3', 'm'], method: [{ any: ['0.5'] }, { any: ['0.2/0.5', '0.2 / 0.5', '0.2 ÷ 0.5'] }], explanation: '500 cm³ = 0.5 dm³. Concentration = 0.2 ÷ 0.5 = 0.4 mol/dm³.' }),
      num('Ions', 'The atomic number of aluminium is 13. How many electrons are there in an Al³⁺ ion?', 10, 1, { explanation: 'An Al atom has 13 electrons. Al³⁺ has lost 3, so it has 10.' }),
      term('Electrolysis', 'Name the gas formed at the anode when concentrated sodium chloride solution is electrolysed.', ['chlorine', 'cl2'], 1, 'Chloride ions are discharged at the anode as chlorine gas.'),
      short('Metals', 'State two physical properties of metals.', [{ any: ['conduct electricity', 'conducts electricity', 'good conductor of electricity', 'electrical conductor'] }, { any: ['conduct heat', 'conducts heat', 'good conductor of heat'] }, { any: ['malleable'] }, { any: ['ductile'] }, { any: ['shiny', 'lustrous', 'lustre'] }, { any: ['high melting point', 'high melting points'] }, { any: ['sonorous'] }], 2, 'Good conductors of heat and electricity, malleable, ductile, shiny, high melting points.', 'They conduct electricity and are malleable'),
      short('Tests for gases', 'Describe the test for hydrogen gas.', [{ any: ['lit splint', 'burning splint', 'lighted splint', 'flame', 'lit match'] }, { any: ['squeaky pop', 'pop sound', 'squeaky', 'a pop'] }], 2, 'Hold a lit splint at the mouth of the test tube: hydrogen burns with a squeaky pop.', 'A lit splint gives a squeaky pop'),
      short('Rates of reaction', 'What is a catalyst?', [{ any: ['speeds up', 'increases the rate', 'increase the rate', 'faster', 'increases the speed', 'speed up'] }, { any: ['not used up', 'unchanged', 'not changed', 'not consumed', 'remains unchanged', 'is not used up', 'not used'] }], 2, 'A catalyst speeds up a chemical reaction and is not used up (it is unchanged at the end).', 'It speeds up a reaction and is not used up'),
      term('Formulae', 'Write the chemical formula of calcium hydroxide.', ['Ca(OH)2', 'ca(oh)2', 'Ca(OH)₂'], 1, 'Ca²⁺ and two OH⁻ ions: Ca(OH)₂.'),
      num('Formulae', 'How many atoms are there in one molecule of glucose, C₆H₁₂O₆?', 24, 1, { explanation: '6 + 12 + 6 = 24 atoms.' }),
      short('Bonding', 'Explain why diamond is very hard.', [{ any: ['covalent bond', 'covalent bonds', 'strong bonds', 'strong covalent'] }, { any: ['four other', 'four carbon', '4 other', 'giant', 'every carbon', 'each carbon', 'tetrahedral', 'lattice', 'network'] }], 2, 'Each carbon atom is joined to four others by strong covalent bonds in a giant lattice, and a lot of energy is needed to break them.', 'Each carbon is bonded to four others by strong covalent bonds in a giant structure'),
      num('Equations', '2H₂ + O₂ → 2H₂O. How many moles of water are formed when 2 moles of hydrogen burn completely?', 2, 1, { unit: ['mol', 'moles'], explanation: 'The ratio H₂ : H₂O is 2 : 2, so 2 mol of hydrogen gives 2 mol of water.' })
    ]
  }
]);
