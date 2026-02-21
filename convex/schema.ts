import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  transactions: defineTable({
    userId: v.id("users"),
    type: v.union(v.literal("income"), v.literal("expense"), v.literal("loan_given"), v.literal("loan_received")),
    amount: v.number(),
    description: v.string(),
    category: v.string(),
    date: v.string(),
  }).index("by_user", ["userId"]).index("by_user_and_type", ["userId", "type"]),

  billSplits: defineTable({
    createdBy: v.id("users"),
    title: v.string(),
    totalAmount: v.number(),
    participants: v.array(v.object({
      userId: v.id("users"),
      name: v.string(),
      amount: v.number(),
      paid: v.boolean(),
    })),
    description: v.optional(v.string()),
    date: v.string(),
    settled: v.boolean(),
  }).index("by_creator", ["createdBy"]),

  loans: defineTable({
    lenderId: v.id("users"),
    borrowerName: v.string(),
    amount: v.number(),
    description: v.string(),
    dueDate: v.optional(v.string()),
    status: v.union(v.literal("active"), v.literal("paid")),
    type: v.union(v.literal("given"), v.literal("received")),
    date: v.string(),
  }).index("by_lender", ["lenderId"]).index("by_lender_and_status", ["lenderId", "status"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
