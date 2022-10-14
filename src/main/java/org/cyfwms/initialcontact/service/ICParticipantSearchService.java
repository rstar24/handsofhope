package org.cyfwms.initialcontact.service;
import org.cyfwms.initialcontact.dto.ICParticipantSearchCriteriaDto;
import org.cyfwms.initialcontact.dto.ICParticipantSearchResultDto;
import org.cyfwms.initialcontact.repository.ICParticipantSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class ICParticipantSearchService {
    @Autowired
    ICParticipantSearchRepository iCParticipantSearchRepository;
    public List<ICParticipantSearchResultDto> searchICParticipant(ICParticipantSearchCriteriaDto iCParticipantSearchCriteriaDto) {
        return iCParticipantSearchRepository.searchICParticipant(iCParticipantSearchCriteriaDto);
    }
}
