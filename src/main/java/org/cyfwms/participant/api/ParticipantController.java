package org.cyfwms.participant.api;

import org.cyfwms.common.dto.AppointmentDto;
import org.cyfwms.initialcontact.dto.ICContactNotesDto;
import org.cyfwms.initialcontact.dto.ICContactNotesSearchCriteriaDto;
import org.cyfwms.initialcontact.dto.ICContactNotesSearchResultsDto;
import org.cyfwms.participant.dto.*;
import org.cyfwms.participant.service.*;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.GsonBuilderUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j(topic = "Participant_Controller")
@AllArgsConstructor
@RequestMapping("/v1/participantservice")
@CrossOrigin("*")
public class ParticipantController {
    @Autowired
    private ParticipantService participantService;

    @Autowired
    private ParticipantOtherInformationService participantOtherInformationService;

    @Autowired
    private CounselorCFSWorkerService counselorCFSWorkerService;

    @Autowired
    private ParticipantContactService participantContactService;

    @Autowired
    private HouseholdMemberService householdMemberService;

    @Autowired
    private CriminalHistoryService criminalHistoryService;

    @Autowired
    private EducationAndEmploymentService educationAndEmploymentService;

    @Autowired
    private FamilyPhysicianService familyPhysicianService;

    @Autowired
    private ParticipantSearchService participantSearchService;

    @Autowired
    private ParticipantAppointmentService participantAppointmentService;

    @Autowired
    private ParticipantCommonDataService participantCommonDataService;

    @Autowired
    private ParticipantContactNotesSearchService participantContactNotesSearchService;

    @GetMapping(value = "/readParticipantIdentity/{participantid}", produces = "application/json")
    @ApiOperation("Read Identity")
    @ResponseStatus(HttpStatus.OK)
    public ParticipantIdentityDto readParticipantIdentity(@PathVariable("participantid") Long participantId) {
        return participantService.readParticipantIdentity(participantId);
    }

    @PutMapping(value = "/saveParticipantIdentity", produces = "application/json")
    @ApiOperation("Save or Update Identity")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<ParticipantIdentityDto> saveParticipantIdentity(@RequestParam Map<String,String>params,@RequestParam(value="image",required = false)MultipartFile multipartFile) throws IOException {
        ParticipantIdentityDto participantIdentityDto = new ParticipantIdentityDto();
        mapParticipantFormData(participantIdentityDto, params);
        participantIdentityDto = participantService.saveParticipantIdentity(participantIdentityDto, multipartFile);
        return ResponseEntity.ok(participantIdentityDto);
    }

    @DeleteMapping("/removeParticipant/{referenceId}")
    @ApiOperation("Remove Participant")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void removeParticipant(@PathVariable("referenceId") Long referenceId) {
        participantService.removeParticipant(referenceId);
    }

    @GetMapping(value = "/readParticipantContact/{participantid}", produces = "application/json")
    @ApiOperation("Read Contact")
    @ResponseStatus(HttpStatus.OK)
    public ParticipantContactDto readParticipantContact(@PathVariable("participantid") Long participantId) {
        return participantContactService.readParticipantContact(participantId);
    }

    @PutMapping(value = "/saveParticipantContact", produces = "application/json")
    @ApiOperation("Save or Update Contact")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<ParticipantContactDto> saveParticipantContact(@RequestBody ParticipantContactDto ParticipantContactDto) {
        ParticipantContactDto participantContactDto =
                participantContactService.saveParticipantContact(ParticipantContactDto);
        return new ResponseEntity<>(participantContactDto, HttpStatus.CREATED);
    }

    @GetMapping(value = "/getAllHouseholdMembers/{participantid}", produces = "application/json")
    @ApiOperation("Read All Household Members")
    @ResponseStatus(HttpStatus.OK)
    public List<HouseholdMemberDto> getAllHouseholdMembers(@PathVariable("participantid") Long participantId) {
        return householdMemberService.getAllHouseholdMembers(participantId);
    }

