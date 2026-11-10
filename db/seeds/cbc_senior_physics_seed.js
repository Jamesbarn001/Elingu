// ══════════════════════════════════════════════════════════════
// CBC SENIOR SCHOOL PHYSICS, GRADES 11 AND 12
// Strands and sub-strands follow the KICD curriculum design notes
// (Grade 11 Oct 2025, Grade 12 Mar 2026).
//
// Not an official KICD publication; the
// primers are written by Elingu and need a subject teacher's check.
// Station `icon` is omitted on purpose (plain text only).
// ══════════════════════════════════════════════════════════════

function stop(id, title, primerTitle, tagline, body, formula, visualBadge, realWorldContext, socraticPrompt, examFocus, steps, workedExample) {
  return {
    id,
    title,
    status: 'available',
    conceptPrimer: {
      title: primerTitle,
      tagline,
      body,
      formula: formula || null,
      visualBadge,
      realWorldContext,
      explanationSteps: steps,
      workedExample
    },
    socraticPrompt,
    formulaBadge: formula || null,
    examFocus
  };
}

// Object-style wrapper so each primer field is named at the call site.
function P(id, title, o) {
  return stop(
    id, title, o.pt, o.tag, o.body, o.f || null, o.vis, o.ctx, o.q, o.exam,
    o.steps.map((s, i) => `Step ${i + 1}: ${s}`),
    o.ex
  );
}

const DRAFT = 'Draft for teacher review.';

