import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Calendar, Clock, User, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/ui/SectionHeading";
import { posts } from "@/lib/posts";

const SITE_URL = "https://chainquest.co.ke";

export const metadata: Metadata = {
  title: "Insights — Crypto, AI & Web3 Articles",
  description:
    "Practical articles on DeFi, AI in crypto trading, and Web3 development — written for African builders, traders, and investors by Samuel Mungai.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "ChainQuest Ke Insights — Crypto, AI & Web3 Articles",
    description:
      "Practical articles on DeFi, AI in crypto trading, and Web3 development for African builders.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

const colorMap: Record<
  string,
  { badge: string; border: string; text: string; bg: string; glow: string }
> = {
  gold: {
    badge: "bg-[#f5c218]/15 text-[#f5c218] border-[#f5c218]/20",
    border: "border-[#f5c218]/20 hover:border-[#f5c218]/50",
    text: "text-[#f5c218]",
    bg: "bg-[#f5c218]/5",
    glow: "hover:shadow-[0_8px_40px_rgba(245,194,24,0.15)]",
  },
  purple: {
    badge: "bg-purple-500/15 text-purple-300 border-purple-500/20",
    border: "border-purple-500/20 hover:border-purple-400/40",
    text: "text-purple-400",
    bg: "bg-purple-500/5",
    glow: "hover:shadow-[0_8px_40px_rgba(139,92,246,0.15)]",
  },
  blue: {
    badge: "bg-blue-500/15 text-blue-300 border-blue-500/20",
    border: "border-blue-500/20 hover:border-blue-400/40",
    text: "text-blue-400",
    bg: "bg-blue-500/5",
    glow: "hover:shadow-[0_8px_40px_rgba(37,99,235,0.15)]",
  },
};

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen bg-[#080e1e]">
      <Navbar />

      <section className="pt-32 md:pt-36 pb-20 md:pb-28 bg-[#080e1e] relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#f5c218]/8 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#8fa3c8] hover:text-[#f5c218] text-sm font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <SectionHeading
            badge="Insights & Articles"
            title="Notes on "
            highlight="Crypto, AI & Web3"
            subtitle="Practical takes on the tech shaping Africa's digital economy — written from the ground up."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((article) => {
              const styles = colorMap[article.color];

              return (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className={`group relative flex flex-col rounded-2xl bg-[#0f1d35] border ${styles.border} transition-all duration-300 overflow-hidden ${styles.glow}`}
                >
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

                    <span
                      className={`inline-flex items-center gap-1.5 text-sm font-semibold ${styles.text}`}
                    >
                      Read Article
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
