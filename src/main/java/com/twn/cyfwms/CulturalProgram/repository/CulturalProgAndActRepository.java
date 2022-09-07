package com.twn.cyfwms.CulturalProgram.repository;

import com.twn.cyfwms.CulturalProgram.entity.CulturalProgAndAct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CulturalProgAndActRepository extends JpaRepository<CulturalProgAndAct, Long> {
    Optional<CulturalProgAndAct> findTopByOrderByReferenceIdDesc();
    Optional<CulturalProgAndAct> findByCulturalProgramId(Long culturalProgramId);
}
