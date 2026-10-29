import { v } from "convex/values";
import { mutation,query } from "./_generated/server";
import { requireOwner } from "./auth";

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
        await requireOwner(ctx, args.uid);
        const existing = await ctx.db.query('TripDetailTable')
            .filter((q) => q.eq(q.field('tripId'), args.tripId))
            .first();
        if (existing) {
            if (existing.uid !== args.uid) throw new Error('This trip belongs to another account');
            await ctx.db.patch(existing._id, { tripDetail: args.tripDetail });
            return existing._id;
        }
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
        await requireOwner(ctx, args.uid);
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
        await requireOwner(ctx, args.uid);
        const result = await ctx.db.query('TripDetailTable')
            .filter((q) => q.and(
                q.eq(q.field('uid'), args.uid),
                q.eq(q.field('tripId'), args.tripId)
            ))
            .collect();
        return result[0];
    }
})
