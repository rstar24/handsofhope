package com.twn.cyfwms.CulturalProgram.service;

import com.twn.cyfwms.CulturalProgram.dto.CulturalProgAndActDto;
import com.twn.cyfwms.CulturalProgram.entity.CulturalProgAndAct;
import com.twn.cyfwms.CulturalProgram.repository.CulturalProgramRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class CulturalProgAndActServiceImpl implements CulturalProgAndActService {

    @Autowired
    private CulturalProgramRepository culturalProgramRepository;
    @Autowired
    private ModelMapper modelMapper;

    private CulturalProgAndAct readCulturalProgram(Long culturalProgramId) {
        CulturalProgAndAct culturalProgAndAct = null;
        Optional<CulturalProgAndAct> CulturalProgAndActOpt = Optional.ofNullable(culturalProgramRepository.findByCulturalProgramId(culturalProgramId));
        if (CulturalProgAndActOpt.isPresent()) {
            culturalProgAndAct = CulturalProgAndActOpt.get();
        }
        return culturalProgAndAct;
    }

    @Override
    public CulturalProgAndActDto saveculturalProgramIdentity(CulturalProgAndActDto culturalProgAndActDto) {
        CulturalProgAndAct culturalProgAndAct = null;
        if (culturalProgAndActDto.getCulturalProgramId() == 0) {
            culturalProgAndAct = new CulturalProgAndAct();
            modelMapper.map(culturalProgAndActDto, culturalProgAndAct);
            Optional<CulturalProgAndAct> culturalProgAndActDetailsOpt = culturalProgramRepository.findTopByOrderByReferenceIdDesc();
            if (culturalProgAndActDetailsOpt.isPresent()) {
                CulturalProgAndAct participantDtls = culturalProgAndActDetailsOpt.get();
                culturalProgAndAct.setReferenceId(participantDtls.getReferenceId() + 128L);
            } else {
                culturalProgAndAct.setReferenceId(128L);
            }
        } else {
            culturalProgAndAct = readCulturalProgram(culturalProgAndActDto.getCulturalProgramId());
            modelMapper.map(culturalProgAndActDto, culturalProgAndAct);
        }
        culturalProgAndAct = culturalProgramRepository.save(culturalProgAndAct);
        culturalProgAndActDto.setCulturalProgramId(culturalProgAndAct.getCulturalProgramId());
        culturalProgAndActDto.setReferenceId(culturalProgAndAct.getReferenceId());
        return culturalProgAndActDto;
    }
}