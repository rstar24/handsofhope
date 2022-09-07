package com.twn.cyfwms.CulturalProgram.service;
import com.twn.cyfwms.CulturalProgram.dto.CulturalProgAndActDto;
import com.twn.cyfwms.CulturalProgram.entity.CulturalProgAndAct;
import com.twn.cyfwms.CulturalProgram.repository.CulturalProgAndActRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
@Service
@AllArgsConstructor
public class CulturalProgAndActServiceImpl implements CulturalProgAndActService {

    @Autowired
    private CulturalProgAndActRepository culturalProgAndActRepository;
    @Autowired
    private ModelMapper modelMapper;

    private CulturalProgAndAct readCulturalProgram(Long culturalProgramId) {
        CulturalProgAndAct culturalProgAndAct = null;
        Optional<CulturalProgAndAct> culturalProgAndActOpt = culturalProgAndActRepository.findByCulturalProgramId(culturalProgramId);
        if (culturalProgAndActOpt.isPresent()) {
            culturalProgAndAct = culturalProgAndActOpt.get();
        }
        return culturalProgAndAct;
    }

    @Override
    public CulturalProgAndActDto saveCulturalProgramIdentity(CulturalProgAndActDto culturalProgAndActDto) {
        CulturalProgAndAct culturalProgAndAct = null;
        if (culturalProgAndActDto.getCulturalProgramId() == 0) {
            culturalProgAndAct = new CulturalProgAndAct();
            modelMapper.map(culturalProgAndActDto, culturalProgAndAct);
            culturalProgAndAct.setDeletionOfStatus("ACTIVE");
            Optional<CulturalProgAndAct> culturalProgAndActDetailsOpt = culturalProgAndActRepository.findTopByOrderByReferenceIdDesc();
            if (culturalProgAndActDetailsOpt.isPresent()) {
                CulturalProgAndAct culturalProgAndActDtls = culturalProgAndActDetailsOpt.get();
                culturalProgAndAct.setReferenceId(culturalProgAndActDtls.getReferenceId() + 128L);
            } else {
                culturalProgAndAct.setReferenceId(128L);
            }
        } else {
            culturalProgAndAct = readCulturalProgram(culturalProgAndActDto.getCulturalProgramId());
            modelMapper.map(culturalProgAndActDto, culturalProgAndAct);
        }
        culturalProgAndAct = culturalProgAndActRepository.save(culturalProgAndAct);
        culturalProgAndActDto.setCulturalProgramId(culturalProgAndAct.getCulturalProgramId());
        culturalProgAndActDto.setReferenceId(culturalProgAndAct.getReferenceId());
        return culturalProgAndActDto;
    }
}