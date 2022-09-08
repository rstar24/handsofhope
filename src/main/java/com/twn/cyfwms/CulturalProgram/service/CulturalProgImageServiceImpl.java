package com.twn.cyfwms.CulturalProgram.service;

import com.twn.cyfwms.CulturalProgram.entity.CulturalProgImage;
import com.twn.cyfwms.CulturalProgram.repository.CulturalProgImageRepository;
import com.twn.cyfwms.participant.entity.ParticipantImage;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
@Service
@AllArgsConstructor
public class CulturalProgImageServiceImpl implements CulturalProgImageService{
    @Autowired
    CulturalProgImageRepository culturalProgImageRepository;

    @Override
    public CulturalProgImage uploadImage(MultipartFile file, String culturalProgImageId) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
//        ParticipantImage ParticipantImage = new ParticipantImage(fileName, file.getContentType(), file.getBytes());
        CulturalProgImage culturalProgImage = new CulturalProgImage();
        culturalProgImage.setName(fileName);
        culturalProgImage.setType(file.getContentType());
        culturalProgImage.setFile(file.getBytes());
        culturalProgImage.setCulturalProgramId(Long.parseLong(culturalProgImageId));
        return culturalProgImageRepository.save(culturalProgImage);
    }

    @Override
    public CulturalProgImage getFile(Long id) {
        return culturalProgImageRepository.findByCulturalProgramId(id).get();
    }
}
