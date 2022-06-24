package com.twn.cyfwms.participant.repository;

import com.twn.cyfwms.participant.entity.Address;
import com.twn.cyfwms.participant.entity.CriminalHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CriminalHistoryRecordRepository extends JpaRepository<CriminalHistory, Long> {
}
