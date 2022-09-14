package com.twn.cyfwms.CulturalProgram.dto;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class ParticipantCultureProgSearchResultsDto {

    @Getter @Setter
    private Long participantCulturalProId;
    @Getter @Setter
    private Long culturalProgramId;
    @Getter @Setter
    private String participant;
    @Getter @Setter
    private String role;
    @Getter @Setter
    private String notes;

    public ParticipantCultureProgSearchResultsDto(Long participantCulturalProId, Long culturalProgramId, String participant, String role, String notes) {
        this.participantCulturalProId = participantCulturalProId;
        this.culturalProgramId = culturalProgramId;
        this.participant = participant;
        this.role = role;
        this.notes = notes;
    }
}
