package org.cyfwms.initialcontact.service;

import org.cyfwms.initialcontact.dto.InitialContactSearchCriteriaDto;
import org.cyfwms.initialcontact.dto.InitialContactSearchResultsDto;
import org.cyfwms.initialcontact.repository.InitialContactSearchRepository;
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
