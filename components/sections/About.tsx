"use client";

import { motion } from "framer-motion";
import { Code2, Map, Server, Bitcoin } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

// Four-card overview of what ChainQuest Ke offers. Kept generic enough that
// each card maps to a service category in #services without duplicating copy.
const expertise = [
  {
    icon: Code2,
    title: "Software Development",
    description: "Production web platforms, business systems, and APIs built with Django, Next.js, and PostgreSQL.",
    color: "blue",
  },
  {
    icon: Map,
    title: "GIS & Spatial Data",
    description: "Geospatial processing, mapping, and spatial analysis for land, infrastructure, and business use cases.",
    color: "green",
  },
  {
    icon: Bitcoin,
    title: "Crypto Education",
    description: "Practical, no-hype guidance on blockchain and trading — for individuals and community groups.",
    color: "gold",
  },
  {
    icon: Server,
    title: "AI Integration",
    description: "Embedding AI tools into existing workflows so teams spend less time on repetitive work.",
    color: "purple",
  },
];

// Tools & technologies used day-to-day. Order roughly: backend → frontend →
// data/GIS → blockchain. Shown as plain pills below the bio.
const techStack = [
  "Python",
  "Django",
  "DRF",
  "React",
  "Next.js",
  "PostgreSQL",
  "PostGIS",
  "GIS / Spatial Data",
  "REST APIs",
  "Web3.js",
  "Solidity",
];

// Skill / capability tags — broader than the tech stack; describe what we
// actually do, not what we use.
const skillTags = [
  "Software Development",
  "GIS & Mapping",
  "Backend APIs",
  "Business Systems",
  "Crypto Education",
  "Blockchain",
  "AI Integration",
  "DeFi & Trading",
  "Community Management",
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  gold: "bg-[#f5c218]/10 border-[#f5c218]/20 text-[#f5c218]",
  purple: "bg-purple-500/10 border-purple-500/20 text-purple-400",
  green: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
};

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1e4d8c]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#f5c218]/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left: Image + Stats */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Main card */}
            <div className="relative rounded-2xl overflow-hidden border border-[#f5c218]/15 bg-gradient-to-br from-[#0f1d35] to-[#0d1628]">
              {/* Profile area */}
              <div className="relative h-64 bg-gradient-to-br from-[#1e4d8c]/30 via-[#0f1d35] to-[#080e1e] flex items-center justify-center">
                {/* Hexagonal grid decoration */}
                <div className="absolute inset-0 grid-overlay opacity-40" />
                {/* Profile circle */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 w-32 h-32 rounded-full border-2 border-[#f5c218]/50 bg-[#f5c218]/10 flex items-center justify-center shadow-[0_0_40px_rgba(245,194,24,0.2)]"
                >
                  <span className="text-[#f5c218] text-5xl font-black">S</span>
                </motion.div>

                {/* Online badge */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#080e1e]/80 border border-[#f5c218]/20 rounded-full px-3 py-1.5 backdrop-blur-sm">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-[#8fa3c8] text-xs">Available for projects</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1">Samuel — ChainQuest Ke</h3>
                <p className="text-[#f5c218] text-sm font-medium mb-3">
                  Software Developer · GIS Specialist · Crypto Educator
                </p>
                <p className="text-[#8fa3c8] text-sm leading-relaxed">
                  Based in Nairobi, Kenya — building practical digital solutions for businesses
                  and individuals across Kenya and East Africa.
                </p>
              </div>
            </div>

            {/* Floating stat cards — desktop only.
                On mobile they overflow the card edge (negative offsets) and get
                clipped by the section's overflow-hidden, producing a visible
                cut-off bug. The same stats already appear inline in the bio
                highlights, so hiding here on mobile is purely cosmetic. */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="hidden lg:block absolute -top-6 -right-4 bg-[#0f1d35] border border-[#f5c218]/20 rounded-xl p-4 shadow-xl"
            >
              <div className="text-2xl font-black text-[#f5c218]">50+</div>
              <div className="text-[#8fa3c8] text-xs">Happy Clients</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="hidden lg:block absolute -bottom-4 -left-4 bg-[#0f1d35] border border-[#2563eb]/30 rounded-xl p-4 shadow-xl"
            >
              <div className="text-2xl font-black text-[#60a5fa]">5+</div>
              <div className="text-[#8fa3c8] text-xs">Years Experience</div>
            </motion.div>
          </motion.div>

          {/* Right: Bio + Expertise */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionHeading
              badge="About"
              title="A Nairobi Digital"
              highlight=" Services Firm"
              subtitle=""
              centered={false}
            />

            <p className="text-[#8fa3c8] leading-relaxed mb-6">
              ChainQuest Ke is a Nairobi-based digital services firm offering web development,
              GIS and spatial data solutions, web3 & crypto education, and AI integration. The
              business is led by Samuel, a software and GIS developer with hands-on experience
              building production systems — including enterprise-level government platforms, a
              corporate travel management system, and an internal requisition system for
              streamlining company procurement and approval workflows. Samuel also runs a
              crypto education community helping beginners navigate blockchain and trading
              with practical, no-hype guidance.
            </p>

            {/* Expertise grid — single column on small phones so the labels and
                descriptions get room to breathe instead of crushing into 2 cramped
                columns. Goes back to 2-col from sm: upward. */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {expertise.map(({ icon: Icon, title, description, color }) => (
                <motion.div
                  key={title}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-xl border ${colorMap[color]} card-hover`}
                >
                  <Icon className="w-5 h-5 mb-2" />
                  <div className="text-white text-sm font-semibold mb-1">{title}</div>
                  <div className="text-[#8fa3c8] text-xs leading-relaxed">{description}</div>
                </motion.div>
              ))}
            </div>

            {/* Tech stack pills — the actual tools we use day-to-day. */}
            <div className="mb-6">
              <h4 className="text-[#f5c218] text-xs font-semibold tracking-widest uppercase mb-3">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-[#0f1d35] border border-[#f5c218]/20 text-[#f0f4ff]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Skill / capability tags — broader than the stack; what we do. */}
            <div className="mb-8">
              <h4 className="text-[#f5c218] text-xs font-semibold tracking-widest uppercase mb-3">
                Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {skillTags.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-[#f5c218]/10 border border-[#f5c218]/30 text-[#f5c218]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="primary" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                Get in Touch
              </Button>
              <Button variant="outline" onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}>
                View Work
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
