"use client";

import React from "react";
import { cn } from "@/lib/utils";

type TravelPaceUiProps = {
    value?: string;
    onSelect: (value: string) => void;
};

const PACES = [
    {
        id: "relaxed",
        title: "Relaxed",
        desc: "2–3 places per day",
        emoji: "🐢",
    },
    {
        id: "moderate",
        title: "Moderate",
        desc: "4–5 places per day",
        emoji: "🚶",
    },
    {
        id: "packed",
        title: "Packed",
        desc: "6–8 places per day",
        emoji: "🏃",
    },
];

export default function TravelPaceUi({ value, onSelect }: TravelPaceUiProps) {
    return (
        <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md p-6 shadow-xl animate-fade-up">
            <div className="mb-4">
                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-cyan-200">
                    Travel pace
                </h3>
                <p className="text-sm text-white/60 mt-1">
                    How busy do you want your itinerary?
                </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {PACES.map((item) => {
                    const active = value === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onSelect(item.id)}
                            className={cn(
                                "rounded-xl border p-4 text-left transition-all duration-300",
                                active
                                    ? "border-cyan-500/50 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                                    : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                            )}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl">{item.emoji}</span>
                                <span className={cn("text-sm font-bold", active ? "text-cyan-300" : "text-white")}>
                                    {item.title}
                                </span>
                            </div>
                            <p className="text-xs text-white/50 leading-relaxed font-medium">{item.desc}</p>
                        </button>
                    );
                })}
            </div>

            {value && (
                <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white/40">
                    Selected: <span className="font-medium text-cyan-300">{value}</span>
                </div>
            )}
        </div>
    );
}
