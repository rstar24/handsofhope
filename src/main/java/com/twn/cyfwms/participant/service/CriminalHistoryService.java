package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.CriminalHistoryDto;

public interface CriminalHistoryService {
    CriminalHistoryDto readCriminalHistory(Long participantId);

    CriminalHistoryDto saveCriminalHistory(CriminalHistoryDto criminalHistoryDto);
}
