package com.twn.cyfwms.CulturalProgram.api;
import com.twn.cyfwms.CulturalProgram.dto.CulturalProgAndActDto;
import com.twn.cyfwms.CulturalProgram.dto.CulturalProgramSearchCriteriaDto;
import com.twn.cyfwms.CulturalProgram.dto.CultureProgramSearchResultsDto;
import com.twn.cyfwms.CulturalProgram.service.CulturalProgAndActService;
import com.twn.cyfwms.CulturalProgram.service.CulturalProgramSearchService;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
@RestController
@AllArgsConstructor
@RequestMapping("/v1/culturalprogramservice")
@CrossOrigin("*")
public class TWNCulturalProgramController {
    @Autowired
    CulturalProgramSearchService culturalProgramSearchService;

    @Autowired
    private CulturalProgAndActService culturalProgAndActService;

    @GetMapping(value = {"/culturalProgramSearch/{data}"},produces = "application/json")
    @ApiOperation("Search culturalProgram")
    @ResponseStatus(HttpStatus.OK)
    public List<CultureProgramSearchResultsDto> searchCulturalProgram(@PathVariable Map<String, String> var)
    {
        CulturalProgramSearchCriteriaDto culturalProgramSearchCriteriaDto=new CulturalProgramSearchCriteriaDto();
        culturalProgramSearchCriteriaDto.setData(
                ("null".equals(var.get("data"))
                        || var.get("data") == null) ?null:var.get("data"));
        return culturalProgramSearchService.search(culturalProgramSearchCriteriaDto);
    }
    @PutMapping(value = "/saveculturalprogram", produces = "application/json")
    @ApiOperation("Save or Update cultural program")
    @ResponseStatus(HttpStatus.OK)
    public CulturalProgAndActDto saveCulturalProgramIdentity(@RequestBody CulturalProgAndActDto culturalProgAndActDto) {
        return culturalProgAndActService.saveculturalProgramIdentity(culturalProgAndActDto);
    }
}
