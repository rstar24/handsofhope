package org.cyfwms.participant.service;

import java.util.List;
import org.cyfwms.participant.dto.ParticipantSearchCriteriaDto;
import org.cyfwms.participant.dto.ParticipantSearchResultsDto;
import org.cyfwms.participant.repository.ParticipantSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public interface ParticipantSearchService {
	List<ParticipantSearchResultsDto> search(
		ParticipantSearchCriteriaDto participantSearchCriteriaDto
	);
}
