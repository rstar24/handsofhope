package org.cyfwms.common.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDate;
import lombok.*;

@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
public class CalenderReminderDto {
	private Long reminderId;
	private String subject;
	private String status;
	private LocalDate reminderDate;

	private Long participantId;

	private Long fileDetailsId;

	private Long cgProviderId;
}
