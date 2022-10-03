package org.cyfwms.culturalprogram.service;
import static org.springframework.http.HttpStatus.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.cyfwms.culturalprogram.dto.AttachmentDTO;
import org.cyfwms.culturalprogram.entity.AttachmentEntity;
import org.cyfwms.culturalprogram.repository.AttachmentsRepository;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class AttachmentsServiceImpl implements AttachmentsService {
  @Autowired
  AttachmentsRepository culturalProgImageRepository;

  @Autowired
  private ModelMapper modelMapper;

  private AttachmentEntity readCulturalImage(Long participantId){
    AttachmentEntity culturalProgImage= new AttachmentEntity();
    Optional<AttachmentEntity> participantOpt = culturalProgImageRepository.findById(participantId);
    if (participantOpt.isPresent()) {
      culturalProgImage= participantOpt.get();
    }
    return culturalProgImage;
  }

  @Override
  public AttachmentEntity uploadImage(MultipartFile file, String culturalDto) throws IOException {
    AttachmentDTO culturalProgImageDto = new ObjectMapper().readValue(culturalDto, AttachmentDTO.class);
    AttachmentDTO culturalprogimagedto = new AttachmentDTO();
    culturalprogimagedto.setName(culturalProgImageDto.getName());
    culturalprogimagedto.setType(culturalProgImageDto.getType());
    culturalprogimagedto.setCulturalProgramId(culturalProgImageDto.getCulturalProgramId());
    AttachmentEntity culturalProgImage = new AttachmentEntity();
    if (culturalProgImageDto.getCulturalProgImageId() == 0) {
      modelMapper.map(culturalprogimagedto,culturalProgImage);
      culturalProgImage.setStatus("ACTIVE");
    } else {
      culturalProgImage = readCulturalImage( culturalProgImageDto.getCulturalProgImageId());
      culturalprogimagedto.setCulturalProgImageId(culturalProgImageDto.getCulturalProgImageId());
      if (file == null) {
        culturalprogimagedto.setImageType(culturalProgImage.getCulturalImageType());
        culturalprogimagedto.setCulturalimagename(culturalProgImage.getCulturalimagename());
      }
      modelMapper.map(culturalprogimagedto,culturalProgImage);
    }
    if (file != null) {
      if (file.getContentType().equals("image/png")||file.getContentType().equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document")||file.getContentType().equals("image/jpg")||file.getContentType().equals("image/jpeg")||file.getContentType().equals("application/pdf")||file.getContentType().equals("application/vnd.ms-excel")||file.getContentType().equals("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")||file.getContentType().equals("image/bmp")||file.getContentType().equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document")||file.getContentType().equals("image/gif")) {
        culturalProgImage.setCulturamImagefile(file.getBytes());
        culturalProgImage.setCulturalImageType(file.getContentType());
        culturalProgImage.setCulturalimagename(file.getOriginalFilename());
      }
    }
    culturalProgImage = culturalProgImageRepository.save(culturalProgImage);
    return culturalProgImage;
  }

  @Override
  public AttachmentDTO getOneFile(Long id) {
    AttachmentDTO culturalProgImageDto = new AttachmentDTO();
    AttachmentEntity culturalProgImage= culturalProgImageRepository.findByculturalProgImageId(id);
    if (culturalProgImage!=null) {
      culturalProgImageDto.setCulturalProgImageId(culturalProgImage.getCulturalProgImageId());
      culturalProgImageDto.setCulturalProgramId(culturalProgImage.getCulturalProgramId());
      culturalProgImageDto.setType(culturalProgImage.getType());
      culturalProgImageDto.setName(culturalProgImage.getName());
      culturalProgImageDto.setImageType(culturalProgImage.getCulturalImageType());
      culturalProgImageDto.setFile(culturalProgImage.getCulturamImagefile());
      culturalProgImageDto.setCulturalimagename(culturalProgImage.getCulturalimagename());
    }
    else {
      throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
    }

    return culturalProgImageDto;
  }

  @Override
  public ResponseEntity<String> removeCulturalProgImage(Long culturalProgImageId) {
    if (culturalProgImageId != 0 ) {
      AttachmentEntity culturalProgImage = culturalProgImageRepository.findByculturalProgImageId(culturalProgImageId);
      if (culturalProgImage != null) {
        culturalProgImage.setStatus("INACTIVE");
        culturalProgImageRepository.save(culturalProgImage);
      } else {
        throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
      }
    } else {
      throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
    }
    return new ResponseEntity<String>(OK);
  }

  @Override
  public List<AttachmentDTO> getAllFiles(Long culturalProgramId) {
    List<AttachmentDTO> culturalProgImageDtoList = new ArrayList<AttachmentDTO>();
    if (culturalProgramId != 0) {
      List<AttachmentEntity> CulturalProgImageList = culturalProgImageRepository.findByCulturalProgramId(culturalProgramId);
      if (CulturalProgImageList != null) {
        culturalProgImageDtoList = modelMapper.map(CulturalProgImageList, new TypeToken<List<AttachmentDTO>>() {}.getType());
      } else {
        throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
      }
    }
    return culturalProgImageDtoList;
  }
}
