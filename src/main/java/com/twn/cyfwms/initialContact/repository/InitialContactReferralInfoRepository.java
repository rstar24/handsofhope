package com.twn.cyfwms.initialContact.repository;

import com.twn.cyfwms.initialContact.entity.InitialContactReferralInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InitialContactReferralInfoRepository extends JpaRepository<InitialContactReferralInfo, Long> {
    InitialContactReferralInfo findByFileDetailsId(Long fileDetailsId);
}
