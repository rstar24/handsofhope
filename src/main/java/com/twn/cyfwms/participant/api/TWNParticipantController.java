package com.twn.cyfwms.participant.api;

import com.twn.cyfwms.participant.dto.*;
import com.twn.cyfwms.participant.entity.FamilyPhysician;
import com.twn.cyfwms.participant.service.*;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
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

    @GetMapping(value = "/readParticipantIdentity/{participantid}", produces = "application/json")
    @ApiOperation("Read Identity")
    @ResponseStatus(HttpStatus.OK)
    public ParticipantIdentityDto readParticipantIdentity(@PathVariable("participantid") Long participantId) {
        return participantService.readParticipantIdentity(participantId);
    }

    @PutMapping(value = "/saveParticipantIdentity", produces = "application/json")
    @ApiOperation("Save or Update Identity")
    @ResponseStatus(HttpStatus.OK)
    public ParticipantIdentityDto saveParticipantIdentity(@RequestBody ParticipantIdentityDto participantRequestDto) {
        return participantService.saveParticipantIdentity(participantRequestDto);
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


    @GetMapping(value = {"/searchParticipants/{firstname}/{surname}/{middleName}/{dateOfBirth}/{maritalStatus}/{city}/{phoneNumber}"},produces = "application/json")
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
            participantSearchCriteriaDto.setFirstname(var.get("firstname"));
            participantSearchCriteriaDto.setCity(var.get("city"));
            participantSearchCriteriaDto.setDateOfBirth(dateTime);
            participantSearchCriteriaDto.setMaritalStatus(var.get("maritalStatus"));
            participantSearchCriteriaDto.setSurname(var.get("surname"));
            participantSearchCriteriaDto.setMiddleName(var.get("middleName"));
            participantSearchCriteriaDto.setPhoneNumber(var.get("phoneNumber"));

        return participantSearchService.search(participantSearchCriteriaDto);
    }


}
