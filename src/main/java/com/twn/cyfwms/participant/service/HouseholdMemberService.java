package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.HouseholdMemberDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface HouseholdMemberService {
    List<HouseholdMemberDto> getAllHouseholdMembers(Long participantId);

    List<HouseholdMemberDto> saveAllHouseholdMembers(List<HouseholdMemberDto> HouseholdMemberDtoList);

    ResponseEntity removeHouseholdMembers(Long referenceId, Long recordNumber);


}
