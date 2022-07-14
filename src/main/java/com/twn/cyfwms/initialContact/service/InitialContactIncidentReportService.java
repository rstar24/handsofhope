package com.twn.cyfwms.initialContact.service;

import com.twn.cyfwms.initialContact.dto.InitialContactIncidentReportDto;

public interface InitialContactIncidentReportService {
    InitialContactIncidentReportDto readAllIncidentReports(Long fileDetailsID);
    InitialContactIncidentReportDto saveAllIncidentReports(InitialContactIncidentReportDto initialContactIncidentReportDto);
}
