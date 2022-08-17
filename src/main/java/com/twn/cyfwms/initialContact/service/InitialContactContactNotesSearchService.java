package com.twn.cyfwms.initialContact.service;

import com.twn.cyfwms.initialContact.dto.InitialContactContactNotesSearchCriteriaDto;
import com.twn.cyfwms.initialContact.dto.InitialContactContactNotesSearchResultsDto;
import com.twn.cyfwms.initialContact.repository.InitialContactContactNotesSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class InitialContactContactNotesSearchService {
    @Autowired
    InitialContactContactNotesSearchRepository initialContactContactNotesSearchRepository;
    public List<InitialContactContactNotesSearchResultsDto> search(InitialContactContactNotesSearchCriteriaDto initialContactContactNotesSearchCriteriaDto) {
        return  initialContactContactNotesSearchRepository.searchInitialContactsContactNotes(initialContactContactNotesSearchCriteriaDto);
    }
}
