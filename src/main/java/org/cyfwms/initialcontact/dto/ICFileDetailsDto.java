package org.cyfwms.initialcontact.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDate;
import lombok.*;

@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
public class ICFileDetailsDto {
	@Getter
	@Setter
	private Long fileDetailsId = 0L;

	@Getter
	@Setter
	private String clientName;

	@Getter
	@Setter
	private String caseworker;

	@Getter
	@Setter
	private Long fileNumber;

	@Getter
	@Setter
	private LocalDate startingDate;

	@Getter
	@Setter
	private LocalDate dateClosed;

	@Getter
	@Setter
	private String status;

	@Getter
	@Setter
	private Long participantId;
}
