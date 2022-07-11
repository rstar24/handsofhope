package com.twn.cyfwms.participant.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.twn.cyfwms.participant.entity.CriminalHistoryRecord;
import lombok.*;
import java.util.List;

@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
public class CriminalHistoryDto{
    @Getter @Setter
    private Long participantId;

    @Getter @Setter
    private Long criminalHistoryId;

    @Getter @Setter
    private List<CriminalHistoryRecord> criminalHistoryRecordList;

    @Getter @Setter
    private boolean probation;

    @Getter @Setter
    private boolean parole;

    @Getter @Setter
    private String conditions;

    @Getter @Setter
    private String courtWorkerAndContactInfo;
}
