package org.cyfwms.initialcontact.service;

import org.cyfwms.initialcontact.dto.InitialContactIncidentReportDto;
import org.cyfwms.initialcontact.entity.InitialContactIncidentReport;
import org.cyfwms.initialcontact.repository.InitialContactIncidentReportRepository;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@AllArgsConstructor
public class InitialContactIncidentReportServiceImpl implements InitialContactIncidentReportService {
    @Autowired
    InitialContactIncidentReportRepository initialContactIncidentReportRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public InitialContactIncidentReportDto readAllIncidentReports(Long fileDetailsID) {
        if (fileDetailsID != 0) {
            InitialContactIncidentReportDto initialContactIncidentReportDto = new InitialContactIncidentReportDto();
            InitialContactIncidentReport initialContactIncidentReport = initialContactIncidentReportRepository.findByFileDetailsId(fileDetailsID);
            if (initialContactIncidentReport != null) {
                modelMapper.map(initialContactIncidentReport, initialContactIncidentReportDto);
                if (initialContactIncidentReportDto.getDateOfReport() == null) {
                    initialContactIncidentReportDto.setDateOfReport(LocalDate.of(1,1,1));
                }
                if (initialContactIncidentReportDto.getIncidentDate() == null) {
                    initialContactIncidentReportDto.setIncidentDate(LocalDate.of(1,1,1));
                }
                if (initialContactIncidentReportDto.getIncidentTime() == null) {
                    initialContactIncidentReportDto.setIncidentTime(LocalTime.of(1,1,1));
                }
            } else {
                throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
            }
            return initialContactIncidentReportDto;
        }
        throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
    }

    @Override
    public InitialContactIncidentReportDto saveAllIncidentReports(InitialContactIncidentReportDto initialContactIncidentReportDto) {
        InitialContactIncidentReport initialContactIncidentReport = null;
        if (initialContactIncidentReportDto.getIncidentReportId() == 0) {
            initialContactIncidentReport = new InitialContactIncidentReport();
            modelMapper.map(initialContactIncidentReportDto, initialContactIncidentReport);
        } else {
            initialContactIncidentReport = initialContactIncidentReportRepository.findById(initialContactIncidentReportDto.getIncidentReportId()).get();
            modelMapper.map(initialContactIncidentReportDto, initialContactIncidentReport);
        }
        initialContactIncidentReport = initialContactIncidentReportRepository.save(initialContactIncidentReport);
        initialContactIncidentReportDto.setFileDetailsId(initialContactIncidentReport.getFileDetailsId());
        return initialContactIncidentReportDto;
    }
}
