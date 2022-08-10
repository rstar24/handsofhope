package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.CriminalHistoryDto;
import com.twn.cyfwms.participant.entity.CriminalHistory;
import com.twn.cyfwms.participant.entity.CriminalHistoryRecord;
import com.twn.cyfwms.participant.entity.Participant;
import com.twn.cyfwms.participant.repository.CriminalHistoryRecordRepository;
import com.twn.cyfwms.participant.repository.CriminalHistoryRepository;
import com.twn.cyfwms.participant.repository.ParticipantRepository;
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
import java.util.Optional;

import static org.springframework.http.HttpStatus.NOT_FOUND;


@Service
@AllArgsConstructor
public class CriminalHistoryServiceImpl implements CriminalHistoryService{
    @Autowired
    private CriminalHistoryRepository criminalHistoryRepo;
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    ParticipantRepository participantRepository;

    @Autowired
    CriminalHistoryRecordRepository criminalHistoryRecordRepository;

    @Override
    public CriminalHistoryDto readCriminalHistory(Long participantId) {
        CriminalHistoryDto criminalHistoryDto = new CriminalHistoryDto();
        if(participantId != 0) {
            CriminalHistory criminalHistory =
                    criminalHistoryRepo.findByParticipantId(participantId);
            if(criminalHistory!=null) {
                List<CriminalHistoryRecord> criminalHistoryRecordList = new ArrayList<>();
                if (!criminalHistory.getStatus().equalsIgnoreCase("INACTIVE")) {
                    for (int i = 0; i < criminalHistory.getCriminalHistoryRecordList().size(); i++) {
                        if (!criminalHistory.getCriminalHistoryRecordList().get(i).getStatus().equalsIgnoreCase("INACTIVE")) {
                            criminalHistoryRecordList.add(criminalHistory.getCriminalHistoryRecordList().get(i));
                        }
                    }
                    criminalHistory.setCriminalHistoryRecordList(criminalHistoryRecordList);
                    modelMapper.map(criminalHistory, criminalHistoryDto);
                    if (criminalHistoryDto.getStartDate() == null) {
                        criminalHistoryDto.setStartDate(LocalDate.of(1, 1, 1));
                    }
                    if (criminalHistoryDto.getEndDate() == null) {
                        criminalHistoryDto.setEndDate(LocalDate.of(1, 1, 1));
                    }

                    for (int i = 0; criminalHistory.getCriminalHistoryRecordList().size() - 1 >= i; i++) {
                        if (criminalHistoryDto.getCriminalHistoryRecordList().get(i).getStartDate() == null) {
                            criminalHistoryDto.getCriminalHistoryRecordList().get(i).setStartDate(LocalDate.of(1, 1, 1));
                        }
                        if (criminalHistoryDto.getCriminalHistoryRecordList().get(i).getEndDate() == null) {
                            criminalHistoryDto.getCriminalHistoryRecordList().get(i).setEndDate(LocalDate.of(1, 1, 1));
                        }
                        if (criminalHistoryDto.getCriminalHistoryRecordList().get(i).getArrestDate() == null) {
                            criminalHistoryDto.getCriminalHistoryRecordList().get(i).setArrestDate(LocalDate.of(1, 1, 1));
                        }
                    }
                }

            }else{
                throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
            }
        }
        return criminalHistoryDto;
    }

    @Override
    public CriminalHistoryDto saveCriminalHistory(CriminalHistoryDto criminalHistoryDto) {
        CriminalHistory criminalHistory = null;


        if(criminalHistoryDto.getCriminalHistoryId() == 0){
            criminalHistory = new CriminalHistory();
            modelMapper.map(criminalHistoryDto, criminalHistory);
              criminalHistory.setStatus("ACTIVE");
            for (int i=0;criminalHistory.getCriminalHistoryRecordList().size()-1>=i; i++ ){
                criminalHistory.getCriminalHistoryRecordList().get(i).setStatus("ACTIVE");

            }

        }
        else {
            criminalHistory =
                    criminalHistoryRepo.findById(criminalHistoryDto.getCriminalHistoryId()).get();
            modelMapper.map(criminalHistoryDto, criminalHistory);
        }
        criminalHistory = criminalHistoryRepo.save(criminalHistory);
        criminalHistoryDto.setCriminalHistoryId(criminalHistory.getCriminalHistoryId());
        for (int i=0;criminalHistory.getCriminalHistoryRecordList().size()-1>=i; i++ ){
            criminalHistoryDto.getCriminalHistoryRecordList().get(i)
                    .setCriminalHistoryRecordId(criminalHistory.getCriminalHistoryRecordList().get(i).getCriminalHistoryRecordId());

            criminalHistory.getCriminalHistoryRecordList().get(i)
                    .setCriminalHistoryId(criminalHistoryDto.getCriminalHistoryId());

            criminalHistoryDto.getCriminalHistoryRecordList().get(i)
                    .setCriminalHistoryId(criminalHistory.getCriminalHistoryRecordList().get(i).getCriminalHistoryId());


        }

        return criminalHistoryDto;
    }

    @Override
    public ResponseEntity removeCriminalHistoryRecord(Long referenceId, Long recordNumber) {
        CriminalHistoryDto criminalHistoryDto = new CriminalHistoryDto();
        if(referenceId != 0  && recordNumber>=0) {
            Optional<Participant> particpantDetailsOpt = participantRepository.findByReferenceId(referenceId);
            Long participantId = particpantDetailsOpt.get().getParticipantId();
             Optional<CriminalHistory> criminalHistoryOpt = Optional.ofNullable(criminalHistoryRepo.findByParticipantId(participantId));
            if (criminalHistoryOpt.get() != null) {
                modelMapper.map(criminalHistoryOpt.get(), criminalHistoryDto);
                for (int i = 0; criminalHistoryOpt.get().getCriminalHistoryRecordList().size()-1 >=i; i++) {
                    if (criminalHistoryOpt.get().getCriminalHistoryRecordList().size() > recordNumber) {
                        if (i == recordNumber) {
                            criminalHistoryDto.getCriminalHistoryRecordList().get(i).setStatus("INACTIVE");
                            criminalHistoryRepo.save(criminalHistoryOpt.get());
                        }
                    } else {
                        throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
                    }
                }

            }
        }
        else {
            throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
        }
        return  new ResponseEntity("Operation Successful",HttpStatus.OK);
    }
}
