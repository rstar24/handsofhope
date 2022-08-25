package com.twn.cyfwms.participant.service;
import com.twn.cyfwms.participant.dto.CounselorCFSWorkersDto;
import com.twn.cyfwms.participant.entity.CounselorCFSWorker;
import com.twn.cyfwms.participant.repository.CounselorCFSWorkerRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
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
public class CounselorCFSWorkerServiceImpl implements CounselorCFSWorkerService{
    @Autowired
    CounselorCFSWorkerRepository cfsWorkerRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<CounselorCFSWorkersDto> getAllCounselorCFSWorkers(Long participantId) {
        List<CounselorCFSWorkersDto> counselorCFSWorkersDtoList = new ArrayList<CounselorCFSWorkersDto>();
        if (participantId != 0) {
            List<CounselorCFSWorker> CounselorCFSWorkersList = cfsWorkerRepository.findByParticipantId(participantId);
            if (CounselorCFSWorkersList != null) {
                counselorCFSWorkersDtoList = modelMapper.map(CounselorCFSWorkersList, new TypeToken<List<CounselorCFSWorkersDto>>() {}.getType());
                for (int i = 0; i < counselorCFSWorkersDtoList.size(); ++i) {
                    if (counselorCFSWorkersDtoList.get(i).getStartDate() == null) {
                        counselorCFSWorkersDtoList.get(i).setStartDate(LocalDate.of(1,1,1));
                    }
                    if (counselorCFSWorkersDtoList.get(i).getEndDate() == null) {
                        counselorCFSWorkersDtoList.get(i).setEndDate(LocalDate.of(1,1,1));
                    }
                }
            } else {
                throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
            }
        }
        return counselorCFSWorkersDtoList;
    }

    @Override
    public List<CounselorCFSWorkersDto> saveAllCounselorCFSWorkers(List<CounselorCFSWorkersDto> CounselorCFSWorkersDtoList) {
        for (CounselorCFSWorkersDto CounselorCFSWorkersDto: CounselorCFSWorkersDtoList) {
            CounselorCFSWorker counselorCFSWorker = null;
            if (CounselorCFSWorkersDto.getCounselorCFSWorkerId() == 0) {
                counselorCFSWorker = new CounselorCFSWorker();
                modelMapper.map(CounselorCFSWorkersDto, counselorCFSWorker);
                counselorCFSWorker.setStatus("ACTIVE");
            } else {
                counselorCFSWorker = cfsWorkerRepository.findById(CounselorCFSWorkersDto.getCounselorCFSWorkerId()).get();
                modelMapper.map(CounselorCFSWorkersDto, counselorCFSWorker);
            }
            counselorCFSWorker = cfsWorkerRepository.save(counselorCFSWorker);
            CounselorCFSWorkersDto.setCounselorCFSWorkerId(counselorCFSWorker.getCounselorCFSWorkerId());
        }
        return CounselorCFSWorkersDtoList;
    }

    @Override
    public ResponseEntity CounselorCFSWorker(Long counselorCFSWorkerId) {
            List<CounselorCFSWorker> counselorCFSWorkersOpt = cfsWorkerRepository.findByCounselorCFSWorkerId(counselorCFSWorkerId);
            if (!counselorCFSWorkersOpt.isEmpty()) {
                for (int i = 0; i < counselorCFSWorkersOpt.size(); ++i) {
                    counselorCFSWorkersOpt.get(i).setStatus("INACTIVE");
                    cfsWorkerRepository.save(counselorCFSWorkersOpt.get(i));
                }
            } else {
                throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
            }
        return new ResponseEntity("Operation Successful", HttpStatus.OK);
    }
}
