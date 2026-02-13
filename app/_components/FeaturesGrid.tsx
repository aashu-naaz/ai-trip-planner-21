import React from 'react';
import { Building2, MapPinned, Wallet, Sparkles, Users, Bookmark } from 'lucide-react';

const features = [
    {
        icon: <Building2 className="w-8 h-8 text-blue-500" />,
        title: "Hotel recommendations",
        description: "Get curated hotel stays based on your budget and style.",
        className: "lg:col-span-1"
    },
    {
        icon: <MapPinned className="w-8 h-8 text-green-500" />,
        title: "Smart itinerary builder",
        description: "Day-by-day plans optimized for travel time and enjoyment.",
        className: "lg:col-span-2"
    },
    {
        icon: <Wallet className="w-8 h-8 text-orange-500" />,
        title: "Budget planning",
        description: "Estimate daily costs to keep your trip pocket-friendly.",
        className: "lg:col-span-1"
    },
    {
        icon: <Sparkles className="w-8 h-8 text-purple-500" />,
        title: "Hidden gems",
        description: "Discover off-the-beaten-path spots that locals love.",
        className: "lg:col-span-1"
    },
    {
        icon: <Users className="w-8 h-8 text-pink-500" />,
        title: "Group trip planning",
        description: "Easily plan for solo travelers, couples, or groups.",
        className: "lg:col-span-1"
    },
    {
        icon: <Bookmark className="w-8 h-8 text-indigo-500" />,
        title: "Save and view trips later",
        description: "Access your saved itineraries anytime from your dashboard.",
        className: "lg:col-span-2"
    }
];

function FeaturesGrid() {
    return (
        <section className="relative py-16 px-6 max-w-7xl mx-auto z-10">
            <div className="text-center mb-16">
                <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 mb-6 tracking-tight">
                    Everything you need.
                </h2>
                <p className="text-lg text-white/60 max-w-2xl mx-auto">
                    Powerful features designed to make your journey unforgettable.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className={`group relative rounded-3xl p-px bg-linear-to-br from-purple-500/30 via-pink-500/30 to-cyan-500/30 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-purple-500/20 ${feature.className || ""}`}
                    >
                        {/* Card Content  */}
                        <div className="relative h-full rounded-3xl bg-black/40 backdrop-blur-xl p-8 border border-white/10 hover:border-cyan-400/40 transition-colors duration-300 flex flex-col">

                            <div className="mb-6 w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>

                            <h3 className="text-xl font-bold text-white mb-3">
                                {feature.title}
                            </h3>

                            <p className="text-white/60 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default FeaturesGrid;
