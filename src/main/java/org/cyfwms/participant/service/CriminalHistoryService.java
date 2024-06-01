package org.cyfwms.participant.service;

import java.util.List;
import org.cyfwms.participant.dto.CounselorCFSWorkersDto;
import org.cyfwms.participant.dto.CriminalHistoryDto;
import org.springframework.http.ResponseEntity;

public interface CriminalHistoryService {
	CriminalHistoryDto readCriminalHistory(Long participantId);
	CriminalHistoryDto saveCriminalHistory(CriminalHistoryDto criminalHistoryDto);
	void removeCriminalHistoryRecord(Long criminalHistoryRecordId);
}
