package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.FamilyPhysicianDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface FamilyPhysicianService {
    List<FamilyPhysicianDto> getAllFamilyPhysicians(Long participantId);
    List<FamilyPhysicianDto> saveAllFamilyPhysicians(List<FamilyPhysicianDto> FamilyPhysicianDtoList);

    ResponseEntity removeFamilyPhysician(Long referenceId, Long recordNumber);
}
