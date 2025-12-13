package com.businessdirectory.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostRequest {
    @NotBlank(message = "Post title is required")
    private String title;

    @NotBlank(message = "Post content is required")
    private String content;

    private String imageUrl;
    private Long businessId;
    private Boolean isPublished = true;
}
