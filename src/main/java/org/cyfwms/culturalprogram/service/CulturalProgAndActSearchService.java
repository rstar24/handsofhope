package org.cyfwms.culturalprogram.service;
import org.cyfwms.culturalprogram.dto.CulturalProgAndActSearchDto;
import org.cyfwms.culturalprogram.dto.CultureProgAndActSearchResultsDto;
import org.cyfwms.culturalprogram.repository.CultureProgAndActSearchRepository;
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
