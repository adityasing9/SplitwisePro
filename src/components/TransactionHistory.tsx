import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

export function TransactionHistory() {
  const transactions = useQuery(api.transactions.getTransactions);
  const deleteTransaction = useMutation(api.transactions.deleteTransaction);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      try {
        await deleteTransaction({ id: id as any });
        toast.success("Transaction deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete transaction");
      }
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "income": return "💰";
      case "expense": return "💸";
      case "loan_given": return "🤲";
      case "loan_received": return "🙏";
      default: return "📝";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "income": return "text-green-600 bg-green-50";
      case "expense": return "text-red-600 bg-red-50";
      case "loan_given": return "text-blue-600 bg-blue-50";
      case "loan_received": return "text-purple-600 bg-purple-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  if (transactions === undefined) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-lg h-16"></div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction History</h3>
      
      {transactions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">📝</div>
          <p>No transactions yet. Add your first transaction!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction._id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getTypeColor(transaction.type)}`}>
                    {getTypeIcon(transaction.type)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{transaction.description}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span className="capitalize">{transaction.type.replace("_", " ")}</span>
                      <span>•</span>
                      <span>{transaction.category}</span>
                      <span>•</span>
                      <span>{new Date(transaction.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`text-lg font-semibold ${
                    transaction.type === "income" || transaction.type === "loan_received" 
                      ? "text-green-600" 
                      : "text-red-600"
                  }`}>
                    {transaction.type === "income" || transaction.type === "loan_received" ? "+" : "-"}
                    ${transaction.amount.toLocaleString()}
                  </div>
                  <button
                    onClick={() => handleDelete(transaction._id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete transaction"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
