"use client";

import { motion } from "framer-motion";
import { Check, Zap, Star, Building2, Cpu } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const plans = [
  {
    id: "beginner",
    icon: Zap,
    name: "Beginner Training",
    tagline: "Perfect for getting started",
    price: 5000,
    currency: "KES",
    period: "per session",
    color: "blue",
    popular: false,
    features: [
      "1-on-1 intro session (2 hrs)",
      "Crypto & blockchain basics",
      "Web fundamentals overview",
      "Resource library access",
      "WhatsApp support (7 days)",
      "Certificate of completion",
    ],
    cta: "Get Started",
    note: "Ideal for beginners — no prior experience needed",
  },
  {
    id: "advanced",
    icon: Star,
    name: "Advanced Crypto Strategy",
    tagline: "For serious investors & traders",
    price: 15000,
    currency: "KES",
    period: "per month",
    color: "gold",
    popular: true,
    features: [
      "Weekly 1-on-1 strategy sessions",
      "Live trading & DeFi guidance",
      "NFT & altcoin analysis",
      "Portfolio review & optimization",
      "Exclusive market signals",
      "Priority WhatsApp & email support",
      "Monthly webinar access",
    ],
    cta: "Join Now",
    note: "Most popular — includes live trading sessions",
  },
  {
    id: "website",
    icon: Building2,
    name: "Business Website Package",
    tagline: "Launch your digital presence",
    price: 35000,
    currency: "KES",
    period: "one-time",
    color: "green",
    popular: false,
    features: [
      "Custom 5-page website",
      "Mobile-first responsive design",
      "SEO optimization",
      "Contact & booking forms",
      "Google Analytics integration",
      "1-month free maintenance",
      "Training on content updates",
    ],
    cta: "Order Now",
    note: "Includes domain setup & hosting guidance",
  },
  {
    id: "ai",
    icon: Cpu,
    name: "Custom AI Solutions",
    tagline: "Tailored automation for your business",
    price: 0,
    currency: "KES",
    period: "custom quote",
    color: "purple",
    popular: false,
    features: [
      "Business needs assessment",
      "Custom AI tool development",
      "Chatbot & automation setup",
      "Staff training included",
      "API integrations",
      "3-month post-launch support",
      "Performance reporting",
    ],
    cta: "Request Quote",
    note: "Pricing based on scope — book a discovery call",
  },
];

const colorMap: Record<string, { border: string; icon: string; badge: string; glow: string }> = {
  blue: {
    border: "border-blue-500/30",
    icon: "text-blue-400",
    badge: "bg-blue-500/10 text-blue-300",
    glow: "shadow-[0_0_40px_rgba(37,99,235,0.1)]",
  },
  gold: {
    border: "border-[#f5c218]/50",
    icon: "text-[#f5c218]",
    badge: "bg-[#f5c218]/15 text-[#f5c218]",
    glow: "shadow-[0_0_50px_rgba(245,194,24,0.15)]",
  },
  green: {
    border: "border-emerald-500/30",
    icon: "text-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-300",
    glow: "shadow-[0_0_40px_rgba(16,185,129,0.1)]",
  },
  purple: {
    border: "border-purple-500/30",
    icon: "text-purple-400",
    badge: "bg-purple-500/10 text-purple-300",
    glow: "shadow-[0_0_40px_rgba(139,92,246,0.1)]",
  },
};

export default function Pricing() {
  const scrollToBooking = () =>
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="pricing" className="py-20 md:py-28 bg-[#060b18] relative overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 grid-overlay opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#f5c218]/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Pricing Plans"
          title="Transparent "
          highlight="Pricing"
          title2=" for Every Goal"
          subtitle="Invest in your digital future. Flexible packages for individuals, traders, and businesses of all sizes."
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {plans.map((plan, i) => {
            const styles = colorMap[plan.color];
            const Icon = plan.icon;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`relative flex flex-col rounded-2xl bg-[#0f1d35] border ${styles.border} ${plan.popular ? styles.glow : ""} transition-all duration-300 ${plan.popular ? "scale-105 z-10" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#f5c218] to-[#fad857] text-[#080e1e] text-xs font-black rounded-full whitespace-nowrap shadow-[0_0_20px_rgba(245,194,24,0.5)]">
                    ⭐ Most Popular
                  </div>
                )}

                <div className="p-6 flex-1">
                  {/* Icon + Name */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${styles.badge}`}>
                      <Icon className={`w-5 h-5 ${styles.icon}`} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm leading-tight">{plan.name}</h3>
                      <p className="text-[#8fa3c8] text-xs mt-0.5">{plan.tagline}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    {plan.price === 0 ? (
                      <div className={`text-2xl font-black ${styles.icon}`}>Custom</div>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="text-[#8fa3c8] text-sm">KES</span>
                        <span className={`text-3xl font-black ${styles.icon}`}>
                          {plan.price.toLocaleString()}
                        </span>
                      </div>
                    )}
                    <div className="text-[#8fa3c8] text-xs mt-0.5">{plan.period}</div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className={`w-4 h-4 ${styles.icon} mt-0.5 flex-shrink-0`} />
                        <span className="text-[#8fa3c8] text-xs leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Note */}
                  <p className={`text-xs ${styles.icon} opacity-70 mb-4 italic`}>{plan.note}</p>
                </div>

                {/* CTA */}
                <div className="px-6 pb-6">
                  <Button
                    variant={plan.popular ? "primary" : "outline"}
                    className="w-full justify-center"
                    onClick={scrollToBooking}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-[#8fa3c8] text-sm mt-10"
        >
          All prices are in Kenyan Shillings (KES). Payment via M-Pesa, bank transfer, or crypto.
          <br />
          Custom bundles available — <button onClick={scrollToBooking} className="text-[#f5c218] hover:underline">book a free discovery call</button>.
        </motion.p>
      </div>
    </section>
  );
}
