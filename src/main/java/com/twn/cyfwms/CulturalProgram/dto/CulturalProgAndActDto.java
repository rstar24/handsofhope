package com.twn.cyfwms.CulturalProgram.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import java.time.LocalDate;

@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
public class CulturalProgAndActDto {

    @Getter @Setter
    private Long CulturalProgramId;
    @Getter @Setter
    private Long referenceId;
    @Getter @Setter
    private String Name;
    @Getter @Setter
    private String Type;
    @Getter @Setter
    private String  Status;
    @Getter @Setter
    private String  Caseworker;
    @Getter @Setter
    private LocalDate StartDate;
    @Getter @Setter
    private LocalDate EndDate;
    @Getter @Setter
    private String TotalCost;
    @Getter @Setter
    private String TotalParticipation;
    @Getter @Setter
    private String SessionDetails;
    @Getter @Setter
    private String CostOrParticipationDetails;
    @Getter @Setter
    private String Outcomes;
    @Getter @Setter
    private String Notes;
}