// ───────────────────────── GRADE 11 ─────────────────────────
const G11 = {
  curriculum: 'CBC',
  grade: 11,
  subject: 'Physics',
  code: 'PHY-G11',
  trackPathway: 'STEM',
  title: 'CBE Grade 11 (Senior STEM) Physics Metro Line',
  description: `Grade 11 Physics with four strands and thirteen sub-strands, following the KICD curriculum design of October 2025.`,
  notes: `Strand and sub-strand names follow the KICD Grade 11 design.`,
  stations: [
    {
      id: 'cbc_g11_phy_s1',
      number: 1,
      title: '1.0 Mechanics and Thermal Physics',
      strand: 'Strand 1.0: Mechanics and Thermal Physics',
      status: 'available',
      summary: 'Fluid flow, linear motion, projectile motion, dimensional analysis and heat transmission.',
      subtopics: [
        P('cbc_g11_phy_s1_1', '1.1 Fluid flow', {
          pt: 'Continuity and Bernoulli: Speed and Pressure in Moving Fluids',
          tag: 'Where a pipe narrows, the fluid speeds up and its pressure drops',
          body: 'A fluid is a liquid or a gas, a substance that flows. Volume flow rate is the volume of fluid passing a point each second. An ideal fluid is one that cannot be squashed and has no internal friction, and in steady flow its volume flow rate is the same everywhere along a pipe. Because the same volume must squeeze through a smaller cross-sectional area A, the speed v must rise: A x v stays constant (the equation of continuity). Bernoulli\'s principle says that along a streamline in a horizontal pipe, where the speed is higher the pressure is lower, because the fluid needs a bigger push from behind than in front to speed up.',
          f: 'A1 v1 = A2 v2  |  Q = A v  |  P + 1/2 rho v^2 = constant (horizontal flow)',
          vis: 'Pipe narrowing, with streamlines bunching together',
          ctx: 'A garden hose with your thumb over the end sprays further: same water per second, smaller opening, higher speed. Water pipes along a Nairobi street change diameter, and the same ideas apply.',
          q: 'You block half of a hose opening with your thumb. What must happen to the speed of the water leaving, and what do you notice about how far it sprays?',
          exam: 'Continuity and Bernoulli calculations for pipes of changing cross-section; explaining the working of a spray gun or a paint sprayer.',
          steps: [
            'Write the cross-sectional area at each point in m^2, because the equation needs consistent units (1 cm^2 = 0.0001 m^2).',
            'Apply A1 v1 = A2 v2 to find the new speed, because the same volume per second must pass every section.',
            'Calculate the volume flow rate Q = A v, because it tells you how much fluid is delivered per second.',
            'For the pressure change use P1 - P2 = 1/2 rho (v2^2 - v1^2), because the extra kinetic energy per unit volume comes from the drop in pressure.'
          ],
          ex: 'Water (density 1000 kg/m^3) flows at 2.0 m/s through a horizontal pipe of cross-section 4.0 cm^2 into a section of 1.0 cm^2. Speed in the narrow part: v2 = A1 v1 / A2 = (4.0 x 2.0) / 1.0 = 8.0 m/s. Flow rate: Q = 4.0e-4 m^2 x 2.0 m/s = 8.0e-4 m^3/s = 0.80 litres per second. Pressure drop: P1 - P2 = 1/2 x 1000 x (8.0^2 - 2.0^2) = 500 x 60 = 30 000 Pa = 30 kPa. Common mistake: using cm^2 in one place and m^2 in another, or thinking faster flow means higher pressure.'
        }),
        P('cbc_g11_phy_s1_2', '1.2 Linear motion', {
          pt: 'Equations of Uniformly Accelerated Motion',
          tag: 'Three equations link displacement, velocity, acceleration and time',
          body: 'Displacement s is the distance moved in a stated direction. Velocity v is displacement per unit time, and acceleration a is the rate at which velocity changes (m/s^2). When acceleration is constant, five quantities describe the motion: initial velocity u, final velocity v, acceleration a, time t and displacement s. Three equations connect them, and you choose the one that does not contain the quantity you are not asked about. A negative acceleration means slowing down (deceleration) when moving in the positive direction. Near Earth\'s surface a falling body, ignoring air, accelerates at g, about 10 m/s^2 in this course.',
          f: 'v = u + at  |  s = ut + 1/2 at^2  |  v^2 = u^2 + 2as',
          vis: 'Velocity-time graph with shaded area',
          ctx: 'Braking distance of a matatu on the Thika Superhighway: the faster it travels, the much longer it needs to stop.',
          q: 'If a matatu doubles its speed from 20 m/s to 40 m/s and brakes equally hard, by what factor does its braking distance grow, and why is it not just two?',
          exam: 'Choosing the correct equation from given and required quantities; reading acceleration and distance from velocity-time graphs.',
          steps: [
            'List u, v, a, t, s, marking which are given, which is required, and which are absent, because the absent one decides the equation.',
            'Convert all to SI units (km/h to m/s: divide by 3.6), because the equations assume metres and seconds.',
            'Choose the equation without the absent quantity and substitute with signs, because direction matters.',
            'Solve and check the answer is sensible and the units are right.'
          ],
          ex: 'A matatu travelling at 20 m/s brakes with constant deceleration 5.0 m/s^2 until it stops. Given u = 20, v = 0, a = -5.0; time is not asked, so use v^2 = u^2 + 2as: 0 = 400 + 2(-5.0)s, so s = 400/10 = 40 m. Time from v = u + at: 0 = 20 - 5.0t, so t = 4.0 s. Doubling the speed to 40 m/s gives s = 1600/10 = 160 m, four times as far, because s depends on v^2. Common mistake: forgetting that deceleration is negative, which gives an impossible negative distance.'
        }),
        P('cbc_g11_phy_s1_3', '1.3 Projectile motion', {
          pt: 'Independent Horizontal and Vertical Motion',
          tag: 'A projectile moves at constant velocity sideways while gravity acts downwards',
          body: 'A projectile is an object thrown or launched that moves under gravity alone, ignoring air resistance. The key idea is that horizontal and vertical motions are independent. Horizontally there is no force, so the velocity stays constant. Vertically the acceleration is g downwards. For a launch speed u at angle theta above the horizontal, the horizontal component is u cos(theta) and the vertical component is u sin(theta). The time of flight to return to launch height is 2u sin(theta)/g, and the range is the horizontal speed multiplied by that time.',
          f: 'T = 2u sin(theta)/g  |  H = u^2 sin^2(theta)/2g  |  R = u^2 sin(2 theta)/g',
          vis: 'Parabolic path with velocity components',
          ctx: 'A football kicked by a player at a school match, or water leaving a hose at an angle: the path is a parabola.',
          q: 'At the very top of its path, what is the ball\'s vertical velocity, and is its acceleration also zero there?',
          exam: 'Calculating time of flight, maximum height and range; finding the angle for maximum range (45 degrees on level ground).',
          steps: [
            'Resolve the launch velocity into horizontal u cos(theta) and vertical u sin(theta), because the two motions are analysed separately.',
            'Find the time of flight from the vertical motion, using v = u + at with the vertical velocity reversing sign, because the ball returns to the same height.',
            'Multiply the constant horizontal speed by the time to get the range, because there is no horizontal acceleration.',
            'Find maximum height using v^2 = u^2 + 2as in the vertical direction with v = 0 at the top.'
          ],
          ex: 'A ball is kicked at 20 m/s at 30 degrees above level ground (g = 10 m/s^2). Horizontal component: 20 cos 30 = 17.3 m/s. Vertical component: 20 sin 30 = 10 m/s. Time of flight: 2 x 10 / 10 = 2.0 s. Range: 17.3 x 2.0 = 34.6 m. Maximum height: 10^2 / (2 x 10) = 5.0 m. Check with R = u^2 sin 60 / g = 400 x 0.866 / 10 = 34.6 m. Common mistake: believing gravity makes the horizontal speed fall, or that acceleration is zero at the top.'
        }),
        P('cbc_g11_phy_s1_4', '1.4 Dimensional analysis', {
          pt: 'Checking Equations Using Dimensions',
          tag: 'Both sides of a true equation must have the same dimensions',
          body: 'A dimension is the kind of quantity something is, written with symbols M for mass, L for length and T for time, regardless of the unit used. Velocity has dimensions L T^-1, acceleration L T^-2 and force M L T^-2 (since force is mass times acceleration). In any correct physical equation every term must have the same dimensions, and you can only add or subtract quantities of the same dimension. Dimensional analysis therefore checks whether an equation could be right, and can suggest the form of a relation, but it cannot find dimensionless numbers such as 1/2 or 2 pi.',
          f: '[v] = L T^-1  |  [a] = L T^-2  |  [F] = M L T^-2  |  [energy] = M L^2 T^-2',
          vis: 'Table of quantities and their dimensions',
          ctx: 'A student checks a formula from memory before an exam; if the dimensions disagree, the formula is certainly wrong.',
          q: 'Could the equation s = ut + a t be correct? What would you compare on each side?',
          exam: 'Testing whether a given equation is dimensionally consistent; deriving the form of a relation such as the period of a pendulum.',
          steps: [
            'Write the dimensions of every symbol in M, L, T, because dimensions ignore units like km or hours.',
            'Replace each symbol in the equation by its dimensions, because only then can the two sides be compared.',
            'Compare the sides; if they differ the equation is wrong, and if they match it is only possibly right.',
            'To derive a relation, write T = k l^a g^b, equate powers of each dimension and solve, because the powers must balance.'
          ],
          ex: 'Derive the period T of a simple pendulum of length l in gravity g, assuming T = k l^a g^b. Dimensions: [T] = T, [l] = L, [g] = L T^-2. Right side: L^a x L^b T^-2b = L^(a+b) T^(-2b). Equate powers of T: 1 = -2b, so b = -1/2. Powers of L: 0 = a + b, so a = +1/2. So T = k sqrt(l/g). Dimensional analysis cannot give k; experiment shows k = 2 pi. Common mistake: concluding an equation is correct just because the dimensions match, or putting numbers like 1/2 into the dimension check.'
        }),
        P('cbc_g11_phy_s1_5', '1.5 Heat transmission', {
          pt: 'Conduction, Convection and Radiation',
          tag: 'Heat flows from hot to cold by three routes',
          body: 'Heat is energy that moves because of a temperature difference. In conduction, particles pass vibration energy and free electrons carry energy through a solid, and it needs no movement of the material (metals conduct well, wood and air poorly). In convection, a heated fluid expands, becomes less dense, rises and is replaced by cooler fluid, setting up a current. In radiation, hot objects emit infrared waves that travel through empty space with no material needed. For conduction through a slab, the rate of heat flow is proportional to the area A and the temperature difference, and inversely proportional to the thickness L, with a material constant k called thermal conductivity.',
          f: 'Q/t = k A (theta1 - theta2) / L',
          vis: 'Slab with hot and cold faces, and convection loop',
          ctx: 'A charcoal jiko and a metal sufuria heat food by conduction, a hot room warms by convection, and you feel the sun through radiation. Iron-sheet roofs get very hot, yet a ceiling slows the heat going in.',
          q: 'Why does a metal spoon in hot tea feel hotter than a wooden one at the same temperature?',
          exam: 'Explaining which transmission method is at work; conduction rate calculation; design of insulated containers such as a vacuum flask.',
          steps: [
            'Identify the method, solid contact (conduction), moving fluid (convection) or across a vacuum (radiation), because each has its own rule.',
            'For conduction, collect k, area, thickness in metres and temperature difference, because unit mistakes cause most errors.',
            'Substitute into Q/t = kA(delta theta)/L, because the rate depends on all four.',
            'State the result as a power in watts (joules per second), and comment on how insulation (thicker L, smaller k) changes it.'
          ],
          ex: 'A concrete wall of area 10 m^2 and thickness 0.20 m has conductivity 0.8 W/(m K). Inside is 25 degrees Celsius and outside is 10 degrees Celsius, a difference of 15 K. Rate of heat flow = 0.8 x 10 x 15 / 0.20 = 120 / 0.20 = 600 W. Doubling the thickness to 0.40 m halves this to 300 W. Common mistake: using the thickness in cm, or using the temperatures themselves instead of the difference.'
        })
      ]
    },
    {
      id: 'cbc_g11_phy_s2',
      number: 2,
      title: '2.0 Waves and Optics',
      strand: 'Strand 2.0: Waves and Optics',
      status: 'available',
      summary: 'Refraction of light, electromagnetic waves, and thermionic emission with its applications.',
      subtopics: [
        P('cbc_g11_phy_s2_1', '2.1 Refraction of light', {
          pt: 'Snell\'s Law, Refractive Index and Total Internal Reflection',
          tag: 'Light bends because its speed changes between materials',
          body: 'Refraction is the bending of light as it passes from one transparent material into another, because its speed changes. The refractive index n of a material is the speed of light in air divided by its speed in the material, so a bigger n means slower light. Snell\'s law states that sin i / sin r = n for light entering the material from air, where i is the angle of incidence and r the angle of refraction, both measured from the normal, the imaginary line at right angles to the surface. When light goes from a dense to a less dense material at more than the critical angle c, where sin c = 1/n, it is totally reflected inside.',
          f: 'n = sin i / sin r  |  n = c(air) / v(material)  |  sin c = 1/n',
          vis: 'Ray bending toward normal in glass',
          ctx: 'Optical fibre cables carrying internet use total internal reflection; a pencil looks bent in a glass of water; a swimming pool looks shallower than it is.',
          q: 'When light enters glass from air, does it bend toward or away from the normal, and what does that tell you about its speed in glass?',
          exam: 'Using Snell\'s law, real and apparent depth, critical angle and total internal reflection in prisms and fibres.',
          steps: [
            'Draw the normal and measure both angles from it, not from the surface, because Snell\'s law uses angles to the normal.',
            'Apply n = sin i / sin r, with i in the air and r in the material, because n is defined that way.',
            'Use the inverse sine to find the unknown angle, with a calculator in degree mode.',
            'For total internal reflection find c from sin c = 1/n and compare the incident angle with it.'
          ],
          ex: 'Light enters glass of refractive index 1.5 from air at an incident angle of 45 degrees. sin r = sin 45 / 1.5 = 0.7071 / 1.5 = 0.4714, so r = 28.1 degrees. The critical angle of the glass: sin c = 1/1.5 = 0.667, so c = 41.8 degrees. A ray inside the glass hitting the surface at 45 degrees (more than 41.8) is totally reflected. Common mistake: measuring angles from the surface instead of the normal.'
        }),
        P('cbc_g11_phy_s2_2', '2.2 Electromagnetic waves', {
          pt: 'The Electromagnetic Spectrum',
          tag: 'All electromagnetic waves travel at the speed of light, c = f lambda',
          body: 'Electromagnetic waves are waves of changing electric and magnetic fields that travel through empty space at c = 3.0 x 10^8 m/s, with no medium needed. They are transverse, which means the oscillations are at right angles to the direction of travel. Frequency f is the number of waves passing per second (hertz) and wavelength lambda is the distance between successive crests. They are related by c = f lambda. In order of increasing frequency the spectrum runs radio, microwave, infrared, visible light, ultraviolet, X-rays and gamma rays; higher frequency means more energy per photon.',
          f: 'c = f lambda  |  c = 3.0 x 10^8 m/s',
          vis: 'Spectrum bar from radio to gamma',
          ctx: 'FM radio and mobile phone signals are radio waves and microwaves, remote controls use infrared, and X-ray machines in hospitals use X-rays.',
          q: 'Radio waves and gamma rays are both electromagnetic. What do they share, and what is different about them?',
          exam: 'Listing the order and uses of the spectrum; calculating wavelength or frequency; safety of ultraviolet, X-rays and gamma rays.',
          steps: [
            'Convert frequency to hertz (1 MHz = 10^6 Hz), because c is in metres per second.',
            'Use lambda = c / f, because the speed is the same for all electromagnetic waves in a vacuum.',
            'Place the result on the spectrum by size of wavelength, to decide the type of wave.',
            'State a use and a hazard, because high-frequency waves can damage living cells.'
          ],
          ex: 'An FM radio station broadcasts at 100 MHz = 1.0 x 10^8 Hz. Wavelength = 3.0 x 10^8 / 1.0 x 10^8 = 3.0 m (radio waves). For green light of wavelength 500 nm = 5.0 x 10^-7 m, frequency = 3.0 x 10^8 / 5.0 x 10^-7 = 6.0 x 10^14 Hz. Common mistake: thinking radio waves are sound waves, or that gamma rays travel faster than radio waves.'
        }),
        P('cbc_g11_phy_s2_3', '2.3 Thermionic emission and its applications', {
          pt: 'Electrons Boiled Off a Hot Metal',
          tag: 'A hot cathode emits electrons, which an electric field can accelerate into a beam',
          body: 'Thermionic emission is the release of electrons from the surface of a metal heated to a high temperature. Metals contain free electrons, and heating gives some enough energy to escape the surface. The heated electrode that emits them is the cathode and the positive electrode that attracts them is the anode. In a vacuum the electrons are not blocked by air. An electron of charge e moving through a potential difference V gains kinetic energy eV, so its speed can be calculated. This is the principle of the cathode ray tube, the cathode ray oscilloscope and the X-ray tube.',
          f: '1/2 m v^2 = e V  |  e = 1.6 x 10^-19 C  |  m = 9.11 x 10^-31 kg',
          vis: 'Electron gun with heated cathode and anode',
          ctx: 'Old television tubes, the oscilloscope used in a school or repair workshop, and the X-ray tubes in hospital imaging all use this effect.',
          q: 'Why must the tube be evacuated, and why must the cathode be heated before any beam appears?',
          exam: 'Explaining the electron gun, calculating electron speed, and the working of a CRO and X-ray tube.',
          steps: [
            'Identify the accelerating voltage V, because that sets the energy gained.',
            'Equate the work done eV to the kinetic energy 1/2 m v^2, because energy is conserved.',
            'Rearrange for v = sqrt(2 e V / m) and substitute in SI units.',
            'Check the answer is below the speed of light, which it must be here.'
          ],
          ex: 'Electrons are accelerated through 2000 V. Energy gained = eV = 1.6 x 10^-19 x 2000 = 3.2 x 10^-16 J. v = sqrt(2 x 3.2 x 10^-16 / 9.11 x 10^-31) = sqrt(7.03 x 10^14) = 2.65 x 10^7 m/s, about 9 percent of the speed of light. Common mistake: believing the voltage frees the electrons from the cold cathode; it is the heat that frees them, and the voltage only accelerates them.'
        })
      ]
    },
    {
      id: 'cbc_g11_phy_s3',
      number: 3,
      title: '3.0 Electricity and Magnetism',
      strand: 'Strand 3.0: Electricity and Magnetism',
      status: 'available',
      summary: 'Capacitors, the magnetic effect of electric current, and diodes.',
      subtopics: [
        P('cbc_g11_phy_s3_1', '3.1 Capacitors', {
          pt: 'Storing Charge and Energy',
          tag: 'A capacitor stores charge on two plates separated by an insulator',
          body: 'A capacitor is two conducting plates separated by an insulator (dielectric). When connected to a battery, charge Q builds up on the plates and the potential difference V across them rises until it matches the battery. Capacitance C is the charge stored per volt, measured in farads (F). In practice values are in microfarads (1 microfarad = 10^-6 F). A capacitor stores energy in its electric field. Capacitors in parallel add, but in series the reciprocals add, so the total is less than the smallest.',
          f: 'C = Q / V  |  E = 1/2 C V^2  |  parallel: C = C1 + C2  |  series: 1/C = 1/C1 + 1/C2',
          vis: 'Two plates with charge and field lines',
          ctx: 'Capacitors smooth the supply in a phone charger, store energy for a camera flash and are used in the tuning circuit of a radio.',
          q: 'If you double the voltage across a capacitor, what happens to the charge stored, and what happens to the energy?',
          exam: 'Calculating charge, energy and combined capacitance; charging and discharging curves.',
          steps: [
            'Convert microfarads to farads, because the formulas use SI units.',
            'Use Q = CV to find the charge, because capacitance is charge per volt.',
            'Use E = 1/2 C V^2 for stored energy, since the energy is not simply QV (the voltage rises as charge builds).',
            'For combinations use the parallel or series rule as drawn in the circuit.'
          ],
          ex: 'A 100 microfarad capacitor is charged to 12 V. Q = CV = 100 x 10^-6 x 12 = 1.2 x 10^-3 C. Energy = 1/2 x 100 x 10^-6 x 12^2 = 0.5 x 10^-4 x 144 = 7.2 x 10^-3 J. Series check: 6 microfarad and 3 microfarad in series give 1/C = 1/6 + 1/3 = 1/2, so C = 2 microfarad; in parallel they give 9 microfarad. Common mistake: using E = QV, which gives double the correct energy.'
        }),
        P('cbc_g11_phy_s3_2', '3.2 Magnetic effect of electric current', {
          pt: 'Fields Around Currents and Forces on Conductors',
          tag: 'A current-carrying wire makes a magnetic field and feels a force in one',
          body: 'A magnetic field is the region around a magnet or a current where a magnetic force acts; its strength is the flux density B in tesla (T). A current in a straight wire makes circular field lines around it, and the direction is given by the right-hand grip rule: thumb along the current, fingers curl in the field direction. A coil (solenoid) gives a strong, nearly uniform field inside. A wire of length L carrying current I at right angles to a field B feels a force F = BIL, and its direction is given by Fleming\'s left-hand rule, with thumb for force, first finger for field and second finger for current. This force turns an electric motor, and an electric bell is based on an electromagnet.',
          f: 'F = B I L  |  Fleming\'s left-hand rule  |  right-hand grip rule',
          vis: 'Wire in a field with force arrow',
          ctx: 'Electromagnets lift scrap metal in yards, door bells use a solenoid, and DC motors in toys, fans and pumps turn because of this force.',
          q: 'If you reverse the current in a wire sitting in a magnetic field, what happens to the direction of the force on it?',
          exam: 'Field patterns for straight wire and solenoid; calculating force on a conductor; operation of a motor and a loudspeaker.',
          steps: [
            'Sketch the field direction with the right-hand grip rule, because it fixes the north and south ends of a coil.',
            'Check the wire is at right angles to the field, because otherwise only the perpendicular part counts.',
            'Calculate F = BIL in SI units.',
            'Apply Fleming\'s left-hand rule to give the direction, because the magnitude alone is not a complete answer.'
          ],
          ex: 'A wire 0.30 m long carries 5.0 A at right angles to a uniform field of 0.20 T. F = BIL = 0.20 x 5.0 x 0.30 = 0.30 N. Reversing the current reverses the direction of the force but not its size. Doubling the length to 0.60 m doubles the force to 0.60 N. Common mistake: using the right hand for the force rule, or taking the force to be along the field instead of at right angles to both field and current.'
        }),
        P('cbc_g11_phy_s3_3', '3.3 Diodes', {
          pt: 'One-Way Current and Rectification',
          tag: 'A diode lets current through in one direction only',
          body: 'A diode is a two-terminal semiconductor device made from a p-n junction, where p-type material has spare positive holes and n-type material has spare electrons. When the p side is connected to the positive terminal (forward bias) current flows once about 0.7 V is exceeded for a silicon diode; reversed (reverse bias) almost no current flows. Because of this, a diode can rectify alternating current, which reverses direction, into current in one direction only. A half-wave rectifier uses one diode and passes only half of each cycle. A capacitor connected across the output smooths the pulses.',
          f: 'I = (V supply - V diode) / R  (silicon: V diode about 0.7 V)',
          vis: 'Diode symbol with forward and reverse current',
          ctx: 'Phone chargers and solar lanterns use diodes; a diode in a solar panel circuit stops the battery discharging back through the panel at night.',
          q: 'The arrow of the diode symbol points one way. Does it show the direction conventional current can flow, or the direction it is blocked?',
          exam: 'Forward and reverse bias; current in a circuit with a diode; half-wave rectification waveforms.',
          steps: [
            'Decide whether the diode is forward or reverse biased from the battery polarity, because only forward bias conducts.',
            'If it is forward biased subtract about 0.7 V from the supply, because that is dropped across the diode.',
            'Use Ohm\'s law with the remaining voltage across the resistor.',
            'If reversed, state the current is approximately zero.'
          ],
          ex: 'A silicon diode is forward biased in series with a 120 ohm resistor and a 6.0 V supply. Voltage across the resistor = 6.0 - 0.7 = 5.3 V. Current = 5.3 / 120 = 0.044 A = 44 mA. If the supply is reversed, the current is approximately zero. Common mistake: using the full 6.0 V across the resistor, or forgetting that the diode blocks current when reversed.'
        })
      ]
    },
    {
      id: 'cbc_g11_phy_s4',
      number: 4,
      title: '4.0 Environmental and Space Physics',
      strand: 'Strand 4.0: Environmental and Space Physics',
      status: 'available',
      summary: 'Physics of wind formation and an introduction to rockets.',
      subtopics: [
        P('cbc_g11_phy_s4_1', '4.1 Physics of wind formation', {
          pt: 'Uneven Heating, Pressure Differences and Wind Power',
          tag: 'Wind is air moving from high pressure to low pressure',
          body: 'The Sun heats different surfaces unequally. Warm air expands, becomes less dense and rises, which lowers the pressure at the ground; cooler air nearby is denser and flows in to replace it. This horizontal flow of air from high to low pressure is wind. During the day land heats faster than water, so a sea or lake breeze blows inland; at night the land cools faster and the breeze reverses. A wind turbine turns the kinetic energy of the moving air into electrical energy. The power in wind passing through a rotor of area A at speed v in air of density rho is half rho A v cubed, so doubling the speed gives eight times the power.',
          f: 'P = 1/2 rho A v^3  |  A = pi r^2',
          vis: 'Land breeze and sea breeze cross-sections',
          ctx: 'Wind turbines stand on the Ngong Hills near Nairobi, and the Lake Turkana wind farm in northern Kenya takes advantage of strong steady winds in that region.',
          q: 'Why does a breeze often blow from the lake toward the land in the afternoon, and which way does it blow at night?',
          exam: 'Explaining land and sea breezes; wind power calculations; advantages and limits of wind energy.',
          steps: [
            'Calculate the swept area A = pi r^2 of the blades, because the power depends on how much air passes through.',
            'Take air density as about 1.2 kg/m^3 at ground level, because it is the mass per volume of the moving air.',
            'Substitute into P = 1/2 rho A v^3 using speed in m/s.',
            'Remember a real turbine extracts only a fraction of this, because the air must keep moving after the blades.'
          ],
          ex: 'A turbine has blades of length 40 m, so r = 40 m and A = 3.14 x 40^2 = 5027 m^2. Wind speed 10 m/s, air density 1.2 kg/m^3. P = 0.5 x 1.2 x 5027 x 10^3 = 3.0 x 10^6 W = 3.0 MW of wind power through the rotor. At 20 m/s the power is eight times as large. Common mistake: thinking power is proportional to speed instead of speed cubed, or that a turbine can capture all of the wind power.'
        }),
        P('cbc_g11_phy_s4_2', '4.2 Introduction to rockets', {
          pt: 'Thrust from Throwing Mass Backwards',
          tag: 'A rocket pushes exhaust gas backwards, and the gas pushes the rocket forwards',
          body: 'A rocket works by Newton\'s third law: when the engine throws hot gas backwards at high speed, the gas pushes the rocket forward with an equal and opposite force. It works in space because it needs no air to push against. Thrust is that forward force. If the engine ejects fuel mass m each second at exhaust speed v, then thrust = m x v (the momentum given to the gas each second). To lift off, the thrust must be greater than the rocket\'s weight W = mg, and the net force gives acceleration. As fuel burns, the mass falls, so the same thrust gives increasing acceleration. A launch site near the equator gains from Earth\'s spin, because the surface moves fastest there.',
          f: 'Thrust F = (mass ejected per second) x v(exhaust)  |  a = (F - mg) / m',
          vis: 'Rocket with exhaust and force arrows',
          ctx: 'Rockets are launched from sites near the equator because Earth\'s surface moves fastest there, giving the rocket a free eastward speed.',
          q: 'In space there is nothing to push against, so what does the rocket push on?',
          exam: 'Applying Newton\'s third law and conservation of momentum to rockets; calculating thrust and initial acceleration.',
          steps: [
            'Find the thrust F = (mass of fuel burnt per second) x (exhaust speed), because it is the momentum given to the gas each second.',
            'Find the weight of the rocket = m g, because gravity pulls against the thrust.',
            'Find the net force F - W and divide by the mass, because Newton\'s second law gives the acceleration.',
            'Check that F is greater than W, or the rocket will not lift off.'
          ],
          ex: 'A rocket of mass 5000 kg burns fuel at 50 kg/s with exhaust speed 2000 m/s (g = 10 m/s^2). Thrust = 50 x 2000 = 100 000 N. Weight = 5000 x 10 = 50 000 N. Net force = 50 000 N. Acceleration = 50 000 / 5000 = 10 m/s^2 upward. Common mistake: believing the exhaust pushes against the ground or the air, and ignoring the weight when finding the acceleration.'
        })
      ]
    }
  ]
};

