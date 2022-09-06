package com.twn.cyfwms.initialContact.api;
import com.twn.cyfwms.initialContact.dto.*;
import com.twn.cyfwms.initialContact.service.*;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
@RestController
@AllArgsConstructor
@RequestMapping("/v1/initialcontactservice")
@CrossOrigin("*")
public class TWNInitialContactController {

    @Autowired
    InitialContactFileDetailsService initialContactFileDetailsService;
    @Autowired
    InitialContactIncidentReportService initialContactIncidentReportService;
    @Autowired
    InitialContactPatientCareInfoService initialContactPatientCareInfoService;
    @Autowired
    InitialContactPresentConcernsService initialContactPresentConcernsService;
    @Autowired
    InitialContactReferralInfoService initialContactReferralInfoService;
    @Autowired
    InitialContactSearchService initialContactSearchService;
    @Autowired
    InitialContactContactNotesService initialContactContactNotesService;
    @Autowired
    InitialContactContactNotesSearchService initialContactContactNotesSearchService;
    @Autowired
    InitialContactClientSearchService initialContactClientSearchService;

    @GetMapping(value = "/readAllFileDetails/{filedetailsid}", produces = "application/json")
    @ApiOperation("Read Identity")
    @ResponseStatus(HttpStatus.OK)
    public InitialContactFileDetailsDto readAllFileDetails(@PathVariable("filedetailsid") Long fileDetailsID) {
        return initialContactFileDetailsService.readAllFileDetails(fileDetailsID);
    }

    @PutMapping(value = "/saveAllFileDetails", produces = "application/json")
    @ApiOperation("Save or Update Identity")
    @ResponseStatus(HttpStatus.OK)
    public InitialContactFileDetailsDto saveAllFileDetails(@RequestBody InitialContactFileDetailsDto initialContactFileDetailsDto) {
        return initialContactFileDetailsService.saveAllFileDetails(initialContactFileDetailsDto);
    }
    @DeleteMapping("/removeInitialContactFileDetails/{fileNumber}")
    @ApiOperation("Remove Participant")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity removeInitialContactFileDetails(@PathVariable("fileNumber") Long fileNumber) {
        return initialContactFileDetailsService.removeInitialContactFileDetails(fileNumber);
    }

    @GetMapping(value = "/readAllIncidentReports/{filedetailsid}", produces = "application/json")
    @ApiOperation("Read Identity")
    @ResponseStatus(HttpStatus.OK)
    public InitialContactIncidentReportDto readAllIncidentReports(@PathVariable("filedetailsid") Long fileDetailsID) {
        return initialContactIncidentReportService.readAllIncidentReports(fileDetailsID);
    }

    @PutMapping(value = "/saveAllIncidentReports", produces = "application/json")
    @ApiOperation("Save or Update Identity")
    @ResponseStatus(HttpStatus.OK)
    public InitialContactIncidentReportDto saveAllIncidentReports(@RequestBody InitialContactIncidentReportDto initialContactIncidentReportDto) {
        return initialContactIncidentReportService.saveAllIncidentReports(initialContactIncidentReportDto);
    }

    @GetMapping(value = "/readAllPatientCareInfo/{filedetailsid}", produces = "application/json")
    @ApiOperation("Read Identity")
    @ResponseStatus(HttpStatus.OK)
    public InitialContactPatientCareInfoDto readAllPatientCareInfo(@PathVariable("filedetailsid") Long fileDetailsID) {
        return initialContactPatientCareInfoService.readAllPatientCareInfo(fileDetailsID);
    }

    @PutMapping(value = "/saveAllPatientCareInfo", produces = "application/json")
    @ApiOperation("Save or Update Identity")
    @ResponseStatus(HttpStatus.OK)
    public InitialContactPatientCareInfoDto saveAllPatientCareInfo(@RequestBody InitialContactPatientCareInfoDto initialContactPatientCareInfoDto) {
        return initialContactPatientCareInfoService.saveAllPatientCareInfo(initialContactPatientCareInfoDto);
    }

    @GetMapping(value = "/readAllPresentConcerns/{filedetailsid}", produces = "application/json")
    @ApiOperation("Read Identity")
    @ResponseStatus(HttpStatus.OK)
    public InitialContactPresentConcernsDto readAllPresentConcerns(@PathVariable("filedetailsid") Long fileDetailsID) {
        return initialContactPresentConcernsService.readAllPresentConcerns(fileDetailsID);
    }

    @PutMapping(value = "/saveAllPresentConcerns", produces = "application/json")
    @ApiOperation("Save or Update Identity")
    @ResponseStatus(HttpStatus.OK)
    public InitialContactPresentConcernsDto saveAllPresentConcerns(@RequestBody InitialContactPresentConcernsDto initialContactPresentConcernsDto) {
        return initialContactPresentConcernsService.saveAllPresentConcerns(initialContactPresentConcernsDto);
    }

