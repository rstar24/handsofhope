package org.cyfwms.initialcontact.service;
import lombok.AllArgsConstructor;
import org.cyfwms.initialcontact.dto.ICIncidentReportDto;
import org.cyfwms.initialcontact.entity.ICtIncidentReport;
import org.cyfwms.initialcontact.repository.ICIncidentReportRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalTime;
@Service
@AllArgsConstructor
public class ICIncidentReportServiceImpl implements ICIncidentReportService {
    @Autowired
    ICIncidentReportRepository iCIncidentReportRepository;

    @Override
    public ICIncidentReportDto readAllIncidentReports(Long fileDetailsID) {
        ICIncidentReportDto iCIncidentReportDto = new ICIncidentReportDto();
        if (fileDetailsID != 0) {

            ICtIncidentReport iCtIncidentReport = iCIncidentReportRepository.findByFileDetailsId(fileDetailsID);
            if (iCtIncidentReport != null) {
                BeanUtils.copyProperties(iCtIncidentReport, iCIncidentReportDto);
                if (iCIncidentReportDto.getDateOfReport() == null) {
                    iCIncidentReportDto.setDateOfReport(LocalDate.of(1, 1, 1));
                }
                if (iCIncidentReportDto.getIncidentDate() == null) {
                    iCIncidentReportDto.setIncidentDate(LocalDate.of(1, 1, 1));
                }
                if (iCIncidentReportDto.getIncidentTime() == null) {
                    iCIncidentReportDto.setIncidentTime(LocalTime.of(1, 1, 1));
                }
            }

        }
            return iCIncidentReportDto;


    }

    @Override
    public ICIncidentReportDto saveAllIncidentReports(ICIncidentReportDto iCIncidentReportDto) {
        ICtIncidentReport iCtIncidentReport = null;
        if (iCIncidentReportDto.getIncidentReportId() == 0) {
            iCtIncidentReport = new ICtIncidentReport();
            BeanUtils.copyProperties(iCIncidentReportDto, iCtIncidentReport);
        } else {
            iCtIncidentReport = iCIncidentReportRepository.findById(iCIncidentReportDto.getIncidentReportId()).get();
            BeanUtils.copyProperties(iCIncidentReportDto, iCtIncidentReport);
        }
        iCtIncidentReport = iCIncidentReportRepository.save(iCtIncidentReport);
        iCIncidentReportDto.setFileDetailsId(iCtIncidentReport.getFileDetailsId());
        iCIncidentReportDto.setIncidentReportId(iCtIncidentReport.getIncidentReportId());
        return iCIncidentReportDto;
    }
}
