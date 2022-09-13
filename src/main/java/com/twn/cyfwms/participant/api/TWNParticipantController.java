package com.twn.cyfwms.participant.api;

import com.twn.cyfwms.participant.dto.*;
import com.twn.cyfwms.participant.entity.Participant;
import com.twn.cyfwms.participant.entity.ParticipantImage;
import com.twn.cyfwms.participant.service.*;
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
@RequestMapping("/v1/participantservice")
@CrossOrigin("*")
public class TWNParticipantController {
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
    private ReadAllOutputParticipantService readAllOutputParticipantService;

    @Autowired
    private LabelService labelService;

    @Autowired
    private ImageService imageService;

    @GetMapping(value = "/readParticipantIdentity/{participantid}", produces = "application/json")
    @ApiOperation("Read Identity")
    @ResponseStatus(HttpStatus.OK)
    public ParticipantIdentityDto readParticipantIdentity(@PathVariable("participantid") Long participantId) {
        return participantService.readParticipantIdentity(participantId);
    }

    @PutMapping(value = "/saveParticipantIdentity", produces = "application/json")
    @ApiOperation("Save or Update Identity")
    @ResponseStatus(HttpStatus.OK)
    public ParticipantIdentityDto saveParticipantIdentity(@RequestParam("participantDto")String participantIdentityDto,@RequestParam("image")MultipartFile file) throws IOException {
        return participantService.saveParticipantIdentity(participantIdentityDto,file);
    }

    @DeleteMapping("/removeParticipant/{referenceId}")
    @ApiOperation("Remove Participant")
    public ResponseEntity<String> removeParticipant(@PathVariable("referenceId") Long referenceId) {
        return participantService.removeParticipant(referenceId);
    }

    @GetMapping(value = "/readParticipantContact/{participantid}", produces = "application/json")
    @ApiOperation("Read Contact")
    @ResponseStatus(HttpStatus.OK)
    public ParticipantContactDto readParticipantContact(@PathVariable("participantid") Long participantId) {
        return participantContactService.readParticipantContact(participantId);
    }

    @PutMapping(value = "/saveParticipantContact", produces = "application/json")
    @ApiOperation("Save or Update Contact")
    @ResponseStatus(HttpStatus.OK)
    public ParticipantContactDto saveParticipantContact(@RequestBody ParticipantContactDto ParticipantContactDto) {
        return participantContactService.saveParticipantContact(ParticipantContactDto);
    }

    @GetMapping(value = "/getAllHouseholdMembers/{participantid}", produces = "application/json")
    @ApiOperation("Read All Household Members")
    @ResponseStatus(HttpStatus.OK)
    public List<HouseholdMemberDto> getAllHouseholdMembers(@PathVariable("participantid") Long participantId) {
        return householdMemberService.getAllHouseholdMembers(participantId);
    }

    @PutMapping(value = "/saveAllHouseholdMembers", produces = "application/json")
    @ApiOperation("Save All Household Members")
    @ResponseStatus(HttpStatus.OK)
    public List<HouseholdMemberDto> saveAllHouseholdMembers(@RequestBody List<HouseholdMemberDto> HouseholdMemberDtoList) {
        return householdMemberService.saveAllHouseholdMembers(HouseholdMemberDtoList);
    }

    @DeleteMapping("/removeAddMoreHouseholdMember/{householdMemberId}")
    @ApiOperation("Remove Household Members")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity removeHouseholdMembers(@PathVariable("householdMemberId") Long householdMemberId) {
        return householdMemberService.removeHouseholdMembers(householdMemberId);
    }


    @GetMapping(value = "/readCriminalHistory/{participantid}", produces = "application/json")
    @ApiOperation("Read Criminal History")
    @ResponseStatus(HttpStatus.OK)
    public CriminalHistoryDto readCriminalHistory(@PathVariable("participantid") Long participantId) {
        return criminalHistoryService.readCriminalHistory(participantId);
    }

    @PutMapping(value = "/saveCriminalHistory", produces = "application/json")
    @ApiOperation("Save or Update Criminal History")
    @ResponseStatus(HttpStatus.OK)
    public CriminalHistoryDto saveCriminalHistory(@RequestBody CriminalHistoryDto criminalHistoryDto) {
        return criminalHistoryService.saveCriminalHistory(criminalHistoryDto);
    }

    @DeleteMapping("/removeAddMoreCriminalHistory/{criminalhistoryrecordid}")
    @ApiOperation("Remove Criminal History Record")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity criminalHistoryRecord( @PathVariable("criminalhistoryrecordid") Long criminalHistoryRecordId) {
        return criminalHistoryService.removeCriminalHistoryRecord(criminalHistoryRecordId);
    }

