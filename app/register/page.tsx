'use client';
import React, { useState } from 'react';
import { User, Mail, Lock, ArrowRight, UserPlus } from 'lucide-react';

/**
 * RegisterPage Component
 * Provides a structured and styled form for user registration (sign-up).
 */
export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        // Basic client-side validation check for password match
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            setIsLoading(false);
            return;
        }

        // --- REAL REGISTRATION LOGIC GOES HERE ---
        console.log('Attempting registration with:', { name, email, password });

        // Simulate an API call delay
        setTimeout(() => {
            setIsLoading(false);
            // In a real application:
            // 1. Call your registration API (e.g., fetch('/api/register', ...))
            // 2. Handle success (e.g., redirect to login) or failure (e.g., show error message)
            console.log('Registration attempt finished.');
            if (password === confirmPassword) {
                 alert("Registration successful! Redirecting to login...");
                 // history.push('/connexion'); // Use a router hook for actual navigation
            }
        }, 2000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-2xl transition duration-500 hover:shadow-3xl">
                <div>
                    <div className="mx-auto h-12 w-12 text-indigo-600">
                        <UserPlus className="w-full h-full" />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
                        Create Your Account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Join our community and start exploring local businesses.
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        {/* Name Input */}
                        <div className="mb-4">
                            <label htmlFor="full-name" className="sr-only">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    id="full-name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    className="appearance-none rounded-t-md relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="mb-4">
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="mb-4">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    id="confirm-password"
                                    name="confirm-password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="appearance-none rounded-b-md relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Login Link */}
                    <div className="flex items-center justify-end">
                        <div className="text-sm">
                            <a 
                                href="/connexion" // Replace with your actual connexion route
                                className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150"
                            >
                                Already have an account? Sign In
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
                                        <UserPlus className="h-5 w-5 text-indigo-300 group-hover:text-indigo-100" aria-hidden="true" />
                                    </span>
                                    Register Account
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}