package org.cyfwms.participant.service;

import org.cyfwms.participant.dto.ParticipantReminderDto;

import java.util.List;

public interface ParticipantReminderService {

    List<ParticipantReminderDto> readParticipantReminder(Long participantId);

    ParticipantReminderDto saveParticipantReminder(ParticipantReminderDto participantReminderDto);

    void removeParticipantReminder(Long referenceId);


}
