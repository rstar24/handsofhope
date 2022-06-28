package com.twn.cyfwms.participant.repository;

import com.twn.cyfwms.participant.entity.FamilyPhysician;
import com.twn.cyfwms.participant.entity.HouseholdMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FamilyPhysicianRepository extends JpaRepository<FamilyPhysician, Long> {
    List<FamilyPhysician> findByParticipantId(Long participantId);
}
