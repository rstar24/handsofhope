package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.CounselorCFSWorkersDto;
import com.twn.cyfwms.participant.dto.FamilyPhysicianDto;
import com.twn.cyfwms.participant.dto.HouseholdMemberDto;
import com.twn.cyfwms.participant.entity.CounselorCFSWorker;
import com.twn.cyfwms.participant.entity.HouseholdMember;
import com.twn.cyfwms.participant.repository.CounselorCFSWorkerRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@AllArgsConstructor
public class CounselorCFSWorkerServiceImpl implements CounselorCFSWorkerService{
    @Autowired
    CounselorCFSWorkerRepository cfsWorkerRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public List<CounselorCFSWorkersDto> getAllCounselorCFSWorkers(Long participantId) {
        List<CounselorCFSWorkersDto> counselorCFSWorkersDtoList = new ArrayList<CounselorCFSWorkersDto>();
        if(participantId != 0){
            List<CounselorCFSWorker> CounselorCFSWorkersList = cfsWorkerRepository.findByParticipantId(participantId);
            if(CounselorCFSWorkersList!=null) {
                counselorCFSWorkersDtoList = modelMapper.map(CounselorCFSWorkersList, new TypeToken<List<CounselorCFSWorkersDto>>() {
                }.getType());
            }else{
                throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");

            }



        }
        return counselorCFSWorkersDtoList;
    }

    @Override
    public List<CounselorCFSWorkersDto> saveAllCounselorCFSWorkers(List<CounselorCFSWorkersDto> CounselorCFSWorkersDtoList) {
        for(CounselorCFSWorkersDto CounselorCFSWorkersDto : CounselorCFSWorkersDtoList){
            CounselorCFSWorker counselorCFSWorker = null;
            if(CounselorCFSWorkersDto.getCounselorCFSWorkerId() == 0){
                counselorCFSWorker = new CounselorCFSWorker();
                modelMapper.map(CounselorCFSWorkersDto, counselorCFSWorker);
                counselorCFSWorker.setStatus("ACTIVE");
            }else {
                counselorCFSWorker = cfsWorkerRepository.findById(CounselorCFSWorkersDto.getCounselorCFSWorkerId()).get();
                modelMapper.map(CounselorCFSWorkersDto, counselorCFSWorker);
            }
            counselorCFSWorker = cfsWorkerRepository.save(counselorCFSWorker);
            CounselorCFSWorkersDto.setCounselorCFSWorkerId(counselorCFSWorker.getCounselorCFSWorkerId());
        }
        return CounselorCFSWorkersDtoList;
    }
}
