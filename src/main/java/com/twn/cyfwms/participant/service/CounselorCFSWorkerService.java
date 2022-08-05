package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.CounselorCFSWorkersDto;
import org.springframework.http.ResponseEntity;


import java.util.List;

public interface CounselorCFSWorkerService {
    List<CounselorCFSWorkersDto> getAllCounselorCFSWorkers(Long participantId);

    List<CounselorCFSWorkersDto> saveAllCounselorCFSWorkers(List<CounselorCFSWorkersDto> CounselorCFSWorkersDtoList);


    ResponseEntity CounselorCFSWorker(Long referenceId, Long recordNumber);
}
