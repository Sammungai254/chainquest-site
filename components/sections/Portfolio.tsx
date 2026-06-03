"use client";

import { motion } from "framer-motion";
import { ExternalLink, Globe, Bitcoin, Bot, Tag, Building2 } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import SectionHeading from "@/components/ui/SectionHeading";

const projects = [
  {
    id: 101,
    category: "Business Systems",
    icon: Building2,
    title: "Corporate Travel Management System",
    description:
      "A web-based system for managing employee travel requests, approvals, itineraries, and expense tracking. Built to replace manual processes and reduce administrative overhead for mid-sized companies.",
    stack: ["Django", "DRF", "React", "PostgreSQL"],
    color: "blue",
    status: "Deployed",
    demoUrl: "#",
    githubUrl: "#",
    image: null,
  },
  {
    id: 102,
    category: "Business Systems",
    icon: Building2,
    title: "Internal Requisition Management System",
    description:
      "A structured requisition and approval workflow system allowing staff to raise purchase requests, route them through department heads, and track fulfilment — reducing paperwork and approval delays.",
    stack: ["Django", "React", "REST APIs", "PostgreSQL"],
    color: "green",
    status: "Deployed",
    demoUrl: "#",
    githubUrl: "#",
    image: null,
  },
  {
    id: 1,
    category: "Web",
    icon: Globe,
    title: "NairobiTech Consultancy Site",
    description:
      "Modern business website for a Nairobi-based IT consultancy. Built with Next.js and Tailwind CSS, featuring animated sections, service pages, and a lead capture form.",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    color: "blue",
    status: "Live",
    demoUrl: "#",
    githubUrl: "#",
    image: null,
  },
  {
    id: 2,
    category: "Crypto",
    icon: Bitcoin,
    title: "DeFi Portfolio Tracker",
    description:
      "Real-time DeFi portfolio dashboard that aggregates holdings across multiple chains. Features price alerts, P&L tracking, and gas fee optimization tips.",
    stack: ["React", "Web3.js", "CoinGecko API", "Chart.js"],
    color: "gold",
    status: "Live",
    demoUrl: "#",
    githubUrl: "#",
    image: null,
  },
  {
    id: 3,
    category: "AI",
    icon: Bot,
    title: "Business ChatBot Assistant",
    description:
      "Custom AI chatbot for a Kenyan SME, trained on company FAQs and product catalog. Handles 80% of customer inquiries automatically, integrated with WhatsApp Business API.",
    stack: ["OpenAI API", "Node.js", "WhatsApp API", "MongoDB"],
    color: "purple",
    status: "Deployed",
    demoUrl: "#",
    githubUrl: "#",
    image: null,
  },
  {
    id: 4,
    category: "Web",
    icon: Globe,
    title: "Personal Developer Portfolio",
    description:
      "Award-winning portfolio site for a Kenyan developer. Dark theme with 3D animations, project showcases, and integrated blog. Scored 98 on Lighthouse performance.",
    stack: ["Next.js", "Three.js", "Framer Motion", "MDX"],
    color: "green",
    status: "Live",
    demoUrl: "#",
    githubUrl: "#",
    image: null,
  },
  {
    id: 5,
    category: "Crypto",
    icon: Bitcoin,
    title: "NFT Marketplace Prototype",
    description:
      "Decentralized NFT marketplace built on Polygon for low gas fees. Supports minting, buying, and selling digital art with MATIC payments and wallet connect.",
    stack: ["Solidity", "React", "Ethers.js", "IPFS", "Polygon"],
    color: "orange",
    status: "Beta",
    demoUrl: "#",
    githubUrl: "#",
    image: null,
  },
  {
    id: 6,
    category: "AI",
    icon: Bot,
    title: "Content Automation Suite",
    description:
      "AI-powered content pipeline for social media managers. Generates, schedules, and posts content across Twitter, Instagram, and LinkedIn using GPT-4 and Zapier.",
    stack: ["Python", "GPT-4 API", "Zapier", "Buffer API"],
    color: "pink",
    status: "Live",
    demoUrl: "#",
    githubUrl: "#",
    image: null,
  },
];

const colorMap: Record<
  string,
  { badge: string; border: string; text: string; bg: string; glow: string }
