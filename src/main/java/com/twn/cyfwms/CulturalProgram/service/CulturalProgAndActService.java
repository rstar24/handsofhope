package com.twn.cyfwms.CulturalProgram.service;

import com.twn.cyfwms.CulturalProgram.dto.CulturalProgAndActDto;
import org.springframework.http.ResponseEntity;
public interface CulturalProgAndActService {
    CulturalProgAndActDto saveCulturalProgramIdentity(CulturalProgAndActDto culturalProgAndActDto);
    CulturalProgAndActDto readCulturalProgAndAct(Long culturalProgramId);
    ResponseEntity removeCulturalProgAndAct(Long culturalProgramId);
}
