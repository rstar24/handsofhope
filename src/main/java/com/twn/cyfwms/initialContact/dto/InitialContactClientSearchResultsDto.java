package com.twn.cyfwms.initialContact.dto;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class InitialContactClientSearchResultsDto {
    @Getter @Setter
    private Long participantId;
    @Getter @Setter
    private String firstname;
    @Getter @Setter
    private String surname;
    @Getter @Setter
    private Long referenceId;

    public InitialContactClientSearchResultsDto(Long participantId, String firstname, String surname, Long referenceId) {
        this.participantId = participantId;
        this.firstname = firstname;
        this.surname = surname;
        this.referenceId = referenceId;
    }
}