    @GetMapping(value = "/readAllReferralInfo/{filedetailsid}", produces = "application/json")
    @ApiOperation("Read Identity")
    @ResponseStatus(HttpStatus.OK)
    public InitialContactReferralInfoDto readAllReferralInfo(@PathVariable("filedetailsid") Long fileDetailsID) {
        return initialContactReferralInfoService.readAllReferralInfo(fileDetailsID);
    }

    @PutMapping(value = "/saveAllReferralInfo", produces = "application/json")
    @ApiOperation("Save or Update Identity")
    @ResponseStatus(HttpStatus.OK)
    public InitialContactReferralInfoDto saveAllReferralInfo(@RequestBody InitialContactReferralInfoDto initialContactReferralInfoDto) {
        return initialContactReferralInfoService.saveAllReferralInfo(initialContactReferralInfoDto);
    }

    @GetMapping(value = {"/searchInitialContacts/{clientname}/{fileNumber}/{caseworker}/{startingDate}/{status}"},produces = "application/json")
    @ApiOperation("Search InitialContact")
    @ResponseStatus(HttpStatus.OK)
    public List<InitialContactSearchResultsDto> searchInitialContact(@PathVariable Map<String, String> var)
    {
        InitialContactSearchCriteriaDto initialContactSearchCriteriaDto=new InitialContactSearchCriteriaDto();
        initialContactSearchCriteriaDto.setClientName(
                ("null".equals(var.get("clientname"))
                        || var.get("clientname") == null) ?null:var.get("clientname"));


        initialContactSearchCriteriaDto.setFileNumber(("null".equals(var.get("fileNumber"))
                || var.get("fileNumber") == null) ?null:Long.parseLong(var.get("fileNumber")));

        initialContactSearchCriteriaDto.setCaseworker(
                ("null".equals(var.get("caseworker"))
                        || var.get("caseworker") == null) ?null:var.get("caseworker")
        );
        LocalDate dateTime=null;

        if(!"null".equals(var.get("startingDate"))) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            dateTime = LocalDate.parse(var.get("startingDate"), formatter);
        }
        initialContactSearchCriteriaDto.setStartingDate(dateTime);
        initialContactSearchCriteriaDto.setStatus(
                ("null".equals(var.get("status"))
                        || var.get("status") == null) ?null:var.get("status"));
        return initialContactSearchService.search(initialContactSearchCriteriaDto);
    }
    @GetMapping(value = "/readAllContactNotes/{contactNotesId}", produces = "application/json")
    @ApiOperation("Read Identitys")
    @ResponseStatus(HttpStatus.OK)
    public InitialContactContactNotesDto readAllContactNotes(@PathVariable("contactNotesId") Long contactNotesId) {
        return initialContactContactNotesService.readAllContactNotes(contactNotesId);
    }
    @PutMapping(value = "/saveAllContactNotes", produces = "application/json")
    @ApiOperation("Save or Update Identity")
    @ResponseStatus(HttpStatus.OK)
    public InitialContactContactNotesDto saveAllContactNotes(@RequestBody InitialContactContactNotesDto initialContactContactNotesDto) {
        return initialContactContactNotesService.saveAllContactNotes(initialContactContactNotesDto);
    }
    @GetMapping(value = {"/searchContactNotes/{data}"},produces = "application/json")
    @ApiOperation("Search InitialContact")
    @ResponseStatus(HttpStatus.OK)
    public List<InitialContactContactNotesSearchResultsDto> searchInitialContactContactNotes(@PathVariable Map<String, String> var)
    {
        InitialContactContactNotesSearchCriteriaDto contactNotesSearchCriteriaDto=new InitialContactContactNotesSearchCriteriaDto();

        contactNotesSearchCriteriaDto.setData(
                ("null".equals(var.get("data"))
                        || var.get("data") == null) ?null:var.get("data"));
        return initialContactContactNotesSearchService.search(contactNotesSearchCriteriaDto);
    }
    @DeleteMapping("/removeContactNotes/{contactNotesId}")
    @ApiOperation("Remove Contact Notes")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity removeContactNotes(@PathVariable("contactNotesId") Long contactNotesId) {
        return initialContactContactNotesService.removeContactNotes(contactNotesId);
    }

    @GetMapping(value = {"/InitialContactsClientSearch/{data}"},produces = "application/json")
    @ApiOperation("Search icClientSearch")
    @ResponseStatus(HttpStatus.OK)
    public List<InitialContactClientSearchResultsDto> searchInitialContactClient(@PathVariable Map<String, String> var)
    {
        InitialContactClientSearchCriteriaDto initialContactClientSearchCriteriaDto=new InitialContactClientSearchCriteriaDto();
        initialContactClientSearchCriteriaDto.setData(
                ("null".equals(var.get("data"))
                        || var.get("data") == null) ?null:var.get("data"));
        return initialContactClientSearchService.searchData(initialContactClientSearchCriteriaDto);
    }
}
