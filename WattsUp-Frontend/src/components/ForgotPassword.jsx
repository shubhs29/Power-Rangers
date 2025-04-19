import React, { useState } from "react";
import { Zap, Mail, ArrowLeft, Check } from "lucide-react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate reset password email process
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-100 via-teal-50 to-blue-100">
      {/* Energy animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-yellow-300 opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 rounded-full bg-green-400 opacity-20 animate-pulse"></div>
        <div className="absolute top-1/4 right-1/3 w-12 h-12 rounded-full bg-blue-300 opacity-20 animate-pulse"></div>
      </div>

      <div className="w-full max-w-md px-8 py-10 bg-white rounded-2xl shadow-xl transform transition-all duration-300 hover:shadow-2xl relative z-10">
        {/* Logo and Header */}
        <div className="flex items-center justify-center mb-8">
          <div className="bg-emerald-500 p-3 rounded-full">
            <Zap size={24} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold ml-3 bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent">
            Watt'sUp
          </h1>
        </div>
        
        {!isSubmitted ? (
          <>
            <h2 className="text-center text-xl font-semibold text-gray-700 mb-6">
              Reset your password
            </h2>
            <p className="text-center text-gray-500 mb-8">
              Enter your email address and we'll send you a link to reset your password
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 ${
                  isLoading 
                    ? "bg-emerald-400 cursor-not-allowed" 
                    : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md hover:shadow-lg"
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending reset link...
                  </>
                ) : (
                  "Send reset link"
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-6">
              <Check size={24} className="text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Check your email</h2>
            <p className="text-gray-500 mb-6">
              We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the instructions to reset your password.
            </p>
            <p className="text-gray-500 mb-6 text-sm">
              Didn't receive the email? Check your spam folder or 
              <button 
                onClick={() => setIsSubmitted(false)} 
                className="text-emerald-600 hover:text-emerald-500 ml-1"
              >
                try again
              </button>
            </p>
          </div>
        )}

        <div className="mt-6 text-center">
          <a 
            href="/" 
            className="inline-flex items-center font-medium text-emerald-600 hover:text-emerald-500"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to sign in
          </a>
        </div>

        {/* Energy saving hint */}
        <div className="mt-8 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-xs text-blue-700 flex items-center">
            <Zap size={14} className="mr-1 text-blue-500" />
            <span>Reset your password to continue saving energy with Watt'sUp</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;