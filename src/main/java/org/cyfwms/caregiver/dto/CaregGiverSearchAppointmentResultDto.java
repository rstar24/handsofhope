package org.cyfwms.caregiver.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDate;

@NoArgsConstructor
@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CaregGiverSearchAppointmentResultDto {
    @Getter
    @Setter
    private Long appointmentId;

    @Getter
    @Setter
    private Long id;

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
    private Long cgappointmentId;

    public CaregGiverSearchAppointmentResultDto(Long appointmentId, Long id, String subject, String status, LocalDate date,Long cgappointmentId) {
        this.appointmentId=appointmentId;
        this.id=id;
        this.subject=subject;
        this.status=status;
        this.date=date;
        this.cgappointmentId=cgappointmentId;

    }

}
