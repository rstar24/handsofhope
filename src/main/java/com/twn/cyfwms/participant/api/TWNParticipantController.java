package com.twn.cyfwms.participant.api;

import com.twn.cyfwms.participant.dto.*;
import com.twn.cyfwms.participant.service.*;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/v1/participantservice")
public class TWNParticipantController {

    @Autowired
    private ParticipantService participantService;
    @Autowired
    private ParticipantContactService participantContactService;
    @Autowired
    private HouseholdMemberService householdMemberService;
    @Autowired
    private EducationService educationService;
    @Autowired
    private EmploymentService employmentService;
    @Autowired
    CriminalHistoryService criminalHistoryService;

    @GetMapping(value = "/readParticipantIdentity/{participantid}", produces = "application/json")
    @ApiOperation("Read Identity")
    @ResponseStatus(HttpStatus.OK)
    public ParticipantIdentityDto readParticipantIdentity(@PathVariable("participantid") Long participantId) {
        return participantService.readParticipantIdentity(participantId);
    }

    @PutMapping(value = "/saveParticipantIdentity", produces = "application/json")
    @ApiOperation("Save or Update Identity")
    @ResponseStatus(HttpStatus.OK)
    public ParticipantIdentityDto saveParticipantIdentity(ParticipantIdentityDto participantRequestDto) {
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
    public ParticipantContactDto saveParticipantContact(ParticipantContactDto ParticipantContactDto) {
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
    public List<HouseholdMemberDto> saveAllHouseholdMembers(List<HouseholdMemberDto> HouseholdMemberDtoList) {
        return householdMemberService.saveAllHouseholdMembers(HouseholdMemberDtoList);
    }

    @GetMapping(value = "/readEducation/{participantid}", produces = "application/json")
    @ApiOperation("Read Education")
    @ResponseStatus(HttpStatus.OK)
    public EducationDto readEducation(@PathVariable("participantid") Long participantId) {
        return educationService.readEducation(participantId);
    }

    @PutMapping(value = "/saveEducation", produces = "application/json")
    @ApiOperation("Save or Update Education")
    @ResponseStatus(HttpStatus.OK)
    public EducationDto saveEducation(EducationDto educationDto) {
        return educationService.saveEducation(educationDto);
    }

    @GetMapping(value = "/readEmployment/{participantid}", produces = "application/json")
    @ApiOperation("Read Employment")
    @ResponseStatus(HttpStatus.OK)
    public EmploymentDto readEmployment(@PathVariable("participantid") Long participantId) {
        return employmentService.readEmployment(participantId);
    }

    @PutMapping(value = "/saveEmployment", produces = "application/json")
    @ApiOperation("Save or Update Employment")
    @ResponseStatus(HttpStatus.OK)
    public EmploymentDto saveEmployment(EmploymentDto employmentDto) {
        return employmentService.saveEmployment(employmentDto);
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
    public CriminalHistoryDto saveCriminalHistory(CriminalHistoryDto criminalHistoryDto) {
        return criminalHistoryService.saveCriminalHistory(criminalHistoryDto);
    }

}
