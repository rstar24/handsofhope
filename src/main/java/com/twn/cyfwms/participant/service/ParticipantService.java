package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.ParticipantIdentityDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

public interface ParticipantService {
    ParticipantIdentityDto readParticipantIdentity(Long participantId);
    ParticipantIdentityDto saveParticipantIdentity(Map<String,String> params, MultipartFile multipartFile) throws IOException;
    ResponseEntity<String> removeParticipant(Long referenceId);
}
