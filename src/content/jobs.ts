/*
  OPEN ROLES (job listings)
  ─────────────────────────
  Shown on the Jobs page (/jobs) and at /jobs/<slug>.

  These are EXAMPLE listings to preview the layout. They are not real jobs.
  While `showExampleJobs` is true they appear with an "Example listing" label and
  are hidden from Google. To go live:
    1. Replace the jobs below with real ones (keep the same fields).
    2. Set `example: false` on each real job.
    3. Delete the examples you don't need.

  `role` must match a slug in src/content/roles.ts (it picks the icon and filter).
  We describe the company instead of naming it, so clients stay confidential.
*/

export type Job = {
  slug: string;
  title: string;
  role: string;
  company: string;
  stage: string;
  location: string;
  workType: "Remote" | "Hybrid" | "In office";
  salary: string;
  equity?: string;
  teamSize: string;
  summary: string;
  aboutCompany: string;
  whatYoullDo: string[];
  whatYoullNeed: string[];
  niceToHave: string[];
  interviewSteps: string[];
  example: boolean;
};

export const jobs: Job[] = [
  {
    slug: "founding-ai-engineer-fintech",
    title: "Founding AI Engineer",
    role: "ai-ml",
    company: "AI agents for finance teams",
    stage: "Seed",
    location: "Remote (US)",
    workType: "Remote",
    salary: "$170k – $210k",
    equity: "0.5% – 1.0%",
    teamSize: "6 people",
    summary: "Be the first AI engineer. Build agents that close the books for finance teams.",
    aboutCompany:
      "A seed-stage startup building AI agents that do the boring parts of accounting. The founders are ex-fintech engineers. Customers are already paying.",
    whatYoullDo: [
      "Build and ship LLM-powered agents from idea to production",
      "Design ways to test and measure how well the agents work",
      "Work directly with customers to find the next problem to solve",
      "Help hire the next engineers",
    ],
    whatYoullNeed: [
      "4+ years building software, with real AI features in production",
      "Strong Python skills",
      "Experience with LLM APIs, RAG and prompt testing",
      "Comfort working fast with very little process",
    ],
    niceToHave: ["Fintech or accounting experience", "Early-stage startup experience"],
    interviewSteps: ["Intro call with Scalewrk", "Call with the CEO", "Take-home project", "Meet the team"],
    example: true,
  },
  {
    slug: "senior-backend-engineer-health-data",
    title: "Senior Backend Engineer",
    role: "backend",
    company: "Healthcare data platform",
    stage: "Series A",
    location: "New York, NY",
    workType: "Hybrid",
    salary: "$180k – $220k",
    equity: "0.1% – 0.25%",
    teamSize: "25 people",
    summary: "Build the APIs that connect hospitals and health apps.",
    aboutCompany:
      "A Series A startup that helps health apps safely share data with hospitals. The team is growing fast after a new funding round.",
    whatYoullDo: [
      "Design and build APIs used by hospitals and health apps",
      "Make systems fast, reliable and secure",
      "Own services from design to on-call",
      "Mentor other engineers",
    ],
    whatYoullNeed: [
      "5+ years of backend experience",
      "Go, Python or Java in production",
      "Experience with Postgres and cloud services (AWS or GCP)",
      "Care for security and privacy",
    ],
    niceToHave: ["Healthcare data experience (FHIR, HL7)", "HIPAA or SOC 2 experience"],
    interviewSteps: ["Intro call with Scalewrk", "Call with the CTO", "System design interview", "Meet the team"],
    example: true,
  },
  {
    slug: "platform-engineer-devtools",
    title: "Platform Engineer",
    role: "devops-platform",
    company: "Developer tools",
    stage: "Series B",
    location: "San Francisco, CA",
    workType: "Hybrid",
    salary: "$190k – $235k",
    equity: "0.05% – 0.15%",
    teamSize: "80 people",
    summary: "Keep a fast-growing developer platform fast, safe and always on.",
    aboutCompany:
      "A Series B company whose tools are used by thousands of engineering teams. Traffic is growing quickly and the platform team is doubling.",
    whatYoullDo: [
      "Run and improve infrastructure on AWS with Kubernetes",
      "Make builds and deploys faster for every engineer",
      "Improve monitoring so issues are found before customers notice",
      "Keep cloud costs under control",
    ],
    whatYoullNeed: [
      "5+ years in DevOps, SRE or platform roles",
      "Kubernetes and Terraform in production",
      "Experience with CI/CD and monitoring tools",
      "Calm under pressure during incidents",
    ],
    niceToHave: ["Experience at a developer tools company", "Go programming"],
    interviewSteps: ["Intro call with Scalewrk", "Call with the platform lead", "Technical deep dive", "Meet the team"],
    example: true,
  },
  {
    slug: "senior-frontend-engineer-fintech",
    title: "Senior Frontend Engineer",
    role: "frontend",
    company: "Payments for small businesses",
    stage: "Series A",
    location: "Remote (US)",
    workType: "Remote",
    salary: "$165k – $200k",
    equity: "0.1% – 0.2%",
    teamSize: "30 people",
    summary: "Build a beautiful, simple payments app for small business owners.",
    aboutCompany:
      "A Series A fintech that helps small businesses get paid faster. The product is loved for being simple, and design matters a lot here.",
    whatYoullDo: [
      "Build new features in React, Next.js and TypeScript",
      "Work closely with design to make every screen polished",
      "Make the app fast on every device",
      "Help build the shared component library",
    ],
    whatYoullNeed: [
      "5+ years of frontend experience",
      "Expert React and TypeScript",
      "A strong eye for design and detail",
      "Experience shipping to real customers",
    ],
    niceToHave: ["Fintech experience", "Mobile web or React Native"],
    interviewSteps: ["Intro call with Scalewrk", "Call with the head of engineering", "Pair-programming session", "Meet the team"],
    example: true,
  },
  {
    slug: "machine-learning-engineer-logistics",
    title: "Machine Learning Engineer",
    role: "ai-ml",
    company: "Computer vision for logistics",
    stage: "Series C",
    location: "Austin, TX",
    workType: "In office",
    salary: "$185k – $230k",
    equity: "Stock options",
    teamSize: "200 people",
    summary: "Train vision models that run in warehouses across the country.",
    aboutCompany:
      "A Series C company using cameras and AI to make warehouses safer and faster. Its models run in hundreds of locations.",
    whatYoullDo: [
      "Train and improve computer vision models",
      "Build data pipelines for labeling and training",
      "Ship models that run on edge devices",
      "Work with hardware and product teams",
    ],
    whatYoullNeed: [
      "3+ years of machine learning experience",
      "PyTorch and computer vision",
      "Experience taking models to production",
      "Strong Python skills",
    ],
    niceToHave: ["Edge or embedded ML", "Robotics or logistics experience"],
    interviewSteps: ["Intro call with Scalewrk", "Call with the ML lead", "ML technical interview", "Onsite visit"],
    example: true,
  },
  {
    slug: "engineering-manager-ai-platform",
    title: "Engineering Manager",
    role: "leadership",
    company: "AI customer support platform",
    stage: "Series B",
    location: "Seattle, WA",
    workType: "Hybrid",
    salary: "$220k – $260k",
    equity: "0.1% – 0.3%",
    teamSize: "120 people",
    summary: "Lead a team of 8 engineers building AI that answers customer questions.",
    aboutCompany:
      "A Series B company whose AI handles customer support for online stores. The engineering team is growing and needs its next manager.",
    whatYoullDo: [
      "Lead and grow a team of about 8 engineers",
      "Hire great people and help each engineer grow",
      "Work with product to plan what the team builds next",
      "Keep the team shipping fast without burning out",
    ],
    whatYoullNeed: [
      "2+ years managing engineers",
      "A strong engineering background before management",
      "Experience hiring and running 1:1s",
      "Clear and kind communication",
    ],
    niceToHave: ["Experience with AI or ML products", "Time at a fast-growing startup"],
    interviewSteps: ["Intro call with Scalewrk", "Call with the VP of Engineering", "Leadership interview", "Meet the team"],
    example: true,
  },
];

// Show the example listings on the site (turn off once you have real jobs)
export const showExampleJobs = true;

export const visibleJobs = jobs.filter((j) => !j.example || showExampleJobs);
