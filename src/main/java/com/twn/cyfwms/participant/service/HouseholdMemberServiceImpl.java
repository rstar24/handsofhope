package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.HouseholdMemberDto;
import com.twn.cyfwms.participant.entity.HouseholdMember;
import com.twn.cyfwms.participant.entity.Participant;
import com.twn.cyfwms.participant.repository.HouseholdMemberRepository;
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
public class HouseholdMemberServiceImpl implements HouseholdMemberService {
    @Autowired
    private HouseholdMemberRepository householdMemberRepo;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    ParticipantRepository participantRepository;
    @Override
    public List<HouseholdMemberDto> getAllHouseholdMembers(Long participantId) {
        List<HouseholdMemberDto> HouseholdMemberDtoList = new ArrayList<HouseholdMemberDto>();
        if(participantId != 0){
            List<HouseholdMember> householdMemberList = householdMemberRepo.findByParticipantId(participantId);
            if(householdMemberList!=null) {
                List<HouseholdMember> HouseholdMemberActive=new ArrayList<>();
                for (int i=0;i<householdMemberList.size();i++){
                    if (!householdMemberList.get(i).getStatus().equalsIgnoreCase("INACTIVE")) {
                        HouseholdMemberActive.add(householdMemberList.get(i));
                    }
                }
                HouseholdMemberDtoList = modelMapper.map(HouseholdMemberActive, new TypeToken<List<HouseholdMemberDto>>() {}.getType());
                for (int i=0;i<=HouseholdMemberDtoList.size()-1;i++){
                    if (HouseholdMemberDtoList.get(i).getDateOfBirth()==null){
                        HouseholdMemberDtoList.get(i).setDateOfBirth(LocalDate.of(1,1,1));
                    }
                    if (HouseholdMemberDtoList.get(i).getStartDate()==null){
                        HouseholdMemberDtoList.get(i).setStartDate(LocalDate.of(1,1,1));
                    }
                    if (HouseholdMemberDtoList.get(i).getEndDate()==null){
                        HouseholdMemberDtoList.get(i).setEndDate(LocalDate.of(1,1,1));
                    }
                }
            }else{
                throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
            }
        }
        return HouseholdMemberDtoList;
    }

    @Override
    public List<HouseholdMemberDto> saveAllHouseholdMembers(List<HouseholdMemberDto> HouseholdMemberDtoList) {
        for(HouseholdMemberDto HouseholdMemberDto : HouseholdMemberDtoList){
            HouseholdMember householdMember = null;
            if(HouseholdMemberDto.getHouseholdMemberId() == 0){
                householdMember = new HouseholdMember();
                modelMapper.map(HouseholdMemberDto, householdMember);
                householdMember.setStatus("ACTIVE");
            }else {
                householdMember = householdMemberRepo.findById(HouseholdMemberDto.getHouseholdMemberId()).get();
                modelMapper.map(HouseholdMemberDto,householdMember);
            }
            householdMember = householdMemberRepo.save(householdMember);
            HouseholdMemberDto.setHouseholdMemberId(householdMember.getHouseholdMemberId());
        }
        return HouseholdMemberDtoList;
    }

    @Override
    public ResponseEntity removeHouseholdMembers(Long referenceId, Long recordNumber) {
        if(referenceId != 0  && recordNumber>=0) {
            Optional<Participant> particpantDetailsOpt = participantRepository.findByReferenceId(referenceId);
            Long participantId = particpantDetailsOpt.get().getParticipantId();
            List<HouseholdMember> householdMemberOpt = householdMemberRepo.findByParticipantId(participantId);
            if (!householdMemberOpt.isEmpty()) {
                for (int i = 0; householdMemberOpt.size() - 1 >= i; i++) {
                    if (householdMemberOpt.size() > recordNumber) {
                        if (i == recordNumber) {
                            householdMemberOpt.get(i).setStatus("INACTIVE");
                            householdMemberRepo.save(householdMemberOpt.get(i));
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
