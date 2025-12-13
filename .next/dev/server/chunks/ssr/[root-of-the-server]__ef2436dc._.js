module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/components/LightCompanyCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LightCompanyCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function LightCompanyCard({ id, logoUrl, companyName, description, location, phoneNumber, keyRefs, onClick }) {
    const defaultLogo = "https://via.placeholder.com/64x64?text=Logo"; // Logo par défaut
    return(// Conteneur principal de la carte
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col bg-white rounded-lg shadow-md p-4 mb-4 transition-all duration-200 hover:shadow-lg hover:ring-2 hover:ring-blue-200",
        onClick: ()=>onClick && onClick(id),
        style: onClick ? {
            cursor: 'pointer'
        } : {},
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0 mr-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: logoUrl || defaultLogo,
                            alt: `${companyName} Logo`,
                            className: "w-16 h-16 rounded-full object-cover border border-gray-200"
                        }, void 0, false, {
                            fileName: "[project]/components/LightCompanyCard.tsx",
                            lineNumber: 40,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/LightCompanyCard.tsx",
                        lineNumber: 39,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-bold text-gray-900 leading-tight",
                        children: companyName
                    }, void 0, false, {
                        fileName: "[project]/components/LightCompanyCard.tsx",
                        lineNumber: 48,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/LightCompanyCard.tsx",
                lineNumber: 37,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-gray-600 text-sm mb-4 line-clamp-3",
                children: [
                    " ",
                    description
                ]
            }, void 0, true, {
                fileName: "[project]/components/LightCompanyCard.tsx",
                lineNumber: 54,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700 mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-4 h-4 mr-2 text-gray-500",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                xmlns: "http://www.w3.org/2000/svg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: "2",
                                        d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LightCompanyCard.tsx",
                                        lineNumber: 61,
                                        columnNumber: 154
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: "2",
                                        d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    }, void 0, false, {
                                        fileName: "[project]/components/LightCompanyCard.tsx",
                                        lineNumber: 61,
                                        columnNumber: 315
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/LightCompanyCard.tsx",
                                lineNumber: 61,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: location
                            }, void 0, false, {
                                fileName: "[project]/components/LightCompanyCard.tsx",
                                lineNumber: 62,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LightCompanyCard.tsx",
                        lineNumber: 60,
                        columnNumber: 17
                    }, this),
                    phoneNumber && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: `tel:${phoneNumber}`,
                        className: "flex items-center text-blue-600 hover:underline",
                        onClick: (e)=>e.stopPropagation(),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-4 h-4 mr-2",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                xmlns: "http://www.w3.org/2000/svg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: "2",
                                    d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                }, void 0, false, {
                                    fileName: "[project]/components/LightCompanyCard.tsx",
                                    lineNumber: 70,
                                    columnNumber: 144
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/LightCompanyCard.tsx",
                                lineNumber: 70,
                                columnNumber: 25
                            }, this),
                            phoneNumber
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LightCompanyCard.tsx",
                        lineNumber: 65,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/LightCompanyCard.tsx",
                lineNumber: 59,
                columnNumber: 13
            }, this),
            keyRefs && keyRefs.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-auto pt-3 border-t border-gray-100",
                children: [
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold text-gray-500 mb-2",
                        children: "Références Clés:"
                    }, void 0, false, {
                        fileName: "[project]/components/LightCompanyCard.tsx",
                        lineNumber: 79,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: keyRefs.slice(0, 3).map((ref, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full",
                                children: ref
                            }, index, false, {
                                fileName: "[project]/components/LightCompanyCard.tsx",
                                lineNumber: 82,
                                columnNumber: 29
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/LightCompanyCard.tsx",
                        lineNumber: 80,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/LightCompanyCard.tsx",
                lineNumber: 78,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/LightCompanyCard.tsx",
        lineNumber: 31,
        columnNumber: 9
    }, this));
}
}),
"[project]/components/ResearchCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ResearchCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
// Tableau des champs d'activité/filtres rapides
// C'est maintenant une constante dans ce fichier, facile à modifier.
const BUSINESS_FIELDS = [
    'Électronique',
    'Nutrition',
    'Santé',
    'Finance',
    'Aérospatial',
    'Logistique',
    'Éducation'
];
function ResearchCard() {
    // 1. Initialisation de l'état
    const [criteria, setCriteria] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        searchQuery: '',
        activeFilter: null
    });
    // 2. État pour gérer l'état de chargement (Simulé)
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [resultsCount, setResultsCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // 3. Gestion de la soumission de la recherche (Input principal)
    const handleSearchSubmit = (e)=>{
        e.preventDefault();
        // Simuler la recherche principale
        console.log(`Recherche lancée: "${criteria.searchQuery}", Filtre: ${criteria.activeFilter}`);
        triggerSearchSimulation();
    };
    // 4. Gestion du clic sur les boutons de filtre
    const handleFilterClick = (field)=>{
        // Si le filtre est déjà actif, le désactiver (bascule)
        const newActiveFilter = criteria.activeFilter === field ? null : field;
        setCriteria((prevCriteria)=>({
                ...prevCriteria,
                activeFilter: newActiveFilter
            }));
        // Optionnel: Lancer la recherche immédiatement après le filtre
        triggerSearchSimulation(criteria.searchQuery, newActiveFilter);
    };
    // 5. Fonction de simulation de l'API (pour éviter la répétition)
    const triggerSearchSimulation = (query = criteria.searchQuery, filter = criteria.activeFilter)=>{
        setIsLoading(true);
        setResultsCount(null); // Réinitialiser avant la nouvelle recherche
        setTimeout(()=>{
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
    };
    return(// Conteneur principal - ajusté pour un look de barre de recherche plus large
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white p-6 rounded-lg shadow-xl w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: "flex space-x-3 mb-6",
                onSubmit: handleSearchSubmit,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        name: "searchQuery",
                        placeholder: "Rechercher des entreprises par mot-clé, secteur ou ville...",
                        value: criteria.searchQuery,
                        onChange: (e)=>setCriteria((p)=>({
                                    ...p,
                                    searchQuery: e.target.value
                                })),
                        className: "flex-grow p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg",
                        disabled: isLoading
                    }, void 0, false, {
                        fileName: "[project]/components/ResearchCard.tsx",
                        lineNumber: 83,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: `p-3 rounded-lg font-semibold text-white transition duration-200 flex items-center justify-center 
                        ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`,
                        disabled: isLoading,
                        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "animate-spin h-5 w-5 text-white",
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    className: "opacity-25",
                                    cx: "12",
                                    cy: "12",
                                    r: "10",
                                    stroke: "currentColor",
                                    strokeWidth: "4"
                                }, void 0, false, {
                                    fileName: "[project]/components/ResearchCard.tsx",
                                    lineNumber: 105,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    className: "opacity-75",
                                    fill: "currentColor",
                                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                }, void 0, false, {
                                    fileName: "[project]/components/ResearchCard.tsx",
                                    lineNumber: 106,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ResearchCard.tsx",
                            lineNumber: 104,
                            columnNumber: 25
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "h-6 w-6",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: "2",
                                d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            }, void 0, false, {
                                fileName: "[project]/components/ResearchCard.tsx",
                                lineNumber: 110,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/ResearchCard.tsx",
                            lineNumber: 109,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ResearchCard.tsx",
                        lineNumber: 93,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ResearchCard.tsx",
                lineNumber: 82,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-medium text-gray-500 mb-2",
                        children: "Filtres Rapides :"
                    }, void 0, false, {
                        fileName: "[project]/components/ResearchCard.tsx",
                        lineNumber: 118,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: BUSINESS_FIELDS.map((field)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleFilterClick(field),
                                disabled: isLoading,
                                className: `
                                px-3 py-1 text-sm rounded-full transition duration-150 ease-in-out
                                ${criteria.activeFilter === field ? 'bg-blue-600 text-white shadow-md' // Style actif
                                 : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 border border-gray-200' // Style inactif
                                }
                                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                            `,
                                children: field
                            }, field, false, {
                                fileName: "[project]/components/ResearchCard.tsx",
                                lineNumber: 121,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/ResearchCard.tsx",
                        lineNumber: 119,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ResearchCard.tsx",
                lineNumber: 117,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                className: "my-4 border-gray-100"
            }, void 0, false, {
                fileName: "[project]/components/ResearchCard.tsx",
                lineNumber: 140,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "results-display text-left",
                children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-md text-blue-500 italic",
                    children: "Recherche en cours..."
                }, void 0, false, {
                    fileName: "[project]/components/ResearchCard.tsx",
                    lineNumber: 145,
                    columnNumber: 21
                }, this) : resultsCount !== null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-lg text-gray-700",
                    children: [
                        "🎉 **",
                        resultsCount,
                        "** entreprises trouvées selon votre recherche."
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ResearchCard.tsx",
                    lineNumber: 147,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-md text-gray-500 italic",
                    children: "Utilisez la barre de recherche et les filtres pour affiner les résultats."
                }, void 0, false, {
                    fileName: "[project]/components/ResearchCard.tsx",
                    lineNumber: 151,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ResearchCard.tsx",
                lineNumber: 143,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ResearchCard.tsx",
        lineNumber: 79,
        columnNumber: 9
    }, this));
}
}),
"[project]/public/data/mock_company.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"id":"2d8f5b3a-9c4e-4e7a-8b1d-0c3f6e5a1b9c","code":"ITG-001","service":"Enterprise Software & AI","business_actor_id":"4a7c1e9f-2b6d-4c8e-9a0f-1d2b3c4e5f6a","is_individual_business":false,"email":"sales@innovatetech.com","short_name":"InnovateTech","long_name":"InnovateTech Global","description":"InnovateTech Global est un leader dans le développement de solutions d'intelligence artificielle de pointe et de logiciels d'entreprise depuis 2015...","logo_uri":"https://placehold.co/100x100/f59e0b/ffffff?text=Logo","website_url":"https://www.innovatetech.com","year_founded":2015,"number_of_employees":750,"is_active":true,"status":"Operational","updated_at":"2025-11-20T10:30:00Z","location":"Seattle, WA, USA","phone_number":"+1 (555) 123-4567","average_rating":4.6,"posts":[{"post_id":"p-001-ai-launch","companyName":"InnovateTech Global","postTime":"2025-12-03T15:00:00Z","introText":"🚀 **Lancement Majeur !** Découvrez notre nouveau moteur d'IA générative 'Nexus'. Il est conçu pour réinventer la création de contenu d'entreprise. Lisez notre livre blanc pour tous les détails !","media":{"type":"image","url":"https://placehold.co/800x450/4f46e5/ffffff?text=Nexus+AI+Launch","alt":"Image annonçant le lancement de Nexus AI"},"likes":589,"commentsCount":42,"sharesCount":85,"comments":[{"id":"c-post-1-a","authorName":"Marc D.","authorAvatar":"https://placehold.co/40x40/facc15/000000?text=MD","content":"Impressionnant ! Les performances sont-elles aussi bonnes que le promet le livre blanc ?","rating":null,"date":"2025-12-03T16:15:00Z","likes":12,"replies":[]}]},{"post_id":"p-002-event","companyName":"InnovateTech Global","postTime":"2025-11-28T10:00:00Z","introText":"Nous sommes ravis d'annoncer notre participation à la conférence 'Future of Tech' à Paris la semaine prochaine. Venez rencontrer notre équipe sur le stand 404 !","media":{"type":"none"},"likes":154,"commentsCount":18,"sharesCount":32,"comments":[]}],"ratings":[{"person_name":"Alice Dubois","score":5.0,"rated_at":"2025-11-18T14:22:00Z"},{"person_name":"Benoît Leclerc","score":4.5,"rated_at":"2025-11-19T09:10:00Z"}],"comments":[{"id":"c7a8b9c0-d1e2-f3a4-g5h6-i7j8k9l0m1n2","authorName":"TechEnthusiast_78","authorAvatar":"https://placehold.co/40x40/059669/ffffff?text=TE","content":"Leur plateforme cloud est incroyablement stable et le support technique est réactif. Hautement recommandé pour les solutions IA.","rating":5.0,"date":"2025-11-19T11:05:00Z","likes":25,"replies":[{"id":"r1a2b3c4-d5e6-f7a8-g9h0-i1j2k3l4m5n6","authorName":"InnovateTech Global (Admin)","authorAvatar":"https://placehold.co/40x40/f59e0b/000000?text=ITG","content":"Merci beaucoup pour votre retour positif ! Nous transmettons vos compliments à l'équipe de support.","rating":null,"date":"2025-11-19T13:30:00Z","likes":5}]},{"id":"c1a2b3c4-d5e6-f7a8-g9h0-i1j2k3l4m5n6","authorName":"FinanceGuru_01","authorAvatar":"https://placehold.co/40x40/8b5cf6/ffffff?text=FG","content":"Nous avons constaté une augmentation de 30% de l'efficacité après la mise en œuvre de leur logiciel bespoke. Un véritable partenaire d'affaires.","rating":4.5,"date":"2025-11-20T08:45:00Z","likes":12,"replies":[]},{"id":"c9x8y7z6-a5b4-c3d2-e1f0-g9h8i7j6k5l4","authorName":"ProjectLead_2024","authorAvatar":null,"content":"Leur documentation pourrait être plus claire pour les nouveaux utilisateurs, mais le produit est puissant.","rating":4.0,"date":"2025-11-21T09:00:00Z","likes":3,"replies":[{"id":"r9z8y7x6-w5v4-u3t2-s1r0-q9p8o7n6m5l4","authorName":"InnovateTech Global (Admin)","authorAvatar":"https://placehold.co/40x40/f59e0b/000000?text=ITG","content":"Nous prenons note de votre suggestion concernant la documentation et allons travailler sur une amélioration immédiate. Merci de nous aider à nous améliorer !","rating":null,"date":"2025-11-21T10:15:00Z","likes":2}]}],"promotions":[{"promotion_id":"p1d2e3f4-a5b6-c7d8-e9f0-g1h2i3j4k5l6","title":"Offre Spéciale Lancement IA 2026","description":"20% de réduction sur notre forfait de services d'apprentissage automatique pour toute nouvelle inscription avant le 31 janvier.","start_date":"2025-12-01T00:00:00Z","end_date":"2026-01-31T23:59:59Z","status":"Active"}]});}),
"[project]/app/company/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CompaniesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LightCompanyCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/LightCompanyCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ResearchCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ResearchCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$data$2f$mock_company$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/public/data/mock_company.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
async function fetchCompanyData() {
    // 1. Simulation du délai d'une requête réseau (e.g., 500ms)
    await new Promise((resolve)=>setTimeout(resolve, 500));
    // 2. Simulation de la réponse JSON de l'API
    const apiResponse = [
        {
            id: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$data$2f$mock_company$2e$json__$28$json$29$__["default"].id,
            logoUrl: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$data$2f$mock_company$2e$json__$28$json$29$__["default"].logo_uri,
            companyName: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$data$2f$mock_company$2e$json__$28$json$29$__["default"].long_name,
            description: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$data$2f$mock_company$2e$json__$28$json$29$__["default"].description,
            location: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$data$2f$mock_company$2e$json__$28$json$29$__["default"].location,
            phoneNumber: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$data$2f$mock_company$2e$json__$28$json$29$__["default"].phone_number,
            keyRefs: [
                "AI",
                "Software",
                "Enterprise"
            ],
            onClick: (companyId)=>console.log(`Company clicked: ${companyId} - ${__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$data$2f$mock_company$2e$json__$28$json$29$__["default"].long_name}`)
        }
    ];
    return apiResponse;
}
function CompaniesPage() {
    const [companies, setCompanies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const loadCompanies = async ()=>{
            try {
                // ⚠️ POINT DE REMPLACEMENT FACILE :
                // Remplacez 'fetchCompanyData()' par 'fetch('/api/companies').then(res => res.json())'
                // lorsque votre API sera prête.
                const data = await fetchCompanyData();
                setCompanies(data);
            } catch (error) {
                console.error("Erreur lors du chargement des données:", error);
            // Gérer l'erreur (affichage d'un message à l'utilisateur)
            } finally{
                setIsLoading(false);
            }
        };
        loadCompanies();
    }, []); // Le tableau vide [] assure que cela ne s'exécute qu'une seule fois au montage du composant
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4 py-8 max-w-7xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "w-full mb-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ResearchCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/app/company/page.tsx",
                        lineNumber: 69,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/company/page.tsx",
                    lineNumber: 68,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                    className: "my-4"
                }, void 0, false, {
                    fileName: "[project]/app/company/page.tsx",
                    lineNumber: 72,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold text-gray-800 mb-6 border-b pb-2",
                            children: "Résultats de la Recherche"
                        }, void 0, false, {
                            fileName: "[project]/app/company/page.tsx",
                            lineNumber: 76,
                            columnNumber: 21
                        }, this),
                        isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-center py-10 text-lg text-indigo-600",
                            children: "Chargement des entreprises..."
                        }, void 0, false, {
                            fileName: "[project]/app/company/page.tsx",
                            lineNumber: 81,
                            columnNumber: 25
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
                            children: [
                                companies.map((company)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LightCompanyCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        id: company.id,
                                        logoUrl: company.logoUrl,
                                        companyName: company.companyName,
                                        description: company.description,
                                        location: company.location,
                                        phoneNumber: company.phoneNumber,
                                        keyRefs: company.keyRefs,
                                        onClick: company.onClick
                                    }, company.id, false, {
                                        fileName: "[project]/app/company/page.tsx",
                                        lineNumber: 87,
                                        columnNumber: 33
                                    }, this)),
                                companies.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500 col-span-full text-center",
                                    children: "Aucun résultat trouvé."
                                }, void 0, false, {
                                    fileName: "[project]/app/company/page.tsx",
                                    lineNumber: 100,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/company/page.tsx",
                            lineNumber: 85,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/company/page.tsx",
                    lineNumber: 75,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/company/page.tsx",
            lineNumber: 65,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/company/page.tsx",
        lineNumber: 64,
        columnNumber: 9
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ef2436dc._.js.map