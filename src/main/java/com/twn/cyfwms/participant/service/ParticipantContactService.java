package com.twn.cyfwms.participant.service;


import com.twn.cyfwms.participant.dto.ParticipantContactDto;

public interface ParticipantContactService {

    ParticipantContactDto readParticipantContact(Long participantId);

    ParticipantContactDto saveParticipantContact(ParticipantContactDto ParticipantContactDto);
}