> = {
  blue: {
    badge: "bg-blue-500/15 text-blue-300 border-blue-500/20",
    border: "border-blue-500/20 hover:border-blue-400/40",
    text: "text-blue-400",
    bg: "bg-blue-500/5",
    glow: "group-hover:shadow-[0_8px_40px_rgba(37,99,235,0.15)]",
  },
  gold: {
    badge: "bg-[#f5c218]/15 text-[#f5c218] border-[#f5c218]/20",
    border: "border-[#f5c218]/20 hover:border-[#f5c218]/50",
    text: "text-[#f5c218]",
    bg: "bg-[#f5c218]/5",
    glow: "group-hover:shadow-[0_8px_40px_rgba(245,194,24,0.15)]",
  },
  purple: {
    badge: "bg-purple-500/15 text-purple-300 border-purple-500/20",
    border: "border-purple-500/20 hover:border-purple-400/40",
    text: "text-purple-400",
    bg: "bg-purple-500/5",
    glow: "group-hover:shadow-[0_8px_40px_rgba(139,92,246,0.15)]",
  },
  green: {
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
    border: "border-emerald-500/20 hover:border-emerald-400/40",
    text: "text-emerald-400",
    bg: "bg-emerald-500/5",
    glow: "group-hover:shadow-[0_8px_40px_rgba(16,185,129,0.15)]",
  },
  orange: {
    badge: "bg-orange-500/15 text-orange-300 border-orange-500/20",
    border: "border-orange-500/20 hover:border-orange-400/40",
    text: "text-orange-400",
    bg: "bg-orange-500/5",
    glow: "group-hover:shadow-[0_8px_40px_rgba(249,115,22,0.15)]",
  },
  pink: {
    badge: "bg-pink-500/15 text-pink-300 border-pink-500/20",
    border: "border-pink-500/20 hover:border-pink-400/40",
    text: "text-pink-400",
    bg: "bg-pink-500/5",
    glow: "group-hover:shadow-[0_8px_40px_rgba(236,72,153,0.15)]",
  },
};

const categories = ["All", "Business Systems", "Web", "Crypto", "AI"];

import { useState } from "react";

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 md:py-28 bg-[#080e1e] relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Our Work"
          title="Projects That "
          highlight="Speak for Themselves"
          subtitle="Real solutions built for real people — spanning web development, blockchain, and AI automation."
        />

        {/* Category Filter */}
        <div className="flex gap-2 justify-center mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#f5c218] text-[#080e1e] shadow-[0_0_15px_rgba(245,194,24,0.3)]"
                  : "bg-[#0f1d35] text-[#8fa3c8] border border-[#f5c218]/10 hover:border-[#f5c218]/30 hover:text-[#f0f4ff]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project) => {
            const styles = colorMap[project.color];
            const Icon = project.icon;

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`group relative flex flex-col rounded-2xl bg-[#0f1d35] border ${styles.border} transition-all duration-300 overflow-hidden ${styles.glow}`}
              >
                {/* Project thumbnail */}
                <div className={`h-40 ${styles.bg} relative overflow-hidden flex items-center justify-center`}>
                  <div className="absolute inset-0 grid-overlay opacity-30" />
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className={`p-4 rounded-2xl ${styles.bg} border ${styles.border}`}
                  >
                    <Icon className={`w-10 h-10 ${styles.text}`} />
                  </motion.div>

                  {/* Status badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${styles.badge}`}>
                      {project.status}
                    </span>
                  </div>
                  {/* Category */}
                  <div className="absolute top-3 left-3 flex items-center gap-1">
                    <Tag className={`w-3 h-3 ${styles.text}`} />
                    <span className={`text-xs font-semibold ${styles.text}`}>{project.category}</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-white font-bold text-base mb-2 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-[#8fa3c8] text-sm leading-relaxed flex-1 mb-4">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-[#080e1e] border border-white/5 rounded text-[#8fa3c8] text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    <a
                      href={project.demoUrl}
                      className={`flex items-center gap-1.5 text-xs font-semibold ${styles.text} hover:opacity-80 transition-opacity`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#8fa3c8] hover:text-white transition-colors"
                    >
                      <GitHubIcon className="w-3.5 h-3.5" />
                      Code
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-[#8fa3c8] text-sm">
            More projects available upon request.{" "}
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="text-[#f5c218] hover:underline"
            >
              Get in touch
            </button>{" "}
            to see case studies.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
