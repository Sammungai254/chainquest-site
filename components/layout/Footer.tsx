"use client";

import { motion } from "framer-motion";
import { Mail, Phone, ArrowUp } from "lucide-react";
import { XIcon, GitHubIcon, LinkedInIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";

const footerLinks = {
  Services: [
    { label: "Web Development", href: "#services" },
    { label: "Crypto Education", href: "#services" },
    { label: "AI Solutions", href: "#services" },
    { label: "Business Development", href: "#services" },
    { label: "Portfolio Creation", href: "#services" },
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Pricing", href: "#pricing" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ],
};

const socials = [
  { icon: XIcon, href: "https://twitter.com/chainquestke", label: "Twitter" },
  { icon: LinkedInIcon, href: "https://linkedin.com/company/chainquestke", label: "LinkedIn" },
  { icon: GitHubIcon, href: "https://github.com/chainquestke", label: "GitHub" },
  { icon: WhatsAppIcon, href: "https://wa.me/254745381960", label: "WhatsApp" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="bg-[#060b18] border-t border-[#f5c218]/10 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-overlay opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-full border-2 border-[#f5c218] flex items-center justify-center bg-[#f5c218]/10">
                <span className="text-[#f5c218] font-black text-lg">C</span>
              </div>
              <span className="text-lg font-black">
                <span className="text-[#f5c218]">Chain</span>
                <span className="text-white">Quest</span>
                <span className="text-[#f5c218]/70 text-xs ml-1">Ke</span>
              </span>
            </div>
            <p className="text-[#8fa3c8] text-sm leading-relaxed mb-5">
              Practical digital solutions for businesses and individuals across Kenya and East Africa.
            </p>
            {/* Contact info */}
            <div className="space-y-2">
              <a
                href="mailto:mungai.owino@chainquest.co.ke"
                className="flex items-center gap-2 text-[#8fa3c8] hover:text-[#f5c218] text-sm transition-colors group"
              >
                <Mail className="w-4 h-4 group-hover:text-[#f5c218]" />
                mungai.owino@chainquest.co.ke
              </a>
              <a
                href="tel:+254745381960"
                className="flex items-center gap-2 text-[#8fa3c8] hover:text-[#f5c218] text-sm transition-colors group"
              >
                <Phone className="w-4 h-4 group-hover:text-[#f5c218]" />
                +254 745 381 960
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-[#8fa3c8] hover:text-[#f5c218] text-sm transition-colors hover:translate-x-1 inline-flex items-center gap-1 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-[#f5c218] transition-all duration-200" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social + Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">
              Connect
            </h4>
            <div className="flex gap-3 mb-6">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-[#0f1d35] border border-[#f5c218]/10 flex items-center justify-center text-[#8fa3c8] hover:text-[#f5c218] hover:border-[#f5c218]/40 hover:bg-[#f5c218]/10 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
            <p className="text-[#8fa3c8] text-xs leading-relaxed">
              Follow ChainQuest Ke for updates on web development, GIS, blockchain, and AI work in Kenya.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#f5c218]/10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#8fa3c8] text-xs">
            © {new Date().getFullYear()} ChainQuest Ke. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[#8fa3c8] text-xs">Privacy Policy</span>
            <span className="text-[#8fa3c8]/30">|</span>
            <span className="text-[#8fa3c8] text-xs">Terms of Service</span>
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-10 h-10 bg-[#f5c218] text-[#080e1e] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(245,194,24,0.4)] hover:bg-[#fad857] transition-colors z-50"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4" />
      </motion.button>
    </footer>
  );
}
