// import { picture } from "framer-motion/client";

export const siteConfig = {
  name: "TECHNICIA'25",
  organisation:"ISTE",
  logo:"/logo/logotechnisia.svg",
  
  description: "The biggest tech fest of North India - Where Innovation Meets Opportunity",
  date: "15th - 17th October, 2025",
  venue: "Chandigarh University, Mohali",
  email: "iste@cumail.in",
  phone: "+91 9729507672",
  links: {
    twitter: "https://x.com/chandigarh_uni?lang=en",
    instagram: "https://www.instagram.com/iste_cusc/",
    linkedin: "https://www.linkedin.com/company/iste-student-chapter-chandigarh-university/posts/?feedView=all",
  },
};

export const navLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Timeline",
    href: "/timeline",
  },
  {
    title: "Competitions",
    href: "/competitions",
  },
  {
    title: "Sponsors",
    href: "/sponsors",
  },
  {
    title: "Registration",
    href: "/register",
  },
  {
    title: "Previous Events",
    href: "/previous-events",
  },
  {
    title: "FAQs",
    href: "/faqs",
  },
];
export const competitions = [
  {
    id: 1,
    title: "CU MUN",
      description: "Showcase your artificial intelligence prowess in this cutting-edge competition where innovation meets technology.",
    date: "March 15, 2025",
    time: "3 day event",
    location: "Main Auditorium, Tech Block",
    participants: "150+ Teams",
    prize: "₹50,000",
    difficulty: "Advanced",
    category: "Technology",
    highlights: ["Machine Learning Models", "Neural Networks", "Real-world Problem Solving", "Industry Mentorship"],
    image: "/competition/1.png"
  },
  {
    id: 2,
    title: "CodeFest Marathon",
    description: "The ultimate coding showdown where algorithms dance and logic reigns supreme. Test your programming skills against the best.",
    date: "March 16, 2025",
    time: "10:00 AM - 08:00 PM",
    location: "Computer Lab Complex",
    participants: "200+ Coders",
    prize: "₹30,000",
    difficulty: "Intermediate",
    category: "Programming",
    highlights: ["Data Structures", "Algorithm Optimization", "Competitive Programming", "Live Coding Sessions"],
    image: "/competition/2.png"
  },
  {
    id: 3,
    title: "RoboWars Championship",
    description: "Enter the arena where metal meets mayhem! Design, build, and battle your way to robotic supremacy in this thrilling competition.",
    date: "March 17, 2025",
    time: "11:00 AM - 07:00 PM",
    location: "Engineering Workshop Arena",
    participants: "80+ Robots",
    prize: "₹75,000",
    difficulty: "Expert",
    category: "Robotics",
    highlights: ["Combat Robotics", "Mechanical Design", "Strategic Warfare", "Live Battle Arena"],
    image: "/competition/5.png"
  },
  {
    id: 4,
    title: "Web Dev Wizardry",
    description: "Craft digital masterpieces and weave web magic in this comprehensive full-stack development competition.",
    date: "March 18, 2025",
    time: "09:30 AM - 05:30 PM",
    location: "Digital Innovation Center",
    participants: "120+ Developers",
    prize: "₹40,000",
    difficulty: "Intermediate",
    category: "Web Development",
    highlights: ["Frontend Frameworks", "Backend Architecture", "Database Design", "UI/UX Excellence"],
    image: "/competition/4.png"
  },
  {
    id: 5,
    title: "Web Dev Wizardry",
    description: "Craft digital masterpieces and weave web magic in this comprehensive full-stack development competition.",
    date: "March 18, 2025",
    time: "09:30 AM - 05:30 PM",
    location: "Digital Innovation Center",
    participants: "120+ Developers",
    prize: "₹40,000",
    difficulty: "Intermediate",
    category: "Web Development",
    highlights: ["Frontend Frameworks", "Backend Architecture", "Database Design", "UI/UX Excellence"],
    image: "/competition/6.png"
  },
  {
    id: 6,
    title: "Web Dev Wizardry",
    description: "Craft digital masterpieces and weave web magic in this comprehensive full-stack development competition.",
    date: "March 18, 2025",
    time: "09:30 AM - 05:30 PM",
    location: "Digital Innovation Center",
    participants: "120+ Developers",
    prize: "₹40,000",
    difficulty: "Intermediate",
    category: "Web Development",
    highlights: ["Frontend Frameworks", "Backend Architecture", "Database Design", "UI/UX Excellence"],
    image: "/competition/7.png"
  },
];
export const eventsByDay = {
  day1 : {
  title: "Day 1 - Tech Focus",
  date: "October 15, 2025",
  description:
    "Kick off Technicia'25 with intense tech competitions and insightful discussions.",
  events: [
    {
      id: "hackathon",
      title: "HackChrono: The Technicia’ 48-hour Challenge",
      description:
        "HackChrono is a 48-hour open-source hackathon to build tech-driven solutions for real-world social challenges, especially in NGO and CSR domains.",
      time: "15th - 17th October, 2025 (48 hours)",
      participants: "Teams of 2-4 UG/PG Students",
      prize: "₹1,50,000",
      difficulty: "Advanced",
      location: "Chandigarh University",
      highlights: [
        "48-hour open-source hackathon",
        "Mentorship rounds & tech talks",
        "Real-world problem statements",
        "Pitch prep and final demos"
      ],
      image: "/competition/hackathon.png",
      special: true,
      
    },
    {
      id: "cumun",
      title: "CUMUN – Chandigarh University Model United Nations",
      description:
        "An intellectually stimulating forum where delegates represent countries and debate global issues through diplomacy, negotiation, and collaboration.",
      time: "15th-16th October, 2025",
      participants: "100+ Delegates (Open to All Streams)",
      prize: "₹40,000 Total Cash Pool + Best Delegate Awards",
      difficulty: "Intermediate",
      location: "Conference Hall, Block A",
      highlights: [
        "UN-style committee simulations",
        "Global policy debate",
        "Leadership and diplomacy",
        "Awards for Best Delegates & Verbal Mentions",
      ],
      image: "/competition/mun.png",
      special: true,
    },
    {
      id: "capture-flag",
      title: "Capture The Flag – Technicia: Cyber Crisis Protocol",
      description:
        "A 24-hour Jeopardy-style cybersecurity CTF with challenges across web, crypto, reverse engineering, and forensics. Defend Earth from alien hackers!",
      time: "16th October, 2025 (24 hours)",
      participants: "Teams of 2–4",
      prize: "₹50,000",
      difficulty: "Advanced",
      location: "Chandigarh University",
      highlights: [
        "CTFd platform with scoreboard",
        "Challenges in 6 cyber domains",
        "Mentorship support",
        "Alien hacking theme"
      ],
      image: "/competition/capture.png",
      special: false,
    },
    {
      id: "tech-treasure-hunt",
      title: "VOID Protocol: The Final Code",
      description:
        "An interstellar-themed treasure hunt combining logic puzzles, cryptography, and tech decoding across multiple floors in a race to the final code.",
      time: "15th October, 2025",
      participants: "Teams of 3–4",
      prize: "₹50,000",
      difficulty: "Intermediate",
      location: "Chandigarh University",
      highlights: [
        "Binary & DNA puzzles",
        "QR scavenger hunt",
        "Timed decoding levels",
        "Alien-themed storyline"
      ],
      image: "/competition/techtr.png",
      special: false,
    },
    {
      id: "adopt-a-planet",
      title: "Adopt a Planet",
      description:
        "A themed CSR competition where student teams act as intergalactic CSR leaders solving crises on fictional planets with sustainable solutions.",
      time: "16th October, 2025",
      participants: "Teams of 3",
      prize: "Trophies, Certificates",
      difficulty: "Intermediate",
      location: "Chandigarh University",
      highlights: [
        "Story-based problem solving",
        "Sustainable innovation",
        "Team presentations",
        "Judged pitch sessions"
      ],
      image: "/competition/adopt.png",
      special: false,
    },
    {
      id: "tech-expo-student",
      title: "Tech Expo: Student & Industry Innovations",
      description:
        "Tech Expo is a platform for showcasing student innovations alongside company CSR demos, facilitating networking between academia and industry.",
      time: "15th-17th October, 2025",
      participants: "Individual/Team & Corporate",
      prize: "Best Project Award & Industry Mentorship",
      difficulty: "All Levels",
      location: "Chandigarh University",
      highlights: [
        "Company stalls and demos",
        "Student prototype exhibition",
        "CSR partnerships and evaluation",
        "Panel talks and pitch sessions"
      ],
      image: "/competition/expost.png",
      special: false,
    },
    {
        id: "drone-race",
        title: "Drone Race",
        description:
          "High-speed drone racing competition testing piloting skills and drone technology.",
        time: "15th October, 2025",
        participants: "Individual",
        prize: "₹25,000",
        difficulty: "Advanced",
        location: "In Front LC girsl Hostel",
        highlights: [
          "FPV racing",
          "Obstacle courses",
          "Speed challenges",
          "Precision flying",
        ],
        image: "/competition/drone.png",
        special: false,
      }
    // {
    //   id: "flight-forge",
    //   title: "FlightForge – Aeromodelling Challenge",
    //   description:
    //     "Design and fly RC aircrafts in two rounds: one for payload capacity and the other for precision drop. A showcase of engineering and control.",
    //   time: "10:00 AM - 4:00 PM",
    //   participants: "Teams of 2–4 (UG/Engineering Students)",
    //   prize: "₹20,000",
    //   difficulty: "Advanced",
    //   location: "C1 Main Ground",
    //   highlights: [
    //     "Payload lift challenge",
    //     "Precision payload drop",
    //     "Aerodynamics application",
    //     "Engineering creativity"
    //   ],
    //   image: "/competition/flight.png",
    //   special: false,
    // },
    
  ],
},
  day2 : {
  title: "Day 2 - Innovation & Robotics",
  date: "October 16, 2025",
  description:
    "Corporate Social Responsibility meets technology for sustainable innovation, alongside robotics and aerial challenges.",
  events: [
    // {
    //   id: "striver-dsa",
    //   title: "Striver DSA Session",
    //   description:
    //     "A live DSA masterclass and career session by Striver (Ex-Google, TakeUForward) focusing on coding interviews, problem-solving, and tech careers.",
    //   time: "14th October, 2025",
    //   participants: "Open to All",
    //   prize: "Certificates & Merchandise",
    //   difficulty: "Intermediate",
    //   location: "Chandigarh University",
    //   highlights: [
    //     "Live DSA roadmap",
    //     "Interview cracking tips",
    //     "Fireside chat",
    //     "Open Q&A session"
    //   ],
    //   image: "/competition/striver.png",
    //   special: false,
    // },
    {
      id: "bgmi-tournament",
      title: "GameX BGMI Tournament",
      description:
        "An adrenaline-packed competitive Battlegrounds Mobile India (BGMI) tournament—test your reflexes, strategies, and squad coordination in the ultimate gaming showdown.",
      time: "15th-17th October, 2025",
      participants: "Solo, Duo & Squad Modes",
      prize: "₹1,00,000",
      difficulty: "Hard",
      location: "Chandigarh University",
      highlights: [
        "Intense squad battles",
        "Strategic gameplay",
        "Knockout and survival rounds",
        "Live leaderboard updates",
        "Professional casting & streaming"
      ],
      image: "/competition/gamebg.png",
      special: true,
    },
    {
      id: "valorant-tournament",
      title: "GameX Valorant Tournament",
      description:
        "An adrenaline-packed competitive Battlegrounds Mobile India (BGMI) tournament—test your reflexes, strategies, and squad coordination in the ultimate gaming showdown.",
      time: "15th-17th October, 2025",
      participants: "Solo, Duo & Squad Modes",
      prize: "₹1,00,000",
      difficulty: "Hard",
      location: "Chandigarh University",
      highlights: [
        "Intense squad battles",
        "Strategic gameplay",
        "Knockout and survival rounds",
        "Live leaderboard updates",
        "Professional casting & streaming"
      ],
      image: "/competition/gameval.png",
      special: true,
    },
    {
      id: "non-tech-treasure-hunt",
      title: "The Order of the Obsidian Quill",
      description:
        "A fantasy-themed non-tech scavenger hunt where players become 'Seekers' navigating through ancient lore, solving puzzles, and reassembling a magical crown.",
      time: "16th October, 2025",
      participants: "Teams of 3–4 | Max 35 Teams",
      prize: "₹20,000",
      difficulty: "Easy",
      location: "B1–B3 Blocks, Library, Fountain Park, Amphitheatre",
      highlights: [
        "6 lore-based stations",
        "Logic & map puzzles",
        "Live skit duels",
        "Fantasy-themed props & storyline",
      ],
      image: "/competition/nontechtr.png",
      special: false,
    },
    
    {
      id: "among-us",
      title: "Among Us Live!",
      description:
        "An interactive live-action version of the famous social deduction game 'Among Us'—full of fun, mystery, and real-time betrayal.",
      time: "15th-17th October, 2025",
      participants: "10–15 players per round",
      prize: "Bragging Rights & Fun Hampers",
      difficulty: "Easy",
      location: "Chandigarh University",
      highlights: [
        "Live-action roleplay",
        "Sabotage and strategy",
        "Group deception and deduction",
        "Rounds with elimination",
      ],
      image: "/competition/among.png",
      special: false,
    },
    {
      id: "panel-discussion",
      title: "Panel Discussion: Viksit Bharat 2047",
      description:
        "An elite panel discussion series covering AI, Quantum Tech, Leadership, and Cybersecurity under the Viksit Bharat 2047 vision.",
      time: "15th-17th October, 2025",
      participants: "Open to All",
      prize: "Knowledge & Certification",
      difficulty: "All Levels",
      location: "Chandigarh University",
      highlights: [
        "AI & Deep Tech Ecosystem",
        "Innovation & Leadership in India",
        "Cybersecurity & Data Privacy",
        "National development vision 2047"
      ],
      image: "/competition/panel.png",
      special: false,
    },
    {
      id: "company-expo",
      title: "Internship & Company Expo",
      description:
        "A career-focused expo where leading companies, startups, and CSR partners showcase innovation, offer internships, and engage directly with students.",
      time: "15th-17th October, 2025",
      participants: "Open to All",
      prize: "Networking, Internship Offers, CSR Collaboration",
      difficulty: "All Levels",
      location: "Chandigarh University",
      highlights: [
        "Live product demos",
        "Company stalls & networking",
        "CSR project mentoring",
        "Panel talks & awards",
      ],
      image: "/competition/expoco.png",
      special: false,
    },
    
  ],
},
  day3: {
    title: "Day 3 - Cultural & Non-Tech",
    date: "October 17, 2025",
    description:
      "Celebrate creativity, culture, and achievements in a grand finale, with diverse non-tech activities.",
    events: [
      
      {
      id: "tech-csr-bootcamp",
      title: "Tech + CSR Bootcamps",
      description:
        "Day-long guided bootcamps focusing on how emerging technologies can drive social change through innovation and corporate responsibility.",
      time: "15th-17th October, 2025",
      participants: "50 Shortlisted Students",
      prize: "Certificates + Internship Shortlisting",
      difficulty: "Intermediate",
      location: "Chandigarh University",
      highlights: [
        "Hands-on CSR prototyping",
        "Mentorship from CSR experts",
        "Social impact brainstorming",
        "Implementation frameworks",
      ],
      image: "/competition/boot.png",
      special: false,
    },
      {
        id: "short-film-making",
        title: "Short Film Making Competition",
        description:
          "Unleash your creativity and tell a compelling story through the art of filmmaking.",
        time: "17th October, 2025",
        participants: "Individual/Teams",
        prize: "Trophies, Certificates",
        difficulty: "Intermediate",
        location: "Chandigarh University",
        highlights: [
          "Scriptwriting",
          "Videography",
          "Editing techniques",
          "Storytelling",
        ],
        image: "/competition/films.png",
        special: false,
      },
      // {
      //   id: "cultural-night",
      //   title: "One Stage One Vibe",
      //   description:
      //     "Grand cultural showcase featuring music, dance, and artistic performances.",
      //   time: "6:00 PM - 10:00 PM",
      //   participants: "Open to All",
      //   prize: "₹50,000",
      //   difficulty: "All Levels",
      //   location: "Main Stage",
      //   highlights: [
      //     "Live performances",
      //     "Cultural diversity",
      //     "Talent showcase",
      //     "Grand finale",
      //   ],
      //   image: "/competition/cultural.png",
      //   special: false,

      // },

      {
        id: "rc-car-race",
        title: "RC Car Race",
        description:
          "Showcase your remote-controlled car driving skills on a challenging obstacle course.",
        time: "17th October, 2025",
        participants: "Individual",
        prize: "Experience & Fun Hampers",
        difficulty: "Intermediate",
        location: "Racing Track",
        highlights: [
          "Precision driving",
          "Speed trials",
          "Custom car builds",
          "Agility challenges",
        ],
        image: "/competition/rc.png",
        special: false,
      },
      
    ],
  },
};

