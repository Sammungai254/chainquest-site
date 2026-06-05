import { ImageResponse } from "next/og";

// iOS "Add to Home Screen" icon. Apple requires 180×180 PNG with no
// transparency — iOS will round the corners and add a glossy mask itself.
// The Next.js file convention auto-emits <link rel="apple-touch-icon">.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const NAVY = "#080e1e";
const NAVY_2 = "#0f1830";
const GOLD = "#f5c218";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // Brand-aligned diagonal so the home-screen icon doesn't
          // look like a flat color block at small sizes.
          background: `linear-gradient(135deg, ${NAVY_2} 0%, ${NAVY} 100%)`,
          color: GOLD,
          fontSize: 92,
          fontWeight: 800,
          letterSpacing: -4,
          fontFamily:
            "'Geist', 'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        CQ
      </div>
    ),
    { ...size }
  );
}
