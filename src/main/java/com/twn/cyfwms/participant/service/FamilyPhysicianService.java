package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.FamilyPhysicianDto;
import com.twn.cyfwms.participant.dto.HouseholdMemberDto;

import java.util.List;

public interface FamilyPhysicianService {
    List<FamilyPhysicianDto> getAllFamilyPhysicians(Long participantId);
    List<FamilyPhysicianDto> saveAllFamilyPhysicians(List<FamilyPhysicianDto> FamilyPhysicianDtoList);


}
