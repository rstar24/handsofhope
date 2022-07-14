package com.twn.cyfwms.initialContact.service;

import com.twn.cyfwms.initialContact.dto.InitialContactPatientCareInfoDto;

public interface InitialContactPatientCareInfoService {
    InitialContactPatientCareInfoDto readAllPatientCareInfo(Long fileDetailsId);
    InitialContactPatientCareInfoDto saveAllPatientCareInfo(InitialContactPatientCareInfoDto initialContactPatientCareInfoDto);
}
