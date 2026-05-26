"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  highlight?: string;
  title2?: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({
  badge,
  title,
  highlight,
  title2,
  subtitle,
  centered = true,
}: SectionHeadingProps) {
  // Split title to insert highlight
  const titleParts = highlight ? title.split(highlight) : [title];

  return (
    <motion.div
      className={`mb-12 md:mb-16 ${centered ? "text-center" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {badge && (
        <span className="inline-block mb-4 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase bg-[#f5c218]/10 text-[#f5c218] border border-[#f5c218]/20 rounded-full">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f0f4ff] leading-tight">
        {highlight ? (
          <>
            {titleParts[0]}
            <span className="text-gradient-gold">{highlight}</span>
            {titleParts[1]}
            {title2 && title2}
          </>
        ) : (
          title
        )}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[#8fa3c8] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      {/* Decorative line */}
      <div className={`mt-6 flex ${centered ? "justify-center" : ""}`}>
        <div className="h-0.5 w-16 bg-gradient-to-r from-[#f5c218] to-transparent rounded-full" />
        <div className="h-0.5 w-4 bg-[#f5c218] rounded-full mx-1" />
        <div className="h-0.5 w-2 bg-[#f5c218]/50 rounded-full" />
      </div>
    </motion.div>
  );
}