    @GetMapping(value = "/getAllFamilyPhysicians/{participantid}", produces = "application/json")
    @ApiOperation("Read All Family Physicians")
    @ResponseStatus(HttpStatus.OK)
    public List<FamilyPhysicianDto> getAllFamilyPhysicians(@PathVariable("participantid") Long participantId) {
        return familyPhysicianService.getAllFamilyPhysicians(participantId);
    }

    @PutMapping(value = "/saveAllFamilyPhysicians", produces = "application/json")
    @ApiOperation("Save All Family Physicians")
    @ResponseStatus(HttpStatus.OK)
    public List<FamilyPhysicianDto> saveAllFamilyPhysicians(@RequestBody List<FamilyPhysicianDto> FamilyPhysicianDtoList) {
        return familyPhysicianService.saveAllFamilyPhysicians(FamilyPhysicianDtoList);
    }

    @DeleteMapping("/removeAddMoreFamilyPhysician/{familyPhysicianId}")
    @ApiOperation("Remove Family Physicians")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity removeFamilyPhysician(@PathVariable("familyPhysicianId") Long familyPhysicianId) {
        return familyPhysicianService.removeFamilyPhysician(familyPhysicianId);
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
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity removeCounselorCFSWorker(@PathVariable("counselorcfsworkerid") Long counselorCFSWorkerId) {
        return counselorCFSWorkerService.CounselorCFSWorker(counselorCFSWorkerId);
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
    @ResponseStatus(HttpStatus.OK)
    public EducationAndEmploymentCompositeDto saveEmploymentAndEducation(@RequestBody EducationAndEmploymentCompositeDto educationAndEmploymentCompositeDto) {
        return educationAndEmploymentService.saveEducationAndEmployment(educationAndEmploymentCompositeDto);
    }

    @GetMapping(value = {"/searchParticipants/{referenceId}/{firstname}/{middleName}/{surname}/{dateOfBirth}/{maritalStatus}/{city}/{phoneNumber}"},produces = "application/json")
    @ApiOperation("Search Participants")
    @ResponseStatus(HttpStatus.OK)
      public List<ParticipantSearchResultsDto> searchParticipants(@PathVariable Map<String, String> var)
    {
        ParticipantSearchCriteriaDto participantSearchCriteriaDto = new ParticipantSearchCriteriaDto();
        LocalDate dateTime=null;

        if(!"null".equals(var.get("dateOfBirth"))) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            dateTime = LocalDate.parse(var.get("dateOfBirth"), formatter);
        }
        participantSearchCriteriaDto.setFirstname(
                ("null".equals(var.get("firstname"))
                        || var.get("firstname") == null) ?null:var.get("firstname"));

        participantSearchCriteriaDto.setCity(
                ("null".equals(var.get("city"))
                       || var.get("city") == null) ?null:var.get("city"));


        participantSearchCriteriaDto.setDateOfBirth(dateTime);
        participantSearchCriteriaDto.setMaritalStatus(
                ("null".equals(var.get("maritalStatus"))
                        || var.get("maritalStatus") == null) ?null:var.get("maritalStatus"));

        participantSearchCriteriaDto.setSurname(
                ("null".equals(var.get("surname"))
                        || var.get("surname") == null) ?null:var.get("surname"));
        participantSearchCriteriaDto.setMiddleName(
                ("null".equals(var.get("middleName"))
                        || var.get("middleName") == null) ?null:var.get("middleName"));
        participantSearchCriteriaDto.setPhoneNumber(
                ("null".equals(var.get("phoneNumber"))
                        || var.get("phoneNumber") == null) ?null:var.get("phoneNumber"));

       participantSearchCriteriaDto.setReferenceId(("null".equals(var.get("referenceId"))
            || var.get("referenceId") == null) ?null:Long.parseLong(var.get("referenceId")));
        return participantSearchService.search(participantSearchCriteriaDto);
    }

  @ApiOperation("Read CYFMS view page label.")
  @GetMapping(value = "/readCyfmsLabels", produces = "application/json")
  @ResponseStatus(HttpStatus.OK)
  public LabelsDTO readCyfmsLabels() {
    return labelService.readLabels();
  }

    @GetMapping(value = "/readAllOutputParticipant/{referenceId}", produces = "application/json")
    @ApiOperation("Read All Output Participant")
    @ResponseStatus(HttpStatus.OK)
    public ReadAllOutputParticipantDto readAllOutPutParticipant(@PathVariable("referenceId") Long referenceId) {
        return readAllOutputParticipantService.readAllOutPutParticipant(referenceId);
    }

    @GetMapping("/files/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable Long id) {
        ParticipantImage fileDB = imageService.getFile(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDB.getParticipantImageName() + "\"")
                        .contentType(MediaType.valueOf(fileDB.getParticipantImageType()))
                .body(fileDB.getImage());
    }



}
