"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ExternalLink,
  Github,
  Database,
  Sparkles,
  Trophy,
  ShoppingBasket,
  ArrowUpRight,
} from "lucide-react";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  icon: React.ElementType;
  accentColor: string;
  glowColor: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  badge?: string;
  size: "large" | "medium" | "small";
  gradient: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Pharmacy Database Architect",
    subtitle: "Paid Client Project",
    description:
      "Architected a PostgreSQL database for a multi-branch NYC pharmacy network. Built a schema enabling secure patient data access across a mobile app and TwilioBot API, with realistic mock data for simulation.",
    tags: ["PostgreSQL", "SQL", "Bash", "Twilio API"],
    icon: Database,
    accentColor: "from-cyan-400 to-blue-500",
    glowColor: "rgba(34, 211, 238, 0.15)",
    badge: "Paid Project",
    featured: true,
    size: "large",
    gradient: "from-cyan-500/10 via-blue-500/5 to-transparent",
  },
  {
    id: 2,
    title: "Pantry Tracker",
    subtitle: "AI-Powered Web App",
    description:
      "Responsive web app for tracking pantry inventory with AI-powered recipe suggestions via the Gemini API. Dynamic search, modals for inventory management, and fully mobile-optimized UI.",
    tags: ["React.js", "JavaScript", "Material-UI", "Gemini API"],
    icon: ShoppingBasket,
    accentColor: "from-purple-400 to-pink-500",
    glowColor: "rgba(168, 85, 247, 0.15)",
    size: "medium",
    gradient: "from-purple-500/10 via-pink-500/5 to-transparent",
    githubUrl: "https://github.com/ryan-c07",
  },
  {
    id: 3,
    title: "Nue-Trivia",
    subtitle: "Hackathon Winner",
    description:
      "Educational nutrition game with custom sprites and AI-generated questions targeting young audiences. Interactive Q&A gameplay with a point-based reward system.",
    tags: ["Java", "OpenAI API", "GPT-4", "JFrame"],
    icon: Trophy,
    accentColor: "from-amber-400 to-orange-500",
    glowColor: "rgba(251, 191, 36, 0.15)",
    badge: "🏆 Hackathon Winner",
    size: "medium",
    gradient: "from-amber-500/10 via-orange-500/5 to-transparent",
    githubUrl: "https://github.com/ryan-c07",
  },
  {
    id: 4,
    title: "AI Customer Support",
    subtitle: "Headstarter AI Fellowship",
    description:
      "AI-driven customer support chatbot engineered during the Headstarter AI fellowship. Built with Next.js and OpenAI's API, featuring real-time streaming responses.",
    tags: ["Next.js", "OpenAI API", "Material-UI", "React"],
    icon: Sparkles,
    accentColor: "from-emerald-400 to-teal-500",
    glowColor: "rgba(52, 211, 153, 0.15)",
    size: "small",
    gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
    githubUrl: "https://github.com/ryan-c07",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const Icon = project.icon;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className={`group relative rounded-2xl glass glass-hover overflow-hidden flex flex-col ${
        project.size === "large"
          ? "md:col-span-2 md:row-span-2"
          : project.size === "medium"
          ? "md:col-span-1 md:row-span-2"
          : "md:col-span-1 md:row-span-1"
      }`}
      style={{ minHeight: project.size === "large" ? "340px" : project.size === "medium" ? "300px" : "200px" }}
      aria-label={`Project: ${project.title}`}
    >
      {/* Gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60`}
        aria-hidden="true"
      />

      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${project.glowColor}, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Card shine */}
      <div
        className="absolute inset-0 bg-card-shine opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.accentColor} flex items-center justify-center shadow-lg flex-shrink-0`}
          >
            <Icon size={20} className="text-white" aria-hidden="true" />
          </div>
          <div className="flex items-center gap-2">
            {project.badge && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/[0.08] text-slate-300 border border-white/[0.06]">
                {project.badge}
              </span>
            )}
            <div className="flex gap-1.5">
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`View ${project.title} on GitHub (opens in new tab)`}
                >
                  <Github size={14} aria-hidden="true" />
                </motion.a>
              )}
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`View ${project.title} live (opens in new tab)`}
                >
                  <ExternalLink size={14} aria-hidden="true" />
                </motion.a>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className="text-xs font-mono text-slate-500 mb-1">{project.subtitle}</p>
          <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-white transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5" role="list" aria-label="Technologies used">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/[0.07] text-slate-400 font-mono"
              role="listitem"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Hover arrow */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
          <ArrowUpRight size={18} className="text-slate-400" aria-hidden="true" />
        </div>
      </div>
    </motion.article>
  );
}

export default function BentoGrid() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section
      id="projects"
      className="relative py-24 px-6"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="inline-block text-xs font-mono text-purple-400 tracking-widest uppercase mb-3">
            // projects
          </span>
          <h2
            id="projects-heading"
            className="text-4xl sm:text-5xl font-black text-white tracking-tight"
          >
            Things I&apos;ve{" "}
            <span className="gradient-text">Built</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
            A collection of projects spanning AI, full-stack web, databases, and
            game development.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4"
          role="list"
          aria-label="Project portfolio"
        >
          {projects.map((project, index) => (
            <div key={project.id} role="listitem">
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