    @PutMapping(value = "/saveAllHouseholdMembers", produces = "application/json")
    @ApiOperation("Save All Household Members")
    @ResponseStatus(HttpStatus.CREATED)
    public List<HouseholdMemberDto> saveAllHouseholdMembers(@RequestBody List<HouseholdMemberDto> HouseholdMemberDtoList) {
        return householdMemberService.saveAllHouseholdMembers(HouseholdMemberDtoList);
    }

    @DeleteMapping("/removeAddMoreHouseholdMember/{householdMemberId}")
    @ApiOperation("Remove Household Members")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<String> removeHouseholdMembers(@PathVariable("householdMemberId") Long householdMemberId) {
        householdMemberService.removeHouseholdMembers(householdMemberId);
        return new ResponseEntity("Operation Successful", HttpStatus.OK);
    }


    @GetMapping(value = "/readCriminalHistory/{participantid}", produces = "application/json")
    @ApiOperation("Read Criminal History")
    @ResponseStatus(HttpStatus.OK)
    public CriminalHistoryDto readCriminalHistory(@PathVariable("participantid") Long participantId) {
        return criminalHistoryService.readCriminalHistory(participantId);
    }

    @PutMapping(value = "/saveCriminalHistory", produces = "application/json")
    @ApiOperation("Save or Update Criminal History")
    @ResponseStatus(HttpStatus.CREATED)
    public CriminalHistoryDto saveCriminalHistory(@RequestBody CriminalHistoryDto criminalHistoryDto) {
        return criminalHistoryService.saveCriminalHistory(criminalHistoryDto);
    }

    @DeleteMapping("/removeAddMoreCriminalHistory/{criminalhistoryrecordid}")
    @ApiOperation("Remove Criminal History Record")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity criminalHistoryRecord( @PathVariable("criminalhistoryrecordid") Long criminalHistoryRecordId) {
        criminalHistoryService.removeCriminalHistoryRecord(criminalHistoryRecordId);
        return new ResponseEntity("Operation Successful", HttpStatus.OK);
    }

    @GetMapping(value = "/getAllFamilyPhysicians/{participantid}", produces = "application/json")
    @ApiOperation("Read All Family Physicians")
    @ResponseStatus(HttpStatus.OK)
    public List<FamilyPhysicianDto> getAllFamilyPhysicians(@PathVariable("participantid") Long participantId) {
        return familyPhysicianService.getAllFamilyPhysicians(participantId);
    }

    @PutMapping(value = "/saveAllFamilyPhysicians", produces = "application/json")
    @ApiOperation("Save All Family Physicians")
    @ResponseStatus(HttpStatus.CREATED)
    public List<FamilyPhysicianDto> saveAllFamilyPhysicians(@RequestBody List<FamilyPhysicianDto> FamilyPhysicianDtoList) {
        return familyPhysicianService.saveAllFamilyPhysicians(FamilyPhysicianDtoList);
    }

    @DeleteMapping("/removeAddMoreFamilyPhysician/{familyPhysicianId}")
    @ApiOperation("Remove Family Physicians")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void removeFamilyPhysician(@PathVariable("familyPhysicianId") Long familyPhysicianId) {
        familyPhysicianService.removeFamilyPhysician(familyPhysicianId);
    }
    @GetMapping(value = "/getAllCounselorCFSWorkers/{participantid}", produces = "application/json")
    @ApiOperation("Read All Counselor CFS Workers")
    @ResponseStatus(HttpStatus.OK)
    public List<CounselorCFSWorkersDto> getAllCounselorCFSWorkers(@PathVariable("participantid") Long participantId) {
        return counselorCFSWorkerService.getAllCounselorCFSWorkers(participantId);
    }

    @PutMapping(value = "/saveAllCounselorCFSWorkers", produces = "application/json")
    @ApiOperation("Save All Counselor CFS Workers")
    @ResponseStatus(HttpStatus.OK)
    public List<CounselorCFSWorkersDto> saveAllCounselorCFSWorkers(@RequestBody List<CounselorCFSWorkersDto> FamilyPhysicianDtoList) {
        return counselorCFSWorkerService.saveAllCounselorCFSWorkers(FamilyPhysicianDtoList);
    }

