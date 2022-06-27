package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.CriminalHistoryDto;
import com.twn.cyfwms.participant.entity.CriminalHistory;
import com.twn.cyfwms.participant.repository.CriminalHistoryRecordRepository;
import com.twn.cyfwms.participant.repository.CriminalHistoryRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
        if(criminalHistory.getCriminalHistoryId() == 0){
            criminalHistory = new CriminalHistory();
            modelMapper.map(criminalHistoryDto, criminalHistory);
            criminalHistory.setCreationDate(LocalDate.now());
            criminalHistory.setStatus("ACTIVE");
        }else {
            criminalHistory =
                    criminalHistoryRepo.findById(criminalHistoryDto.getCriminalHistoryId()).get();
            modelMapper.map(criminalHistoryDto, criminalHistory);
        }
        criminalHistory.setLastwritten(LocalDateTime.now());
        criminalHistory = criminalHistoryRepo.save(criminalHistory);
        criminalHistoryDto.setCriminalHistoryId(criminalHistory.getCriminalHistoryId());
        return criminalHistoryDto;
    }
}
