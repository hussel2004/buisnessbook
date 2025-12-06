"use client"
import React from 'react';

 import CompanyBannerCard from "@/components/CompanyBannerCard";
 import AboutCard from "@/components/CompanyOverviewCard";
 import SimilarCompanyBar from "@/components/SimilarCompanyBar";
  import CommentBar from "@/components/CommentBar";


export default function CompanyAboutPage(){
    const handleCardClick = (companyId: string) => {
        console.log(`Carte d'entreprise cliquée: ${companyId}`);
    };
    
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Container with max-width for better readability */}
            <div className="max-w-7xl mx-auto">
                
                {/* Banner Section - Full width, no padding on sides */}
                <section className="mb-0">
                    <CompanyBannerCard />
                </section>

                {/* Main Content Area with consistent spacing */}
                <div className="px-4 md:px-6 lg:px-8 space-y-8 py-8">
                    
                    {/* About Section */}
                    <section id="about">
                        <AboutCard />
                    </section>                  
                </div>

                {/* Optional: Back to Top Button */}
                <div className="px-4 md:px-6 lg:px-8 pb-8">
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2 mx-auto"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        Back to Top
                    </button>
                </div>
            </div>
        </div>
    );
}