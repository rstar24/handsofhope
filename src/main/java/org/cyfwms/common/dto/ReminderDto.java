package org.cyfwms.common.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDate;
import lombok.*;

@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
public class ReminderDto {
	@Getter
	@Setter
	private Long reminderId;

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
	private String status;

	@Getter
	@Setter
	private LocalDate reminderDate;

	@Getter
	@Setter
	private LocalDate endDate;

	@Getter
	@Setter
	private String description;

	@Getter
	@Setter
	private String frequency;

	@Getter
	@Setter
	private Long participantId;
}
