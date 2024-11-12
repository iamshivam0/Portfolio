import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiMongodb,
  SiHtml5,
  SiCss3,
  SiAmazonaws,
  SiSupabase,
  SiFirebase,
  SiRedux,
  SiGit,
  SiDocker,
  SiBootstrap,
  SiMui,
  SiPrisma,
  SiFlutter,
  SiHeroku,
  SiTailwindcss,
} from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";

export const skills = [
  {
    icon: SiTypescript,
    text: "TypeScript",
  },
  {
    icon: SiJavascript,
    text: "JavaScript",
  },
  {
    icon: SiReact,
    text: "React",
  },
  {
    icon: SiNextdotjs,
    text: "Next.js",
  },
  {
    icon: SiTailwindcss,
    text: "Tailwind CSS",
  },
  {
    icon: SiRedux,
    text: "Redux",
  },
  {
    icon: SiFlutter,
    text: "Flutter",
  },
  {
    icon: SiHtml5,
    text: "HTML5",
  },
  {
    icon: SiCss3,
    text: "CSS3",
  },
  {
    icon: SiNodedotjs,
    text: "Node.js",
  },
  {
    icon: SiExpress,
    text: "Express",
  },
  {
    icon: SiPython,
    text: "Python",
  },
  {
    icon: BiLogoPostgresql,
    text: "PostgreSQL",
  },
  {
    icon: SiMongodb,
    text: "MongoDB",
  },
  {
    icon: SiAmazonaws,
    text: "AWS",
  },
  {
    icon: SiHeroku,
    text: "Heroku",
  },
  {
    icon: SiSupabase,
    text: "Supabase",
  },
  {
    icon: SiFirebase,
    text: "Firebase",
  },
  {
    icon: SiGit,
    text: "Git",
  },
  {
    icon: SiDocker,
    text: "Docker",
  },
  {
    icon: SiPrisma,
    text: "Prisma",
  },
  {
    icon: SiBootstrap,
    text: "Bootstrap",
  },
  {
    icon: SiMui,
    text: "MUI",
  },
];

export type Project = {
  title: string;
  description: string;
  link: string;
  image?: string; // Optional image URL for the project
};

export const projects: Project[] = [
  {
    title: "Seminar-Internship Portal",
    description:
      "A full-stack web application for streamlining internship and seminar data submission and review with a user-friendly portal and role-based access.",
    link: "https://github.com/seminar-internship-portal/sip-frontend",
    image: "/Seminar.png",
  },
  {
    title: "Tulsi Industries Website",
    description:
      "Business website with modern design elements and responsive navigation to strengthen the company’s online presence.",
    link: "https://github.com/pro0-0/TULSI_",
    image: "/Tulsi.png",
  },
  {
    title: "Multi-App",
    description:
      "A multi-purpose web platform that includes a calculator, expense tracker, and Pomodoro timer to enhance productivity , Manage finances effectively and much more",
    link: "https://github.com/iamshivam0/My-app",
    image: "/Multiaap.jpg",
  },
  {
    title: "Smart Grid Optimization",
    description:
      "Integrating Renewable Energy for Sustainable Power Systems. Built predictive models to accurately forecast power generation and assess grid stability.",
    link: "https://github.com/iamshivam0/web_ui_hackwave_frontend",
  },
  {
    title: "Your Academic Helper",
    description:
      "A web platform for academic support, including doubt resolution, group study scheduling, and resource sharing within college.",
    link: "https://github.com/iamshivam0/Your-Academic-Helper",
  },
];

export interface WorkExperience {
  company: string;
  logo: string;
  position: string;
  description: string;
  years: string;
}

export const workExperiences: WorkExperience[] = [
  {
    company: "Tech Mahindra",
    logo: "/techm.jpeg",
    position: "Green IT Engineer",
    description:
      "Focused on AI-driven energy consumption forecasting and LLM-powered sustainable code optimization to enhance efficiency.",
    years: "Oct, 2024 - Present",
  },
  {
    company: "Pune Institute of Computer Technology",
    logo: "/Pict.png",
    position: "Web developer",
    description:
      "Create a seminar Internship portal for the students to submit their seminars and internships and review them.",
    years: "Jan, 2023 - March, 2024",
  },
];

export const aboutYou = {
  name: "Shivam",
  description:
    "👋 Hi, I'm Shivam, a Front-End Developer passionate about creating seamless, visually appealing, and user-friendly web applications. Skilled in C++, JavaScript, React, Node.js, and Next.js.",
  location: "Pune, India",
  email: "shivamchandak9@gmail.com",
  linkedin: "https://www.linkedin.com/in/shivam-chandak-6506a022a/", // replace with actual LinkedIn URL
  github: "https://github.com/iamshivam0", // replace with actual GitHub URL
};

export const logoText = "@shivam";

export const marketingHeadlines = {
  mainHeadline: "Crafting Intuitive, Efficient, and Impactful Web Experiences",
  subHeadline:
    "Building the web with care, creativity, and attention to detail.",
};

export const websiteMetadata = {
  title: "Shivam | Front-End Developer",
  description: "👋 Hey, Shivam here. Welcome to my portfolio and blog.",
};

export type Education = {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  years: string;
  Marks: string;
};

export const educationDetails: Education[] = [
  {
    institution: "Pune Institute of Computer Technology",
    degree: "Bachelor of Technology",
    fieldOfStudy: "Information Technology",
    years: "2021 - 2025",
    Marks: "8.6",
  },
  {
    institution: "SpringDale Jr College",
    degree: "HSC",
    fieldOfStudy: "Science",
    years: "2019 - 2021",
    Marks: " 93%",
  },
  {
    institution: "TCH",
    degree: "SSC",
    fieldOfStudy: "",
    years: "2015 - 2019",
    Marks: "90.2%",
  },
  // Add more education entries as needed
];
