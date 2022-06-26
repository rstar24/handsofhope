package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.ParticipantContactDto;
import com.twn.cyfwms.participant.dto.ParticipantIdentityDto;
import com.twn.cyfwms.participant.entity.Household;
import com.twn.cyfwms.participant.entity.Participant;
import com.twn.cyfwms.participant.repository.HouseholdRepository;
import com.twn.cyfwms.participant.repository.ParticipantRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ParticipantServiceImpl implements ParticipantService {
    @Autowired
    private ParticipantRepository participantRepository;
    @Autowired
    private HouseholdRepository householdRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ParticipantIdentityDto readParticipantIdentity(Long participantId) {
        ParticipantIdentityDto participantIdentityResponseDto = new ParticipantIdentityDto();
        if(participantId != 0){
            Participant participant = readParticipant(participantId);
            if(participant != null){
                modelMapper.map(participant, participantIdentityResponseDto);
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
    public ParticipantIdentityDto saveParticipantIdentity(ParticipantIdentityDto participantIdentityDto) {
        Participant participant = null;
        if(participantIdentityDto.getParticipantId() == 0){
            participant = new Participant();
            modelMapper.map(participantIdentityDto, participant);
            participant.setCreationDate(LocalDate.now());
            participant.setType("CYFM");
            participant.setStatus("ACTIVE");
            Household household = createHousehold();
            participant.setHousehold(household);
        }else {
            participant = readParticipant(participantIdentityDto.getParticipantId());
            modelMapper.map(participantIdentityDto, participant);
        }
        participant.setLastwritten(LocalDateTime.now());
        participant = participantRepository.save(participant);
        participantIdentityDto.setParticipantId(participant.getParticipantId());
        return participantIdentityDto;
    }

    private Household createHousehold(){
        Household household = new Household();
        household.setCreationDate(LocalDate.now());
        household.setLastwritten(LocalDateTime.now());
        household.setStatus("ACTIVE");
        household.setStartDate(LocalDate.now());
        household = householdRepository.save(household);
        return household;
    }

}
