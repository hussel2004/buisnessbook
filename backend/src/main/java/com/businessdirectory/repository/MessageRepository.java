package com.businessdirectory.repository;

import com.businessdirectory.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByBusinessIdOrderByCreatedAtDesc(Long businessId);
    List<Message> findBySenderIdOrderByCreatedAtDesc(Long senderId);
    Long countByBusinessIdAndIsReadFalse(Long businessId);
}
