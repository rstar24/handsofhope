package com.twn.cyfwms.CulturalProgram.service;

import com.twn.cyfwms.CulturalProgram.dto.CulturalProgramSearchCriteriaDto;
import com.twn.cyfwms.CulturalProgram.dto.CultureProgramSearchResultsDto;
import com.twn.cyfwms.CulturalProgram.repository.CultureProgramSearchRepository;
import com.twn.cyfwms.initialContact.repository.InitialContactClientSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CulturalProgramSearchService {
    @Autowired
    CultureProgramSearchRepository cultureProgramSearchRepository;
    public List<CultureProgramSearchResultsDto> search(CulturalProgramSearchCriteriaDto culturalProgramSearchCriteriaDto) {
        return cultureProgramSearchRepository.search(culturalProgramSearchCriteriaDto);
    }
}
