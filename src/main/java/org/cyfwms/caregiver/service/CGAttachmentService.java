package org.cyfwms.caregiver.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.cyfwms.caregiver.dto.CGAttachmentDto;
import org.cyfwms.culturalprogram.dto.AttachmentDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CGAttachmentService {
    CGAttachmentDto saveCGAttachment(MultipartFile file, String  cgAttachmentDto) throws IOException;
    CGAttachmentDto getOneFile(Long id);
    ResponseEntity<String> removeCulturalProgImage(Long cgImageId);
    List<CGAttachmentDto> getAllFiles(Long caregiverProviderId);
}