    @DeleteMapping("/removeAddMoreCounselorCFSWorker/{counselorcfsworkerid}")
    @ApiOperation("Remove Counselor CFS Workers")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void removeCounselorCFSWorker(@PathVariable("counselorcfsworkerid") Long counselorCFSWorkerId) {
        counselorCFSWorkerService.removeCounselorCFSWorker(counselorCFSWorkerId);
    }

    @GetMapping(value = "/readParticipantOtherInformation/{participantid}", produces = "application/json")
    @ApiOperation("Read ParticipantOtherInformation")
    @ResponseStatus(HttpStatus.OK)
    public ParticipantOtherInformationServiceDto readParticipantOtherInformation(@PathVariable("participantid") Long participantId) {
        return participantOtherInformationService.readParticipantOtherInformation(participantId);
    }

    @PutMapping(value = "/saveParticipantOtherInformation", produces = "application/json")
    @ApiOperation("Save ParticipantOtherInformation")
    @ResponseStatus(HttpStatus.OK)
    public ParticipantOtherInformationServiceDto saveParticipantOtherInformation(@RequestBody ParticipantOtherInformationServiceDto participantOtherInformationServiceDto) {
        return participantOtherInformationService.saveParticipantOtherInformation(participantOtherInformationServiceDto);
    }

    @GetMapping(value = "/readEmploymentAndEducation/{participantid}", produces = "application/json")
    @ApiOperation("Read Participant Employement and Education")
    @ResponseStatus(HttpStatus.OK)
    public EducationAndEmploymentCompositeDto readEmploymentAndEducation(@PathVariable("participantid") Long participantId) {
        return educationAndEmploymentService.readEducationAndEmployment(participantId);
    }

    @PutMapping(value = "/saveEmploymentAndEducation", produces = "application/json")
    @ApiOperation("Save Participant Employment And Education")
    @ResponseStatus(HttpStatus.CREATED)
    public EducationAndEmploymentCompositeDto saveEmploymentAndEducation(@RequestBody EducationAndEmploymentCompositeDto educationAndEmploymentCompositeDto) {
        return educationAndEmploymentService.saveEducationAndEmployment(educationAndEmploymentCompositeDto);
    }

    @GetMapping(value = {"/searchParticipants/{referenceId}/{firstname}/{middleName}/{surname}/{dateOfBirth}/{maritalStatus}/{city}/{phoneNumber}"},produces = "application/json")
    @ApiOperation("Search Participants")
    @ResponseStatus(HttpStatus.OK)
      public List<ParticipantSearchResultsDto> searchParticipants(
              @PathVariable Map<String, String> var){
        ParticipantSearchCriteriaDto participantSearchCriteriaDto =
                getParticipantSearchCriteriaDto(var);
        return participantSearchService.search(participantSearchCriteriaDto);
    }

    private ParticipantSearchCriteriaDto getParticipantSearchCriteriaDto(Map<String, String> var) {
        ParticipantSearchCriteriaDto participantSearchCriteriaDto = new ParticipantSearchCriteriaDto();
        LocalDate dateTime=null;
        if(!"null".equals(var.get("dateOfBirth"))) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            dateTime = LocalDate.parse(var.get("dateOfBirth"), formatter);
        }
        participantSearchCriteriaDto.setFirstname(
                ("null".equals(var.get("firstname"))
                        || var.get("firstname") == null) ?null: var.get("firstname"));
        participantSearchCriteriaDto.setCity(
                ("null".equals(var.get("city"))
                       || var.get("city") == null) ?null: var.get("city"));
        participantSearchCriteriaDto.setDateOfBirth(dateTime);
        participantSearchCriteriaDto.setMaritalStatus(
                ("null".equals(var.get("maritalStatus"))
                        || var.get("maritalStatus") == null) ?null: var.get("maritalStatus"));
        participantSearchCriteriaDto.setSurname(
                ("null".equals(var.get("surname"))
                        || var.get("surname") == null) ?null: var.get("surname"));
        participantSearchCriteriaDto.setMiddleName(
                ("null".equals(var.get("middleName"))
                        || var.get("middleName") == null) ?null: var.get("middleName"));
        participantSearchCriteriaDto.setPhoneNumber(
                ("null".equals(var.get("phoneNumber"))
                        || var.get("phoneNumber") == null) ?null: var.get("phoneNumber"));