export const sponsors = [
  {
    name: "Google",
    logo: "/api/placeholder/200/100",
    website: "https://google.com",
    description:
      "Leading the future of technology with innovative solutions in cloud computing, AI, and developer tools.",
    partnership: "Principal Technology Partner",
    since: 2020,
    employees: "156,000+",
    focus: ["Cloud Computing", "Artificial Intelligence", "Developer Tools", "Mobile Technology"],
    contribution: "Providing cloud infrastructure and AI services for all hackathon participants",
    benefits: ["$10,000 in Google Cloud credits", "Mentorship sessions", "Priority hiring opportunities"],
  },
  {
    name: "Microsoft",
    logo: "/api/placeholder/200/100",
    website: "https://microsoft.com",
    description: "Empowering every person and organization on the planet to achieve more through cutting-edge technology.",
    partnership: "Cloud Infrastructure Partner",
    since: 2019,
    employees: "220,000+",
    focus: ["Azure Cloud", "Office 365", "AI & Machine Learning", "Enterprise Solutions"],
    contribution: "Azure cloud services and development tools for innovative project development",
    benefits: ["$15,000 in Azure credits", "Technical workshops", "Direct access to Microsoft engineers"],
  },
  {
    name: "Apple",
    logo: "/api/placeholder/200/100",
    website: "https://apple.com",
    description: "Creating innovative products that enrich people's lives and push the boundaries of technology.",
    partnership: "Innovation Partner",
    since: 2021,
    employees: "164,000+",
    focus: ["iOS Development", "Hardware Innovation", "User Experience", "Privacy Technology"],
    contribution: "Supporting mobile app development and user experience innovation",
    benefits: ["iOS development resources", "Design thinking workshops", "App Store promotion opportunities"],
  },
  {
    name: "Amazon",
    logo: "/api/placeholder/200/100",
    website: "https://amazon.com",
    description: "Building the future of e-commerce, cloud computing, and artificial intelligence solutions.",
    partnership: "E-commerce & AWS Partner",
    since: 2018,
    employees: "1,500,000+",
    focus: ["AWS Cloud", "E-commerce", "Logistics", "Machine Learning"],
    contribution: "AWS infrastructure and e-commerce platform integration support",
    benefits: ["$20,000 in AWS credits", "E-commerce APIs", "Logistics optimization tools"],
  },
  {
    name: "Meta",
    logo: "/api/placeholder/200/100",
    website: "https://meta.com",
    description: "Connecting the world through social technology and building the next generation of social experiences.",
    partnership: "Social Innovation Partner",
    since: 2022,
    employees: "86,000+",
    focus: ["Social Media", "VR/AR Technology", "Metaverse", "Community Building"],
    contribution: "VR/AR development kits and social platform integration tools",
    benefits: ["Meta Quest development kits", "AR/VR workshops", "Social media API access"],
  },
  {
    name: "Netflix",
    logo: "/api/placeholder/200/100",
    website: "https://netflix.com",
    description: "Revolutionizing entertainment through streaming technology and original content creation.",
    partnership: "Media Technology Partner",
    since: 2023,
    employees: "12,800+",
    focus: ["Streaming Technology", "Content Delivery", "Data Analytics", "User Experience"],
    contribution: "Streaming technology expertise and content delivery network solutions",
    benefits: ["Streaming APIs", "Content recommendation algorithms", "Media processing tools"],
  },
  {
    name: "Tesla",
    logo: "/api/placeholder/200/100",
    website: "https://tesla.com",
    description:
      "Accelerating the world's transition to sustainable energy through innovative electric vehicles and clean energy solutions.",
    partnership: "Sustainable Technology Partner",
    since: 2023,
    employees: "140,000+",
    focus: ["Electric Vehicles", "Battery Technology", "Autonomous Driving", "Clean Energy"],
    contribution: "Sustainable technology solutions and autonomous driving datasets",
    benefits: ["EV charging network access", "Battery technology insights", "Sustainability workshops"],
  },
  {
    name: "Spotify",
    logo: "/api/placeholder/200/100",
    website: "https://spotify.com",
    description: "Transforming the way people discover and enjoy music through innovative audio streaming technology.",
    partnership: "Audio Technology Partner",
    since: 2024,
    employees: "9,800+",
    focus: ["Audio Streaming", "Music Discovery", "Podcast Technology", "Personalization"],
    contribution: "Audio streaming APIs and music recommendation technology",
    benefits: ["Spotify Web API access", "Audio analysis tools", "Music recommendation engines"],
  },
];

