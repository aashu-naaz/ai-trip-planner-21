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

export const GetUserTrips = query({
    args: { uid: v.string() },
    handler: async (ctx, args) => {
        const trips = await ctx.db.query('TripDetailTable')
            .filter((q) => q.eq(q.field('uid'), args.uid))
            .collect();
        return trips;
    }
})

export const GetTripById = query({
    args: {
        uid: v.string(),
        tripId: v.string()
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.query('TripDetailTable')
            .filter((q) => q.and(
                q.eq(q.field('uid'), args.uid),
                q.eq(q.field('tripId'), args.tripId)
            ))
            .collect();
        return result[0];
    }
})
