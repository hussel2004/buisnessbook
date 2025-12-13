package com.businessdirectory.service;

import com.businessdirectory.dto.PromotionRequest;
import com.businessdirectory.model.Business;
import com.businessdirectory.model.Promotion;
import com.businessdirectory.model.User;
import com.businessdirectory.repository.BusinessRepository;
import com.businessdirectory.repository.PromotionRepository;
import com.businessdirectory.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PromotionService {

    private final PromotionRepository promotionRepository;
    private final BusinessRepository businessRepository;
    private final UserRepository userRepository;

    public List<Promotion> getPromotionsByBusiness(Long businessId) {
        Business business = businessRepository.findById(businessId)
                .orElseThrow(() -> new RuntimeException("Business not found"));
        return promotionRepository.findActivePromotionsByBusiness(business, LocalDateTime.now());
    }

    public List<Promotion> getAllActivePromotions() {
        return promotionRepository.findAllActivePromotions(LocalDateTime.now());
    }

    @Transactional
    public Promotion createPromotion(PromotionRequest request, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Business business = businessRepository.findById(request.getBusinessId())
                .orElseThrow(() -> new RuntimeException("Business not found"));

        if (!business.getCreatedBy().getId().equals(user.getId())) {
            throw new RuntimeException("You don't have permission to create promotions for this business");
        }

        Promotion promotion = Promotion.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .discountPercentage(request.getDiscountPercentage())
                .promoCode(request.getPromoCode())
                .expiryDate(request.getExpiryDate())
                .isActive(request.getIsActive())
                .business(business)
                .build();

        return promotionRepository.save(promotion);
    }

    @Transactional
    public Promotion updatePromotion(Long id, PromotionRequest request, String email) {
        Promotion promotion = promotionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Promotion not found"));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!promotion.getBusiness().getCreatedBy().getId().equals(user.getId())) {
            throw new RuntimeException("You don't have permission to update this promotion");
        }

        promotion.setTitle(request.getTitle());
        promotion.setDescription(request.getDescription());
        promotion.setDiscountPercentage(request.getDiscountPercentage());
        promotion.setPromoCode(request.getPromoCode());
        promotion.setExpiryDate(request.getExpiryDate());
        promotion.setIsActive(request.getIsActive());

        return promotionRepository.save(promotion);
    }

    @Transactional
    public void deletePromotion(Long id, String email) {
        Promotion promotion = promotionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Promotion not found"));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!promotion.getBusiness().getCreatedBy().getId().equals(user.getId())) {
            throw new RuntimeException("You don't have permission to delete this promotion");
        }

        promotionRepository.delete(promotion);
    }
}
