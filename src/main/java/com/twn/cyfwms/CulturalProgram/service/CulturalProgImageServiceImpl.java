package com.twn.cyfwms.CulturalProgram.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.twn.cyfwms.CulturalProgram.dto.CulturalProgImageDto;
import com.twn.cyfwms.CulturalProgram.entity.CulturalProgImage;
import com.twn.cyfwms.CulturalProgram.repository.CulturalProgImageRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.NOT_FOUND;

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
            if(file==null){
                culturalprogimagedto.setImageType(culturalProgImage.getCulturalImageType());
               // culturalprogimagedto.setFile(culturalProgImage.getCulturamImagefile());

            }

            modelMapper.map(culturalprogimagedto,culturalProgImage);
        }
        if(file!=null){
            if(file.getContentType().equals("image/png")||file.getContentType().equals("image/jpg")||file.getContentType().equals("image/jpeg")||file.getContentType().equals("application/pdf")||file.getContentType().equals("application/vnd.ms-excel")||file.getContentType().equals("image/bmp")||file.getContentType().equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document"))
            {
                culturalProgImage.setCulturamImagefile(file.getBytes());
                culturalProgImage.setCulturalImageType(file.getContentType());
            }

        }
        culturalProgImage = culturalProgImageRepository.save(culturalProgImage);
        return culturalProgImage;
    }

    @Override
    public CulturalProgImageDto getOneFile(Long id) {
        CulturalProgImageDto culturalProgImageDto = new CulturalProgImageDto();
        CulturalProgImage culturalProgImage= culturalProgImageRepository.findByCulturalProgramId(id).get();
        culturalProgImageDto.setCulturalProgImageId(culturalProgImage.getCulturalProgImageId());
        culturalProgImageDto.setCulturalProgramId(culturalProgImage.getCulturalProgramId());
        culturalProgImageDto.setType(culturalProgImage.getType());
        culturalProgImageDto.setName(culturalProgImage.getName());
        culturalProgImageDto.setImageType(culturalProgImage.getCulturalImageType());
        culturalProgImageDto.setFile(culturalProgImage.getCulturamImagefile());
        return culturalProgImageDto;
    }

    @Override
    public ResponseEntity removeCulturalProgImage(Long culturalProgImageId) {
        if (culturalProgImageId != 0 ) {
            CulturalProgImage culturalProgImage = culturalProgImageRepository.findByculturalProgImageId(culturalProgImageId);
            if (culturalProgImage!=null){
                culturalProgImage.setStatus("INACTIVE");
                culturalProgImageRepository.save(culturalProgImage);
            }
            else {
                throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
            }
        } else {
            throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    @Override
    public List<CulturalProgImageDto> getAllFiles(Long culturalProgramId) {
        List<CulturalProgImageDto> culturalProgImageDtoList = new ArrayList<CulturalProgImageDto>();
        if (culturalProgramId != 0) {
            List<CulturalProgImage> CulturalProgImageList = culturalProgImageRepository.findByculturalProgramId(culturalProgramId);
            if (CulturalProgImageList != null) {
                culturalProgImageDtoList = modelMapper.map(CulturalProgImageList, new TypeToken<List<CulturalProgImageDto>>() {}.getType());
            }
            else {
                throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
           }
        }
        return culturalProgImageDtoList;
    }

}
