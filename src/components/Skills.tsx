"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award } from "lucide-react";

interface SkillGroup {
  category: string;
  color: string;
  skills: string[];
}

const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    color: "from-cyan-400 to-blue-500",
    skills: ["Java", "Kotlin", "Python", "Swift", "SQL", "JavaScript", "HTML", "CSS"],
  },
  {
    category: "Frameworks",
    color: "from-purple-400 to-pink-500",
    skills: ["React.js", "Next.js", "Material-UI"],
  },
  {
    category: "Developer Tools",
    color: "from-amber-400 to-orange-500",
    skills: ["Git", "VS Code", "PyCharm", "IntelliJ", "Android Studio", "Xcode", "Bash"],
  },
  {
    category: "Databases & APIs",
    color: "from-emerald-400 to-teal-500",
    skills: ["PostgreSQL", "OpenAI API", "Gemini API", "Twilio API", "EmailJS"],
  },
];

const certifications = [
  {
    name: "Google Cybersecurity",
    provider: "Coursera · Google",
    icon: "🔐",
  },
  {
    name: "Meta Front-End Developer",
    provider: "Coursera · Meta",
    icon: "⚛️",
  },
];

function SkillGroupCard({
  group,
  index,
  parentInView,
}: {
  group: SkillGroup;
  index: number;
  parentInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={parentInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass rounded-2xl p-5 border border-white/[0.06] hover:border-white/[0.1] transition-all duration-300"
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div
          className={`w-1 h-5 rounded-full bg-gradient-to-b ${group.color}`}
          aria-hidden="true"
        />
        <h3 className="text-sm font-semibold text-white">{group.category}</h3>
      </div>
      <div
        className="flex flex-wrap gap-2"
        role="list"
        aria-label={`${group.category} skills`}
      >
        {group.skills.map((skill, si) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={parentInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.1 + si * 0.04 }}
            className="inline-block px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-sm text-slate-300 font-mono hover:bg-white/[0.09] hover:border-white/[0.15] hover:text-white transition-all duration-200 cursor-default"
            role="listitem"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [certRef, certInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="skills"
      className="relative py-24 px-6"
      aria-labelledby="skills-heading"
    >
      {/* Background orb */}
      <div
        className="orb w-[350px] h-[350px] top-[10%] left-[-80px]"
        style={{ background: "rgba(34, 211, 238, 0.06)" }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="inline-block text-xs font-mono text-emerald-400 tracking-widest uppercase mb-3">
            // skills
          </span>
          <h2
            id="skills-heading"
            className="text-4xl sm:text-5xl font-black text-white tracking-tight"
          >
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-lg mx-auto">
            Languages, frameworks, and tools I use to bring ideas to life.
          </p>
        </motion.div>

        {/* Skill groups */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {skillGroups.map((group, gi) => (
            <SkillGroupCard
              key={group.category}
              group={group}
              index={gi}
              parentInView={inView}
            />
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          ref={certRef}
          initial={{ opacity: 0, y: 30 }}
          animate={certInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Award size={16} className="text-yellow-400" aria-hidden="true" />
            <h3 className="text-sm font-semibold text-white">Certifications</h3>
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            role="list"
            aria-label="Certifications"
          >
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                role="listitem"
                initial={{ opacity: 0, x: -20 }}
                animate={certInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass rounded-xl p-4 border border-white/[0.06] flex items-center gap-3 hover:border-white/[0.1] transition-all duration-200"
              >
                <span className="text-2xl" role="img" aria-label={cert.name}>
                  {cert.icon}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{cert.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{cert.provider}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
