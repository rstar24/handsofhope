package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.FamilyPhysicianDto;
import com.twn.cyfwms.participant.dto.HouseholdMemberDto;
import com.twn.cyfwms.participant.entity.FamilyPhysician;
import com.twn.cyfwms.participant.entity.HouseholdMember;
import com.twn.cyfwms.participant.repository.FamilyPhysicianRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class FamilyPhysicianServiceImpl implements FamilyPhysicianService {

    @Autowired
    private FamilyPhysicianRepository  familyPhysicianRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<FamilyPhysicianDto> getAllFamilyPhysicians(Long participantId) {
        List<FamilyPhysicianDto> FamilyPhysicianDtoList = new ArrayList<FamilyPhysicianDto>();
        if(participantId != 0){
            List<FamilyPhysician> familyPhysicianList = familyPhysicianRepository.findByParticipantId(participantId);
            FamilyPhysicianDtoList= modelMapper.map(familyPhysicianList, new TypeToken<List<FamilyPhysicianDto>>() {}.getType());

        }
        return FamilyPhysicianDtoList;
    }

    @Override
    public List<FamilyPhysicianDto> saveAllFamilyPhysicians(List<FamilyPhysicianDto> FamilyPhysicianDtoList) {
        for(FamilyPhysicianDto FamilyPhysicianDto : FamilyPhysicianDtoList){
            FamilyPhysician familyPhysician = null;
            if(FamilyPhysicianDto.getFamilyPhysicianId() == 0){
                familyPhysician = new FamilyPhysician();
                modelMapper.map(FamilyPhysicianDto, familyPhysician);
                familyPhysician.setCreationDate(LocalDate.now());
                familyPhysician.setStartDate(LocalDate.now());
                familyPhysician.setStatus("ACTIVE");
            }else {
                familyPhysician = familyPhysicianRepository.findById(FamilyPhysicianDto.getFamilyPhysicianId()).get();
                modelMapper.map(FamilyPhysicianDto, familyPhysician);
            }
            familyPhysician.setLastwritten(LocalDateTime.now());
            familyPhysician = familyPhysicianRepository.save(familyPhysician);
            FamilyPhysicianDto.setFamilyPhysicianId(familyPhysician.getFamilyPhysicianId());
        }
        return FamilyPhysicianDtoList;

    }
}
