package com.twn.cyfwms.initialContact.dto;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class InitialContactContactNotesSearchResultsDto {
    @Getter
    @Setter
    private Long fileDetailsId;

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

    public InitialContactContactNotesSearchResultsDto(Long fileDetailsId,String name,String worker,String contactMethod,String needAddress,String summary,String result,String nextStep,String casePlanProgress,String additionalInformation ) {
        this.fileDetailsId=fileDetailsId;
        this.name=name;
        this.worker=worker;
        this.contactMethod = contactMethod;
        this.needAddress=needAddress;
        this.summary=summary;
        this.result=result;
        this.nextStep=nextStep;
        this.casePlanProgress=casePlanProgress;
        this.additionalInformation=additionalInformation;
    }
}
