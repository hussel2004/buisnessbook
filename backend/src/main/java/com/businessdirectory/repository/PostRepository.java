package com.businessdirectory.repository;

import com.businessdirectory.model.Business;
import com.businessdirectory.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByBusinessAndIsPublishedTrue(Business business);
    Page<Post> findByBusinessAndIsPublishedTrue(Business business, Pageable pageable);
    Page<Post> findByIsPublishedTrueOrderByCreatedAtDesc(Pageable pageable);
    List<Post> findByBusiness(Business business);
}
