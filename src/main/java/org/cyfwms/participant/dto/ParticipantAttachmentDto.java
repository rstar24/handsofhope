package org.cyfwms.participant.dto;

import lombok.*;
import org.cyfwms.common.entity.Attachment;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ParticipantAttachmentDto {
    private Long participantAttachmentId;
    private Long participantId;
    private Attachment attachment;
    private String status;
    private LocalDateTime lastwritten;
    private String attachmentType;
}
