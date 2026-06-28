import type { Certification, LinkItem, NavItem, Project, SkillGroup, StatItem, TimelineItem } from "@/types/profile";

export const profile = {
  name: "Harshit Mishra",
  role: "MERN Stack Developer",
  headline: "BCA Student passionate about building full-stack web apps with MongoDB, Express, React & Node.js.",
  location: "Lucknow, Uttar Pradesh, India",
  email: "harshitmis9091@gmail.com",
  linkedin: "https://www.linkedin.com/in/harshit-mishra-a9a8b6364/",
  github: "https://github.com/Harshiltbro-ctrlv",
  leetcode: "https://leetcode.com/u/mish123_harshit/",
  resume: "/resume.pdf",
  avatar: "/profile.jpeg",
  about:
    "I'm a BCA student at National PG College, Lucknow, learning MERN Stack development and building real-world full-stack web applications. I enjoy combining frontend polish with solid backend logic — crafting apps that are fast, responsive, and clean.",
  college: "National PG College, Lucknow",
  degree: "Bachelor of Computer Applications (BCA)",
  note: ""
};

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "LeetCode", href: "#leetcode" },
  { label: "Contact", href: "#contact" }
];

export const socialLinks: LinkItem[] = [
  { label: "LinkedIn", href: profile.linkedin },
  { label: "GitHub", href: profile.github },
  { label: "LeetCode", href: profile.leetcode }
];

export const stats: StatItem[] = [
  { label: "Problems Solved", value: 26, suffix: "+" },
  { label: "LinkedIn Connections", value: 489, suffix: "+" },
  { label: "Technologies Learned", value: 12, suffix: "+" }
];

export const skills: SkillGroup[] = [
  {
    title: "Frontend",
    items: ["React.js", "HTML5", "CSS3", "JavaScript (ES6+)", "Tailwind CSS", "Next.js"]
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "Nodemailer"]
  },
  {
    title: "Database",
    items: ["MongoDB", "Mongoose", "Microsoft SQL Server", "MySQL"]
  },
  {
    title: "Languages",
    items: ["JavaScript", "Python", "C++", "SQL"]
  },
  {
    title: "AI & Tools",
    items: ["Generative AI", "ChatGPT", "Prompt Engineering", "AI Integrations"]
  },
  {
    title: "Dev Tools",
    items: ["Git", "GitHub", "VS Code", "Postman", "Linux", "Blockchain basics"]
  }
];

export const techStack = Array.from(new Set(skills.flatMap((group) => group.items)));

export const experience: TimelineItem[] = [
  {
    title: "Web Development Intern",
    organization: "Kodbud",
    period: "2024 - Present",
    description:
      "Working as a web development intern, building and maintaining web applications using JavaScript and modern frontend technologies. Collaborating with the team to deliver clean, responsive UI components.",
    tags: ["JavaScript", "React", "Frontend Development"]
  },
  {
    title: "MERN Stack Learner",
    organization: "Self-Directed / Personal Projects",
    period: "2023 - Present",
    description:
      "Actively learning and building MERN stack applications — from REST API design with Express and MongoDB, to building full React frontends with state management and authentication flows.",
    tags: ["MongoDB", "Express.js", "React", "Node.js"]
  }
];

export const education: TimelineItem[] = [
  {
    title: "Bachelor of Computer Applications (BCA)",
    organization: "National PG College, Lucknow",
    period: "2023 - 2026",
    description:
      "Studying core computer science subjects including programming, data structures, web development, databases, and software engineering principles.",
    tags: ["Computer Science", "Web Development", "DSA", "Python"]
  },
  {
    title: "Affiliated with Edunet Foundation",
    organization: "Edunet Foundation",
    period: "2024",
    description:
      "Participated in Edunet Foundation programs focused on emerging technologies including AI, Blockchain, and industry-ready development skills.",
    tags: ["AI", "Blockchain", "Industry Skills"]
  }
];

export const projects: Project[] = [
  {
    title: "MERN Full-Stack App",
    description:
      "A full-stack web application built with MongoDB, Express.js, React, and Node.js. Features user authentication with JWT, RESTful API design, and a clean responsive UI.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    technologies: ["MongoDB", "Express.js", "React", "Node.js", "JWT"],
    github: profile.github,
    demo: "#"
  },
  {
    title: "Portfolio Website",
    description:
      "A performance-focused personal brand site with modular sections, motion design, SEO metadata, dark/light mode, and a validated contact workflow built with Next.js.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    technologies: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    github: profile.github,
    demo: "#"
  },
  {
    title: "Generative AI Explorer",
    description:
      "A web app that integrates ChatGPT and Generative AI APIs to let users create, explore, and save AI-generated content with a clean prompt interface.",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=1200&q=80",
    technologies: ["React", "JavaScript", "Generative AI", "ChatGPT API"],
    github: profile.github,
    demo: "#"
  }
];

export const certifications: Certification[] = [
  {
    title: "Generative AI and ChatGPT",
    issuer: "GeeksforGeeks",
    period: "May 2025"
  },
  {
    title: "Introduction to Blockchain Technology and Application",
    issuer: "National PG College",
    period: "Nov 2025"
  },
  {
    title: "JavaScript Fundamentals",
    issuer: "Kodbud — Web Development Internship",
    period: "2024"
  },
  {
    title: "Python Programming",
    issuer: "National PG College",
    period: "2024"
  }
];

export const achievements = [
  "Building real-world MERN stack apps with authentication, REST APIs, and MongoDB as a BCA student.",
  "Solved 26+ problems on LeetCode focusing on strings, arrays, and algorithmic thinking in C++ & Python.",
  "Earned certifications in Generative AI, Blockchain, and completed a JavaScript-focused web development internship at Kodbud."
];

export const leetcodeStats = {
  username: "mish123_harshit",
  profileUrl: "https://leetcode.com/u/mish123_harshit/",
  totalSolved: 26,
  easy: 16,
  medium: 9,
  hard: 1,
  totalEasy: 951,
  totalMedium: 2077,
  totalHard: 949,
  activeDays: 16,
  maxStreak: 3,
  rank: "3,720,062",
  recentProblems: [
    "Remove All Adjacent Duplicates In String",
    "Permutation in String",
    "Remove All Occurrences of a Substring",
    "Valid Palindrome"
  ]
};

export async function fetchLeetcodeLiveStats(username: string = "mish123_harshit") {
  try {
    const response = await fetch(`/api/leetcode?username=${username}`, {
      next: { revalidate: 3600 }, // ISR: revalidate every hour
    });

    if (!response.ok) {
      console.warn("Failed to fetch live stats, using fallback");
      return leetcodeStats;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching live LeetCode stats:", error);
    // Return fallback static data if API fails
    return leetcodeStats;
  }
}
