// Avinash Dark Portfolio Starter – Single-file React component
// Stack: React + Tailwind classes (no external UI libs). Drop into any React/Next/Astro island.
// Design: dark, elegant, subtle neon accents, micro-interactions, accessible.

'use client';

import React from "react";
import { ElementType } from "react";
import { Icon as Iconify } from "@iconify/react";
import Image from "next/image";

// -----------------------------
// Inline SVG Icons (no external deps)
// -----------------------------
const Icon = {
  Github: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M12 2C6.477 2 2 6.486 2 12.022c0 4.426 2.865 8.178 6.84 9.504.5.093.682-.218.682-.484 0-.239-.009-.871-.014-1.71-2.782.607-3.37-1.343-3.37-1.343-.454-1.155-1.11-1.463-1.11-1.463-.908-.622.069-.609.069-.609 1.004.071 1.532 1.034 1.532 1.034.892 1.53 2.341 1.088 2.91.833.091-.649.35-1.089.636-1.339-2.221-.254-4.556-1.114-4.556-4.954 0-1.094.39-1.988 1.03-2.688-.103-.254-.447-1.277.097-2.663 0 0 .84-.27 2.75 1.027a9.471 9.471 0 0 1 2.504-.338c.85.004 1.705.116 2.504.338 1.91-1.296 2.749-1.027 2.749-1.027.545 1.386.201 2.409.099 2.663.64.7 1.028 1.594 1.028 2.688 0 3.85-2.338 4.698-4.566 4.947.36.311.682.926.682 1.867 0 1.349-.012 2.436-.012 2.769 0 .269.18.582.688.483A10.03 10.03 0 0 0 22 12.022C22 6.486 17.523 2 12 2Z"/>
    </svg>
  ),
  Linkedin: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.329-.024-3.039-1.852-3.039-1.853 0-2.136 1.447-2.136 2.942v5.666H9.352V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.368-1.852 3.601 0 4.268 2.37 4.268 5.456v6.287ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM3.56 20.452h3.554V9H3.56v11.452Z"/>
    </svg>
  ),
  Mail: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.236-8 4.999-8-5V6l8 5 8-5v2.236Z"/>
    </svg>
  ),
  ArrowRight: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M13.172 7.757 11.757 9.17l1.586 1.586H4v2h9.343l-1.586 1.586 1.415 1.414 4-4-4-4Z"/>
    </svg>
  ),
  External: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M14 3h7v7h-2V6.414l-9.293 9.293-1.414-1.414L17.586 5H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z"/>
    </svg>
  ),
  File: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm4 18H6V4h7v5h5v11Z"/>
    </svg>
  ),
};

// -----------------------------
// Helpers
// -----------------------------
function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-8">
    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#E9EDF7]">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-2 text-sm md:text-base text-[#A6B1C2] max-w-2xl">{subtitle}</p>
    )}
  </div>
);

type NeonButtonProps =
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" })
  | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a"; href: string });

const NeonButton: React.FC<NeonButtonProps> = ({ as = "button", className, children, ...props }) => {
  const Tag = as === "a" ? "a" : "button";

  const base =
    "relative inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-transform duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#48B7FF] focus-visible:ring-offset-transparent";

  return (
    <Tag
      className={cn(
        base,
        "bg-[#101826] border border-[#1E2633] text-[#E9EDF7] hover:scale-[1.02]",
        className
      )}
      {...(props as any)}
    >
      {children}
      <span className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">
        <Icon.ArrowRight className="w-4 h-4" />
      </span>
    </Tag>
  );
};



// Card tilt effect
function useTilt() {
  const ref = React.useRef<HTMLDivElement>(null);
  function onMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateX = ((y - midY) / midY) * -4; // subtle tilt
    const rotateY = ((x - midX) / midX) * 4;
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }
  function onMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
  }
  return { ref, onMouseMove, onMouseLeave };
}

const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-[#233043] bg-[#0F141B] px-2.5 py-1 text-xs text-[#B9C4D6]">
    {children}
  </span>
);

