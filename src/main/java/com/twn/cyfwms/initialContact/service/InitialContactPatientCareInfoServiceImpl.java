package com.twn.cyfwms.initialContact.service;


import com.twn.cyfwms.initialContact.dto.InitialContactPatientCareInfoDto;
import com.twn.cyfwms.initialContact.entity.InitialContactPatientCareInfo;
import com.twn.cyfwms.initialContact.repository.InitialContactPatientCareInfoRepository;
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
    @Override
    public InitialContactPatientCareInfoDto readAllPatientCareInfo(Long fileDetailsId) {
        InitialContactPatientCareInfoDto initialContactPatientCareInfoDto = new InitialContactPatientCareInfoDto();
        if(fileDetailsId!=0) {
            InitialContactPatientCareInfo initialContactIncidentReport =
                    initialContactPatientCareInfoRepository.findByFileDetailsId(fileDetailsId);

            if (initialContactIncidentReport != null) {
                modelMapper.map(initialContactIncidentReport, initialContactPatientCareInfoDto);
            } else {
                throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
            }

        }
        return initialContactPatientCareInfoDto;
    }

    @Override
    public InitialContactPatientCareInfoDto saveAllPatientCareInfo(InitialContactPatientCareInfoDto initialContactPatientCareInfoDto) {
        InitialContactPatientCareInfo initialContactPatientCareInfo=null;
        if(initialContactPatientCareInfoDto.getFileDetailsId()==0) {
            initialContactPatientCareInfo=new InitialContactPatientCareInfo();
            modelMapper.map(initialContactPatientCareInfoDto, initialContactPatientCareInfo);
        }else {
            initialContactPatientCareInfo=initialContactPatientCareInfoRepository
                    .findById(initialContactPatientCareInfoDto.getFileDetailsId()).get();
            modelMapper.map(initialContactPatientCareInfoDto, initialContactPatientCareInfo);
        }
        initialContactPatientCareInfo=initialContactPatientCareInfoRepository.save(initialContactPatientCareInfo);
        initialContactPatientCareInfoDto.setFileDetailsId(initialContactPatientCareInfo.getFileDetailsId());
        return initialContactPatientCareInfoDto;
    }
}

