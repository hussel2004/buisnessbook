package com.businessdirectory.controller;

import com.businessdirectory.dto.PromotionRequest;
import com.businessdirectory.model.Promotion;
import com.businessdirectory.service.PromotionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/promotions")
@RequiredArgsConstructor
public class PromotionController {

    private final PromotionService promotionService;

    @GetMapping("/business/{businessId}")
    public ResponseEntity<List<Promotion>> getPromotionsByBusiness(@PathVariable Long businessId) {
        return ResponseEntity.ok(promotionService.getPromotionsByBusiness(businessId));
    }

    @GetMapping("/active")
    public ResponseEntity<List<Promotion>> getAllActivePromotions() {
        return ResponseEntity.ok(promotionService.getAllActivePromotions());
    }

    @PostMapping
    public ResponseEntity<Promotion> createPromotion(
            @Valid @RequestBody PromotionRequest request,
            Authentication authentication
    ) {
        String email = authentication.getName();
        return ResponseEntity.ok(promotionService.createPromotion(request, email));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Promotion> updatePromotion(
            @PathVariable Long id,
            @Valid @RequestBody PromotionRequest request,
            Authentication authentication
    ) {
        String email = authentication.getName();
        return ResponseEntity.ok(promotionService.updatePromotion(id, request, email));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePromotion(
            @PathVariable Long id,
            Authentication authentication
    ) {
        String email = authentication.getName();
        promotionService.deletePromotion(id, email);
        return ResponseEntity.noContent().build();
    }
}
