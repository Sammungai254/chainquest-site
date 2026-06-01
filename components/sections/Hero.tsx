"use client";

import { motion } from "framer-motion";
import { ChevronDown, Zap, Shield, TrendingUp } from "lucide-react";
import Button from "@/components/ui/Button";

const floatingBadges = [
  { icon: Zap, label: "AI Solutions", color: "blue", delay: 0.2 },
  { icon: Shield, label: "Blockchain", color: "gold", delay: 0.4 },
  { icon: TrendingUp, label: "Crypto Expert", color: "green", delay: 0.6 },
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
              We help individuals and businesses grow through practical web development,
              blockchain education, GIS solutions, and AI-powered tools — grounded in real
              experience and built for local needs.
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

          {/* Right: Profile Image + badges */}
          <div className="relative flex justify-center items-center">
            {/* Glow ring behind image */}
            <div className="absolute w-72 h-72 md:w-80 md:h-80 rounded-full bg-[#f5c218]/5 border border-[#f5c218]/15 blur-sm" />
            <div className="absolute w-64 h-64 md:w-72 md:h-72 rounded-full border border-[#f5c218]/10 animate-[spin_20s_linear_infinite]" />

            {/* Profile image container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative z-10 w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-[#f5c218]/40 shadow-[0_0_60px_rgba(245,194,24,0.15)]"
            >
              {/* Trainer photo — place your image at /public/images/trainer.jpg */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/trainer.jpg"
                alt="ChainQuest Ke Trainer"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  // Fallback to gradient placeholder if image not found
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const placeholder = target.nextElementSibling as HTMLElement;
                  if (placeholder) placeholder.style.display = "flex";
                }}
              />
              {/* Fallback placeholder (hidden when photo loads) */}
              <div className="w-full h-full bg-gradient-to-br from-[#1e4d8c] via-[#0f1d35] to-[#0d1628] items-center justify-center hidden absolute inset-0">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-[#f5c218]/20 border-2 border-[#f5c218]/40 flex items-center justify-center mx-auto mb-3">
                    <span className="text-[#f5c218] text-3xl font-black">S</span>
                  </div>
                  <span className="text-[#8fa3c8] text-sm">Trainer & Developer</span>
                </div>
              </div>

              {/* Shimmer overlay */}
              <div className="absolute inset-0 shimmer pointer-events-none" />
            </motion.div>

            {/* Floating badge pills */}
            {floatingBadges.map(({ icon: Icon, label, color, delay }, i) => {
              const positions = [
                "-top-4 -left-4 md:-left-8",
                "top-1/2 -right-4 md:-right-12",
                "-bottom-4 left-4 md:left-0",
              ];
              const colors: Record<string, string> = {
                blue: "bg-blue-500/20 border-blue-400/30 text-blue-300",
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
