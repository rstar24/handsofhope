package org.cyfwms.caregiver.dto;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
public class ContactNotesDto {
    @Getter @Setter
    private Long cgContactNotesId;
    @Getter @Setter
    private LocalDate date;
    @Getter @Setter
    private LocalTime time;
    @Getter @Setter
    private String contactMethod;
    @Getter @Setter
    private String needsAddressed;
    @Getter @Setter
    private String summary;
    @Getter @Setter
    private String results;
    @Getter @Setter
    private String nextSteps;
    @Getter @Setter
    private String progressTowardsCP;
    @Getter @Setter
    private String additionalInfo;
    @Getter @Setter
    private Long cgProviderId;
}
