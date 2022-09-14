package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.ParticipantIdentityDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ParticipantService {
    ParticipantIdentityDto readParticipantIdentity(Long participantId);
    ParticipantIdentityDto saveParticipantIdentity(ParticipantIdentityDto participantIdentityDto);
    ResponseEntity<String> removeParticipant(Long referenceId);
}
