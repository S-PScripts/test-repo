export const TOPICS = [
  'Fundamentals of algorithms',
  'Programming',
  'Fundamentals of data representation',
  'Computer systems',
  'Fundamentals of computer networks',
  'Cyber security',
  'Relational databases and SQL',
  'Ethical, legal and environmental impacts'
];

export const QUESTIONS = [
  {
    id: 'alg-binary-search',
    topic: 'Fundamentals of algorithms',
    subtopic: 'Searching algorithms',
    difficulty: 'Higher',
    question: 'What must be true before a binary search can be used on a list?',
    options: ['The list must contain only numbers', 'The list must already be sorted', 'The list must have an even number of items', 'The list must be stored in main memory'],
    answerIndex: 1,
    hint: 'Think about how the algorithm knows which half to ignore.',
    rationale: 'Binary search only works when the data is already in order, because the algorithm compares the middle item and removes half of the remaining list each step.'
  },
  {
    id: 'alg-trace',
    topic: 'Fundamentals of algorithms',
    subtopic: 'Tracing',
    difficulty: 'Mixed',
    question: 'A counter-controlled loop starts at 1 and stops when the counter becomes greater than 5. How many times does the loop run?',
    options: ['4', '5', '6', 'It depends on clock speed'],
    answerIndex: 1,
    hint: 'Write out the valid counter values.',
    rationale: 'The loop runs for counter values 1, 2, 3, 4 and 5. It stops only when the counter becomes 6.'
  },
  {
    id: 'prog-selection',
    topic: 'Programming',
    subtopic: 'Control structures',
    difficulty: 'Foundation',
    question: 'Which programming structure is used to choose between different paths in a program?',
    options: ['Sequence', 'Selection', 'Iteration', 'Validation'],
    answerIndex: 1,
    hint: 'This is the structure used by IF statements.',
    rationale: 'Selection uses a condition to decide which path to take. Sequence is just the normal order of instructions, while iteration repeats instructions.'
  },
  {
    id: 'prog-array',
    topic: 'Programming',
    subtopic: 'Data structures',
    difficulty: 'Mixed',
    question: 'Why are arrays useful in programs?',
    options: ['They store many related values using one variable name', 'They automatically test code', 'They remove the need for loops', 'They increase processor clock speed'],
    answerIndex: 0,
    hint: 'Think about storing a whole class set of scores.',
    rationale: 'Arrays group many related values together under one named structure, so programs can process collections of data efficiently.'
  },
  {
    id: 'data-binary',
    topic: 'Fundamentals of data representation',
    subtopic: 'Binary',
    difficulty: 'Foundation',
    question: 'What is the denary value of the binary number 101101?',
    options: ['43', '45', '51', '53'],
    answerIndex: 1,
    hint: 'Use the place values 32, 16, 8, 4, 2, 1.',
    rationale: '101101 in binary equals 32 + 8 + 4 + 1, which is 45.'
  },
  {
    id: 'data-image',
    topic: 'Fundamentals of data representation',
    subtopic: 'Images',
    difficulty: 'Mixed',
    question: 'Increasing colour depth mainly means that an image can:',
    options: ['Use fewer pixels', 'Be printed faster', 'Store more colours per pixel', 'Avoid file compression'],
    answerIndex: 2,
    hint: 'Colour depth is about the number of bits used for colour information.',
    rationale: 'A higher colour depth gives each pixel more possible colour values because more bits are allocated to represent colour.'
  },
  {
    id: 'systems-cpu',
    topic: 'Computer systems',
    subtopic: 'CPU',
    difficulty: 'Mixed',
    question: 'Which CPU component decodes instructions and sends control signals?',
    options: ['Arithmetic Logic Unit', 'Control Unit', 'Cache', 'Registers only'],
    answerIndex: 1,
    hint: 'Its name suggests it directs what happens.',
    rationale: 'The Control Unit decodes instructions and coordinates the operation of the CPU by sending control signals.'
  },
  {
    id: 'systems-memory',
    topic: 'Computer systems',
    subtopic: 'Primary storage',
    difficulty: 'Foundation',
    question: 'Which statement about RAM and ROM is correct?',
    options: ['RAM is non-volatile and ROM is volatile', 'RAM is volatile and ROM is non-volatile', 'ROM is used for temporary working data only', 'RAM keeps its contents when power is off'],
    answerIndex: 1,
    hint: 'Think about what loses data after shutdown.',
    rationale: 'RAM is volatile, so it loses contents when power is removed. ROM is non-volatile and keeps its contents.'
  },
  {
    id: 'net-topology',
    topic: 'Fundamentals of computer networks',
    subtopic: 'Topology',
    difficulty: 'Mixed',
    question: 'In a star topology, what usually sits at the centre of the network?',
    options: ['A switch or hub', 'A printer', 'A firewall only', 'A browser'],
    answerIndex: 0,
    hint: 'All devices connect back to one central hardware device.',
    rationale: 'A star network connects each node to a central switch or hub, which passes data between devices.'
  },
  {
    id: 'net-dns',
    topic: 'Fundamentals of computer networks',
    subtopic: 'Protocols',
    difficulty: 'Higher',
    question: 'What is the main purpose of DNS?',
    options: ['Encrypting data packets', 'Converting domain names to IP addresses', 'Assigning MAC addresses', 'Filtering spam emails'],
    answerIndex: 1,
    hint: 'Humans remember words more easily than number strings.',
    rationale: 'DNS translates a readable domain name into the numeric IP address needed to locate the correct server.'
  },
  {
    id: 'cyber-phishing',
    topic: 'Cyber security',
    subtopic: 'Threats',
    difficulty: 'Foundation',
    question: 'What is phishing?',
    options: ['A social engineering attempt to steal data', 'A backup method', 'A hardware upgrade', 'A way to compress files'],
    answerIndex: 0,
    hint: 'The attacker pretends to be trusted.',
    rationale: 'Phishing is a social engineering attack in which a criminal pretends to be legitimate in order to trick users into revealing information.'
  },
  {
    id: 'cyber-bruteforce',
    topic: 'Cyber security',
    subtopic: 'Prevention',
    difficulty: 'Higher',
    question: 'Which action best helps protect against brute-force password attacks?',
    options: ['Increase screen brightness', 'Use strong passwords and limit repeated login attempts', 'Disable software updates', 'Store passwords in plain text'],
    answerIndex: 1,
    hint: 'Think about making guessing both harder and slower.',
    rationale: 'Strong passwords increase the number of possible combinations, while login limits stop attackers trying endless guesses quickly.'
  },
  {
    id: 'sql-select',
    topic: 'Relational databases and SQL',
    subtopic: 'SQL',
    difficulty: 'Foundation',
    question: 'Which SQL command is used to retrieve data from a table?',
    options: ['SELECT', 'DELETE', 'INSERT', 'DROP'],
    answerIndex: 0,
    hint: 'This command reads rather than changes data.',
    rationale: 'SELECT returns data from a table, whereas INSERT adds rows, DELETE removes rows, and DROP removes an object.'
  },
  {
    id: 'sql-primary-key',
    topic: 'Relational databases and SQL',
    subtopic: 'Database structure',
    difficulty: 'Mixed',
    question: 'What is the main purpose of a primary key?',
    options: ['To uniquely identify each record', 'To automatically sort all data', 'To encrypt the database', 'To connect to the internet'],
    answerIndex: 0,
    hint: 'Each row needs one unique identifier.',
    rationale: 'A primary key uniquely identifies each record in a table so rows can be referenced accurately and relationships can be created.'
  },
  {
    id: 'impact-privacy',
    topic: 'Ethical, legal and environmental impacts',
    subtopic: 'Privacy and law',
    difficulty: 'Mixed',
    question: 'Why must organisations handle personal data carefully?',
    options: ['Because it has no legal protection', 'Because laws require fair, lawful and secure processing', 'Because personal data can only be stored on paper', 'Because it removes the need for user accounts'],
    answerIndex: 1,
    hint: 'Think about privacy rights and legal responsibility.',
    rationale: 'Data protection rules require personal information to be processed lawfully, fairly and securely to protect individuals.'
  },
  {
    id: 'impact-ewaste',
    topic: 'Ethical, legal and environmental impacts',
    subtopic: 'Environmental issues',
    difficulty: 'Foundation',
    question: 'What environmental issue can be caused by replacing devices too often?',
    options: ['Lowering internet speed', 'Electronic waste increasing', 'Making files easier to encrypt', 'Preventing recycling'],
    answerIndex: 1,
    hint: 'Consider what happens to discarded hardware.',
    rationale: 'Replacing hardware too often increases electronic waste, which can create pollution and disposal issues if not recycled properly.'
  }
];
