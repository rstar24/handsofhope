package com.twn.cyfwms.initialContact.service;

import com.twn.cyfwms.initialContact.dto.InitialContactIncidentReportDto;

import com.twn.cyfwms.initialContact.entity.InitialContactIncidentReport;
import com.twn.cyfwms.initialContact.repository.InitialContactIncidentReportRepository;
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
        InitialContactIncidentReportDto initialContactIncidentReportDto = new InitialContactIncidentReportDto();
        if(fileDetailsID!=0) {
            InitialContactIncidentReport initialContactIncidentReport =
                    initialContactIncidentReportRepository.findByFileDetailsId(fileDetailsID);

            if (initialContactIncidentReport != null) {
                modelMapper.map(initialContactIncidentReport, initialContactIncidentReportDto);
            } else {
                throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
            }

        }
        return initialContactIncidentReportDto;
    }

    @Override
    public InitialContactIncidentReportDto saveAllIncidentReports(InitialContactIncidentReportDto initialContactIncidentReportDto) {
        InitialContactIncidentReport initialContactIncidentReport=null;
        if(initialContactIncidentReportDto.getFileDetailsId()==0) {
            initialContactIncidentReport=new InitialContactIncidentReport();
            modelMapper.map(initialContactIncidentReportDto, initialContactIncidentReport);
        }else {
            initialContactIncidentReport=initialContactIncidentReportRepository.findById(initialContactIncidentReportDto.getFileDetailsId()).get();
            modelMapper.map(initialContactIncidentReportDto, initialContactIncidentReport);
        }
        initialContactIncidentReport=initialContactIncidentReportRepository.save(initialContactIncidentReport);
        initialContactIncidentReportDto.setFileDetailsId(initialContactIncidentReport.getFileDetailsId());
        return initialContactIncidentReportDto;
    }
}
