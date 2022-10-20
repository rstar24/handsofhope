package org.cyfwms.culturalprogram.service;

import org.cyfwms.culturalprogram.dto.CPAParticipantDto;
import org.cyfwms.culturalprogram.entity.CPAParticipant;
import org.cyfwms.culturalprogram.repository.CPAParticipantRepository;
import org.cyfwms.participant.entity.Participant;
import org.cyfwms.participant.repository.ParticipantRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CPAParticipantServiceImpl implements CPAParticipantService {
    @Autowired
    private CPAParticipantRepository CPAParticipantRepository;

    @Autowired
    private ParticipantRepository participantRepository;

    @Override
    public CPAParticipantDto saveCpaParticipant(CPAParticipantDto CPAParticipantDto) {
        CPAParticipant CPAParticipant = null;
        if (CPAParticipantDto.getParticipantCulturalProId() == 0) {
            CPAParticipant = new CPAParticipant();
            BeanUtils.copyProperties(CPAParticipantDto, CPAParticipant);
            CPAParticipant.setStatus("ACTIVE");
        } else {
            CPAParticipant = CPAParticipantRepository.findById(CPAParticipantDto.getParticipantCulturalProId()).get();
            BeanUtils.copyProperties(CPAParticipantDto, CPAParticipant);
        }
        CPAParticipant = CPAParticipantRepository.save(CPAParticipant);
        CPAParticipantDto.setParticipantCulturalProId(CPAParticipant.getParticipantCulturalProId());
        return CPAParticipantDto;
    }

    @Override
    public CPAParticipantDto readCpaParticipant(Long culturalProgramId) {
        CPAParticipantDto CPAParticipantDto = new CPAParticipantDto();
        if (culturalProgramId != 0) {
            CPAParticipant CPAParticipant = CPAParticipantRepository.findByCulturalProgramId(culturalProgramId);
            if (CPAParticipant != null) {
                BeanUtils.copyProperties(CPAParticipant, CPAParticipantDto);
                Participant participant = participantRepository.findByParticipantId(Long.parseLong(CPAParticipantDto.getParticipant()));
                if (!CPAParticipant.getParticipant().equals("0")) {
                    CPAParticipantDto.setParticipant(participant.getFirstname() + " " + participant.getSurname());
                    CPAParticipantDto.setParticipantId(participant.getParticipantId());
                }
            }

        }
        return CPAParticipantDto;
    }

    @Override
    public void removeCpaParticipant(Long participantCulturalProId) {
        Optional<CPAParticipant> cpaParticipantOpt = CPAParticipantRepository.findById(participantCulturalProId);
        if (cpaParticipantOpt.isPresent()) {
            CPAParticipant CPAParticipant = new CPAParticipant();
            CPAParticipant = cpaParticipantOpt.get();
            CPAParticipant.setStatus("INACTIVE");
            CPAParticipantRepository.save(CPAParticipant);
        }
    }
}
