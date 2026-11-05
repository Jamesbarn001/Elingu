const { mcq, num, short, term, buildPaper } = require('./helpers');

module.exports = buildPaper({
  id: 'elingu_cbc_g10_chemistry_set1',
  curriculum: 'CBC',
  grade: 10,
  gradeRange: [10, 12],
  subject: 'Chemistry',
  scale: 'CBC',
  title: 'Grade 10 Chemistry — Practice Paper 1',
  series: 'Elingu practice paper, Senior School style',
  durationMinutes: 60,
  calculatorAllowed: true,
  instructions: 'Answer all questions. Section A: choose one answer. Section B: type your answer. Use these relative atomic masses: H = 1, C = 12, O = 16, Na = 23, S = 32, Ca = 40.'
}, [
  {
    title: 'Section A — Choose the correct answer',
    instructions: 'Each question is worth 1 mark.',
    questions: [
      mcq('Atoms and the periodic table', 'What is the chemical symbol for sodium?', ['S', 'So', 'Na', 'N'], 'C', 'Sodium comes from the Latin "natrium": Na.'),
      mcq('Atomic structure', 'The atomic number of an element is the number of…', ['neutrons in the nucleus', 'protons in the nucleus', 'electrons in the outer shell', 'protons and neutrons together'], 'B', 'Atomic number = number of protons.'),
      mcq('Atomic structure', 'Which particle in an atom has no electric charge?', ['Proton', 'Electron', 'Neutron', 'Ion'], 'C', 'Neutrons are neutral.'),
      mcq('Periodic table', 'Which of these is a noble gas?', ['Chlorine', 'Argon', 'Oxygen', 'Nitrogen'], 'B', 'Argon is in Group 18 (the noble gases).'),
      mcq('Acids and bases', 'What is the pH of a neutral solution such as pure water?', ['0', '5', '7', '14'], 'C', 'A pH of 7 is neutral.'),
      mcq('Bonding', 'Which type of bond involves the sharing of electrons between atoms?', ['Ionic', 'Covalent', 'Metallic', 'Hydrogen'], 'B', 'In a covalent bond atoms share pairs of electrons.'),
      mcq('Formulae', 'What is the chemical formula of water?', ['HO', 'H₂O', 'H₂O₂', 'OH₂O'], 'B', 'Water has two hydrogen atoms and one oxygen atom: H₂O.'),
      mcq('Separating mixtures', 'Which method separates sand from a mixture of sand and water?', ['Filtration', 'Evaporation', 'Magnetism', 'Chromatography'], 'A', 'Sand does not dissolve, so it stays on the filter paper.'),
      mcq('Periodic table', 'Group 1 elements, such as sodium and potassium, are called…', ['halogens', 'noble gases', 'alkali metals', 'transition metals'], 'C', 'Group 1 metals are the alkali metals.'),
      mcq('Reactions of acids', 'Which gas is produced when zinc reacts with dilute hydrochloric acid?', ['Oxygen', 'Hydrogen', 'Carbon dioxide', 'Chlorine'], 'B', 'Metal + acid → salt + hydrogen.'),
      mcq('Tests for gases', 'Carbon dioxide turns limewater…', ['blue', 'pink', 'milky (cloudy)', 'green'], 'C', 'Carbon dioxide reacts with limewater to give a white precipitate of calcium carbonate.'),
      mcq('Atomic structure', 'An atom has 11 protons and 12 neutrons. What is its mass number?', ['11', '12', '23', '1'], 'C', 'Mass number = protons + neutrons = 11 + 12 = 23.'),
      mcq('Chemical reactions', 'The rusting of iron is an example of…', ['oxidation', 'distillation', 'neutralisation', 'evaporation'], 'A', 'Iron combines with oxygen (and water) to form iron oxide: oxidation.'),
      mcq('Acids and bases', 'Which of these is an acid?', ['NaOH', 'HCl', 'NaCl', 'KOH'], 'B', 'HCl is hydrochloric acid. NaOH and KOH are alkalis; NaCl is a salt.'),
      mcq('Periodic table', 'An element has the electronic configuration 2, 8, 3. Which element is it?', ['Sodium', 'Magnesium', 'Aluminium', 'Silicon'], 'C', 'The atomic number is 2 + 8 + 3 = 13, which is aluminium.'),
      mcq('Gases', 'Which of these gases is lighter than air and is used to fill party balloons?', ['Oxygen', 'Helium', 'Carbon dioxide', 'Nitrogen'], 'B', 'Helium is much less dense than air.'),
      mcq('States of matter', 'The change of a liquid to a gas at a temperature below its boiling point is called…', ['evaporation', 'condensation', 'sublimation', 'melting'], 'A', 'Evaporation happens at the surface of a liquid at any temperature.'),
      mcq('Atomic structure', 'Which two particles are found in the nucleus of an atom?', ['Protons and electrons', 'Neutrons and electrons', 'Protons and neutrons', 'Only electrons'], 'C', 'The nucleus contains protons and neutrons; electrons move around it.')
    ]
  },
  {
    title: 'Section B — Calculations and short answers',
    instructions: 'Type your answer. For 2- and 3-mark calculations show your working.',
    questions: [
      num('Formula mass', 'Calculate the relative formula mass of calcium carbonate, CaCO₃.', 100, 2, { method: [{ any: ['40 + 12', '40+12', '12 + 48', '3 x 16', '3 * 16', '48'] }], explanation: '40 + 12 + (3 × 16) = 40 + 12 + 48 = 100.' }),
      num('Moles', 'How many moles are there in 36 g of water, H₂O? (H = 1, O = 16)', 2, 2, { unit: ['mol', 'moles'], method: [{ any: ['18'] }, { any: ['36/18', '36 / 18', '36 ÷ 18'] }], explanation: 'Mr of H₂O = 2 + 16 = 18. Moles = mass ÷ Mr = 36 ÷ 18 = 2 mol.' }),
      num('Moles', 'Calculate the mass of 0.5 mol of sodium hydroxide, NaOH. (Na = 23, O = 16, H = 1)', 20, 2, { unit: ['g'], method: [{ any: ['40'] }, { any: ['0.5 x 40', '0.5 * 40', '0.5×40'] }], explanation: 'Mr of NaOH = 23 + 16 + 1 = 40. Mass = 0.5 × 40 = 20 g.' }),
      num('Atomic structure', 'How many neutrons are there in an atom of ²⁷Al that has 13 protons?', 14, 1, { explanation: 'Neutrons = mass number − protons = 27 − 13 = 14.' }),
      num('Ions', 'The atomic number of chlorine is 17. How many electrons are in a chloride ion, Cl⁻?', 18, 1, { explanation: 'A chlorine atom has 17 electrons. Cl⁻ has gained one more electron, so it has 18.' }),
      num('Equations', 'CH₄ + 2O₂ → CO₂ + 2H₂O. How many moles of oxygen are needed to burn 2 moles of methane?', 4, 2, { unit: ['mol', 'moles'], method: [{ any: ['2 x 2', '2 * 2', '2×2', '1 : 2', '1:2'] }], explanation: 'The ratio CH₄ : O₂ is 1 : 2, so 2 mol of methane needs 4 mol of oxygen.' }),
      num('Concentration', '4 g of sodium hydroxide (Mr = 40) is dissolved in water to make 0.5 dm³ of solution. Calculate the concentration in mol/dm³.', 0.2, 3, { tolerance: 0.001, unit: ['mol/dm3', 'mol dm-3', 'mol/l', 'm'], method: [{ any: ['0.1'] }, { any: ['4/40', '4 / 40', '4 ÷ 40'] }], explanation: 'Moles = 4 ÷ 40 = 0.1 mol. Concentration = moles ÷ volume = 0.1 ÷ 0.5 = 0.2 mol/dm³.' }),
      num('Composition', 'Calculate the percentage by mass of oxygen in water, H₂O. Give your answer to 1 decimal place. (H = 1, O = 16)', 88.9, 2, { tolerance: 0.06, unit: ['%'], method: [{ any: ['16/18', '16 / 18', '16 ÷ 18', '18'] }], explanation: '(16 ÷ 18) × 100 = 88.9%.' }),
      short('Equations', 'Write a word equation for the reaction of magnesium with oxygen.', [{ all: ['magnesium', 'oxygen'] }, { any: ['magnesium oxide'] }], 2, 'Magnesium + oxygen → magnesium oxide.', 'magnesium + oxygen -> magnesium oxide'),
      short('Bonding', 'State two properties of ionic compounds.', [{ any: ['high melting point', 'high melting points', 'high boiling point'] }, { any: ['conduct electricity when molten', 'conduct when molten', 'conduct electricity when dissolved', 'conduct electricity in solution', 'conduct when dissolved', 'conducts electricity when molten', 'conducts electricity when dissolved'] }, { any: ['soluble in water', 'dissolve in water'] }, { any: ['brittle'] }], 2, 'High melting points, conduct electricity when molten or dissolved, often soluble in water, and brittle.', 'They have high melting points and are brittle'),
      term('Separating mixtures', 'Name one method for obtaining pure water from salt water.', ['distillation', 'simple distillation', 'evaporation', 'evaporation and condensation'], 1, 'Simple distillation: boil the salt water and condense the steam.'),
      short('Reactivity', 'Explain why sodium metal is stored in oil.', [{ any: ['reacts with oxygen', 'reacts with air', 'reacts with water', 'reactive', 'very reactive', 'reacts with moisture', 'reacts violently'] }, { any: ['prevent', 'prevents', 'stops', 'keeps away', 'no contact', 'protect', 'protects', 'cover', 'covers', 'oil'] }], 2, 'Sodium is very reactive and reacts quickly with oxygen and water in the air. The oil stops it coming into contact with them.', 'It is very reactive and the oil keeps it away from air and water')
    ]
  }
]);
