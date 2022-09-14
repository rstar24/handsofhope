package com.twn.cyfwms.CulturalProgram.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.twn.cyfwms.CulturalProgram.dto.CulturalProgImageDto;
import com.twn.cyfwms.CulturalProgram.entity.CulturalProgImage;
import com.twn.cyfwms.CulturalProgram.repository.CulturalProgImageRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CulturalProgImageServiceImpl implements CulturalProgImageService{
    @Autowired
    CulturalProgImageRepository culturalProgImageRepository;
    @Autowired
    private ModelMapper modelMapper;

    private CulturalProgImage readCulturalImage(Long participantId){
        CulturalProgImage culturalProgImage= new CulturalProgImage();
        Optional<CulturalProgImage> participantOpt = culturalProgImageRepository.findByCulturalProgramId(participantId);
        if(participantOpt.isPresent()){
            culturalProgImage= participantOpt.get();

        }
        return culturalProgImage;
    }

    @Override
    public CulturalProgImage uploadImage(MultipartFile file, String culturalDto) throws IOException {

        CulturalProgImageDto culturalProgImageDto = new ObjectMapper().readValue(culturalDto, CulturalProgImageDto.class);
        CulturalProgImageDto culturalprogimagedto = new CulturalProgImageDto();
        culturalprogimagedto.setName(culturalProgImageDto.getName());
        culturalprogimagedto.setType(culturalProgImageDto.getType());
        if(file!=null){
            culturalprogimagedto.setImageType(file.getContentType());
            culturalprogimagedto.setFile(file.getBytes());
        }


        culturalprogimagedto.setCulturalProgramId(culturalProgImageDto.getCulturalProgramId());
        CulturalProgImage culturalProgImage = new CulturalProgImage();

        if(culturalProgImageDto.getCulturalProgImageId()==0 )
      {
            modelMapper.map(culturalprogimagedto,culturalProgImage);
            culturalProgImage.setStatus("ACTIVE");
       }
        else{
            culturalProgImage = readCulturalImage( culturalProgImageDto.getCulturalProgramId());
            culturalprogimagedto.setCulturalProgImageId(culturalProgImageDto.getCulturalProgImageId());
            modelMapper.map(culturalprogimagedto,culturalProgImage);
        }
        if(file!=null){
            culturalProgImage.setCulturamImagefile(file.getBytes());
        }

        culturalProgImage = culturalProgImageRepository.save(culturalProgImage);
        return culturalProgImage;
    }

    @Override
    public CulturalProgImage getFile(Long id) {

        return culturalProgImageRepository.findByCulturalProgramId(id).get();
    }
}
