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
  `companyName` is a placeholder (Company A, B, C…) until real client names can be shared.
*/

export type Job = {
  slug: string;
  title: string;
  role: string;
  companyName: string; // shown on cards and job pages
  companyLogo?: string; // optional, e.g. "/companies/acme.svg" (file in /public/companies/). Without it, a placeholder tile shows
  company: string; // what the company does
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
  posted: string; // date posted, YYYY-MM-DD (newest show first)
  example: boolean;
};

export const jobs: Job[] = [
  {
    slug: "founding-ai-engineer-fintech",
    title: "Founding AI Engineer",
    role: "ai-ml",
    companyName: "Company A",
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
    posted: "2026-10-09",
    example: true,
  },
  {
    slug: "senior-backend-engineer-health-data",
    title: "Senior Backend Engineer",
    role: "backend",
    companyName: "Company B",
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
    posted: "2026-10-08",
    example: true,
  },
  {
    slug: "platform-engineer-devtools",
    title: "Platform Engineer",
    role: "devops-platform",
    companyName: "Company C",
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
    posted: "2026-10-07",
    example: true,
  },
  {
    slug: "senior-frontend-engineer-fintech",
    title: "Senior Frontend Engineer",
    role: "frontend",
    companyName: "Company D",
    company: "Payments for small businesses",
    stage: "Series A",
    location: "Remote (US)",
    workType: "Remote",
    salary: "$165k – $200k",
    equity: "0.1% – 0.2%",
    teamSize: "30 people",
    summary: "Build a beautiful, simple payments app for small business owners.",
    aboutCompany:
      "A Series A fintech that helps small businesses get paid faster. The product is loved for being simple. Design matters a lot here.",
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
    posted: "2026-10-06",
    example: true,
  },
  {
    slug: "machine-learning-engineer-logistics",
    title: "Machine Learning Engineer",
    role: "ai-ml",
    companyName: "Company E",
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
    posted: "2026-10-03",
    example: true,
  },
  {
    slug: "engineering-manager-ai-platform",
    title: "Engineering Manager",
    role: "leadership",
    companyName: "Company F",
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
    posted: "2026-10-10",
    example: true,
  },
  {
    slug: "full-stack-engineer-climate",
    title: "Full-Stack Engineer",
    role: "full-stack",
    companyName: "Company G",
    company: "Climate software for buildings",
    stage: "Seed",
    location: "Boston, MA",
    workType: "Hybrid",
    salary: "$150k – $185k",
    equity: "0.3% – 0.6%",
    teamSize: "9 people",
    summary: "Build the app that helps buildings use less energy.",
    aboutCompany:
      "A seed-stage climate startup. Its software helps building owners track and cut energy use. Early customers include large office buildings.",
    whatYoullDo: [
      "Build features end to end in TypeScript, React and Node",
      "Turn messy building data into clear dashboards",
      "Talk with customers and turn feedback into features",
      "Help shape the product and engineering culture",
    ],
    whatYoullNeed: [
      "3+ years of full-stack experience",
      "React and Node or Python in production",
      "Experience with SQL databases",
      "Excited to work at a very early startup",
    ],
    niceToHave: ["Climate or energy experience", "Data visualization"],
    interviewSteps: ["Intro call with Scalewrk", "Call with the CTO", "Paid one-day project", "Meet the founders"],
    posted: "2026-10-02",
    example: true,
  },
  {
    slug: "senior-data-engineer-ecommerce",
    title: "Senior Data Engineer",
    role: "data",
    companyName: "Company H",
    company: "AI tools for online stores",
    stage: "Series B",
    location: "Chicago, IL",
    workType: "Hybrid",
    salary: "$175k – $210k",
    equity: "0.05% – 0.15%",
    teamSize: "90 people",
    summary: "Build the data pipelines that power AI for thousands of online stores.",
    aboutCompany:
      "A Series B company that helps online stores sell more with AI. It processes data from thousands of shops every day.",
    whatYoullDo: [
      "Build and own data pipelines that move billions of events",
      "Improve the data warehouse and data quality",
      "Work with ML engineers to get training data ready",
      "Make data easy for every team to use",
    ],
    whatYoullNeed: [
      "5+ years of data engineering",
      "Strong SQL and Python",
      "Experience with dbt, Snowflake or BigQuery",
      "Experience with Airflow or a similar tool",
    ],
    niceToHave: ["Spark or Kafka", "E-commerce experience"],
    interviewSteps: ["Intro call with Scalewrk", "Call with the data lead", "Technical interview", "Meet the team"],
    posted: "2026-10-01",
    example: true,
  },
  {
    slug: "senior-ios-engineer-health",
    title: "Senior iOS Engineer",
    role: "mobile",
    companyName: "Company I",
    company: "Health and fitness app",
    stage: "Series A",
    location: "Los Angeles, CA",
    workType: "Hybrid",
    salary: "$170k – $205k",
    equity: "0.1% – 0.25%",
    teamSize: "35 people",
    summary: "Build a top-rated fitness app used by millions of people.",
    aboutCompany:
      "A Series A health startup with a popular fitness app. The team ships often and cares a lot about design and speed.",
    whatYoullDo: [
      "Build new features in Swift and SwiftUI",
      "Make the app fast and smooth on every iPhone",
      "Work with design to polish every detail",
      "Help set up a strong testing and release process",
    ],
    whatYoullNeed: [
      "5+ years of iOS development",
      "Swift and SwiftUI",
      "Apps shipped to the App Store",
      "A strong eye for design",
    ],
    niceToHave: ["HealthKit experience", "Apple Watch apps"],
    interviewSteps: ["Intro call with Scalewrk", "Call with the head of mobile", "Take-home project", "Meet the team"],
    posted: "2026-09-30",
    example: true,
  },
  {
    slug: "security-engineer-b2b-saas",
    title: "Security Engineer",
    role: "security",
    companyName: "Company J",
    company: "HR software for growing companies",
    stage: "Series B",
    location: "Remote (US)",
    workType: "Remote",
    salary: "$180k – $220k",
    equity: "0.05% – 0.12%",
    teamSize: "110 people",
    summary: "Keep customer data safe as the company sells to bigger businesses.",
    aboutCompany:
      "A Series B company whose HR software is used by thousands of businesses. Bigger customers mean tougher security reviews.",
    whatYoullDo: [
      "Own app and cloud security across the company",
      "Lead SOC 2 and customer security reviews",
      "Find and fix security risks with the engineering team",
      "Build simple security tools engineers want to use",
    ],
    whatYoullNeed: [
      "4+ years in security engineering",
      "Hands-on with AWS security",
      "Experience with SOC 2 or ISO 27001",
      "Can explain risks in plain English",
    ],
    niceToHave: ["Experience at a SaaS startup", "Penetration testing"],
    interviewSteps: ["Intro call with Scalewrk", "Call with the CTO", "Security deep dive", "Meet the team"],
    posted: "2026-09-29",
    example: true,
  },
  {
    slug: "staff-backend-engineer-insurance",
    title: "Staff Backend Engineer",
    role: "backend",
    companyName: "Company K",
    company: "Insurance for small businesses",
    stage: "Series C",
    location: "Denver, CO",
    workType: "Hybrid",
    salary: "$215k – $255k",
    equity: "Stock options",
    teamSize: "250 people",
    summary: "Lead the design of systems that price and sell insurance online.",
    aboutCompany:
      "A Series C company that makes buying business insurance simple and fast. It's growing quickly across the US and Canada.",
    whatYoullDo: [
      "Lead the design of key backend systems",
      "Break big projects into clear steps for the team",
      "Mentor senior engineers",
      "Make systems faster and more reliable as the company grows",
    ],
    whatYoullNeed: [
      "8+ years of backend experience",
      "Has led large projects across teams",
      "Strong with Java, Kotlin or Go",
      "Experience with distributed systems",
    ],
    niceToHave: ["Insurance or fintech experience", "Event-driven systems"],
    interviewSteps: ["Intro call with Scalewrk", "Call with the VP of Engineering", "System design interview", "Meet the team"],
    posted: "2026-09-26",
    example: true,
  },
  {
    slug: "founding-full-stack-engineer-legal-ai",
    title: "Founding Full-Stack Engineer",
    role: "full-stack",
    companyName: "Company L",
    company: "AI for legal teams",
    stage: "Seed",
    location: "New York, NY",
    workType: "In office",
    salary: "$160k – $200k",
    equity: "0.75% – 1.5%",
    teamSize: "4 people",
    summary: "Join as the first engineer and build AI tools that save lawyers hours every day.",
    aboutCompany:
      "A seed-stage startup building AI that reads and drafts legal documents. Founded by a former lawyer and an AI researcher.",
    whatYoullDo: [
      "Build the product from the ground up",
      "Choose the tech stack with the founders",
      "Ship AI features that customers use every day",
      "Help hire the next engineers",
    ],
    whatYoullNeed: [
      "4+ years of full-stack experience",
      "TypeScript, React and a backend language",
      "Has built a product from scratch before",
      "Loves working in person with a small team",
    ],
    niceToHave: ["LLM experience", "Legal tech experience"],
    interviewSteps: ["Intro call with Scalewrk", "Coffee with the founders", "Work together for a day", "Offer"],
    posted: "2026-10-09",
    example: true,
  },
  {
    slug: "site-reliability-engineer-fintech",
    title: "Site Reliability Engineer",
    role: "devops-platform",
    companyName: "Company M",
    company: "Business banking",
    stage: "Series C",
    location: "Remote (US)",
    workType: "Remote",
    salary: "$185k – $225k",
    equity: "Stock options",
    teamSize: "300 people",
    summary: "Keep a banking platform up and running for thousands of businesses.",
    aboutCompany:
      "A Series C fintech that offers banking for small and mid-sized businesses. Uptime is critical because customers rely on it to get paid.",
    whatYoullDo: [
      "Keep the platform reliable and fast",
      "Lead incident response and learn from every outage",
      "Build better monitoring and alerts",
      "Automate away repetitive work",
    ],
    whatYoullNeed: [
      "5+ years in SRE or DevOps",
      "Kubernetes and a major cloud provider",
      "Strong monitoring experience (Datadog, Prometheus)",
      "Calm and clear during incidents",
    ],
    niceToHave: ["Fintech or banking experience", "Go or Python"],
    interviewSteps: ["Intro call with Scalewrk", "Call with the SRE lead", "Incident scenario interview", "Meet the team"],
    posted: "2026-09-25",
    example: true,
  },
  {
    slug: "head-of-engineering-proptech",
    title: "Head of Engineering",
    role: "leadership",
    companyName: "Company N",
    company: "Software for property managers",
    stage: "Series A",
    location: "Miami, FL",
    workType: "Hybrid",
    salary: "$230k – $280k",
    equity: "0.5% – 1.0%",
    teamSize: "40 people",
    summary: "Lead and grow the engineering team as the company scales.",
    aboutCompany:
      "A Series A startup that helps property managers run their buildings from one app. It just raised a new round and plans to double the team.",
    whatYoullDo: [
      "Lead a team of 12 engineers and grow it to 25",
      "Set the technical direction with the CEO",
      "Build a strong hiring process",
      "Create a culture where engineers do their best work",
    ],
    whatYoullNeed: [
      "Has led an engineering team of 10 or more",
      "Strong engineering background",
      "Experience hiring and growing managers",
      "Clear communicator with founders and the board",
    ],
    niceToHave: ["Proptech or real estate experience", "Series A to B growth experience"],
    interviewSteps: ["Intro call with Scalewrk", "Call with the CEO", "Meet the leadership team", "Founder dinner"],
    posted: "2026-10-05",
    example: true,
  },
];

// Show the example listings on the site (turn off once you have real jobs)
export const showExampleJobs = true;

export const visibleJobs = jobs
  .filter((j) => !j.example || showExampleJobs)
  .sort((a, b) => b.posted.localeCompare(a.posted)); // newest first

export function latestJobs(count: number) {
  return visibleJobs.slice(0, count);
}

// "2026-10-09" → "Oct 9"
export function formatPosted(date: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}
