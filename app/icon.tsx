import { ImageResponse } from "next/og";

// Standard browser-tab favicon. The Next.js file convention auto-wires
// <link rel="icon" href="/icon?<hash>" type="image/png" sizes="32x32">.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const NAVY = "#080e1e";
const GOLD = "#f5c218";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: NAVY,
          color: GOLD,
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: -1,
          // Slight rounding so the tab favicon reads as a badge,
          // not a hard square wedged against the page title.
          borderRadius: 6,
        }}
      >
        C
      </div>
    ),
    { ...size }
  );
}
