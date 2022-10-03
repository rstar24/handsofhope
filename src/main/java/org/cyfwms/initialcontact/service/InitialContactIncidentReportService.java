package org.cyfwms.initialcontact.service;

import org.cyfwms.initialcontact.dto.InitialContactIncidentReportDto;

public interface InitialContactIncidentReportService {
    InitialContactIncidentReportDto readAllIncidentReports(Long fileDetailsID);
    InitialContactIncidentReportDto saveAllIncidentReports(InitialContactIncidentReportDto initialContactIncidentReportDto);
}
