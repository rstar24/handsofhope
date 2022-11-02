package org.cyfwms.participant.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDate;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor

public class ParticipantReminderSearchResultsDto {

    @Getter
    @Setter
    private Long reminderId;

    @Getter
    @Setter
    private Long participantId;

    @Getter
    @Setter
    private String assignedTo;

    @Getter
    @Setter
    private String regarding;

    @Getter
    @Setter
    private String subject;
    @Getter
    @Setter
    private String frequency;
    @Getter
    @Setter
    private String status;
    @Getter
    @Setter
    private String description;

    @Getter
    @Setter
    private LocalDate reminderDate;
    @Getter
    @Setter
    private LocalDate endDate;


    public ParticipantReminderSearchResultsDto(Long participantId,Long reminderId,String subject, String regarding,String assignedTo,String frequency,String description, String status, LocalDate reminderDate,LocalDate endDate) {
       this.participantId=participantId;
        this.reminderId=reminderId;
        this.subject=subject;
        this.status=status;
        this.assignedTo=assignedTo;
        this.description=description;
        this.frequency=frequency;
        this.regarding=regarding;
        this.reminderDate=reminderDate;
        this.endDate=endDate;

    }
}
