package org.cyfwms.participant.service;

import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.cyfwms.participant.dto.ParticipantSearchCriteriaDto;
import org.cyfwms.participant.dto.ParticipantSearchResultsDto;
import org.cyfwms.participant.repository.ParticipantSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ParticipantSearchServiceImpl implements ParticipantSearchService {
	@Autowired
	private ParticipantSearchRepository participantSearchRepository;

	public List<ParticipantSearchResultsDto> search(
		ParticipantSearchCriteriaDto participantSearchCriteriaDto
	) {
		log.info("ParticipantSearchCriteriaDto :" + participantSearchCriteriaDto);
		return participantSearchRepository.searchParticipants(participantSearchCriteriaDto);
	}
}
