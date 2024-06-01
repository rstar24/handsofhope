package org.cyfwms.participant.service;

import java.util.List;
import org.cyfwms.participant.dto.ParticipantReminderDto;

public interface ParticipantReminderService {
	ParticipantReminderDto readParticipantReminder(Long participantReminderId);

	List<ParticipantReminderDto> saveParticipantReminder(
		ParticipantReminderDto participantReminderDto
	);

	void removeParticipantReminder(Long participantReminderId);
}