// -----------------------------
// Data (edit these)
// -----------------------------
const LINKS = {
  resume: "/resume.pdf", // Replace with your hosted PDF path
  github: "https://github.com/avinashpush",
  linkedin: "https://www.linkedin.com/in/avinashpushparaj/",
  email: "mailto:avi.pushparaj7@gmail.com",
};

const PROJECTS = [
  {
    title: "BallKnowledgeCrew",
    blurb:
      "End-to-end player prop analytics platform delivering daily forecasts; engineered data ingestion, matchup metrics, and backtesting.",
    impact: ["70% hit rate", "100+ Discord community", "50K TikTok views"],
    tags: ["Python", "Pandas", "XGBoost", "Backtesting", "APIs"],
    links: { demo: "#", code: "#" },
    media: null,
  },
  {
    title: "CheffUp iOS App",
    blurb:
      "SwiftUI app for friend-based meal sharing with lock-to-post flows and calendar history; Firebase backend with timezone FCM reminders.",
    impact: ["Serverless Firebase", "Real-time feed", "Per-user notifications"],
    tags: ["SwiftUI", "Firebase", "FCM", "MVVM"],
    links: { demo: "#", code: "#" },
    media: null,
  },
  {
    title: "Real-Time Stock Dashboard",
    blurb:
      "Streamlit dashboard reading Yahoo Finance API, computing SMA/EMA, and rendering interactive multi-timeframe charts.",
    impact: ["Tech indicators", "Interactive charts"],
    tags: ["Python", "Streamlit", "Plotly", "Yahoo Finance API"],
    links: { demo: "#", code: "https://github.com/avinashpush/Stock-Dashboard" },
    media: null,
  },
];

const EXPERIENCE = [
  {
    org: "Barclays",
    role: "Software Engineering Intern – Security & Encryption",
    time: "Jun 2025 – Aug 2025",
    bullets: [
      "Designed secure RESTful APIs for key management (Spring Boot, Java).",
      "Owned backend lifecycle; provisioning, DTOs, dynamic filtering; CI/CD via Jenkins; deployed on OpenShift.",
    ],
    logoSrc: "/logos/barclays.png",
  },
  {
    org: "SuperAnnotate",
    role: "AI Data Trainer",
    time: "Apr 2024 – Jul 2024",
    bullets: [
      "Crafted 50+ prompts; improved LLM training efficiency by 15%.",
      "Evaluated 100+ AI responses to improve accuracy across contexts.",
    ],
    logoSrc: "/logos/superannotate.png",
  },
  {
    org: "The Cell Theatre",
    role: "Software Engineer",
    time: "Mar 2024 – Jun 2024",
    bullets: [
      "Automated extraction/organization of 650+ contacts using Python (pandas, regex).",
      "Built Airtable CRM; reduced processing time by 80%.",
    ],
    logoSrc: "/logos/celltheatre.png",
  },
];

const SKILLS: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "Java", "C++", "R", "SQL", "JavaScript", "TypeScript"] },
  { group: "Frameworks & Libraries", items: ["Spring Boot", "React", "Node.js", "Django", "Flask", "TensorFlow", "PyTorch", "scikit-learn", "pandas", "NumPy"] },
  { group: "Tools & Cloud", items: ["Git", "AWS", "Jenkins", "OpenShift", "REST APIs", "MySQL"] },
];

