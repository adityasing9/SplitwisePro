import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const addLoan = mutation({
  args: {
    borrowerName: v.string(),
    amount: v.number(),
    description: v.string(),
    dueDate: v.optional(v.string()),
    type: v.union(v.literal("given"), v.literal("received")),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    return await ctx.db.insert("loans", {
      lenderId: userId,
      borrowerName: args.borrowerName,
      amount: args.amount,
      description: args.description,
      dueDate: args.dueDate,
      type: args.type,
      date: args.date,
      status: "active",
    });
  },
});

export const getLoans = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    return await ctx.db
      .query("loans")
      .withIndex("by_lender", (q) => q.eq("lenderId", userId))
      .order("desc")
      .collect();
  },
});

export const markLoanPaid = mutation({
  args: { id: v.id("loans") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const loan = await ctx.db.get(args.id);
    if (!loan || loan.lenderId !== userId) {
      throw new Error("Loan not found or unauthorized");
    }

    await ctx.db.patch(args.id, { status: "paid" });
  },
});

export const deleteLoan = mutation({
  args: { id: v.id("loans") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const loan = await ctx.db.get(args.id);
    if (!loan || loan.lenderId !== userId) {
      throw new Error("Loan not found or unauthorized");
    }

    await ctx.db.delete(args.id);
  },
});
