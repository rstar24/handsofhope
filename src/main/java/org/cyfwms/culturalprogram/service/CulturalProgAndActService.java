package org.cyfwms.culturalprogram.service;

import org.cyfwms.culturalprogram.dto.CulturalProgAndActDto;
public interface CulturalProgAndActService {
    CulturalProgAndActDto saveCulturalProgramIdentity(CulturalProgAndActDto culturalProgAndActDto);
    CulturalProgAndActDto readCulturalProgAndAct(Long culturalProgramId);
    void removeCulturalProgAndAct(Long culturalProgramId);
}
