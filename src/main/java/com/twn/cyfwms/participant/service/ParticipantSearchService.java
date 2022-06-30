package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.ParticipantSearchCriteriaDto;
import com.twn.cyfwms.participant.dto.ParticipantSearchResultsDto;
import com.twn.cyfwms.participant.repository.ParticipantSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParticipantSearchService {
    @Autowired
    private ParticipantSearchRepository participantSearchRepository;

    public List<ParticipantSearchResultsDto> search(ParticipantSearchCriteriaDto participantSearchCriteriaDto){
        return participantSearchRepository.searchParticipants(participantSearchCriteriaDto);
    }
}
