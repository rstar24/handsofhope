package com.twn.cyfwms.participant.service;

import org.springframework.http.ResponseEntity;

import com.twn.cyfwms.participant.dto.ParticipantIdentityDto;

public interface ParticipantService {
    ParticipantIdentityDto readParticipantIdentity(Long participantId);
    ParticipantIdentityDto saveParticipantIdentity(ParticipantIdentityDto participantRequestDto);
    ResponseEntity<String> removeParticipant(Long referenceId);
}
