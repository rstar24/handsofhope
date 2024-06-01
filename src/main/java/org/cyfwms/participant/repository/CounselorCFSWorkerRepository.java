package org.cyfwms.participant.repository;

import java.util.List;
import org.cyfwms.participant.entity.CounselorCFSWorker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CounselorCFSWorkerRepository
	extends JpaRepository<CounselorCFSWorker, Long> {
	@Query(
		value = "select * from counselorcfsworker where participantId=? AND status='ACTIVE'",
		nativeQuery = true
	)
	List<CounselorCFSWorker> findByParticipantId(Long participantId);

	@Query(
		value = "select * from counselorcfsworker where counselorCFSWorkerId=? AND status='ACTIVE'",
		nativeQuery = true
	)
	List<CounselorCFSWorker> findByCounselorCFSWorkerId(Long counselorCFSWorkerId);
}
