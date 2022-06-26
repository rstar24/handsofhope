package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.ParticipantContactDto;
import com.twn.cyfwms.participant.dto.ParticipantIdentityDto;

public interface ParticipantService {
    ParticipantIdentityDto readParticipantIdentity(Long participantId);
    ParticipantIdentityDto saveParticipantIdentity(ParticipantIdentityDto participantRequestDto);
}
