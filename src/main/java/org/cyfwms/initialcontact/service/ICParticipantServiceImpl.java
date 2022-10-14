package org.cyfwms.initialcontact.service;
import org.cyfwms.initialcontact.dto.ICParticipantDto;
import org.cyfwms.initialcontact.entity.ICParticipant;
import org.cyfwms.initialcontact.repository.ICParticipantRepository;
import org.cyfwms.participant.entity.Participant;
import org.cyfwms.participant.repository.ParticipantRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
@Service
public class ICParticipantServiceImpl implements ICParticipantService{
    @Autowired
    ICParticipantRepository icParticipantRepository;
    @Autowired
    ParticipantRepository participantRepository;
    @Override
    public ICParticipantDto saveICParticipant(ICParticipantDto iCParticipantDto) {
        ICParticipant iCParticipant = null;
        if (iCParticipantDto.getIcParticipantId()== 0) {
            iCParticipant = new ICParticipant();
            BeanUtils.copyProperties(iCParticipantDto, iCParticipant);
            iCParticipant.setStatus("ACTIVE");
        } else {
            iCParticipant = icParticipantRepository.findById(iCParticipantDto.getIcParticipantId()).get();
            BeanUtils.copyProperties(iCParticipantDto, iCParticipant);
        }
        iCParticipant = icParticipantRepository.save(iCParticipant);
        iCParticipantDto.setIcParticipantId(iCParticipant.getIcParticipantId());
        return iCParticipantDto;
    }

    @Override
    public ICParticipantDto readICParticipant(Long fileDetailsId) {
        ICParticipantDto iCParticipantDto = new ICParticipantDto();
        if (fileDetailsId != 0) {
            ICParticipant iCParticipant = icParticipantRepository.findByFileDetailsId(fileDetailsId);
            if (iCParticipant != null) {
                BeanUtils.copyProperties(iCParticipant, iCParticipantDto);
                Participant participant=participantRepository.findByParticipantId(Long.parseLong(iCParticipantDto.getParticipant()));
                if (!iCParticipant.getParticipant().equals("0")) {
                    iCParticipantDto.setParticipant(participant.getFirstname() + " " + participant.getSurname());
                    iCParticipantDto.setParticipantId(participant.getParticipantId());
                }
            }
        }
        return iCParticipantDto;
    }

    @Override
    public void removeICParticipant(Long icParticipantId) {
        Optional<ICParticipant> iCParticipantOpt =
                icParticipantRepository.findById(icParticipantId);
        if(iCParticipantOpt.isPresent()){
            ICParticipant iCParticipant = iCParticipantOpt.get();
            iCParticipant.setStatus("INACTIVE");
            icParticipantRepository.save(iCParticipant);
        }
    }
}
