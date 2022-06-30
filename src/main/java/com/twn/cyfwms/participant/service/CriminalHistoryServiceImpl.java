package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.CriminalHistoryDto;
import com.twn.cyfwms.participant.dto.CriminalHistoryRecordDto;
import com.twn.cyfwms.participant.dto.FamilyPhysicianDto;
import com.twn.cyfwms.participant.entity.CriminalHistory;
import com.twn.cyfwms.participant.entity.CriminalHistoryRecord;
import com.twn.cyfwms.participant.repository.CriminalHistoryRecordRepository;
import com.twn.cyfwms.participant.repository.CriminalHistoryRepository;
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
public class CriminalHistoryServiceImpl implements CriminalHistoryService{
    @Autowired
    private CriminalHistoryRepository criminalHistoryRepo;
    @Autowired
    private CriminalHistoryRecordRepository criminalHistoryRecordRepo;
    @Autowired
    private ModelMapper modelMapper;


    @Override
    public CriminalHistoryDto readCriminalHistory(Long participantId) {
        CriminalHistoryDto criminalHistoryDto = new CriminalHistoryDto();
        if(participantId != 0) {
            CriminalHistory criminalHistory =
                    criminalHistoryRepo.findByParticipantId(participantId);
            modelMapper.map(criminalHistory, criminalHistoryDto);
        }
        return criminalHistoryDto;
    }

    @Override
    public CriminalHistoryDto saveCriminalHistory(CriminalHistoryDto criminalHistoryDto) {
        CriminalHistory criminalHistory = null;
        CriminalHistoryRecord criminalHistoryRecord=null;

//        if(criminalHistory.getCriminalHistoryId() == 0){
        if(criminalHistoryDto.getCriminalHistoryId() == 0){
            criminalHistory = new CriminalHistory();
            modelMapper.map(criminalHistoryDto, criminalHistory);
            criminalHistory.setCreationDate(LocalDate.now());
            criminalHistory.setStatus("ACTIVE");
            for (int i=0;criminalHistory.getCriminalHistoryRecordList().size()-1>=i; i++ ){
                criminalHistory.getCriminalHistoryRecordList().get(i).setCreationDate(LocalDate.now());
                criminalHistory.getCriminalHistoryRecordList().get(i).setStatus("ACTIVE");


            }

        }
        else {
            criminalHistory =
                    criminalHistoryRepo.findById(criminalHistoryDto.getCriminalHistoryId()).get();
            modelMapper.map(criminalHistoryDto, criminalHistory);
            for (int i=0;criminalHistory.getCriminalHistoryRecordList().size()-1>=i; i++ ){
                CriminalHistoryRecord  criminalHistoryRecord1= criminalHistoryRecordRepo.findById(criminalHistory.getCriminalHistoryRecordList().get(i).getCriminalHistoryRecordId()).get();
                criminalHistoryRecord1.setLastwritten(LocalDateTime.now());
                criminalHistory.getCriminalHistoryRecordList().set(i,criminalHistoryRecord1);
            }
        }
        criminalHistory.setLastwritten(LocalDateTime.now());




        criminalHistory = criminalHistoryRepo.save(criminalHistory);
        criminalHistoryDto.setCriminalHistoryId(criminalHistory.getCriminalHistoryId());
        return criminalHistoryDto;
    }
}
