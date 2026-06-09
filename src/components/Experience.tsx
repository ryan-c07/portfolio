"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";

interface TimelineItem {
  id: number;
  type: "work" | "education";
  title: string;
  org: string;
  location: string;
  period: string;
  bullets: string[];
  tags?: string[];
  highlight?: string;
}

const timeline: TimelineItem[] = [
  {
    id: 1,
    type: "education",
    title: "B.S. Computer Science",
    org: "Stony Brook University",
    location: "Stony Brook, NY",
    period: "Aug 2025 – May 2029",
    bullets: [
      "Pursuing a Bachelor of Science in Computer Science.",
      "Focused on algorithms, systems, and AI/ML coursework.",
    ],
    highlight: "Expected May 2029",
  },
  {
    id: 2,
    type: "work",
    title: "Software Engineering Fellow",
    org: "Headstarter AI",
    location: "New York, NY",
    period: "Jul 2024 – Sept 2024",
    bullets: [
      "Engineered AI-driven products including Pantry Tracker, AI flashcards, and an AI customer support system using Next.js, Material UI, and OpenAI's API.",
      "Refined technical communication skills through 5+ mock interviews with mentors and peers.",
    ],
    tags: ["Next.js", "OpenAI API", "Material-UI", "React"],
  },
  {
    id: 3,
    type: "work",
    title: "Intern (IT & Analytics)",
    org: "NYCDOE — Division of Instructional & Information Technology",
    location: "Brooklyn, NY",
    period: "Jul 2024 – Aug 2024",
    bullets: [
      "Presented key insights to the CIO and executive team, influencing strategic decisions.",
      "Analyzed TeachHub usage and surveyed 500+ K-12 students to improve functionality for the largest U.S. school district (912,064 students).",
      "Synthesized findings into a comprehensive report with actionable recommendations for senior leadership.",
    ],
    tags: ["Data Analysis", "Stakeholder Communication", "Research"],
  },
  {
    id: 4,
    type: "work",
    title: "Project Intern",
    org: "NYCDOE — Division of Instructional & Information Technology",
    location: "Brooklyn, NY",
    period: "Apr 2024 – May 2024",
    bullets: [
      "Standardized official transcript processes across NYC DOE systems by designing detailed UML diagrams and workflow proposals.",
      "Documented edge cases and created scenarios to ensure accurate record delivery across departments.",
      "Examined student records including transcripts, IEPs, 504s, and PSAL documentation.",
    ],
    tags: ["UML", "Systems Design", "Documentation"],
  },
  {
    id: 5,
    type: "education",
    title: "Advanced Regents Diploma, Software Engineering",
    org: "Brooklyn Technical High School",
    location: "Brooklyn, NY",
    period: "Sep 2021 – Jun 2025",
    bullets: [
      "Specialized track in Software Engineering.",
      "Graduated 2025.",
    ],
    highlight: "Graduated 2025",
  },
];

function TimelineCard({
  item,
  index,
  isLast,
}: {
  item: TimelineItem;
  index: number;
  isLast: boolean;
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const isWork = item.type === "work";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
      className="relative flex gap-6 group"
    >
      {/* Timeline line & dot */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center z-10 border transition-all duration-300 group-hover:scale-110 ${
            isWork
              ? "bg-purple-500/20 border-purple-500/40 text-purple-400 group-hover:bg-purple-500/30"
              : "bg-cyan-500/20 border-cyan-500/40 text-cyan-400 group-hover:bg-cyan-500/30"
          }`}
          aria-hidden="true"
        >
          {isWork ? <Briefcase size={18} /> : <GraduationCap size={18} />}
        </div>
        {!isLast && (
          <div className="w-px flex-1 mt-2 bg-gradient-to-b from-white/[0.08] to-transparent min-h-[40px]" aria-hidden="true" />
        )}
      </div>

      {/* Card */}
      <div className="flex-1 pb-10">
        <article className="glass glass-hover rounded-2xl p-5 border border-white/[0.06]">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
            <div>
              <h3 className="font-bold text-white text-base leading-snug">
                {item.title}
              </h3>
              <p
                className={`text-sm font-medium mt-0.5 ${
                  isWork ? "text-purple-400" : "text-cyan-400"
                }`}
              >
                {item.org}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-mono whitespace-nowrap">
                <Calendar size={11} aria-hidden="true" />
                {item.period}
              </span>
              <span className="text-xs text-slate-600">{item.location}</span>
            </div>
          </div>

          {/* Highlight badge */}
          {item.highlight && (
            <span
              className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3 border ${
                isWork
                  ? "bg-purple-500/10 border-purple-500/20 text-purple-300"
                  : "bg-cyan-500/10 border-cyan-500/20 text-cyan-300"
              }`}
            >
              {item.highlight}
            </span>
          )}

          {/* Bullets */}
          <ul className="space-y-1.5 mb-3" aria-label="Responsibilities and achievements">
            {item.bullets.map((bullet, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-400 leading-relaxed">
                <span
                  className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                    isWork ? "bg-purple-500/60" : "bg-cyan-500/60"
                  }`}
                  aria-hidden="true"
                />
                {bullet}
              </li>
            ))}
          </ul>

          {/* Tags */}
          {item.tags && (
            <div className="flex flex-wrap gap-1.5 mt-3" role="list" aria-label="Skills used">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-slate-500 font-mono"
                  role="listitem"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </article>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section
      id="experience"
      className="relative py-24 px-6"
      aria-labelledby="experience-heading"
    >
      {/* Background orb */}
      <div
        className="orb w-[400px] h-[400px] top-[20%] right-[-100px]"
        style={{ background: "rgba(168, 85, 247, 0.07)" }}
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="inline-block text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3">
            // experience
          </span>
          <h2
            id="experience-heading"
            className="text-4xl sm:text-5xl font-black text-white tracking-tight"
          >
            My <span className="gradient-text">Journey</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-lg mx-auto">
            From high school internships to fellowships — here&apos;s how I&apos;ve
            grown as an engineer.
          </p>
        </motion.div>

        {/* Timeline */}
        <div role="list" aria-label="Career and education timeline">
          {timeline.map((item, index) => (
            <div key={item.id} role="listitem">
              <TimelineCard
                item={item}
                index={index}
                isLast={index === timeline.length - 1}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
