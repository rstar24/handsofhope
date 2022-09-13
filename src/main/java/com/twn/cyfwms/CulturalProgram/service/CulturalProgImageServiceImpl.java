package com.twn.cyfwms.CulturalProgram.service;

import com.twn.cyfwms.CulturalProgram.entity.CulturalProgImage;
import com.twn.cyfwms.CulturalProgram.repository.CulturalProgImageRepository;
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
        CulturalProgImage culturalProgImage = new CulturalProgImage();
        if(file.getContentType().equals("image/jpg") || file.getContentType().equals("image/png")||file.getContentType().equals("image/jpeg") ||file.getContentType().equals("image/gif")||file.getContentType().equals("image/bmp")||file.getContentType().equals("application/pdf")
       ||file.getContentType().equals("application/vnd.ms-excel")||file.getContentType().equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document")){
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            culturalProgImage.setName(fileName);
            culturalProgImage.setType(file.getContentType());
            culturalProgImage.setFile(file.getBytes());
            culturalProgImage.setCulturalProgramId(Long.parseLong(culturalProgImageId));
            culturalProgImageRepository.save(culturalProgImage);
       }
        return culturalProgImage;
    }

    @Override
    public CulturalProgImage getFile(Long id) {
        return culturalProgImageRepository.findByCulturalProgramId(id).get();
    }
}
