"use client";

import { motion } from "framer-motion";
import {
  Users,
  Video,
  Bell,
  Calendar,
  ArrowRight,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import SectionHeading from "@/components/ui/SectionHeading";
import { WHATSAPP_COMMUNITY_URL } from "@/lib/constants";

const perks = [
  {
    icon: Video,
    title: "Weekly Live Classes",
    description:
      "Hands-on sessions hosted on Google Meet — covering crypto, AI, Web3 dev, and real-world tooling.",
  },
  {
    icon: Bell,
    title: "Webinar Alerts",
    description:
      "Be first to know when new webinars, AMAs, and workshop slots open — straight to your phone.",
  },
  {
    icon: Users,
    title: "Peer Network",
    description:
      "Learn alongside Kenyan builders, traders, and founders. Ask questions, share wins, and grow together.",
  },
  {
    icon: Sparkles,
    title: "Exclusive Resources",
    description:
      "Free templates, strategy notes, market briefs, and early access to new courses — members-only.",
  },
];

export default function Community() {
  return (
    <section
      id="community"
      className="py-20 md:py-28 bg-[#0a1226] relative overflow-hidden"
    >
      {/* Background flourishes */}
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#25D366]/8 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#f5c218]/8 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Join the Community"
          title="Learn Weekly. "
          highlight="Grow Together."
          subtitle="A free WhatsApp community for African builders, traders, and learners — plus weekly live classes on Google Meet hosted by Samuel."
        />

        <div className="grid lg:grid-cols-5 gap-8 items-stretch">
          {/* Left: Perks */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 grid sm:grid-cols-2 gap-4"
          >
            {perks.map((perk, idx) => {
              const Icon = perk.icon;
              return (
                <motion.div
                  key={perk.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="group p-5 rounded-2xl bg-[#0f1d35] border border-[#f5c218]/10 hover:border-[#f5c218]/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(245,194,24,0.08)]"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#f5c218]/10 border border-[#f5c218]/20 flex items-center justify-center mb-3 group-hover:bg-[#f5c218]/20 transition-colors">
                    <Icon className="w-5 h-5 text-[#f5c218]" />
                  </div>
                  <h3 className="text-white font-bold text-base mb-1.5">
                    {perk.title}
                  </h3>
                  <p className="text-[#8fa3c8] text-sm leading-relaxed">
                    {perk.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right: WhatsApp CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 relative"
          >
            <div className="relative h-full rounded-2xl overflow-hidden border border-[#25D366]/20 bg-gradient-to-br from-[#0f1d35] via-[#0a1226] to-[#0f1d35] p-6 md:p-8 flex flex-col">
              {/* Decorative glow */}
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#25D366]/15 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#f5c218]/10 blur-3xl pointer-events-none" />

              <div className="relative z-10 flex-1 flex flex-col">
                {/* Icon header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center">
                    <WhatsAppIcon className="w-6 h-6 text-[#25D366]" />
                  </div>
                  <div>
                    <p className="text-[#25D366] text-xs font-bold uppercase tracking-widest">
                      WhatsApp Group
                    </p>
                    <p className="text-white font-bold text-base">
                      ChainQuest Community
                    </p>
                  </div>
                </div>

                {/* Pitch */}
                <h3 className="text-white text-xl md:text-2xl font-black leading-tight mb-3">
                  Tap in. Show up. Level up.
                </h3>
                <p className="text-[#8fa3c8] text-sm leading-relaxed mb-6">
                  Join hundreds of African learners getting weekly Google Meet
                  classes, market updates, and member-only resources — free,
                  forever.
                </p>

                {/* Quick facts */}
                <ul className="space-y-2.5 mb-7">
                  {[
                    { icon: Calendar, text: "Weekly live classes on Google Meet" },
                    { icon: MessageCircle, text: "Updates & Q&A on WhatsApp" },
                    { icon: Users, text: "Free to join — no fees, no spam" },
                  ].map(({ icon: Icon, text }) => (
                    <li
                      key={text}
                      className="flex items-center gap-2.5 text-[#f0f4ff] text-sm"
                    >
                      <Icon className="w-4 h-4 text-[#25D366] flex-shrink-0" />
                      {text}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.a
                  href={WHATSAPP_COMMUNITY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-auto inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-[#25D366] text-[#072a17] font-bold text-base shadow-[0_0_25px_rgba(37,211,102,0.35)] hover:shadow-[0_0_40px_rgba(37,211,102,0.55)] hover:bg-[#2ee878] transition-all"
                  aria-label="Join the ChainQuest WhatsApp Community"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  Join the Community
                  <ArrowRight className="w-4 h-4" />
                </motion.a>

                <p className="mt-3 text-center text-[#8fa3c8] text-xs">
                  Opens in WhatsApp · Free to join
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
