"use client";

import React from "react";
import { cn } from "@/lib/utils";

type TripStyleUiProps = {
    value?: string;
    onSelect: (value: string) => void;
};

const TRIP_STYLES = [
    {
        id: "relaxed",
        title: "Relaxed",
        desc: "Take it easy",
        emoji: "😌",
    },
    {
        id: "balanced",
        title: "Balanced",
        desc: "Sightseeing + Rest",
        emoji: "🎯",
    },
    {
        id: "fast",
        title: "Fast-paced",
        desc: "See everything possible",
        emoji: "⚡",
    },
    {
        id: "culture",
        title: "Culture-focused",
        desc: "History & Art",
        emoji: "🏛️",
    },
    {
        id: "food",
        title: "Food-focused",
        desc: "Culinary journey",
        emoji: "🍜",
    },
    {
        id: "leisure",
        title: "Leisure",
        desc: "Beaches & Spas",
        emoji: "🏖️",
    },
];

export default function TripStyleUi({ value, onSelect }: TripStyleUiProps) {
    return (
        <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md p-6 shadow-xl animate-fade-up">
            <div className="mb-4">
                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-cyan-200">
                    Travel vibe
                </h3>
                <p className="text-sm text-white/60 mt-1">
                    What's your travel mood?
                </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {TRIP_STYLES.map((item) => {
                    const active = value === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onSelect(item.id)}
                            className={cn(
                                "flex items-start gap-4 rounded-xl border p-4 text-left transition-all duration-300 group",
                                active
                                    ? "border-purple-500/50 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                                    : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                            )}
                        >
                            <div
                                className={cn(
                                    "flex h-10 w-10 items-center justify-center rounded-lg text-lg transition-transform group-hover:scale-110",
                                    active ? "bg-purple-500/20" : "bg-white/10"
                                )}
                            >
                                {item.emoji}
                            </div>

                            <div className="flex-1 pt-0.5">
                                <div className={cn("text-sm font-bold", active ? "text-purple-300" : "text-white")}>
                                    {item.title}
                                </div>
                                <div className="text-xs text-white/50 mt-1 font-medium">{item.desc}</div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {value && (
                <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white/40">
                    Selected: <span className="font-medium text-purple-300">{value}</span>
                </div>
            )}
        </div>
    );
}
