package org.cyfwms.caregiver.service;

import java.util.Optional;

import org.cyfwms.caregiver.dto.CareProviderDto;
import org.cyfwms.caregiver.entity.CareProvider;
import org.cyfwms.caregiver.repository.CareProviderRepository;

import org.cyfwms.common.exception.I18Constants;
import org.cyfwms.common.exception.MessageUtil;
import org.cyfwms.common.exception.NoSuchElementFoundException;

import org.cyfwms.participant.entity.Participant;
import org.cyfwms.participant.repository.ParticipantRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CareProviderServiceImpl implements CareProviderService {
    @Autowired
    CareProviderRepository careProviderRepository;

    @Autowired
    MessageUtil messageUtility;

    @Autowired
    private ParticipantRepository participantRepository;

    @Override
    public CareProviderDto save(CareProviderDto cpDto) {
        CareProvider cp = null;
        if (cpDto.getId() == 0) {
            cp = new CareProvider();
            BeanUtils.copyProperties(cpDto, cp);
            Optional<CareProvider> cpOpt = careProviderRepository.findTopByOrderByReferenceIdDesc();
            if (cpOpt.isPresent()) {
                cp.setReferenceId(128L + cpOpt.get().getReferenceId());
            } else {
                cp.setReferenceId(128L);
            }
        } else {
            cp = careProviderRepository.findByIdWhereActive(cpDto.getId()).orElseThrow(
                () -> new NoSuchElementFoundException(
                    messageUtility.getLocalMessage(I18Constants.NO_ITEM_FOUND.getKey(),
                    String.valueOf(cpDto.getId()))
                )
            );
            BeanUtils.copyProperties(cpDto, cp, "referenceId");
        }
        cp = careProviderRepository.save(cp);
        cpDto.setId(cp.getId());
        cpDto.setReferenceId(cp.getReferenceId());
        return cpDto;
    }

    @Override
    public CareProviderDto read(Long id) {
        CareProviderDto cpDto = new CareProviderDto();
        if (id!=0){
        CareProvider cp = careProviderRepository.findByIdWhereActive(id)
            .orElseThrow(() -> new NoSuchElementFoundException(
                messageUtility.getLocalMessage(
                    I18Constants.NO_ITEM_FOUND.getKey(),
                    String.valueOf(id)
                )
            ));
        BeanUtils.copyProperties(cp, cpDto);
            if (!cp.getPrimaryCaregiver().isEmpty()) {
                Participant participantPrimary = participantRepository.findByParticipantId(Long.parseLong(cpDto.getPrimaryCaregiver()));
                cpDto.setPrimaryCaregiver(participantPrimary.getFirstname() + " " + participantPrimary.getSurname());
                cpDto.setPriParticipantId(participantPrimary.getParticipantId());
            }
          if (cp.getSecondaryCaregiver()!=null){
            if (!cp.getSecondaryCaregiver().isEmpty()){
                Participant participantSecondary = participantRepository.findByParticipantId(Long.parseLong(cpDto.getSecondaryCaregiver()));
                cpDto.setSecondaryCaregiver(participantSecondary.getFirstname() + " " + participantSecondary.getSurname());
                cpDto.setSecParticipantId(participantSecondary.getParticipantId());
            }
          }
        }
        return cpDto;
    }

    @Override
    public void remove(Long referenceId) {
        CareProvider cp = careProviderRepository
            .findByReferenceIdWhereActive(referenceId)
            .orElseThrow(() -> new NoSuchElementFoundException(
                messageUtility.getLocalMessage(I18Constants.NO_ITEM_FOUND.getKey(),
                String.valueOf(referenceId))
            ));
        cp.setDeletionStatus("INACTIVE");
        careProviderRepository.save(cp);
    }
}
