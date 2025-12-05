'use client';
import React, { useState } from 'react';

// Tableau des champs d'activité/filtres rapides
// C'est maintenant une constante dans ce fichier, facile à modifier.
const BUSINESS_FIELDS = [
    'Électronique',
    'Nutrition',
    'Santé',
    'Finance',
    'Aérospatial',
    'Logistique',
    'Éducation',
];

// Interface pour structurer l'état de la recherche
interface ResearchCriteria {
    searchQuery: string;
    activeFilter: string | null; // Pour le filtre rapide (bouton cliqué)
}

export default function ResearchCard() {
    // 1. Initialisation de l'état
    const [criteria, setCriteria] = useState<ResearchCriteria>({
        searchQuery: '',
        activeFilter: null,
    });
    
    // 2. État pour gérer l'état de chargement (Simulé)
    const [isLoading, setIsLoading] = useState(false);
    const [resultsCount, setResultsCount] = useState<number | null>(null);

    // 3. Gestion de la soumission de la recherche (Input principal)
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Simuler la recherche principale
        console.log(`Recherche lancée: "${criteria.searchQuery}", Filtre: ${criteria.activeFilter}`);
        triggerSearchSimulation();
    };

    // 4. Gestion du clic sur les boutons de filtre
    const handleFilterClick = (field: string) => {
        // Si le filtre est déjà actif, le désactiver (bascule)
        const newActiveFilter = criteria.activeFilter === field ? null : field;
        
        setCriteria(prevCriteria => ({
            ...prevCriteria,
            activeFilter: newActiveFilter,
        }));
        
        // Optionnel: Lancer la recherche immédiatement après le filtre
        triggerSearchSimulation(criteria.searchQuery, newActiveFilter);
    };

    // 5. Fonction de simulation de l'API (pour éviter la répétition)
    const triggerSearchSimulation = (query = criteria.searchQuery, filter = criteria.activeFilter) => {
        setIsLoading(true);
        setResultsCount(null); // Réinitialiser avant la nouvelle recherche

        setTimeout(() => {
            let simulatedCount = Math.floor(Math.random() * 500) + 50; 
            
            // Simuler un filtrage si un bouton est actif
            if (filter) {
                // Diminuer le nombre de résultats pour un filtre
                simulatedCount = Math.floor(simulatedCount / 2) + 20; 
            }

            setResultsCount(simulatedCount);
            setIsLoading(false);
            console.log(`Résultats simulés: ${simulatedCount} pour Query: "${query}", Filter: ${filter}`);
        }, 1500);
    }


    return (
        // Conteneur principal - ajusté pour un look de barre de recherche plus large
        <div className="bg-white p-6 rounded-lg shadow-xl w-full">
            
            {/* 1. Barre de Recherche et Bouton */}
            <form className="flex space-x-3 mb-6" onSubmit={handleSearchSubmit}>
                <input 
                    type="text" 
                    name="searchQuery"
                    placeholder="Rechercher des entreprises par mot-clé, secteur ou ville..." 
                    value={criteria.searchQuery}
                    onChange={(e) => setCriteria(p => ({...p, searchQuery: e.target.value}))}
                    className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg"
                    disabled={isLoading}
                />
                
                <button 
                    type="submit" 
                    className={`p-3 rounded-lg font-semibold text-white transition duration-200 flex items-center justify-center 
                        ${isLoading 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    disabled={isLoading}
                >
                    {/* Icône de recherche (Loupe) */}
                    {isLoading ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    )}
                </button>
            </form>

            {/* 2. Filtres Rapides (Boutons) */}
            <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Filtres Rapides :</h3>
                <div className="flex flex-wrap gap-2">
                    {BUSINESS_FIELDS.map((field) => (
                        <button
                            key={field}
                            onClick={() => handleFilterClick(field)}
                            disabled={isLoading}
                            className={`
                                px-3 py-1 text-sm rounded-full transition duration-150 ease-in-out
                                ${criteria.activeFilter === field
                                    ? 'bg-blue-600 text-white shadow-md' // Style actif
                                    : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 border border-gray-200' // Style inactif
                                }
                                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                            `}
                        >
                            {field}
                        </button>
                    ))}
                </div>
            </div>
            
            <hr className="my-4 border-gray-100" />
            
            {/* 3. Affichage du nombre de résultats */}
            <div className="results-display text-left">
                {isLoading ? (
                    <p className="text-md text-blue-500 italic">Recherche en cours...</p>
                ) : resultsCount !== null ? (
                    <p className="text-lg text-gray-700">
                        🎉 **{resultsCount}** entreprises trouvées selon votre recherche.
                    </p>
                ) : (
                    <p className="text-md text-gray-500 italic">
                        Utilisez la barre de recherche et les filtres pour affiner les résultats.
                    </p>
                )}
            </div>
            
        </div>
    );
}