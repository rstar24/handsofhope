package com.twn.cyfwms.CulturalProgram.repository;

import com.twn.cyfwms.CulturalProgram.entity.ParticipantCulturalProgAndAct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface ParticipantCulturalProgRepository extends JpaRepository<ParticipantCulturalProgAndAct,Long> {
    ParticipantCulturalProgAndAct findByparticipantCulturalProId(Long participantCulturalProId);
}
