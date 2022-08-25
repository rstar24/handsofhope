package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.FamilyPhysicianDto;
import com.twn.cyfwms.participant.entity.FamilyPhysician;
import com.twn.cyfwms.participant.repository.FamilyPhysicianRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@AllArgsConstructor
public class FamilyPhysicianServiceImpl implements FamilyPhysicianService {
    @Autowired
    private FamilyPhysicianRepository  familyPhysicianRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public List<FamilyPhysicianDto> getAllFamilyPhysicians(Long participantId) {
        List<FamilyPhysicianDto> FamilyPhysicianDtoList = new ArrayList<FamilyPhysicianDto>();
        if(participantId != 0){
            List<FamilyPhysician> familyPhysicianList = familyPhysicianRepository.findByParticipantId(participantId);
            if(familyPhysicianList!=null) {
               FamilyPhysicianDtoList = modelMapper.map(familyPhysicianList, new TypeToken<List<FamilyPhysicianDto>>() {}.getType());
            }else{
                throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
            }
        }
        return FamilyPhysicianDtoList;
    }

    @Override
    public List<FamilyPhysicianDto> saveAllFamilyPhysicians(List<FamilyPhysicianDto> FamilyPhysicianDtoList) {
        for (FamilyPhysicianDto FamilyPhysicianDto: FamilyPhysicianDtoList) {
            FamilyPhysician familyPhysician = null;
            if (FamilyPhysicianDto.getFamilyPhysicianId() == 0) {
                familyPhysician = new FamilyPhysician();
                modelMapper.map(FamilyPhysicianDto, familyPhysician);
                familyPhysician.setStatus("ACTIVE");
            } else {
                familyPhysician = familyPhysicianRepository.findById(FamilyPhysicianDto.getFamilyPhysicianId()).get();
                modelMapper.map(FamilyPhysicianDto, familyPhysician);
            }
            familyPhysician = familyPhysicianRepository.save(familyPhysician);
            FamilyPhysicianDto.setFamilyPhysicianId(familyPhysician.getFamilyPhysicianId());
        }
        return FamilyPhysicianDtoList;
    }

    @Override
    public ResponseEntity removeFamilyPhysician(Long familyPhysicianId) {
            List<FamilyPhysician> familyPhysicianOpt = familyPhysicianRepository.findByFamilyPhysicianId(familyPhysicianId);
            if (!familyPhysicianOpt.isEmpty()) {
                for (int i = 0; i <familyPhysicianOpt.size(); ++i) {
                    familyPhysicianOpt.get(i).setStatus("INACTIVE");
                    familyPhysicianRepository.save(familyPhysicianOpt.get(i));
                }
            } else {
                throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
            }
        return new ResponseEntity("Operation Successful", HttpStatus.OK);
    }
}
