package org.cyfwms.participant.service;

import org.cyfwms.participant.dto.ParticipantAttachmentDto;

public interface ParticipantAttachmentService {
    ParticipantAttachmentDto saveParticipantAttachment(
            ParticipantAttachmentDto participantAttachmentDto);
    ParticipantAttachmentDto readParticipantAttachmentByTypeAndStatus(
            Long participantId, String attachmentType, String status);
}

