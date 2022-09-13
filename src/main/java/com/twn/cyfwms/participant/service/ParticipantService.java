package com.twn.cyfwms.participant.service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import com.twn.cyfwms.participant.dto.ParticipantIdentityDto;

public interface ParticipantService {
    ParticipantIdentityDto readParticipantIdentity(Long participantId);
    ParticipantIdentityDto saveParticipantIdentity(String participantIdentityDto, MultipartFile file) throws IOException;
    ResponseEntity<String> removeParticipant(Long referenceId);
}
