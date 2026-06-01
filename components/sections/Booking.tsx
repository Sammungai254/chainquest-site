"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Send, CheckCircle, Loader2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const services = [
  "Web Development",
  "Crypto Education & Strategy",
  "AI Solutions & Automation",
  "Business Digital Transformation",
  "Portfolio Creation",
  "Custom Solution Consultation",
  "Beginner Training",
  "Advanced Crypto Strategy",
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  goals: string;
}

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  service: "",
  preferredDate: "",
  preferredTime: "",
  goals: "",
};

export default function Booking() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [errorMessage, setErrorMessage] = useState<string>("");

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Valid email is required";
    if (!form.service) newErrors.service = "Please select a service";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("success");
        setForm(initialForm);
      } else {
        setStatus("error");
        setErrorMessage(data?.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  const inputClass = (field: keyof FormData) =>
    `w-full bg-[#080e1e] border ${
      errors[field] ? "border-red-500/60" : "border-[#f5c218]/15 focus:border-[#f5c218]/50"
    } rounded-xl px-4 py-3 text-[#f0f4ff] text-sm placeholder-[#8fa3c8]/60 outline-none transition-all duration-200 focus:bg-[#0a1220]`;

  return (
    <section id="booking" className="py-20 md:py-28 bg-[#080e1e] relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#1e4d8c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f5c218]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Book a Session"
          title="Ready to "
          highlight="Get Started?"
          subtitle="Fill in the form below and we'll confirm your booking within 24 hours. First consultation is free."
        />

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Left: Info cards */}
          <div className="lg:col-span-2 space-y-4">
            {[
              {
                icon: Calendar,
                title: "Flexible Scheduling",
                desc: "Choose a time that works for you — mornings, evenings, or weekends.",
              },
              {
                icon: Clock,
                title: "Quick Response",
                desc: "We confirm all bookings within 24 hours via email or WhatsApp.",
              },
              {
                icon: CheckCircle,
                title: "Free Discovery Call",
                desc: "First 30-minute consultation is completely free — no commitment.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-4 p-5 rounded-xl bg-[#0f1d35] border border-[#f5c218]/10"
              >
                <div className="p-2 h-fit bg-[#f5c218]/10 rounded-lg flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#f5c218]" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm mb-1">{title}</div>
                  <div className="text-[#8fa3c8] text-xs leading-relaxed">{desc}</div>
                </div>
              </motion.div>
            ))}

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/254745381960?text=Hi%20ChainQuest%20Ke%2C%20I%27d%20like%20to%20book%20a%20session"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 p-5 rounded-xl bg-[#128C7E]/20 border border-[#128C7E]/30 hover:border-[#128C7E]/60 transition-all"
            >
              <svg className="w-8 h-8 text-[#25D366] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488"/>
              </svg>
              <div>
                <div className="text-white font-semibold text-sm">Chat on WhatsApp</div>
                <div className="text-[#8fa3c8] text-xs">Quick response guaranteed</div>
              </div>
            </motion.a>
          </div>

          {/* Right: Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center p-12 rounded-2xl bg-[#0f1d35] border border-[#f5c218]/20"
              >
                <div className="w-16 h-16 rounded-full bg-[#f5c218]/10 border border-[#f5c218]/30 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-[#f5c218]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Booking received!</h3>
                <p className="text-[#8fa3c8] text-sm mb-6 max-w-sm">
                  Check your email for confirmation. Samuel will be in touch within 24 hours via WhatsApp or email.
                </p>
                <Button variant="outline" onClick={() => setStatus("idle")}>
                  Submit Another Request
                </Button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-[#0f1d35] border border-[#f5c218]/10 rounded-2xl p-6 md:p-8 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[#8fa3c8] text-xs font-medium mb-2">
                      Full Name <span className="text-[#f5c218]">*</span>
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Kamau"
                      className={inputClass("name")}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-[#8fa3c8] text-xs font-medium mb-2">
                      Email Address <span className="text-[#f5c218]">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={inputClass("email")}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[#8fa3c8] text-xs font-medium mb-2">
                      Phone / WhatsApp
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+254 700000000"
                      className={inputClass("phone")}
                    />
                  </div>
                  <div>
                    <label className="block text-[#8fa3c8] text-xs font-medium mb-2">
                      Service Interested In <span className="text-[#f5c218]">*</span>
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className={`${inputClass("service")} cursor-pointer`}
                    >
                      <option value="">Select a service...</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[#8fa3c8] text-xs font-medium mb-2">
                      Preferred Date
                    </label>
                    <input
                      name="preferredDate"
                      type="date"
                      value={form.preferredDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      className={`${inputClass("preferredDate")} [color-scheme:dark]`}
                    />
                  </div>
                  <div>
                    <label className="block text-[#8fa3c8] text-xs font-medium mb-2">
                      Preferred Time
                    </label>
                    <select
                      name="preferredTime"
                      value={form.preferredTime}
                      onChange={handleChange}
                      className={`${inputClass("preferredTime")} cursor-pointer`}
                    >
                      <option value="">Any time</option>
                      <option value="8:00 AM">8:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="4:00 PM">4:00 PM</option>
                      <option value="6:00 PM">6:00 PM</option>
                      <option value="8:00 PM">8:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#8fa3c8] text-xs font-medium mb-2">
                    Tell us about your goals
                  </label>
                  <textarea
                    name="goals"
                    value={form.goals}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe what you're looking to achieve and any specific questions you have..."
                    className={`${inputClass("goals")} resize-none`}
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-sm text-center">
                    {errorMessage || "Something went wrong. Please try again"} or{" "}
                    <a href="https://wa.me/254745381960" className="text-[#f5c218] hover:underline">
                      WhatsApp us directly
                    </a>.
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
                      Submitting...
                    </>
                  ) : (
                    <>
                      Confirm Booking
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
