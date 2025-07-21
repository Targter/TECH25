// import { picture } from "framer-motion/client";

export const siteConfig = {
  name: "TECHNICIA'25",
  organisation:"ISTE",
  logo:"/logo/logotechnisia.svg",
  
  description: "The biggest tech fest of Asia - Where Innovation Meets Opportunity",
  date: "SEPT 10-12, 2025",
  venue: "Chandigarh University,Mohali",
  email: "gauravthakur83551@gmial.com",
  phone: "6284001268",
  links: {
    twitter: "https://twitter.com/technicia",
    github: "https://github.com/technicia",
    instagram: "https://instagram.com/technicia",
    linkedin: "https://linkedin.com/company/technicia",
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
    time: "09:00 AM - 06:00 PM",
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
  date: "September 10, 2025",
  description:
    "Kick off Technicia'25 with intense tech competitions and insightful discussions.",
  events: [
    {
      id: "hackathon",
      title: "HackChrono: The Technicia’ 48-hour Challenge",
      description:
        "HackChrono is a 48-hour open-source hackathon to build tech-driven solutions for real-world social challenges, especially in NGO and CSR domains.",
      time: "9:00 AM - 9:00 AM (Next Day)",
      participants: "Teams of 2-4 UG/PG Students",
      prize: "₹50,000",
      difficulty: "Advanced",
      location: "D-Block Open Area",
      highlights: [
        "48-hour open-source hackathon",
        "Mentorship rounds & tech talks",
        "Real-world problem statements",
        "Pitch prep and final demos"
      ],
      image: "/competition/hackchrono.png",
    },
    {
      id: "striver-dsa",
      title: "Striver DSA Session",
      description:
        "A live DSA masterclass and career session by Striver (Ex-Google, TakeUForward) focusing on coding interviews, problem-solving, and tech careers.",
      time: "2:00 PM - 4:00 PM",
      participants: "800–1000+ Students",
      prize: "Certificates & Merchandise",
      difficulty: "Intermediate",
      location: "A1 Auditorium",
      highlights: [
        "Live DSA roadmap",
        "Interview cracking tips",
        "Fireside chat",
        "Open Q&A session"
      ],
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: "tech-treasure-hunt",
      title: "VOID Protocol: The Final Code",
      description:
        "An interstellar-themed treasure hunt combining logic puzzles, cryptography, and tech decoding across multiple floors in a race to the final code.",
      time: "10:00 AM - 12:00 PM",
      participants: "Teams of 3–4",
      prize: "₹5,000",
      difficulty: "Intermediate",
      location: "D7 (Seminar Hall)",
      highlights: [
        "Binary & DNA puzzles",
        "QR scavenger hunt",
        "Timed decoding levels",
        "Alien-themed storyline"
      ],
      image: "/competition/treasure_hunt.png",
    },
    {
      id: "tech-expo-student",
      title: "Tech Expo: Student & Industry Innovations",
      description:
        "Tech Expo is a platform for showcasing student innovations alongside company CSR demos, facilitating networking between academia and industry.",
      time: "9:00 AM – 4:30 PM",
      participants: "Individual/Team & Corporate",
      prize: "Best Project Award & Industry Mentorship",
      difficulty: "All Levels",
      location: "Exhibition Hall",
      highlights: [
        "Company stalls and demos",
        "Student prototype exhibition",
        "CSR partnerships and evaluation",
        "Panel talks and pitch sessions"
      ],
      image: "/competition/tech_expo.png",
    },
    {
      id: "panel-discussion",
      title: "Panel Discussion: Viksit Bharat 2047",
      description:
        "An elite panel discussion series covering AI, Quantum Tech, Leadership, and Cybersecurity under the Viksit Bharat 2047 vision.",
      time: "10:00 AM - 5:00 PM",
      participants: "Open to All",
      prize: "Knowledge & Certification",
      difficulty: "All Levels",
      location: "C2 Auditorium",
      highlights: [
        "AI & Deep Tech Ecosystem",
        "Innovation & Leadership in India",
        "Cybersecurity & Data Privacy",
        "National development vision 2047"
      ],
      image: "/competition/ai_panel.png",
    },
    {
      id: "adopt-a-planet",
      title: "Adopt a Planet",
      description:
        "A themed CSR competition where student teams act as intergalactic CSR leaders solving crises on fictional planets with sustainable solutions.",
      time: "10:00 AM - 4:00 PM",
      participants: "Teams of 3",
      prize: "₹18,000",
      difficulty: "Intermediate",
      location: "B3 Seminar Hall",
      highlights: [
        "Story-based problem solving",
        "Sustainable innovation",
        "Team presentations",
        "Judged pitch sessions"
      ],
      image: "/competition/adopt_planet.png",
    },
    {
      id: "flight-forge",
      title: "FlightForge – Aeromodelling Challenge",
      description:
        "Design and fly RC aircrafts in two rounds: one for payload capacity and the other for precision drop. A showcase of engineering and control.",
      time: "10:00 AM - 4:00 PM",
      participants: "Teams of 2–4 (UG/Engineering Students)",
      prize: "₹20,000",
      difficulty: "Advanced",
      location: "C1 Main Ground",
      highlights: [
        "Payload lift challenge",
        "Precision payload drop",
        "Aerodynamics application",
        "Engineering creativity"
      ],
      image: "/competition/flight_forge.png",
    },
    {
      id: "capture-flag",
      title: "Capture The Flag – Technicia: Cyber Crisis Protocol",
      description:
        "A 24-hour Jeopardy-style cybersecurity CTF with challenges across web, crypto, reverse engineering, and forensics. Defend Earth from alien hackers!",
      time: "10:00 AM - 10:00 AM (Next Day)",
      participants: "Teams of 2–4",
      prize: "₹25,000",
      difficulty: "Advanced",
      location: "D Block Closed Area",
      highlights: [
        "CTFd platform with scoreboard",
        "Challenges in 6 cyber domains",
        "Mentorship support",
        "Alien hacking theme"
      ],
      image: "/competition/cft.png",
    }
  ],
},
  day2 : {
  title: "Day 2 - Innovation & Robotics",
  date: "September 11, 2025",
  description:
    "Corporate Social Responsibility meets technology for sustainable innovation, alongside robotics and aerial challenges.",
  events: [
    {
      id: "cumun",
      title: "CUMUN – Chandigarh University Model United Nations",
      description:
        "An intellectually stimulating forum where delegates represent countries and debate global issues through diplomacy, negotiation, and collaboration.",
      time: "9:00 AM - 6:00 PM",
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
      image: "/competition/cumun.png",
    },
    {
      id: "company-expo",
      title: "Internship & Company Expo",
      description:
        "A career-focused expo where leading companies, startups, and CSR partners showcase innovation, offer internships, and engage directly with students.",
      time: "10:00 AM - 4:30 PM",
      participants: "Open to All (Approx. 150–200 Footfall Expected)",
      prize: "Networking, Internship Offers, CSR Collaboration",
      difficulty: "All Levels",
      location: "University Exhibition Center",
      highlights: [
        "Live product demos",
        "Company stalls & networking",
        "CSR project mentoring",
        "Panel talks & awards",
      ],
      image: "/competition/internship_expo.png",
    },
    {
      id: "non-tech-treasure-hunt",
      title: "The Order of the Obsidian Quill",
      description:
        "A fantasy-themed non-tech scavenger hunt where players become 'Seekers' navigating through ancient lore, solving puzzles, and reassembling a magical crown.",
      time: "10:00 AM - 5:00 PM",
      participants: "Teams of 3–4 | Max 35 Teams",
      prize: "Gold/Silver/Bronze Medals, Goodies, Printed Certificates",
      difficulty: "Easy",
      location: "B1–B3 Blocks, Library, Fountain Park, Amphitheatre",
      highlights: [
        "6 lore-based stations",
        "Logic & map puzzles",
        "Live skit duels",
        "Fantasy-themed props & storyline",
      ],
      image: "/competition/obsidian_quill.png",
    },
    {
      id: "among-us",
      title: "Among Us Live!",
      description:
        "An interactive live-action version of the famous social deduction game 'Among Us'—full of fun, mystery, and real-time betrayal.",
      time: "2:00 PM - 5:00 PM",
      participants: "10–15 players per round",
      prize: "Bragging Rights & Fun Hampers",
      difficulty: "Easy",
      location: "Student Activity Zone",
      highlights: [
        "Live-action roleplay",
        "Sabotage and strategy",
        "Group deception and deduction",
        "Rounds with elimination",
      ],
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: "tech-csr-bootcamp",
      title: "Tech + CSR Bootcamps",
      description:
        "Day-long guided bootcamps focusing on how emerging technologies can drive social change through innovation and corporate responsibility.",
      time: "9:00 AM - 5:00 PM",
      participants: "50 Shortlisted Students",
      prize: "Certificates + Internship Shortlisting",
      difficulty: "Intermediate",
      location: "CSR Innovation Center, CU",
      highlights: [
        "Hands-on CSR prototyping",
        "Mentorship from CSR experts",
        "Social impact brainstorming",
        "Implementation frameworks",
      ],
      image: "/placeholder.svg?height=600&width=800",
    },
  ],
},
  day3: {
    title: "Day 3 - Cultural & Non-Tech",
    date: "September 12, 2025",
    description:
      "Celebrate creativity, culture, and achievements in a grand finale, with diverse non-tech activities.",
    events: [
      {
        id: "short-film-making",
        title: "Short Film Making Competition",
        description:
          "Unleash your creativity and tell a compelling story through the art of filmmaking.",
        time: "9:00 AM - 5:00 PM (Submission)",
        participants: "Individual/Teams",
        prize: "₹20,000",
        difficulty: "Intermediate",
        location: "Film Studio / Online Submission",
        highlights: [
          "Scriptwriting",
          "Videography",
          "Editing techniques",
          "Storytelling",
        ],
        image: "/competition/film.png",
      },
      {
        id: "cultural-night",
        title: "One Stage One Vibe",
        description:
          "Grand cultural showcase featuring music, dance, and artistic performances.",
        time: "6:00 PM - 10:00 PM",
        participants: "Open to All",
        prize: "₹50,000",
        difficulty: "All Levels",
        location: "Main Stage",
        highlights: [
          "Live performances",
          "Cultural diversity",
          "Talent showcase",
          "Grand finale",
        ],
        image: "/competition/cultural.png",

      },

      {
        id: "rc-car-race",
        title: "RC Car Race",
        description:
          "Showcase your remote-controlled car driving skills on a challenging obstacle course.",
        time: "1:00 PM - 5:00 PM",
        participants: "Individual",
        prize: "₹15,000",
        difficulty: "Intermediate",
        location: "Racing Track",
        highlights: [
          "Precision driving",
          "Speed trials",
          "Custom car builds",
          "Agility challenges",
        ],
        image: "/competition/rc.png",
      },
      {
        id: "drone-race",
        title: "Drone Race",
        description:
          "High-speed drone racing competition testing piloting skills and drone technology.",
        time: "3:00 PM - 7:00 PM",
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
      },
    ],
  },
};

