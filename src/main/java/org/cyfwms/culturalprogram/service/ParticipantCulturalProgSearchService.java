package org.cyfwms.culturalprogram.service;
import org.cyfwms.culturalprogram.dto.CulturalProgAndActSearchCriteriaDto;
import org.cyfwms.culturalprogram.dto.ParticipantCultureProgSearchResultsDto;
import org.cyfwms.culturalprogram.repository.ParticipantCultureProgSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class ParticipantCulturalProgSearchService {
    @Autowired
    ParticipantCultureProgSearchRepository participantCultureProgSearchRepository;
    public List<ParticipantCultureProgSearchResultsDto> searchParticipantCulturalProgAndAct(CulturalProgAndActSearchCriteriaDto participantCulturalSearchDto) {
            return participantCultureProgSearchRepository.searchParticipantCulturalProgAndAct(participantCulturalSearchDto);
        }
}
