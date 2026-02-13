import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getMessages = query({
    args: {
        tripId: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("messages")
            .withIndex("by_tripId", (q) => q.eq("tripId", args.tripId))
            .collect();
    },
});

export const sendMessage = mutation({
    args: {
        tripId: v.string(),
        role: v.string(),
        content: v.string(),
        ui: v.optional(v.string()), // For UiRenderer logic
        timestamp: v.optional(v.string()), // Optional, but useful for ordering if needed
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("messages", {
            tripId: args.tripId,
            role: args.role,
            content: args.content,
            ui: args.ui,
            timestamp: args.timestamp,
        });
    },
});
