package com.twn.cyfwms.CulturalProgram.repository;

import com.twn.cyfwms.CulturalProgram.entity.CulturalProgAndAct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CulturalProgramRepository extends JpaRepository<CulturalProgAndAct, Long> {
    CulturalProgAndAct findByCulturalProgramId(Long culturalProgramId);
    Optional<CulturalProgAndAct> findTopByOrderByReferenceIdDesc();
}
