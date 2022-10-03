package org.cyfwms.initialcontact.service;

import org.cyfwms.initialcontact.dto.InitialContactReferralInfoDto;

public interface InitialContactReferralInfoService {
    InitialContactReferralInfoDto readAllReferralInfo(Long fileDetailsId);
    InitialContactReferralInfoDto saveAllReferralInfo(InitialContactReferralInfoDto initialContactReferralInfoDto);
}
