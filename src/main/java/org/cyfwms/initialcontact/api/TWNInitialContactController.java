package org.cyfwms.initialcontact.api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.cyfwms.initialcontact.dto.*;
import org.cyfwms.initialcontact.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
@RestController
@AllArgsConstructor
@RequestMapping("/v1/initialcontactservice")
@CrossOrigin("*")
public class TWNInitialContactController {
    @Autowired
    private ICFileDetailsService iCFileDetailsService;
    @Autowired
    private ICIncidentReportService iCIncidentReportService;
    @Autowired
    private ICPatientCareInfoService iCPatientCareInfoService;
    @Autowired
    private ICPresentConcernsService iCPresentConcernsService;
    @Autowired
    private ICReferralInfoService iCReferralInfoService;
    @Autowired
    private ICContactNotesService iCContactNotesService;
    @Autowired
    private ICContactNotesSearchService iCContactNotesSearchService;
    @Autowired
    private ICParticipantService icParticipantService;

    @GetMapping(value = "/readAllFileDetails/{filedetailsid}", produces = "application/json")
    @ApiOperation("Read Identity")
    @ResponseStatus(HttpStatus.OK)
    public ICFileDetailsDto readAllFileDetails(@PathVariable("filedetailsid") Long fileDetailsID) {
        return iCFileDetailsService.readAllFileDetails(fileDetailsID);
    }

    @PutMapping(value = "/saveAllFileDetails", produces = "application/json")
    @ApiOperation("Save or Update Identity")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ICFileDetailsDto> saveAllFileDetails(@RequestBody ICFileDetailsDto iCFileDetailsDto) {
        ICFileDetailsDto icFileDetailsDto=iCFileDetailsService.saveAllFileDetails(iCFileDetailsDto);
        return new ResponseEntity<>(icFileDetailsDto, HttpStatus.CREATED);
    }

    @GetMapping(value = "/readAllIncidentReports/{filedetailsid}", produces = "application/json")
    @ApiOperation("Read IncidentReports")
    @ResponseStatus(HttpStatus.OK)
    public ICIncidentReportDto readAllIncidentReports(@PathVariable("filedetailsid") Long fileDetailsID) {
        return iCIncidentReportService.readAllIncidentReports(fileDetailsID);
    }

    @PutMapping(value = "/saveAllIncidentReports", produces = "application/json")
    @ApiOperation("Save or Update IncidentReports")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ICIncidentReportDto> saveAllIncidentReports(@RequestBody ICIncidentReportDto iCIncidentReportDto) {
        iCIncidentReportDto= iCIncidentReportService.saveAllIncidentReports(iCIncidentReportDto);
        return new ResponseEntity<>(iCIncidentReportDto, HttpStatus.CREATED);
    }

    @GetMapping(value = "/readAllPatientCareInfo/{filedetailsid}", produces = "application/json")
    @ApiOperation("Read PatientCareInfo")
    @ResponseStatus(HttpStatus.OK)
    public ICPatientCareInfoDto readAllPatientCareInfo(@PathVariable("filedetailsid") Long fileDetailsID) {
        return iCPatientCareInfoService.readAllPatientCareInfo(fileDetailsID);
    }

    @PutMapping(value = "/saveAllPatientCareInfo", produces = "application/json")
    @ApiOperation("Save or Update PatientCareInfo")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ICPatientCareInfoDto> saveAllPatientCareInfo(@RequestBody ICPatientCareInfoDto iCPatientCareInfoDto) {
        iCPatientCareInfoDto=iCPatientCareInfoService.saveAllPatientCareInfo(iCPatientCareInfoDto);
        return new ResponseEntity<>(iCPatientCareInfoDto, HttpStatus.CREATED);
    }

    @GetMapping(value = "/readAllPresentConcerns/{filedetailsid}", produces = "application/json")
    @ApiOperation("Read PresentConcerns")
    @ResponseStatus(HttpStatus.OK)
    public ICPresentConcernsDto readPresentConcerns(@PathVariable("filedetailsid") Long fileDetailsID) {
        return iCPresentConcernsService.readPresentConcerns(fileDetailsID);
    }

