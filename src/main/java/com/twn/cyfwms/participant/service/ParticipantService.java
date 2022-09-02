package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.ParticipantIdentityDto;
import org.springframework.http.ResponseEntity;

public interface ParticipantService {
    ParticipantIdentityDto readParticipantIdentity(Long participantId);
    ParticipantIdentityDto saveParticipantIdentity(ParticipantIdentityDto participantRequestDto);
    ResponseEntity removeParticipant(Long referenceId);
}
