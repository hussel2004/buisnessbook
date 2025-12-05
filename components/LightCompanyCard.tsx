import React from 'react';

// Si vous avez défini l'interface dans un fichier séparé (ex: types/company.ts)
// import { CompanyCardProps } from '@/types/company'; 
// Sinon, incluez-la ici:
export interface CompanyCardProps {
    id: string;
    logoUrl?: string;
    companyName: string;
    description: string;
    location: string;
    phoneNumber?: string;
    keyRefs?: string[]; // Tableau de 3 références clés
    onClick?: (companyId: string) => void;
}

export default function LightCompanyCard({
    id,
    logoUrl,
    companyName,
    description,
    location,
    phoneNumber,
    keyRefs,
    onClick
}: CompanyCardProps) {
    const defaultLogo = "https://via.placeholder.com/64x64?text=Logo"; // Logo par défaut

    return (
        // Conteneur principal de la carte
        <div 
            className="flex flex-col bg-white rounded-lg shadow-md p-4 mb-4 transition-all duration-200 hover:shadow-lg hover:ring-2 hover:ring-blue-200"
            onClick={() => onClick && onClick(id)} // Rendre la carte cliquable si onClick est fourni
            style={onClick ? { cursor: 'pointer' } : {}} // Changer le curseur si cliquable
        >
            {/* Haut de la carte: Logo et Nom de l'entreprise */}
            <div className="flex items-center mb-3">
                {/* Logo de l'entreprise */}
                <div className="flex-shrink-0 mr-4">
                    <img 
                        src={logoUrl || defaultLogo} 
                        alt={`${companyName} Logo`} 
                        className="w-16 h-16 rounded-full object-cover border border-gray-200" 
                    />
                </div>
                
                {/* Nom de l'entreprise */}
                <h3 className="text-xl font-bold text-gray-900 leading-tight">
                    {companyName}
                </h3>
            </div>

            {/* Description de l'entreprise */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-3"> {/* line-clamp pour limiter les lignes */}
                {description}
            </p>

            {/* Informations de contact et localisation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700 mb-4">
                <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    <span>{location}</span>
                </div>
                {phoneNumber && (
                    <a 
                        href={`tel:${phoneNumber}`} 
                        className="flex items-center text-blue-600 hover:underline"
                        onClick={(e) => e.stopPropagation()} // Empêche l'événement onClick de la carte de se déclencher
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        {phoneNumber}
                    </a>
                )}
            </div>

            {/* Références Clés (si présentes) */}
            {keyRefs && keyRefs.length > 0 && (
                <div className="mt-auto pt-3 border-t border-gray-100"> {/* mt-auto pour pousser en bas, pt-3 pour padding top */}
                    <p className="text-xs font-semibold text-gray-500 mb-2">Références Clés:</p>
                    <div className="flex flex-wrap gap-2">
                        {keyRefs.slice(0, 3).map((ref, index) => ( // Limite à 3 références
                            <span 
                                key={index} 
                                className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                            >
                                {ref}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}