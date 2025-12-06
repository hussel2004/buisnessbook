'use client';
import React, { useState } from 'react';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';

/**
 * ConnexionPage (Login Page) Component
 * This component provides a focused login form styled with Tailwind CSS
 * to match the look and feel of the main application.
 */
export default function ConnexionPage() {
    // State for form inputs (Email and Password)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // State for a simple loading/submission status (optional, but good practice)
    const [isLoading, setIsLoading] = useState(false);

    // Placeholder function for handling form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        // --- REAL LOGIN LOGIC GOES HERE ---
        console.log('Attempting login with:', { email, password });

        // Simulate an API call delay
        setTimeout(() => {
            setIsLoading(false);
            // In a real application:
            // 1. Call your authentication API (e.g., fetch('/api/login', ...))
            // 2. Handle success (e.g., redirect to dashboard) or failure (e.g., show error message)
            console.log('Login attempt finished.');
        }, 1500);
    };

    return (
        // The main container centers the form on the screen and uses the light blue background
        <div className="min-h-screen flex items-center justify-center bg-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-2xl transition duration-500 hover:shadow-3xl">
                <div>
                    {/* You would typically place your logo here */}
                    <div className="mx-auto h-12 w-12 text-indigo-600">
                        <LogIn className="w-full h-full" />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
                        Sign in to your account
                    </h2>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-t-md relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-b-md relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Links: Forgot Password and Register */}
                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <a 
                                href="/forgot-password" // Replace with your actual route
                                className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150"
                            >
                                Forgot your password?
                            </a>
                        </div>
                        
                        <div className="text-sm">
                            <a 
                                href="/register" // Replace with your actual route
                                className="font-medium text-gray-600 hover:text-indigo-600 transition duration-150"
                            >
                                Need an account? Register
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
                            {/* Loading State Spinner */}
                            {isLoading ? (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <>
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        <LogIn className="h-5 w-5 text-indigo-300 group-hover:text-indigo-100" aria-hidden="true" />
                                    </span>
                                    Sign In
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}