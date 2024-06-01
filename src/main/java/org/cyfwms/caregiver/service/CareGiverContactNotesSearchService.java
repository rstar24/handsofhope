package org.cyfwms.caregiver.service;

import java.util.List;
import org.cyfwms.caregiver.dto.CareGiverContactNotesSearchCriteriaDto;
import org.cyfwms.caregiver.dto.CareGiverContactNotesSearchResultsDto;
import org.cyfwms.caregiver.repository.CareGiverContactNotesSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CareGiverContactNotesSearchService {
	@Autowired
	CareGiverContactNotesSearchRepository careGiverContactNotesSearchRepository;

	public List<CareGiverContactNotesSearchResultsDto> searchContactNotes(
		CareGiverContactNotesSearchCriteriaDto cgContactNotesSearchCriteriaDto
	) {
		return careGiverContactNotesSearchRepository.searchCareGiverContactNotes(
			cgContactNotesSearchCriteriaDto
		);
	}
}
