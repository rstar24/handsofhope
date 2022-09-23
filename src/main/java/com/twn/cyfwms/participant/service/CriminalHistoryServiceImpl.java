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
        CriminalHistoryRecord criminalHistoryRecord=new CriminalHistoryRecord();
        CriminalHistory criminalHistory = null;
        CriminalHistoryRecord criminalHistoryRecordData=null;
        if (criminalHistoryDto.getCriminalHistoryId() == 0) {
            criminalHistory = new CriminalHistory();
            modelMapper.map(criminalHistoryDto, criminalHistory);
            for (int i = 0; i < criminalHistory.getCriminalHistoryRecordList().size(); ++i) {
                criminalHistory.getCriminalHistoryRecordList().get(i).setStatus("ACTIVE");
            }
            criminalHistory = criminalHistoryRepo.save(criminalHistory);

            for (int i = 0; i < criminalHistory.getCriminalHistoryRecordList().size(); ++i) {
                criminalHistoryDto.getCriminalHistoryRecordList().get(i).setCriminalHistoryRecordId(criminalHistory.getCriminalHistoryRecordList().get(i).getCriminalHistoryRecordId());
                criminalHistoryDto.getCriminalHistoryRecordList().get(i).setCriminalHistoryId(criminalHistory.getCriminalHistoryRecordList().get(i).getCriminalHistoryId());
            }
        } else {
            criminalHistory = criminalHistoryRepo.findById(criminalHistoryDto.getCriminalHistoryId()).get();
            criminalHistory.setConditions(criminalHistoryDto.getConditions());
            criminalHistory.setCourtWorkerAndContactInfo(criminalHistoryDto.getCourtWorkerAndContactInfo());
            for (int i=0;i<criminalHistoryDto.getCriminalHistoryRecordList().size();i++) {
                if (criminalHistoryDto.getCriminalHistoryRecordList().get(i).getCriminalHistoryRecordId() == 0) {
                    modelMapper.map(criminalHistoryDto.getCriminalHistoryRecordList().get(i),criminalHistoryRecord);
                    criminalHistoryRecord.setStatus("ACTIVE");
                    criminalHistoryRecordData= criminalHistoryRecordRepository.save(criminalHistoryRecord);
                    criminalHistoryDto.getCriminalHistoryRecordList().get(i).setCriminalHistoryRecordId(criminalHistoryRecordData.getCriminalHistoryRecordId());

                } else {
                    for (int j = 0; j < criminalHistory.getCriminalHistoryRecordList().size(); j++){
                        if (criminalHistory.getCriminalHistoryRecordList().get(j).getCriminalHistoryRecordId().equals(criminalHistoryDto.getCriminalHistoryRecordList().get(i).getCriminalHistoryRecordId())) {
                             if (!criminalHistory.getCriminalHistoryRecordList().get(j).getStatus().equals("INACTIVE")) {
                                 modelMapper.map(criminalHistoryDto.getCriminalHistoryRecordList().get(i), criminalHistory.getCriminalHistoryRecordList().get(j));
                                 criminalHistory = criminalHistoryRepo.save(criminalHistory);
                             }
                             else {
                                 throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
                             }
                        }
                    }
                }
            }
        }
        criminalHistoryDto.setCriminalHistoryId(criminalHistory.getCriminalHistoryId());
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
