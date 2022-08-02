package com.twn.cyfwms.initialContact.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDate;

@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
public class InitialContactSearchResultsDto {
    @Getter
    @Setter

    private Long fileDetailsId;
    @Getter
    @Setter
    private Long referenceId;
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

    @Getter
    @Setter
    private Long totalCount;


    public InitialContactSearchResultsDto(Long fileDetailsId,Long referenceId,String clientName, Long fileNumber,String caseworker,LocalDate startingDate,String status, String typeOfPatient  ) {
        this.fileDetailsId=fileDetailsId;
        this.clientName = clientName;
        this.fileNumber = fileNumber;
        this.caseworker=caseworker;
        this.startingDate=startingDate;
        this.status=status;
        this.typeOfPatient=typeOfPatient;
        this.referenceId=referenceId;
    }


}
