import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

interface Participant {
  name: string;
  amount: number;
}

export function BillSplitForm() {
  const [title, setTitle] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [description, setDescription] = useState("");
  const [participants, setParticipants] = useState<Participant[]>([{ name: "", amount: 0 }]);
  const [splitMethod, setSplitMethod] = useState<"equal" | "custom">("equal");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createBillSplit = useMutation(api.billSplits.createBillSplit);

  const addParticipant = () => {
    setParticipants([...participants, { name: "", amount: 0 }]);
  };

  const removeParticipant = (index: number) => {
    if (participants.length > 1) {
      setParticipants(participants.filter((_, i) => i !== index));
    }
  };

  const updateParticipant = (index: number, field: keyof Participant, value: string | number) => {
    const updated = [...participants];
    updated[index] = { ...updated[index], [field]: value };
    setParticipants(updated);
  };

  const calculateEqualSplit = () => {
    const total = parseFloat(totalAmount) || 0;
    const perPerson = total / participants.length;
    setParticipants(participants.map(p => ({ ...p, amount: perPerson })));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !totalAmount || participants.some(p => !p.name)) {
      toast.error("Please fill in all required fields");
      return;
    }

    const total = parseFloat(totalAmount);
    const participantTotal = participants.reduce((sum, p) => sum + p.amount, 0);
    
    if (Math.abs(total - participantTotal) > 0.01) {
      toast.error("Participant amounts don't match the total amount");
      return;
    }

    setIsSubmitting(true);
    try {
      await createBillSplit({
        title,
        totalAmount: total,
        participants,
        description,
        date,
      });
      
      toast.success("Bill split created successfully!");
      setTitle("");
      setTotalAmount("");
      setDescription("");
      setParticipants([{ name: "", amount: 0 }]);
    } catch (error) {
      toast.error("Failed to create bill split");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Split a Bill</h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bill Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Dinner at Restaurant"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Amount ($) *
              </label>
              <input
                type="number"
                step="0.01"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Optional description..."
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

          {/* Split Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Split Method
            </label>
            <div className="flex space-x-4 mb-4">
              <button
                type="button"
                onClick={() => setSplitMethod("equal")}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  splitMethod === "equal"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                Equal Split
              </button>
              <button
                type="button"
                onClick={() => setSplitMethod("custom")}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  splitMethod === "custom"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                Custom Amounts
              </button>
            </div>

            {splitMethod === "equal" && totalAmount && (
              <button
                type="button"
                onClick={calculateEqualSplit}
                className="mb-4 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
              >
                Calculate Equal Split (${(parseFloat(totalAmount) / participants.length).toFixed(2)} each)
              </button>
            )}
          </div>

          {/* Participants */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Participants
              </label>
              <button
                type="button"
                onClick={addParticipant}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
              >
                + Add Person
              </button>
            </div>

            <div className="space-y-3">
              {participants.map((participant, index) => (
                <div key={index} className="flex space-x-3 items-center">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={participant.name}
                      onChange={(e) => updateParticipant(index, "name", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Person's name"
                      required
                    />
                  </div>
                  <div className="w-32">
                    <input
                      type="number"
                      step="0.01"
                      value={participant.amount}
                      onChange={(e) => updateParticipant(index, "amount", parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Amount"
                      disabled={splitMethod === "equal"}
                    />
                  </div>
                  {participants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeParticipant(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-3 text-sm text-gray-600">
              Total: ${participants.reduce((sum, p) => sum + p.amount, 0).toFixed(2)} / ${totalAmount || "0.00"}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-green-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating..." : "Create Bill Split"}
          </button>
        </form>
      </div>
    </div>
  );
}
