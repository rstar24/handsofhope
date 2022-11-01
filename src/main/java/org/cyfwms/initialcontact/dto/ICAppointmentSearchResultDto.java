package org.cyfwms.initialcontact.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDate;
@NoArgsConstructor
@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ICAppointmentSearchResultDto {

    @Getter
    @Setter
    private Long appointmentId;

    @Getter
    @Setter
    private Long fileDetailsId;

    @Getter
    @Setter
    private String subject;

    @Getter
    @Setter
    private String status;

    @Getter
    @Setter
    private LocalDate date;
    @Getter
    @Setter
    private Long icappointmentId;

    public ICAppointmentSearchResultDto(Long appointmentId, Long fileDetailsId, String subject, String status, LocalDate date,Long icappointmentId) {
        this.appointmentId=appointmentId;
        this.fileDetailsId=fileDetailsId;
        this.subject=subject;
        this.status=status;
        this.date=date;
        this.icappointmentId=icappointmentId;

    }


}
