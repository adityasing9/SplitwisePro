import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const addTransaction = mutation({
  args: {
    type: v.union(v.literal("income"), v.literal("expense"), v.literal("loan_given"), v.literal("loan_received")),
    amount: v.number(),
    description: v.string(),
    category: v.string(),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    return await ctx.db.insert("transactions", {
      userId,
      ...args,
    });
  },
});

export const getTransactions = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    return await ctx.db
      .query("transactions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const getTransactionsByType = query({
  args: {
    type: v.union(v.literal("income"), v.literal("expense"), v.literal("loan_given"), v.literal("loan_received")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    return await ctx.db
      .query("transactions")
      .withIndex("by_user_and_type", (q) => q.eq("userId", userId).eq("type", args.type))
      .order("desc")
      .collect();
  },
});

export const getFinancialSummary = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return { totalIncome: 0, totalExpense: 0, totalLoansGiven: 0, totalLoansReceived: 0, balance: 0 };
    }

    const transactions = await ctx.db
      .query("transactions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    const summary = transactions.reduce(
      (acc, transaction) => {
        switch (transaction.type) {
          case "income":
            acc.totalIncome += transaction.amount;
            break;
          case "expense":
            acc.totalExpense += transaction.amount;
            break;
          case "loan_given":
            acc.totalLoansGiven += transaction.amount;
            break;
          case "loan_received":
            acc.totalLoansReceived += transaction.amount;
            break;
        }
        return acc;
      },
      { totalIncome: 0, totalExpense: 0, totalLoansGiven: 0, totalLoansReceived: 0 }
    );

    const balance = summary.totalIncome - summary.totalExpense + summary.totalLoansReceived - summary.totalLoansGiven;

    return { ...summary, balance };
  },
});

export const deleteTransaction = mutation({
  args: { id: v.id("transactions") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const transaction = await ctx.db.get(args.id);
    if (!transaction || transaction.userId !== userId) {
      throw new Error("Transaction not found or unauthorized");
    }

    await ctx.db.delete(args.id);
  },
});
