package com.twn.cyfwms.initialContact.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.twn.cyfwms.initialContact.entity.PatientCareInfoInpatient;
import com.twn.cyfwms.initialContact.entity.PatientCareInfoOutpatient;
import lombok.*;

@AllArgsConstructor
@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class InitialContactPatientCareInfoDto {
    @Getter
    @Setter
    private Long fileDetailsId;

    @Getter
    @Setter
    private Long patientCareInfoId;

    @Getter
    @Setter
    private String typeOfPatient;

    @Getter
    @Setter
    private PatientCareInfoOutpatient outpatient;

    @Getter
    @Setter
    private PatientCareInfoInpatient inpatient;
}
