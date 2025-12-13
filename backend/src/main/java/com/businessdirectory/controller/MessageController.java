package com.businessdirectory.controller;

import com.businessdirectory.model.Business;
import com.businessdirectory.model.Message;
import com.businessdirectory.model.User;
import com.businessdirectory.repository.BusinessRepository;
import com.businessdirectory.repository.MessageRepository;
import com.businessdirectory.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MessageController {

    private final MessageRepository messageRepository;
    private final BusinessRepository businessRepository;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> createMessage(@Valid @RequestBody Map<String, Object> payload, Authentication authentication) {
        try {
            Long businessId = Long.valueOf(payload.get("businessId").toString());
            String subject = payload.get("subject").toString();
            String content = payload.get("content").toString();

            Business business = businessRepository.findById(businessId)
                    .orElseThrow(() -> new RuntimeException("Business not found"));

            String userEmail = authentication.getName();
            User sender = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            String senderName = "";
            if (sender.getFirstName() != null || sender.getLastName() != null) {
                senderName = (sender.getFirstName() != null ? sender.getFirstName() + " " : "") +
                            (sender.getLastName() != null ? sender.getLastName() : "");
                senderName = senderName.trim();
            }

            Message message = Message.builder()
                    .business(business)
                    .sender(sender)
                    .senderName(senderName.isEmpty() ? sender.getEmail() : senderName)
                    .senderEmail(sender.getEmail())
                    .subject(subject)
                    .content(content)
                    .isRead(false)
                    .build();

            Message savedMessage = messageRepository.save(message);
            return ResponseEntity.ok(savedMessage);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/business/{businessId}")
    public ResponseEntity<List<Message>> getBusinessMessages(@PathVariable Long businessId, Authentication authentication) {
        // Verify the authenticated user owns this business
        String userEmail = authentication.getName();
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Business business = businessRepository.findById(businessId)
                .orElseThrow(() -> new RuntimeException("Business not found"));

        if (!business.getCreatedBy().getId().equals(user.getId())) {
            return ResponseEntity.status(403).build();
        }

        List<Message> messages = messageRepository.findByBusinessIdOrderByCreatedAtDesc(businessId);
        return ResponseEntity.ok(messages);
    }

    @GetMapping("/sent")
    public ResponseEntity<List<Message>> getSentMessages(Authentication authentication) {
        String userEmail = authentication.getName();
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Message> messages = messageRepository.findBySenderIdOrderByCreatedAtDesc(user.getId());
        return ResponseEntity.ok(messages);
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<?> markAsRead(@PathVariable Long id, Authentication authentication) {
        Message message = messageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Message not found"));

        // Verify the authenticated user owns the business
        String userEmail = authentication.getName();
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!message.getBusiness().getCreatedBy().getId().equals(user.getId())) {
            return ResponseEntity.status(403).body(Map.of("message", "Unauthorized"));
        }

        message.setIsRead(true);
        messageRepository.save(message);
        return ResponseEntity.ok(message);
    }

    @GetMapping("/business/{businessId}/unread-count")
    public ResponseEntity<Map<String, Long>> getUnreadCount(@PathVariable Long businessId, Authentication authentication) {
        // Verify the authenticated user owns this business
        String userEmail = authentication.getName();
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Business business = businessRepository.findById(businessId)
                .orElseThrow(() -> new RuntimeException("Business not found"));

        if (!business.getCreatedBy().getId().equals(user.getId())) {
            return ResponseEntity.status(403).build();
        }

        Long count = messageRepository.countByBusinessIdAndIsReadFalse(businessId);
        return ResponseEntity.ok(Map.of("count", count));
    }
}
