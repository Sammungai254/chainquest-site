"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { XIcon, GitHubIcon, LinkedInIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@chainquestke.com",
    href: "mailto:info@chainquestke.com",
    color: "blue",
  },
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: "+254 745 381 960",
    href: "tel:+254745381960",
    color: "gold",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Nairobi, Kenya",
    href: "https://maps.google.com/?q=Nairobi,Kenya",
    color: "green",
  },
];

const socialLinks = [
  { icon: XIcon, href: "https://twitter.com/chainquestke", label: "Twitter / X" },
  { icon: LinkedInIcon, href: "https://linkedin.com/company/chainquestke", label: "LinkedIn" },
  { icon: GitHubIcon, href: "https://github.com/sammungai254", label: "GitHub" },
  { icon: WhatsAppIcon, href: "https://wa.me/254745381960", label: "WhatsApp" },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  gold: "bg-[#f5c218]/10 border-[#f5c218]/20 text-[#f5c218]",
  green: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
};

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-[#080e1e] border border-[#f5c218]/15 focus:border-[#f5c218]/50 rounded-xl px-4 py-3 text-[#f0f4ff] text-sm placeholder-[#8fa3c8]/60 outline-none transition-all duration-200 focus:bg-[#0a1220]";

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#080e1e] relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#f5c218]/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Get In Touch"
          title="Let's Build "
          highlight="Something Great"
          subtitle="Have a project in mind? Ready to level up digitally? Drop a message and let's start the conversation."
        />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact info */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-white font-bold text-xl mb-6">Contact Information</h3>

              <div className="space-y-4 mb-8">
                {contactInfo.map(({ icon: Icon, label, value, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-[#0f1d35] border border-white/5 hover:border-[#f5c218]/20 transition-all group"
                  >
                    <div className={`p-2.5 rounded-lg border ${colorMap[color]} flex-shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[#8fa3c8] text-xs font-medium">{label}</div>
                      <div className="text-white text-sm font-semibold group-hover:text-[#f5c218] transition-colors">
                        {value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social links */}
              <h4 className="text-white font-semibold text-sm mb-4">Follow ChainQuest Ke</h4>
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-xl bg-[#0f1d35] border border-[#f5c218]/10 flex items-center justify-center text-[#8fa3c8] hover:text-[#f5c218] hover:border-[#f5c218]/40 hover:bg-[#f5c218]/5 transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="mt-8 rounded-xl overflow-hidden border border-[#f5c218]/10 h-44 bg-[#0f1d35] flex items-center justify-center relative">
                <div className="absolute inset-0 grid-overlay opacity-30" />
                <div className="relative z-10 text-center">
                  <MapPin className="w-8 h-8 text-[#f5c218] mx-auto mb-2" />
                  <p className="text-white font-semibold text-sm">Nairobi, Kenya</p>
                  <p className="text-[#8fa3c8] text-xs">East Africa</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center p-12 rounded-2xl bg-[#0f1d35] border border-[#f5c218]/20 h-full min-h-[400px]"
              >
                <div className="w-16 h-16 rounded-full bg-[#f5c218]/10 border border-[#f5c218]/30 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-[#f5c218]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-[#8fa3c8] text-sm mb-6">
                  Thanks for reaching out! We&apos;ll get back to you within 24 hours.
                </p>
                <Button variant="outline" onClick={() => setStatus("idle")}>
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-[#0f1d35] border border-[#f5c218]/10 rounded-2xl p-6 md:p-8 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[#8fa3c8] text-xs font-medium mb-2">Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-[#8fa3c8] text-xs font-medium mb-2">Email *</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#8fa3c8] text-xs font-medium mb-2">Subject</label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-[#8fa3c8] text-xs font-medium mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us about your project, questions, or how we can help..."
                    required
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-sm text-center">
                    Something went wrong. Please try again.
                  </p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
