"use client";

import { WhatsAppIcon } from "@/components/ui/SocialIcons";

const WHATSAPP_HREF =
  "https://wa.me/254745381960?text=Hi%20Samuel%2C%20I%20found%20you%20on%20ChainQuest%20Ke%20and%20I%27d%20like%20to%20know%20more";

/**
 * Floating WhatsApp CTA — fixed bottom-right on every page.
 *
 * - Tap target sized for mobile (w-14) and a touch larger on md+ (w-16).
 * - Pulse ring uses Tailwind's animate-ping on an absolutely-positioned
 *   sibling so the icon stays crisp while the ring expands.
 * - "Online" dot is a 3px green circle with its own subtle ping ring.
 * - Tooltip is sibling-controlled CSS (group-hover) — no JS state needed.
 */
export default function WhatsAppFloat() {
  return (
    <div className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-50">
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Samuel on WhatsApp"
        className="group relative flex items-center"
      >
        {/* Tooltip — visible on hover (desktop) and focus */}
        <span
          role="tooltip"
          className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-[#0f1d35] px-3 py-1.5 text-sm font-medium text-white shadow-lg ring-1 ring-[#f5c218]/20 opacity-0 translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0"
        >
          Chat with Samuel
          {/* Tooltip arrow */}
          <span
            aria-hidden="true"
            className="absolute top-1/2 -right-1 -translate-y-1/2 h-2 w-2 rotate-45 bg-[#0f1d35] ring-1 ring-[#f5c218]/20"
          />
        </span>

        {/* Button + pulse ring */}
        <span className="relative inline-flex">
          {/* Outer pulse ring */}
          <span
            aria-hidden="true"
            className="absolute inset-0 inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-60"
          />

          {/* The actual button */}
          <span className="relative inline-flex items-center justify-center h-14 w-14 md:h-16 md:w-16 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 ring-1 ring-white/20 transition-transform duration-200 group-hover:scale-110 group-active:scale-95">
            <WhatsAppIcon className="h-7 w-7 md:h-8 md:w-8" />
          </span>

          {/* "Online" dot */}
          <span
            aria-hidden="true"
            className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5"
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-[#080e1e]" />
          </span>
        </span>

        {/* Screen-reader-only label so the link still announces well */}
        <span className="sr-only">Chat with Samuel on WhatsApp — online</span>
      </a>
    </div>
  );
}
