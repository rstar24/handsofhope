package com.twn.cyfwms.CulturalProgram.service;

import com.twn.cyfwms.CulturalProgram.dto.CulturalProgAndActDto;

public interface CulturalProgAndActService {
    CulturalProgAndActDto saveCulturalProgramIdentity(CulturalProgAndActDto culturalProgAndActDto);
    CulturalProgAndActDto readCulturalProgAndAct(Long culturalProgramId);
}
