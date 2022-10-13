package org.cyfwms.participant.service;

import org.cyfwms.participant.dto.ParticipantAttachmentDto;
import org.cyfwms.participant.entity.ParticipantAttachment;
import lombok.AllArgsConstructor;
import org.cyfwms.participant.repository.ParticipantAttachmentRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ParticipantAttachmentServiceImpl implements ParticipantAttachmentService {

    @Autowired
    private ParticipantAttachmentRepo participantAttachmentRepo;

    @Override
    public ParticipantAttachmentDto readParticipantAttachmentByTypeAndStatus(
            Long participantId, String attachmentType, String status){
        ParticipantAttachmentDto participantAttachmentDto =
                new ParticipantAttachmentDto();
        List<ParticipantAttachment> participantAttachList = participantAttachmentRepo
                .findByParticipantIdAndAttachmentTypeAndStatus(
                        participantId, attachmentType, status);

        if(!participantAttachList.isEmpty()){
            BeanUtils.copyProperties(
                    participantAttachList.get(0), participantAttachmentDto);

        }
        return participantAttachmentDto;
    }

    @Override
    public ParticipantAttachmentDto saveParticipantAttachment(ParticipantAttachmentDto participantAttachmentDto) {
        ParticipantAttachment participantAttachment = new ParticipantAttachment();
        BeanUtils.copyProperties(participantAttachmentDto, participantAttachment);
        participantAttachment = participantAttachmentRepo.save(participantAttachment);
        participantAttachmentDto.setParticipantAttachmentId(
                participantAttachment.getParticipantAttachmentId());
        participantAttachmentDto.setAttachment(participantAttachment.getAttachment());
        return participantAttachmentDto;
    }
}
