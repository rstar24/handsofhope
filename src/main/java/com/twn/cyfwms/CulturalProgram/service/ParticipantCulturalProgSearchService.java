package com.twn.cyfwms.CulturalProgram.service;
import com.twn.cyfwms.CulturalProgram.dto.CulturalProgAndActSearchCriteriaDto;
import com.twn.cyfwms.CulturalProgram.dto.ParticipantCultureProgSearchResultsDto;
import com.twn.cyfwms.CulturalProgram.repository.ParticipantCultureProgSearchRepository;
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
