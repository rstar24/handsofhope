package com.twn.cyfwms.CulturalProgram.service;
import com.twn.cyfwms.CulturalProgram.dto.ParticipantCulturalProgDto;
public interface ParticipantCulturalProgService {
    ParticipantCulturalProgDto saveParticipantCulturalProg(ParticipantCulturalProgDto participantCulturalProgDto);
    ParticipantCulturalProgDto readParticipantCulturalAndAct(Long participantCulturalProId);
}
