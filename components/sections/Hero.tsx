"use client";

import { motion } from "framer-motion";
import { ChevronDown, Zap, Code2, Bot, Map, Users } from "lucide-react";
import Button from "@/components/ui/Button";
import { WHATSAPP_COMMUNITY_URL } from "@/lib/constants";

// Service-category tags that float around the hero product mockup. Ordered
// software → AI → GIS so the systems/dev work leads (crypto lives further
// down the page, not in the brand's headline visual).
const floatingBadges = [
  { icon: Code2, label: "Software Systems", color: "blue", delay: 0.2 },
  { icon: Bot, label: "AI Integration", color: "purple", delay: 0.4 },
  { icon: Map, label: "GIS & Spatial", color: "green", delay: 0.6 },
];

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-bg grid-overlay"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#1e4d8c]/20 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-[#f5c218]/8 blur-3xl"
          animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-3/4 left-1/3 w-64 h-64 rounded-full bg-[#2563eb]/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Floating chain links decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 border-2 border-[#f5c218]/10 rounded-full"
            style={{
              top: `${15 + i * 14}%`,
              left: `${5 + i * 15}%`,
            }}
            animate={{
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-[#f5c218]/10 border border-[#f5c218]/20 rounded-full"
            >
              <span className="w-2 h-2 bg-[#f5c218] rounded-full animate-pulse" />
              <span className="text-[#f5c218] text-sm font-semibold tracking-wide">
                Nairobi-Based Digital Services Firm
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-6"
            >
              Digital Solutions{" "}
              <span className="relative inline-block">
                <span className="text-white">Built for the</span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#f5c218] to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                />
              </span>{" "}
              <span className="text-gradient-blue-gold">African Market</span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-[#8fa3c8] text-lg md:text-xl leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
            >
              ChainQuest Ke is a Nairobi digital solutions firm building software and
              business systems, GIS &amp; spatial tools, and AI integrations — with Web3 and
              crypto education as one of our supporting services. Grounded in real
              experience, built for local needs.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => scrollTo("services")}
              >
                Explore Our Services
                <ChevronDown className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollTo("contact")}
              >
                Get in Touch
                <Zap className="w-5 h-5" />
              </Button>
            </motion.div>

            {/* Community pill — quiet, discoverable CTA */}
            <motion.a
              href={WHATSAPP_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              className="group mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366]/10 border border-[#25D366]/25 hover:bg-[#25D366]/15 hover:border-[#25D366]/45 transition-all"
              aria-label="Join the ChainQuest WhatsApp Community"
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-[#25D366] opacity-75 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-[#25D366]" />
              </span>
              <Users className="w-3.5 h-3.5 text-[#25D366]" />
              <span className="text-[#f0f4ff] text-xs sm:text-sm font-medium">
                Join our free WhatsApp community
              </span>
              <span className="text-[#25D366] text-xs font-bold group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </motion.a>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12 flex gap-8 justify-center lg:justify-start"
            >
              {[
                { value: "40+", label: "Projects Delivered" },
                { value: "5+", label: "Years in Tech" },
                { value: "Kenya", label: "& East Africa" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl font-black text-[#f5c218]">{stat.value}</div>
                  <div className="text-[#8fa3c8] text-xs mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Product-window mockup + service badges.
              A coded, data-free dashboard frame that signals "we ship
              production business systems" — no personal photo. */}
          <div className="relative flex justify-center items-center">
            {/* Ambient glow behind the window */}
            <div className="absolute w-80 h-80 md:w-96 md:h-96 rounded-full bg-[#f5c218]/5 blur-3xl" />
            <div className="absolute w-72 h-72 md:w-80 md:h-80 rounded-full bg-[#1e4d8c]/15 blur-3xl" />

            {/* App window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ y: -4 }}
              className="relative z-10 w-full max-w-md rounded-2xl overflow-hidden border border-[#f5c218]/20 bg-gradient-to-br from-[#0f1d35] to-[#0b1526] shadow-[0_20px_70px_rgba(0,0,0,0.5),0_0_50px_rgba(245,194,24,0.08)]"
            >
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#0b1526]/60">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]/70" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]/70" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]/70" />
                <span className="ml-3 text-[#8fa3c8] text-xs font-medium tracking-wide">
                  requisitions · dashboard
                </span>
                <span className="ml-auto flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400/80 text-[10px] font-semibold">live</span>
                </span>
              </div>

              {/* Body */}
              <div className="p-5">
                {/* Stat cards */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: "Requests", value: "142", tint: "text-[#f5c218]" },
                    { label: "Approved", value: "98", tint: "text-emerald-400" },
                    { label: "Pending", value: "12", tint: "text-blue-400" },
                  ].map((s, si) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + si * 0.1 }}
                      className="rounded-lg bg-[#080e1e]/60 border border-white/5 p-3"
                    >
                      <div className={`text-xl font-black ${s.tint}`}>{s.value}</div>
                      <div className="text-[#8fa3c8] text-[10px] mt-0.5">{s.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Sparkline / chart area */}
                <div className="rounded-lg bg-[#080e1e]/60 border border-white/5 p-3 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#f0f4ff] text-xs font-semibold">Throughput</span>
                    <span className="text-[#8fa3c8] text-[10px]">last 12 wks</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-16">
                    {[38, 52, 45, 63, 58, 74, 69, 82, 77, 90, 85, 96].map((h, bi) => (
                      <motion.span
                        key={bi}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 0.8 + bi * 0.04, duration: 0.4 }}
                        className={`flex-1 rounded-sm ${bi === 11 ? "bg-[#f5c218]" : "bg-[#1e4d8c]"}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Table skeleton */}
                <div className="space-y-2">
                  {[
                    { w: "w-2/3", tag: "APPROVED", tint: "bg-emerald-500/15 text-emerald-300" },
                    { w: "w-1/2", tag: "PENDING", tint: "bg-blue-500/15 text-blue-300" },
                    { w: "w-3/5", tag: "APPROVED", tint: "bg-emerald-500/15 text-emerald-300" },
                  ].map((row, ri) => (
                    <motion.div
                      key={ri}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + ri * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-md bg-[#1e4d8c]/40 flex-shrink-0" />
                      <span className={`h-2 rounded-full bg-white/10 ${row.w}`} />
                      <span className={`ml-auto px-2 py-0.5 rounded text-[9px] font-bold ${row.tint}`}>
                        {row.tag}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Shimmer overlay */}
              <div className="absolute inset-0 shimmer pointer-events-none" />
            </motion.div>

            {/* Floating badge pills */}
            {floatingBadges.map(({ icon: Icon, label, color, delay }, i) => {
              const positions = [
                "-top-4 -left-4 md:-left-8",
                "top-1/2 -right-4 md:-right-10",
                "-bottom-4 left-4 md:left-0",
              ];
              const colors: Record<string, string> = {
                blue: "bg-blue-500/20 border-blue-400/30 text-blue-300",
                purple: "bg-purple-500/20 border-purple-400/30 text-purple-300",
                gold: "bg-[#f5c218]/20 border-[#f5c218]/30 text-[#f5c218]",
                green: "bg-emerald-500/20 border-emerald-400/30 text-emerald-300",
              };

              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay }}
                  className={`absolute ${positions[i]} z-20`}
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.5,
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border backdrop-blur-sm text-xs font-semibold ${colors[color]}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8fa3c8] hover:text-[#f5c218] transition-colors group"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Scroll down"
      >
        <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
        <ChevronDown className="w-5 h-5" />
      </motion.button>
    </section>
  );
}
