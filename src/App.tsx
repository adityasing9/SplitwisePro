import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { Dashboard } from "./components/Dashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">💰</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SplitWise Pro
              </h1>
            </div>
            <Authenticated>
              <SignOutButton />
            </Authenticated>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Authenticated>
          <Dashboard />
        </Authenticated>
        
        <Unauthenticated>
          <div className="min-h-[80vh] flex items-center justify-center">
            <div className="max-w-md w-full">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">💰</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Finance Recorder</h2>
                <p className="text-gray-600">Track expenses, split bills, and manage your finances with ease</p>
              </div>
              <SignInForm />
            </div>
          </div>
        </Unauthenticated>
      </main>
      
      <Toaster position="top-right" />
    </div>
  );
}