export const timelineEvents = [
  {
    date: "March 13, 2025",
    events: [
      {
        time: "09:00 AM - 10:30 AM",
        title: "Opening Ceremony",
        description: "Official inauguration with keynote speeches from industry leaders",
        location: "Main Auditorium"
      },
      {
        time: "11:00 AM - 05:00 PM",
        title: "Workshop Series",
        description: "Specialized workshops on AI, Blockchain, and Cloud Computing",
        location: "Workshop Halls"
      }
    ]
  },
  {
    date: "March 14, 2025",
    events: [
      {
        time: "09:00 AM - 06:00 PM",
        title: "Coding Contest",
        description: "Individual programming challenge with algorithmic problems",
        location: "Tech Building"
      },
      {
        time: "10:00 AM - 08:00 PM",
        title: "UI/UX Challenge",
        description: "Design competition for creating innovative user interfaces",
        location: "Design Lab"
      }
    ]
  },
  {
    date: "March 15, 2025",
    events: [
      {
        time: "08:00 AM - Next Day",
        title: "24-Hour Hackathon",
        description: "Team-based hackathon to build innovative solutions",
        location: "Main Campus"
      },
      {
        time: "10:00 AM - 06:00 PM",
        title: "AI/ML Showcase",
        description: "Exhibition of artificial intelligence projects",
        location: "Innovation Center"
      }
    ]
  },
  {
    date: "March 16, 2025",
    events: [
      {
        time: "09:00 AM - 04:00 PM",
        title: "Startup Pitch Competition",
        description: "Pitch your startup idea to investors and experts",
        location: "Business Center"
      },
      {
        time: "05:00 PM - 07:00 PM",
        title: "Closing Ceremony & Awards",
        description: "Prize distribution and celebration of achievements",
        location: "Main Auditorium"
      }
    ]
  }
];


