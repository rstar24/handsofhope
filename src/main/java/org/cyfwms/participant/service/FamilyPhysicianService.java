package org.cyfwms.participant.service;

import java.util.List;
import org.cyfwms.participant.dto.FamilyPhysicianDto;
import org.springframework.http.ResponseEntity;

public interface FamilyPhysicianService {
	List<FamilyPhysicianDto> getAllFamilyPhysicians(Long participantId);
	List<FamilyPhysicianDto> saveAllFamilyPhysicians(
		List<FamilyPhysicianDto> FamilyPhysicianDtoList
	);
	void removeFamilyPhysician(Long familyPhysicianId);
}
