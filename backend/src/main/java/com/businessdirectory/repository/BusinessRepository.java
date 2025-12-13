package com.businessdirectory.repository;

import com.businessdirectory.model.Business;
import com.businessdirectory.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BusinessRepository extends JpaRepository<Business, Long> {
    Optional<Business> findBySlug(String slug);
    boolean existsBySlug(String slug);
    List<Business> findByCreatedBy(User user);
    Page<Business> findByIsActiveTrue(Pageable pageable);

    @Query("SELECT b FROM Business b WHERE b.isActive = true AND " +
           "(LOWER(b.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(b.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(b.category) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Business> searchBusinesses(@Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT b FROM Business b WHERE b.isActive = true AND " +
           "(:name IS NULL OR :name = '' OR LOWER(b.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
           "(:location IS NULL OR :location = '' OR LOWER(b.address) LIKE LOWER(CONCAT('%', :location, '%')))")
    Page<Business> searchByNameAndLocation(@Param("name") String name, @Param("location") String location, Pageable pageable);

    @Query("SELECT b FROM Business b WHERE b.isActive = true AND LOWER(b.category) = LOWER(:category)")
    Page<Business> findByCategory(@Param("category") String category, Pageable pageable);

    @Query("SELECT b FROM Business b WHERE b.isActive = true ORDER BY b.viewCount DESC")
    Page<Business> findMostPopular(Pageable pageable);
}
