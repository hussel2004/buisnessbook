'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth'
import { commentAPI } from '@/lib/api'
import type { Comment } from '@/types'
import { MessageSquare, Send, Trash2, AlertCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface CommentsSidebarProps {
  businessId: number
  comments: Comment[]
  onCommentAdded: (comment: Comment) => void
}

export default function CommentsSidebar({
  businessId,
  comments,
  onCommentAdded,
}: CommentsSidebarProps) {
  const { isAuthenticated, user } = useAuth()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setLoading(true)
    setError('')

    try {
      const newComment = await commentAPI.create({
        content: content.trim(),
        businessId,
      })
      onCommentAdded(newComment)
      setContent('')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to post comment')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (commentId: number) => {
    if (!confirm('Are you sure you want to delete this comment?')) return

    try {
      await commentAPI.delete(commentId)
      window.location.reload()
    } catch (err: any) {
      alert('Failed to delete comment')
    }
  }

  return (
    <div className="w-full">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card overflow-hidden animate-fade-in">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 text-white px-6 py-4">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Comments ({comments.length})</h2>
          </div>
        </div>

        {/* Comment Form */}
        {isAuthenticated ? (
          <div className="p-4 border-b dark:border-gray-700">
            <form onSubmit={handleSubmit}>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write a comment..."
                rows={3}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 resize-none text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
              {error && (
                <div className="mt-2 flex items-center text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={loading || !content.trim()}
                className="mt-2 w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 dark:bg-primary-700 text-white rounded-md hover:bg-primary-700 dark:hover:bg-primary-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-sm font-medium"
              >
                <Send className="h-4 w-4" />
                <span>{loading ? 'Posting...' : 'Post Comment'}</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="p-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              <a href="/auth/login" className="text-primary-600 dark:text-primary-400 hover:underline font-medium">
                Sign in
              </a>{' '}
              to leave a comment
            </p>
          </div>
        )}

        {/* Comments List */}
        <div className="max-h-96 overflow-y-auto">
          {comments.length > 0 ? (
            <div className="divide-y dark:divide-gray-700">
              {comments.map((comment) => (
                <div key={comment.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {comment.createdBy.email?.split('@')[0] || 'Anonymous'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                    {user?.id === comment.createdBy.id && (
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 p-1"
                        title="Delete comment"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{comment.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <MessageSquare className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">No comments yet</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Be the first to comment!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
