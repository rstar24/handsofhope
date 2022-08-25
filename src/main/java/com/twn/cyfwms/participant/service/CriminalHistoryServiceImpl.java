package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.CriminalHistoryDto;
import com.twn.cyfwms.participant.entity.CriminalHistory;
import com.twn.cyfwms.participant.entity.CriminalHistoryRecord;
import com.twn.cyfwms.participant.repository.CriminalHistoryRecordRepository;
import com.twn.cyfwms.participant.repository.CriminalHistoryRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@AllArgsConstructor
public class CriminalHistoryServiceImpl implements CriminalHistoryService{
    @Autowired
    private CriminalHistoryRepository criminalHistoryRepo;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    CriminalHistoryRecordRepository criminalHistoryRecordRepository;

    @Override
    public CriminalHistoryDto readCriminalHistory(Long participantId) {
        CriminalHistoryDto criminalHistoryDto = new CriminalHistoryDto();
        if (participantId != 0) {
            CriminalHistory criminalHistory = criminalHistoryRepo.findByParticipantId(participantId);
            if (criminalHistory != null) {
                List<CriminalHistoryRecord> criminalHistoryRecordList = new ArrayList<>();
                for (int i = 0; i < criminalHistory.getCriminalHistoryRecordList().size(); ++i) {
                    if (!criminalHistory.getCriminalHistoryRecordList().get(i).getStatus().equalsIgnoreCase("INACTIVE")) {
                        criminalHistoryRecordList.add(criminalHistory.getCriminalHistoryRecordList().get(i));
                    }
                }
                criminalHistory.setCriminalHistoryRecordList(criminalHistoryRecordList);
                modelMapper.map(criminalHistory, criminalHistoryDto);
                for (int i = 0; i < criminalHistory.getCriminalHistoryRecordList().size(); ++i) {
                    if (criminalHistoryDto.getCriminalHistoryRecordList().get(i).getArrestDate() == null) {
                        criminalHistoryDto.getCriminalHistoryRecordList().get(i).setArrestDate(LocalDate.of(1, 1, 1));
                    }
                }
            } else {
                throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
            }
        }
        return criminalHistoryDto;
    }

    @Override
    public CriminalHistoryDto saveCriminalHistory(CriminalHistoryDto criminalHistoryDto) {
        CriminalHistory criminalHistory = null;
        if (criminalHistoryDto.getCriminalHistoryId() == 0) {
            criminalHistory = new CriminalHistory();
            modelMapper.map(criminalHistoryDto, criminalHistory);
            for (int i = 0; i < criminalHistory.getCriminalHistoryRecordList().size(); ++i) {
                criminalHistory.getCriminalHistoryRecordList().get(i).setStatus("ACTIVE");
            }
        } else {
            criminalHistory = criminalHistoryRepo.findById(criminalHistoryDto.getCriminalHistoryId()).get();
            modelMapper.map(criminalHistoryDto, criminalHistory);
        }
        criminalHistory = criminalHistoryRepo.save(criminalHistory);
        criminalHistoryDto.setCriminalHistoryId(criminalHistory.getCriminalHistoryId());
        for (int i = 0; i < criminalHistory.getCriminalHistoryRecordList().size(); ++i) {
            criminalHistoryDto.getCriminalHistoryRecordList().get(i).setCriminalHistoryRecordId(criminalHistory.getCriminalHistoryRecordList().get(i).getCriminalHistoryRecordId());
            criminalHistory.getCriminalHistoryRecordList().get(i).setCriminalHistoryId(criminalHistoryDto.getCriminalHistoryId());
            criminalHistoryDto.getCriminalHistoryRecordList().get(i).setCriminalHistoryId(criminalHistory.getCriminalHistoryRecordList().get(i).getCriminalHistoryId());
        }
        return criminalHistoryDto;
    }
    @Override
    public ResponseEntity removeCriminalHistoryRecord(Long criminalHistoryRecordId) {
        CriminalHistoryRecord criminalHistoryRecord = criminalHistoryRecordRepository.findByCriminalHistoryRecordId(criminalHistoryRecordId);
        if (criminalHistoryRecord != null){
            criminalHistoryRecord.setStatus("INACTIVE");
            criminalHistoryRecordRepository.save(criminalHistoryRecord);
        }
        else{
            throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
        }
        return  new ResponseEntity("Operation Successful",HttpStatus.OK);
    }
}
