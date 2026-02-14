"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    ArrowRight,
    Send,
    Clock,
    Shield,
    Sparkles,
    Plane,
    Bot,
} from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulated submit
        await new Promise((resolve) => setTimeout(resolve, 1200));

        alert("Thanks! Our team will get back to you shortly ✈️");
        setFormData({ name: "", email: "", message: "" });
        setIsSubmitting(false);
    };

    return (
        <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950 via-slate-950 to-black text-white relative overflow-hidden">
            {/* ================= HERO ================= */}
            <section className="relative overflow-hidden py-16 sm:py-24 pt-32">
                {/* Background Gradients */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                    <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-600/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
                    <h1 className="text-4xl sm:text-6xl font-[family-name:var(--font-playfair)] font-bold tracking-tight mb-6 bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
                        We’re here to help you plan better trips
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Questions, feedback, or ideas?
                        Our team — powered by AI 🤖 — would love to hear from you.
                    </p>
                </div>
            </section>

            {/* ================= CONTACT OPTIONS ================= */}
            <section className="px-6 pb-20 relative z-10">
                <div className="container mx-auto max-w-5xl grid gap-6 md:grid-cols-3">
                    {[
                        {
                            emoji: "🛠",
                            title: "Support",
                            text: "Need help with a trip or your account?",
                            color: "text-cyan-400",
                            border: "group-hover:border-cyan-500/50",
                        },
                        {
                            emoji: "💡",
                            title: "Feedback",
                            text: "Share ideas to improve SmartJourney",
                            color: "text-purple-400",
                            border: "group-hover:border-purple-500/50",
                        },
                        {
                            emoji: "🤝",
                            title: "Partnerships",
                            text: "Let’s build something together",
                            color: "text-violet-400",
                            border: "group-hover:border-violet-500/50",
                        },
                    ].map((item) => (
                        <div
                            key={item.title}
                            className="
                                relative rounded-3xl p-px
                                bg-linear-to-br from-purple-500/30 via-pink-500/30 to-cyan-400/30
                                group hover:scale-[1.02] transition-transform duration-300
                            "
                        >
                            <div className="
                                rounded-3xl bg-black/40 backdrop-blur-xl
                                p-8 text-center
                                border border-white/10
                                group-hover:border-cyan-400/40
                                transition duration-300 h-full flex flex-col justify-between
                            ">
                                <div>
                                    <div className="
                                        w-16 h-16 mx-auto mb-6
                                        flex items-center justify-center
                                        rounded-full
                                        bg-white/5
                                        border border-white/10
                                        text-3xl
                                        shadow-[0_0_15px_rgba(168,85,247,0.2)]
                                    ">
                                        {item.emoji}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 font-[family-name:var(--font-playfair)]">
                                        {item.title}
                                    </h3>
                                    <p className="text-white/60 mb-6 leading-relaxed text-sm">
                                        {item.text}
                                    </p>
                                </div>
                                <span
                                    className={`inline-flex items-center justify-center gap-2 font-semibold text-sm uppercase tracking-wider ${item.color} transition-all group-hover:gap-3 mt-auto`}
                                >
                                    Get in touch <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ================= CONTACT FORM ================= */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#05010d]/50 -z-10" />

                <div className="container mx-auto px-6 max-w-2xl relative z-10">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 mb-4 backdrop-blur-sm">
                            <Sparkles className="w-4 h-4 text-blue-400" />
                            <span className="text-xs font-semibold text-blue-300 uppercase tracking-widest">
                                AI-Powered Support
                            </span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4 tracking-tight">
                            Send us a message
                        </h2>
                        <p className="text-gray-400">
                            We usually respond within 24 hours.
                        </p>
                    </div>

                    <div className="relative rounded-3xl p-px bg-linear-to-br from-purple-500/30 via-pink-500/30 to-cyan-400/30">
                        <form
                            onSubmit={handleSubmit}
                            className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/10 space-y-6"
                        >
                            <div className="space-y-2">
                                <input
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all hover:bg-white/10"
                                />
                            </div>
                            <div className="space-y-2">
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all hover:bg-white/10"
                                />
                            </div>
                            <div className="space-y-2">
                                <textarea
                                    placeholder="Tell us how we can help…"
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) =>
                                        setFormData({ ...formData, message: e.target.value })
                                    }
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all resize-none hover:bg-white/10"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-linear-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 text-white rounded-xl py-4 font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-purple-500/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>Sending...</>
                                ) : (
                                    <>Send Message <Send size={18} /></>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* ================= AI HELPER ================= */}
            <section className="py-12 relative z-10">
                <div className="container mx-auto px-6 max-w-3xl">
                    <div className="relative rounded-3xl p-px bg-linear-to-br from-purple-500/30 via-pink-500/30 to-cyan-400/30">
                        <div className="flex flex-col sm:flex-row items-center gap-6 bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-lg">
                            <div className="h-16 w-16 rounded-full bg-white/5 border border-white/10 text-cyan-400 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                                <Bot className="w-8 h-8" />
                            </div>
                            <p className="text-white/80 text-center sm:text-left text-lg leading-relaxed">
                                Many questions are answered instantly by our AI Trip Assistant —
                                but our human team is always here when you need us.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= TRUST ================= */}
            <section className="py-20 relative">
                <div className="container mx-auto px-6 max-w-4xl grid md:grid-cols-3 gap-12 text-center">
                    <TrustItem
                        icon={<Clock className="w-7 h-7" />}
                        title="Fast response"
                        text="Replies within 24 hours"
                    />
                    <TrustItem
                        icon={<Shield className="w-7 h-7" />}
                        title="Privacy first"
                        text="Your data is safe & secure"
                    />
                    <TrustItem
                        icon={<Sparkles className="w-7 h-7" />}
                        title="Human + AI"
                        text="Best of both worlds"
                    />
                </div>
            </section>

            {/* ================= CTA ================= */}
            <section className="py-24 relative overflow-hidden">
                {/* Glow Effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none" />

                <div className="container mx-auto px-6 text-center max-w-3xl relative z-10">
                    <div className="inline-block p-4 rounded-full bg-white/5 mb-6 animate-float">
                        <Plane className="mx-auto text-purple-400 w-8 h-8" />
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold mb-6 bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
                        Ready to plan your next trip?
                    </h2>
                    <p className="text-gray-400 mb-10 text-lg">
                        Let SmartJourney build your itinerary in seconds.
                    </p>
                    <Link href="/create-new-trip">
                        <button className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold rounded-full px-10 py-5 text-lg hover:scale-105 hover:shadow-cyan-500/25 transition-all shadow-xl flex items-center justify-center gap-3 mx-auto group">
                            Create New Trip
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </div>
            </section>
        </main>
    );
}

/* ================= TRUST ITEM ================= */
function TrustItem({
    icon,
    title,
    text,
}: {
    icon: React.ReactNode;
    title: string;
    text: string;
}) {
    return (
        <div className="flex flex-col items-center group">
            <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/10 text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-cyan-500/10 transition-all duration-300">
                {icon}
            </div>
            <h4 className="font-bold text-xl mb-2 text-white">{title}</h4>
            <p className="text-gray-400">{text}</p>
        </div>
    );
}
