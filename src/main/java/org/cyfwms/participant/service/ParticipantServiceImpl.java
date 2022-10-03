package org.cyfwms.participant.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cyfwms.common.exception.I18Constants;
import org.cyfwms.common.exception.MessageUtil;
import org.cyfwms.common.exception.NoSuchElementFoundException;
import org.cyfwms.participant.dto.ParticipantIdentityDto;
import org.cyfwms.participant.dto.ParticipantImageDto;
import org.cyfwms.participant.entity.Participant;
import org.cyfwms.participant.entity.ParticipantImage;
import org.cyfwms.participant.repository.ImageRepository;
import org.cyfwms.participant.repository.ParticipantRepository;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;

import static org.springframework.http.HttpStatus.*;

@Service
@AllArgsConstructor
@Slf4j
public class ParticipantServiceImpl implements ParticipantService {
    @Autowired
    private ParticipantRepository participantRepository;
    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private MessageUtil messageUtil;

    @Override
    public ParticipantIdentityDto readParticipantIdentity(Long participantId) {
        log.info("Reading Participant Identity.");
        if (participantId != 0) {
            ParticipantIdentityDto participantIdentityResponseDto = new ParticipantIdentityDto();
            Participant participant = readParticipant(participantId);
            ParticipantImage participantImage = readParticipantImage(participantId);
            if (participant != null) {
                if (!participant.getStatus().equals("INACTIVE")){
                   participantIdentityResponseDto.setParticipantId(participant.getParticipantId());
                   participantIdentityResponseDto.setFirstname(participant.getFirstname());
                   participantIdentityResponseDto.setMiddleName(participant.getMiddleName());
                   participantIdentityResponseDto.setSurname(participant.getSurname());
                   participantIdentityResponseDto.setDateOfBirth(participant.getDateOfBirth());
                   participantIdentityResponseDto.setGender(participant.getGender());
                   participantIdentityResponseDto.setMaritalStatus(participant.getMaritalStatus());
                   participantIdentityResponseDto.setReferenceId(participant.getReferenceId());
                   participantIdentityResponseDto.setParticipantImageId(participantImage.getParticipantimageId());
                   participantIdentityResponseDto.setParticipantImageName(participantImage.getParticipantImageName());
                   participantIdentityResponseDto.setType(participantImage.getParticipantImageType());
                   participantIdentityResponseDto.setImage(participantImage.getImage());

                }
                else {
                    throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
                }
            } else {
                throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
            }
            return participantIdentityResponseDto;
        }
        throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
    }

    private Participant readParticipant(Long participantId) {
        Participant participant = participantRepository.findById(
                participantId).orElseThrow(() ->
                new NoSuchElementFoundException(messageUtil.getLocalMessage(I18Constants.NO_ITEM_FOUND.getKey(), String.valueOf(participantId))));
        return participant;
    }

    private ParticipantImage readParticipantImage(Long participantid){
        ParticipantImage participantImage= new ParticipantImage();
        Optional<ParticipantImage> participantOpt=imageRepository.findByParticipantId(participantid);

        if(participantOpt.isPresent()){
            participantImage= participantOpt.get();

        }
        return participantImage;
    }

    @Override
    public ParticipantIdentityDto saveParticipantIdentity(ParticipantIdentityDto participantIdentityDto, MultipartFile multipartFile) throws IOException {

        ParticipantImageDto participantImageDto = new ParticipantImageDto();
        if(multipartFile!=null){
            participantImageDto.setImage(multipartFile.getBytes());
            participantImageDto.setParticipantImageName(multipartFile.getOriginalFilename());
            participantImageDto.setType(multipartFile.getContentType());
        }
        ParticipantImage participantImage = new ParticipantImage();
        Participant participant = null;

        if (participantIdentityDto.getParticipantId() == 0) {
            participant = new Participant();
            modelMapper.map(participantIdentityDto, participant);
            if(multipartFile!=null)
            {
                modelMapper.map(participantImageDto,participantImage);

            }
            participant.setType("CYFM");
            participant.setStatus("ACTIVE");
            Optional<Participant> particpantDetailsOpt = participantRepository.findTopByOrderByCreationDateTimeDesc();
            if (particpantDetailsOpt.isPresent()) {
                Participant participantDtls = particpantDetailsOpt.get();
                participant.setReferenceId(participantDtls.getReferenceId() + 128L);
            } else {
                participant.setReferenceId(128L);
            }
        }
        else {
            participant = readParticipant(participantIdentityDto.getParticipantId());
            modelMapper.map(participantIdentityDto,participant);
            if(multipartFile!=null){
                participantImage = readParticipantImage(participantIdentityDto.getParticipantId());
                participantImage.setParticipantId(participantIdentityDto.getParticipantId());
                participantImageDto.setParticipantimageId(participantImage.getParticipantimageId());
                modelMapper.map(participantImageDto,participantImage);
            }
        }
        participant = participantRepository.save(participant);
        participantIdentityDto.setParticipantId(participant.getParticipantId());
        if(multipartFile!=null) {
            if (multipartFile.getContentType().equals("image/jpg") || multipartFile.getContentType().equals("image/png") || multipartFile.getContentType().equals("image/jpeg")) {
                participantImage.setParticipantId(participantIdentityDto.getParticipantId());
                participantImage = imageRepository.save(participantImage);
                participantImageDto.setParticipantId(participantImage.getParticipantId());
                participantImageDto.setParticipantimageId(participantImage.getParticipantimageId());
                //participantIdentityDto.setParticipantImageDto(participantImageDto);
            }
            else {
                throw new ResponseStatusException(INTERNAL_SERVER_ERROR,"JPG PNG and JPEG content type are allowed");
            }

        }
        participantIdentityDto.setReferenceId(participant.getReferenceId());
        return participantIdentityDto;
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
