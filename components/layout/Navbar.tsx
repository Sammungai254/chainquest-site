"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";

// Real anchors (`/#about`) instead of bare `#about` so the same href works
// from every route: on the homepage the browser scrolls to the hash, and
// from /blog/* Next.js navigates home first, then scrolls to the section.
const navLinks = [
  { label: "Home", href: "/#hero" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Community", href: "/#community" },
  { label: "Contact", href: "/#contact" },
];

// Wrap next/link so the staggered menu animation lives on the real <a>.
// Using genuine links (not <button> + JS scroll) is what makes mobile taps
// navigate reliably — there's a native fallback even if a framer-motion
// gesture or the menu's exit animation interferes with the synthetic click.
const MotionLink = motion.create(Link);

// "/#about" -> "about"
const sectionId = (href: string) => href.split("#")[1] ?? "";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active-section tracking only matters on the homepage where the
      // anchors actually exist. On other routes (e.g. /blog) skip it.
      if (!isHome) return;
      const sections = navLinks.map((l) => sectionId(l.href));
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(section);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#080e1e]/95 backdrop-blur-md border-b border-[#f5c218]/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <MotionLink
              href="/#hero"
              onClick={closeMenu}
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                {/* Chain "C" icon */}
                <div className="w-9 h-9 rounded-full border-2 border-[#f5c218] flex items-center justify-center bg-[#f5c218]/10 group-hover:bg-[#f5c218]/20 transition-all">
                  <span className="text-[#f5c218] font-black text-lg leading-none">C</span>
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#f5c218] rounded-full animate-pulse" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight">
                  <span className="text-[#f5c218]">Chain</span>
                  <span className="text-white">Quest</span>
                </span>
                <span className="text-[#f5c218]/70 text-xs font-semibold ml-1">Ke</span>
              </div>
            </MotionLink>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeSection === sectionId(link.href)
                      ? "text-[#f5c218] bg-[#f5c218]/10"
                      : "text-[#8fa3c8] hover:text-[#f0f4ff] hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:block">
              <Button variant="primary" size="sm" href="/#booking">
                Book a Session
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-lg text-[#8fa3c8] hover:text-[#f5c218] hover:bg-[#f5c218]/10 transition-all"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#080e1e]/98 backdrop-blur-md border-b border-[#f5c218]/10 md:hidden overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <MotionLink
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={closeMenu}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeSection === sectionId(link.href)
                      ? "text-[#f5c218] bg-[#f5c218]/10"
                      : "text-[#8fa3c8] hover:text-[#f0f4ff] hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </MotionLink>
              ))}
              <div className="pt-3 border-t border-[#f5c218]/10">
                <Button
                  variant="primary"
                  className="w-full justify-center"
                  href="/#booking"
                  onClick={closeMenu}
                >
                  Book a Session
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
