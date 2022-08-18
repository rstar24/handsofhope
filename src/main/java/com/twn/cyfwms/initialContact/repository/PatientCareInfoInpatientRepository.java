package com.twn.cyfwms.initialContact.repository;

import com.twn.cyfwms.initialContact.entity.PatientCareInfoInpatient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientCareInfoInpatientRepository extends JpaRepository<PatientCareInfoInpatient,Long> {
    PatientCareInfoInpatient findByPatientCareInfoId(Long patientCareInfoId);
}
