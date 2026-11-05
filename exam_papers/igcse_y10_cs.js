const { mcq, num, short, term, buildPaper } = require('./helpers');

module.exports = buildPaper({
  id: 'elingu_igcse_y10_cs_set1',
  curriculum: 'BRITISH',
  grade: 10,
  gradeRange: [10, 11],
  subject: 'Computer Science',
  scale: 'IGCSE',
  title: 'IGCSE Computer Science (Year 10) — Practice Paper 1',
  series: 'Elingu practice paper, Cambridge IGCSE style',
  durationMinutes: 50,
  calculatorAllowed: true,
  instructions: 'Answer all questions. Section A: choose one answer. Section B: type your answer; for conversions, give the number only.'
}, [
  {
    title: 'Section A — Multiple choice',
    instructions: 'Each question is worth 1 mark.',
    questions: [
      mcq('Data representation', 'What is the denary (base 10) value of the binary number 1011?', ['9', '10', '11', '13'], 'C', '1011 = 8 + 0 + 2 + 1 = 11.'),
      mcq('Hardware', 'Which of these is an input device?', ['Monitor', 'Keyboard', 'Printer', 'Speaker'], 'B', 'A keyboard sends data into the computer. The others output data.'),
      mcq('Storage', 'Which of these keeps data when the power is switched off?', ['RAM', 'Cache', 'Solid-state drive (SSD)', 'Registers'], 'C', 'An SSD is secondary storage, which is non-volatile. RAM, cache and registers lose their data.'),
      mcq('Hardware', 'Which component fetches, decodes and executes instructions?', ['RAM', 'CPU', 'Power supply', 'Hard drive'], 'B', 'The central processing unit (CPU) runs the fetch–decode–execute cycle.'),
      mcq('Software', 'Which of these is a high-level programming language?', ['Machine code', 'Assembly language', 'Python', 'Binary'], 'C', 'Python is high-level: it is close to human language and is translated for the CPU.'),
      mcq('Networks', 'Which protocol is used to send web pages securely?', ['FTP', 'SMTP', 'HTTP', 'HTTPS'], 'D', 'HTTPS encrypts the data between browser and web server.'),
      mcq('Networks', 'What does LAN stand for?', ['Local Area Network', 'Large Access Node', 'Linked Antenna Network', 'Long Area Network'], 'A', 'A LAN covers a small area such as a school.'),
      mcq('Security', 'Phishing is an attack that tries to…', ['slow down a network', 'trick users into giving away personal information', 'delete files from a hard drive', 'overheat the CPU'], 'B', 'Phishing uses fake emails or sites to steal passwords or bank details.'),
      mcq('Data representation', 'What is the hexadecimal digit F in denary?', ['10', '14', '15', '16'], 'C', 'A = 10, B = 11, C = 12, D = 13, E = 14, F = 15.'),
      mcq('Logic', 'Which logic gate outputs 1 only when both inputs are 1?', ['OR', 'AND', 'NOT', 'NOR'], 'B', 'An AND gate needs both inputs to be 1.'),
      mcq('Programming', 'Which of these is NOT a data type?', ['Integer', 'String', 'Boolean', 'Loop'], 'D', 'A loop is a programming construct, not a data type.'),
      mcq('Networks', 'Which device connects different networks and directs packets of data between them?', ['Hub', 'Switch', 'Router', 'Monitor'], 'C', 'A router forwards packets between networks, for example from your home to the internet.'),
      mcq('Data representation', 'Which of these is the largest unit of data?', ['Byte', 'Nibble', 'Kilobyte', 'Bit'], 'C', 'Bit < nibble (4 bits) < byte (8 bits) < kilobyte.'),
      mcq('Algorithms', 'What is an algorithm?', ['A step-by-step set of instructions to solve a problem', 'A type of computer virus', 'A storage device', 'A programming error'], 'A', 'An algorithm lists the exact steps needed to complete a task.'),
      mcq('Programming', 'A missing bracket stops a program from running. This is a…', ['logic error', 'syntax error', 'runtime hardware error', 'rounding error'], 'B', 'Syntax errors break the rules of the language, so the program cannot be translated.')
    ]
  },
  {
    title: 'Section B — Short answers and calculations',
    instructions: 'Type your answer.',
    questions: [
      term('Data representation', 'Convert the denary number 25 into binary.', ['11001', '00011001'], 2, '25 = 16 + 8 + 1 = 11001 (or 00011001 in 8 bits).'),
      num('Data representation', 'Convert the 8-bit binary number 11001010 into denary.', 202, 2, { method: [{ any: ['128 + 64', '128+64', '192'] }], explanation: '128 + 64 + 8 + 2 = 202.' }),
      term('Data representation', 'Convert the denary number 255 into hexadecimal.', ['ff'], 1, '255 = 15 × 16 + 15, which is FF.'),
      num('Data representation', 'An image is 100 pixels wide and 50 pixels high. Each pixel uses 8 bits. Calculate the file size in bytes.', 5000, 2, { unit: ['b', 'bytes', 'byte'], method: [{ any: ['100 x 50', '100 * 50', '100×50', '5000', '40000'] }], explanation: '100 × 50 = 5 000 pixels × 8 bits = 40 000 bits ÷ 8 = 5 000 bytes.' }),
      num('Data representation', 'How many different values can be stored using 4 bits?', 16, 1, { explanation: '2⁴ = 16 different values (0 to 15).' }),
      term('Software', 'Give one example of system software.', ['operating system', 'os', 'utility software', 'device driver', 'antivirus', 'compiler', 'interpreter', 'firmware'], 1, 'Examples: an operating system, device drivers, utility programs such as antivirus.'),
      short('Data transmission', 'Explain why a file is compressed before it is sent over the internet.',
        [{ any: ['smaller', 'reduce the size', 'reduces the size', 'less data', 'file size', 'reduce file size', 'reduces file size'] }, { any: ['faster', 'quicker', 'less bandwidth', 'less time', 'save bandwidth', 'saves bandwidth', 'less storage', 'save storage', 'saves storage'] }],
        2, 'Compression makes the file smaller, so it uploads and downloads faster, uses less bandwidth and takes up less storage.', 'It makes the file smaller so it is sent faster'),
      short('Security', 'State one way of protecting a computer network from hackers.',
        [{ any: ['firewall', 'password', 'passwords', 'encryption', 'encrypt', 'anti-malware', 'antivirus', 'anti-virus', 'two-factor', '2fa', 'biometric', 'access rights', 'software updates', 'update software'] }],
        1, 'Examples: use a firewall, strong passwords, encryption, two-factor authentication, keep software updated.', 'Use a firewall'),
      num('Programming', 'x ← 3, then y ← x × 2 + 1. What is the value of y?', 7, 1, { explanation: 'y = 3 × 2 + 1 = 7.' }),
      num('Programming', 'total ← 0. FOR i ← 1 TO 5: total ← total + i. NEXT i. What is the final value of total?', 15, 2, { method: [{ any: ['1+2+3+4+5', '1 + 2 + 3 + 4 + 5'] }], explanation: '1 + 2 + 3 + 4 + 5 = 15.' })
    ]
  }
]);
