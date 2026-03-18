import type { CreateQuiz } from "../../shared/schema";

export const sampleQuizQus: CreateQuiz[] =  [
  /* Quiz 1: Science Fundamentals (id = "1") */
  {
    id: "1",
    title: "Science Fundamentals",
    category: "Science",
    difficulty: "medium",
    questions: [
      {
        text: "What is H2O commonly known as?",
        correctOption: 0,
        options: ["Water", "Oxygen", "Hydrogen", "Helium"],
      },
      {
        text: "Which particle has a negative charge?",
        correctOption: 1,
        options: ["Proton", "Electron", "Neutron", "Photon"],
      },
      {
        text: "What is the chemical symbol for table salt (sodium chloride)?",
        correctOption: 2,
        options: ["Na", "Cl2", "NaCl", "KCl"],
      },
      {
        text: "Which organelle is known as the powerhouse of the cell?",
        correctOption: 0,
        options: ["Mitochondrion", "Ribosome", "Nucleus", "Golgi apparatus"],
      },
      {
        text: "Which gas do plants primarily take in for photosynthesis?",
        correctOption: 1,
        options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
      },
      {
        text: "What is the SI unit of force?",
        correctOption: 2,
        options: ["Pascal", "Joule", "Newton", "Watt"],
      },
      {
        text: "Which law states that for every action there is an equal and opposite reaction?",
        correctOption: 0,
        options: ["Newton's Third Law", "Newton's First Law", "Newton's Second Law", "Law of Gravitation"],
      },
      {
        text: "What is the main gas responsible for global warming (greenhouse effect)?",
        correctOption: 3,
        options: ["Ozone (O3)", "Oxygen (O2)", "Nitrogen (N2)", "Carbon dioxide (CO2)"],
      },
      {
        text: "Which branch of science studies living organisms?",
        correctOption: 2,
        options: ["Physics", "Chemistry", "Biology", "Geology"],
      },
      {
        text: "What do catalysts do in chemical reactions?",
        correctOption: 0,
        options: [
          "Speed up the reaction without being consumed",
          "Provide heat for reaction",
          "Change products into reactants",
          "Increase pressure",
        ],
      },
    ],
  },

  /* Quiz 2: World History (id = "2") */
  {
    id: "2",
    title: "World History",
    category: "History",
    difficulty: "hard",
    questions: [
      {
        text: "In which year did World War II end?",
        correctOption: 1,
        options: ["1944", "1945", "1946", "1947"],
      },
      {
        text: "Who was the first person to walk on the moon?",
        correctOption: 1,
        options: ["Buzz Aldrin", "Neil Armstrong", "John Glenn", "Alan Shepard"],
      },
      {
        text: "Which empire was ruled by Julius Caesar?",
        correctOption: 1,
        options: ["Greek Empire", "Roman Empire", "Byzantine Empire", "Ottoman Empire"],
      },
      {
        text: "Who painted the ceiling of the Sistine Chapel?",
        correctOption: 2,
        options: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"],
      },
      {
        text: "The Renaissance period began in which country?",
        correctOption: 2,
        options: ["France", "Germany", "Italy", "England"],
      },
      {
        text: "Who was known as the 'Iron Lady'?",
        correctOption: 1,
        options: ["Queen Elizabeth II", "Margaret Thatcher", "Indira Gandhi", "Golda Meir"],
      },
      {
        text: "The Berlin Wall fell in which year?",
        correctOption: 2,
        options: ["1987", "1988", "1989", "1990"],
      },
      {
        text: "The American Civil War began in which year?",
        correctOption: 1,
        options: ["1860", "1861", "1862", "1863"],
      },
      {
        text: "Which ancient wonder was located in Alexandria?",
        correctOption: 1,
        options: ["Hanging Gardens", "Lighthouse of Alexandria", "Colossus of Rhodes", "Temple of Artemis"],
      },
      {
        text: "Who was the Egyptian queen who allied with Julius Caesar and Mark Antony?",
        correctOption: 2,
        options: ["Nefertiti", "Hatshepsut", "Cleopatra", "Ankhesenamun"],
      },
    ],
  },

  /* Quiz 3: Geography Challenge (id = "3") */
  {
    id: "3",
    title: "Geography Challenge",
    category: "Geography",
    difficulty: "easy",
    questions: [
      {
        text: "What is the capital of France?",
        correctOption: 2,
        options: ["London", "Berlin", "Paris", "Rome"],
      },
      {
        text: "Which is the longest river in the world?",
        correctOption: 1,
        options: ["Amazon River", "Nile River", "Mississippi River", "Yangtze River"],
      },
      {
        text: "What is the smallest country in the world by area?",
        correctOption: 1,
        options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
      },
      {
        text: "Which continent has the most countries?",
        correctOption: 2,
        options: ["Asia", "Europe", "Africa", "South America"],
      },
      {
        text: "What is the highest mountain in the world?",
        correctOption: 1,
        options: ["K2", "Mount Everest", "Kangchenjunga", "Lhotse"],
      },
      {
        text: "Which ocean is the largest?",
        correctOption: 3,
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      },
      {
        text: "What is the capital of Australia?",
        correctOption: 2,
        options: ["Sydney", "Melbourne", "Canberra", "Perth"],
      },
      {
        text: "Which desert is the largest in the world?",
        correctOption: 2,
        options: ["Sahara Desert", "Gobi Desert", "Antarctic Desert", "Arabian Desert"],
      },
      {
        text: "What is the deepest point on Earth?",
        correctOption: 0,
        options: ["Mariana Trench", "Puerto Rico Trench", "Java Trench", "Philippine Trench"],
      },
      {
        text: "Which country has the most time zones (including territories)?",
        correctOption: 0,
        options: ["Russia", "USA", "China", "Canada"],
      },
    ],
  },

  /* Quiz 4: Space & Astronomy (id = "4") */
  {
    id: "4",
    title: "Space & Astronomy",
    category: "Astronomy",
    difficulty: "medium",
    questions: [
      {
        text: "Which planet is closest to the Sun?",
        correctOption: 1,
        options: ["Venus", "Mercury", "Earth", "Mars"],
      },
      {
        text: "What is the name of our galaxy?",
        correctOption: 1,
        options: ["Andromeda", "Milky Way", "Whirlpool", "Sombrero"],
      },
      {
        text: "Which planet is known for its rings?",
        correctOption: 2,
        options: ["Jupiter", "Uranus", "Saturn", "Neptune"],
      },
      {
        text: "What is a light-year?",
        correctOption: 1,
        options: ["A unit of time", "A unit of distance", "A unit of mass", "A unit of energy"],
      },
      {
        text: "Which is the closest star to Earth (other than the Sun)?",
        correctOption: 1,
        options: ["Alpha Centauri", "Proxima Centauri", "Sirius", "Betelgeuse"],
      },
      {
        text: "How long does light from the Sun take to reach Earth?",
        correctOption: 0,
        options: ["About 8 minutes", "About 1 minute", "About 1 hour", "About 24 hours"],
      },
      {
        text: "Which spacecraft was the first to land humans on the Moon?",
        correctOption: 2,
        options: ["Sputnik", "Vostok 1", "Apollo 11", "Challenger"],
      },
      {
        text: "Which planet has the most moons (as of current counts)?",
        correctOption: 1,
        options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
      },
      {
        text: "What do we call a system of millions or billions of stars, together with gas and dust?",
        correctOption: 0,
        options: ["Galaxy", "Constellation", "Nebula", "Cluster"],
      },
      {
        text: "What is the primary component of a comet's tail?",
        correctOption: 2,
        options: ["Solid rock fragments", "Magnetic particles", "Gas and dust", "Liquid water"],
      },
    ],
  },

  /* Quiz 5: Tech & Innovation (id = "5") */
  {
    id: "5",
    title: "Tech & Innovation",
    category: "Technology",
    difficulty: "hard",
    questions: [
      {
        text: "Who is considered the father of theoretical computer science and AI pioneer?",
        correctOption: 2,
        options: ["Bill Gates", "Steve Jobs", "Alan Turing", "Tim Berners-Lee"],
      },
      {
        text: "What does 'HTTP' stand for?",
        correctOption: 0,
        options: [
          "HyperText Transfer Protocol",
          "Home Tool Transfer Protocol",
          "Hyperlink Text Transfer Protocol",
          "High Tech Transfer Protocol",
        ],
      },
      {
        text: "Which language was developed by James Gosling at Sun Microsystems?",
        correctOption: 1,
        options: ["Python", "Java", "C++", "JavaScript"],
      },
      {
        text: "What does 'RAM' stand for?",
        correctOption: 0,
        options: ["Random Access Memory", "Read Access Memory", "Rapid Access Memory", "Real Access Memory"],
      },
      {
        text: "Which company developed the Android operating system?",
        correctOption: 2,
        options: ["Apple", "Microsoft", "Google", "Samsung"],
      },
      {
        text: "What is the primary technology behind cryptocurrencies like Bitcoin?",
        correctOption: 1,
        options: ["Artificial Intelligence", "Blockchain", "Quantum Computing", "Virtual Reality"],
      },
      {
        text: "Which protocol is used for secure web browsing?",
        correctOption: 2,
        options: ["HTTP", "FTP", "HTTPS", "SMTP"],
      },
      {
        text: "What is the binary representation of decimal 10?",
        correctOption: 0,
        options: ["1010", "1100", "1001", "1111"],
      },
      {
        text: "Which company developed the first commercially successful personal computer (IBM PC)?",
        correctOption: 0,
        options: ["IBM", "Apple", "Microsoft", "Intel"],
      },
      {
        text: "What does 'URL' stand for?",
        correctOption: 1,
        options: [
          "Universal Resource Locator",
          "Uniform Resource Locator",
          "Universal Reference Link",
          "Uniform Reference Locator",
        ],
      },
    ],
  },
];