package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.HouseholdMemberDto;
import com.twn.cyfwms.participant.entity.HouseholdMember;
import com.twn.cyfwms.participant.entity.Participant;
import com.twn.cyfwms.participant.repository.HouseholdMemberRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.AbstractList;
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
        List<HouseholdMemberDto> householdMemberDtoList = new ArrayList<HouseholdMemberDto>();
        if(participantId != 0){
            List<HouseholdMember> householdMemberList = householdMemberRepo.findByParticipantId(participantId);
            modelMapper.map(householdMemberList, householdMemberDtoList);
        }
        return householdMemberDtoList;
    }

    @Override
    public List<HouseholdMemberDto> saveAllHouseholdMembers(List<HouseholdMemberDto> householdMemberDtoList) {
        for(HouseholdMemberDto householdMemberDto:householdMemberDtoList){
            HouseholdMember householdMember = null;
            if(householdMemberDto.getHouseholdMemberId() == 0){
                householdMember = new HouseholdMember();
                modelMapper.map(householdMemberDto, householdMember);
                householdMember.setCreationDate(LocalDate.now());
                householdMember.setStartDate(LocalDate.now());
                householdMember.setStatus("ACTIVE");
            }else {
                householdMember = householdMemberRepo.findById(householdMemberDto.getHouseholdMemberId()).get();
                modelMapper.map(householdMember, householdMember);
            }
            householdMember.setLastwritten(LocalDateTime.now());
            householdMember = householdMemberRepo.save(householdMember);
            householdMemberDto.setHouseholdMemberId(householdMember.getHouseholdMemberId());
        }
        return householdMemberDtoList;
    }
}
