"use client";
import LightCompanyCard from "@/components/LightCompanyCard";
import ResearchCard from "@/components/ResearchCard";
import mockCompanyData from "@/public/data/mock_company.json";
import React, { useState, useEffect } from 'react';
// ... (Interface et mockCompanies restent inchangés) ...

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

async function fetchCompanyData(): Promise<CompanyCardProps[]> {
    // 1. Simulation du délai d'une requête réseau (e.g., 500ms)
    await new Promise(resolve => setTimeout(resolve, 500));

    // 2. Simulation de la réponse JSON de l'API
    const apiResponse = [
        {
            id: mockCompanyData.id,
            logoUrl: mockCompanyData.logo_uri,
            companyName: mockCompanyData.long_name,
            description: mockCompanyData.description,
            location: mockCompanyData.location,
            phoneNumber: mockCompanyData.phone_number,
            keyRefs: ["AI", "Software", "Enterprise"],
            onClick: (companyId: string) => console.log(`Company clicked: ${companyId} - ${mockCompanyData.long_name}`)
        }
    ];

    return apiResponse as CompanyCardProps[];
}

export default function CompaniesPage() {
    const [companies, setCompanies] = useState<CompanyCardProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadCompanies = async () => {
            try {
                // ⚠️ POINT DE REMPLACEMENT FACILE :
                // Remplacez 'fetchCompanyData()' par 'fetch('/api/companies').then(res => res.json())'
                // lorsque votre API sera prête.
                const data = await fetchCompanyData(); 
                setCompanies(data);
            } catch (error) {
                console.error("Erreur lors du chargement des données:", error);
                // Gérer l'erreur (affichage d'un message à l'utilisateur)
            } finally {
                setIsLoading(false);
            }
        };

        loadCompanies();
    }, []); // Le tableau vide [] assure que cela ne s'exécute qu'une seule fois au montage du composant

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                
                {/* Section Recherche */}
                <section className="w-full mb-8">
                    <ResearchCard />
                </section>
                
                <hr className="my-4"/>

                {/* Section Résultats */}
                <section className="w-full">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
                        Résultats de la Recherche
                    </h2>

                    {isLoading ? (
                        <p className="text-center py-10 text-lg text-indigo-600">
                            Chargement des entreprises...
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {companies.map((company) => (
                                <LightCompanyCard
                                    key={company.id}
                                    id={company.id}
                                    logoUrl={company.logoUrl}
                                    companyName={company.companyName}
                                    description={company.description}
                                    location={company.location}
                                    phoneNumber={company.phoneNumber}
                                    keyRefs={company.keyRefs}
                                    onClick={company.onClick}
                                />
                            ))}
                            {companies.length === 0 && (
                                <p className="text-gray-500 col-span-full text-center">
                                    Aucun résultat trouvé.
                                </p>
                            )}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}