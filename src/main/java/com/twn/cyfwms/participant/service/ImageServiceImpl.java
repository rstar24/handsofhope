package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.entity.ParticipantImage;
import com.twn.cyfwms.participant.repository.ImageRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;


@Service
@AllArgsConstructor
public class ImageServiceImpl implements ImageService{
    @Autowired
    private ImageRepository imageRepository;



    @Override
    public ParticipantImage uploadImage(MultipartFile file, String participantId) throws IOException {
        ParticipantImage ParticipantImage = new ParticipantImage();
        if(file.getContentType().equals("image/png") || file.getContentType().equals("image/jpg") || file.getContentType().equals("image/jpeg")){
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            ParticipantImage.setName(fileName);
            ParticipantImage.setType(file.getContentType());
            ParticipantImage.setImage(file.getBytes());
            ParticipantImage.setParticipantId(Long.parseLong(participantId));
            imageRepository.save(ParticipantImage);
        }
        return ParticipantImage;
    }
    @Override
    public ParticipantImage getFile(Long id) {
        return imageRepository.findByParticipantId(id).get();
    }
}
