import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

export function LoanForm() {
  const [type, setType] = useState<"given" | "received">("given");
  const [borrowerName, setBorrowerName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addLoan = useMutation(api.loans.addLoan);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!borrowerName || !amount || !description) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await addLoan({
        borrowerName,
        amount: parseFloat(amount),
        description,
        dueDate: dueDate || undefined,
        type,
        date,
      });
      
      toast.success("Loan record added successfully!");
      setBorrowerName("");
      setAmount("");
      setDescription("");
      setDueDate("");
    } catch (error) {
      toast.error("Failed to add loan record");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Record a Loan</h3>
        
        {/* Loan Type Selector */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            type="button"
            onClick={() => setType("given")}
            className={`p-4 rounded-lg border-2 transition-all ${
              type === "given"
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="text-2xl mb-2">🤲</div>
            <div className="font-medium">Money Lent</div>
            <div className="text-sm opacity-75">I gave money to someone</div>
          </button>
          
          <button
            type="button"
            onClick={() => setType("received")}
            className={`p-4 rounded-lg border-2 transition-all ${
              type === "received"
                ? "border-purple-500 bg-purple-50 text-purple-700"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="text-2xl mb-2">🙏</div>
            <div className="font-medium">Money Borrowed</div>
            <div className="text-sm opacity-75">I received money from someone</div>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {type === "given" ? "Borrower's Name *" : "Lender's Name *"}
              </label>
              <input
                type="text"
                value={borrowerName}
                onChange={(e) => setBorrowerName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={type === "given" ? "Who did you lend to?" : "Who did you borrow from?"}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount ($) *
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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="What was this loan for?"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Date *
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date (Optional)
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min={date}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              type === "given"
                ? "bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                : "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
            } text-white`}
          >
            {isSubmitting ? "Recording..." : `Record ${type === "given" ? "Loan Given" : "Loan Received"}`}
          </button>
        </form>
      </div>
    </div>
  );
}
