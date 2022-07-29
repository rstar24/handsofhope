package com.twn.cyfwms.initialContact.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDate;

@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)

@NoArgsConstructor
public class InitialContactSearchResultsDto {
    @Getter
    @Setter
    private String clientName;

    @Getter
    @Setter
    private Long fileNumber;

    @Getter
    @Setter
    private String caseworker;

    @Getter
    @Setter
    private LocalDate startingDate;

    @Getter
    @Setter
    private String status;

    @Getter
    @Setter
    private String typeOfPatient;

    public InitialContactSearchResultsDto(String clientName, Long fileNumber,String caseworker,LocalDate startingDate,String status, String typeOfPatient) {
        this.clientName = clientName;
        this.fileNumber = fileNumber;
        this.caseworker=caseworker;
        this.startingDate=startingDate;
        this.status=status;
        this.typeOfPatient=typeOfPatient;
    }


}
