package org.cyfwms.initialcontact.service;
import org.cyfwms.initialcontact.dto.ICClientSearchCriteriaDto;
import org.cyfwms.initialcontact.dto.ICClientSearchResultsDto;
import org.cyfwms.initialcontact.repository.ICClientSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class ICClientSearchService {
    @Autowired
    ICClientSearchRepository iCClientSearchRepository;
    public List<ICClientSearchResultsDto> searchData(ICClientSearchCriteriaDto iCClientSearchCriteriaDto) {
       return iCClientSearchRepository.searchParticipant(iCClientSearchCriteriaDto);
    }
}
