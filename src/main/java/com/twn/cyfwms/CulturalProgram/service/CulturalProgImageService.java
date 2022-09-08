package com.twn.cyfwms.CulturalProgram.service;

import com.twn.cyfwms.CulturalProgram.entity.CulturalProgImage;
import com.twn.cyfwms.participant.entity.ParticipantImage;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface CulturalProgImageService {

    CulturalProgImage uploadImage(MultipartFile file, String culturalProgImageId) throws IOException;
    CulturalProgImage getFile(Long id);
}
