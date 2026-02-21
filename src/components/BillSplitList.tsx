import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

export function BillSplitList() {
  const billSplits = useQuery(api.billSplits.getBillSplits);
  const markParticipantPaid = useMutation(api.billSplits.markParticipantPaid);
  const deleteBillSplit = useMutation(api.billSplits.deleteBillSplit);

  const handleMarkPaid = async (billId: string, participantIndex: number) => {
    try {
      await markParticipantPaid({ billId: billId as any, participantIndex });
      toast.success("Marked as paid!");
    } catch (error) {
      toast.error("Failed to update payment status");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this bill split?")) {
      try {
        await deleteBillSplit({ id: id as any });
        toast.success("Bill split deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete bill split");
      }
    }
  };

  if (billSplits === undefined) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-lg h-32"></div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Bill Splits</h3>
      
      {billSplits.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">🧾</div>
          <p>No bill splits yet. Create your first bill split!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {billSplits.map((bill) => (
            <div
              key={bill._id}
              className={`border-2 rounded-lg p-4 ${
                bill.settled ? "border-green-200 bg-green-50" : "border-orange-200 bg-orange-50"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900 flex items-center">
                    {bill.title}
                    {bill.settled && <span className="ml-2 text-green-600">✅</span>}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Total: ${bill.totalAmount.toLocaleString()} • {new Date(bill.date).toLocaleDateString()}
                  </p>
                  {bill.description && (
                    <p className="text-sm text-gray-500 mt-1">{bill.description}</p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(bill._id)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  title="Delete bill split"
                >
                  🗑️
                </button>
              </div>

              <div className="space-y-2">
                <h5 className="font-medium text-gray-700">Participants:</h5>
                {bill.participants.map((participant, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      participant.paid ? "bg-green-100" : "bg-white"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        participant.paid ? "bg-green-500" : "bg-orange-400"
                      }`}></div>
                      <span className="font-medium">{participant.name}</span>
                      <span className="text-gray-600">${participant.amount.toFixed(2)}</span>
                    </div>
                    {!participant.paid && (
                      <button
                        onClick={() => handleMarkPaid(bill._id, index)}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                      >
                        Mark Paid
                      </button>
                    )}
                    {participant.paid && (
                      <span className="text-green-600 text-sm font-medium">Paid ✓</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
