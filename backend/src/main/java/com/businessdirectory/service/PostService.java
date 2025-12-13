package com.businessdirectory.service;

import com.businessdirectory.dto.PostRequest;
import com.businessdirectory.model.Business;
import com.businessdirectory.model.Post;
import com.businessdirectory.model.PostLike;
import com.businessdirectory.model.User;
import com.businessdirectory.repository.BusinessRepository;
import com.businessdirectory.repository.PostLikeRepository;
import com.businessdirectory.repository.PostRepository;
import com.businessdirectory.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final BusinessRepository businessRepository;
    private final UserRepository userRepository;
    private final PostLikeRepository postLikeRepository;

    public List<Post> getPostsByBusiness(Long businessId) {
        Business business = businessRepository.findById(businessId)
                .orElseThrow(() -> new RuntimeException("Business not found"));
        return postRepository.findByBusinessAndIsPublishedTrue(business);
    }

    public Page<Post> getRecentPosts(Pageable pageable) {
        return postRepository.findByIsPublishedTrueOrderByCreatedAtDesc(pageable);
    }

    public Post getPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
    }

    @Transactional
    public Post createPost(PostRequest request, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Business business = businessRepository.findById(request.getBusinessId())
                .orElseThrow(() -> new RuntimeException("Business not found"));

        if (!business.getCreatedBy().getId().equals(user.getId())) {
            throw new RuntimeException("You don't have permission to create posts for this business");
        }

        Post post = Post.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .imageUrl(request.getImageUrl())
                .business(business)
                .isPublished(request.getIsPublished())
                .likesCount(0L)
                .commentsCount(0L)
                .build();

        return postRepository.save(post);
    }

    @Transactional
    public Post updatePost(Long id, PostRequest request, String email) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!post.getBusiness().getCreatedBy().getId().equals(user.getId())) {
            throw new RuntimeException("You don't have permission to update this post");
        }

        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setImageUrl(request.getImageUrl());
        if (request.getIsPublished() != null) {
            post.setIsPublished(request.getIsPublished());
        }

        return postRepository.save(post);
    }

    @Transactional
    public void deletePost(Long id, String email) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!post.getBusiness().getCreatedBy().getId().equals(user.getId())) {
            throw new RuntimeException("You don't have permission to delete this post");
        }

        postRepository.delete(post);
    }

    @Transactional
    public void likePost(Long postId, String email) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (postLikeRepository.existsByPostAndUser(post, user)) {
            throw new RuntimeException("You already liked this post");
        }

        PostLike like = PostLike.builder()
                .post(post)
                .user(user)
                .build();

        postLikeRepository.save(like);

        post.setLikesCount(post.getLikesCount() + 1);
        postRepository.save(post);
    }

    @Transactional
    public void unlikePost(Long postId, String email) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        PostLike like = postLikeRepository.findByPostAndUser(post, user)
                .orElseThrow(() -> new RuntimeException("You haven't liked this post"));

        postLikeRepository.delete(like);

        post.setLikesCount(Math.max(0, post.getLikesCount() - 1));
        postRepository.save(post);
    }

    public boolean isPostLikedByUser(Long postId, String email) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return postLikeRepository.existsByPostAndUser(post, user);
    }
}
