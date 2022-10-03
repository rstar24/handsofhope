package org.cyfwms.initialcontact.repository;

import org.cyfwms.initialcontact.entity.InitialContactPatientCareInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InitialContactPatientCareInfoRepository extends JpaRepository<InitialContactPatientCareInfo,Long> {
    InitialContactPatientCareInfo findByFileDetailsId(Long fileDetailsId);
}
