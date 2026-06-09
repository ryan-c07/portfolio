"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Code2, Heart, ArrowUp } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: Github, href: "https://github.com/ryan-c07", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/ryanchen07", label: "LinkedIn" },
  { icon: Mail, href: "mailto:ryancwork10@gmail.com", label: "Email" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative border-t border-white/[0.05] py-12 px-6"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Subtle gradient top */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                <Code2 size={14} className="text-white" aria-hidden="true" />
              </div>
              <span className="font-bold text-white">
                Ryan<span className="gradient-text">Chen</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 text-center md:text-left max-w-[220px]">
              CS @ Stony Brook · Building AI-driven software.
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-sm text-slate-500 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials + Back to top */}
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="w-8 h-8 rounded-lg glass border border-white/[0.06] flex items-center justify-center text-slate-500 hover:text-white hover:border-white/[0.15] transition-all duration-200"
                aria-label={`${label}${href.startsWith("http") ? " (opens in new tab)" : ""}`}
              >
                <Icon size={15} aria-hidden="true" />
              </a>
            ))}
            <motion.button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/[0.08] transition-all duration-200 ml-1"
              whileHover={{ y: -2 }}
              aria-label="Scroll back to top"
            >
              <ArrowUp size={15} aria-hidden="true" />
            </motion.button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-700">
            © {new Date().getFullYear()} Ryan Chen. All rights reserved.
          </p>
          <p className="text-xs text-slate-700 flex items-center gap-1">
            Built with{" "}
            <Heart
              size={11}
              className="text-pink-500 fill-pink-500"
              aria-hidden="true"
            />{" "}
            using Next.js 14 · Tailwind CSS · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
