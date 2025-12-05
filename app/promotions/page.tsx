// promotions/PromotionsPage.tsx
"use client";
import React from 'react';
// We import the component and the interface from the component file
import PromotionCard, { PromotionCardProps } from "@/components/PromotionCard";

// =================================================================
// 1. MOCK DATA (Simulated Promotions)
// =================================================================
const mockPromotions: PromotionCardProps[] = [
    {
        id: "promo-1",
        iconType: "percent",
        subtitle: "Offre Spéciale",
        title: "20% de Réduction sur tout le site",
        description: "Profitez d'une remise immédiate de 20% sur tous nos produits sans minimum d'achat. Code PROMO20.",
        ctaText: "Découvrir l'offre",
        ctaAction: () => console.log('CTA for 20% off clicked'),
        variant: "primary",
        size: "medium",
        validUntil: "31/12/2025"
    },
    {
        id: "promo-2",
        imageUrl: "https://images.unsplash.com/photo-1593539823157-b50e046a6f11?w=600&h=400&auto=format&fit=crop",
        iconType: "gift",
        subtitle: "Cadeau de Bienvenue",
        title: "Un eBook Gratuit avec votre première commande",
        description: "Recevez notre guide 'Secrets du Succès' (valeur 49€) en vous inscrivant aujourd'hui. Limité aux 100 premiers.",
        ctaText: "S'inscrire maintenant",
        ctaAction: () => alert('Welcome gift claimed!'),
        variant: "success",
        size: "medium",
        finePrint: "*Conditions applicables. Voir les détails.",
    },
    {
        id: "promo-3",
        iconType: "fire",
        subtitle: "Vente Flash",
        title: "Pack Premium à Moitié Prix !",
        description: "Seulement 48 heures pour obtenir notre abonnement annuel Premium à 50% de son prix habituel.",
        ctaText: "J'en profite vite",
        ctaAction: () => console.log('Flash Sale clicked'),
        variant: "danger", // Utilisation du variant 'danger' pour l'urgence
        size: "small",
        validUntil: "05/12/2025"
    },
    {
        id: "promo-4",
        iconType: "star",
        subtitle: "Nouveauté",
        title: "Lancement de la Plateforme V3.0",
        description: "Découvrez nos nouvelles fonctionnalités d'analyse de données, maintenant plus rapide et plus intuitive.",
        ctaText: "Voir les nouveautés",
        variant: "secondary",
        size: "large", // Utilisation de la grande taille pour l'importance
    },
    {
        id: "promo-5",
        iconType: "new",
        subtitle: "Période d'Essai",
        title: "30 Jours Gratuits",
        description: "Testez toutes les fonctionnalités Pro sans engagement. Annulez à tout moment.",
        ctaText: "Commencer l'essai",
        variant: "warning",
        size: "medium",
    }
];

// =================================================================
// 2. MAIN PAGE COMPONENT
// =================================================================
export default function PromotionsPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-7xl mx-auto">
                {/* Header de la page */}
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        🔥 Les meilleures <span className="text-blue-600">Promotions</span> du moment
                    </h1>
                    <p className="mt-4 text-xl text-gray-600">
                        Ne manquez aucune offre spéciale, mise à jour en temps réel.
                    </p>
                </header>

                {/* Grille des Cartes de Promotion */}
                <main className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {mockPromotions.map((promo) => (
                        <PromotionCard 
                            key={promo.id}
                            {...promo} // Passe toutes les propriétés de l'objet promo au composant
                        />
                    ))}
                </main>
            </div>
        </div>
    );
}

// NOTE: Ensure that the 'PromotionCard' component and 'PromotionCardProps' interface 
// are correctly exported from your PromotionCard file for this to work.