import React from 'react';
import { Twitter, Instagram, Linkedin, Send, MapPin } from 'lucide-react';
import Link from 'next/link';

function Footer() {
    return (
        <footer className="relative w-full mt-24">
            {/* --- Final CTA Section --- */}
            <div className="relative w-full py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-purple-600 via-pink-600 to-cyan-600 opacity-90" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                        Ready to plan your next escape?
                    </h2>
                    <p className="text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto">
                        Join thousands of travelers building their dream itineraries with AI in seconds.
                    </p>
                    <Link href="/create-new-trip">
                        <button className="bg-white text-black font-bold text-lg px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-xl hover:shadow-2xl">
                            Start Planning →
                        </button>
                    </Link>
                </div>
            </div>

            {/* --- Main Footer Content --- */}
            <div className="bg-black border-t border-white/10 pt-20 pb-10 px-6 md:px-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Column 1: Brand & Socials */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-linear-to-tr from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
                                <MapPin className="text-white w-6 h-6" />
                            </div>
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-cyan-400">
                                Smart Journey
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            AI-powered trip planning for the modern traveler. Discover, plan, and explore the world with ease.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <Link key={i} href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-cyan-400 transition-colors text-gray-400">
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Product */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Product</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><Link href="#" className="hover:text-cyan-400 transition-colors">Features</Link></li>
                            <li><Link href="#" className="hover:text-cyan-400 transition-colors">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-cyan-400 transition-colors">Testimonials</Link></li>
                            <li><Link href="#" className="hover:text-cyan-400 transition-colors">Download App</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Community */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Community</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><Link href="#" className="hover:text-cyan-400 transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-cyan-400 transition-colors">Travel Forums</Link></li>
                            <li><Link href="#" className="hover:text-cyan-400 transition-colors">Help Center</Link></li>
                            <li><Link href="#" className="hover:text-cyan-400 transition-colors">Guidelines</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Stay Updated</h4>
                        <p className="text-gray-400 text-sm mb-4">
                            Get the latest travel hacks and AI features delivered to your inbox.
                        </p>
                        <form className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500 transition-colors"
                            />
                            <button className="bg-linear-to-r from-purple-500 to-cyan-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity">
                                Subscribe
                            </button>
                        </form>
                    </div>

                </div>

                {/* Copyright */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>© 2024 Smart Journey AI. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
