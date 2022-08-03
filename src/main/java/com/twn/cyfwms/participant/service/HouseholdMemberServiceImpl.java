package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.HouseholdMemberDto;
import com.twn.cyfwms.participant.entity.HouseholdMember;
import com.twn.cyfwms.participant.repository.HouseholdMemberRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

import static org.springframework.http.HttpStatus.NOT_FOUND;

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
        HouseholdMemberDto householdMemberDto=new HouseholdMemberDto();
        if(participantId != 0){
            List<HouseholdMember> householdMemberList = householdMemberRepo.findByParticipantId(participantId);
            if(householdMemberList!=null) {
                HouseholdMemberDtoList = modelMapper.map(householdMemberList, new TypeToken<List<HouseholdMemberDto>>() {}.getType());

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
}
