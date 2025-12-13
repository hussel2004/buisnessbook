package com.businessdirectory.repository;

import com.businessdirectory.model.Business;
import com.businessdirectory.model.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, Long> {
    List<Promotion> findByBusiness(Business business);
    List<Promotion> findByBusinessAndIsActiveTrue(Business business);

    @Query("SELECT p FROM Promotion p WHERE p.business = :business AND p.isActive = true AND " +
           "(p.expiryDate IS NULL OR p.expiryDate > :now)")
    List<Promotion> findActivePromotionsByBusiness(Business business, LocalDateTime now);

    @Query("SELECT p FROM Promotion p WHERE p.isActive = true AND " +
           "(p.expiryDate IS NULL OR p.expiryDate > :now)")
    List<Promotion> findAllActivePromotions(LocalDateTime now);
}
