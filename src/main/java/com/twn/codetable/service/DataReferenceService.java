package com.twn.codetable.service;

import com.twn.codetable.dto.DataResponseDto;

public interface DataReferenceService {

    DataResponseDto getAllGenderTypes();

    DataResponseDto getAllMaritalStatusValue();

    DataResponseDto getAllRoleValue();

    DataResponseDto getAllEducationValue();

    DataResponseDto getAllEmployeeValue();
}
