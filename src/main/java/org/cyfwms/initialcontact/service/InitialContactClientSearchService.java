package org.cyfwms.initialcontact.service;
import org.cyfwms.initialcontact.dto.InitialContactClientSearchCriteriaDto;
import org.cyfwms.initialcontact.dto.InitialContactClientSearchResultsDto;
import org.cyfwms.initialcontact.repository.InitialContactClientSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class InitialContactClientSearchService {
    @Autowired
    InitialContactClientSearchRepository initialContactClientSearchRepository;
    public List<InitialContactClientSearchResultsDto> searchData(InitialContactClientSearchCriteriaDto initialContactClientSearchCriteriaDto) {
       return initialContactClientSearchRepository.searchParticipant(initialContactClientSearchCriteriaDto);
    }
}