export const previousposter = [
  {
    year: "2025",
    image: "/previous_events/postercumun.jpg",
    description: "CUMUN was a student-led Model United Nations conference hosted at Chandigarh University, where participants engaged in debates, diplomacy, and policy-making simulations on pressing global issues across committees like UNGA, UNSC, UNHRC, UNCTAD, and WHO.",
    title: "CUMUN 2025"
  },
  {
    year: "2025",
    image: "/previous_events/postermind.jpg",
    description: "MIND SPRINT was a aptitude-based treasure hunt that blended creativity with critical thinking. Designed to challenge problem-solving skills through logical tasks, it offered an engaging and competitive environment for participants through multiple levels of intellectual challenges.",
    title: "MIND SPRINT"
  },
  {
    year: "2025",
    image: "/previous_events/posterthreejs.jpg",
    description: "The THREE.JS workshop offered a hands-on introduction to 3D web graphics, where students learned to create immersive visual experiences using WebGL and JavaScript. The workshop saw enthusiastic participation from 250+ candidates in a single-day online session.",
    title: "THREE.JS WORKSHOP"
  }
];


export const previousEvents = [
  {
    year: "2024",
    image: "/previous_events/1.jpg",
    title: "CU-MUN ",
    description: "An annual technology festival showcasing the latest innovations and projects by students and professionals.",
    location: "Chandigarh University Campus",
    date: "March 15-17, 2024"
  },
  {
    year: "2024",
    image: "/previous_events/2.jpg",
    title: "Mind Spirint",
    description: "A gathering of industry leaders, startups, and enthusiasts to discuss emerging trends and groundbreaking ideas.",
    location: "Chandigarh University Campus",
    date: "November 10, 2023"
  },
  {
    year: "2024",
    image: "/previous_events/3.jpg",
    title: "Threejs Workshop",
    description: "Exploring advancements in artificial intelligence, machine learning, and their impact on various industries.",
    location: "Online Virtual Event",
    date: "September 20-22, 2023"
  },
  {
    year: "2023",
    image: "/previous_events/4.jpg",
    title: "Robotics Workshop",
    description: "Hands-on sessions teaching robotics fundamentals, programming, and building autonomous robots.",
    location: "TechLab, Chandigarh",
    date: "July 5-7, 2023"
  },
  {
    year: "2023",
    image: "/previous_events/5.jpg",
    title: "Cybersecurity Talk",
    description: "Expert talks and panel discussions focusing on current cybersecurity threats and best defense practices.",
    location: "Cyber Tower, New Delhi",
    date: "May 18, 2023"
  },
  {
    year: "2023",
    image: "/previous_events/6.jpg",
    title: "Blockchain Bootcamp",
    description: "An intensive bootcamp covering blockchain technology, smart contracts, and decentralized apps development.",
    location: "Innovation Hub, Mumbai",
    date: "April 12-15, 2023"
  },
  {
    year: "2023",
    image: "/previous_events/7.jpg",
    title: "IoT Expo",
    description: "Exhibition and talks on Internet of Things devices, applications, and future prospects.",
    location: "Expo Center, Bangalore",
    date: "February 22-24, 2023"
  },
  {
    year: "2022",
    image: "/previous_events/8.jpg",
    title: "Data Science Meetup",
    description: "Community meetup for data scientists to network, share knowledge, and discuss recent data science trends.",
    location: "Tech Park Auditorium, Pune",
    date: "December 10, 2022"
  },
  {
    year: "2022",
    image: "/previous_events/9.jpg",
    title: "Data Science Meetup",
    description: "Community meetup for data scientists to network, share knowledge, and discuss recent data science trends.",
    location: "Tech Park Auditorium, Pune",
    date: "December 10, 2022"
  },
  {
    year: "2022",
    image: "/previous_events/10.jpg",
    title: "Data Science Meetup",
    description: "Community meetup for data scientists to network, share knowledge, and discuss recent data science trends.",
    location: "Tech Park Auditorium, Pune",
    date: "December 10, 2022"
  },
  {
    year: "2022",
    image: "/previous_events/11.jpg",
    title: "Data Science Meetup",
    description: "Community meetup for data scientists to network, share knowledge, and discuss recent data science trends.",
    location: "Tech Park Auditorium, Pune",
    date: "December 10, 2022"
  },
  {
    year: "2022",
    image: "/previous_events/12.jpg",
    title: "Data Science Meetup",
    description: "Community meetup for data scientists to network, share knowledge, and discuss recent data science trends.",
    location: "Tech Park Auditorium, Pune",
    date: "December 10, 2022"
  },
  {
    year: "2022",
    image: "/previous_events/13.jpg",
    title: "Data Science Meetup",
    description: "Community meetup for data scientists to network, share knowledge, and discuss recent data science trends.",
    location: "Tech Park Auditorium, Pune",
    date: "December 10, 2022"
  },

];





