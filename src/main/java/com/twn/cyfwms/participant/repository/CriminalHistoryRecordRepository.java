package com.twn.cyfwms.participant.repository;

import com.twn.cyfwms.participant.entity.CriminalHistoryRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CriminalHistoryRecordRepository extends JpaRepository<CriminalHistoryRecord, Long> {
}
