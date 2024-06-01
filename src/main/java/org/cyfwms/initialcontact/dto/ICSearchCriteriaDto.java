package org.cyfwms.initialcontact.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDate;
import lombok.*;

@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
public class ICSearchCriteriaDto {
	@Getter
	@Setter
	private String clientName;

	@Getter
	@Setter
	private Long fileNumber;

	@Getter
	@Setter
	private String caseworker;

	@Getter
	@Setter
	private LocalDate startingDate;

	@Getter
	@Setter
	private String status;

	@Getter
	@Setter
	private String typeOfPatient;
}
