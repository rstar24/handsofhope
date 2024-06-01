package org.cyfwms.culturalprogram.service;

import java.io.IOException;
import java.util.List;
import org.cyfwms.culturalprogram.dto.AttachmentDTO;
import org.springframework.web.multipart.MultipartFile;

public interface AttachmentsService {
	AttachmentDTO uploadImage(MultipartFile file, String culturalDto) throws IOException;

	AttachmentDTO getOneFile(Long id);

	void removeCulturalProgImage(Long culturalProgImageId);

	List<AttachmentDTO> getAllFiles(Long culturalProgramId);
}
