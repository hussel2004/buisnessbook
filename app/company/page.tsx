"use client";
import LightCompanyCard from "@/components/LightCompanyCard";
import ResearchCard from "@/components/ResearchCard";

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

export const mockCompanies: CompanyCardProps[] = [
    {
        id: "1",
        logoUrl: "https://example.com/logo1.png",
        companyName: "Tech Solutions Inc.",
        description: "Une entreprise innovante spécialisée dans le développement de solutions logicielles pour les PME.",
        location: "Paris, France",
        phoneNumber: "+33 1 23 45 67 89",
        keyRefs: ["Google", "Microsoft", "Amazon"],
        onClick: (companyId: string) => console.log(`Company clicked: ${companyId}`)
    },
    {
        id: "2",
        logoUrl: "https://example.com/logo2.png",
        companyName: "Green Energy Corp",
        description: "Leader dans les énergies renouvelables et les solutions durables pour un avenir plus vert.",
        location: "Lyon, France",
        phoneNumber: "+33 4 56 78 90 12",
        keyRefs: ["EDF", "Total", "Engie"],
        onClick: (companyId: string) => console.log(`Company clicked: ${companyId}`)
    },
    {
        id: "3",
        companyName: "Creative Design Studio",
        description: "Agence de design et de marketing digital créant des expériences utilisateur exceptionnelles.",
        location: "Marseille, France",
        phoneNumber: "+33 4 91 23 45 67",
        keyRefs: ["Airbnb", "Uber", "Netflix"],
        // logoUrl est optionnel, donc omis volontairement pour cet exemple
    },
    {
        id: "4",
        logoUrl: "https://example.com/logo4.png",
        companyName: "HealthCare Plus",
        description: "Fournisseur de solutions médicales innovantes et de services de santé de qualité.",
        location: "Toulouse, France",
        // phoneNumber est optionnel, donc omis volontairement
        keyRefs: ["Sanofi", "Pfizer", "Roche"],
        onClick: (companyId: string) => console.log(`Company clicked: ${companyId}`)
    },
    {
        id: "5",
        logoUrl: "https://example.com/logo5.png",
        companyName: "Logistics Pro",
        description: "Expert en solutions logistiques et chaîne d'approvisionnement pour entreprises internationales.",
        location: "Lille, France",
        phoneNumber: "+33 3 20 12 34 56",
        // keyRefs est optionnel, donc omis volontairement
        onClick: (companyId: string) => console.log(`Company clicked: ${companyId}`)
    }
];

export default function CompaniesPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Le container principal est centré (mx-auto) et a une largeur maximale (max-w-7xl) pour le grand écran */}
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                
                {/* Section Recherche (Elle prend toute la largeur) */}
                {/* On remplace le layout flex pour une colonne unique qui prend toute la largeur */}
                <section className="w-full mb-8">
                    {/* Le ResearchCard gère maintenant la barre de recherche et les filtres */}
                    <ResearchCard />
                </section>
                
                {/* Section Résultats (Elle prend aussi toute la largeur, apparaissant en dessous) */}
                <section className="w-full">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Résultats de la Recherche</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {mockCompanies.map((company) => (
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
                    </div>
                </section>
            </div>
        </div>
    );
}