// ───────────────────────── GRADE 12 ─────────────────────────
const G12 = {
  curriculum: 'CBC',
  grade: 12,
  subject: 'Physics',
  code: 'PHY-G12',
  trackPathway: 'STEM',
  title: 'CBE Grade 12 (Senior STEM) Physics Metro Line',
  description: `Grade 12 Physics with four strands and ten sub-strands, following the KICD curriculum design of March 2026.`,
  notes: `Strand and sub-strand names follow the KICD Grade 12 design.`,
  stations: [
    {
      id: 'cbc_g12_phy_s1',
      number: 1,
      title: '1.0 Mechanics and Thermal Physics',
      strand: 'Strand 1.0: Mechanics and Thermal Physics',
      status: 'available',
      summary: 'Dynamics including Newton\'s laws, uniform circular motion, floating and sinking, and quantity of heat.',
      subtopics: [
        P('cbc_g12_phy_s1_1', '1.1 Dynamics, including Newton\'s laws', {
          pt: 'Force, Mass, Acceleration and Momentum',
          tag: 'The resultant force on a body equals its mass times its acceleration',
          body: 'Dynamics studies why bodies move as they do. A force is a push or pull measured in newtons. Newton\'s first law: a body stays at rest or moves at constant velocity unless a resultant (net) force acts. Newton\'s second law: the resultant force is mass times acceleration, F = ma, so one newton gives a one kilogram mass an acceleration of 1 m/s^2. Newton\'s third law: when A pushes on B, B pushes back on A with an equal and opposite force, acting on different bodies. Momentum p = mv, and the force equals the rate of change of momentum, so the impulse Ft equals the change in momentum.',
          f: 'F = ma  |  p = mv  |  F t = m v - m u',
          vis: 'Free body diagram of a vehicle',
          ctx: 'A matatu pulling away from a stop, a seatbelt that holds a passenger as the vehicle brakes, and an airbag that lengthens the stopping time.',
          q: 'A loaded matatu and an empty one have the same engine force. Which accelerates faster, and which law tells you?',
          exam: 'Free body diagrams, resultant force calculations, impulse and momentum, collisions.',
          steps: [
            'Draw all forces acting on the body only (not forces it exerts), because Newton\'s second law concerns forces on one body.',
            'Find the resultant by subtracting opposing forces along the line of motion.',
            'Apply a = F / m to find the acceleration.',
            'Use v = u + at or momentum change for the next question, taking care with direction signs.'
          ],
          ex: 'A matatu of mass 2000 kg has an engine force of 6000 N forward against 2000 N of friction and drag. Resultant = 6000 - 2000 = 4000 N. Acceleration = 4000 / 2000 = 2.0 m/s^2. After 5.0 s from rest, v = 0 + 2.0 x 5.0 = 10 m/s, and momentum = 2000 x 10 = 20 000 kg m/s. Common mistake: using the engine force alone for F, or thinking the action and reaction forces cancel (they act on different bodies).'
        }),
        P('cbc_g12_phy_s1_2', '1.2 Uniform circular motion', {
          pt: 'Centripetal Force and Acceleration',
          tag: 'Circular motion at constant speed still needs an inward force',
          body: 'Uniform circular motion is motion in a circle at constant speed. The velocity is not constant, because its direction keeps changing, so there is an acceleration, called centripetal acceleration, directed toward the centre. Its size is a = v^2/r where v is the speed and r the radius. By Newton\'s second law a resultant force of F = m v^2 / r toward the centre is needed, the centripetal force. It is not a new kind of force: it is provided by tension, friction or gravity. The time for one circle is the period T = 2 pi r / v, and the angular speed is omega = v / r in radians per second.',
          f: 'a = v^2 / r  |  F = m v^2 / r  |  T = 2 pi r / v  |  omega = v / r',
          vis: 'Car on a circular bend with inward arrow',
          ctx: 'A vehicle going round a roundabout, a bend on a highway, or a washing machine spinning clothes dry.',
          q: 'When a matatu turns sharply left, you slide toward the right of the seat. Is a force pushing you outward, or something else?',
          exam: 'Calculating centripetal force, finding the maximum safe speed on a bend, banked tracks.',
          steps: [
            'Identify what supplies the inward force (friction, tension, gravity), because that is what limits the motion.',
            'Calculate a = v^2 / r with v in m/s.',
            'Find F = m a, because centripetal force is simply the resultant force toward the centre.',
            'Compare with the available force, such as maximum friction mu m g, to see if the vehicle stays on the road.'
          ],
          ex: 'A car of mass 1200 kg takes a bend of radius 50 m at 10 m/s. a = 100 / 50 = 2.0 m/s^2. F = 1200 x 2.0 = 2400 N. If the coefficient of friction is 0.70, maximum friction = 0.70 x 1200 x 10 = 8400 N, so it stays on the road. Time for a full circle: T = 2 x 3.14 x 50 / 10 = 31.4 s and omega = 10 / 50 = 0.20 rad/s. Common mistake: drawing a centrifugal force outward on the car; the real net force is inward.'
        }),
        P('cbc_g12_phy_s1_3', '1.3 Floating and sinking', {
          pt: 'Upthrust and Archimedes\' Principle',
          tag: 'A body floats when upthrust equals its weight',
          body: 'When an object is placed in a fluid, the fluid pushes up on it with a force called upthrust. Archimedes\' principle says the upthrust equals the weight of the fluid displaced, so upthrust = rho(fluid) x V(submerged) x g, where rho is density, mass per unit volume. If the upthrust on the fully submerged object is greater than its weight the object rises; if less it sinks. A floating object displaces fluid whose weight equals its own weight. Hence an object floats if its average density is less than the density of the fluid, and the fraction submerged equals the ratio of the object\'s density to the fluid density.',
          f: 'Upthrust = rho(fluid) V g  |  floating: upthrust = weight  |  fraction submerged = rho(object) / rho(fluid)',
          vis: 'Block floating with upthrust and weight arrows',
          ctx: 'Boats and dhows on Lake Victoria and the Indian Ocean float because their hulls enclose large volumes of air, and a hydrometer measures the density of milk or battery acid.',
          q: 'A steel nail sinks but a steel ship floats. What changes between them?',
          exam: 'Calculating upthrust, floating condition, the principle of flotation, hydrometers and ships.',
          steps: [
            'Convert volume to m^3 (1000 cm^3 = 0.001 m^3) and find the density of the object, because the comparison with the fluid decides the outcome.',
            'Calculate the upthrust if fully submerged as rho(fluid) V g.',
            'Compare it with the weight mg; if upthrust is bigger it floats.',
            'For a floating object, equate upthrust to weight to find the submerged fraction.'
          ],
          ex: 'A block of mass 0.60 kg has volume 1000 cm^3 = 1.0 x 10^-3 m^3. Density = 0.60 / 1.0 x 10^-3 = 600 kg/m^3, less than water at 1000 kg/m^3, so it floats. Weight = 0.60 x 10 = 6.0 N. If fully pushed under, upthrust = 1000 x 1.0 x 10^-3 x 10 = 10 N. Floating: upthrust = 6.0 N, fraction submerged = 600/1000 = 0.60, so 60 percent is under water. Common mistake: saying heavy objects sink; it depends on density, not weight.'
        }),
        P('cbc_g12_phy_s1_4', '1.4 Quantity of heat', {
          pt: 'Specific Heat Capacity and Latent Heat',
          tag: 'Heat needed depends on the mass, the material and the temperature change',
          body: 'Quantity of heat is the amount of thermal energy transferred, measured in joules. The specific heat capacity c of a substance is the heat needed to raise 1 kg of it by 1 K (or 1 degree Celsius), and for water it is 4200 J/(kg K). So Q = m c (change in temperature). During a change of state such as melting or boiling the temperature stays constant while the heat breaks the forces between particles. The specific latent heat L is the heat needed to change 1 kg of a substance from one state to another at constant temperature, so Q = m L. With a heater of power P, Q = P t.',
          f: 'Q = m c delta theta  |  Q = m L  |  Q = P t',
          vis: 'Heating curve with flat sections',
          ctx: 'An electric kettle boiling water for tea, and the long time a sufuria of water takes to boil compared with warming the empty pan.',
          q: 'While ice is melting in a drink, the heat keeps flowing in but the temperature stays at zero. Where is the energy going?',
          exam: 'Calorimetry and mixtures problems, electrical heating, heating curves with latent heat.',
          steps: [
            'Find the temperature change delta theta = final minus initial, because Q depends only on the change.',
            'Use Q = m c delta theta with mass in kg.',
            'Add Q = m L for any change of state, because the heat is needed separately for it.',
            'For an electric heater find the time from t = Q / P, assuming no heat loss.'
          ],
          ex: 'A 2000 W kettle heats 2.0 kg of water from 20 to 80 degrees Celsius, a rise of 60 K. Q = 2.0 x 4200 x 60 = 504 000 J. Time = 504 000 / 2000 = 252 s, about 4.2 minutes (ignoring heat losses, so the real time is longer). To melt 0.50 kg of ice at 0 degrees Celsius with L = 3.34 x 10^5 J/kg needs 0.50 x 3.34 x 10^5 = 1.67 x 10^5 J. Common mistake: using the final temperature instead of the change, or leaving out the latent heat.'
        })
      ]
    },
    {
      id: 'cbc_g12_phy_s2',
      number: 2,
      title: '2.0 Waves and Optics',
      strand: 'Strand 2.0: Waves and Optics',
      status: 'available',
      summary: 'Thin lenses and the photoelectric effect.',
      subtopics: [
        P('cbc_g12_phy_s2_1', '2.1 Thin lenses', {
          pt: 'The Lens Equation and Magnification',
          tag: 'Object distance, image distance and focal length are linked by 1/f = 1/u + 1/v',
          body: 'A thin lens is a transparent piece of glass or plastic with curved surfaces that bends light. A converging (convex) lens brings parallel rays to a point, the principal focus, and the distance from the lens to it is the focal length f. In the "real is positive" convention, u is the object distance and v the image distance, both positive for real objects and real images (real images can be formed on a screen). A virtual image, which cannot be put on a screen, is given a negative v. Magnification m = v / u is the image size divided by the object size.',
          f: '1/f = 1/u + 1/v  |  m = v / u  |  power P = 1/f (dioptres, f in metres)',
          vis: 'Ray diagram with object, lens, image',
          ctx: 'The camera lens in a smartphone, spectacles that correct short or long sight, and a magnifying glass.',
          q: 'Where must you put an object, relative to the focal length, to get a magnified image you can see on a screen, and where for a magnifying glass?',
          exam: 'Ray diagrams for convex and concave lenses, lens equation and magnification, spectacles and the camera.',
          steps: [
            'Write down f, u and the unknown, using positive f for a converging lens, because the sign sets the type of image.',
            'Rearrange 1/v = 1/f - 1/u and compute with fractions.',
            'Invert to get v; a negative v means a virtual image on the same side as the object.',
            'Find m = v / u, and describe the image (real or virtual, upright or inverted, larger or smaller).'
          ],
          ex: 'An object is 30 cm from a converging lens of focal length 10 cm. 1/v = 1/10 - 1/30 = 3/30 - 1/30 = 2/30, so v = 15 cm (real). m = 15/30 = 0.50: the image is real, inverted and half the object size. If the object is moved to 5.0 cm: 1/v = 1/10 - 1/5 = -1/10, so v = -10 cm (virtual), and the size of m = 10 / 5.0 = 2.0, upright and twice as big: a magnifying glass. Common mistake: using the wrong sign for a virtual image, or mixing cm and m.'
        }),
        P('cbc_g12_phy_s2_2', '2.2 Photoelectric effect', {
          pt: 'Light as Photons Releasing Electrons',
          tag: 'Light energy arrives in packets, and one photon frees one electron',
          body: 'The photoelectric effect is the emission of electrons from a metal surface when light of high enough frequency falls on it. It shows that light behaves as a stream of photons, each carrying energy E = hf, where f is frequency and h = 6.63 x 10^-34 J s is Planck\'s constant. A single photon gives all its energy to a single electron. The work function phi is the minimum energy needed to free an electron from the metal. Einstein\'s equation is hf = phi + (maximum kinetic energy). Below the threshold frequency no electrons are emitted, however bright the light, while a brighter light of the right frequency releases more electrons, not faster ones.',
          f: 'E = hf = hc / lambda  |  hf = phi + KE(max)  |  f0 = phi / h',
          vis: 'Photons striking a metal plate and ejecting electrons',
          ctx: 'Solar panels on rooftops and in solar lanterns, and light sensors in automatic doors and security lights, depend on light freeing electrons.',
          q: 'Why does very bright red light fail to free electrons from a metal while dim ultraviolet light does?',
          exam: 'Using Einstein\'s equation, threshold frequency and wavelength, stopping potential, graph of KE against frequency.',
          steps: [
            'Convert wavelength to metres and find the photon energy E = hc / lambda, because energy is the key quantity.',
            'Convert electron-volts to joules with 1 eV = 1.6 x 10^-19 J, so the units match.',
            'Subtract the work function: KE(max) = E - phi, because only the excess energy becomes kinetic.',
            'If E is less than phi, no electrons are emitted, so check this first.'
          ],
          ex: 'Light of wavelength 400 nm falls on sodium (work function 2.3 eV). Use h = 6.63 x 10^-34 J s and c = 3.00 x 10^8 m/s. E = 6.63e-34 x 3.00e8 / 4.00e-7 = 4.97 x 10^-19 J = 3.11 eV. KE(max) = 3.11 - 2.3 = 0.81 eV = 1.3 x 10^-19 J. Threshold wavelength = hc / phi = 1.989e-25 / (2.3 x 1.6e-19) = 1.989e-25 / 3.68e-19 = 5.4 x 10^-7 m = 540 nm. Common mistake: thinking brighter light gives faster electrons, or mixing eV and joules.'
        })
      ]
    },
    {
      id: 'cbc_g12_phy_s3',
      number: 3,
      title: '3.0 Electricity and Magnetism',
      strand: 'Strand 3.0: Electricity and Magnetism',
      status: 'available',
      summary: 'Electromagnetic induction, mains electricity and transistors.',
      subtopics: [
        P('cbc_g12_phy_s3_1', '3.1 Electromagnetic induction', {
          pt: 'Faraday\'s and Lenz\'s Laws',
          tag: 'A changing magnetic flux through a coil induces an emf',
          body: 'Magnetic flux is the amount of magnetic field passing through a surface, in webers (Wb). Electromagnetic induction is the production of an emf (voltage) in a conductor when the magnetic flux through it changes, for example when a magnet moves into a coil. Faraday\'s law says the induced emf is proportional to the rate of change of flux, multiplied by the number of turns N. Lenz\'s law says the induced current flows in the direction that opposes the change producing it, which is a statement of conservation of energy. Rotating a coil in a field gives an alternating emf, as in a dynamo or generator. A transformer uses induction to change an alternating voltage.',
          f: 'emf = N (change in flux) / (change in time)  |  Vs / Vp = Ns / Np',
          vis: 'Magnet moving into a coil with a galvanometer',
          ctx: 'The dynamo on a bicycle lamp, a generator at a hydro-power station, and a transformer on a pole.',
          q: 'Pushing a magnet into a coil gives a deflection. What happens if you hold the magnet still inside the coil, and why?',
          exam: 'Faraday and Lenz laws, direction of induced current, generators, transformers.',
          steps: [
            'Find the change in flux through the coil, because only a change induces an emf.',
            'Divide by the time taken to get the rate of change.',
            'Multiply by the number of turns N, because each turn contributes.',
            'Use Lenz\'s law to find the direction: the induced current opposes the change.'
          ],
          ex: 'A coil of 200 turns has the flux through each turn change by 0.0050 Wb in 0.10 s. Emf = 200 x 0.0050 / 0.10 = 200 x 0.050 = 10 V. If the same change happens in 0.050 s the emf doubles to 20 V. Common mistake: expecting an emf from a steady flux (no change gives zero), or ignoring the number of turns.'
        }),
        P('cbc_g12_phy_s3_2', '3.2 Mains electricity', {
          pt: 'Power, Transformers, Fuses and Safe Wiring',
          tag: 'Mains power is delivered at high voltage and stepped down for use',
          body: 'Mains electricity is the alternating supply delivered by the power company; in Kenya it is about 240 V at 50 Hz. Electrical power is P = VI, measured in watts, and energy is power times time; the unit on the electricity bill, the kilowatt-hour (kWh), is 1000 W used for one hour. A transformer changes voltage: in an ideal transformer, Vs/Vp = Ns/Np and power in equals power out. Power lines use high voltage so that the current, and so the heat loss I^2 R in the cables, is small. A three-pin plug has live, neutral and earth wires. The fuse is on the live wire and melts if the current is too high; the earth wire carries a fault current away, protecting the user.',
          f: 'P = VI  |  Vs / Vp = Ns / Np  |  Vp Ip = Vs Is (ideal)  |  Energy (kWh) = power (kW) x time (h)',
          vis: 'Three-pin plug and transformer on a pole',
          ctx: 'Transformers on Kenya Power poles step the line voltage down to about 240 V for homes, and a fuse in the plug of an electric kettle protects the wiring.',
          q: 'Why is a fuse placed on the live wire rather than the neutral wire?',
          exam: 'Power and fuse rating calculations, ideal transformer calculations, wiring of a plug, cost of electrical energy.',
          steps: [
            'Find the current from I = P / V, because the fuse must be rated just above it.',
            'Choose the fuse with the next standard rating above the working current.',
            'For a transformer use the turns ratio for voltage and equate power in and out for current.',
            'Find energy as kW times hours for cost questions.'
          ],
          ex: 'A kettle rated 2400 W at 240 V draws I = 2400 / 240 = 10 A, so a 13 A fuse is suitable and a 3 A fuse is not. Used for half an hour it consumes 2.4 kW x 0.5 h = 1.2 kWh. A pole transformer steps 11 000 V down to 240 V and supplies 24 000 W: secondary current = 24 000 / 240 = 100 A, so primary current = 24 000 / 11 000 = 2.18 A (ideal). The turns ratio Ns/Np = 240/11 000 = 0.022. Common mistake: choosing a fuse equal to or below the working current, or thinking a transformer increases power.'
        }),
        P('cbc_g12_phy_s3_3', '3.3 Transistors', {
          pt: 'The Transistor as a Switch and Amplifier',
          tag: 'A small base current controls a much larger collector current',
          body: 'A transistor is a semiconductor device with three terminals: the base, the collector and the emitter. In an npn transistor, a small current into the base lets a much larger current flow from the collector to the emitter. The ratio of collector current to base current is the current gain, beta, so Ic = beta x Ib. Below about 0.7 V on the base (for silicon) no base current flows and the transistor is off, which makes it an electronic switch. In a light-activated switch, a light-dependent resistor in a potential divider sets the base voltage so the transistor turns a lamp or relay on in the dark. Used in its linear range it amplifies a small signal.',
          f: 'Ic = beta x Ib  |  Ie = Ib + Ic  |  R(base) = (V - 0.7) / Ib',
          vis: 'npn transistor symbol with currents',
          ctx: 'Automatic security lights that come on at dusk, the amplifier chips in a radio, and the switching circuits in a phone all rely on transistors.',
          q: 'The transistor needs only a tiny current at the base, so how can it switch a lamp that needs far more current?',
          exam: 'Transistor as a switch, light and heat sensitive circuits, calculating base resistor and collector current.',
          steps: [
            'Subtract the base-emitter voltage of 0.7 V from the supply to find the voltage across the base resistor, because it drops across the junction.',
            'Use Ohm\'s law R = V / Ib to find the base resistor.',
            'Find Ic = beta x Ib, because that is the current the load receives.',
            'Check the load can accept this current and that the transistor is switched fully on.'
          ],
          ex: 'A transistor with beta = 100 is to carry a base current of 0.050 mA = 5.0 x 10^-5 A from a 6.0 V supply. Voltage across the base resistor = 6.0 - 0.7 = 5.3 V. R = 5.3 / 5.0 x 10^-5 = 106 000 ohm = 106 k ohm. Collector current = 100 x 0.050 mA = 5.0 mA. Emitter current = 5.0 + 0.05 = 5.05 mA. Common mistake: connecting the load to the base, or forgetting the 0.7 V drop.'
        })
      ]
    },
    {
      id: 'cbc_g12_phy_s4',
      number: 4,
      title: '4.0 Environmental and Space Physics',
      strand: 'Strand 4.0: Environmental and Space Physics',
      status: 'available',
      summary: 'An introduction to satellites.',
      subtopics: [
        P('cbc_g12_phy_s4_1', '4.1 Introduction to satellites', {
          pt: 'Orbits, Orbital Speed and Period',
          tag: 'A satellite is a body in continuous free fall around the Earth',
          body: 'A satellite is an object that orbits a larger body. The Moon is a natural satellite, and artificial ones are launched by rockets. Gravity supplies the centripetal force that keeps a satellite in a circle: G M m / r^2 = m v^2 / r, where M is the mass of the Earth, r is the distance from the Earth\'s centre and G is the gravitational constant. Hence v = sqrt(G M / r), independent of the satellite\'s mass, and the period is T = 2 pi r / v. Higher orbits are slower and have longer periods. A geostationary satellite has a period of 24 hours over the equator, so it stays above one point on Earth. Low Earth orbits are used for imaging and monitoring.',
          f: 'v = sqrt(G M / r)  |  T = 2 pi r / v  |  G M(Earth) = 3.99 x 10^14 m^3/s^2',
          vis: 'Earth with low and geostationary orbits',
          ctx: 'Kenya\'s Taifa-1, a small CubeSat satellite launched in 2023 for Earth observation, uses a low orbit; communications and TV satellites use geostationary orbit.',
          q: 'Satellites are still pulled by gravity, so why do they not fall to the ground?',
          exam: 'Orbital speed and period calculations, geostationary orbit conditions, uses of satellites.',
          steps: [
            'Find r as the radius of Earth plus height above the surface (6.38 x 10^6 m + height), because r is measured from the centre.',
            'Equate gravitational force to centripetal force to get v = sqrt(GM / r).',
            'Find the period from T = 2 pi r / v.',
            'Convert to minutes and compare with a day or the orbits you know.'
          ],
          ex: 'A satellite orbits 400 km above Earth. r = 6.38 x 10^6 + 0.40 x 10^6 = 6.78 x 10^6 m. v = sqrt(3.99 x 10^14 / 6.78 x 10^6) = sqrt(5.885 x 10^7) = 7670 m/s, about 7.7 km/s. T = 2 x 3.14 x 6.78 x 10^6 / 7670 = 5550 s, about 92.5 minutes, so it circles the Earth about 15.5 times each day. Common mistake: using the height above the surface as r, or believing that astronauts float because there is no gravity (they are in free fall).'
        })
      ]
    }
  ]
};

module.exports = [G11, G12];
