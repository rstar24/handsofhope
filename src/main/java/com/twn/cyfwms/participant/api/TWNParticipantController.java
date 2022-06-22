package com.twn.cyfwms.participant.api;

import com.twn.cyfwms.participant.dto.ParticipantRequestDto;
import com.twn.cyfwms.participant.dto.ParticipantResponseDto;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/v1/participantservice")
public class TWNParticipantController {

    @GetMapping(value = "/saveIdentity", produces = "application/json")
    @ApiOperation("Save Indentity")
    @ResponseStatus(HttpStatus.OK)
    public ParticipantResponseDto saveParticipantIdentity(ParticipantRequestDto participantRequestDto) {

        return new ParticipantResponseDto();
    }
}
