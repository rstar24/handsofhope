package com.twn.cyfwms.participant.repository;

import com.twn.cyfwms.participant.entity.CounselorCFSWorker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CounselorCFSWorkerRepository extends JpaRepository<CounselorCFSWorker, Long> {
}
