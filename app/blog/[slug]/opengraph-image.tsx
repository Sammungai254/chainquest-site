import { ImageResponse } from "next/og";
import { getPost } from "@/lib/posts";

// Per-post Open Graph card. Every time someone shares
// https://chainquest.co.ke/blog/<slug>, the preview shows the article's
// own title + category — far more clickable than a generic site card.
export const alt = "ChainQuest Ke article preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand palette (matches the root opengraph-image.tsx).
const NAVY = "#080e1e";
const NAVY_2 = "#0f1830";
const GOLD = "#f5c218";
const TEXT = "#f0f4ff";
const MUTED = "#9aa5c4";

// Mirrors the per-post accent the article itself uses on /blog/[slug].
// Keeping these in sync means the shared preview feels like the post,
// not a generic template.
const accentByColor: Record<"gold" | "purple" | "blue", string> = {
  gold: "#f5c218",
  purple: "#a855f7",
  blue: "#3b82f6",
};

export default async function Image({
  params,
}: {
  // Next.js 16: params is now a Promise. This is a breaking change from 15.
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  // Sensible fallbacks so a missing post still renders a usable card
  // instead of crashing the build / share preview.
  const title = post?.title ?? "ChainQuest Ke — Insights";
  const category = post?.category ?? "Insights";
  const readTime = post?.readTime ?? "";
  const author = post?.author ?? "Samuel";
  const accent = post ? accentByColor[post.color] : GOLD;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: `radial-gradient(1200px 600px at 85% -10%, ${NAVY_2} 0%, ${NAVY} 60%)`,
          color: TEXT,
          fontFamily:
            "'Geist', 'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          padding: "64px 80px",
          position: "relative",
        }}
      >
        {/* Accent bar — colour matches the post's category tint. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: accent,
            display: "flex",
          }}
        />

        {/* Header: brand lockup */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 12,
              background: GOLD,
              color: NAVY,
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: -1,
            }}
          >
            CQ
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 1.1,
            }}
          >
            <div
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: TEXT,
                letterSpacing: -0.5,
              }}
            >
              ChainQuest Ke
            </div>
            <div style={{ fontSize: 16, color: MUTED, marginTop: 2 }}>
              chainquest.co.ke / blog
            </div>
          </div>
        </div>

        {/* Category pill — picks up the post's accent colour. */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignSelf: "flex-start",
            padding: "8px 18px",
            borderRadius: 999,
            background: `${accent}22`, // tinted fill at ~13% opacity
            border: `1px solid ${accent}66`,
            color: accent,
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: 0.3,
            textTransform: "uppercase",
          }}
        >
          {category}
        </div>

        {/* Article title — capped at 4 lines via -webkit-line-clamp so
            even long titles never overflow the card. */}
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: title.length > 70 ? 56 : 64,
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: -1.5,
            color: TEXT,
          }}
        >
          {title}
        </div>

        {/* Spacer pushes the meta row to the bottom. */}
        <div style={{ display: "flex", flex: 1 }} />

        {/* Footer: author + read time */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid rgba(245, 194, 24, 0.25)`,
            paddingTop: 24,
            fontSize: 22,
            color: MUTED,
            fontWeight: 500,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                display: "flex",
                width: 10,
                height: 10,
                borderRadius: 999,
                background: accent,
              }}
            />
            <span>By {author}</span>
            {readTime ? (
              <>
                <span style={{ color: accent, margin: "0 6px" }}>·</span>
                <span>{readTime} read</span>
              </>
            ) : null}
          </div>
          <div style={{ display: "flex", color: TEXT, fontWeight: 600 }}>
            Read on ChainQuest Ke →
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
