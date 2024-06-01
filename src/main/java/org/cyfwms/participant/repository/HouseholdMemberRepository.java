package org.cyfwms.participant.repository;

import java.util.List;
import org.cyfwms.participant.entity.HouseholdMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface HouseholdMemberRepository extends JpaRepository<HouseholdMember, Long> {
	@Query(
		value = "select * from householdmember where participantId=? AND status='ACTIVE'",
		nativeQuery = true
	)
	List<HouseholdMember> findByParticipantId(Long participantId);

	@Query(
		value = "select * from householdmember where householdMemberId=? AND status='ACTIVE'",
		nativeQuery = true
	)
	List<HouseholdMember> findByHouseholdMemberId(Long householdMemberId);
}
