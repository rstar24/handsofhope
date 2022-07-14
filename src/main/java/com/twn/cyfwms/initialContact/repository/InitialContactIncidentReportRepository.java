package com.twn.cyfwms.initialContact.repository;

import com.twn.cyfwms.initialContact.entity.InitialContactIncidentReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InitialContactIncidentReportRepository extends JpaRepository <InitialContactIncidentReport,Long>{
    InitialContactIncidentReport findByFileDetailsId(Long fileDetailsId);

}
