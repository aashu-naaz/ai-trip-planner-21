import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const GetTrip = query({
    args: { tripId: v.string() },
    handler: async (ctx, args) => {
        const trip = await ctx.db.query('TripDetailTable')
            .filter((q) => q.eq(q.field('tripId'), args.tripId))
            .first();
        return trip;
    }
})

export const CreateTripDetail = mutation({
    args: {
        tripId: v.string(),
        uid: v.string(),
        tripDetail: v.any()
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.insert('TripDetailTable', {
            tripDetail: args.tripDetail,
            tripId: args.tripId,
            uid: args.uid
        });
        return result;
    }
})
