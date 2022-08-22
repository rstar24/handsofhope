package com.twn.codetable.service;

import com.twn.codetable.dto.DataResponseDto;

public interface DataReferenceService {

    DataResponseDto getAllGenderTypes();

    DataResponseDto getAllMaritalStatusValue();
    DataResponseDto getAllProvinceValue();

    DataResponseDto getAllRoleValue();

    DataResponseDto getAllEducationValue();
    DataResponseDto getAllEmployeeValue();

    DataResponseDto getAllInitialContactStatusValue();

    DataResponseDto getAllInitialContactReferralValue();
    DataResponseDto getAllPresentConcernsValue();
    DataResponseDto getAllMentalHealthOrSubstanceAbuseValue();
    DataResponseDto getAllTypeOfPatientValue();
    DataResponseDto getAllRiskValue();
    DataResponseDto getAllContactMethodValue();
}
