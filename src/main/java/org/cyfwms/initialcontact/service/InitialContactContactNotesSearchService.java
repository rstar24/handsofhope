package org.cyfwms.initialcontact.service;

import org.cyfwms.initialcontact.dto.InitialContactContactNotesSearchCriteriaDto;
import org.cyfwms.initialcontact.dto.InitialContactContactNotesSearchResultsDto;
import org.cyfwms.initialcontact.repository.InitialContactContactNotesSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class InitialContactContactNotesSearchService {
    @Autowired
    InitialContactContactNotesSearchRepository initialContactContactNotesSearchRepository;
    public List<InitialContactContactNotesSearchResultsDto> search(InitialContactContactNotesSearchCriteriaDto initialContactContactNotesSearchCriteriaDto) {
        return initialContactContactNotesSearchRepository.searchInitialContactsContactNotes(initialContactContactNotesSearchCriteriaDto);
    }
}
