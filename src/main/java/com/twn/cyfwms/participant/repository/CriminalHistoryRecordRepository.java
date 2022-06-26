package com.twn.cyfwms.participant.repository;

import com.twn.cyfwms.participant.entity.CriminalHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CriminalHistoryRecordRepository extends JpaRepository<CriminalHistory, Long> {
}
