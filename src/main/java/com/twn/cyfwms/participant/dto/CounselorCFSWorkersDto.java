package com.twn.cyfwms.participant.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
public class CounselorCFSWorkersDto {
    @Getter
    @Setter
    private Long participantId;

    @Getter
    @Setter
    private Long counselorCFSWorkerId;
    @Getter @Setter
    private String role;

    @Getter @Setter
    private String name;

    @Getter @Setter
    private String contactInformation;
}
