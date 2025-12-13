'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth'
import { postAPI, commentAPI } from '@/lib/api'
import type { Post, Comment } from '@/types'
import { Heart, MessageCircle, Send } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const { isAuthenticated } = useAuth()
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(post.likesCount)
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [commentContent, setCommentContent] = useState('')

  useEffect(() => {
    if (isAuthenticated) {
      checkIfLiked()
    }
  }, [post.id, isAuthenticated])

  const checkIfLiked = async () => {
    try {
      const response = await postAPI.isLiked(post.id)
      setIsLiked(response.isLiked)
    } catch (error) {
      console.error('Error checking like status:', error)
    }
  }

  const handleLike = async () => {
    if (!isAuthenticated) {
      alert('Please sign in to like posts')
      return
    }

    try {
      if (isLiked) {
        await postAPI.unlike(post.id)
        setIsLiked(false)
        setLikesCount(likesCount - 1)
      } else {
        await postAPI.like(post.id)
        setIsLiked(true)
        setLikesCount(likesCount + 1)
      }
    } catch (error: any) {
      console.error('Error toggling like:', error)
    }
  }

  const loadComments = async () => {
    if (showComments) {
      setShowComments(false)
    } else {
      try {
        const data = await commentAPI.getByPost(post.id)
        setComments(data)
        setShowComments(true)
      } catch (error) {
        console.error('Error loading comments:', error)
      }
    }
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentContent.trim() || !isAuthenticated) return

    try {
      const newComment = await commentAPI.create({
        content: commentContent.trim(),
        postId: post.id,
      })
      setComments([newComment, ...comments])
      setCommentContent('')
    } catch (error) {
      console.error('Error posting comment:', error)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-primary-100/50 dark:border-gray-700 rounded-lg p-4 shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in">
      <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{post.title}</h4>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 whitespace-pre-wrap">{post.content}</p>

      {post.imageUrl && (
        <div className="mb-3 rounded-lg overflow-hidden">
          <img src={post.imageUrl} alt={post.title} className="w-full h-auto" />
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
        <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 transition-all duration-200 hover:scale-110 ${
              isLiked ? 'text-red-500 dark:text-red-400' : 'hover:text-red-500 dark:hover:text-red-400'
            }`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            <span>{likesCount}</span>
          </button>
          <button
            onClick={loadComments}
            className="flex items-center space-x-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            <span>{post.commentsCount}</span>
          </button>
        </div>
      </div>

      {showComments && (
        <div className="mt-4 border-t dark:border-gray-700 pt-4 space-y-3 animate-slide-up">
          {isAuthenticated && (
            <form onSubmit={handleCommentSubmit} className="flex space-x-2">
              <input
                type="text"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md text-sm focus:outline-none focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/50 transition-all duration-200"
              />
              <button
                type="submit"
                disabled={!commentContent.trim()}
                className="px-3 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-md hover:from-primary-700 hover:to-primary-800 disabled:bg-gray-400 dark:disabled:bg-gray-600 transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}

          <div className="space-y-2">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded text-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {comment.createdBy.email?.split('@')[0]}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
