package org.cyfwms.participant.service;

import org.cyfwms.participant.dto.CriminalHistoryDto;
import org.cyfwms.participant.entity.CriminalHistory;
import org.cyfwms.participant.entity.CriminalHistoryRecord;
import org.cyfwms.participant.repository.CriminalHistoryRecordRepository;
import org.cyfwms.participant.repository.CriminalHistoryRepository;
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
public class CriminalHistoryServiceImpl implements CriminalHistoryService{
    @Autowired
    private CriminalHistoryRepository criminalHistoryRepo;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    CriminalHistoryRecordRepository cHistoryRecordRepo;

    @Override
    public CriminalHistoryDto readCriminalHistory(Long participantId) {
        CriminalHistoryDto criminalHistoryDto = new CriminalHistoryDto();
        if (participantId != 0) {
            //Criminal History
            Optional<CriminalHistory> criminalHistoryOpt = Optional.ofNullable(criminalHistoryRepo.findByParticipantId(participantId));
            if (criminalHistoryOpt.isPresent()) {
                CriminalHistory criminalHistory = criminalHistoryOpt.get();
                List<CriminalHistoryRecord> criminalHistoryRecordList =
                        criminalHistory
                                .getCriminalHistoryRecordList()
                                .stream()
                                .filter(chRecord ->
                                        chRecord.getStatus().equalsIgnoreCase("INACTIVE")
                                )
                                .map(cHistoryRecord -> {
                                    if (cHistoryRecord.getArrestDate() == null) {
                                        cHistoryRecord.setArrestDate(LocalDate.of(1, 1, 1));
                                    }
                                    return cHistoryRecord;
                                })
                                .collect(Collectors.toList());
                criminalHistory.setCriminalHistoryRecordList(criminalHistoryRecordList);
                modelMapper.map(criminalHistory, criminalHistoryDto);
            }
        }
        return criminalHistoryDto;
    }

    @Override
    public CriminalHistoryDto saveCriminalHistory(CriminalHistoryDto criminalHistoryDto) {
        CriminalHistory criminalHistory = null;
        List<CriminalHistoryRecord> criminalHistoryRecordList = null;
        if (criminalHistoryDto.getCriminalHistoryId() == 0) {
            criminalHistory = new CriminalHistory();
            modelMapper.map(criminalHistoryDto, criminalHistory);

            criminalHistoryRecordList =
                    criminalHistoryDto.getCriminalHistoryRecordList()
                    .stream()
                    .map(cHistoryRecordDto -> {
                        CriminalHistoryRecord criminalHistoryRecord =
                                new CriminalHistoryRecord();
                        modelMapper.map(cHistoryRecordDto, criminalHistoryRecord);
                        criminalHistoryRecord.setStatus("ACTIVE");
                        return criminalHistoryRecord;
                    })
                    .collect(Collectors.toList());
        } else {
            criminalHistory = criminalHistoryRepo.findById(criminalHistoryDto.getCriminalHistoryId()).get();
            criminalHistory.setConditions(criminalHistoryDto.getConditions());
            criminalHistory.setCourtWorkerAndContactInfo(criminalHistoryDto.getCourtWorkerAndContactInfo());

            //Received from screen
            criminalHistoryRecordList =
                    criminalHistoryDto.getCriminalHistoryRecordList()
                            .stream()
                            .map(cHistoryRecordDto -> {
                                CriminalHistoryRecord criminalHistoryRecord =
                                        new CriminalHistoryRecord();
                                modelMapper.map(cHistoryRecordDto, criminalHistoryRecord);
                                criminalHistoryRecord.setStatus("ACTIVE");
                                return criminalHistoryRecord;
                            })
                            .collect(Collectors.toList());

        }
        criminalHistory.setCriminalHistoryRecordList(criminalHistoryRecordList);
        criminalHistory = criminalHistoryRepo.save(criminalHistory);
        criminalHistoryDto.setCriminalHistoryId(criminalHistory.getCriminalHistoryId());
        return criminalHistoryDto;
    }
    @Override
    public void removeCriminalHistoryRecord(Long criminalHistoryRecordId) {
        Optional<CriminalHistoryRecord> criminalHistoryRecordOpt =
                cHistoryRecordRepo.findById(criminalHistoryRecordId);
        if(criminalHistoryRecordOpt.isPresent()){
            CriminalHistoryRecord criminalHistoryRecord = criminalHistoryRecordOpt.get();
            criminalHistoryRecord.setStatus("INACTIVE");
            cHistoryRecordRepo.save(criminalHistoryRecord);
        }
    }
}
