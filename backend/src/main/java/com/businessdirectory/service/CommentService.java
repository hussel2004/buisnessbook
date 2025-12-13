package com.businessdirectory.service;

import com.businessdirectory.dto.CommentRequest;
import com.businessdirectory.model.Business;
import com.businessdirectory.model.Comment;
import com.businessdirectory.model.Post;
import com.businessdirectory.model.User;
import com.businessdirectory.repository.BusinessRepository;
import com.businessdirectory.repository.CommentRepository;
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
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final BusinessRepository businessRepository;
    private final PostRepository postRepository;

    public List<Comment> getCommentsByBusiness(Long businessId) {
        Business business = businessRepository.findById(businessId)
                .orElseThrow(() -> new RuntimeException("Business not found"));
        return commentRepository.findByBusinessAndIsDeletedFalseOrderByCreatedAtDesc(business);
    }

    public Page<Comment> getCommentsByBusiness(Long businessId, Pageable pageable) {
        Business business = businessRepository.findById(businessId)
                .orElseThrow(() -> new RuntimeException("Business not found"));
        return commentRepository.findByBusinessAndIsDeletedFalse(business, pageable);
    }

    public List<Comment> getCommentsByPost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        return commentRepository.findByPostAndIsDeletedFalseOrderByCreatedAtDesc(post);
    }

    @Transactional
    public Comment createComment(CommentRequest request, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Comment.CommentBuilder commentBuilder = Comment.builder()
                .content(request.getContent())
                .createdBy(user)
                .isDeleted(false);

        if (request.getBusinessId() != null) {
            Business business = businessRepository.findById(request.getBusinessId())
                    .orElseThrow(() -> new RuntimeException("Business not found"));
            commentBuilder.business(business);
        }

        if (request.getPostId() != null) {
            Post post = postRepository.findById(request.getPostId())
                    .orElseThrow(() -> new RuntimeException("Post not found"));
            commentBuilder.post(post);

            // Update post comments count
            post.setCommentsCount(post.getCommentsCount() + 1);
            postRepository.save(post);
        }

        return commentRepository.save(commentBuilder.build());
    }

    @Transactional
    public void deleteComment(Long id, String email) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!comment.getCreatedBy().getId().equals(user.getId())) {
            throw new RuntimeException("You don't have permission to delete this comment");
        }

        comment.setIsDeleted(true);
        commentRepository.save(comment);

        // Update post comments count if it's a post comment
        if (comment.getPost() != null) {
            Post post = comment.getPost();
            post.setCommentsCount(Math.max(0, post.getCommentsCount() - 1));
            postRepository.save(post);
        }
    }
}
