package com.twn.cyfwms.CulturalProgram.service;

import com.twn.cyfwms.CulturalProgram.entity.CulturalProgImage;
import com.twn.cyfwms.participant.entity.ParticipantImage;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface CulturalProgImageService {

    CulturalProgImage uploadImage(MultipartFile file, String culturalDto) throws IOException;
    CulturalProgImage getFile(Long id);

    ResponseEntity removeCulturalProgImage(Long culturalProgImageId);
}
