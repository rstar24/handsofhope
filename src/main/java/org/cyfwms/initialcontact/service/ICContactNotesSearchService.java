package org.cyfwms.initialcontact.service;

import java.util.List;
import org.cyfwms.initialcontact.dto.ICContactNotesSearchCriteriaDto;
import org.cyfwms.initialcontact.dto.ICContactNotesSearchResultsDto;
import org.cyfwms.initialcontact.repository.ICContactNotesSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ICContactNotesSearchService {
	@Autowired
	ICContactNotesSearchRepository iCContactNotesSearchRepository;

	public List<ICContactNotesSearchResultsDto> search(
		ICContactNotesSearchCriteriaDto initialContactContactNotesSearchCriteriaDto
	) {
		return iCContactNotesSearchRepository.searchICContactNotes(
			initialContactContactNotesSearchCriteriaDto
		);
	}
}
