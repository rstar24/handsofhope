package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.HouseholdMemberDto;
import com.twn.cyfwms.participant.entity.HouseholdMember;
import com.twn.cyfwms.participant.repository.HouseholdMemberRepository;
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
public class HouseholdMemberServiceImpl implements HouseholdMemberService {
    @Autowired
    private HouseholdMemberRepository householdMemberRepo;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<HouseholdMemberDto> getAllHouseholdMembers(Long participantId) {
        List<HouseholdMemberDto> HouseholdMemberDtoList = new ArrayList<HouseholdMemberDto>();

        if(participantId != 0){
            List<HouseholdMember> householdMemberList = householdMemberRepo.findByParticipantId(participantId);
           // modelMapper.map(householdMemberList, HouseholdMemberDtoList);

            //This is due to the occurrence of type erasure during runtime execution.
            HouseholdMemberDtoList= modelMapper.map(householdMemberList, new TypeToken<List<HouseholdMemberDto>>() {}.getType());
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
                householdMember.setCreationDate(LocalDate.now());
                householdMember.setStartDate(LocalDate.now());
                householdMember.setStatus("ACTIVE");
            }else {
                householdMember = householdMemberRepo.findById(HouseholdMemberDto.getHouseholdMemberId()).get();
//                modelMapper.map(householdMember, householdMember);
                modelMapper.map(HouseholdMemberDto,householdMember);
            }
            householdMember.setLastwritten(LocalDateTime.now());
            householdMember = householdMemberRepo.save(householdMember);
            HouseholdMemberDto.setHouseholdMemberId(householdMember.getHouseholdMemberId());
        }
        return HouseholdMemberDtoList;
    }
}
