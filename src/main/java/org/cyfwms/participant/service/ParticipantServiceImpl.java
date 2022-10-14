package org.cyfwms.participant.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cyfwms.common.entity.Attachment;
import org.cyfwms.common.exception.I18Constants;
import org.cyfwms.common.exception.MessageUtil;
import org.cyfwms.common.exception.NoSuchElementFoundException;
import org.cyfwms.common.util.ReferenceIDGeneratorUtil;
import org.cyfwms.participant.dto.ParticipantAttachmentDto;
import org.cyfwms.participant.dto.ParticipantIdentityDto;
import org.cyfwms.participant.entity.Participant;
import org.cyfwms.participant.entity.ParticipantAttachment;
import org.cyfwms.participant.repository.ParticipantRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.*;

@Service
@AllArgsConstructor
@Slf4j
public class ParticipantServiceImpl implements ParticipantService {
    @Autowired
    private ParticipantRepository participantRepository;
    @Autowired
    private ParticipantAttachmentService participantAttachmentService;
    @Autowired
    private MessageUtil messageUtil;
    @Autowired
    private ReferenceIDGeneratorUtil referenceIDGeneratorUtil;

    @Override
    public ParticipantIdentityDto readParticipantIdentity(Long participantId) {
        log.info("Reading readParticipantIdentity");
        ParticipantIdentityDto participantIdentityDto = new ParticipantIdentityDto();
        if (participantId != 0) {
            Participant participant = readParticipant(participantId);
            ParticipantAttachmentDto participantAttachmentDto =
                    new ParticipantAttachmentDto();
            Optional<ParticipantAttachment> participantAttachmentOpt =
                    participant.getParticipantAttachmentList()
                            .stream()
                            .filter(attachment ->
                                    attachment.getAttachmentType().equals("PARTICIPANT_PROFILE_PIC") &&
                                            attachment.getStatus().equals("ACTIVE"))
                            .findFirst();
            if (participantAttachmentOpt.isPresent()) {
                BeanUtils.copyProperties(participantAttachmentOpt.get(),
                        participantAttachmentDto);
            }
            BeanUtils.copyProperties(participant,
                   participantIdentityDto);

            mapParticipantImageData(participantIdentityDto,
                    participantAttachmentDto);
        }
        log.info("Exit readParticipantIdentity");
        return participantIdentityDto;
    }

    private Participant readParticipant(Long participantId) {
        Participant participant = participantRepository.findById(
                participantId).orElseThrow(() ->
                new NoSuchElementFoundException(messageUtil.getLocalMessage(I18Constants.NO_ITEM_FOUND.getKey(), String.valueOf(participantId))));
        return participant;
    }

    private void mapParticipantImageData(
            ParticipantIdentityDto participantIdentityDto,
                ParticipantAttachmentDto participantAttachmentDto){
        participantIdentityDto.setParticipantImageId(
                participantAttachmentDto.getParticipantAttachmentId());
        participantIdentityDto.setParticipantImageName(
                participantAttachmentDto.getAttachment().getAttachmentName());
        participantIdentityDto.setImage(
                participantAttachmentDto.getAttachment().getAttachmentContents());
        participantIdentityDto.setParticipantImageType(
               participantAttachmentDto.getAttachmentType());
    }

    @Override
    public ParticipantIdentityDto saveParticipantIdentity(ParticipantIdentityDto participantIdentityDto, MultipartFile multipartFile) throws IOException {
        Participant participant = null;
        List<ParticipantAttachment> participantAttachmentList = null;
        if(multipartFile != null) {
            validateParticipantImage(multipartFile);
            ParticipantAttachmentDto participantAttachmentDto =
                    populateParticipantAttachmentData(multipartFile);
            if(participantAttachmentDto != null){
                ParticipantAttachment participantAttachment =
                        new ParticipantAttachment();
                BeanUtils.copyProperties(participantAttachmentDto,
                        participantAttachment);
                participantAttachmentList = new ArrayList<>();
                participantAttachmentList.add(participantAttachment);
            }
        }
        long participantID = participantIdentityDto.getParticipantId();
        if (participantID == 0) {
            participant = new Participant();
            BeanUtils.copyProperties(participantIdentityDto, participant);
            participant.setType("CYFM");
            participant.setStatus("ACTIVE");
            participant.setReferenceId(
                    referenceIDGeneratorUtil.generateParticipantReferenceID());
        }
        else {
            participant = readParticipant(participantID);
            BeanUtils.copyProperties(participantIdentityDto, participant);
            participant.setParticipantId(participantID);
        }
        if(participantAttachmentList != null){
            participant.setParticipantAttachmentList(participantAttachmentList);
        }
        participant = participantRepository.save(participant);
        participantIdentityDto.setParticipantId(participant.getParticipantId());
        participantIdentityDto.setReferenceId(participant.getReferenceId());
        return participantIdentityDto;
    }

    private void validateParticipantImage(MultipartFile multipartFile) {
        boolean invalidParticipantImage = true;
        if (multipartFile.getContentType().equals("image/jpg")
                || multipartFile.getContentType().equals("image/png")
                || multipartFile.getContentType().equals("image/jpeg")) {
            invalidParticipantImage = false;
        }
        if(invalidParticipantImage){
            throw new ResponseStatusException(
                    INTERNAL_SERVER_ERROR,"JPG PNG and JPEG content type are allowed");
        }
    }


    private ParticipantAttachmentDto populateParticipantAttachmentData(
                           MultipartFile multipartFile) throws IOException {
        ParticipantAttachmentDto participantAttachmentDto = null;
        if(multipartFile !=null){
            participantAttachmentDto = new ParticipantAttachmentDto();
            Attachment attachment = new Attachment();
            attachment.setAttachmentName(multipartFile.getOriginalFilename());
            attachment.setDocumentType(multipartFile.getContentType());
            attachment.setAttachmentContents(multipartFile.getBytes());
            attachment.setAttachmentStatus("ACTIVE");
            participantAttachmentDto.setAttachment(attachment);
            participantAttachmentDto.setAttachmentType("PARTICIPANT_PROFILE_PIC");
            participantAttachmentDto.setStatus("ACTIVE");
        }
        return participantAttachmentDto;
    }

    @Override
    public ResponseEntity<String> removeParticipant(Long referenceId) {
        Optional<Participant> p = participantRepository.findByReferenceId(referenceId);
        if (!p.isPresent() || p.get().getStatus().equalsIgnoreCase("INACTIVE")) {
            return new ResponseEntity<String>("Participant not found!", NOT_FOUND);
        }
        p.get().setStatus("INACTIVE");
        participantRepository.save(p.get());
        return new ResponseEntity<String>(OK);
    }
}
