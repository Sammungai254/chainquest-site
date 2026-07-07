import { ImageResponse } from "next/og";

// Image metadata — Next.js auto-wires these into <head> og:image:* tags.
export const alt =
  "ChainQuest Ke — Digital Solutions & Systems Development in Nairobi. Software, GIS, AI Integration & Web3 education. 50+ clients across East Africa.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand palette (matches the site).
const NAVY = "#080e1e";
const NAVY_2 = "#0f1830";
const GOLD = "#f5c218";
const TEXT = "#f0f4ff";
const MUTED = "#9aa5c4";

/**
 * Root Open Graph card — what WhatsApp, iMessage, LinkedIn, Slack, X, and
 * Facebook show when someone shares https://chainquest.co.ke.
 *
 * Designed for the 1.91:1 link-preview aspect ratio (1200×630). Every
 * container uses `display: flex` because Satori (the renderer behind
 * next/og) requires it — block layout silently breaks.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          // Subtle navy radial so the card has depth, not a flat slab.
          background: `radial-gradient(1200px 600px at 85% -10%, ${NAVY_2} 0%, ${NAVY} 60%)`,
          color: TEXT,
          fontFamily:
            "'Geist', 'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Gold corner accent — small brand signal in the top-right. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 220,
            height: 8,
            background: GOLD,
            display: "flex",
          }}
        />

        {/* Header: logo lockup */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginBottom: 56,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 14,
              background: GOLD,
              color: NAVY,
              fontSize: 32,
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
                fontSize: 30,
                fontWeight: 700,
                color: TEXT,
                letterSpacing: -0.5,
              }}
            >
              ChainQuest Ke
            </div>
            <div style={{ fontSize: 18, color: MUTED, marginTop: 4 }}>
              chainquest.co.ke
            </div>
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
            color: TEXT,
            maxWidth: 980,
          }}
        >
          <span>
            <span style={{ color: GOLD }}>Digital</span> Solutions
          </span>
          <span>&amp; Systems Development</span>
        </div>

        {/* Services row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginTop: 36,
            fontSize: 26,
            color: MUTED,
            fontWeight: 500,
          }}
        >
          <span>Software</span>
          <span style={{ color: GOLD }}>·</span>
          <span>GIS</span>
          <span style={{ color: GOLD }}>·</span>
          <span>AI</span>
          <span style={{ color: GOLD }}>·</span>
          <span>Web3</span>
        </div>

        {/* Spacer pushes the footer row to the bottom. */}
        <div style={{ display: "flex", flex: 1 }} />

        {/* Footer: proof point + location */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid rgba(245, 194, 24, 0.25)`,
            paddingTop: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 26,
              fontWeight: 600,
              color: TEXT,
            }}
          >
            {/* Gold disc used in place of ★. Satori only ships a narrow
                glyph set; using a pure CSS shape (no text inside) is
                guaranteed crisp in every renderer with zero font fetches. */}
            <span
              style={{
                display: "flex",
                width: 18,
                height: 18,
                borderRadius: 999,
                background: GOLD,
              }}
            />
            <span>50+ clients served across East Africa</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 22,
              color: MUTED,
              fontWeight: 500,
            }}
          >
            <span
              style={{
                display: "flex",
                width: 10,
                height: 10,
                borderRadius: 999,
                background: GOLD,
              }}
            />
            <span>Nairobi, Kenya</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
