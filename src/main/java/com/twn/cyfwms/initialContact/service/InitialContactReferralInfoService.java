package com.twn.cyfwms.initialContact.service;

import com.twn.cyfwms.initialContact.dto.InitialContactReferralInfoDto;

public interface InitialContactReferralInfoService {
    InitialContactReferralInfoDto readAllReferralInfo(Long fileDetailsId);
    InitialContactReferralInfoDto saveAllReferralInfo(InitialContactReferralInfoDto initialContactReferralInfoDto);
}
