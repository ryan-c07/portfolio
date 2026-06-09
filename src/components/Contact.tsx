"use client";

import { useState, useRef, FormEvent } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import emailjs from "@emailjs/browser";
import {
  Send,
  Mail,
  MapPin,
  Github,
  Linkedin,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "ryancwork10@gmail.com",
    href: "mailto:ryancwork10@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "New York, NY",
    href: null,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/ryan-c07",
    href: "https://github.com/ryan-c07",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/ryanchen07",
    href: "https://linkedin.com/in/ryanchen07",
  },
];

type FormStatus = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "YOUR_SERVICE_ID",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "YOUR_TEMPLATE_ID",
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "YOUR_PUBLIC_KEY"
      );
      setStatus("success");
      formRef.current.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or email me directly.");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-600 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.06] transition-all duration-200 font-medium";

  return (
    <section
      id="contact"
      className="relative py-24 px-6"
      aria-labelledby="contact-heading"
    >
      {/* Background orbs */}
      <div
        className="orb w-[500px] h-[500px] bottom-[-100px] left-[-150px]"
        style={{ background: "rgba(168, 85, 247, 0.1)" }}
        aria-hidden="true"
      />
      <div
        className="orb w-[300px] h-[300px] top-[10%] right-[-80px]"
        style={{ background: "rgba(34, 211, 238, 0.07)" }}
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
          <span className="inline-block text-xs font-mono text-pink-400 tracking-widest uppercase mb-3">
            // contact
          </span>
          <h2
            id="contact-heading"
            className="text-4xl sm:text-5xl font-black text-white tracking-tight"
          >
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-lg mx-auto">
            Whether it&apos;s a job, collaboration, or just a hello — my inbox is
            always open.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact info panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <div className="glass rounded-2xl p-6 border border-white/[0.06] flex-1">
              <h3 className="text-base font-semibold text-white mb-5">
                Contact Info
              </h3>
              <ul className="space-y-4" role="list" aria-label="Contact information">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-slate-400 flex-shrink-0"
                      aria-hidden="true"
                    >
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-600">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={
                            href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="text-sm text-slate-300 hover:text-white transition-colors"
                          aria-label={`${label}: ${value}${href.startsWith("http") ? " (opens in new tab)" : ""}`}
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm text-slate-300">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Availability badge */}
            <div className="glass rounded-2xl p-5 border border-emerald-500/20 bg-emerald-500/5">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"
                  aria-hidden="true"
                />
                <span className="text-sm font-semibold text-emerald-400">
                  Available for opportunities
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Open to internships, fellowships, and part-time roles.
              </p>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-2xl p-6 sm:p-8 border border-white/[0.06]">
              <h3 className="text-base font-semibold text-white mb-6">
                Send a Message
              </h3>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <CheckCircle
                    size={48}
                    className="text-emerald-400 mb-4"
                    aria-hidden="true"
                  />
                  <h4 className="text-lg font-bold text-white mb-2">
                    Message sent!
                  </h4>
                  <p className="text-slate-400 text-sm">
                    Thanks for reaching out. I&apos;ll get back to you soon.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 btn-secondary text-sm py-2 px-5"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Contact form"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="from_name"
                        className="block text-xs font-medium text-slate-400 mb-1.5"
                      >
                        Your Name <span aria-hidden="true">*</span>
                        <span className="sr-only">(required)</span>
                      </label>
                      <input
                        id="from_name"
                        name="from_name"
                        type="text"
                        required
                        placeholder="John Doe"
                        className={inputClass}
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="reply_to"
                        className="block text-xs font-medium text-slate-400 mb-1.5"
                      >
                        Email <span aria-hidden="true">*</span>
                        <span className="sr-only">(required)</span>
                      </label>
                      <input
                        id="reply_to"
                        name="reply_to"
                        type="email"
                        required
                        placeholder="john@example.com"
                        className={inputClass}
                        aria-required="true"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="subject"
                      className="block text-xs font-medium text-slate-400 mb-1.5"
                    >
                      Subject <span aria-hidden="true">*</span>
                      <span className="sr-only">(required)</span>
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      placeholder="What's this about?"
                      className={inputClass}
                      aria-required="true"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-xs font-medium text-slate-400 mb-1.5"
                    >
                      Message <span aria-hidden="true">*</span>
                      <span className="sr-only">(required)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell me about your project, opportunity, or just say hi..."
                      className={`${inputClass} resize-none`}
                      aria-required="true"
                    />
                  </div>

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                      role="alert"
                      aria-live="assertive"
                    >
                      <AlertCircle size={16} aria-hidden="true" />
                      {errorMsg}
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full btn-primary justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                    whileHover={status !== "loading" ? { scale: 1.02 } : {}}
                    whileTap={status !== "loading" ? { scale: 0.98 } : {}}
                    aria-describedby="submit-status"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2
                          size={16}
                          className="animate-spin"
                          aria-hidden="true"
                        />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} aria-hidden="true" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                  <span id="submit-status" className="sr-only">
                    {status === "loading" ? "Sending your message" : ""}
                  </span>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