export const sponsors = [
  {
    name: "TechCorp",
    logo: "https://images.pexels.com/photos/5717479/pexels-photo-5717479.jpeg",
    tier: "platinum",
    website: "https://techcorp.example.com",
  },
  {
    name: "InnovateX",
    logo: "https://images.pexels.com/photos/5849592/pexels-photo-5849592.jpeg",
    tier: "platinum",
    website: "https://innovatex.example.com",
  },
  {
    name: "FutureTech",
    logo: "https://images.pexels.com/photos/6266966/pexels-photo-6266966.jpeg",
    tier: "gold",
    website: "https://futuretech.example.com",
  },
  {
    name: "DigitalWave",
    logo: "https://images.pexels.com/photos/5717410/pexels-photo-5717410.jpeg",
    tier: "gold",
    website: "https://digitalwave.example.com",
  },
  {
    name: "CloudNine",
    logo: "https://images.pexels.com/photos/5717416/pexels-photo-5717416.jpeg",
    tier: "silver",
    website: "https://cloudnine.example.com",
  },
  {
    name: "CodeMasters",
    logo: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg",
    tier: "silver",
    website: "https://codemasters.example.com",
  },
  {
    name: "DevHub",
    logo: "https://images.pexels.com/photos/5849544/pexels-photo-5849544.jpeg",
    tier: "bronze",
    website: "https://devhub.example.com",
  },
  {
    name: "TechStart",
    logo: "https://images.pexels.com/photos/5849551/pexels-photo-5849551.jpeg",
    tier: "bronze",
    website: "https://techstart.example.com",
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
    year: "2024",
    image: "/previous_events/postercumun.jpg",
    description: "CU-MUN was a student-led Model United Nations conference held at Chandigarh University, where participants engage in debates, diplomacy, and policy-making simulations across global issues.",
    title: "CU-MUN"
  },
  {
    year: "2024",
    image: "/previous_events/postermind.jpg",
    description: "MIND-SPIRINT was a student-driven tech fest that blends creativity with innovation through hands-on activities, workshops, and tech challenges focused on real-world problem solving.",
    title: "MIND-SPIRINT"
  },
  {
    year: "2024",
    image: "/previous_events/posterthreejs.jpg",
    description: "The THREE.JS workshop offered a hands-on introduction to 3D web graphics, where students learned to create immersive visual experiences using WebGL and JavaScript.",
    title: "THREE.JS"
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
    answer: "TECHNICIA'25 will be held from March 13-16, 2025, at the Tech Innovation Center in Asia. The venue is equipped with state-of-the-art facilities to ensure all participants have an exceptional experience.",
  },
  {
    question: "How can I register for the event?",
    answer: "Registration can be completed online through our registration page. Simply fill out the form with your details and select the competitions or workshops you wish to participate in. Early bird registration is available until January 31, 2025.",
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
    answer: "We do not provide accommodation as part of the registration, but we have partnered with several nearby hotels to offer discounted rates for participants. Information about these hotels will be shared after registration.",
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
    answer: "TECHNASIA'25 is primarily designed for students and young professionals. However, industry professionals are welcome to attend as mentors, judges, or workshop facilitators. Please contact us for more information about professional participation.",
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
    answer: "Absolutely! TECHNASIA'25 includes dedicated networking sessions, industry meet-and-greets, company showcases, and informal social events. It's a great opportunity to connect with like-minded individuals and potential employers.",
  },
  {
    question: "Can I get a certificate of participation?",
    answer: "Yes, all registered participants will receive a digital certificate of participation. Competition winners and workshop attendees will receive additional certificates recognizing their achievements and completed training.",
  },
 
];
