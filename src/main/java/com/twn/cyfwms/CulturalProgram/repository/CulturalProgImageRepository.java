package com.twn.cyfwms.CulturalProgram.repository;

import com.twn.cyfwms.CulturalProgram.entity.CulturalProgImage;
import com.twn.cyfwms.participant.entity.ParticipantImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CulturalProgImageRepository extends JpaRepository<CulturalProgImage, Long> {
    @Query(value = "select * from culturalimage c where c.culturalprogramid=? AND c.status='ACTIVE'",nativeQuery = true)
    Optional<CulturalProgImage> findByCulturalProgramId(Long id);

}
