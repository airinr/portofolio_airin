import airinPhoto from '../assets/airin.jpg'

export interface HeroContent {
  name: string
  photo: string
  description: string
}

export interface SkillContent {
  title: string
  iconKey: string
  description: string
  techStack: string[]
}

export interface AchievementContent {
  title: string
  institution: string
  period: string
  image?: string
}

export interface ProjectContent {
  title: string
  tags: string[]
  desc: string
  status?: string
  github: string
}

export interface PortfolioContent {
  hero: HeroContent
  skills: SkillContent[]
  achievements: AchievementContent[]
  projects: ProjectContent[]
}

export const DEFAULT_CONTENT: PortfolioContent = {
  hero: {
    name: 'Airin Ristiana',
    photo: airinPhoto,
    description:
      "I'm **Airin Ristiana**, a dedicated developer and tech enthusiast. I spend my time at the intersection of **Machine Learning**, **Mobile Development**, and **Web Development**, focusing on creating smart tools that feel intuitive.",
  },
  skills: [
    {
      title: 'Mobile App Dev',
      iconKey: 'phone',
      description:
        'Focusing on crafting high-performance, cross-platform mobile applications. Experienced in designing clean, interactive application architectures deeply integrated with real-time databases and seamless cloud systems.',
      techStack: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore'],
    },
    {
      title: 'Web Development',
      iconKey: 'monitor',
      description:
        'Building modern, highly interactive, and responsive web interfaces. Scaled frontend components alongside optimized build utilities and custom web dashboards connected to rapid backend infrastructures.',
      techStack: ['React.js', 'Vite.js', 'JavaScript', 'Tailwind CSS'],
    },
    {
      title: 'Machine Learning',
      iconKey: 'brain',
      description:
        'Implementing applied artificial intelligence solutions to deliver real-world impact. Focused on engineering data architectures using classification models and prediction logic to evaluate physiological or complex datasets.',
      techStack: ['Python', 'FastAPI'],
    },
    {
      title: 'IoT Engineering',
      iconKey: 'cpu',
      description:
        'Bridging the physical world with digital intelligence. Highly proficient in microcontrollers configuration, parsing real-time biometrics or motion data feeds, and controlling responsive physical mechanisms smoothly.',
      techStack: ['ESP32', 'ESP8266', 'IoT Components'],
    },
  ],
  achievements: [
    {
      title: 'Top 10 Finalist — Samsung Innovation Campus',
      institution:
        'National innovation program. Developed CalmiSense, an AI-integrated wearable device built with an ESP32 for early physiological and biometrics monitoring.',
      period: '2025 - 2026',
    },
    {
      title: 'Cisco Certified Network Associate (CCNA)',
      institution:
        'Cisco Global Certification. Validating comprehensive knowledge in network fundamentals, IP connectivity, security fundamentals, and automation.',
      period: '2026',
    },
    {
      title: 'Top 40 Coder — National Coding Competition',
      institution:
        'Recognized among the top 40 software engineering and competitive programming talents at the national level.',
      period: '2025',
    },
    {
      title: 'Sertifikasi Kompetensi BNSP — Junior Web Developer',
      institution:
        'Badan Nasional Sertifikasi Profesi (BNSP) Indonesia. Certified professional competency in designing responsive interfaces, implementing database architectures, and engineering secure web application logic.',
      period: '2025',
    },
  ],
  projects: [
    {
      title: 'CalmiSense',
      tags: ['IoT', 'ML', 'React'],
      desc: 'A wearable device for early panic detection in children with ASD, utilizing ESP32 and AI prediction.',
      status: 'Top 10 Samsung Innovation Campus',
      github: 'https://github.com/airinr/wearable_device_asd',
    },
    {
      title: 'Smart Cashier AI',
      tags: ['Python', 'FastAPI', 'ML', 'React'],
      desc: 'Intelligent cashier system for diamond stores with buying and selling price prediction features.',
      github: 'https://github.com/airinr/diamond_cashier',
    },
    {
      title: 'Smart Hospital Queue',
      tags: ['Python', 'FastAPI', 'ML', 'React'],
      desc: 'An intelligent hospital queue management system that integrates Machine Learning algorithms to provide real-time patient wait-time predictions.',
      github: 'https://github.com/airinr/hospital_queue_prediction',
    },
  ],
}
