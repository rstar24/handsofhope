package com.twn.cyfwms.participant.repository;

import com.twn.cyfwms.participant.entity.CounselorCFSWorker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CounselorCFSWorkerRepository extends JpaRepository<CounselorCFSWorker, Long> {
    List<CounselorCFSWorker> findByParticipantId(Long participantId);
}
