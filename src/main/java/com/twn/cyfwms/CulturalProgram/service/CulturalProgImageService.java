package com.twn.cyfwms.CulturalProgram.service;

import com.twn.cyfwms.CulturalProgram.dto.CulturalProgImageDto;
import com.twn.cyfwms.CulturalProgram.entity.CulturalProgImage;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CulturalProgImageService {

    CulturalProgImage uploadImage(MultipartFile file, String culturalDto) throws IOException;
    CulturalProgImage getFile(Long id);

    ResponseEntity removeCulturalProgImage(Long culturalProgImageId);

    List<CulturalProgImageDto> getAllFiles(Long culturalProgramId);

}
