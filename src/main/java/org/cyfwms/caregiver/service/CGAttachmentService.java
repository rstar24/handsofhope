package org.cyfwms.caregiver.service;

import java.io.IOException;
import java.util.List;
import org.cyfwms.caregiver.dto.CGAttachmentDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface CGAttachmentService {
	CGAttachmentDto saveCGAttachment(MultipartFile file, String cgAttachmentDto)
		throws IOException;
	CGAttachmentDto getOneFile(Long id);
	void removeCGImage(Long cgImageId);
	List<CGAttachmentDto> getAllFiles(Long caregiverProviderId);
}
