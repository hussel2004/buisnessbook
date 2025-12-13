package com.businessdirectory.service;

import com.businessdirectory.dto.BusinessRequest;
import com.businessdirectory.model.Business;
import com.businessdirectory.model.User;
import com.businessdirectory.repository.BusinessRepository;
import com.businessdirectory.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BusinessService {

    private final BusinessRepository businessRepository;
    private final UserRepository userRepository;

    public Page<Business> getAllBusinesses(Pageable pageable) {
        return businessRepository.findByIsActiveTrue(pageable);
    }

    public Business getBusinessById(Long id) {
        return businessRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Business not found"));
    }

    public Business getBusinessBySlug(String slug) {
        Business business = businessRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Business not found"));

        // Increment view count
        business.setViewCount(business.getViewCount() + 1);
        businessRepository.save(business);

        return business;
    }

    public Page<Business> searchBusinesses(String keyword, Pageable pageable) {
        return businessRepository.searchBusinesses(keyword, pageable);
    }

    public Page<Business> searchByNameAndLocation(String name, String location, Pageable pageable) {
        return businessRepository.searchByNameAndLocation(name, location, pageable);
    }

    public Page<Business> getBusinessesByCategory(String category, Pageable pageable) {
        return businessRepository.findByCategory(category, pageable);
    }

    public Page<Business> getMostPopularBusinesses(Pageable pageable) {
        return businessRepository.findMostPopular(pageable);
    }

    public List<Business> getBusinessesByOwner(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return businessRepository.findByCreatedBy(user);
    }

    @Transactional
    public Business createBusiness(BusinessRequest request, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String slug = generateUniqueSlug(request.getName());

        Business business = Business.builder()
                .name(request.getName())
                .code(request.getCode())
                .shortName(request.getShortName())
                .longName(request.getLongName())
                .slug(slug)
                .description(request.getDescription())
                .service(request.getService())
                .businessActorId(request.getBusinessActorId())
                .isIndividualBusiness(request.getIsIndividualBusiness() != null ? request.getIsIndividualBusiness() : false)
                .address(request.getAddress())
                .phone(request.getPhone())
                .website(request.getWebsite())
                .email(request.getEmail())
                .category(request.getCategory())
                .yearFounded(request.getYearFounded())
                .numberOfEmployees(request.getNumberOfEmployees())
                .status(request.getStatus())
                .logoUrl(request.getLogoUrl())
                .coverImageUrl(request.getCoverImageUrl())
                .hoursOfOperation(request.getHoursOfOperation())
                .createdBy(user)
                .isActive(true)
                .viewCount(0L)
                .averageRating(0.0)
                .build();

        return businessRepository.save(business);
    }

    @Transactional
    public Business updateBusiness(Long id, BusinessRequest request, String email) {
        Business business = businessRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Business not found"));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!business.getCreatedBy().getId().equals(user.getId())) {
            throw new RuntimeException("You don't have permission to update this business");
        }

        business.setName(request.getName());
        business.setCode(request.getCode());
        business.setShortName(request.getShortName());
        business.setLongName(request.getLongName());
        business.setDescription(request.getDescription());
        business.setService(request.getService());
        business.setBusinessActorId(request.getBusinessActorId());
        if (request.getIsIndividualBusiness() != null) {
            business.setIsIndividualBusiness(request.getIsIndividualBusiness());
        }
        business.setAddress(request.getAddress());
        business.setPhone(request.getPhone());
        business.setWebsite(request.getWebsite());
        business.setEmail(request.getEmail());
        business.setCategory(request.getCategory());
        business.setYearFounded(request.getYearFounded());
        business.setNumberOfEmployees(request.getNumberOfEmployees());
        business.setStatus(request.getStatus());
        business.setLogoUrl(request.getLogoUrl());
        business.setCoverImageUrl(request.getCoverImageUrl());
        business.setHoursOfOperation(request.getHoursOfOperation());

        return businessRepository.save(business);
    }

    @Transactional
    public void deleteBusiness(Long id, String email) {
        Business business = businessRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Business not found"));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!business.getCreatedBy().getId().equals(user.getId())) {
            throw new RuntimeException("You don't have permission to delete this business");
        }

        business.setIsActive(false);
        businessRepository.save(business);
    }

    private String generateUniqueSlug(String name) {
        String baseSlug = name.toLowerCase()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-")
                .replaceAll("-+", "-");

        String slug = baseSlug;
        int counter = 1;

        while (businessRepository.existsBySlug(slug)) {
            slug = baseSlug + "-" + counter;
            counter++;
        }

        return slug;
    }
}
