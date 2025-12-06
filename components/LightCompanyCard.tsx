import React from 'react';
import Link from 'next/link';

// Interface inchangée
export interface CompanyCardProps {
    id: string;
    logoUrl?: string;
    companyName: string;
    description: string;
    location: string;
    phoneNumber?: string;
    keyRefs?: string[];
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
    onClick // La prop onClick peut maintenant être réutilisée pour des actions spécifiques sur la carte si nécessaire
}: CompanyCardProps) {
    const defaultLogo = "https://via.placeholder.com/64x64?text=Logo"; // Logo par défaut
    
    // 1. Définir le chemin vers la page dynamique
    const hrefPath = `/company/${id}`;

    // Le Link est déplacé pour n'envelopper que le titre.
    // Le conteneur principal revient à une balise <div>.

    return (
        // Conteneur principal de la carte
        // Utilisation de onClick ici si la carte doit déclencher une action de navigation/modale spécifique
        <div 
            className="flex flex-col bg-white rounded-lg shadow-md p-4 mb-4 transition-all duration-200 hover:shadow-lg hover:ring-2 hover:ring-blue-200"
            // Réintroduire la logique onClick sur le conteneur principal si la carte doit être cliquable en entier
            // Pour ce scénario, on va laisser le onClick géré par le Link du titre pour la navigation par défaut
            onClick={onClick ? () => onClick(id) : undefined} 
            style={onClick ? { cursor: 'pointer' } : {}}
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
                
                {/* Nom de l'entreprise - ENVELOPPÉ PAR Link */}
                <Link 
                    href={hrefPath} 
                    passHref 
                    // Ajout de classes pour souligner le titre au survol et le rendre clairement cliquable
                    className="text-xl font-bold text-gray-900 leading-tight hover:text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm"
                    // Empêche la propagation du clic pour ne pas déclencher le onClick du conteneur si présent
                    onClick={(e) => e.stopPropagation()} 
                >
                    <h3>{companyName}</h3>
                </Link>
            </div>

            {/* Description de l'entreprise */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
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
                        // Toujours important: Empêche la propagation du clic (surtout si le div principal a un onClick)
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        {phoneNumber}
                    </a>
                )}
            </div>

            {/* Références Clés (si présentes) */}
            {keyRefs && keyRefs.length > 0 && (
                <div className="mt-auto pt-3 border-t border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 mb-2">Références Clés:</p>
                    <div className="flex flex-wrap gap-2">
                        {keyRefs.slice(0, 3).map((ref, index) => (
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