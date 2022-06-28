package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.ParticipantContactDto;
import com.twn.cyfwms.participant.dto.ParticipantOtherInformationServiceDto;
import com.twn.cyfwms.participant.entity.ParticipantContact;
import com.twn.cyfwms.participant.entity.ParticipantOtherInformation;
import com.twn.cyfwms.participant.repository.ParticipantOtherInformationRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class ParticipantOtherInformationServiceImpl implements ParticipantOtherInformationService {

    @Autowired
    private ParticipantOtherInformationRepository participantOtherInformationRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public ParticipantOtherInformationServiceDto readParticipantOtherInformation(Long participantId) {
        ParticipantOtherInformationServiceDto participantOtherInformationServiceDto = new ParticipantOtherInformationServiceDto();
        if(participantId != 0) {
            ParticipantOtherInformation participantContact =
                    participantOtherInformationRepository.findByParticipantId(participantId);
            modelMapper.map(participantContact, participantOtherInformationServiceDto);
        }
        return participantOtherInformationServiceDto;
    }

    @Override
    public ParticipantOtherInformationServiceDto saveParticipantOtherInformation(ParticipantOtherInformationServiceDto participantOtherInformationServiceDto) {
        ParticipantOtherInformation participantOtherInformation = null;
        if(participantOtherInformationServiceDto.getParticipantOtherInfoId() == 0){
            participantOtherInformation = new ParticipantOtherInformation();
            modelMapper.map(participantOtherInformationServiceDto, participantOtherInformation);
            participantOtherInformation.setCreationDate(LocalDate.now());
            participantOtherInformation.setStatus("ACTIVE");
        }else {
            participantOtherInformation =
                    participantOtherInformationRepository.findById(participantOtherInformationServiceDto.getParticipantOtherInfoId()).get();
            modelMapper.map(participantOtherInformationServiceDto, participantOtherInformation);
        }
        participantOtherInformation.setLastwritten(LocalDateTime.now());
        participantOtherInformation = participantOtherInformationRepository.save(participantOtherInformation);
        participantOtherInformationServiceDto.setParticipantOtherInfoId(participantOtherInformation.getParticipantOtherInfoId());
        return participantOtherInformationServiceDto;
    }
}