// -----------------------------
// Sections
// -----------------------------
const Nav: React.FC = () => (
  <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-[#0B0F14]/70 border-b border-[#1E2633]">
    <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
      <a href="#home" className="text-sm font-semibold tracking-wider text-[#A6B1C2] hover:text-[#E9EDF7]">
        AP
      </a>
      <nav className="hidden md:flex items-center gap-6 text-sm text-[#A6B1C2]">
        {[
          ["Projects", "#projects"],
          ["Experience", "#experience"],
          ["Skills", "#skills"],
          ["About", "#about"],
          ["Contact", "#contact"],
        ].map(([label, href]) => (
          <a key={label} href={href} className="hover:text-[#E9EDF7] transition-colors">
            {label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <a href={LINKS.github} className="p-2 rounded-lg border border-[#1E2633] text-[#B9C4D6] hover:text-[#E9EDF7] hover:border-[#2A3A52] transition" aria-label="GitHub">
          <Icon.Github className="w-5 h-5" />
        </a>
        <a href={LINKS.linkedin} className="p-2 rounded-lg border border-[#1E2633] text-[#B9C4D6] hover:text-[#E9EDF7] hover:border-[#2A3A52] transition" aria-label="LinkedIn">
          <Icon.Linkedin className="w-5 h-5" />
        </a>
        <a
          href="#"
          className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-[#1E2633] bg-[#101826] px-3 py-2 text-sm text-[#7D8AA3] cursor-not-allowed"
          onClick={(e) => e.preventDefault()}
        >
        <Icon.File className="w-4 h-4" /> Resume (soon)
        </a>
      </div>
    </div>
  </header>
);

const Hero: React.FC = () => (
  <section id="home" className="relative overflow-hidden">
    {/* Background texture & orb */}
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full blur-3xl" style={{
        background: "radial-gradient(closest-side, rgba(72,183,255,0.35), transparent 70%)",
      }} />
      <div className="absolute bottom-[-12rem] left-[-8rem] h-96 w-96 rounded-full blur-3xl" style={{
        background: "radial-gradient(closest-side, rgba(34,211,238,0.25), transparent 70%)",
      }} />
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }} />
    </div>

    <div className="mx-auto max-w-6xl px-4 pt-16 pb-20">
      <div className="grid md:grid-cols-2 items-center gap-10">
        <div>
          <p className="text-xs tracking-[0.25em] text-[#7D8AA3] uppercase">Software Engineer • Data Scientist</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold leading-tight text-[#E9EDF7]">
            Avinash Pushparaj
          </h1>
          <p className="mt-4 text-[#A6B1C2] max-w-xl">
            Building scalable software & data systems — backend APIs, ML pipelines, and real-time analytics.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#"
              className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-[#1E2633] bg-[#101826] px-3 py-2 text-sm text-[#7D8AA3] cursor-not-allowed"
              onClick={(e) => e.preventDefault()}
            >
            <Icon.File className="w-4 h-4" /> Resume (soon)
            </a>
            <a href={LINKS.github} className="inline-flex items-center gap-2 rounded-xl border border-[#1E2633] px-4 py-2 text-sm text-[#E9EDF7] hover:scale-[1.02] transition">
              <Icon.Github className="w-4 h-4"/> GitHub
            </a>
            <a href={LINKS.linkedin} className="inline-flex items-center gap-2 rounded-xl border border-[#1E2633] px-4 py-2 text-sm text-[#E9EDF7] hover:scale-[1.02] transition">
              <Icon.Linkedin className="w-4 h-4"/> LinkedIn
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="mx-auto h-64 w-64 md:h-80 md:w-80 rounded-3xl border border-[#1E2633] bg-gradient-to-br from-[#0E1A2A] via-[#0B0F14] to-[#0F141B] shadow-[0_0_40px_rgba(72,183,255,0.08)] backdrop-blur flex items-center justify-center">
            <Image
              src="/profile.jpg"   // <-- put your file in /public/profile.jpg
              alt="Avinash Pushparaj"
              width={320}          // matches h-80 w-80 at md breakpoint
              height={320}
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Projects: React.FC = () => (
  <section id="projects" className="mx-auto max-w-6xl px-4 py-16">
    <SectionTitle title="Featured Projects" subtitle="High-impact, engineering-focused work with measurable outcomes." />
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {PROJECTS.map((p) => (
        <ProjectCard key={p.title} {...p} />
      ))}
    </div>
  </section>
);

const ProjectCard: React.FC<(typeof PROJECTS)[number]> = ({ title, blurb, impact, tags, links }) => {
  const { ref, onMouseLeave, onMouseMove } = useTilt();
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative rounded-2xl border border-[#1E2633] bg-[#0F141B] p-5 transition will-change-transform hover:shadow-[0_0_40px_rgba(72,183,255,0.10)]"
    >
      <div className="aspect-video w-full rounded-xl bg-gradient-to-tr from-[#0E1A2A] to-[#101826] mb-4 border border-[#1E2633]" />
      <h3 className="text-lg font-semibold text-[#E9EDF7]">{title}</h3>
      <p className="mt-2 text-sm text-[#A6B1C2] min-h-[56px]">{blurb}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {impact.map((m) => (
          <Badge key={m}>{m}</Badge>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((t) => (
          <span key={t} className="text-xs text-[#7D8AA3]">#{t}</span>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-3">
        {links.code && (
          <a href={links.code} className="text-sm inline-flex items-center gap-2 text-[#48B7FF] hover:underline">
            Code <Icon.External className="w-4 h-4" />
          </a>
        )}
        {links.demo && (
          <a href={links.demo} className="text-sm inline-flex items-center gap-2 text-[#48B7FF] hover:underline">
            Demo <Icon.External className="w-4 h-4" />
          </a>
        )}
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100" style={{
        background: "radial-gradient(600px 200px at 0% 0%, rgba(72,183,255,0.08), transparent), radial-gradient(600px 200px at 100% 100%, rgba(34,211,238,0.06), transparent)",
      }} />
    </div>
  );
};

const Experience: React.FC = () => (
  <section id="experience" className="mx-auto max-w-6xl px-4 py-16">
    <SectionTitle title="Experience" subtitle="Professional roles with ownership across backend, data, and AI." />
    <div className="relative">
      <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#1E2633] to-transparent" aria-hidden />
      <div className="space-y-8">
        {EXPERIENCE.map((e) => (
          <div key={e.org} className="relative pl-12 md:pl-16">
            <div className="absolute left-2.5 md:left-4 top-1.5 h-3 w-3 rounded-full bg-[#48B7FF] shadow-[0_0_0_4px_rgba(72,183,255,0.15)]" aria-hidden />
            <div className="rounded-2xl border border-[#1E2633] bg-[#0F141B] p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base md:text-lg font-semibold text-[#E9EDF7]">{e.role} · {e.org}</h3>
                <span className="text-xs text-[#7D8AA3]">{e.time}</span>
              </div>
              <ul className="mt-3 list-disc pl-5 text-sm text-[#A6B1C2] space-y-2">
                {e.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);



// Map each skill name to an Iconify icon name
const ICON_MAP: Record<string, string> = {
  // Languages
  Python: "logos:python",
  Java: "logos:java",
  "C++": "logos:c-plusplus",
  R: "logos:r-lang",
  SQL: "logos:mysql",             // or swap to "logos:postgresql"
  JavaScript: "logos:javascript",
  TypeScript: "logos:typescript-icon",

  // Frameworks & Libraries
  "Spring Boot": "logos:spring-icon",
  React: "logos:react",
  "Node.js": "logos:nodejs-icon",
  Django: "logos:django-icon",
  Flask: "logos:flask",
  TensorFlow: "logos:tensorflow",
  PyTorch: "logos:pytorch-icon",
  "scikit-learn": "logos:scikit-learn",
  pandas: "logos:pandas",
  NumPy: "logos:numpy",

  // Tools & Cloud
  Git: "logos:git-icon",
  AWS: "logos:aws",
  Jenkins: "logos:jenkins",
  OpenShift: "logos:openshift",
  "REST APIs": "logos:swagger",
  MySQL: "logos:mysql",
};

function SkillLogo({ name }: { name: string }) {
  const icon = ICON_MAP[name];
  if (!icon) {
    // Fallback placeholder if not mapped
    return (
      <span className="h-6 w-6 rounded-md bg-gradient-to-br from-[#0E1A2A] to-[#13263C] border border-[#1E2633] shadow-inner" />
    );
  }
  return <Iconify icon={icon} width="24" height="24" className="shrink-0" />;
}


const Skills: React.FC = () => (
  <section id="skills" className="mx-auto max-w-6xl px-4 py-16">
    <SectionTitle
      title="Skills"
      subtitle="A quick snapshot of the tools and technologies I use most."
    />
    <div className="grid md:grid-cols-3 gap-6">
      {SKILLS.map((g) => (
        <div
          key={g.group}
          className="rounded-2xl border border-[#1E2633] bg-[#0F141B] p-5"
        >
          <h4 className="text-sm font-semibold text-[#E9EDF7]">{g.group}</h4>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {g.items.map((s) => (
              <div
                key={s}
                className="group flex items-center gap-3 rounded-xl border border-[#233043] bg-[#101826] px-3 py-2"
              >
                <SkillLogo name={s} />
                <span className="text-sm text-[#B9C4D6] group-hover:text-[#E9EDF7] transition-colors">
                  {s}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);


const About: React.FC = () => (
  <section id="about" className="mx-auto max-w-6xl px-4 py-16">
    <SectionTitle
      title="About"
      subtitle="CS & Data Science @ Rutgers (GPA 3.9). I enjoy building backend systems, ML pipelines, and practical AI tools."
    />
    <div className="grid md:grid-cols-[240px,1fr] gap-6 items-start">
      {/* Profile image card */}
      <div className="h-40 w-40 rounded-2xl border border-[#1E2633] bg-gradient-to-br from-[#0E1A2A] to-[#101826] overflow-hidden">
        <Image
          src="/profile.jpg"           // put your image at /public/profile.jpg
          alt="Avinash Pushparaj"
          width={240}
          height={240}
          className="h-full w-full object-cover"
          priority
        />
      </div>

      {/* Bio text */}
      <div className="text-[#A6B1C2] space-y-3 text-sm leading-relaxed">
        <p>
          I focus on pragmatic engineering: shipping secure APIs, instrumented data processing,
          and measurable model improvements. Recent work spans Spring Boot services, Spark/ML
          workflows, and real-time dashboards.
        </p>
        <p>
          I like clear problem statements, fast iteration, and clean documentation. When I’m not
          coding, I’m probably watching the NBA or exploring new food spots.
        </p>
      </div>
    </div>
  </section>
);


const Contact: React.FC = () => (
  <section id="contact" className="mx-auto max-w-6xl px-4 py-16">
    <div className="rounded-3xl border border-[#1E2633] bg-gradient-to-br from-[#0E1A2A] via-[#0B0F14] to-[#0F141B] p-8 text-center shadow-[0_0_60px_rgba(72,183,255,0.08)]">
      <h3 className="text-2xl md:text-3xl font-semibold text-[#E9EDF7]">Let’s build something great</h3>
      <p className="mt-2 text-sm text-[#A6B1C2]">Open to SWE/ML/Data roles, internships, and collaborations.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <a href={LINKS.email} className="inline-flex items-center gap-2 rounded-xl border border-[#1E2633] bg-[#101826] px-4 py-2 text-sm text-[#E9EDF7] hover:scale-[1.02] transition">
          <Icon.Mail className="w-4 h-4"/> Email me
        </a>
        <a href={LINKS.linkedin} className="inline-flex items-center gap-2 rounded-xl border border-[#1E2633] px-4 py-2 text-sm text-[#E9EDF7] hover:scale-[1.02] transition">
          <Icon.Linkedin className="w-4 h-4"/> LinkedIn
        </a>
        <a href={LINKS.github} className="inline-flex items-center gap-2 rounded-xl border border-[#1E2633] px-4 py-2 text-sm text-[#E9EDF7] hover:scale-[1.02] transition">
          <Icon.Github className="w-4 h-4"/> GitHub
        </a>
      </div>
    </div>
  </section>
);

// -----------------------------
// Root Component
// -----------------------------
export default function Portfolio() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-[#E9EDF7] [--ring:#48B7FF]">
      <Nav />
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}

const Footer: React.FC = () => (
  <footer className="border-t border-[#1E2633]">
    <div className="mx-auto max-w-6xl px-4 py-10 text-xs text-[#7D8AA3] flex flex-wrap items-center justify-between gap-4">
      <p>© {new Date().getFullYear()} Avinash Pushparaj. All rights reserved.</p>
      <p>Built with React & Tailwind. Dark theme • Subtle neon accents.</p>
    </div>
  </footer>
);
