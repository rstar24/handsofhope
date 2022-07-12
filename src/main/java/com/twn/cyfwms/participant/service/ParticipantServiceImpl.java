package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.ParticipantIdentityDto;
import com.twn.cyfwms.participant.entity.Participant;
import com.twn.cyfwms.participant.repository.ParticipantRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@AllArgsConstructor
public class ParticipantServiceImpl implements ParticipantService {
    @Autowired
    private ParticipantRepository participantRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ParticipantIdentityDto readParticipantIdentity(Long participantId) {
        ParticipantIdentityDto participantIdentityResponseDto = new ParticipantIdentityDto();
        if(participantId != 0){
            Participant participant = readParticipant(participantId);
            if(participant != null){
                modelMapper.map(participant, participantIdentityResponseDto);
            }else{
                throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
            }
        }
        return participantIdentityResponseDto;
    }

    private Participant readParticipant(Long participantId) {
        Participant participant = null;
        Optional<Participant> participantOpt = participantRepository.findById(participantId);
        if (participantOpt.isPresent()){
            participant = participantOpt.get();
        }
        return participant;
    }

    @Override
    public ParticipantIdentityDto saveParticipantIdentity(ParticipantIdentityDto ParticipantIdentityDto) {
        Participant participant = null;
        if(ParticipantIdentityDto.getParticipantId() == 0){
            participant = new Participant();
            modelMapper.map(ParticipantIdentityDto, participant);
            participant.setType("CYFM");
            participant.setStatus("ACTIVE");
        }else {
            participant = readParticipant(ParticipantIdentityDto.getParticipantId());
            modelMapper.map(ParticipantIdentityDto, participant);
        }
        participant = participantRepository.save(participant);
        ParticipantIdentityDto.setParticipantId(participant.getParticipantId());
        return ParticipantIdentityDto;
    }

}
