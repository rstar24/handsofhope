package org.cyfwms.participant.repository;

import org.cyfwms.participant.entity.ParticipantAttachment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ParticipantAttachmentRepo extends JpaRepository<ParticipantAttachment, Long>{

    List<ParticipantAttachment>
            findByParticipantIdAndAttachmentTypeAndStatus(Long id,
                                                           String attachmentType, String status);

}
