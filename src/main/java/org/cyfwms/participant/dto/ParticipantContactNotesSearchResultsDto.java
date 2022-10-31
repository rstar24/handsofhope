package org.cyfwms.participant.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class ParticipantContactNotesSearchResultsDto {
    @Getter
    @Setter
    private Long appointmentId;

    @Getter
    @Setter
    private Long participantId;

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
    private Long participantAppointmentId;

    public ParticipantContactNotesSearchResultsDto(Long appointmentId, Long participantId, String subject, String status, LocalDate date,Long participantAppointmentId) {
        this.appointmentId=appointmentId;
        this.participantId=participantId;
        this.subject=subject;
        this.status=status;
        this.date=date;
        this.participantAppointmentId=participantAppointmentId;

    }
}
