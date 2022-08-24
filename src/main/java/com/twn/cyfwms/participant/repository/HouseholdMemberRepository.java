package com.twn.cyfwms.participant.repository;

import com.twn.cyfwms.participant.entity.HouseholdMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HouseholdMemberRepository extends JpaRepository<HouseholdMember, Long> {
    @Query(value = "select * from householdmember where participantId=? AND status='ACTIVE'",nativeQuery = true)
    List<HouseholdMember> findByParticipantId(Long participantId);
}
