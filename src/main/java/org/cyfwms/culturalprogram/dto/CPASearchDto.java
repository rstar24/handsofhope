package org.cyfwms.culturalprogram.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDate;
import lombok.*;

@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
public class CPASearchDto {
	@Getter
	@Setter
	private Long referenceId;

	@Getter
	@Setter
	private String name;

	@Getter
	@Setter
	private String type;

	@Getter
	@Setter
	private String caseworker;

	@Getter
	@Setter
	private LocalDate startDate;

	@Getter
	@Setter
	private String status;
}
