package com.twn.cyfwms.initialContact.dto;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
public class ReadAllOutputInitialContactDto {

    @Getter @Setter
    private InitialContactFileDetailsDto fileDetails;

    @Getter @Setter
    private InitialContactIncidentReportDto incidentReport;

    @Getter @Setter
    private InitialContactPatientCareInfoDto patientCareInformation;

    @Getter @Setter
    private InitialContactPresentConcernsDto presentConcerns;

    @Getter @Setter
    private InitialContactReferralInfoDto referralInformation;
}
