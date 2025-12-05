'use client';
import React from 'react';

// =================================================================
// 1. INTERFACE
// =================================================================
export interface PromotionCardProps {
    id: string;
    // Visual Element (Optional)
    imageUrl?: string;
    iconType?: 'sale' | 'new' | 'fire' | 'gift' | 'star' | 'percent';
    
    // Core Content (Header)
    subtitle?: string;
    title: string;
    
    // Supporting Details (Body)
    description: string;
    finePrint?: string;
    validUntil?: string;
    
    // Action Element (Footer)
    ctaText: string;
    ctaAction?: () => void;
    
    // Styling Options
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    size?: 'small' | 'medium' | 'large';
}

// =================================================================
// 2. ICON COMPONENT
// =================================================================
function PromotionIcon({ type }: { type: 'sale' | 'new' | 'fire' | 'gift' | 'star' | 'percent' }) {
    const icons = {
        sale: (
            <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.87-.94-7-5.03-7-9V8.3l7-3.5 7 3.5V11c0 3.97-3.13 8.06-7 9zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/>
            </svg>
        ),
        new: (
            <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
            </svg>
        ),
        fire: (
            <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
            </svg>
        ),
        gift: (
            <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
            </svg>
        ),
        star: (
            <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
        ),
        percent: (
            <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.5 11C9.43 11 11 9.43 11 7.5S9.43 4 7.5 4 4 5.57 4 7.5 5.57 11 7.5 11zm0-5C8.33 6 9 6.67 9 7.5S8.33 9 7.5 9 6 8.33 6 7.5 6.67 6 7.5 6zM4.0025 18.5832L18.59 3.9955l1.4142 1.4143L5.4167 19.9974zM16.5 13c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0 5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
            </svg>
        )
    };
    
    return icons[type] || icons.sale;
}

// =================================================================
// 3. PROMOTION CARD COMPONENT
// =================================================================
export default function PromotionCard({
    id,
    imageUrl,
    iconType,
    subtitle,
    title,
    description,
    finePrint,
    validUntil,
    ctaText,
    ctaAction,
    variant = 'primary',
    size = 'medium'
}: PromotionCardProps) {
    
    // Variant styles
    const variantStyles = {
        primary: {
            bg: 'bg-gradient-to-br from-blue-500 to-blue-700',
            subtitle: 'bg-blue-100 text-blue-800',
            icon: 'bg-blue-100 text-blue-600',
            button: 'bg-white text-blue-700 hover:bg-blue-50'
        },
        secondary: {
            bg: 'bg-gradient-to-br from-purple-500 to-purple-700',
            subtitle: 'bg-purple-100 text-purple-800',
            icon: 'bg-purple-100 text-purple-600',
            button: 'bg-white text-purple-700 hover:bg-purple-50'
        },
        success: {
            bg: 'bg-gradient-to-br from-green-500 to-green-700',
            subtitle: 'bg-green-100 text-green-800',
            icon: 'bg-green-100 text-green-600',
            button: 'bg-white text-green-700 hover:bg-green-50'
        },
        warning: {
            bg: 'bg-gradient-to-br from-orange-500 to-orange-700',
            subtitle: 'bg-orange-100 text-orange-800',
            icon: 'bg-orange-100 text-orange-600',
            button: 'bg-white text-orange-700 hover:bg-orange-50'
        },
        danger: {
            bg: 'bg-gradient-to-br from-red-500 to-red-700',
            subtitle: 'bg-red-100 text-red-800',
            icon: 'bg-red-100 text-red-600',
            button: 'bg-white text-red-700 hover:bg-red-50'
        }
    };
    
    // Size styles
    const sizeStyles = {
        small: {
            container: 'p-4',
            icon: 'w-12 h-12',
            image: 'h-32',
            title: 'text-xl',
            description: 'text-sm'
        },
        medium: {
            container: 'p-6',
            icon: 'w-16 h-16',
            image: 'h-48',
            title: 'text-2xl',
            description: 'text-base'
        },
        large: {
            container: 'p-8',
            icon: 'w-20 h-20',
            image: 'h-64',
            title: 'text-3xl',
            description: 'text-lg'
        }
    };
    
    const currentVariant = variantStyles[variant];
    const currentSize = sizeStyles[size];
    
    return (
        <div className="w-full max-w-md mx-auto">
            <div className={`${currentVariant.bg} rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-3xl`}>
                
                {/* I. Visual Element (Optional) */}
                {(imageUrl || iconType) && (
                    <div className="relative">
                        {imageUrl ? (
                            <img 
                                src={imageUrl} 
                                alt={title}
                                className={`w-full ${currentSize.image} object-cover`}
                            />
                        ) : iconType && (
                            <div className="flex items-center justify-center py-8">
                                <div className={`${currentVariant.icon} ${currentSize.icon} rounded-full p-4 shadow-lg`}>
                                    <PromotionIcon type={iconType} />
                                </div>
                            </div>
                        )}
                        
                        {/* Overlay gradient for better text readability if image is present */}
                        {imageUrl && (
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        )}
                    </div>
                )}
                
                {/* Card Content */}
                <div className={`${currentSize.container} text-white`}>
                    
                    {/* II. Core Content (Header) */}
                    <div className="mb-4">
                        {/* Subtitle/Label */}
                        {subtitle && (
                            <span className={`inline-block ${currentVariant.subtitle} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3`}>
                                {subtitle}
                            </span>
                        )}
                        
                        {/* Title */}
                        <h2 className={`${currentSize.title} font-bold leading-tight`}>
                            {title}
                        </h2>
                    </div>
                    
                    {/* III. Supporting Details (Body) */}
                    <div className="mb-6">
                        {/* Description */}
                        <p className={`${currentSize.description} text-white/90 leading-relaxed mb-3`}>
                            {description}
                        </p>
                        
                        {/* Fine Print/Terms */}
                        {(finePrint || validUntil) && (
                            <div className="text-xs text-white/70 space-y-1">
                                {validUntil && (
                                    <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                                        </svg>
                                        <span>Valide jusqu'au {validUntil}</span>
                                    </div>
                                )}
                                {finePrint && (
                                    <p className="italic">{finePrint}</p>
                                )}
                            </div>
                        )}
                    </div>
                    
                    {/* IV. Action Element (Footer) */}
                    <button
                        onClick={ctaAction}
                        className={`w-full ${currentVariant.button} font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg`}
                    >
                        {ctaText}
                    </button>
                </div>
            </div>
        </div>
    );
}

// =================================================================
// 4. DEMO COMPONENT WITH EXAMPLES
// =================================================================
