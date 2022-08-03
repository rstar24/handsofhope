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
public class ParticipantOtherInformationServiceDto {
    @Getter @Setter
    private Long participantOtherInfoId;
    @Getter @Setter
    private Long participantId;
    @Getter @Setter
    private String strength;
    @Getter @Setter
    private String weakness;
    @Getter @Setter
    private String skills;
    @Getter @Setter
    private String experiences;
    @Getter @Setter
    private String effectiveCopingSkills;
    @Getter @Setter
    private LocalDate startDate;
    @Getter @Setter
    private LocalDate endDate;

}
