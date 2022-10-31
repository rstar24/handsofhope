package org.cyfwms.participant.service;
import org.cyfwms.participant.dto.ParticipantContactNotesSearchCriteriaDto;
import org.cyfwms.participant.dto.ParticipantContactNotesSearchResultsDto;
import org.cyfwms.participant.repository.ParticipantContactNotesSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ParticipantContactNotesSearchService {
    @Autowired
    ParticipantContactNotesSearchRepository participantContactNotesSearchRepository;
    public List<ParticipantContactNotesSearchResultsDto> search(ParticipantContactNotesSearchCriteriaDto iCContactNotesSearchCriteriaDto) {
        return participantContactNotesSearchRepository.searchParticipantContactNotes(iCContactNotesSearchCriteriaDto);
    }
}
