package org.cyfwms.initialcontact.service;

import org.cyfwms.initialcontact.dto.InitialContactPatientCareInfoDto;

public interface InitialContactPatientCareInfoService {
    InitialContactPatientCareInfoDto readAllPatientCareInfo(Long fileDetailsId);
    InitialContactPatientCareInfoDto saveAllPatientCareInfo(InitialContactPatientCareInfoDto initialContactPatientCareInfoDto);
}
