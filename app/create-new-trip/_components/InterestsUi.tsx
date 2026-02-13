"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type InterestsUiProps = {
    selected?: string[];
    onSelect: (values: string[]) => void;
};

const INTERESTS = [
    { id: "adventure", label: "Adventure", emoji: "🏔️" },
    { id: "sightseeing", label: "Sightseeing", emoji: "🏛️" },
    { id: "culture", label: "Culture", emoji: "🎭" },
    { id: "food", label: "Food", emoji: "🍜" },
    { id: "nightlife", label: "Nightlife", emoji: "🌃" },
    { id: "relaxation", label: "Relaxation", emoji: "🧘" },
    { id: "shopping", label: "Shopping", emoji: "🛍️" },
    { id: "beaches", label: "Beaches", emoji: "🏖️" },
    { id: "nature", label: "Nature", emoji: "🌿" },
    { id: "mountains", label: "Mountains", emoji: "⛰️" },
];

export default function InterestsUi({ selected = [], onSelect }: InterestsUiProps) {
    const [localSelected, setLocalSelected] = React.useState<string[]>(selected);

    const toggle = (id: string) => {
        setLocalSelected((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return Array.from(next);
        });
    };

    const clearAll = () => setLocalSelected([]);

    const handleContinue = () => {
        // Convert array to string for the onSelect prop which expects string[] but the parent expects a string message
        // Actually, looking at ChatBox, it expects a string message to send to AI.
        // So we should format the selected interests as a readable string.
        // However, the props say onSelect: (values: string[]) => void
        // But in ChatBox, sendMessage takes a string.
        // I should probably adjust this component to send a string representation or adjust ChatBox.
        // The user provided code has `onSelect: (values: string[]) => void;`
        // I will stick to the user's code for now, but I'll need to wrap it in ChatBox to join the array.
        onSelect(localSelected);
    }

    return (
        <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md p-6 shadow-xl animate-fade-up">
            <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                    <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-cyan-200">
                        Choose interests
                    </h3>
                    <p className="text-sm text-white/60 mt-1">
                        Pick one or more (you can select multiple)
                    </p>
                </div>

                {localSelected.length > 0 && (
                    <button
                        onClick={clearAll}
                        className="text-xs font-medium text-white/50 hover:text-white transition-colors uppercase tracking-wider"
                    >
                        Clear
                    </button>
                )}
            </div>

            <div className="flex flex-wrap gap-3">
                {INTERESTS.map((item) => {
                    const active = localSelected.includes(item.id);

                    return (
                        <button
                            key={item.id}
                            onClick={() => toggle(item.id)}
                            className={cn(
                                "flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-300",
                                active
                                    ? "border-transparent bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                                    : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/20"
                            )}
                        >
                            <span className="text-base">{item.emoji}</span>
                            <span className="font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </div>

            <div className="mt-6 flex justify-between items-center pt-4 border-t border-white/10">
                <div className="text-xs text-white/40">
                    Selected:{" "}
                    <span className="font-medium text-white/90">
                        {localSelected.length > 0 ? localSelected.join(", ") : "None"}
                    </span>
                </div>

                <button
                    onClick={handleContinue}
                    disabled={localSelected.length === 0}
                    className={cn(
                        "px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-lg",
                        localSelected.length > 0
                            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:scale-105"
                            : "bg-white/10 text-white/30 cursor-not-allowed"
                    )}
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