        participantSearchCriteriaDto.setReferenceId(("null".equals(var.get("referenceId"))
             || var.get("referenceId") == null) ?null:Long.parseLong(var.get("referenceId")));
        return participantSearchCriteriaDto;
    }

    @GetMapping(value = "/readAllOutputParticipant/{referenceId}", produces = "application/json")
    @ApiOperation("Read All Output Participant")
    @ResponseStatus(HttpStatus.OK)
    public ParticipantCommonDataDto readAllOutPutParticipant(@PathVariable("referenceId") Long referenceId) {
        return participantCommonDataService.readParticipantCommonData(referenceId);
    }

    private void mapParticipantFormData(ParticipantIdentityDto participantIdentityDto,
        Map<String,String> params){
        long participantId = 0;
        if(params.get("participantId") != null &&
                !params.get("participantId").equals("undefined")
                && params.get("participantId").length() > 0) {
            participantId = Long.parseLong(params.get("participantId"));
        }
        participantIdentityDto.setParticipantId(participantId);
        participantIdentityDto.setFirstname(params.get("firstName"));
        participantIdentityDto.setMiddleName(params.get("middleName"));
        participantIdentityDto.setSurname(params.get("lastName"));
        participantIdentityDto.setDateOfBirth(LocalDate.parse(params.get("dateOfBirth")));
        participantIdentityDto.setGender(params.get("gender"));
        participantIdentityDto.setMaritalStatus(params.get("maritalStatus"));

    }

    @PutMapping(value = "/saveParticipantAppointment", produces = "application/json")
    @ApiOperation("Save or Update Participant Appointment Informtion")
    @ResponseStatus(HttpStatus.CREATED)
    public ParticipantAppointmentDto saveParticipantAppointment(@RequestBody ParticipantAppointmentDto  ParticipantAppointmentDto) {
        return participantAppointmentService.saveParticipantAppointment(ParticipantAppointmentDto);

    }

    @DeleteMapping("/deleteParticipantAppointment/{ParticipantAppointmentId}")
    @ApiOperation("Remove Counselor CFS Workers")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void removeParticipantAppointment(@PathVariable("ParticipantAppointmentId") Long ParticipantAppointmentId) {
        participantAppointmentService.removeParticipantAppointment(ParticipantAppointmentId);
    }


    @GetMapping(value = {"/searchContactNotes/{participantid}/{data}"},produces = "application/json")
    @ApiOperation("Search Participant")
    @ResponseStatus(HttpStatus.OK)
    public List<ParticipantContactNotesSearchResultsDto> searchParticipantContactNotes(@PathVariable Map<String, String> var)
    {
        ParticipantContactNotesSearchCriteriaDto iCContactNotesSearchCriteriaDto=new ParticipantContactNotesSearchCriteriaDto();
        iCContactNotesSearchCriteriaDto.setParticipantId(("null".equals(var.get("participantid"))
                ||var.get("participantid")==null) ? null:Long.parseLong(var.get("participantid")));
        iCContactNotesSearchCriteriaDto.setData(
                ("null".equals(var.get("data"))
                        || var.get("data") == null) ?null:var.get("data"));
        return participantContactNotesSearchService.search(iCContactNotesSearchCriteriaDto);
    }
    @GetMapping(value = "/readOneAppointment/{participantAppointmentId}", produces = "application/json")
    @ApiOperation("Read ContactNotes")
    @ResponseStatus(HttpStatus.OK)
    public ParticipantAppointmentDto readOneAppointment(@PathVariable("participantAppointmentId") Long participantAppointmentId) {

        return participantAppointmentService.readOneAppointment(participantAppointmentId);
    }


}
