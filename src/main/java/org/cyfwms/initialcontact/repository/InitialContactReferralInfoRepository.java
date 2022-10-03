package org.cyfwms.initialcontact.repository;

import org.cyfwms.initialcontact.entity.InitialContactReferralInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InitialContactReferralInfoRepository extends JpaRepository<InitialContactReferralInfo, Long> {
    InitialContactReferralInfo findByFileDetailsId(Long fileDetailsId);
}
