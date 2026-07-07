"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { posts } from "@/lib/posts";

const articles = posts;

const colorMap: Record<
  string,
  { badge: string; border: string; text: string; bg: string; glow: string }
> = {
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
  blue: {
    badge: "bg-blue-500/15 text-blue-300 border-blue-500/20",
    border: "border-blue-500/20 hover:border-blue-400/40",
    text: "text-blue-400",
    bg: "bg-blue-500/5",
    glow: "group-hover:shadow-[0_8px_40px_rgba(37,99,235,0.15)]",
  },
};

export default function Insights() {
  return (
    <section
      id="insights"
      className="py-20 md:py-28 bg-[#080e1e] relative overflow-hidden"
    >
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Insights & Articles"
          title="Notes on "
          highlight="Digital Solutions, Systems & Web3"
          subtitle="Practical takes on the tech shaping Africa's digital economy — from software and systems to AI and Web3."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, idx) => {
            const styles = colorMap[article.color];

            return (
              <motion.article
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group relative flex flex-col rounded-2xl bg-[#0f1d35] border ${styles.border} transition-all duration-300 overflow-hidden ${styles.glow}`}
              >
                {/* Header / category visual */}
                <div
                  className={`h-32 ${styles.bg} relative overflow-hidden flex items-center justify-center`}
                >
                  <div className="absolute inset-0 grid-overlay opacity-30" />
                  <span
                    className={`relative z-10 px-3 py-1 rounded-full text-xs font-bold border ${styles.badge}`}
                  >
                    {article.category}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-white font-bold text-base md:text-lg mb-2 leading-snug group-hover:text-[#f5c218] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-[#8fa3c8] text-sm leading-relaxed flex-1 mb-4">
                    {article.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-[#8fa3c8] mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {article.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {article.date}
                    </span>
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/blog/${article.slug}`}
                    className={`inline-flex items-center gap-1.5 text-sm font-semibold ${styles.text} hover:opacity-80 transition-opacity`}
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f5c218] text-[#080e1e] text-sm font-bold shadow-[0_0_20px_rgba(245,194,24,0.25)] hover:shadow-[0_0_30px_rgba(245,194,24,0.4)] transition-shadow"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
