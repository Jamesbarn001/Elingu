const { mcq, num, short, term, buildPaper } = require('./helpers');

module.exports = buildPaper({
  id: 'elingu_cbc_g10_physics_set1',
  curriculum: 'CBC',
  grade: 10,
  gradeRange: [10, 12],
  subject: 'Physics',
  scale: 'CBC',
  title: 'Grade 10 Physics — Practice Paper 1',
  series: 'Elingu practice paper, Senior School style',
  durationMinutes: 60,
  calculatorAllowed: true,
  instructions: 'Answer all questions. Section A: choose one answer. Section B: type your answer with its unit; show working for 2-mark calculations. Take g = 10 m/s².'
}, [
  {
    title: 'Section A — Choose the correct answer',
    instructions: 'Each question is worth 1 mark.',
    questions: [
      mcq('Measurement', 'What is the SI unit of mass?', ['gram', 'kilogram', 'newton', 'litre'], 'B', 'The SI unit of mass is the kilogram (kg).'),
      mcq('Measurement', 'Which of these is a scalar quantity?', ['Velocity', 'Force', 'Distance', 'Displacement'], 'C', 'A scalar has size only. Distance has no direction.'),
      mcq('Forces', 'Newton\'s first law of motion is about…', ['inertia', 'gravity', 'friction', 'pressure'], 'A', 'An object stays at rest or keeps moving at constant velocity unless a resultant force acts on it: inertia.'),
      mcq('Waves', 'What is the SI unit of frequency?', ['Hertz', 'Metre', 'Second', 'Watt'], 'A', 'Frequency is measured in hertz (Hz), the number of waves per second.'),
      mcq('Heat', 'How does heat from the Sun reach the Earth?', ['Conduction', 'Convection', 'Radiation', 'Evaporation'], 'C', 'Space is a vacuum, so only radiation can carry the heat.'),
      mcq('Light', 'A concave mirror is also known as a…', ['converging mirror', 'diverging mirror', 'plane mirror', 'convex lens'], 'A', 'A concave mirror brings parallel rays together at a focus.'),
      mcq('Electricity', 'In a parallel circuit, the voltage across each branch is…', ['different in every branch', 'the same', 'zero', 'shared equally'], 'B', 'Each branch is connected across the same two points, so each has the same voltage.'),
      mcq('Magnetism', 'When two magnets are brought close together, like poles…', ['attract', 'repel', 'do nothing', 'cancel'], 'B', 'Like poles repel; unlike poles attract.'),
      mcq('Pressure', 'Atmospheric pressure at sea level is about…', ['100 Pa', '1 000 Pa', '100 000 Pa', '10 000 000 Pa'], 'C', 'About 101 kPa, or roughly 100 000 Pa.'),
      mcq('Forces', 'Which of these is NOT a force?', ['Weight', 'Friction', 'Tension', 'Mass'], 'D', 'Mass is the amount of matter in an object, not a force.'),
      mcq('Light', 'Refraction of light happens because light changes…', ['colour', 'speed', 'frequency', 'source'], 'B', 'Light travels at different speeds in different materials, which bends it.'),
      mcq('Electricity', 'Lightning is caused by…', ['the discharge of static electricity', 'moving magnets', 'a chemical reaction', 'strong winds only'], 'A', 'Charge builds up in clouds and discharges as a spark.'),
      mcq('Sound', 'An echo is caused by…', ['reflection of sound', 'refraction of sound', 'absorption of sound', 'a vibrating string'], 'A', 'Sound reflects from a hard surface and comes back to the listener.'),
      mcq('Energy', 'Which statement about energy is correct?', ['Energy can be created from nothing.', 'Energy can be destroyed.', 'Energy cannot be created or destroyed, only changed from one form to another.', 'Energy is the same as force.'], 'C', 'This is the law of conservation of energy.'),
      mcq('Motion', 'A car moves at a constant speed in a straight line. Its acceleration is…', ['zero', 'increasing', 'decreasing', 'equal to its speed'], 'A', 'Acceleration is the rate of change of velocity. If velocity is constant, acceleration is zero.')
    ]
  },
  {
    title: 'Section B — Calculations and short answers',
    instructions: 'Type your answer with its unit.',
    questions: [
      num('Density', 'A metal block has mass 2 400 g and volume 300 cm³. Find its density in g/cm³.', 8, 2, { unit: ['g/cm3', 'g/cm^3', 'gcm-3'], method: [{ any: ['2400/300', '2400 / 300', '2400 ÷ 300', 'mass/volume'] }], explanation: 'Density = mass ÷ volume = 2 400 ÷ 300 = 8 g/cm³.' }),
      num('Speed', 'Change 90 km/h into metres per second.', 25, 2, { unit: ['m/s', 'ms-1', 'metres per second'], method: [{ any: ['90000', '90 000', '3600', '1000'] }], explanation: '90 km/h = 90 000 m ÷ 3 600 s = 25 m/s.' }),
      num('Force', 'A car of mass 1 500 kg accelerates at 2 m/s². Find the resultant force.', 3000, 2, { unit: ['n'], unitRequired: true, sample: '3000 N', method: [{ any: ['1500 x 2', '1500 * 2', '1500×2', 'f = ma', 'ma'] }], explanation: 'F = ma = 1 500 × 2 = 3 000 N.' }),
      num('Energy', 'Find the kinetic energy of a 4 kg ball moving at 5 m/s.', 50, 2, { unit: ['j'], unitRequired: true, sample: '50 J', method: [{ any: ['1/2', '0.5', '25', '½'] }], explanation: 'KE = ½mv² = ½ × 4 × 25 = 50 J.' }),
      num('Energy', 'How much gravitational potential energy does a 10 kg box gain when it is lifted 3 m? (g = 10 m/s²)', 300, 2, { unit: ['j'], unitRequired: true, sample: '300 J', method: [{ any: ['10 x 10 x 3', '10 * 10 * 3', 'mgh'] }], explanation: 'GPE = mgh = 10 × 10 × 3 = 300 J.' }),
      num('Electricity', 'A potential difference of 9 V is applied across a 3 Ω resistor. Find the current.', 3, 2, { unit: ['a'], unitRequired: true, sample: '3 A', method: [{ any: ['9/3', '9 / 3', '9 ÷ 3', 'v/r', 'i = v/r'] }], explanation: 'I = V ÷ R = 9 ÷ 3 = 3 A.' }),
      num('Waves', 'A wave has frequency 50 Hz and wavelength 6 m. Find its speed.', 300, 2, { unit: ['m/s', 'ms-1'], method: [{ any: ['50 x 6', '50 * 6', '50×6', 'f x', 'fλ'] }], explanation: 'v = fλ = 50 × 6 = 300 m/s.' }),
      num('Pressure', 'A force of 800 N acts on an area of 0.4 m². Find the pressure.', 2000, 2, { unit: ['pa', 'n/m2'], method: [{ any: ['800/0.4', '800 / 0.4', '800 ÷ 0.4', 'f/a'] }], explanation: 'P = F ÷ A = 800 ÷ 0.4 = 2 000 Pa.' }),
      num('Electricity', 'Two resistors of 4 Ω and 6 Ω are connected in series. Find the total resistance.', 10, 1, { unit: ['ohm', 'ω'], explanation: 'In series, resistances add: 4 + 6 = 10 Ω.' }),
      num('Efficiency', 'A machine takes in 500 J of energy and does 350 J of useful work. Calculate its efficiency as a percentage.', 70, 2, { unit: ['%'], method: [{ any: ['350/500', '350 / 500', '350 ÷ 500'] }], explanation: 'Efficiency = (useful output ÷ input) × 100 = (350 ÷ 500) × 100 = 70%.' }),
      short('Forces', 'State Newton\'s third law of motion.', [{ any: ['equal and opposite', 'equal in size and opposite in direction', 'equal and opposite reaction'] }, { any: ['action', 'reaction', 'every force', 'two bodies', 'two objects', 'acts on a different'] }], 2, 'For every action there is an equal and opposite reaction (the two forces act on different objects).', 'Every action has an equal and opposite reaction'),
      short('Electricity', 'Give two reasons why household appliances are connected in parallel.', [{ any: ['same voltage', 'full voltage', 'each gets the full', 'same potential difference'] }, { any: ['independent', 'independently', 'switched off separately', 'switch off separately', 'one can be switched off', 'works if another is off', 'if one fails', 'still work'] }], 2, 'Each appliance gets the full mains voltage, and each can be switched on or off independently.', 'Each gets the full voltage and they can be switched off independently'),
      short('Magnetism', 'State two ways of making an electromagnet stronger.', [{ any: ['more turns', 'more coils', 'increase the number of turns', 'increase the number of coils', 'more loops', 'add more turns'] }, { any: ['more current', 'increase the current', 'larger current', 'higher current', 'bigger current'] }, { any: ['iron core', 'soft iron', 'add an iron core', 'iron nail'] }], 2, 'Increase the number of turns of wire, increase the current, or use a soft iron core.', 'Use more turns of wire and more current'),
      term('Energy', 'Name the form of energy stored in food.', ['chemical', 'chemical energy', 'chemical potential energy'], 1, 'Food stores chemical energy.')
    ]
  }
]);
