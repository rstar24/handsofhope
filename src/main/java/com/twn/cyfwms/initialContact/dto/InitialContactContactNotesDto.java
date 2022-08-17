package com.twn.cyfwms.initialContact.dto;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
public class InitialContactContactNotesDto {
    @Getter
    @Setter
    private Long fileDetailsId;
    @Getter
    @Setter
    private Long contactNotesId;

    @Getter
    @Setter
    private String name;

    @Getter
    @Setter
    private String worker;

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
