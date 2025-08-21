"use client";

import { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function AuthForms() {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");

  return (
    <div className="min-h-screen flex items-center justify-center !p-4">
      <div className="w-full max-w-md rounded-lg shadow-lg overflow-hidden border">
        {/* Tab Navigation */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("signin")}
            className={`flex-1 py-4 !px-6 text-center font-medium transition-colors ${
              activeTab === "signin" ? "bg-primary/40" : ""
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-4 !px-6 text-center font-medium transition-colors ${
              activeTab === "signup" ? "bg-primary/40" : ""
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="!p-8">
          {activeTab === "signin" ? <SignInForm /> : <SignUpForm />}
        </div>
      </div>
    </div>
  );
}
