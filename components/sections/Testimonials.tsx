"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const testimonials = [
  {
    id: 1,
    name: "Amina Kariuki",
    role: "Small Business Owner",
    location: "Nairobi, Kenya",
    avatar: "AK",
    rating: 5,
    text: "ChainQuest Ke transformed my business! Samuel built me a professional website that now gets 10x more inquiries than my old Facebook page. The training was also clear and practical — I now run basic updates myself.",
    service: "Business Website Package",
    color: "blue",
  },
  {
    id: 2,
    name: "Brian Otieno",
    role: "Crypto Trader",
    location: "Mombasa, Kenya",
    avatar: "BO",
    rating: 5,
    text: "The Advanced Crypto Strategy sessions were eye-opening. I went from making random trades to having a clear strategy. My portfolio has grown 40% since working with ChainQuest Ke. Highly recommend to any serious trader.",
    service: "Advanced Crypto Strategy",
    color: "gold",
  },
  {
    id: 3,
    name: "Faith Wanjiku",
    role: "Freelance Developer",
    location: "Thika, Kenya",
    avatar: "FW",
    rating: 5,
    text: "As a fresh graduate, I needed a portfolio that stands out. Samuel designed something stunning that helped me land my first 3 contracts within 2 months of launch. Worth every shilling!",
    service: "Portfolio Creation",
    color: "green",
  },
  {
    id: 4,
    name: "James Mwangi",
    role: "Restaurant Owner",
    location: "Nakuru, Kenya",
    avatar: "JM",
    rating: 5,
    text: "The AI chatbot ChainQuest Ke built for us handles 70% of our reservation inquiries automatically. Our staff can focus on actual service now. The ROI was visible in the first month.",
    service: "AI Solutions & Automation",
    color: "purple",
  },
  {
    id: 5,
    name: "Grace Njeri",
    role: "Digital Marketing Manager",
    location: "Nairobi, Kenya",
    avatar: "GN",
    rating: 5,
    text: "The beginner blockchain training was perfect — I finally understand how crypto and Web3 work from a business perspective. Samuel explains complex concepts in simple, relatable ways. Will definitely book the advanced session.",
    service: "Beginner Training",
    color: "orange",
  },
];

const colorAvatars: Record<string, string> = {
  blue: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  gold: "bg-[#f5c218]/20 text-[#f5c218] border-[#f5c218]/30",
  green: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  purple: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  orange: "bg-orange-500/20 text-orange-300 border-orange-500/30",
};

const colorBadge: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-300",
  gold: "bg-[#f5c218]/10 text-[#f5c218]",
  green: "bg-emerald-500/10 text-emerald-300",
  purple: "bg-purple-500/10 text-purple-300",
  orange: "bg-orange-500/10 text-orange-300",
};

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-20 md:py-28 bg-[#060b18] relative overflow-hidden"
    >
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#1e4d8c]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Client Stories"
          title="What Our "
          highlight="Clients Say"
          subtitle="Real results from real people. Hundreds of students, businesses, and traders across Kenya and East Africa trust ChainQuest Ke."
        />

        {/* Rating summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-6 mb-12"
        >
          <div className="text-center">
            <div className="text-4xl font-black text-[#f5c218]">5.0</div>
            <div className="flex gap-0.5 justify-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#f5c218] text-[#f5c218]" />
              ))}
            </div>
            <div className="text-[#8fa3c8] text-xs mt-1">Average Rating</div>
          </div>
          <div className="h-12 w-px bg-[#f5c218]/20" />
          <div className="text-center">
            <div className="text-4xl font-black text-[#f5c218]">50+</div>
            <div className="text-[#8fa3c8] text-xs mt-1">Happy Clients</div>
          </div>
          <div className="h-12 w-px bg-[#f5c218]/20" />
          <div className="text-center">
            <div className="text-4xl font-black text-[#f5c218]">100%</div>
            <div className="text-[#8fa3c8] text-xs mt-1">Satisfaction</div>
          </div>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className={`relative p-6 rounded-2xl bg-[#0f1d35] border border-white/5 hover:border-[#f5c218]/20 transition-all duration-300 ${i === 1 ? "md:row-span-1" : ""}`}
            >
              {/* Quote icon */}
              <Quote className="absolute top-5 right-5 w-8 h-8 text-[#f5c218]/10" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, si) => (
                  <Star key={si} className="w-3.5 h-3.5 fill-[#f5c218] text-[#f5c218]" />
                ))}
              </div>

              {/* Text */}
              <p className="text-[#8fa3c8] text-sm leading-relaxed mb-5 relative z-10">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Service badge */}
              <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-4 ${colorBadge[t.color]}`}>
                {t.service}
              </span>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div
                  className={`w-10 h-10 rounded-full border flex items-center justify-center font-bold text-sm flex-shrink-0 ${colorAvatars[t.color]}`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">{t.name}</div>
                  <div className="text-[#8fa3c8] text-xs">
                    {t.role} · {t.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
