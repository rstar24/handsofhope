package com.twn.cyfwms.CulturalProgram.api;
import com.twn.cyfwms.CulturalProgram.dto.*;
import com.twn.cyfwms.CulturalProgram.service.CulturalProgAndActSearchService;
import com.twn.cyfwms.CulturalProgram.service.CulturalProgAndActService;
import com.twn.cyfwms.CulturalProgram.service.ParticipantCulturalProgSearchService;
import com.twn.cyfwms.CulturalProgram.service.ParticipantCulturalProgService;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
@RestController
@AllArgsConstructor
@RequestMapping("/v1/culturalprogandactservice")
@CrossOrigin("*")
public class TWNCulturalProgramController {
    @Autowired
    ParticipantCulturalProgSearchService participantCulturalProgSearchService;
    @Autowired
    CulturalProgAndActSearchService culturalProgAndActSearchService;
    @Autowired
    private CulturalProgAndActService culturalProgAndActService;
    @Autowired
    private ParticipantCulturalProgService participantCulturalProgService;

    @GetMapping(value = "/readCulturalProgAndAct/{culturalprogramid}", produces = "application/json")
    @ApiOperation("Read CulturalProgAndAct")
    @ResponseStatus(HttpStatus.OK)
    public CulturalProgAndActDto readCulturalProgAndAct(@PathVariable("culturalprogramid") Long culturalProgramId) {
        return culturalProgAndActService.readCulturalProgAndAct(culturalProgramId);
    }

    @PutMapping(value = "/saveCulturalProgAndAct", produces = "application/json")
    @ApiOperation("Save or Update cultural program")
    @ResponseStatus(HttpStatus.OK)
    public CulturalProgAndActDto saveCulturalProgramIdentity(@RequestBody CulturalProgAndActDto culturalProgAndActDto) {
        return culturalProgAndActService.saveCulturalProgramIdentity(culturalProgAndActDto);
    }

    @GetMapping(value = {"/culturalProgAndActSearch/{data}"},produces = "application/json")
    @ApiOperation("Search CulturalProgAndAct")
    @ResponseStatus(HttpStatus.OK)
    public List<CultureProgAndActSearchResultsDto> searchCulturalProgAndAct(@PathVariable Map<String, String> var)
    {
        CulturalProgAndActSearchCriteriaDto culturalProgAndActSearchCriteriaDto =new CulturalProgAndActSearchCriteriaDto();
        culturalProgAndActSearchCriteriaDto.setData(
                ("null".equals(var.get("data"))
                        || var.get("data") == null) ?null:var.get("data"));
        return culturalProgAndActSearchService.searchCulturalProgAndAct(culturalProgAndActSearchCriteriaDto);
    }

    @GetMapping(value = "/readParticipantsCulturalAndAct/{participantculturalprogid}", produces = "application/json")
    @ApiOperation("Read participantsCulturalAndAct")
    @ResponseStatus(HttpStatus.OK)
    public ParticipantCulturalProgDto readParticipantCulturalAndAct(@PathVariable("participantculturalprogid") Long participantCulturalProId) {
        return participantCulturalProgService.readParticipantCulturalAndAct(participantCulturalProId);
    }

    @GetMapping(value = {"/participantCulturalProgSearch/{data}"},produces = "application/json")
    @ApiOperation("Search culturalProgram")
    @ResponseStatus(HttpStatus.OK)
    public List<ParticipantCultureProgSearchResultsDto> searchCulturalProgram(@PathVariable Map<String, String> var)
    {
        CulturalProgAndActSearchCriteriaDto culturalProgAndActSearchCriteriaDto =new CulturalProgAndActSearchCriteriaDto();
        culturalProgAndActSearchCriteriaDto.setData(
                ("null".equals(var.get("data"))
                        || var.get("data") == null) ?null:var.get("data"));
        return participantCulturalProgSearchService.search(culturalProgAndActSearchCriteriaDto);
    }
    @PutMapping(value = "/saveParticipantCulturalProg", produces = "application/json")
    @ApiOperation("Save or Update cultural program")
    @ResponseStatus(HttpStatus.OK)
    public ParticipantCulturalProgDto saveParticipantCulturalProg(@RequestBody ParticipantCulturalProgDto participantCulturalProgDto) {
        return participantCulturalProgService.saveParticipantCulturalProg(participantCulturalProgDto);
    }
}
