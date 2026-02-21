import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

export function TransactionForm() {
  const [type, setType] = useState<"income" | "expense" | "loan_given" | "loan_received">("expense");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addTransaction = useMutation(api.transactions.addTransaction);

  const categories = {
    income: ["Salary", "Freelance", "Investment", "Gift", "Other"],
    expense: ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Healthcare", "Other"],
    loan_given: ["Personal", "Business", "Emergency", "Other"],
    loan_received: ["Personal", "Business", "Emergency", "Other"],
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description || !category) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await addTransaction({
        type,
        amount: parseFloat(amount),
        description,
        category,
        date,
      });
      
      toast.success("Transaction added successfully!");
      setAmount("");
      setDescription("");
      setCategory("");
    } catch (error) {
      toast.error("Failed to add transaction");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Transaction</h3>
        
        {/* Transaction Type Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          {[
            { value: "income", label: "Income", icon: "💰", color: "green" },
            { value: "expense", label: "Expense", icon: "💸", color: "red" },
            { value: "loan_given", label: "Loan Given", icon: "🤲", color: "blue" },
            { value: "loan_received", label: "Loan Received", icon: "🙏", color: "purple" },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                setType(option.value as any);
                setCategory("");
              }}
              className={`p-3 rounded-lg border-2 transition-all ${
                type === option.value
                  ? `border-${option.color}-500 bg-${option.color}-50 text-${option.color}-700`
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="text-lg mb-1">{option.icon}</div>
              <div className="text-sm font-medium">{option.label}</div>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select category</option>
                {categories[type].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter description..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Adding..." : "Add Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
}
