package com.twn.cyfwms.CulturalProgram.service;
import com.twn.cyfwms.CulturalProgram.dto.ParticipantCulturalProgDto;
import org.springframework.http.ResponseEntity;
public interface ParticipantCulturalProgService {
    ParticipantCulturalProgDto saveParticipantCulturalProg(ParticipantCulturalProgDto participantCulturalProgDto);
    ParticipantCulturalProgDto readParticipantCulturalAndAct(Long participantCulturalProId);
    ResponseEntity removeParticipantCulturalProg(Long participantCulturalProId);
}
