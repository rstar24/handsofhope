package com.twn.cyfwms.CulturalProgram.api;
import com.twn.cyfwms.CulturalProgram.dto.*;
import com.twn.cyfwms.CulturalProgram.entity.CulturalProgImage;
import com.twn.cyfwms.CulturalProgram.service.*;
import com.twn.cyfwms.participant.api.ResponseMessage;
import com.twn.cyfwms.participant.entity.ParticipantImage;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    @Autowired
    private CulturalProgImageService culturalProgImageService;

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

    @PutMapping(value = "/saveParticipantCulturalProg", produces = "application/json")
    @ApiOperation("Save or Update cultural program")
    @ResponseStatus(HttpStatus.OK)
    public ParticipantCulturalProgDto saveParticipantCulturalProg(@RequestBody ParticipantCulturalProgDto participantCulturalProgDto) {
        return participantCulturalProgService.saveParticipantCulturalProg(participantCulturalProgDto);
    }

    @GetMapping(value = {"/participantCulturalProgSearch/{data}"},produces = "application/json")
    @ApiOperation("Search culturalProgram")
    @ResponseStatus(HttpStatus.OK)
    public List<ParticipantCultureProgSearchResultsDto> searchCulturalProgram(@PathVariable Map<String, String> var)
    {
        CulturalProgAndActSearchCriteriaDto participantCulturalSearchDto =new CulturalProgAndActSearchCriteriaDto();
        participantCulturalSearchDto.setData(
                ("null".equals(var.get("data"))
                        || var.get("data") == null) ?null:var.get("data"));
        return participantCulturalProgSearchService.searchParticipantCulturalProgAndAct(participantCulturalSearchDto);
    }

    @PostMapping("/upload")
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("culturalProgImageId") String culturalProgImageId) {
        String message = "";
        try {
            culturalProgImageService.uploadImage(file,culturalProgImageId);

            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }
    @GetMapping("/files/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable Long id) {
        CulturalProgImage fileDB = culturalProgImageService.getFile(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDB.getName() + "\"")
                .contentType(MediaType.valueOf(fileDB.getType()))
                .body(fileDB.getFile());
    }

}
