package com.twn.cyfwms.initialContact.service;


import com.twn.cyfwms.initialContact.dto.InitialContactReferralInfoDto;
import com.twn.cyfwms.initialContact.entity.InitialContactReferralInfo;
import com.twn.cyfwms.initialContact.repository.InitialContactReferralInfoRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@AllArgsConstructor
public class InitialContactReferralInfoServiceImpl implements InitialContactReferralInfoService{
    @Autowired
    InitialContactReferralInfoRepository initialContactReferralInfoRepository;
    @Autowired
    ModelMapper modelMapper;
    @Override
    public InitialContactReferralInfoDto readAllReferralInfo(Long fileDetailsId) {
        InitialContactReferralInfoDto initialContactReferralInfoDto = new InitialContactReferralInfoDto();
        if(fileDetailsId!=0) {
            InitialContactReferralInfo initialContactReferralInfo =
                    initialContactReferralInfoRepository.findByFileDetailsId(fileDetailsId);

            if (initialContactReferralInfo != null) {
                modelMapper.map(initialContactReferralInfo, initialContactReferralInfoDto);
            } else {
                throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
            }

        }
        return initialContactReferralInfoDto;

    }

    @Override
    public InitialContactReferralInfoDto saveAllReferralInfo(InitialContactReferralInfoDto initialContactReferralInfoDto) {
        InitialContactReferralInfo initialContactReferralInfo=null;
        if(initialContactReferralInfoDto.getReferralInfoId()==0) {
            initialContactReferralInfo=new InitialContactReferralInfo();
            modelMapper.map(initialContactReferralInfoDto, initialContactReferralInfo);
        }else {
            initialContactReferralInfo=initialContactReferralInfoRepository
                    .findById(initialContactReferralInfoDto.getReferralInfoId()).get();
            modelMapper.map(initialContactReferralInfoDto, initialContactReferralInfo);
        }
        initialContactReferralInfo=initialContactReferralInfoRepository.save(initialContactReferralInfo);
        initialContactReferralInfoDto.setFileDetailsId(initialContactReferralInfo.getFileDetailsId());
        return initialContactReferralInfoDto;
    }
}
