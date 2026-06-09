"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown, Github, Linkedin, Mail, MapPin } from "lucide-react";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/ryan-c07",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/ryanchen07",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:ryancwork10@gmail.com",
    label: "Email",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      aria-labelledby="hero-heading"
    >
      {/* Background orbs */}
      <div
        className="orb w-[600px] h-[600px] top-[-200px] left-[-200px]"
        style={{ background: "rgba(168, 85, 247, 0.12)" }}
        aria-hidden="true"
      />
      <div
        className="orb w-[500px] h-[500px] bottom-[-100px] right-[-150px]"
        style={{ background: "rgba(34, 211, 238, 0.08)" }}
        aria-hidden="true"
      />
      <div
        className="orb w-[300px] h-[300px] top-[30%] left-[60%]"
        style={{ background: "rgba(236, 72, 153, 0.06)" }}
        aria-hidden="true"
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/[0.08] text-sm text-slate-300 font-medium">
              <span
                className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"
                aria-hidden="true"
              />
              <MapPin size={13} className="text-purple-400" aria-hidden="true" />
              New York, NY · Open to opportunities
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            id="hero-heading"
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4 leading-none"
          >
            <span className="text-white">Ryan </span>
            <span className="gradient-text">Chen</span>
          </motion.h1>

          {/* Typing effect */}
          <motion.div
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 h-10 flex items-center"
            aria-live="polite"
            aria-label="Role description"
          >
            <span className="text-slate-400">I build&nbsp;</span>
            <TypeAnimation
              sequence={[
                "AI-powered apps",
                2000,
                "full-stack solutions",
                2000,
                "sleek web UIs",
                2000,
                "database systems",
                2000,
                "hackathon winners",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="gradient-text font-bold"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-base sm:text-lg text-slate-400 leading-relaxed mb-10"
          >
            CS student at{" "}
            <span className="text-white font-medium">Stony Brook University</span>{" "}
            and grad of{" "}
            <span className="text-white font-medium">Brooklyn Tech</span>. I
            engineer AI-driven products, full-stack web apps, and data systems —
            turning complex problems into polished, user-facing experiences.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
          >
            <motion.button
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-primary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              View Projects
              <ArrowDown size={16} aria-hidden="true" />
            </motion.button>
            <motion.button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-secondary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Mail size={16} aria-hidden="true" />
              Get in Touch
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4"
            role="list"
            aria-label="Social links"
          >
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="w-10 h-10 rounded-xl glass border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500/50 transition-all duration-200"
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`${label} (opens in new tab)`}
                role="listitem"
              >
                <Icon size={18} aria-hidden="true" />
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="mt-20 flex flex-col items-center gap-2"
            aria-hidden="true"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1"
            >
              <div className="w-1 h-2 rounded-full bg-white/40" />
            </motion.div>
            <span className="text-xs text-slate-600 tracking-widest uppercase">
              scroll
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
