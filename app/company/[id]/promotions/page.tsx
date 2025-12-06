"use client"
import React from 'react';

 import CompanyBannerCard from "@/components/CompanyBannerCard";
 import SimilarCompanyBar from "@/components/SimilarCompanyBar";
  import CommentBar from "@/components/CommentBar";
import PromotionCard from '@/components/PromotionCard';

export default function CompanyPromotionsPage(){
     const [selectedPromo, setSelectedPromo] = React.useState<string | null>(null);
    const handlePromoClick = (id: string, title: string) => {
            setSelectedPromo(title);
         console.log(`Promotion clicked: ${id}`);
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
                    
                  {/*Promotions Section */}
                    <section id="promotion-1">
                         <PromotionCard
                        id="promo-1"
                        imageUrl="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop"
                        subtitle="Limited Time"
                        title="Mega Summer Sale"
                        description="Get up to 50% off on all summer collection items. Refresh your wardrobe with our exclusive deals!"
                        validUntil="31 Décembre 2024"
                        finePrint="S'applique uniquement aux articles en stock"
                        ctaText="Shop Now"
                        ctaAction={() => handlePromoClick('promo-1', 'Mega Summer Sale')}
                        variant="primary"
                        size="medium"
                    />
                    </section>
                    <section id="promotion-2">
                        <PromotionCard
                        id="promo-2"
                        iconType="gift"
                        subtitle="New Customer"
                        title="Welcome Bonus"
                        description="Sign up today and receive a special welcome gift worth 10,000 FCFA on your first purchase!"
                        finePrint="Nouveau client seulement"
                        ctaText="Claim Offer"
                        ctaAction={() => handlePromoClick('promo-2', 'Welcome Bonus')}
                        variant="success"
                        size="medium"
                    />
                    </section>
                    <section id="promotion-3">
                        <PromotionCard
                        id="promo-3"
                        iconType="fire"
                        subtitle="Hot Deal"
                        title="Flash Sale - 70% Off"
                        description="Hurry! Limited quantities available. Don't miss this incredible opportunity to save big!"
                        validUntil="Aujourd'hui à 23h59"
                        ctaText="Grab It Now"
                        ctaAction={() => handlePromoClick('promo-3', 'Flash Sale')}
                        variant="danger"
                        size="medium"
                        />
                    </section>
                    <section id="promotion-4">
                        <PromotionCard
                        id="promo-4"
                        iconType="star"
                        subtitle="Upgrade"
                        title="Go Premium Today"
                        description="Unlock exclusive features and unlimited access to all premium content for just 5,000 FCFA/month."
                        finePrint="Annulez à tout moment"
                        ctaText="Upgrade Now"
                        ctaAction={() => handlePromoClick('promo-4', 'Go Premium')}
                        variant="secondary"
                        size="medium"
                    />
                    </section>
                    <section id="promotion-5">
                        
                    </section>
                    <section id="promotion-6">
                        
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