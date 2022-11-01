package org.cyfwms.caregiver.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDate;
@NoArgsConstructor
@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CareGiverSearchReminderResultDto {
    @Getter
    @Setter
    private Long reminderId;

    @Getter
    @Setter
    private Long cgReminderId;

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


    public CareGiverSearchReminderResultDto(Long reminderId, Long cgReminderId,String subject, String regarding,String assignedTo,String frequency,String description, String status, LocalDate reminderDate,LocalDate endDate) {
        this.reminderId=reminderId;
        this.cgReminderId=cgReminderId;
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
