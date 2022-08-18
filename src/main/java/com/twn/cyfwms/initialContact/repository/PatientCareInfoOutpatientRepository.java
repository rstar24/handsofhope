package com.twn.cyfwms.initialContact.repository;

import com.twn.cyfwms.initialContact.entity.PatientCareInfoOutpatient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientCareInfoOutpatientRepository extends JpaRepository<PatientCareInfoOutpatient,Long> {
    PatientCareInfoOutpatient findByPatientCareInfoId(Long patientCareInfoId);
}
