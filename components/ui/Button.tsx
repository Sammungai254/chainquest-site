"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// Motion-enabled next/link so href buttons get client-side navigation
// (including /#section hash scrolling) instead of a full page reload.
const MotionLink = motion.create(Link);

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-300 cursor-pointer select-none";

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variants = {
    primary:
      "bg-[#f5c218] text-[#080e1e] hover:bg-[#fad857] shadow-[0_0_20px_rgba(245,194,24,0.3)] hover:shadow-[0_0_35px_rgba(245,194,24,0.5)]",
    secondary:
      "bg-[#1e4d8c] text-white hover:bg-[#2563eb] border border-[#2563eb]/30 hover:border-[#2563eb]",
    outline:
      "border border-[#f5c218]/40 text-[#f5c218] hover:bg-[#f5c218]/10 hover:border-[#f5c218]",
    ghost:
      "text-[#8fa3c8] hover:text-[#f5c218] hover:bg-[#f5c218]/5",
  };

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  if (href) {
    // External / non-route links (mailto:, https://, tel:) keep a plain
    // anchor; internal hrefs go through next/link for SPA navigation.
    const isExternal = /^(https?:|mailto:|tel:)/.test(href);

    if (isExternal) {
      return (
        <motion.a
          href={href}
          onClick={onClick}
          className={classes}
          whileHover={{ scale: disabled ? 1 : 1.03 }}
          whileTap={{ scale: disabled ? 1 : 0.97 }}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <MotionLink
        href={href}
        onClick={onClick}
        className={classes}
        whileHover={{ scale: disabled ? 1 : 1.03 }}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
    >
      {children}
    </motion.button>
  );
}
