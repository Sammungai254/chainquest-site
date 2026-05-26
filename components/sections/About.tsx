"use client";

import { motion } from "framer-motion";
import { Code2, Bitcoin, Bot, Building2, CheckCircle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const expertise = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Full-stack solutions from landing pages to complex web applications",
    color: "blue",
  },
  {
    icon: Bitcoin,
    title: "Cryptocurrency & Trading",
    description: "DeFi, NFTs, trading strategies, and blockchain investment education",
    color: "gold",
  },
  {
    icon: Bot,
    title: "AI Tools & Automation",
    description: "Integrating AI into business workflows and automating repetitive tasks",
    color: "purple",
  },
  {
    icon: Building2,
    title: "Business Transformation",
    description: "Digitizing traditional businesses and building scalable online presence",
    color: "green",
  },
];

const highlights = [
  "3+ years in blockchain education & trading",
  "50+ clients across Kenya & East Africa",
  "Expert in React, Next.js & Node.js",
  "Certified AI integration specialist",
  "Passionate about financial freedom through tech",
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
        <div className="grid lg:grid-cols-2 gap-14 items-center">
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
                  Developer · Educator · Digital Entrepreneur
                </p>
                <p className="text-[#8fa3c8] text-sm leading-relaxed">
                  Based in Nairobi, Kenya — bridging the gap between traditional business and the
                  emerging digital economy through hands-on training and expert-built solutions.
                </p>
              </div>
            </div>

            {/* Floating stat cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -top-6 -right-4 bg-[#0f1d35] border border-[#f5c218]/20 rounded-xl p-4 shadow-xl"
            >
              <div className="text-2xl font-black text-[#f5c218]">50+</div>
              <div className="text-[#8fa3c8] text-xs">Happy Clients</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-4 -left-4 bg-[#0f1d35] border border-[#2563eb]/30 rounded-xl p-4 shadow-xl"
            >
              <div className="text-2xl font-black text-[#60a5fa]">3+</div>
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
              badge="About Me"
              title="The Developer &"
              highlight=" Educator"
              subtitle=""
              centered={false}
            />

            <p className="text-[#8fa3c8] leading-relaxed mb-6 -mt-6">
              I&apos;m a full-stack developer, blockchain educator, and digital entrepreneur passionate about
              making cutting-edge technology accessible to everyone in Africa. My mission is to help
              individuals and businesses leverage Web3, AI, and modern development to unlock new revenue
              streams and build lasting digital legacies.
            </p>

            {/* Expertise grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
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

            {/* Highlights */}
            <ul className="space-y-2 mb-8">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[#8fa3c8] text-sm">
                  <CheckCircle className="w-4 h-4 text-[#f5c218] mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex gap-3">
              <Button variant="primary" onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}>
                Work With Me
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
