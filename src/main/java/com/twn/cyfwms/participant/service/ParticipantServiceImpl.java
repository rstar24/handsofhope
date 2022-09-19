package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.ParticipantIdentityDto;
import com.twn.cyfwms.participant.dto.ParticipantImageDto;
import com.twn.cyfwms.participant.entity.Participant;
import com.twn.cyfwms.participant.entity.ParticipantImage;
import com.twn.cyfwms.participant.repository.ImageRepository;
import com.twn.cyfwms.participant.repository.ParticipantRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.Optional;

import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.OK;

@AllArgsConstructor
@Service
public class ParticipantServiceImpl implements ParticipantService {
    @Autowired
    private ParticipantRepository participantRepository;
    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ParticipantIdentityDto readParticipantIdentity(Long participantId) {
        if (participantId != 0) {
            ParticipantIdentityDto participantIdentityResponseDto = new ParticipantIdentityDto();
            Participant participant = readParticipant(participantId);
            if (participant != null) {
                if (!participant.getStatus().equals("INACTIVE")){
                    modelMapper.map(participant, participantIdentityResponseDto);

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
        Participant participant = null;
        Optional<Participant> participantOpt = participantRepository.findById(participantId);
        if (participantOpt.isPresent()) {
            participant = participantOpt.get();
        }
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
    public ParticipantIdentityDto saveParticipantIdentity(Map<String,String> params, MultipartFile multipartFile) throws IOException {

        Long participantId = Long.parseLong(params.get("participantId"));
        Long imageId = Long.parseLong(params.get("participantImageId"));
        String date = params.get("dateOfBirth");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate dateTime = LocalDate.parse(date, formatter);
        ParticipantIdentityDto participantIdentityDto = new ParticipantIdentityDto();
        participantIdentityDto.setParticipantId(participantId);
        participantIdentityDto.setFirstname(params.get("firstName"));
        participantIdentityDto.setMiddleName(params.get("middleName"));
        participantIdentityDto.setSurname(params.get("lastName"));
        participantIdentityDto.setDateOfBirth(dateTime);
        participantIdentityDto.setGender(params.get("gender"));
        participantIdentityDto.setMaritalStatus(params.get("maritalStatus"));
        ParticipantImageDto participantImageDto = new ParticipantImageDto();
        if(multipartFile!=null){
            String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
            participantImageDto.setParticipantimageId(imageId);
            participantImageDto.setImage(multipartFile.getBytes());
            participantImageDto.setParticipantImageName(multipartFile.getOriginalFilename());
            participantImageDto.setParticipantId(participantId);
            participantImageDto.setType(multipartFile.getContentType());

        }

        ParticipantImage participantImage = new ParticipantImage();
        Participant participant = null;

        if (participantIdentityDto.getParticipantId() ==0) {
            participant = new Participant();
            modelMapper.map(participantIdentityDto, participant);
            if(multipartFile!=null)
            {
           if( multipartFile.getContentType().equals("image/jpg")||multipartFile.getContentType().equals("image/png")||multipartFile.getContentType().equals("image/jpeg"))
           {
               modelMapper.map(participantImageDto,participantImage);
            }
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
            modelMapper.map(participantIdentityDto, participant);
            if(multipartFile!=null){
                participantImage = readParticipantImage(participantIdentityDto.getParticipantId());
                participantImage.setParticipantId(participantIdentityDto.getParticipantId());
                modelMapper.map(participantImageDto,participantImage);
            }
        }
        participant = participantRepository.save(participant);
        participantIdentityDto.setParticipantId(participant.getParticipantId());
        if(multipartFile!=null){
            participantImage.setParticipantId(participantIdentityDto.getParticipantId());
            imageRepository.save(participantImage);
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
