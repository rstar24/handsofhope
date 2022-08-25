package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.CriminalHistoryDto;
import org.springframework.http.ResponseEntity;

public interface CriminalHistoryService {
    CriminalHistoryDto readCriminalHistory(Long participantId);
    CriminalHistoryDto saveCriminalHistory(CriminalHistoryDto criminalHistoryDto);
    ResponseEntity removeCriminalHistoryRecord(Long criminalHistoryRecordId);
}
