package com.businessdirectory.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BusinessRequest {
    @NotBlank(message = "Business name is required")
    private String name;

    private String code;
    private String shortName;
    private String longName;
    private String description;
    private String service;
    private String businessActorId;
    private Boolean isIndividualBusiness;
    private String address;
    private String phone;
    private String website;
    private String email;
    private String category;
    private Integer yearFounded;
    private Integer numberOfEmployees;
    private String status;
    private String logoUrl;
    private String coverImageUrl;
    private Map<String, String> hoursOfOperation;
}
