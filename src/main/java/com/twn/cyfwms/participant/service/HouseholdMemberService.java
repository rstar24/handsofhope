package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.HouseholdMemberDto;

import java.util.List;

public interface HouseholdMemberService {
    List<HouseholdMemberDto> getAllHouseholdMembers(Long participantId);

    List<HouseholdMemberDto> saveAllHouseholdMembers(List<HouseholdMemberDto> HouseholdMemberDtoList);
}
