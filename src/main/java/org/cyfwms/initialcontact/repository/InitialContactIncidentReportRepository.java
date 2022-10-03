package org.cyfwms.initialcontact.repository;

import org.cyfwms.initialcontact.entity.InitialContactIncidentReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InitialContactIncidentReportRepository extends JpaRepository<InitialContactIncidentReport, Long> {
    InitialContactIncidentReport findByFileDetailsId(Long fileDetailsId);
}
