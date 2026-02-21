import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const createBillSplit = mutation({
  args: {
    title: v.string(),
    totalAmount: v.number(),
    participants: v.array(v.object({
      name: v.string(),
      amount: v.number(),
    })),
    description: v.optional(v.string()),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const participantsWithIds = args.participants.map(p => ({
      userId,
      name: p.name,
      amount: p.amount,
      paid: false,
    }));

    return await ctx.db.insert("billSplits", {
      createdBy: userId,
      title: args.title,
      totalAmount: args.totalAmount,
      participants: participantsWithIds,
      description: args.description,
      date: args.date,
      settled: false,
    });
  },
});

export const getBillSplits = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    return await ctx.db
      .query("billSplits")
      .withIndex("by_creator", (q) => q.eq("createdBy", userId))
      .order("desc")
      .collect();
  },
});

export const markParticipantPaid = mutation({
  args: {
    billId: v.id("billSplits"),
    participantIndex: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const bill = await ctx.db.get(args.billId);
    if (!bill || bill.createdBy !== userId) {
      throw new Error("Bill not found or unauthorized");
    }

    const updatedParticipants = [...bill.participants];
    updatedParticipants[args.participantIndex].paid = true;

    const allPaid = updatedParticipants.every(p => p.paid);

    await ctx.db.patch(args.billId, {
      participants: updatedParticipants,
      settled: allPaid,
    });
  },
});

export const deleteBillSplit = mutation({
  args: { id: v.id("billSplits") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const bill = await ctx.db.get(args.id);
    if (!bill || bill.createdBy !== userId) {
      throw new Error("Bill not found or unauthorized");
    }

    await ctx.db.delete(args.id);
  },
});
