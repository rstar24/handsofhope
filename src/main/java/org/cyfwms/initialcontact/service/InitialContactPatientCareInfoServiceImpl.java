package org.cyfwms.initialcontact.service;

import org.cyfwms.initialcontact.dto.InitialContactPatientCareInfoDto;
import org.cyfwms.initialcontact.entity.InitialContactPatientCareInfo;
import org.cyfwms.initialcontact.entity.PatientCareInfoOutpatient;
import org.cyfwms.initialcontact.repository.InitialContactPatientCareInfoRepository;
import org.cyfwms.initialcontact.repository.PatientCareInfoOutpatientRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@AllArgsConstructor
public class InitialContactPatientCareInfoServiceImpl implements InitialContactPatientCareInfoService {
    @Autowired
    InitialContactPatientCareInfoRepository initialContactPatientCareInfoRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    PatientCareInfoOutpatientRepository patientCareInfoOutpatientRepository;

    @Override
    public InitialContactPatientCareInfoDto readAllPatientCareInfo(Long fileDetailsId) {
        if (fileDetailsId != 0) {
            InitialContactPatientCareInfoDto initialContactPatientCareInfoDto = new InitialContactPatientCareInfoDto();
            InitialContactPatientCareInfo initialContactIncidentReport = initialContactPatientCareInfoRepository.findByFileDetailsId(fileDetailsId);
            if (initialContactIncidentReport != null) {
                modelMapper.map(initialContactIncidentReport, initialContactPatientCareInfoDto);
            } else {
                throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
            }
            return initialContactPatientCareInfoDto;
        }
        throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
    }

    @Override
    public InitialContactPatientCareInfoDto saveAllPatientCareInfo(InitialContactPatientCareInfoDto initialContactPatientCareInfoDto) {
        InitialContactPatientCareInfo initialContactPatientCareInfo=null;
        if(initialContactPatientCareInfoDto.getPatientCareInfoId()==0) {
            initialContactPatientCareInfo=new InitialContactPatientCareInfo();

            modelMapper.map(initialContactPatientCareInfoDto, initialContactPatientCareInfo);
        }else {
            initialContactPatientCareInfo = initialContactPatientCareInfoRepository
                    .findById(initialContactPatientCareInfoDto.getPatientCareInfoId()).get();

             modelMapper.map(initialContactPatientCareInfoDto, initialContactPatientCareInfo);
        }

            initialContactPatientCareInfo = initialContactPatientCareInfoRepository.save(initialContactPatientCareInfo);

            initialContactPatientCareInfoDto.setPatientCareInfoId(initialContactPatientCareInfo.getPatientCareInfoId());
            initialContactPatientCareInfoDto.setInpatient(initialContactPatientCareInfo.getInpatient());
            initialContactPatientCareInfoDto.setOutpatient(initialContactPatientCareInfo.getOutpatient());

            initialContactPatientCareInfo.getInpatient().setPatientCareInfoId(initialContactPatientCareInfo.getPatientCareInfoId());
            initialContactPatientCareInfo.getOutpatient().setPatientCareInfoId(initialContactPatientCareInfo.getPatientCareInfoId());
            initialContactPatientCareInfo.getOutpatient().setCreationDate(initialContactPatientCareInfo.getCreationDate());
            initialContactPatientCareInfo.getInpatient().setCreationDate(initialContactPatientCareInfo.getCreationDate());
            PatientCareInfoOutpatient patientCareInfoOutpatient = patientCareInfoOutpatientRepository.findById(initialContactPatientCareInfo.getOutpatient().getOutpatientId()).get();

            patientCareInfoOutpatientRepository.save(patientCareInfoOutpatient);


       return initialContactPatientCareInfoDto;
    }
}

