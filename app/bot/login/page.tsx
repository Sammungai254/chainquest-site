"use client";

import { useState, useTransition } from "react";
import { Bot, Lock, Eye, EyeOff } from "lucide-react";

async function attempt(password: string): Promise<boolean> {
  const res = await fetch("/api/bot-auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  return res.ok;
}

export default function BotLogin() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      const ok = await attempt(password);
      if (ok) {
        window.location.href = "/bot";
      } else {
        setError("Incorrect password.");
        setPassword("");
      }
    });
  }

  return (
    <main className="min-h-screen bg-[#080e1e] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#f5c218]/10 border border-[#f5c218]/20 mb-4">
            <Bot size={26} className="text-[#f5c218]" />
          </div>
          <h1 className="text-xl font-bold text-[#f0f4ff]">Bot Dashboard</h1>
          <p className="text-sm text-[#8fa3c8] mt-1">Enter the access password to continue</p>
        </div>

        <form onSubmit={submit} className="bg-[#0d1526] border border-white/5 rounded-2xl p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-[#8fa3c8]">
              Password
            </label>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8fa3c8]" />
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-10 py-2.5 text-sm text-[#f0f4ff] placeholder-[#8fa3c8] focus:outline-none focus:border-[#f5c218]/40 transition-colors"
                placeholder="••••••••"
                required
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8fa3c8] hover:text-[#f0f4ff] transition-colors"
              >
                {show ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending || !password}
            className="w-full py-2.5 rounded-xl bg-[#f5c218] text-[#080e1e] font-bold text-sm hover:bg-[#fad857] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {pending ? "Checking…" : "Access Dashboard"}
          </button>
        </form>

        <p className="text-center text-xs text-[#8fa3c8] mt-6">
          <a href="/" className="hover:text-[#f5c218] transition-colors">← Back to ChainQuest</a>
        </p>
      </div>
    </main>
  );
}
