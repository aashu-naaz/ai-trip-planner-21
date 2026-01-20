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
        uid: v.string(), // Keeping as string for now to match schema, tutorial might use v.id('UserTable') but let's stick to schema first or I can update schema.
        // Wait, schema has uid: v.string(). In tutorial screenshot it showed v.id('UserTable') in function args but passed as string? 
        // Screenshot shows: uid: v.id('UserTable') in args.
        // But my schema currently has uid: v.string(). 
        // I should probably update schema to v.string() or change it?
        // Let's look at the schema screenshot if available... user didn't show schema screenshot? 
        // Wait, current schema has uid: v.string().
        // Tutorial code screenshot shows `uid: v.id('UserTable')`.
        // This implies the schema for TripDetailTable should also probably be v.string() or v.id(). 
        // However, I will stick to what creates less friction first. 
        // Actually, if I use v.id('UserTable') here, I must pass a valid ID.
        // The userDetail context likely has the _id.
        // Let's use v.string() for now to be safe, OR match the tutorial EXACTLY.
        // Tutorial shows `uid: v.id('UserTable')`. I will use that BUT I need to be careful.
        // If I change it to `v.id('UserTable')`, the insert might fail if I pass an email string.
        // The previous code passed `email`. 
        // The tutorial code passes `userDetail?._id`. 
        // So I should use `v.string()` if I want to be safe, BUT the user wants "Verify deeply".
        // Let's check the schema.ts again. 
        // The schema has `uid: v.string()`. 
        // If I change the mutation validation to `v.id`, it might conflict if the underlying data is string.
        // But for a new table, it's fine.
        // Actually, let's stick to `v.any()` for tripDetail to match tutorial.
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
