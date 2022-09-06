package com.twn.cyfwms.CulturalProgram.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class CultureProgramSearchResultsDto {

    @Getter @Setter
    private Long participantId;
    @Getter @Setter
    private String firstname;
    @Getter @Setter
    private String surname;

    public CultureProgramSearchResultsDto(Long participantId, String firstname, String surname) {
        this.participantId = participantId;
        this.firstname = firstname;
        this.surname = surname;
    }
}
