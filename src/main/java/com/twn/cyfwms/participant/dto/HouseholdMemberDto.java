package com.twn.cyfwms.participant.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
public class HouseholdMemberDto{
    @Getter @Setter
    private Long participantId;
    @Getter @Setter
    private Long householdMemberId;
    @Getter @Setter
    private String name;
    @Getter @Setter
    private String gender;
    @Getter @Setter
    private LocalDate dateOfBirth;
    @Getter @Setter
    private String residing;
}
