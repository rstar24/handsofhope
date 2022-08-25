package com.twn.cyfwms.participant.repository;

import com.twn.cyfwms.participant.entity.CriminalHistoryRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CriminalHistoryRecordRepository extends JpaRepository<CriminalHistoryRecord, Long> {
    @Query(value = "select * from criminalhistoryrecord where criminalHistoryRecordId=? AND status='ACTIVE'",nativeQuery = true)
    CriminalHistoryRecord findByCriminalHistoryRecordId(Long criminalHistoryRecordId);
}
