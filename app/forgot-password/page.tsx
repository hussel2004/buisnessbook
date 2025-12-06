'use client';
import React, { useState } from 'react';
import { Mail, RefreshCcw, ArrowLeft } from 'lucide-react';

/**
 * ForgotPasswordPage Component
 * Provides a form to initiate the password reset process by submitting an email address.
 */
export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false); // New state to show success message

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setIsSubmitted(false);

        // --- REAL PASSWORD RESET LOGIC GOES HERE ---
        console.log('Attempting password reset request for:', email);

        // Simulate an API call delay
        setTimeout(() => {
            setIsLoading(false);
            // In a real application:
            // 1. Call your reset request API (e.g., fetch('/api/forgot-password', ...))
            // 2. Set isSubmitted to true on success
            setIsSubmitted(true);
            console.log('Password reset request finished.');
        }, 2000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-2xl transition duration-500 hover:shadow-3xl">
                <div>
                    <div className="mx-auto h-12 w-12 text-indigo-600">
                        <RefreshCcw className="w-full h-full" />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
                        Forgot Your Password?
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enter your email address below and we'll send you a link to reset your password.
                    </p>
                </div>

                {/* Conditional rendering based on submission status */}
                {isSubmitted ? (
                    // Success State
                    <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                        <h3 className="text-xl font-semibold text-green-800 mb-3">
                            Check Your Inbox! 📬
                        </h3>
                        <p className="text-gray-700">
                            If an account exists for **{email}**, you will receive an email shortly with instructions to reset your password. Please check your spam folder too.
                        </p>
                        <a 
                            href="/connexion" // Link back to the login page
                            className="mt-6 inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium transition duration-150"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Sign In
                        </a>
                    </div>
                ) : (
                    // Form State
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            {/* Email Input */}
                            <div>
                                <label htmlFor="email-address" className="sr-only">Email address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none rounded-md relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Return to Login Link */}
                        <div className="flex items-center justify-end">
                            <div className="text-sm">
                                <a 
                                    href="/connexion" // Replace with your actual connexion route
                                    className="font-medium text-gray-600 hover:text-indigo-600 transition duration-150"
                                >
                                    Remember your password? Sign In
                                </a>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <>
                                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                            <RefreshCcw className="h-5 w-5 text-indigo-300 group-hover:text-indigo-100" aria-hidden="true" />
                                        </span>
                                        Send Reset Link
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}