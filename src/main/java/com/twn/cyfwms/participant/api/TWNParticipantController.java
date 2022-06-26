package com.twn.cyfwms.participant.api;

import com.twn.cyfwms.participant.dto.ParticipantContactDto;
import com.twn.cyfwms.participant.dto.ParticipantIdentityDto;
import com.twn.cyfwms.participant.service.ParticipantContactService;
import com.twn.cyfwms.participant.service.ParticipantService;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/v1/participantservice")
public class TWNParticipantController {

    @Autowired
    private ParticipantService participantService;
    @Autowired
    private ParticipantContactService participantContactService;

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
    public ParticipantContactDto saveParticipantContact(ParticipantContactDto participantContactDto) {
        return participantContactService.saveParticipantContact(participantContactDto);
    }


}
