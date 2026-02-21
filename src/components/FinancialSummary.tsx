import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function FinancialSummary() {
  const summary = useQuery(api.transactions.getFinancialSummary);

  if (summary === undefined) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-24"></div>
          ))}
        </div>
      </div>
    );
  }

  const cards = [
    {
      title: "Total Balance",
      amount: summary.balance,
      icon: "💰",
      color: summary.balance >= 0 ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50",
      borderColor: summary.balance >= 0 ? "border-green-200" : "border-red-200",
    },
    {
      title: "Total Income",
      amount: summary.totalIncome,
      icon: "📈",
      color: "text-green-600 bg-green-50",
      borderColor: "border-green-200",
    },
    {
      title: "Total Expenses",
      amount: summary.totalExpense,
      icon: "📉",
      color: "text-red-600 bg-red-50",
      borderColor: "border-red-200",
    },
    {
      title: "Loans Given",
      amount: summary.totalLoansGiven,
      icon: "🤲",
      color: "text-blue-600 bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Loans Received",
      amount: summary.totalLoansReceived,
      icon: "🙏",
      color: "text-purple-600 bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      title: "Net Worth",
      amount: summary.totalIncome - summary.totalExpense,
      icon: "💎",
      color: "text-indigo-600 bg-indigo-50",
      borderColor: "border-indigo-200",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl border-2 ${card.borderColor} ${card.color} transition-all hover:shadow-md`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-80">{card.title}</p>
                  <p className="text-2xl font-bold mt-1">
                    ${Math.abs(card.amount).toLocaleString()}
                    {card.amount < 0 && card.title === "Total Balance" && (
                      <span className="text-sm ml-1">(deficit)</span>
                    )}
                  </p>
                </div>
                <div className="text-3xl opacity-80">{card.icon}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-2">Quick Insights</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-blue-500">💡</span>
            <span>
              {summary.totalIncome > summary.totalExpense
                ? "You're saving money! Keep it up!"
                : "Consider reducing expenses or increasing income."}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-purple-500">📊</span>
            <span>
              Expense ratio: {summary.totalIncome > 0 ? Math.round((summary.totalExpense / summary.totalIncome) * 100) : 0}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
