"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Bitcoin,
  Bot,
  Building2,
  Briefcase,
  ArrowRight,
  Sparkles,
  Map,
  Users,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

// Ordered so software / systems / AI / GIS lead; the two crypto cards sit
// last — still present and bookable, no longer mid-list. "Most Popular"
// now sits on Web Development, the flagship dev service.
const services = [
  {
    icon: Globe,
    title: "Web Development",
    tagline: "Business Platforms & Websites",
    description:
      "From full-scale business platforms and web apps to fast marketing sites. Built with React/Next.js and Django, optimized for speed, SEO, and conversions.",
    features: ["Business Websites", "Web Apps", "E-Commerce", "APIs & Backends"],
    color: "blue",
    popular: true,
  },
  {
    icon: Bot,
    title: "AI Solutions & Automation",
    tagline: "Intelligent Business Tools",
    description:
      "Integrate cutting-edge AI tools into your business — chatbots, content generation, workflow automation, and custom AI-powered applications.",
    features: ["AI Chatbots", "Content Automation", "Workflow AI", "Custom GPT Tools"],
    color: "purple",
    popular: false,
  },
  {
    icon: Map,
    title: "GIS & Spatial Data Solutions",
    tagline: "Mapping & Spatial Analysis",
    description:
      "Geospatial data processing, mapping, and spatial analysis for land, infrastructure, and business use cases. Built with industry-standard tools and integrated into web platforms where needed.",
    features: ["GIS", "PostGIS", "Spatial Analysis", "Land Data", "Mapping"],
    color: "green",
    popular: false,
  },
  {
    icon: Building2,
    title: "Business Digital Transformation",
    tagline: "Go Digital, Grow Faster",
    description:
      "Help traditional businesses migrate online: digital strategy, social media automation, CRM setup, and complete digital infrastructure.",
    features: ["Digital Strategy", "Social Media", "CRM Setup", "Brand Identity"],
    color: "green",
    popular: false,
  },
  {
    icon: Sparkles,
    title: "Custom Digital Solutions",
    tagline: "Tailored to Your Needs",
    description:
      "Have a unique challenge? We build custom solutions combining web, AI, and data technologies for your specific use case.",
    features: ["Custom Development", "API Integrations", "System Design", "Consulting"],
    color: "pink",
    popular: false,
  },
  {
    icon: Briefcase,
    title: "Portfolio Creation",
    tagline: "For Individuals & Businesses",
    description:
      "Stand out professionally with a compelling digital portfolio. Perfect for developers, designers, creatives, and growing businesses.",
    features: ["Personal Portfolios", "Business Profiles", "Case Studies", "SEO Optimized"],
    color: "orange",
    popular: false,
  },
  {
    icon: Bitcoin,
    title: "Crypto Education & Strategy",
    tagline: "Blockchain & Trading Basics",
    description:
      "Practical blockchain and trading education for individuals and teams — from getting started safely to building a long-term strategy.",
    features: ["Trading Basics", "Blockchain 101", "Risk Management", "Portfolio Strategy"],
    color: "gold",
    popular: false,
  },
  {
    icon: Users,
    title: "Crypto Community Management",
    tagline: "Education-First Community Growth",
    description:
      "Support for building and managing a crypto-focused community — content planning, member education, and structured engagement for an informed, active audience.",
    features: ["Community Building", "Telegram / Discord", "Education", "Engagement"],
    color: "orange",
    popular: false,
  },
];

const colorStyles: Record<string, { icon: string; badge: string; border: string; bg: string }> = {
  blue: {
    icon: "text-blue-400",
    badge: "bg-blue-500/20 text-blue-300",
    border: "border-blue-500/20 hover:border-blue-400/40",
    bg: "bg-blue-500/5",
  },
  gold: {
    icon: "text-[#f5c218]",
    badge: "bg-[#f5c218]/20 text-[#f5c218]",
    border: "border-[#f5c218]/20 hover:border-[#f5c218]/50",
    bg: "bg-[#f5c218]/5",
  },
  purple: {
    icon: "text-purple-400",
    badge: "bg-purple-500/20 text-purple-300",
    border: "border-purple-500/20 hover:border-purple-400/40",
    bg: "bg-purple-500/5",
  },
  green: {
    icon: "text-emerald-400",
    badge: "bg-emerald-500/20 text-emerald-300",
    border: "border-emerald-500/20 hover:border-emerald-400/40",
    bg: "bg-emerald-500/5",
  },
  orange: {
    icon: "text-orange-400",
    badge: "bg-orange-500/20 text-orange-300",
    border: "border-orange-500/20 hover:border-orange-400/40",
    bg: "bg-orange-500/5",
  },
  pink: {
    icon: "text-pink-400",
    badge: "bg-pink-500/20 text-pink-300",
    border: "border-pink-500/20 hover:border-pink-400/40",
    bg: "bg-pink-500/5",
  },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Services() {
  const scrollToBooking = () =>
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="services"
      className="py-20 md:py-28 bg-[#080e1e] relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#f5c218]/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#f5c218]/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="What We Offer"
          title="Services That Drive "
          highlight="Real Results"
          subtitle="From software and business systems to GIS and AI integration — comprehensive digital solutions designed for the African market, with Web3 education alongside."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const styles = colorStyles[service.color];
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={`relative group p-6 rounded-2xl bg-[#0f1d35] border ${styles.border} transition-all duration-300 cursor-default`}
              >
                {/* Popular badge */}
                {service.popular && (
                  <div className="absolute -top-3 left-6 px-3 py-0.5 bg-[#f5c218] text-[#080e1e] text-xs font-bold rounded-full shadow-[0_0_15px_rgba(245,194,24,0.4)]">
                    Most Popular
                  </div>
                )}

                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl ${styles.bg} border ${styles.border} mb-4`}>
                  <Icon className={`w-6 h-6 ${styles.icon}`} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-1">{service.title}</h3>
                <p className={`text-xs font-semibold mb-3 ${styles.icon}`}>{service.tagline}</p>
                <p className="text-[#8fa3c8] text-sm leading-relaxed mb-4">{service.description}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {service.features.map((f) => (
                    <span
                      key={f}
                      className={`px-2 py-0.5 rounded-md text-xs font-medium ${styles.badge}`}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={scrollToBooking}
                  className={`flex items-center gap-2 text-sm font-semibold ${styles.icon} opacity-70 group-hover:opacity-100 transition-opacity`}
                >
                  Book this service
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 text-center"
        >
          <p className="text-[#8fa3c8] mb-5">
            Not sure which service fits you? Let&apos;s discuss your goals.
          </p>
          <Button variant="primary" size="lg" onClick={scrollToBooking}>
            Book a Free Consultation
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
