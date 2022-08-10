package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.FamilyPhysicianDto;
import com.twn.cyfwms.participant.entity.FamilyPhysician;
import com.twn.cyfwms.participant.entity.Participant;
import com.twn.cyfwms.participant.repository.FamilyPhysicianRepository;
import com.twn.cyfwms.participant.repository.ParticipantRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@AllArgsConstructor
public class FamilyPhysicianServiceImpl implements FamilyPhysicianService {

    @Autowired
    private FamilyPhysicianRepository  familyPhysicianRepository;
    @Autowired
     ModelMapper modelMapper;
    @Autowired
    ParticipantRepository participantRepository;
    @Override
    public List<FamilyPhysicianDto> getAllFamilyPhysicians(Long participantId) {
        List<FamilyPhysicianDto> FamilyPhysicianDtoList = new ArrayList<FamilyPhysicianDto>();
        if(participantId != 0){
            List<FamilyPhysician> familyPhysicianList = familyPhysicianRepository.findByParticipantId(participantId);
            if(familyPhysicianList!=null) {
              List<FamilyPhysician> familyPhysicianActive=new ArrayList<>();
               for (int i=0;i<familyPhysicianList.size();i++){
                   if (!familyPhysicianList.get(i).getStatus().equalsIgnoreCase("INACTIVE")) {
                       familyPhysicianActive.add(familyPhysicianList.get(i));
                   }
               }
               FamilyPhysicianDtoList = modelMapper.map(familyPhysicianActive, new TypeToken<List<FamilyPhysicianDto>>() {}.getType());
                for (int i=0;i<=FamilyPhysicianDtoList.size()-1;i++){
                    if (FamilyPhysicianDtoList.get(i).getStartDate()==null){
                        FamilyPhysicianDtoList.get(i).setStartDate(LocalDate.of(1,1,1));
                    }
                    if (FamilyPhysicianDtoList.get(i).getEndDate()==null){
                        FamilyPhysicianDtoList.get(i).setEndDate(LocalDate.of(1,1,1));
                    }
                }
            }else{
                throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
            }
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
                familyPhysician.setStatus("ACTIVE");
            }else {
                familyPhysician = familyPhysicianRepository.findById(FamilyPhysicianDto.getFamilyPhysicianId()).get();
                modelMapper.map(FamilyPhysicianDto, familyPhysician);
            }
            familyPhysician = familyPhysicianRepository.save(familyPhysician);
            FamilyPhysicianDto.setFamilyPhysicianId(familyPhysician.getFamilyPhysicianId());
        }
        return FamilyPhysicianDtoList;
    }

    @Override
    public ResponseEntity removeFamilyPhysician(Long referenceId, Long recordNumber) {

        if(referenceId != 0  && recordNumber>=0){
            Optional<Participant> particpantDetailsOpt = participantRepository.findByReferenceId(referenceId);
            Long participantId = particpantDetailsOpt.get().getParticipantId();
            List<FamilyPhysician> familyPhysicianOpt = familyPhysicianRepository.findByParticipantId(participantId);
           if (!familyPhysicianOpt.isEmpty()){
               for (int i = 0; familyPhysicianOpt.size() - 1 >= i; i++){
                   if (familyPhysicianOpt.size() > recordNumber){
                       if (i == recordNumber){
                           familyPhysicianOpt.get(i).setStatus("INACTIVE");
                           familyPhysicianRepository.save(familyPhysicianOpt.get(i));
                       }
                   }
                   else {
                       throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
                   }
               }
           }
           else
           {
               throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
           }
        }
        else
        {
            throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
        }
        return new ResponseEntity("Operation Successful", HttpStatus.OK);
    }
}
