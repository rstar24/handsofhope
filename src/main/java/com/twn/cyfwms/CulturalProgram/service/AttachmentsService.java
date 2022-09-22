package com.twn.cyfwms.CulturalProgram.service;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.twn.cyfwms.CulturalProgram.dto.AttachmentDTO;
import com.twn.cyfwms.CulturalProgram.entity.AttachmentEntity;

public interface AttachmentsService {
  AttachmentEntity uploadImage(MultipartFile file, String culturalDto) throws IOException;
  AttachmentDTO getOneFile(Long id);
  ResponseEntity<String> removeCulturalProgImage(Long culturalProgImageId);
  List<AttachmentDTO> getAllFiles(Long culturalProgramId);
}
