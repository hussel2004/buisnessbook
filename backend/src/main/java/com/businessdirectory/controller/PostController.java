package com.businessdirectory.controller;

import com.businessdirectory.dto.PostRequest;
import com.businessdirectory.model.Post;
import com.businessdirectory.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @GetMapping("/business/{businessId}")
    public ResponseEntity<List<Post>> getPostsByBusiness(@PathVariable Long businessId) {
        return ResponseEntity.ok(postService.getPostsByBusiness(businessId));
    }

    @GetMapping("/recent")
    public ResponseEntity<Page<Post>> getRecentPosts(Pageable pageable) {
        return ResponseEntity.ok(postService.getRecentPosts(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        return ResponseEntity.ok(postService.getPostById(id));
    }

    @PostMapping
    public ResponseEntity<Post> createPost(
            @Valid @RequestBody PostRequest request,
            Authentication authentication
    ) {
        String email = authentication.getName();
        return ResponseEntity.ok(postService.createPost(request, email));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(
            @PathVariable Long id,
            @Valid @RequestBody PostRequest request,
            Authentication authentication
    ) {
        String email = authentication.getName();
        return ResponseEntity.ok(postService.updatePost(id, request, email));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(
            @PathVariable Long id,
            Authentication authentication
    ) {
        String email = authentication.getName();
        postService.deletePost(id, email);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<Map<String, String>> likePost(
            @PathVariable Long id,
            Authentication authentication
    ) {
        String email = authentication.getName();
        postService.likePost(id, email);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Post liked successfully");
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}/like")
    public ResponseEntity<Map<String, String>> unlikePost(
            @PathVariable Long id,
            Authentication authentication
    ) {
        String email = authentication.getName();
        postService.unlikePost(id, email);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Post unliked successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}/is-liked")
    public ResponseEntity<Map<String, Boolean>> isPostLiked(
            @PathVariable Long id,
            Authentication authentication
    ) {
        String email = authentication.getName();
        boolean isLiked = postService.isPostLikedByUser(id, email);
        Map<String, Boolean> response = new HashMap<>();
        response.put("isLiked", isLiked);
        return ResponseEntity.ok(response);
    }
}
