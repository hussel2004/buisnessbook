import React, { useState } from 'react';

// =================================================================
// 1. INTERFACE DE LA CARTE
// =================================================================
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

// =================================================================
// 2. LIGHT COMPANY CARD COMPONENT
// =================================================================
function LightCompanyCard({
    id,
    logoUrl,
    companyName,
    description,
    location,
    phoneNumber,
    keyRefs,
    onClick
}: CompanyCardProps) {
    const defaultLogo = "https://via.placeholder.com/64x64?text=Logo";

    return (
        <div 
            className="flex flex-col bg-white rounded-lg shadow-md p-4 transition-all duration-200 hover:shadow-lg hover:ring-2 hover:ring-blue-200"
            onClick={() => onClick && onClick(id)}
            style={onClick ? { cursor: 'pointer' } : {}}
        >
            <div className="flex items-center mb-3">
                <div className="flex-shrink-0 mr-4">
                    <img 
                        src={logoUrl || defaultLogo} 
                        alt={`${companyName} Logo`} 
                        className="w-16 h-16 rounded-full object-cover border border-gray-200" 
                    />
                </div>
                <h3 className="text-xl font-bold text-gray-900 leading-tight">
                    {companyName}
                </h3>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700 mb-4">
                <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span>{location}</span>
                </div>
                {phoneNumber && (
                    <a 
                        href={`tel:${phoneNumber}`} 
                        className="flex items-center text-blue-600 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        {phoneNumber}
                    </a>
                )}
            </div>

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

// =================================================================
// 3. SIMILAR COMPANY BAR COMPONENT
// =================================================================
export default function SimilarCompanyBar() {
    const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);

    // Données d'exemple d'entreprises similaires
    const similarCompanies: CompanyCardProps[] = [
        {
            id: '1',
            logoUrl: 'https://via.placeholder.com/64x64/4F46E5/FFFFFF?text=TechCo',
            companyName: 'TechCo Solutions',
            description: 'Entreprise innovante spécialisée dans le développement de solutions logicielles sur mesure pour les PME et grandes entreprises.',
            location: 'Douala, Cameroun',
            phoneNumber: '+237 6 99 12 34 56',
            keyRefs: ['Logiciel ERP', 'Solutions Cloud', 'Support 24/7']
        },
        {
            id: '2',
            logoUrl: 'https://via.placeholder.com/64x64/10B981/FFFFFF?text=Digital',
            companyName: 'Digital Marketing Pro',
            description: 'Agence de marketing digital offrant des services de SEO, gestion des réseaux sociaux et création de contenu pour booster votre présence en ligne.',
            location: 'Yaoundé, Cameroun',
            phoneNumber: '+237 6 77 89 01 23',
            keyRefs: ['SEO Expert', 'Social Media', 'Content Creation']
        },
        {
            id: '3',
            logoUrl: 'https://via.placeholder.com/64x64/F59E0B/FFFFFF?text=Build',
            companyName: 'BuildMaster Construction',
            description: 'Entreprise de construction et génie civil avec plus de 15 ans d\'expérience dans la réalisation de projets résidentiels et commerciaux.',
            location: 'Douala, Cameroun',
            phoneNumber: '+237 6 55 44 33 22',
            keyRefs: ['Construction', 'Génie Civil', 'Projets Clés en Main']
        },
        {
            id: '4',
            logoUrl: 'https://via.placeholder.com/64x64/EF4444/FFFFFF?text=Food',
            companyName: 'FoodService Express',
            description: 'Service de restauration et traiteur professionnel pour événements d\'entreprise, mariages et occasions spéciales.',
            location: 'Douala, Cameroun',
            phoneNumber: '+237 6 88 77 66 55',
            keyRefs: ['Traiteur Premium', 'Événements', 'Livraison Rapide']
        }
    ];

    const handleCompanyClick = (companyId: string) => {
        setSelectedCompanyId(companyId);
        console.log(`Entreprise sélectionnée: ${companyId}`);
        // Vous pouvez ajouter ici la logique de navigation ou d'affichage de détails
    };

    return (
        <div className="w-full bg-gray-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* En-tête de la section */}
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Entreprises Similaires
                    </h2>
                    <p className="text-gray-600">
                        Découvrez d'autres entreprises qui pourraient vous intéresser
                    </p>
                </div>

                {/* Grille de cartes d'entreprises */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {similarCompanies.map((company) => (
                        <LightCompanyCard
                            key={company.id}
                            {...company}
                            onClick={handleCompanyClick}
                        />
                    ))}
                </div>

                {/* Message si une entreprise est sélectionnée */}
                {selectedCompanyId && (
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-blue-800">
                            Vous avez sélectionné l'entreprise avec l'ID: <strong>{selectedCompanyId}</strong>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}