package org.cyfwms.common.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDate;
import lombok.*;

@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
public class CalenderAppointmentDto {
	private Long appointmentId;
	private String subject;
	private String status;
	private LocalDate date;

	@Getter
	@Setter
	private Long participantId;

	@Getter
	@Setter
	private Long fileDetailsId;

	@Getter
	@Setter
	private Long cgProviderId;
}
