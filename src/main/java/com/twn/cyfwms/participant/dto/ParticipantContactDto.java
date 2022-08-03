package com.twn.cyfwms.participant.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import javax.persistence.Column;
import java.time.LocalDate;

@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
public class ParticipantContactDto {
    @Getter @Setter
    private Long participantId;
    @Getter @Setter
    private Long participantContactId;
    @Getter @Setter
    private String addressLine1;
    @Getter @Setter
    private String addressLine2;
    @Getter @Setter
    private String city;
    @Getter @Setter
    private String province;
    @Getter @Setter
    private String postalCode;
    @Getter @Setter
    private String homePhone;
    @Getter @Setter
    private String workPhone;
    @Getter @Setter
    private String cellPhone;
    @Getter @Setter
    private String emailAddress;
    @Getter @Setter
    private LocalDate startDate;
    @Getter @Setter
    private LocalDate endDate;

}
