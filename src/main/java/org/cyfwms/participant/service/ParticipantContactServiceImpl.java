package org.cyfwms.participant.service;
import lombok.AllArgsConstructor;
import org.cyfwms.participant.dto.ParticipantContactDto;
import org.cyfwms.participant.entity.ParticipantContact;
import org.cyfwms.participant.repository.ParticipantContactRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
@AllArgsConstructor
public class ParticipantContactServiceImpl implements ParticipantContactService {
    @Autowired
    private ParticipantContactRepository participantContactRepository;

    @Override
    public ParticipantContactDto readParticipantContact(Long participantId) {
        ParticipantContactDto participantContactDto = new ParticipantContactDto();
        if (participantId != 0) {
            ParticipantContact participantContact = participantContactRepository.findByParticipantId(participantId);
            if (participantContact != null) {
                BeanUtils.copyProperties(participantContact, participantContactDto);
            }
        }
        return participantContactDto;
    }

    @Override
    public ParticipantContactDto saveParticipantContact(ParticipantContactDto participantContactDto) {
        ParticipantContact participantContact = null;
        if (participantContactDto.getParticipantContactId() == 0) {
            participantContact = new ParticipantContact();
            BeanUtils.copyProperties(participantContactDto, participantContact);
            participantContact.setStatus("ACTIVE");
        } else {
            participantContact = participantContactRepository.findById(participantContactDto.getParticipantContactId()).get();
            BeanUtils.copyProperties(participantContactDto, participantContact);
        }
        participantContact = participantContactRepository.save(participantContact);
        participantContactDto.setParticipantContactId(participantContact.getParticipantContactId());
        return participantContactDto;
    }
}
