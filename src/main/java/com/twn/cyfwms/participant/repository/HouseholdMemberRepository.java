package com.twn.cyfwms.participant.repository;

import com.twn.cyfwms.participant.entity.HouseholdMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HouseholdMemberRepository extends JpaRepository<HouseholdMember, Long> {
}
