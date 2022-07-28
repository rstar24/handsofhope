package com.twn.cyfwms.initialContact.repository;

import com.twn.cyfwms.initialContact.entity.InitialContactPatientCareInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InitialContactPatientCareInfoRepository extends JpaRepository<InitialContactPatientCareInfo,Long> {

    InitialContactPatientCareInfo findByFileDetailsId(Long fileDetailsId);
}
