package com.businessdirectory.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PromotionRequest {
    @NotBlank(message = "Promotion title is required")
    private String title;

    private String description;
    private Double discountPercentage;
    private String promoCode;
    private LocalDateTime expiryDate;
    private Boolean isActive = true;
    private Long businessId;
}
