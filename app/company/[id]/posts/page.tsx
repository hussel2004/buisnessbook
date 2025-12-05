"use client"
import React from 'react';

 import CompanyBannerCard from "@/components/CompanyBannerCard";
import PostCard from '@/components/PostCard';
interface Comment {
    id: number;
    user: string;
    text: string;
}

interface PostCardData {
    id: number;
    companyName: string;
    postTime: string; // Ex: 'Il y a 2 heures', 'Hier'
    introText: string;
    // Le média est un ReactNode dans le composant d'origine
    media: React.ReactNode; 
    initialLikes: number;
    initialComments: Comment[];
}
const MOCK_POSTS_DATA: PostCardData[] = [
    {
        id: 1,
        companyName: 'TechSolutions Inc.',
        postTime: 'Il y a 2 heures',
        introText: 'Nous sommes ravis d\'annoncer notre nouvelle intégration cloud ! Elle promet d\'améliorer la scalabilité et la performance de nos services de 40%. #cloud #innovation #tech',
        media: (
            // Représentation simple du contenu média
            <div className="text-center p-4">
                <span className="text-blue-500 text-6xl">
                    {/* Icône de Cloud (Lucide/SVG) */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-blue-500"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M12 21V12"></path><path d="M16 16l-4-4-4 4"></path></svg>
                </span>
                <p className="text-sm text-gray-600 mt-2 font-medium">Nouvelle plateforme Cloud lancée !</p>
            </div>
        ),
        initialLikes: 45,
        initialComments: [
            { id: 101, user: 'Sophie D.', text: 'Félicitations, hâte de tester ça !' },
            { id: 102, user: 'Marc L.', text: 'Est-ce que l\'API est rétrocompatible ?' },
        ]
    },
    {
        id: 2,
        companyName: 'GreenHarvest Farms',
        postTime: 'Hier',
        introText: 'Notre première récolte biologique de l\'année est un succès ! Soutenez l\'agriculture locale et durable. Trouvez nos produits frais sur le marché dès ce week-end. 🥕🍎 #bio #local #durable',
        media: (
            // Représentation simple du contenu média
            <div className="text-center p-4">
                <span className="text-green-600 text-6xl">
                    {/* Icône de protection/durabilité (Lucide/SVG) */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-green-600"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </span>
                <p className="text-sm text-gray-600 mt-2 font-medium">Récolte abondante !</p>
            </div>
        ),
        initialLikes: 120,
        initialComments: [
            { id: 201, user: 'Jean M.', text: 'J\'adore vos carottes ! Merci pour votre travail.' },
            { id: 202, user: 'Client Local', text: 'Où peut-on vous trouver exactement ?' },
            { id: 203, user: 'AgriNews', text: 'Un bel exemple d\'agriculture responsable !' },
        ]
    },
    {
        id: 3,
        companyName: 'Marketing Pro Agency',
        postTime: 'Il y a 3 jours',
        introText: 'Le SEO en 2024 : 5 tendances que vous ne pouvez pas ignorer. Cliquez sur l\'article complet dans notre bio pour dominer les SERPs. 📈 #SEO #MarketingDigital #GrowthHacking',
        media: (
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <span className="text-yellow-600 text-6xl font-extrabold block">5</span>
                <p className="text-lg text-gray-700 font-bold mt-1">Tendances SEO 2024</p>
            </div>
        ),
        initialLikes: 88,
        initialComments: [
            { id: 301, user: 'Sara R.', text: 'Très instructif, merci pour les insights !' },
        ]
    }
];

export default function CompanyPostsPage() {
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
                    
                    {/* About Posts */}
                   <section id="post">
                        {MOCK_POSTS_DATA.map((post) => (
                            <PostCard
                            key={post.id}
                            companyName={post.companyName}
                            postTime={post.postTime}
                            introText={post.introText}
                            media={post.media}
                            likes={post.initialLikes}
                            comments={post.initialComments}
                            commentsCount={post.initialComments.length}
                            />
                        ))}
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