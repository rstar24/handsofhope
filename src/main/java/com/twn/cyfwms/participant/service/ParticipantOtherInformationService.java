package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.CriminalHistoryDto;
import com.twn.cyfwms.participant.dto.ParticipantOtherInformationServiceDto;

public interface ParticipantOtherInformationService {
    ParticipantOtherInformationServiceDto readParticipantOtherInformation(Long participantId);

    ParticipantOtherInformationServiceDto saveParticipantOtherInformation(ParticipantOtherInformationServiceDto participantOtherInformationServiceDto);
}
