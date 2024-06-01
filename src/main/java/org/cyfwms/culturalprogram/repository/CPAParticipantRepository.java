package org.cyfwms.culturalprogram.repository;

import java.util.List;
import org.cyfwms.culturalprogram.entity.CPAParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CPAParticipantRepository extends JpaRepository<CPAParticipant, Long> {
	@Query(
		value = "select * from participantculturalprogram  where participantculturalprogid=? AND status='ACTIVE'",
		nativeQuery = true
	)
	CPAParticipant findByCulturalProgramId(Long culturalProgramId);
}
