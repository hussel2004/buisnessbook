package com.businessdirectory.controller;

import com.businessdirectory.dto.CommentRequest;
import com.businessdirectory.model.Comment;
import com.businessdirectory.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @GetMapping("/business/{businessId}")
    public ResponseEntity<List<Comment>> getCommentsByBusiness(@PathVariable Long businessId) {
        return ResponseEntity.ok(commentService.getCommentsByBusiness(businessId));
    }

    @GetMapping("/business/{businessId}/paginated")
    public ResponseEntity<Page<Comment>> getCommentsByBusinessPaginated(
            @PathVariable Long businessId,
            Pageable pageable
    ) {
        return ResponseEntity.ok(commentService.getCommentsByBusiness(businessId, pageable));
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<Comment>> getCommentsByPost(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getCommentsByPost(postId));
    }

    @PostMapping
    public ResponseEntity<Comment> createComment(
            @Valid @RequestBody CommentRequest request,
            Authentication authentication
    ) {
        String email = authentication.getName();
        return ResponseEntity.ok(commentService.createComment(request, email));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable Long id,
            Authentication authentication
    ) {
        String email = authentication.getName();
        commentService.deleteComment(id, email);
        return ResponseEntity.noContent().build();
    }
}
