package com.businessdirectory.repository;

import com.businessdirectory.model.Business;
import com.businessdirectory.model.Comment;
import com.businessdirectory.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByBusinessAndIsDeletedFalseOrderByCreatedAtDesc(Business business);
    Page<Comment> findByBusinessAndIsDeletedFalse(Business business, Pageable pageable);
    List<Comment> findByPostAndIsDeletedFalseOrderByCreatedAtDesc(Post post);
    Page<Comment> findByPostAndIsDeletedFalse(Post post, Pageable pageable);

    @Query("SELECT COUNT(c) FROM Comment c WHERE c.business = :business AND c.isDeleted = false")
    long countByBusiness(Business business);

    @Query("SELECT COUNT(c) FROM Comment c WHERE c.post = :post AND c.isDeleted = false")
    long countByPost(Post post);
}
