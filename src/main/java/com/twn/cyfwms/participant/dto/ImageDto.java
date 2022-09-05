package com.twn.cyfwms.participant.dto;
import lombok.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor

public class ImageDto {
    @Getter
    @Setter
    private long participantimageId;
    @Getter
    @Setter
    private byte[] image;
    @Getter
    @Setter
    private String name;
    @Getter
    @Setter
    private long participantId;
    @Getter
    @Setter
    private String type;
    @Getter
    @Setter
    private LocalDateTime uplodedDatedTime;
}
