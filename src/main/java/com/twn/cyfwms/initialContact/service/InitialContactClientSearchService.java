package com.twn.cyfwms.initialContact.service;
import com.twn.cyfwms.initialContact.dto.InitialContactClientSearchCriteriaDto;
import com.twn.cyfwms.initialContact.dto.InitialContactClientSearchResultsDto;
import com.twn.cyfwms.initialContact.repository.InitialContactClientSearchRepository;
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
