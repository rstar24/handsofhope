package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.ParticipantIdentityDto;
import com.twn.cyfwms.participant.entity.Participant;
import com.twn.cyfwms.participant.entity.ParticipantImage;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageService {
//    ParticipantImage uploadImage(MultipartFile file,String participantId) throws IOException;

    ParticipantImage getFile(Long id);}

