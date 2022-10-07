package org.cyfwms.participant.service;

import org.cyfwms.participant.dto.FamilyPhysicianDto;
import org.cyfwms.participant.entity.FamilyPhysician;
import org.cyfwms.participant.repository.FamilyPhysicianRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class FamilyPhysicianServiceImpl implements FamilyPhysicianService {
    @Autowired
    private FamilyPhysicianRepository familyPhysicianRepository;

    @Override
    public List<FamilyPhysicianDto> getAllFamilyPhysicians(Long participantId) {
        List<FamilyPhysicianDto> familyPhysicianDtoList = new ArrayList<FamilyPhysicianDto>();
        if(participantId != 0){
            familyPhysicianDtoList =
                    familyPhysicianRepository.findByParticipantId(participantId)
                            .stream()
                            .map( fp -> {
                                FamilyPhysicianDto fpDto = new FamilyPhysicianDto();
                                BeanUtils.copyProperties(fp, fpDto);
                                return fpDto;
                            }).collect(Collectors.toList());
        }
        return familyPhysicianDtoList;
    }

    @Override
    public List<FamilyPhysicianDto> saveAllFamilyPhysicians(List<FamilyPhysicianDto> FamilyPhysicianDtoList) {
        for (FamilyPhysicianDto FamilyPhysicianDto: FamilyPhysicianDtoList) {
            FamilyPhysician familyPhysician = null;
            if (FamilyPhysicianDto.getFamilyPhysicianId() == 0) {
                familyPhysician = new FamilyPhysician();
                BeanUtils.copyProperties(FamilyPhysicianDto, familyPhysician);
                familyPhysician.setStatus("ACTIVE");
            } else {
                familyPhysician = familyPhysicianRepository.findById(FamilyPhysicianDto.getFamilyPhysicianId()).get();
                BeanUtils.copyProperties(FamilyPhysicianDto, familyPhysician);
            }
            familyPhysician = familyPhysicianRepository.save(familyPhysician);
            FamilyPhysicianDto.setFamilyPhysicianId(familyPhysician.getFamilyPhysicianId());
        }
        return FamilyPhysicianDtoList;
    }

    @Override
    public void removeFamilyPhysician(Long familyPhysicianId) {
        Optional<FamilyPhysician> familyPhysicianOpt =
                familyPhysicianRepository.findById(familyPhysicianId);
        if(familyPhysicianOpt.isPresent()){
            FamilyPhysician familyPhysician = familyPhysicianOpt.get();
            familyPhysician.setStatus("INACTIVE");
            familyPhysicianRepository.save(familyPhysician);
        }
    }
}
