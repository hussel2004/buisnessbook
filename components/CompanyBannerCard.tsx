'use client'; // 👈 INDIQUE QUE C'EST UN COMPOSANT CÔTÉ CLIENT

import React from 'react';
import { MapPin, Globe, Mail, Home, Users, Megaphone, Newspaper } from 'lucide-react';
import { usePathname } from 'next/navigation'; // 👈 NOUVELLE IMPORTATION POUR L'APP ROUTER

// Mock data for the company profile
const companyData = {
    // ... (données inchangées)
    bannerUrl: "https://placehold.co/1200x300/1e40af/ffffff?text=Company+Banner+Image",
    logoUrl: "https://placehold.co/100x100/f59e0b/ffffff?text=Logo",
    companyName: "InnovateTech Global",
    category: "Software Engineering & AI",
    location: "Seattle, WA, USA",
    website: "https://www.innovatetech.com",
};

// Array for the navigation links
const navigationLinks = [
    // Ces chemins sont dynamiques, on utilise un chemin de base pour la comparaison
    // Dans un cas réel, [id] serait l'ID réel, mais ici on simule.
    // NOTE: Le chemin de base pour Home doit inclure l'ID si toutes les pages le font.
    { name: 'Home', icon: Home, href: `/company/123/` }, 
    { name: 'About', icon: Users, href: '/company/123/about' },
    { name: 'Promotions', icon: Megaphone, href: '/company/123/promotions' },
    { name: 'Posts', icon: Newspaper, href: '/company/123/posts' },
];

export default function CompanyBannerCard() {
    const { bannerUrl, logoUrl, companyName, category, location, website } = companyData;
    
    // 1. Récupérer le chemin actuel de l'URL
    const currentPath = usePathname();

    // Fonction d'aide pour déterminer si un lien est actif.
    // Next.js App Router (surtout) peut retourner des chemins avec ou sans slash final.
    const isActive = (href: string) => {
        // Normaliser les chemins (retirer les slashs finaux pour une meilleure correspondance)
        const normalizedCurrentPath = currentPath.endsWith('/') && currentPath.length > 1 
                                    ? currentPath.slice(0, -1) 
                                    : currentPath;
        const normalizedHref = href.endsWith('/') && href.length > 1
                            ? href.slice(0, -1) 
                            : href;
                            
        // Vérifie si le chemin normalisé correspond
        return normalizedCurrentPath === normalizedHref;
    };
    
    // --- Rendu du composant (sections 1, 2, 3 inchangées) ---

    return (
        <div className="max-w-7xl mx-auto mt-8 p-4 md:p-6 bg-white shadow-xl rounded-2xl font-sans">
            
            {/* 1. Banner Image Section */}
            <div className="relative">
                <div className="h-48 md:h-64 bg-gray-200 overflow-hidden rounded-xl">
                    <img
                        src={bannerUrl}
                        alt="Company Banner"
                        className="w-full h-full object-cover transition duration-300 hover:scale-[1.01]"
                        onError={(e) => {
                            (e.target as HTMLImageElement).onerror = null;
                            (e.target as HTMLImageElement).src = "https://placehold.co/1200x300/1e40af/ffffff?text=Banner+Unavailable";
                        }}
                    />
                </div>

                {/* 2. Company Logo - positioned absolutely over the banner */}
                <div className="absolute -bottom-10 left-6 md:left-10 transform translate-y-0">
                    <img
                        src={logoUrl}
                        alt="Company Logo"
                        className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover border-4 border-white shadow-lg bg-gray-100"
                        onError={(e) => {
                            (e.target as HTMLImageElement).onerror = null;
                            (e.target as HTMLImageElement).src = "https://placehold.co/100x100/f59e0b/ffffff?text=Logo";
                        }}
                    />
                </div>
            </div>
            
            {/* 3. Company Info and Contact Button Section */}
            <div className="pt-14 md:pt-8 px-4 md:px-10 pb-4 flex flex-col md:flex-row justify-between items-start md:items-end">
                
                {/* Company Details */}
                <div className="flex flex-col space-y-2">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                        {companyName}
                    </h1>
                    <p className="text-lg font-medium text-indigo-600">{category}</p>
                    
                    {/* Location and Website Info */}
                    <div className="flex flex-wrap items-center text-gray-500 text-sm space-x-4">
                        <span className="flex items-center space-x-1.5">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span>{location}</span>
                        </span>
                        <span className="flex items-center space-x-1.5">
                            <Globe className="w-4 h-4 text-gray-400" />
                            <a 
                                href={website} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="hover:text-indigo-600 transition duration-150"
                            >
                                {website.replace('https://', '').replace('www.', '')}
                            </a>
                        </span>
                    </div>
                </div>

                {/* Contact Us Button */}
                <div className="mt-4 md:mt-0">
                    <button className="flex items-center justify-center space-x-2 px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-[1.03] active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300">
                        <Mail className="w-5 h-5" />
                        <span>Contact Us</span>
                    </button>
                </div>
            </div>

            {/* 4. Navigation Links */}
            <div className="mt-6 border-t border-gray-200 sticky top-0 bg-white z-10">
                <nav className="flex overflow-x-auto whitespace-nowrap -mb-px px-4 md:px-10">
                    {navigationLinks.map((item) => {
                        // 2. Utiliser la fonction isActive pour déterminer si le lien est actif
                        const isLinkActive = isActive(item.href);

                        return (
                            <a
                                key={item.name}
                                href={item.href}
                                className={`inline-flex items-center space-x-2 py-4 px-3 border-b-2 text-sm font-medium transition duration-150 ease-in-out 
                                    ${isLinkActive
                                        ? 'border-indigo-500 text-indigo-600' // Style ACTIF
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700' // Style INACTIF
                                    }`}
                                aria-current={isLinkActive ? 'page' : undefined}
                            >
                                <item.icon className="w-4 h-4" />
                                <span>{item.name}</span>
                            </a>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}