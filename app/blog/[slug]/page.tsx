import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, Clock, User, ArrowRight, Users } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { getPost, posts, type ContentBlock } from "@/lib/posts";
import { WHATSAPP_COMMUNITY_URL } from "@/lib/constants";

const SITE_URL = "https://chainquest.co.ke";

interface Props {
  params: Promise<{ slug: string }>;
}

// Static-generate every post at build time.
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return { title: "Article not found" };
  }

  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: "Samuel Mungai Owino", url: SITE_URL }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.excerpt,
      siteName: "ChainQuest Ke",
      publishedTime: post.publishedAt,
      authors: ["Samuel Mungai Owino"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

const colorMap: Record<
  string,
  { badge: string; accent: string; border: string }
> = {
  gold: {
    badge: "bg-[#f5c218]/15 text-[#f5c218] border-[#f5c218]/20",
    accent: "text-[#f5c218]",
    border: "border-[#f5c218]/20",
  },
  purple: {
    badge: "bg-purple-500/15 text-purple-300 border-purple-500/20",
    accent: "text-purple-400",
    border: "border-purple-500/20",
  },
  blue: {
    badge: "bg-blue-500/15 text-blue-300 border-blue-500/20",
    accent: "text-blue-400",
    border: "border-blue-500/20",
  },
};

function renderBlock(block: ContentBlock, idx: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          key={idx}
          className="text-2xl md:text-3xl font-bold text-white mt-12 mb-4 leading-tight"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={idx}
          className="text-xl md:text-2xl font-semibold text-white mt-8 mb-3 leading-snug"
        >
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p
          key={idx}
          className="text-[#c5d2e8] text-base md:text-lg leading-relaxed mb-5"
        >
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul
          key={idx}
          className="list-disc list-outside pl-6 mb-6 space-y-2 text-[#c5d2e8] text-base md:text-lg leading-relaxed marker:text-[#f5c218]"
        >
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol
          key={idx}
          className="list-decimal list-outside pl-6 mb-6 space-y-2 text-[#c5d2e8] text-base md:text-lg leading-relaxed marker:text-[#f5c218] marker:font-bold"
        >
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote
          key={idx}
          className="border-l-4 border-[#f5c218] pl-5 my-6 italic text-[#f0f4ff]"
        >
          <p>“{block.text}”</p>
          {block.cite && (
            <cite className="block mt-2 text-sm text-[#8fa3c8] not-italic">
              — {block.cite}
            </cite>
          )}
        </blockquote>
      );
    case "code":
      return (
        <pre
          key={idx}
          className="my-6 p-4 rounded-xl bg-[#060b18] border border-[#f5c218]/15 overflow-x-auto text-sm leading-relaxed"
        >
          <code className="text-[#f0f4ff] font-mono whitespace-pre">
            {block.text}
          </code>
        </pre>
      );
    case "note":
      return (
        <aside
          key={idx}
          className="my-6 p-4 rounded-xl bg-[#0f1d35] border border-[#f5c218]/20 text-[#c5d2e8] text-base leading-relaxed"
        >
          <span className="block text-xs font-bold uppercase tracking-widest text-[#f5c218] mb-1.5">
            Note
          </span>
          {block.text}
        </aside>
      );
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const styles = colorMap[post.color];
  const url = `${SITE_URL}/blog/${post.slug}`;

  // Suggest the next two posts.
  const otherPosts = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  // JSON-LD Article schema for SEO.
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: "Samuel Mungai Owino",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "ChainQuest Ke",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
  };

  return (
    <main className="min-h-screen bg-[#080e1e]">
      <Navbar />

      <article className="pt-32 md:pt-36 pb-20 md:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#f5c218]/6 blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#8fa3c8] hover:text-[#f5c218] text-sm font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All articles
          </Link>

          {/* Header */}
          <header className="mb-10">
            <span
              className={`inline-block mb-4 px-3 py-1 rounded-full text-xs font-bold border ${styles.badge}`}
            >
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.15] tracking-tight mb-5">
              {post.title}
            </h1>
            <p className="text-[#8fa3c8] text-lg md:text-xl leading-relaxed mb-6">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#8fa3c8] pb-6 border-b border-[#f5c218]/10">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime} read
              </span>
            </div>
          </header>

          {/* Body */}
          <div className="prose prose-invert max-w-none">
            {post.content.map(renderBlock)}
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-[#f5c218]/10 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-[#0f1d35] border border-white/5 text-[#8fa3c8]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Community CTA */}
          <div className="mt-12 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#0f1d35] via-[#0a1226] to-[#0f1d35] border border-[#25D366]/25 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#25D366]/15 blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-[#25D366]" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg mb-1">
                  Want more like this — live?
                </h3>
                <p className="text-[#8fa3c8] text-sm leading-relaxed">
                  Join the free WhatsApp community for weekly Google Meet
                  classes, updates, and member-only resources.
                </p>
              </div>
              <a
                href={WHATSAPP_COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] text-[#072a17] font-bold text-sm shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] hover:bg-[#2ee878] transition-all flex-shrink-0"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Join Community
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Related */}
          {otherPosts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
                Keep reading
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {otherPosts.map((other) => {
                  const otherStyles = colorMap[other.color];
                  return (
                    <Link
                      key={other.slug}
                      href={`/blog/${other.slug}`}
                      className={`group p-5 rounded-2xl bg-[#0f1d35] border ${otherStyles.border} hover:border-[#f5c218]/40 transition-all`}
                    >
                      <span
                        className={`inline-block mb-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${otherStyles.badge}`}
                      >
                        {other.category}
                      </span>
                      <h3 className="text-white font-bold text-base mb-1.5 leading-snug group-hover:text-[#f5c218] transition-colors">
                        {other.title}
                      </h3>
                      <p className="text-[#8fa3c8] text-xs leading-relaxed line-clamp-2">
                        {other.excerpt}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </article>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </main>
  );
}
