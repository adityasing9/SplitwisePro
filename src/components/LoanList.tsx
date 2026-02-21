import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

export function LoanList() {
  const loans = useQuery(api.loans.getLoans);
  const markLoanPaid = useMutation(api.loans.markLoanPaid);
  const deleteLoan = useMutation(api.loans.deleteLoan);

  const handleMarkPaid = async (id: string) => {
    try {
      await markLoanPaid({ id: id as any });
      toast.success("Loan marked as paid!");
    } catch (error) {
      toast.error("Failed to update loan status");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this loan?")) {
      try {
        await deleteLoan({ id: id as any });
        toast.success("Loan deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete loan");
      }
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "given" ? "🤲" : "🙏";
  };

  const getTypeColor = (type: string, status: string) => {
    if (status === "paid") return "border-green-200 bg-green-50";
    return type === "given" ? "border-blue-200 bg-blue-50" : "border-purple-200 bg-purple-50";
  };

  if (loans === undefined) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-lg h-24"></div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Loans</h3>
      
      {loans.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">🤝</div>
          <p>No loans recorded yet. Add your first loan!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {loans.map((loan) => (
            <div
              key={loan._id}
              className={`border-2 rounded-lg p-4 ${getTypeColor(loan.type, loan.status)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{getTypeIcon(loan.type)}</div>
                  <div>
                    <h4 className="font-medium text-gray-900 flex items-center">
                      {loan.borrowerName}
                      {loan.status === "paid" && <span className="ml-2 text-green-600">✅</span>}
                    </h4>
                    <p className="text-sm text-gray-600">{loan.description}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span className="capitalize">{loan.type === "given" ? "Lent to" : "Borrowed from"}</span>
                      <span>•</span>
                      <span>{new Date(loan.date).toLocaleDateString()}</span>
                      {loan.dueDate && (
                        <>
                          <span>•</span>
                          <span>Due: {new Date(loan.dueDate).toLocaleDateString()}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">
                      ${loan.amount.toLocaleString()}
                    </div>
                    <div className={`text-sm font-medium ${
                      loan.status === "paid" ? "text-green-600" : "text-orange-600"
                    }`}>
                      {loan.status === "paid" ? "Paid" : "Active"}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    {loan.status === "active" && (
                      <button
                        onClick={() => handleMarkPaid(loan._id)}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                      >
                        Mark Paid
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(loan._id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      title="Delete loan"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
