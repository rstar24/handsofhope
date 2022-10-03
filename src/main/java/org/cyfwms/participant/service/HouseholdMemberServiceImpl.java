package org.cyfwms.participant.service;

import org.cyfwms.participant.dto.HouseholdMemberDto;
import org.cyfwms.participant.entity.HouseholdMember;
import org.cyfwms.participant.repository.HouseholdMemberRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class HouseholdMemberServiceImpl implements HouseholdMemberService {
    @Autowired
    private HouseholdMemberRepository householdMemberRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<HouseholdMemberDto> getAllHouseholdMembers(Long participantId) {
        List<HouseholdMemberDto> hmDtoList = householdMemberRepo.findByParticipantId(participantId)
                        .stream().
                        map(hm -> {
                            HouseholdMemberDto hmDTO = new HouseholdMemberDto();
                            modelMapper.map(hm, hmDTO);
                            if (hmDTO.getDateOfBirth() == null) {
                                hmDTO.setDateOfBirth(LocalDate.of(1, 1, 1));
                            }
                            return hmDTO;
                        }).collect(Collectors.toList());

        return hmDtoList;
    }

    @Override
    public List<HouseholdMemberDto> saveAllHouseholdMembers(List<HouseholdMemberDto> HouseholdMemberDtoList) {
        for (HouseholdMemberDto HouseholdMemberDto: HouseholdMemberDtoList) {
            HouseholdMember householdMember = null;
            if (HouseholdMemberDto.getHouseholdMemberId() == 0) {
                householdMember = new HouseholdMember();
                modelMapper.map(HouseholdMemberDto, householdMember);
                householdMember.setStatus("ACTIVE");
            } else {
                householdMember = householdMemberRepo.findById(HouseholdMemberDto.getHouseholdMemberId()).get();
                modelMapper.map(HouseholdMemberDto,householdMember);
            }
            householdMember = householdMemberRepo.save(householdMember);
            HouseholdMemberDto.setHouseholdMemberId(householdMember.getHouseholdMemberId());
        }
        return HouseholdMemberDtoList;
    }

    @Override
    public void removeHouseholdMembers(Long householdMemberId) {
        Optional<HouseholdMember> householdMemberOpt =
                householdMemberRepo.findById(householdMemberId);
        if(householdMemberOpt.isPresent()){
            HouseholdMember householdMember = householdMemberOpt.get();
            householdMember.setStatus("INACTIVE");
            householdMemberRepo.save(householdMember);
        }
    }
}
