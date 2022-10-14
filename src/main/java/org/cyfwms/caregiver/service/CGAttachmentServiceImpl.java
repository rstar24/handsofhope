package org.cyfwms.caregiver.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.cyfwms.caregiver.dto.CGAttachmentDto;
import org.cyfwms.caregiver.entity.CGAttachmentEntity;
import org.cyfwms.caregiver.repository.CGAttachmentRepository;
import org.cyfwms.culturalprogram.dto.AttachmentDTO;
import org.cyfwms.culturalprogram.entity.AttachmentEntity;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.OK;

@Service
public class CGAttachmentServiceImpl implements  CGAttachmentService{
  @Autowired
    CGAttachmentRepository cgAttachmentRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public CGAttachmentDto saveCGAttachment(MultipartFile file, String cgAttachmentDto) throws IOException {
        CGAttachmentDto cgAttachmentdto = new ObjectMapper().readValue(cgAttachmentDto, CGAttachmentDto.class);
        System.out.println(cgAttachmentdto);
        CGAttachmentDto cgattachmentdto = new CGAttachmentDto();
        cgattachmentdto.setName(cgAttachmentdto.getName());
        cgattachmentdto.setType(cgAttachmentdto.getType());
        cgattachmentdto.setCgProviderId(cgAttachmentdto.getCgProviderId());
        CGAttachmentEntity cgAttachmentEntity = new CGAttachmentEntity();
        if (cgAttachmentdto.getCgImageId() == 0) {
            BeanUtils.copyProperties(cgattachmentdto,cgAttachmentEntity);
            cgAttachmentEntity.setStatus("ACTIVE");
        } else {
            cgAttachmentEntity = readCulturalImage( cgAttachmentdto.getCgImageId());
            cgAttachmentdto.setCgImageId(cgAttachmentEntity.getCgImageId());
            if (file == null) {
                cgattachmentdto.setCgImageType(cgAttachmentEntity.getCgImageType());
                cgattachmentdto.setCgImagename(cgAttachmentEntity.getCgImagename());
            }
            BeanUtils.copyProperties(cgAttachmentdto,cgAttachmentEntity);
        }
        if (file != null) {
            if (file.getContentType().equals("image/png")||file.getContentType().equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document")||file.getContentType().equals("image/jpg")||file.getContentType().equals("image/jpeg")||file.getContentType().equals("application/pdf")||file.getContentType().equals("application/vnd.ms-excel")||file.getContentType().equals("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")||file.getContentType().equals("image/bmp")||file.getContentType().equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document")||file.getContentType().equals("image/gif")) {
                cgAttachmentEntity.setCgImagefile(file.getBytes());
                cgAttachmentEntity.setCgImageType(file.getContentType());
                cgAttachmentEntity.setCgImagename(file.getOriginalFilename());
            }
        }
        cgAttachmentEntity = cgAttachmentRepository.save(cgAttachmentEntity);
        cgattachmentdto.setCgImageId(cgAttachmentEntity.getCgImageId());

        return cgattachmentdto;
    }

    @Override
    public CGAttachmentDto getOneFile(Long id) {
        CGAttachmentDto cgAttachmentDto = new CGAttachmentDto();
        CGAttachmentEntity cgAttachmentEntity= cgAttachmentRepository.findByCgImageId(id);
        if (cgAttachmentEntity!=null) {
            cgAttachmentDto.setCgImageId(cgAttachmentEntity.getCgImageId());
            cgAttachmentDto.setCgProviderId(cgAttachmentEntity.getCgProviderId());
            cgAttachmentDto.setType(cgAttachmentEntity.getType());
            cgAttachmentDto.setName(cgAttachmentEntity.getName());
            cgAttachmentDto.setCgImagefile(cgAttachmentEntity.getCgImagefile());
            cgAttachmentDto.setCgImageType(cgAttachmentEntity.getCgImageType());
            cgAttachmentDto.setCgImagename(cgAttachmentEntity.getCgImagename());
        }
        else {
            throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
        }

        return cgAttachmentDto;

    }

    @Override
    public ResponseEntity<String> removeCulturalProgImage(Long cgImageId) {
        if (cgImageId != 0 ) {
            CGAttachmentEntity cgAttachmentEntity = cgAttachmentRepository.findByCgImageId(cgImageId);
            if (cgAttachmentEntity != null) {
                cgAttachmentEntity.setStatus("INACTIVE");
                cgAttachmentRepository.save(cgAttachmentEntity);
            }

        } else {
            throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
        }
        return new ResponseEntity<String>(OK);

    }

    @Override
    public List<CGAttachmentDto> getAllFiles(Long caregiverProviderId) {
        List<CGAttachmentDto> cGAttachmentDtoList = new ArrayList<CGAttachmentDto>();
        if (caregiverProviderId != 0) {
            List<CGAttachmentEntity> cgImageList = cgAttachmentRepository.findByCaregiverProviderId(caregiverProviderId);
            if (cgImageList != null) {
                cGAttachmentDtoList = modelMapper.map(cgImageList, new TypeToken<List<CGAttachmentDto>>() {}.getType());
            } else {
                throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
            }
        }
        return cGAttachmentDtoList;
    }


    private CGAttachmentEntity readCulturalImage(long cgImageId) {
        CGAttachmentEntity cgAttachmentEntity = new CGAttachmentEntity();
        Optional<CGAttachmentEntity> participantOpt = cgAttachmentRepository.findById(cgImageId);
        if (participantOpt.isPresent()) {
            cgAttachmentEntity= participantOpt.get();
        }
        return cgAttachmentEntity;
    }
}
