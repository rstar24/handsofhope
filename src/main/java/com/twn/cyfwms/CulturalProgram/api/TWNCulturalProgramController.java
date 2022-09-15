package com.twn.cyfwms.CulturalProgram.api;

import com.twn.cyfwms.CulturalProgram.dto.*;
import com.twn.cyfwms.CulturalProgram.entity.CulturalProgImage;
import com.twn.cyfwms.CulturalProgram.service.*;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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

    @GetMapping(value = {"/culturalProgAndActSearch/{referenceId}/{name}/{type}/{caseworker}/{startDate}/{status}"},produces = "application/json")
    @ApiOperation("Search culturalProgAndAct")
    @ResponseStatus(HttpStatus.OK)
    public List<CultureProgAndActSearchResultsDto> searchCulturalProgAndAct(@PathVariable Map<String, String> var)
    {
        CulturalProgAndActSearchDto culturalProgAndActSearchDto = new CulturalProgAndActSearchDto();
        culturalProgAndActSearchDto.setReferenceId(("null".equals(var.get("referenceId"))
                || var.get("referenceId") == null) ?null:Long.parseLong(var.get("referenceId")));
        culturalProgAndActSearchDto.setName(
                ("null".equals(var.get("name"))
                        || var.get("name") == null) ?null:var.get("name"));

        culturalProgAndActSearchDto.setType(
                ("null".equals(var.get("type"))
                        || var.get("type") == null) ?null:var.get("type"));

        culturalProgAndActSearchDto.setCaseworker(
                ("null".equals(var.get("caseworker"))
                        || var.get("caseworker") == null) ?null:var.get("caseworker"));

        LocalDate dateTime=null;
        if(!"null".equals(var.get("startDate"))) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            dateTime = LocalDate.parse(var.get("startDate"), formatter);
        }
        culturalProgAndActSearchDto.setStartDate(dateTime);

        culturalProgAndActSearchDto.setStatus(
                ("null".equals(var.get("status"))
                        || var.get("status") == null) ?null:var.get("status"));
        return culturalProgAndActSearchService.searchCulturalProgAndAct(culturalProgAndActSearchDto);
    }

    @DeleteMapping("/removeCulturalProgAndAct/{culturalprogramid}")
    @ApiOperation("Remove CulturalProgAndAct")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity removeCulturalProgAndAct(@PathVariable("culturalprogramid") Long culturalProgramId) {
        return culturalProgAndActService.removeCulturalProgAndAct(culturalProgramId);
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

    @DeleteMapping("/removeParticipantCulturalProg/{participantculturalprogid}")
    @ApiOperation("Remove ParticipantCulturalProg")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity removeParticipantCulturalProg(@PathVariable("participantculturalprogid") Long participantCulturalProId) {
        return participantCulturalProgService.removeParticipantCulturalProg(participantCulturalProId);
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
    @PutMapping("/upload")
    public  CulturalProgImage uploadFile(@RequestParam(value = "file",required = false) MultipartFile file, @RequestParam("culturalDto") String culturalDto) throws IOException {

            CulturalProgImage culturalProgImage=culturalProgImageService.uploadImage(file,culturalDto);
     return culturalProgImage;
    }

    @GetMapping("/files/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable Long id) {
        CulturalProgImage fileDB = culturalProgImageService.getFile(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDB.getName() + "\"")
                .contentType(MediaType.valueOf(fileDB.getCulturalImageType()))
                .body(fileDB.getCulturamImagefile());
    }

    @GetMapping(value = "/getAllFiles/{culturalprogramid}", produces = "application/json")
    @ApiOperation("Read All Files")
    @ResponseStatus(HttpStatus.OK)
    public List<CulturalProgImageDto> getAllFiles(@PathVariable("culturalprogramid") Long culturalProgramId) {
        return culturalProgImageService.getAllFiles(culturalProgramId);
    }

    @DeleteMapping("/removeCulturalProgImage/{culturalprogimageid}")
    @ApiOperation("Remove CulturalProgImage")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity removeCulturalProgImage(@PathVariable("culturalprogimageid") Long culturalProgImageId) {
        return culturalProgImageService.removeCulturalProgImage(culturalProgImageId);
    }

}
