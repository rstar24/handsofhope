package com.twn.cyfwms.initialContact.service;

import com.twn.cyfwms.initialContact.dto.InitialContactSearchCriteriaDto;
import com.twn.cyfwms.initialContact.dto.InitialContactSearchResultsDto;
import com.twn.cyfwms.initialContact.repository.InitialContactSearchRepository;
import com.twn.cyfwms.participant.repository.ParticipantSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class InitialContactSearchService {
     @Autowired
      InitialContactSearchRepository initialContactSearchRepository ;
    public List<InitialContactSearchResultsDto> search(InitialContactSearchCriteriaDto initialContactSearchCriteriaDto){
        return  initialContactSearchRepository.searchInitialContacts(initialContactSearchCriteriaDto);
    }

}
