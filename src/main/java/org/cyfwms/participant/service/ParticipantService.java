package org.cyfwms.participant.service;

import java.io.IOException;
import java.util.Map;
import org.cyfwms.participant.dto.ParticipantIdentityDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface ParticipantService {
	ParticipantIdentityDto readParticipantIdentity(Long participantId);
	ParticipantIdentityDto saveParticipantIdentity(
		ParticipantIdentityDto participantidentitydto,
		MultipartFile multipartFile
	)
		throws IOException;
	void removeParticipant(Long referenceId);
}
