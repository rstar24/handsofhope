package org.cyfwms.participant.service;

import java.util.List;
import org.cyfwms.participant.dto.ParticipantReminderSearchCriteriaDto;
import org.cyfwms.participant.dto.ParticipantReminderSearchResultsDto;
import org.cyfwms.participant.repository.ParticipantReminderSearchRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ParticipantReminderSearchService {
	@Autowired
	private ParticipantReminderSearchRepo participantReminderSearchRepo;

	public List<ParticipantReminderSearchResultsDto> search(
		ParticipantReminderSearchCriteriaDto participantReminderSearchCriteriaDto
	) {
		return participantReminderSearchRepo.searchParticipantReminder(
			participantReminderSearchCriteriaDto
		);
	}
}
