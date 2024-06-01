package org.cyfwms.participant.service;

import java.util.List;
import org.cyfwms.participant.dto.CounselorCFSWorkersDto;
import org.springframework.http.ResponseEntity;

public interface CounselorCFSWorkerService {
	List<CounselorCFSWorkersDto> getAllCounselorCFSWorkers(Long participantId);
	List<CounselorCFSWorkersDto> saveAllCounselorCFSWorkers(
		List<CounselorCFSWorkersDto> CounselorCFSWorkersDtoList
	);
	void removeCounselorCFSWorker(Long counselorCFSWorkerId);
}
