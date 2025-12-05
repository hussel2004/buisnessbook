import React, { useState } from 'react';

// =================================================================
// 1. INTERFACES
// =================================================================
interface Comment {
    id: string;
    authorName: string;
    authorAvatar?: string;
    content: string;
    rating?: number;
    date: Date;
    likes: number;
    replies?: Comment[];
}

interface CommentBarProps {
    companyId?: string;
    initialComments?: Comment[];
    onSubmitComment?: (comment: string, rating: number) => void;
}

// =================================================================
// 2. COMMENT ITEM COMPONENT
// =================================================================
function CommentItem({ comment }: { comment: Comment }) {
    const [showReplies, setShowReplies] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(comment.likes);

    const handleLike = () => {
        if (isLiked) {
            setLikeCount(likeCount - 1);
        } else {
            setLikeCount(likeCount + 1);
        }
        setIsLiked(!isLiked);
    };

    const formatDate = (date: Date) => {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `Il y a ${diffMins} min`;
        if (diffHours < 24) return `Il y a ${diffHours}h`;
        if (diffDays < 7) return `Il y a ${diffDays}j`;
        return date.toLocaleDateString('fr-FR');
    };

    return (
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-100">
            {/* En-tête du commentaire */}
            <div className="flex items-start mb-3">
                {/* Avatar */}
                <img
                    src={comment.authorAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.authorName)}&background=random`}
                    alt={comment.authorName}
                    className="w-10 h-10 rounded-full mr-3"
                />
                
                {/* Info auteur */}
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900">{comment.authorName}</h4>
                        <span className="text-xs text-gray-500">{formatDate(comment.date)}</span>
                    </div>
                    
                    {/* Étoiles de notation */}
                    {comment.rating && (
                        <div className="flex items-center mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                    key={star}
                                    className={`w-4 h-4 ${star <= comment.rating! ? 'text-yellow-400' : 'text-gray-300'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Contenu du commentaire */}
            <p className="text-gray-700 mb-3 ml-13">{comment.content}</p>

            {/* Actions */}
            <div className="flex items-center gap-4 ml-13 text-sm">
                <button
                    onClick={handleLike}
                    className={`flex items-center gap-1 ${isLiked ? 'text-blue-600' : 'text-gray-500'} hover:text-blue-600 transition-colors`}
                >
                    <svg className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span>{likeCount}</span>
                </button>

                {comment.replies && comment.replies.length > 0 && (
                    <button
                        onClick={() => setShowReplies(!showReplies)}
                        className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>{comment.replies.length} {comment.replies.length > 1 ? 'réponses' : 'réponse'}</span>
                    </button>
                )}
            </div>

            {/* Réponses */}
            {showReplies && comment.replies && comment.replies.length > 0 && (
                <div className="ml-13 mt-4 pl-4 border-l-2 border-gray-200">
                    {comment.replies.map((reply) => (
                        <CommentItem key={reply.id} comment={reply} />
                    ))}
                </div>
            )}
        </div>
    );
}

// =================================================================
// 3. COMMENT BAR COMPONENT
// =================================================================
export default function CommentBar({ 
    companyId = '1',
    initialComments = [],
    onSubmitComment
}: CommentBarProps) {
    const [comments, setComments] = useState<Comment[]>(initialComments.length > 0 ? initialComments : [
        {
            id: '1',
            authorName: 'Marie Kouam',
            content: 'Excellent service ! L\'équipe est très professionnelle et réactive. Je recommande vivement cette entreprise pour tous vos projets.',
            rating: 5,
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            likes: 12,
            replies: [
                {
                    id: '1-1',
                    authorName: 'Jean Nkoa',
                    content: 'Je suis d\'accord, j\'ai eu la même expérience positive.',
                    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                    likes: 3
                }
            ]
        },
        {
            id: '2',
            authorName: 'Paul Mbarga',
            content: 'Bon rapport qualité-prix. Livraison dans les délais convenus. Quelques petits détails à améliorer mais globalement satisfait.',
            rating: 4,
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            likes: 8
        },
        {
            id: '3',
            authorName: 'Sophie Ngono',
            content: 'Très bonne communication et suivi du projet. L\'équipe a su répondre à toutes nos attentes avec professionnalisme.',
            rating: 5,
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            likes: 15
        }
    ]);

    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const handleSubmit = () => {
        if (newComment.trim() === '') return;

        const comment: Comment = {
            id: Date.now().toString(),
            authorName: 'Utilisateur',
            content: newComment,
            rating: newRating > 0 ? newRating : undefined,
            date: new Date(),
            likes: 0
        };

        setComments([comment, ...comments]);
        setNewComment('');
        setNewRating(0);

        if (onSubmitComment) {
            onSubmitComment(newComment, newRating);
        }
    };

    const averageRating = comments.length > 0
        ? comments.reduce((sum, c) => sum + (c.rating || 0), 0) / comments.filter(c => c.rating).length
        : 0;

    return (
        <div className="w-full bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* En-tête */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Avis et Commentaires
                        </h2>
                        {comments.filter(c => c.rating).length > 0 && (
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-gray-900">
                                    {averageRating.toFixed(1)}
                                </span>
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg
                                            key={star}
                                            className={`w-5 h-5 ${star <= Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600">
                                    ({comments.length} avis)
                                </span>
                            </div>
                        )}
                    </div>
                    <p className="text-gray-600">
                        Partagez votre expérience avec cette entreprise
                    </p>
                </div>

                {/* Formulaire de nouveau commentaire */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Laisser un avis
                    </h3>
                    
                    {/* Notation par étoiles */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Votre note (optionnel)
                        </label>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setNewRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="focus:outline-none"
                                >
                                    <svg
                                        className={`w-8 h-8 transition-colors ${
                                            star <= (hoverRating || newRating)
                                                ? 'text-yellow-400'
                                                : 'text-gray-300'
                                        }`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Zone de texte */}
                    <div className="mb-4">
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                            Votre commentaire
                        </label>
                        <textarea
                            id="comment"
                            rows={4}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Partagez votre expérience avec cette entreprise..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                    </div>

                    {/* Bouton soumettre */}
                    <button
                        onClick={handleSubmit}
                        disabled={newComment.trim() === ''}
                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                        Publier le commentaire
                    </button>
                </div>

                {/* Liste des commentaires */}
                <div>
                    {comments.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <p className="text-gray-500 text-lg">Aucun commentaire pour le moment</p>
                            <p className="text-gray-400 text-sm mt-2">Soyez le premier à laisser un avis !</p>
                        </div>
                    ) : (
                        comments.map((comment) => (
                            <CommentItem key={comment.id} comment={comment} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}