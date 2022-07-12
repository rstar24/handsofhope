package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.ParticipantContactDto;
import com.twn.cyfwms.participant.entity.ParticipantContact;
import com.twn.cyfwms.participant.repository.ParticipantContactRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@AllArgsConstructor
public class ParticipantContactServiceImpl implements ParticipantContactService {
    @Autowired
    private ParticipantContactRepository participantContactRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ParticipantContactDto readParticipantContact(Long participantId) {
        ParticipantContactDto participantContactDto = new ParticipantContactDto();
        if(participantId != 0) {
            ParticipantContact participantContact =
                    participantContactRepository.findByParticipantId(participantId);
            if(participantContact!=null) {
                modelMapper.map(participantContact, participantContactDto);
            }else{
                throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");

            }
        }
        return participantContactDto;
    }

    @Override
    public ParticipantContactDto saveParticipantContact(ParticipantContactDto participantContactDto) {
        ParticipantContact participantContact = null;
        if(participantContactDto.getParticipantContactId() == 0){
            participantContact = new ParticipantContact();
            modelMapper.map(participantContactDto, participantContact);
            participantContact.setStatus("ACTIVE");
        }else {
            participantContact =
                    participantContactRepository.findById(participantContactDto.getParticipantContactId()).get();
            modelMapper.map(participantContactDto, participantContact);
        }
        participantContact = participantContactRepository.save(participantContact);
        participantContactDto.setParticipantContactId(participantContact.getParticipantContactId());
        return participantContactDto;
    }

}
