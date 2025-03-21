package org.cyfwms.caregiver.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import lombok.*;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContactNotesDto {
	@Getter
	@Setter
	private Long cgContactNotesId;

	@Getter
	@Setter
	private Long cgProviderId;

	@Getter
	@Setter
	private String name;

	@Getter
	@Setter
	private String worker;

	@Getter
	@Setter
	private LocalDate date;

	@Getter
	@Setter
	private LocalTime time;

	@Getter
	@Setter
	private String contactMethod;

	@Getter
	@Setter
	private String needAddress;

	@Getter
	@Setter
	private String summary;

	@Getter
	@Setter
	private String result;

	@Getter
	@Setter
	private String nextStep;

	@Getter
	@Setter
	private String casePlanProgress;

	@Getter
	@Setter
	private String additionalInformation;
}
