/*
  Roles we hire for. The Roles page shows all of them.
  The Home page shows the ones marked `featured: true`.
  Icons: pick any name from lucide.dev/icons and import it below.
*/
import type { LucideIcon } from "lucide-react";
import {
  Blocks,
  Bot,
  BriefcaseBusiness,
  Bug,
  ChartLine,
  CircuitBoard,
  Cloud,
  Cpu,
  Database,
  FlaskConical,
  Gamepad2,
  LayoutTemplate,
  Layers,
  Megaphone,
  Network,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
} from "lucide-react";

export type Role = {
  slug: string;
  name: string;
  icon: LucideIcon;
  summary: string;
  featured?: boolean; // shown on the Home page (keep to about 9)
  titles: string[];
  screenFor: string[];
};

export const roles: Role[] = [
  {
    slug: "ai-ml",
    name: "AI / ML Engineers",
    icon: Sparkles,
    featured: true,
    summary: "Engineers who build and ship AI and machine learning products.",
    titles: ["AI Engineer", "Machine Learning Engineer", "Applied Scientist", "MLOps Engineer", "LLM / GenAI Engineer"],
    screenFor: [
      "Has shipped AI features that real people use",
      "Knows how to test models and keep costs down",
      "The right mix of research and product skills for your team",
    ],
  },
  {
    slug: "ml-research",
    name: "ML Researchers",
    icon: FlaskConical,
    summary: "Researchers who build new models and push what AI can do.",
    titles: ["Research Scientist", "ML Researcher", "Research Engineer"],
    screenFor: [
      "Published research or real model breakthroughs",
      "Can turn research into working code",
      "Fits the team's research focus",
    ],
  },
  {
    slug: "data-science",
    name: "Data Scientists",
    icon: ChartLine,
    summary: "Analysts and modelers who turn data into decisions.",
    titles: ["Data Scientist", "Product Data Scientist", "Decision Scientist"],
    screenFor: [
      "Strong stats and experiment design",
      "SQL and Python every day",
      "Explains results in plain English",
    ],
  },
  {
    slug: "backend",
    name: "Backend Engineers",
    icon: Server,
    featured: true,
    summary: "APIs, servers and data systems in Python, Go, Java, Node or Rust.",
    titles: ["Backend Engineer", "Senior Software Engineer", "Staff Engineer", "Founding Engineer"],
    screenFor: [
      "Designs systems that fit your stage",
      "Owns their code from idea to production",
      "Thinks clearly about scale and reliability",
    ],
  },
  {
    slug: "full-stack",
    name: "Full-Stack Engineers",
    icon: Layers,
    featured: true,
    summary: "Builders who own a feature from the database to the screen.",
    titles: ["Full-Stack Engineer", "Product Engineer", "Founding Engineer"],
    screenFor: [
      "Ships complete features quickly",
      "Cares about the product and the customer",
      "Comfortable across your whole stack",
    ],
  },
  {
    slug: "frontend",
    name: "Frontend Engineers",
    icon: LayoutTemplate,
    featured: true,
    summary: "React, Next.js and TypeScript engineers who build fast, polished apps.",
    titles: ["Frontend Engineer", "UI Engineer", "Design Engineer"],
    screenFor: [
      "Builds fast, polished screens",
      "Works well with design and product",
      "Writes components the team can reuse",
    ],
  },
  {
    slug: "devops-platform",
    name: "DevOps & Platform Engineers",
    icon: Cloud,
    featured: true,
    summary: "Cloud, deployments and uptime for teams that ship every day.",
    titles: ["DevOps Engineer", "Platform Engineer", "Site Reliability Engineer", "Infrastructure Engineer"],
    screenFor: [
      "Runs AWS, GCP or Azure in production",
      "Makes builds faster and releases safer",
      "Keeps security and cloud costs in mind",
    ],
  },
  {
    slug: "data",
    name: "Data Engineers",
    icon: Database,
    featured: true,
    summary: "The pipelines and data systems behind your analytics and AI.",
    titles: ["Data Engineer", "Analytics Engineer", "Data Platform Engineer"],
    screenFor: [
      "Builds pipelines you can trust",
      "Knows modern tools like dbt, Snowflake and Spark",
      "Works closely with AI and analytics teams",
    ],
  },
  {
    slug: "mobile",
    name: "Mobile Engineers",
    icon: Smartphone,
    featured: true,
    summary: "iOS, Android and React Native engineers for great mobile apps.",
    titles: ["iOS Engineer", "Android Engineer", "React Native Engineer"],
    screenFor: [
      "Has shipped apps to the App Store or Google Play",
      "Cares about speed and smooth releases",
      "Makes good product calls on a small team",
    ],
  },
  {
    slug: "security",
    name: "Security Engineers",
    icon: ShieldCheck,
    featured: true,
    summary: "Keep your product and cloud safe as you sell to bigger customers.",
    titles: ["Security Engineer", "Application Security Engineer", "Cloud Security Engineer"],
    screenFor: [
      "Hands-on with app and cloud security",
      "Has helped pass SOC 2 or customer security reviews",
      "Adds security without slowing the team down",
    ],
  },
  {
    slug: "qa",
    name: "QA & Test Engineers",
    icon: Bug,
    summary: "Engineers who catch bugs early with automated testing.",
    titles: ["QA Engineer", "Test Automation Engineer", "SDET"],
    screenFor: [
      "Builds automated tests that run on every change",
      "Knows tools like Playwright, Cypress or Selenium",
      "Cares about quality without slowing releases",
    ],
  },
  {
    slug: "embedded",
    name: "Embedded & Firmware Engineers",
    icon: Cpu,
    summary: "Software that runs on devices and chips.",
    titles: ["Embedded Engineer", "Firmware Engineer", "Embedded Software Engineer"],
    screenFor: [
      "C, C++ or Rust on real hardware",
      "Debugs close to the metal",
      "Ships firmware to devices in the field",
    ],
  },
  {
    slug: "hardware",
    name: "Hardware Engineers",
    icon: CircuitBoard,
    summary: "Electronics, circuit boards and physical products.",
    titles: ["Hardware Engineer", "Electrical Engineer", "PCB Design Engineer"],
    screenFor: [
      "Takes boards from design to production",
      "Works well with firmware and manufacturing",
      "Has shipped real devices",
    ],
  },
  {
    slug: "robotics",
    name: "Robotics Engineers",
    icon: Bot,
    summary: "Software and hardware that make robots move and think.",
    titles: ["Robotics Engineer", "Controls Engineer", "Perception Engineer"],
    screenFor: [
      "ROS, controls or computer vision",
      "Tested on real robots, not just simulation",
      "Comfortable across software and hardware",
    ],
  },
  {
    slug: "game",
    name: "Game Developers",
    icon: Gamepad2,
    summary: "Engineers who build games and interactive experiences.",
    titles: ["Game Developer", "Gameplay Engineer", "Graphics Engineer"],
    screenFor: [
      "Unity or Unreal in shipped games",
      "Cares about performance and feel",
      "Works closely with designers and artists",
    ],
  },
  {
    slug: "blockchain",
    name: "Blockchain & Web3 Engineers",
    icon: Blocks,
    summary: "Smart contracts and crypto products that people can trust.",
    titles: ["Smart Contract Engineer", "Blockchain Engineer", "Protocol Engineer"],
    screenFor: [
      "Solidity, Rust or Go in production",
      "Security comes first",
      "Understands how the protocols work",
    ],
  },
  {
    slug: "network",
    name: "Network Engineers",
    icon: Network,
    summary: "Networks that keep teams and products connected.",
    titles: ["Network Engineer", "Network Security Engineer", "Cloud Network Engineer"],
    screenFor: [
      "Designs and runs reliable networks",
      "Cloud and on-site experience",
      "Strong on security and uptime",
    ],
  },
  {
    slug: "solutions",
    name: "Solutions & Sales Engineers",
    icon: BriefcaseBusiness,
    summary: "Technical experts who help customers buy and succeed.",
    titles: ["Solutions Engineer", "Sales Engineer", "Forward Deployed Engineer"],
    screenFor: [
      "Explains complex products simply",
      "Builds demos and proofs of concept",
      "Works well with sales and customers",
    ],
  },
  {
    slug: "devrel",
    name: "Developer Relations",
    icon: Megaphone,
    summary: "Engineers who build community and content for developers.",
    titles: ["Developer Advocate", "DevRel Engineer", "Developer Experience Engineer"],
    screenFor: [
      "Writes great docs, demos and talks",
      "Real coding skills developers respect",
      "Grows a developer community",
    ],
  },
  {
    slug: "leadership",
    name: "Engineering Leaders",
    icon: Users,
    featured: true,
    summary: "Founding engineers, tech leads, managers and heads of engineering.",
    titles: ["Founding Engineer", "Tech Lead", "Engineering Manager", "Head of Engineering", "VP Engineering"],
    screenFor: [
      "Has grown a team at a similar stage",
      "Still close enough to the code to earn respect",
      "Strong judgment on hiring and team culture",
    ],
  },
];
