package org.cyfwms.participant.service;

import org.cyfwms.participant.dto.ParticipantOtherInformationServiceDto;
import org.cyfwms.participant.entity.ParticipantOtherInformation;
import org.cyfwms.participant.repository.ParticipantOtherInformationRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

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
        if (participantId != 0) {
            ParticipantOtherInformation participantContact = participantOtherInformationRepository.findByParticipantId(participantId);
            if (participantContact != null) {
                modelMapper.map(participantContact, participantOtherInformationServiceDto);
            }
        }
        return participantOtherInformationServiceDto;
    }

    @Override
    public ParticipantOtherInformationServiceDto saveParticipantOtherInformation(ParticipantOtherInformationServiceDto participantOtherInformationServiceDto) {
        ParticipantOtherInformation participantOtherInformation = null;
        if (participantOtherInformationServiceDto.getParticipantOtherInfoId() == 0) {
            participantOtherInformation = new ParticipantOtherInformation();
            modelMapper.map(participantOtherInformationServiceDto, participantOtherInformation);
        } else {
            participantOtherInformation = participantOtherInformationRepository.findById(participantOtherInformationServiceDto.getParticipantOtherInfoId()).get();
            modelMapper.map(participantOtherInformationServiceDto, participantOtherInformation);
        }
        participantOtherInformation = participantOtherInformationRepository.save(participantOtherInformation);
        participantOtherInformationServiceDto.setParticipantOtherInfoId(participantOtherInformation.getParticipantOtherInfoId());
        return participantOtherInformationServiceDto;
    }
}
