package org.cyfwms.culturalprogram.service;
import org.cyfwms.culturalprogram.dto.ParticipantCulturalProgDto;
import org.springframework.http.ResponseEntity;
public interface ParticipantCulturalProgService {
    ParticipantCulturalProgDto saveParticipantCulturalProg(ParticipantCulturalProgDto participantCulturalProgDto);
    ParticipantCulturalProgDto readParticipantCulturalAndAct(Long participantCulturalProId);
    ResponseEntity removeParticipantCulturalProg(Long participantCulturalProId);
}
