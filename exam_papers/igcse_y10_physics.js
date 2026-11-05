const { mcq, num, short, term, buildPaper } = require('./helpers');

module.exports = buildPaper({
  id: 'elingu_igcse_y10_physics_set1',
  curriculum: 'BRITISH',
  grade: 10,
  gradeRange: [10, 11],
  subject: 'Physics',
  scale: 'IGCSE',
  title: 'IGCSE Physics (Year 10) — Practice Paper 1',
  series: 'Elingu practice paper, Cambridge IGCSE style',
  durationMinutes: 60,
  calculatorAllowed: true,
  instructions: 'Answer all questions. Section A: choose one answer. Section B: type your answer with its unit; for 2-mark questions type your working too, because you can earn method marks. Take g = 10 N/kg.'
}, [
  {
    title: 'Section A — Multiple choice',
    instructions: 'Each question is worth 1 mark.',
    questions: [
      mcq('Motion', 'Which of these is a vector quantity?', ['Speed', 'Mass', 'Velocity', 'Energy'], 'C', 'A vector has size and direction. Velocity is speed in a stated direction.'),
      mcq('Energy and power', 'What is the SI unit of power?', ['Joule', 'Watt', 'Newton', 'Pascal'], 'B', 'Power is measured in watts (1 W = 1 J/s).'),
      mcq('Energy resources', 'Which of these energy resources is renewable?', ['Coal', 'Natural gas', 'Geothermal', 'Oil'], 'C', 'Geothermal energy comes from heat inside the Earth, which is not used up.'),
      mcq('Waves', 'Sound waves are…', ['transverse waves', 'electromagnetic waves', 'longitudinal waves', 'able to travel through a vacuum'], 'C', 'Sound is a longitudinal wave and needs a medium to travel through.'),
      mcq('Electromagnetic spectrum', 'Which electromagnetic wave has the shortest wavelength?', ['Radio waves', 'Visible light', 'Gamma rays', 'Infrared'], 'C', 'Gamma rays have the shortest wavelength and highest frequency.'),
      mcq('Electricity', 'Which instrument is used to measure electric current?', ['Voltmeter', 'Ammeter', 'Thermometer', 'Barometer'], 'B', 'An ammeter is connected in series to measure current.'),
      mcq('Refraction', 'A ray of light travels from air into glass. It…', ['bends towards the normal', 'bends away from the normal', 'does not change direction', 'is totally reflected'], 'A', 'Light slows down in glass, so it bends towards the normal.'),
      mcq('Thermal physics', 'Which method of heat transfer can happen through a vacuum?', ['Conduction', 'Convection', 'Evaporation', 'Radiation'], 'D', 'Conduction and convection need particles. Radiation does not.'),
      mcq('Atoms', 'A neutral atom has…', ['equal numbers of protons and electrons', 'more protons than electrons', 'more electrons than protons', 'no neutrons'], 'A', 'Positive protons and negative electrons cancel out when their numbers are equal.'),
      mcq('Electricity', 'The resistance of a wire increases when its…', ['length increases', 'cross-sectional area increases', 'temperature falls to zero', 'voltage decreases'], 'A', 'A longer wire has more resistance. A thicker wire has less.'),
      mcq('Energy', 'Which type of energy is stored in a stretched spring?', ['Kinetic', 'Elastic potential', 'Thermal', 'Chemical'], 'B', 'A stretched spring stores elastic potential energy.'),
      mcq('Circuits', 'In a series circuit, the current is…', ['the same everywhere in the circuit', 'largest near the battery', 'shared between the branches', 'zero in the wires'], 'A', 'There is only one path, so the same current flows through every component.'),
      mcq('Electromagnetism', 'A transformer will only work with…', ['direct current', 'both direct and alternating current', 'alternating current', 'neither'], 'C', 'A changing current is needed to make a changing magnetic field.'),
      mcq('Forces', 'The moment of a force about a pivot is…', ['force ÷ distance', 'force × perpendicular distance from the pivot', 'mass × speed', 'force + distance'], 'B', 'Moment = force × perpendicular distance from the pivot (N m).'),
      mcq('Pressure', 'One pascal is the same as…', ['1 N/kg', '1 J/s', '1 N m', '1 N/m²'], 'D', 'Pressure = force ÷ area, so 1 Pa = 1 N/m².')
    ]
  },
  {
    title: 'Section B — Calculations and short answers',
    instructions: 'Type your answer with its unit. Show working for 2-mark questions.',
    questions: [
      num('Forces', 'Find the weight of a 5 kg mass. (g = 10 N/kg)', 50, 2, { unit: ['n'], unitRequired: true, sample: '50 N', method: [{ any: ['5 x 10', '5 * 10', '5×10', 'w = mg', 'mg'] }], explanation: 'Weight = mass × g = 5 × 10 = 50 N.' }),
      num('Motion', 'A runner covers 150 m in 12 s. Calculate the average speed.', 12.5, 2, { unit: ['m/s', 'ms-1', 'metres per second'], method: [{ any: ['150/12', '150 / 12', '150 ÷ 12', 'distance/time', 'distance ÷ time'] }], explanation: 'Speed = distance ÷ time = 150 ÷ 12 = 12.5 m/s.' }),
      num('Motion', 'A car accelerates from rest to 20 m/s in 5 s. Calculate its acceleration.', 4, 2, { unit: ['m/s2', 'ms-2', 'm/s^2'], method: [{ any: ['20/5', '20 / 5', '20 ÷ 5', '(20-0)/5'] }], explanation: 'Acceleration = change in speed ÷ time = 20 ÷ 5 = 4 m/s².' }),
      num('Forces', 'A resultant force of 12 N acts on a mass of 3 kg. Calculate the acceleration.', 4, 2, { unit: ['m/s2', 'ms-2', 'm/s^2'], method: [{ any: ['12/3', '12 / 3', '12 ÷ 3', 'f = ma', 'a = f/m'] }], explanation: 'a = F ÷ m = 12 ÷ 3 = 4 m/s².' }),
      num('Work and energy', 'A force of 40 N moves an object 6 m in the direction of the force. Calculate the work done.', 240, 2, { unit: ['j'], unitRequired: true, sample: '240 J', method: [{ any: ['40 x 6', '40 * 6', '40×6', 'f x d', 'force x distance'] }], explanation: 'Work = force × distance = 40 × 6 = 240 J.' }),
      num('Power', 'The work in the last question is done in 8 s. Calculate the power.', 30, 2, { unit: ['w'], unitRequired: true, sample: '30 W', method: [{ any: ['240/8', '240 / 8', '240 ÷ 8', 'work/time'] }], explanation: 'Power = work ÷ time = 240 ÷ 8 = 30 W.' }),
      num('Density', 'A metal block has a mass of 540 g and a volume of 200 cm³. Calculate its density in g/cm³.', 2.7, 2, { unit: ['g/cm3', 'g/cm^3', 'gcm-3'], method: [{ any: ['540/200', '540 / 200', '540 ÷ 200', 'mass/volume'] }], explanation: 'Density = mass ÷ volume = 540 ÷ 200 = 2.7 g/cm³.' }),
      num('Electricity', 'A resistor of 4 Ω has a potential difference of 12 V across it. Calculate the current.', 3, 2, { unit: ['a'], unitRequired: true, sample: '3 A', method: [{ any: ['12/4', '12 / 4', '12 ÷ 4', 'v/r', 'i = v/r'] }], explanation: 'I = V ÷ R = 12 ÷ 4 = 3 A.' }),
      num('Pressure', 'A force of 600 N acts on an area of 0.5 m². Calculate the pressure.', 1200, 2, { unit: ['pa', 'n/m2', 'n/m^2'], method: [{ any: ['600/0.5', '600 / 0.5', '600 ÷ 0.5', 'f/a', 'force/area'] }], explanation: 'Pressure = force ÷ area = 600 ÷ 0.5 = 1200 Pa.' }),
      term('Heat transfer', 'Name the method of heat transfer that takes place when you hold a hot cup.', ['conduction'], 1, 'Heat passes from the hot cup into your hands by conduction (direct contact).'),
      short('Heat transfer', 'Explain why a metal spoon in hot tea quickly becomes hot at the other end.',
        [{ any: ['conduct', 'conductor', 'conducts', 'conduction'] }, { any: ['heat', 'thermal', 'energy', 'free electrons', 'particles'] }],
        2, 'Metals are good conductors of heat. Heat energy is passed along the spoon by free electrons and vibrating particles.', 'Metal is a good conductor so heat energy passes along it')
    ]
  }
]);
