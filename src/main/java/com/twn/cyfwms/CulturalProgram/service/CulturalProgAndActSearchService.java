package com.twn.cyfwms.CulturalProgram.service;
import com.twn.cyfwms.CulturalProgram.dto.CulturalProgAndActSearchDto;
import com.twn.cyfwms.CulturalProgram.dto.CultureProgAndActSearchResultsDto;
import com.twn.cyfwms.CulturalProgram.repository.CultureProgAndActSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class CulturalProgAndActSearchService {
    @Autowired
    CultureProgAndActSearchRepository cultureProgAndActSearchRepository;
    public List<CultureProgAndActSearchResultsDto> searchCulturalProgAndAct(CulturalProgAndActSearchDto culturalProgAndActSearchDto) {
        return cultureProgAndActSearchRepository.searchCulturalProgAndAct(culturalProgAndActSearchDto);
    }
}
