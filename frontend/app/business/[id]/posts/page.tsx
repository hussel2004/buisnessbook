'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { postAPI } from '@/lib/api'
import type { Post } from '@/types'
import PostCard from '@/components/PostCard'

export default function BusinessPostsPage() {
  const params = useParams()
  const businessId = Number(params.id)

  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await postAPI.getByBusiness(businessId)
        setPosts(data)
      } catch (error) {
        console.error('Error loading posts:', error)
      } finally {
        setLoading(false)
      }
    }

    if (businessId) {
      loadPosts()
    }
  }, [businessId])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 dark:border-primary-400"></div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-6 animate-fade-in">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">All Posts</h2>

      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No posts available yet.</p>
        </div>
      )}
    </div>
  )
}
