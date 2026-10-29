import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { authenticatedEmail } from "./auth";

export const CreateNewUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        imageUrl: v.string(),
    },
    handler: async (ctx, args) => {
        const email = await authenticatedEmail(ctx);
        if (args.email.trim().toLowerCase() !== email) throw new Error('Cannot create another user’s account');
        // If User already exist?
        const user = await ctx.db.query("UserTable")
            .filter((q) => q.eq(q.field("email"), args.email))
            .collect();

        if (user?.length === 0) {
            const userData = {
                name: args.name,
                email: args.email,
                imageUrl: args.imageUrl,
            };

            const newUserId = await ctx.db.insert("UserTable", userData);

            return { ...userData, _id: newUserId };
        }

        return user[0];
    },
});
