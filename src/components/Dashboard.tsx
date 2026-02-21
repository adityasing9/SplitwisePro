import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { FinancialSummary } from "./FinancialSummary";
import { TransactionForm } from "./TransactionForm";
import { BillSplitForm } from "./BillSplitForm";
import { LoanForm } from "./LoanForm";
import { TransactionHistory } from "./TransactionHistory";
import { BillSplitList } from "./BillSplitList";
import { LoanList } from "./LoanList";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const loggedInUser = useQuery(api.auth.loggedInUser);

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "transactions", label: "Transactions", icon: "💳" },
    { id: "bills", label: "Split Bills", icon: "🧾" },
    { id: "loans", label: "Loans", icon: "🤝" },
    { id: "history", label: "History", icon: "📋" },
  ];

  if (loggedInUser === undefined) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {loggedInUser?.name || loggedInUser?.email || "friend"}! 👋
        </h2>
        <p className="text-gray-600">Manage your finances and split bills with ease</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "overview" && <FinancialSummary />}
          {activeTab === "transactions" && <TransactionForm />}
          {activeTab === "bills" && <BillSplitForm />}
          {activeTab === "loans" && <LoanForm />}
          {activeTab === "history" && (
            <div className="space-y-8">
              <TransactionHistory />
              <BillSplitList />
              <LoanList />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
