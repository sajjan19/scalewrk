/*
  Roles we hire for. Used on the Home page (name + summary)
  and the Roles page (everything).
*/

export type Role = {
  slug: string;
  name: string;
  summary: string;
  titles: string[];
  screenFor: string[];
};

export const roles: Role[] = [
  {
    slug: "ai-ml",
    name: "AI / ML Engineers",
    summary: "LLM, applied ML, and MLOps engineers who get models out of notebooks and into production.",
    titles: ["AI Engineer", "Machine Learning Engineer", "Applied Scientist", "MLOps Engineer", "LLM / GenAI Engineer"],
    screenFor: [
      "Shipped models or LLM features that real users touch",
      "Evaluation, data quality, and cost/latency trade-offs",
      "Research depth vs. product engineering, matched to what you need",
    ],
  },
  {
    slug: "backend",
    name: "Backend Engineers",
    summary: "APIs, distributed systems, and data-heavy services in Python, Go, Java, Node, and Rust.",
    titles: ["Backend Engineer", "Senior Software Engineer", "Staff Engineer", "Founding Engineer"],
    screenFor: [
      "System design that fits your stage, not a FAANG whiteboard",
      "Ownership of services from design through on-call",
      "Clear thinking about scale, reliability, and data models",
    ],
  },
  {
    slug: "full-stack",
    name: "Full-Stack Engineers",
    summary: "Product-minded builders who own features end to end, from the database to the UI.",
    titles: ["Full-Stack Engineer", "Product Engineer", "Founding Engineer"],
    screenFor: [
      "A track record of shipping complete features fast",
      "Product sense and comfort talking to customers",
      "Range across your stack without being shallow",
    ],
  },
  {
    slug: "frontend",
    name: "Frontend Engineers",
    summary: "React, Next.js, and TypeScript engineers who care about craft, performance, and accessibility.",
    titles: ["Frontend Engineer", "UI Engineer", "Design Engineer"],
    screenFor: [
      "Polished, fast interfaces in production",
      "Strong collaboration with design and product",
      "Component systems that scale with the team",
    ],
  },
  {
    slug: "devops-platform",
    name: "DevOps & Platform Engineers",
    summary: "Cloud infrastructure, CI/CD, Kubernetes, and reliability for teams that ship every day.",
    titles: ["DevOps Engineer", "Platform Engineer", "Site Reliability Engineer", "Infrastructure Engineer"],
    screenFor: [
      "AWS, GCP, or Azure in production, with infrastructure as code",
      "Developer experience: faster builds, safer deploys",
      "Security and cost awareness from day one",
    ],
  },
  {
    slug: "data",
    name: "Data Engineers",
    summary: "Pipelines, warehouses, and the data infrastructure behind analytics and ML.",
    titles: ["Data Engineer", "Analytics Engineer", "Data Platform Engineer"],
    screenFor: [
      "Reliable pipelines with testing and observability",
      "Modern data stack experience (dbt, Snowflake, BigQuery, Spark)",
      "Partnering with ML and analytics teams",
    ],
  },
  {
    slug: "mobile",
    name: "Mobile Engineers",
    summary: "iOS, Android, and React Native engineers for consumer and B2B apps.",
    titles: ["iOS Engineer", "Android Engineer", "React Native Engineer"],
    screenFor: [
      "Apps shipped to the App Store and Google Play",
      "Performance, offline, and release discipline",
      "Product judgment on small, fast-moving teams",
    ],
  },
  {
    slug: "security",
    name: "Security Engineers",
    summary: "Application, cloud, and infrastructure security for startups selling to enterprise.",
    titles: ["Security Engineer", "Application Security Engineer", "Cloud Security Engineer"],
    screenFor: [
      "Hands-on AppSec and cloud security, not just policy",
      "SOC 2 and enterprise security review experience",
      "Building security in without slowing engineers down",
    ],
  },
  {
    slug: "leadership",
    name: "Engineering Leadership",
    summary: "Founding engineers, tech leads, engineering managers, and heads of engineering.",
    titles: ["Founding Engineer", "Tech Lead", "Engineering Manager", "Head of Engineering", "VP Engineering"],
    screenFor: [
      "Has built and scaled teams at a similar stage",
      "Still close enough to the code to earn respect",
      "Hiring, process, and culture judgment you can trust",
    ],
  },
];
