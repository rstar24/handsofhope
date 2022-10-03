package org.cyfwms.participant.repository;

import org.cyfwms.participant.entity.Employment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmploymentRepository extends JpaRepository<Employment, Long> {
    Employment findByParticipantId(Long participantId);
}
