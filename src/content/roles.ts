/*
  Roles we hire for. Used on the Home page (icon + name + summary)
  and the Roles page (everything).
  Icons: pick any name from lucide.dev/icons and import it below.
*/
import type { LucideIcon } from "lucide-react";
import { BrainCircuit, Cloud, Database, LayoutTemplate, Layers, Server, ShieldCheck, Smartphone, Users } from "lucide-react";

export type Role = {
  slug: string;
  name: string;
  icon: LucideIcon;
  summary: string;
  titles: string[];
  screenFor: string[];
};

export const roles: Role[] = [
  {
    slug: "ai-ml",
    name: "AI / ML Engineers",
    icon: BrainCircuit,
    summary: "Engineers who build and ship AI and machine learning products.",
    titles: ["AI Engineer", "Machine Learning Engineer", "Applied Scientist", "MLOps Engineer", "LLM / GenAI Engineer"],
    screenFor: [
      "Has shipped AI features that real people use",
      "Knows how to test models and keep costs down",
      "The right mix of research and product skills for your team",
    ],
  },
  {
    slug: "backend",
    name: "Backend Engineers",
    icon: Server,
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
    summary: "Keep your product and cloud safe as you sell to bigger customers.",
    titles: ["Security Engineer", "Application Security Engineer", "Cloud Security Engineer"],
    screenFor: [
      "Hands-on with app and cloud security",
      "Has helped pass SOC 2 or customer security reviews",
      "Adds security without slowing the team down",
    ],
  },
  {
    slug: "leadership",
    name: "Engineering Leaders",
    icon: Users,
    summary: "Founding engineers, tech leads, managers and heads of engineering.",
    titles: ["Founding Engineer", "Tech Lead", "Engineering Manager", "Head of Engineering", "VP Engineering"],
    screenFor: [
      "Has grown a team at a similar stage",
      "Still close enough to the code to earn respect",
      "Strong judgment on hiring and team culture",
    ],
  },
];
