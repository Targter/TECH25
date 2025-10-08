// import { picture } from "framer-motion/client";

export const siteConfig = {
  name: "TECHNICIA'25",
  organisation:"ISTE",
  logo:"/logo/logotechnisia.svg",
  
  description: "The biggest tech fest of North India - Where Innovation Meets Opportunity",
  date: "SEPT 10-12, 2025",
  venue: "Chandigarh University, Mohali",
  email: "iste@cumail.in",
  phone: "+91 123456789",
  links: {
    twitter: "https://x.com/chandigarh_uni?lang=en",
    github: "https://github.com/technicia",
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


export const eventsByDay = {
  day1: {
    title: "Day 1 - Tech Focus",
    date: "October 15, 2025",
    description:
      "Kick off Technicia'25 with intense tech competitions and insightful discussions.",
    events: [
      {
        id: "web-dev-workshop",
        title: "Web Dev Workshop",
        description:
          "Learn modern web development techniques and build dynamic websites using latest technologies.",
        time: "1:30 PM - 4:30 PM",
        participants: "Individual/Teams",
        prize: "Certificates & Learning",
        registrationFees: "Free",
        location: "C3 Seminar Hall",
        highlights: [
          "Modern web development",
          "Hands-on coding",
          "Latest frameworks",
          "Project building"
        ],
        image: "/competition2/web dev.png",
        special: false,
      },
      {
        id: "ai-bootcamp",
        title: "AI Bootcamp",
        description:
          "Intensive AI and machine learning bootcamp covering fundamentals to advanced concepts.",
        time: "2:00 PM - 5:00 PM",
        participants: "Individual/Teams",
        prize: "Certificates & Learning",
        registrationFees: "Free",
        location: "C1 Seminar Hall",
        highlights: [
          "AI fundamentals",
          "Machine learning",
          "Hands-on projects",
          "Industry insights"
        ],
        image: "/competition2/AI.png",
        special: false,
      },
      {
        id: "tech-treasure-hunt",
        title: "VOID Protocol: The Final Code",
        description:
          "An interstellar-themed treasure hunt combining logic puzzles, cryptography, and tech decoding across multiple floors in a race to the final code.",
        time: "1:30 PM onwards",
        participants: "Teams of 3–4",
        prize: "₹3,000",
        registrationFees: "Free",
        location: "D7 Seminar Hall",
        highlights: [
          "Binary & DNA puzzles",
          "QR scavenger hunt",
          "Timed decoding levels",
          "Alien-themed storyline"
        ],
        image: "/competition2/TECH TRESURE HUNT.png",
        special: false,
      },
      {
        id: "cumun",
        title: "CUMUN – Chandigarh University Model United Nations (Day 1)",
        description:
          "First day of an intellectually stimulating forum where delegates represent countries and debate global issues through diplomacy, negotiation, and collaboration.",
        time: "1:30 PM - 6:30 PM",
        participants: "100+ Delegates (Open to All Streams)",
        prize: "₹116,000 Total Cash Pool + Best Delegate Awards",
        registrationFees: "₹1,700 | Outside: ₹3,300",
        location: "Chandigarh University",
        highlights: [
          "UN-style committee simulations",
          "Global policy debate",
          "Leadership and diplomacy",
          "Awards for Best Delegates & Verbal Mentions",
        ],
        image: "/competition/cumun.png",
        special: true,
      },
      {
        id: "short-film-making",
        title: "Short Film Making Competition",
        description:
          "Unleash your creativity and tell a compelling story through the art of filmmaking over 3 days.",
        time: "2:30 PM Onwards (3-day event)",
        participants: "Individual/Teams",
        prize: "₹30,000",
        registrationFees: "Free",
        location: "D1 Auditorium",
        highlights: [
          "Scriptwriting",
          "Videography",
          "Editing techniques",
          "Storytelling",
        ],
        image: "/competition/films.png",
        special: false,
      },
      {
        id: "among-us-day",
        title: "Among Us Live! (Day 1)",
        description:
          "An interactive live-action version of the famous social deduction game 'Among Us'—full of fun, mystery, and real-time betrayal.",
        time: "2:00 PM - 6:00 PM",
        participants: "10–15 players per round",
        prize: "Bragging Rights & Fun Hampers",
        registrationFees: "Free",
        location: "A2 Seminar Hall",
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
        id: "hackathon",
        title: "HackChrono: The Technicia' 48-hour Challenge",
        description:
          "HackChrono is a 48-hour open-source hackathon to build tech-driven solutions for real-world social challenges, especially in NGO and CSR domains.",
        time: "1:30 PM - 1:30 PM (48 hours)",
        participants: "Teams of 2-4 UG/PG Students",
        prize: "₹1,50,000",
        registrationFees: "Registration Closed",
        location: "D7 Open Area",
        highlights: [
          "48-hour open-source hackathon",
          "Mentorship rounds & tech talks",
          "Real-world problem statements",
          "Pitch prep and final demos"
        ],
        image: "/competition/hackathon.png",
        special: true,
      },
    ],
  },
  day2: {
    title: "Day 2 - Innovation & Robotics",
    date: "October 16, 2025",
    description:
      "Corporate Social Responsibility meets technology for sustainable innovation, alongside robotics and aerial challenges.",
    events: [
      {
        id: "startup-launchpad-workshop",
        title: "The Startup LaunchPad Workshop",
        description:
          "Learn how to launch and scale your startup with industry experts and mentors.",
        time: "1:00 PM - 4:00 PM",
        participants: "Individual/Teams",
        prize: "Certificates & Mentorship",
        registrationFees: "Free",
        location: "C1 Seminar Hall",
        highlights: [
          "Startup fundamentals",
          "Business planning",
          "Pitch development",
          "Scaling strategies"
        ],
        image: "/competition/startuplaunch.png",
        special: false,
      },
      {
        id: "adopt-a-planet",
        title: "Adopt a Planet",
        description:
          "A themed CSR competition where student teams act as intergalactic CSR leaders solving crises on fictional planets with sustainable solutions.",
        time: "10:00 AM - 4:00 PM",
        participants: "Teams of 3",
        prize: "Trophies and More",
        registrationFees: "Free",
        location: "D7 Seminar Hall",
        highlights: [
          "Story-based problem solving",
          "Sustainable innovation",
          "Team presentations",
          "Judged pitch sessions"
        ],
       image: "/competition2/adopt.png",
        special: false,
      },
      {
        id: "glider",
        title: "Glider Making Workshop: Lift Your Ideas to the Sky",
        description:
          "The Glider Making Workshop is an exciting hands-on aerodynamics session under Technicia’25.",
        time: "9:00 AM – 5:00 PM ",
        participants: "Individual or 2-member team",
        prize: "Trophies and More",
        registrationFees: "Free",
        location: "C1 Seminar Hall + Hangar + C1 Main Ground",
        highlights: [
          "Story-based problem solving",
          "Sustainable innovation",
          "Team presentations",
          "Judged pitch sessions"
        ],
       image: "/competition2/adopt.png",
        special: false,
      },
      {
        id: "capture-flag",
        title: "Capture The Flag – Technicia: Cyber Crisis Protocol",
        description:
          "A cybersecurity CTF with challenges across web, crypto, reverse engineering, and forensics. Defend Earth from alien hackers!",
        time: "10:00 AM - 10:00 AM (24 Hours)",
        participants: "Teams of 2–4",
        prize: "₹50,000",
        registrationFees: "Free",
        location: "B1 Seminar Hall",
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
        id: "cumun",
        title: "CUMUN – Chandigarh University Model United Nations (Day 2)",
        description:
          "Second day of the intellectually stimulating forum where delegates represent countries and debate global issues through diplomacy, negotiation, and collaboration.",
        time: "9:00 AM - 4:30 PM",
        participants: "100+ Delegates (Open to All Streams)",
        prize: "₹40,000 Total Cash Pool + Best Delegate Awards",
        registrationFees: "₹1,700 | Outside CU: ₹3,300",
        location: "Chandigarh University",
        highlights: [
          "UN-style committee simulations",
          "Global policy debate",
          "Leadership and diplomacy",
          "Awards for Best Delegates & Verbal Mentions",
        ],
        image: "/competition/cumun.png",
        special: true,
      },

      {
        id: "panel-discussion-a",
        title: "Panel Discussion - A",
        description:
          "An elite panel discussion covering AI, Quantum Tech, Leadership, and Cybersecurity under the Viksit Bharat 2047 vision.",
        time: "10:00 AM - 1:00 PM",
        participants: "Open to All",
        prize: "Knowledge & Certification",
        registrationFees: "Free Entry",
        location: "D1 Seminar Hall",
        highlights: [
          "AI & Deep Tech Ecosystem",
          "Innovation & Leadership in India",
          "Cybersecurity & Data Privacy",
          "National development vision 2047"
        ],
        image: "/competition2/Panel Discussion.png",
        special: false,
      },
      {
        id: "rc-car-race",
        title: "RC Car Race",
        description:
          "Showcase your remote-controlled car driving skills on a challenging obstacle course.",
        time: "10:30 AM - 2:00 PM",
        participants: "Individual",
        prize: "₹25,000",
        registrationFees: "₹2,000",
        location: "C1 Main Ground",
        highlights: [
          "Precision driving",
          "Speed trials",
          "Custom car builds",
          "Agility challenges",
        ],
        image: "/competition2/RC CAR RACE_Anjani.png",
        special: true,
      },
      {
        id: "drone-race",
        title: "Drone Race",
        description:
          "High-speed drone racing competition testing piloting skills and drone technology.",
        time: "6:00 PM - 8:30 PM",
        participants: "Individual",
        prize: "₹50,000",
        registrationFees: "₹2,500",
        location: "C1 Main Ground/D1 Parking Area",
        highlights: [
          "FPV racing",
          "Obstacle courses",
          "Speed challenges",
          "Precision flying",
        ],
        image: "/competition2/DRONE RACE.png",
        special: false,
      },
      {
        id: "non-tech-treasure-hunt",
        title: "Non-Tech Treasure Hunt",
        description:
          "A fantasy-themed non-tech scavenger hunt where players become 'Seekers' navigating through ancient lore, solving puzzles, and reassembling a magical crown.",
        time: "9:30 AM - 2:00 PM",
        participants: "Teams of 3–4 | Max 35 Teams",
        prize: "Gold/Silver/Bronze Trophies, Goodies, Printed Certificates",
        registrationFees: "Free",
        location: "In front of A2",
        highlights: [
          "6 lore-based stations",
          "Logic & map puzzles",
          "Live skit duels",
          "Fantasy-themed props & storyline",
        ],
        image: "/competition2/non tech treasure hunt.png",
        special: true,
      },
      {
        id: "among-us-day2",
        title: "Among Us Live! (Day 2)",
        description:
          "An interactive live-action version of the famous social deduction game 'Among Us'—full of fun, mystery, and real-time betrayal.",
        time: "10:00 AM - 6:00 PM",
        participants: "10–15 players per round",
        prize: "Bragging Rights & Fun Hampers",
        registrationFees: "Free",
        location: "A2 Seminar Hall",
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
        id: "gamex-valorant",
        title: "GameX - Valorant Tournament",
        description:
          "Tactical first-person shooter tournament featuring Valorant with team-based strategic combat and agent-based gameplay.",
        time: "8:00 AM - 8:00 PM",
        participants: "Teams of 5 Players",
        prize: "Gaming Rewards & Trophies",
        registrationFees: "₹250 per team",
        location: "D8 Open Area",
        highlights: [
          "Tactical FPS gameplay",
          "Agent-based abilities",
          "Team coordination",
          "Competitive esports format",
        ],
        image: "/competition/gameval.png",
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
        id: "hydrorocket-workshop",
        title: "Hydrorocket Workshop",
        description:
          "Build and launch water rockets while learning principles of propulsion and aerodynamics.",
        time: "9:30 AM - 1:30 PM",
        participants: "Individual/Teams",
        prize: "Trophies",
        registrationFees: "Free",
        location: "D8 Seminar Hall + Hanger + C1 Main Ground",
        highlights: [
          "Rocket construction",
          "Propulsion principles",
          "Launch competitions",
          "Physics applications"
        ],
        image: "/competition2/JAL ASTRA(A.T.).png",
        special: false,
      },
      {
        id: "crime-investigation-workshop",
        title: "Crime Investigation Workshop",
        description:
          "Learn forensic techniques and investigation methods through advanced crime scene analysis.",
        time: "9:30 AM - 12:30 PM",
        participants: "Individual/Teams",
        prize: "Certificates & Learning",
        registrationFees: "Free",
        location: "C3 Seminar Hall",
        highlights: [
          "Advanced forensic techniques",
          "Complex crime scenarios",
          "Investigation methods",
          "Case studies"
        ],
        image: "/competition/Crime .png",
        special: false,
      },
     
      {
        id: "panel-discussion-b",
        title: "Panel Discussion - B",
        description:
          "Continuation of elite panel discussions covering emerging technologies and future innovations.",
        time: "10:00 AM - 1:00 PM",
        participants: "Open to All",
        prize: "Knowledge & Certification",
        registrationFees: "Free Entry",
        location: "D1 Seminar Hall",
        highlights: [
          "Emerging technologies",
          "Future innovations",
          "Industry insights",
          "Career guidance"
        ],
        image: "/competition2/Panel Discussion.png",
        special: false,
      },
      {
        id: "defense-talk",
        title: "Defense Talk - Air Marshal Ravi Krishna Kapoor",
        description:
          "Inspiring talk by Captain Dharamvir Singh on defense services, leadership, and national security.",
        time: "9:30 AM - 12:30 PM",
        participants: "Open to All",
        prize: "Knowledge & Inspiration",
        registrationFees: "Free Entry",
        location: "D1 Audi",
        highlights: [
          "Defense services insights",
          "Leadership lessons",
          "National security awareness",
          "Career opportunities"
        ],
        image: "/competition/defense.png",
        special: false,
      },
      {
        id: "student-expo",
        title: "Student Expo: The Technicia'25 Innovation Showcase",
        description:
          "The Student Expo is a 3-day exhibition at Technicia’25, designed to highlight innovative student projects, prototypes, and start-up ideas.",
        time: "10:00 AM - 2:00 PM",
        participants: "Open to All",
        prize: "Trophies and Certificates",
        registrationFees: "Free Entry",
        location: "D1 Hallway",
        highlights: [
          "Defense services insights",
          "Leadership lessons",
          "National security awareness",
          "Career opportunities"
        ],
        image: "/competition2/student expo.png",
        special: false,
      },
      {
        id: "among-us-day3",
        title: "Among Us Live! (Day 3)",
        description:
          "Final day of the interactive live-action version of the famous social deduction game 'Among Us'.",
        time: "10:00 AM - 2:00 PM",
        participants: "10–15 players per round",
        prize: "Bragging Rights & Fun Hampers",
        registrationFees: "₹50 per person",
        location: "A2 Seminar Hall",
        highlights: [
          "Live-action roleplay",
          "Sabotage and strategy",
          "Group deception and deduction",
          "Final championship rounds",
        ],
        image: "/competition/among.png",
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
    date: "October 20-22, 2023"
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
    answer: "TECHNICIA'25 will be held from October 15-17, 2025 at Chandigarh University Campus, Mohali, Punjab. The venue is equipped with state-of-the-art facilities to ensure all participants have an exceptional experience.",
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
    answer: "We do not provide accommodation as part of the registration; however, hostel accommodation is available at ₹350/day (non-AC accommodation only) or ₹500/day ( AC accommodation with  ₹70 per Meal ).",
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
