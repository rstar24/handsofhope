package org.cyfwms.participant.repository;

import java.util.Optional;
import org.cyfwms.participant.entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Long> {
	Optional<Participant> findTopByOrderByCreationDateTimeDesc();

	Optional<Participant> findByReferenceId(Long referenceId);
	Participant findByParticipantId(Long participantId);
}