export const faqs = [
  {
    question: "When and where is TECHNICIA'25 taking place?",
    answer: "TECHNICIA'25 will be held from October 13-15, 2025 at Chandigarh University Campus, Mohali, Punjab. The venue is equipped with state-of-the-art facilities to ensure all participants have an exceptional experience.",
  },
  {
    question: "How can I register for the event?",
    answer: "Registration can be completed online through our registration page. Simply fill out the form with your details and select the competitions or workshops you wish to participate in.",
  },
  {
    question: "Is there a registration fee?",
    answer: "General admission to TECHNICIA'25 is free, but some competitions and workshops may have a nominal fee. Early bird registrants receive discounted rates. Please check the specific competition or workshop page for fee details.",
  },
  {
    question: "Can international students participate?",
    answer: "Absolutely! TECHNICIA'25 welcomes participants from around the world. International participants may need to arrange their own travel and accommodation, but we offer guidance and may provide special rates with partner hotels.",
  },
  {
    question: "What should I bring to the event?",
    answer: "Participants should bring their own laptops, chargers, and any specific equipment required for their competitions. A valid ID is required for entry. For hackathon participants, we recommend bringing sleeping bags or personal comfort items for the overnight session.",
  },
  {
    question: "Will accommodation be provided?",
    answer: "We do not provide accommodation as part of the registration; however, hostel accommodation is available at ₹200/day (accommodation only) or ₹500/day (accommodation with food).",
  },
  {
    question: "How are the competitions judged?",
    answer: "Each competition has a panel of judges comprised of industry experts, academics, and professionals. Judging criteria vary by competition but generally include innovation, technical implementation, presentation, and practical application. Detailed criteria will be provided to all participants.",
  },
  {
    question: "Is there Wi-Fi available at the venue?",
    answer: "Yes, high-speed Wi-Fi will be available throughout the venue for all participants. The network details will be provided during check-in.",
  },
  {
    question: "Can I participate in multiple competitions?",
    answer: "Yes, you can register for multiple competitions as long as their schedules do not conflict. We recommend checking the event timeline carefully before registering for multiple events.",
  },
  {
    question: "Are there food options available at the venue?",
    answer: "Yes, food courts and cafes will be operating throughout the event. Participants in full-day competitions like the Hackathon will be provided with meals as part of their registration.",
  },
  {
    question: "What programming languages and technologies can I use?",
    answer: "Participants are free to use any programming language or technology stack they prefer. Popular choices include Python, JavaScript, Java, C++, React, Node.js, and various AI/ML frameworks. Our venue provides support for most development environments.",
  },
  {
    question: "Are there workshops available for beginners?",
    answer: "Yes! We have beginner-friendly workshops covering topics like Web Development, Mobile App Development, AI/ML fundamentals, and Cybersecurity basics. These workshops are designed to help newcomers get started with technology.",
  },
  {
    question: "Can I attend if I'm not a student?",
    answer: "TECHNICIA'25 is primarily designed for students and young professionals. However, industry professionals are welcome to attend as mentors, judges, or workshop facilitators. Please contact us for more information about professional participation.",
  },
  {
    question: "Is there a dress code for the event?",
    answer: "There is no strict dress code, but we recommend comfortable casual or smart-casual attire. For presentation rounds, business casual is preferred. Comfortable shoes are recommended as you'll be moving around different venues.",
  },
  {
    question: "What prizes are available for winners?",
    answer: "Winners receive cash prizes, internship opportunities, mentorship programs, and tech gadgets. Grand prize winners also get featured on our platform and may receive job placement assistance. Prize pools vary by competition category.",
  },
  {
    question: "Are there networking opportunities?",
    answer: "Absolutely! TECHNICIA'25 includes dedicated networking sessions, industry meet-and-greets, company showcases, and informal social events. It's a great opportunity to connect with like-minded individuals and potential employers.",
  },
  {
    question: "Can I get a certificate of participation?",
    answer: "Yes, all registered participants will receive a digital certificate of participation. Competition winners and workshop attendees will receive additional certificates recognizing their achievements and completed training.",
  },
 
];

