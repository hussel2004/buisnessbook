"use client"
import { FaEllipsisH, FaRegThumbsUp, FaRegCommentDots, FaRegShareSquare, FaUserCircle } from "react-icons/fa";

export interface Comment {
    id: number | string;
    user: string;
    text: string;
}

export interface PostCardProps {
    companyName: string;
    postTime: string;
    introText: string;
    media?: React.ReactNode;
    likes: number;
    commentsCount: number;
    comments: Comment[];
    onLike?: () => void;
    onComment?: () => void;
    onShare?: () => void;
    onAddComment?: (text: string) => void;
}

export default function PostCard({
    companyName,
    postTime,
    introText,
    media,
    likes,
    commentsCount,
    comments,
    onLike,
    onComment,
    onShare,
    onAddComment,
}: PostCardProps) {
    return (
        <div className="bg-white rounded-lg shadow p-4 max-w-xl mx-auto mb-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <FaUserCircle className="text-3xl text-gray-400" />
                    <div>
                        <div className="font-semibold text-gray-800">{companyName}</div>
                        <div className="text-xs text-gray-500">{postTime}</div>
                    </div>
                </div>
                <button className="p-2 rounded-full hover:bg-gray-100">
                    <FaEllipsisH className="text-lg text-gray-500" />
                </button>
            </div>

            {/* Introductory text */}
            <div className="mb-3 text-gray-700">
                {introText}
            </div>

            {/* Post content and stats */}
            <div className="flex gap-4 mb-3">
                {/* Post media */}
                <div className="flex-1 bg-gray-100 rounded-lg flex items-center justify-center min-h-[120px]">
                    {media || <span className="text-gray-400">[Post Media]</span>}
                </div>
                {/* Likes and comments count */}
                <div className="flex flex-col items-center justify-center w-20">
                    <div className="text-sm text-gray-600 mb-2">
                        <FaRegThumbsUp className="inline mr-1" /> {likes}
                    </div>
                    <div className="text-sm text-gray-600">
                        <FaRegCommentDots className="inline mr-1" /> {commentsCount}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between border-t border-b py-2 mb-2 text-gray-600">
                <button className="flex items-center gap-1 hover:text-blue-600" onClick={onLike}>
                    <FaRegThumbsUp /> Like
                </button>
                <button className="flex items-center gap-1 hover:text-blue-600" onClick={onComment}>
                    <FaRegCommentDots /> Comment
                </button>
                <button className="flex items-center gap-1 hover:text-blue-600" onClick={onShare}>
                    <FaRegShareSquare /> Share
                </button>
            </div>

            {/* Add comment */}
            <div className="flex items-center gap-2 mb-2">
                <input
                    className="flex-1 border rounded px-3 py-1 text-sm focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Add a comment..."
                    // Controlled by parent
                    onKeyDown={e => {
                        if (e.key === 'Enter' && onAddComment) {
                            onAddComment((e.target as HTMLInputElement).value);
                            (e.target as HTMLInputElement).value = '';
                        }
                    }}
                />
                <button
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                    onClick={e => {
                        const input = (e.currentTarget.parentElement?.querySelector('input') as HTMLInputElement);
                        if (input && onAddComment) {
                            onAddComment(input.value);
                            input.value = '';
                        }
                    }}
                >
                    Post
                </button>
            </div>

            {/* Comments list */}
            <div className="space-y-2 max-h-40 overflow-y-auto">
                {comments.map(c => (
                    <div key={c.id} className="flex items-start gap-2">
                        <FaUserCircle className="text-xl text-gray-300 mt-1" />
                        <div>
                            <span className="font-semibold text-sm mr-2">{c.user}</span>
                            <span className="text-gray-700 text-sm">{c.text}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}