    @PutMapping(value = "/saveAllPresentConcerns", produces = "application/json")
    @ApiOperation("Save or Update PresentConcerns")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ICPresentConcernsDto> savePresentConcerns(@RequestBody ICPresentConcernsDto iCPresentConcernsDto) {
        iCPresentConcernsDto=iCPresentConcernsService.savePresentConcerns(iCPresentConcernsDto);
        return new ResponseEntity<>(iCPresentConcernsDto, HttpStatus.CREATED);
    }

    @GetMapping(value = "/readAllReferralInfo/{filedetailsid}", produces = "application/json")
    @ApiOperation("Read ReferralInfo")
    @ResponseStatus(HttpStatus.OK)
    public ICReferralInfoDto readAllReferralInfo(@PathVariable("filedetailsid") Long fileDetailsID) {
        return iCReferralInfoService.readAllReferralInfo(fileDetailsID);
    }

    @PutMapping(value = "/saveAllReferralInfo", produces = "application/json")
    @ApiOperation("Save or Update ReferralInfo")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ICReferralInfoDto> saveAllReferralInfo(@RequestBody ICReferralInfoDto iCReferralInfoDto) {
        iCReferralInfoDto=iCReferralInfoService.saveAllReferralInfo(iCReferralInfoDto);
        return new ResponseEntity<>(iCReferralInfoDto, HttpStatus.CREATED);
    }

    @GetMapping(value = "/readAllContactNotes/{contactnotesid}", produces = "application/json")
    @ApiOperation("Read ContactNotes")
    @ResponseStatus(HttpStatus.OK)
    public ICContactNotesDto readContactNotes(@PathVariable("contactnotesid") Long contactNotesId) {
        return iCContactNotesService.readContactNotes(contactNotesId);
    }
    @PutMapping(value = "/saveAllContactNotes", produces = "application/json")
    @ApiOperation("Save or Update ContactNotes")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ICContactNotesDto> saveContactNotes(@RequestBody ICContactNotesDto iCContactNotesDto) {
        iCContactNotesDto=iCContactNotesService.saveContactNotes(iCContactNotesDto);
        return new ResponseEntity<>(iCContactNotesDto, HttpStatus.CREATED);
    }

    @GetMapping(value = {"/searchContactNotes/{filedetailsid}/{data}"},produces = "application/json")
    @ApiOperation("Search InitialContact")
    @ResponseStatus(HttpStatus.OK)
    public List<ICContactNotesSearchResultsDto> searchICContactNotes(@PathVariable Map<String, String> var)
    {
        ICContactNotesSearchCriteriaDto iCContactNotesSearchCriteriaDto=new ICContactNotesSearchCriteriaDto();
        iCContactNotesSearchCriteriaDto.setFileDetailsId(("null".equals(var.get("filedetailsid"))
                ||var.get("filedetailsid")==null) ? null:Long.parseLong(var.get("filedetailsid")));
        iCContactNotesSearchCriteriaDto.setData(
                ("null".equals(var.get("data"))
                        || var.get("data") == null) ?null:var.get("data"));
        return iCContactNotesSearchService.search(iCContactNotesSearchCriteriaDto);
    }

    @DeleteMapping("/removeContactNotes/{contactNotesId}")
    @ApiOperation("Remove Contact Notes")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> removeContactNotes(@PathVariable("contactNotesId") Long contactNotesId) {
         iCContactNotesService.removeContactNotes(contactNotesId);
        return new ResponseEntity("Operation Successful", HttpStatus.OK);
    }

    @GetMapping(value = "/readICParticipant/{filedetailsid}", produces = "application/json")
    @ApiOperation("Read ICParticipant")
    @ResponseStatus(HttpStatus.OK)
    public ICParticipantDto readICParticipant(@PathVariable("filedetailsid") Long fileDetailsId) {
        return icParticipantService.readICParticipant(fileDetailsId);
    }


    @PutMapping(value = "/saveICParticipant", produces = "application/json")
    @ApiOperation("Save or Update ICParticipant")
    @ResponseStatus(HttpStatus.OK)
    public ICParticipantDto saveICParticipant(@RequestBody ICParticipantDto iCParticipantDto) {
        return icParticipantService.saveICParticipant(iCParticipantDto);
    }

    @DeleteMapping("/removeICParticipant/{icparticipantid}")
    @ApiOperation("Remove ICParticipant")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> removeICParticipant(@PathVariable("icparticipantid") Long icParticipantId) {
        icParticipantService.removeICParticipant(icParticipantId);
        return new ResponseEntity("Operation Successful", HttpStatus.OK);
    }

}
