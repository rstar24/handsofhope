package org.cyfwms.participant.service;

import java.util.List;
import org.cyfwms.participant.dto.HouseholdMemberDto;
import org.springframework.http.ResponseEntity;

public interface HouseholdMemberService {
	List<HouseholdMemberDto> getAllHouseholdMembers(Long participantId);
	List<HouseholdMemberDto> saveAllHouseholdMembers(
		List<HouseholdMemberDto> HouseholdMemberDtoList
	);
	void removeHouseholdMembers(Long householdMemberId);
}
