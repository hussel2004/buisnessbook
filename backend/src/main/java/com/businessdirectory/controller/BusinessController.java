package com.businessdirectory.controller;

import com.businessdirectory.dto.BusinessRequest;
import com.businessdirectory.model.Business;
import com.businessdirectory.service.BusinessService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/businesses")
@RequiredArgsConstructor
public class BusinessController {

    private final BusinessService businessService;

    @GetMapping
    public ResponseEntity<Page<Business>> getAllBusinesses(Pageable pageable) {
        return ResponseEntity.ok(businessService.getAllBusinesses(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Business> getBusinessById(@PathVariable Long id) {
        return ResponseEntity.ok(businessService.getBusinessById(id));
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<Business> getBusinessBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(businessService.getBusinessBySlug(slug));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Business>> searchBusinesses(
            @RequestParam String keyword,
            Pageable pageable
    ) {
        return ResponseEntity.ok(businessService.searchBusinesses(keyword, pageable));
    }

    @GetMapping("/search/advanced")
    public ResponseEntity<Page<Business>> searchByNameAndLocation(
            @RequestParam(required = false, defaultValue = "") String name,
            @RequestParam(required = false, defaultValue = "") String location,
            Pageable pageable
    ) {
        return ResponseEntity.ok(businessService.searchByNameAndLocation(name, location, pageable));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<Page<Business>> getBusinessesByCategory(
            @PathVariable String category,
            Pageable pageable
    ) {
        return ResponseEntity.ok(businessService.getBusinessesByCategory(category, pageable));
    }

    @GetMapping("/popular")
    public ResponseEntity<Page<Business>> getMostPopularBusinesses(Pageable pageable) {
        return ResponseEntity.ok(businessService.getMostPopularBusinesses(pageable));
    }

    @GetMapping("/my-businesses")
    public ResponseEntity<List<Business>> getMyBusinesses(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(businessService.getBusinessesByOwner(email));
    }

    @PostMapping
    public ResponseEntity<Business> createBusiness(
            @Valid @RequestBody BusinessRequest request,
            Authentication authentication
    ) {
        String email = authentication.getName();
        return ResponseEntity.ok(businessService.createBusiness(request, email));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Business> updateBusiness(
            @PathVariable Long id,
            @Valid @RequestBody BusinessRequest request,
            Authentication authentication
    ) {
        String email = authentication.getName();
        return ResponseEntity.ok(businessService.updateBusiness(id, request, email));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBusiness(
            @PathVariable Long id,
            Authentication authentication
    ) {
        String email = authentication.getName();
        businessService.deleteBusiness(id, email);
        return ResponseEntity.noContent().build();
    }
}
