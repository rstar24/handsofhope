package com.twn.codetable.service;

import com.twn.codetable.constants.ResponseDataType;
import com.twn.codetable.dto.DataResponseDto;
import com.twn.codetable.helper.DataReferenceHelper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class DataReferenceServiceImpl implements DataReferenceService{

    private DataReferenceHelper dataReferenceHelper;

    public DataResponseDto getAllGenderTypes() {
        return DataResponseDto.builder()
                .type(ResponseDataType.gender.name())
                .valuesMap(dataReferenceHelper.getGender())
                .build();
    }


    public DataResponseDto getAllMaritalStatusValue() {
        return
                DataResponseDto.builder()
                .type(ResponseDataType.maritalStatus.name())
                .valuesMap(dataReferenceHelper.getMaritalStatus())
                .build();
}

    public DataResponseDto getAllRoleValue() {
        return
                DataResponseDto.builder()
                        .type(ResponseDataType.role.name())
                        .valuesMap(dataReferenceHelper.getRole())
                        .build();
    }


    public DataResponseDto getAllEducationValue() {
        return
                DataResponseDto.builder()
                        .type(ResponseDataType.education.name())
                        .valuesMap(dataReferenceHelper.getEducation())
                        .build();
    }

    public DataResponseDto getAllEmployeeValue() {
        return
                DataResponseDto.builder()
                        .type(ResponseDataType.typeOfEmployee.name())
                        .valuesMap(dataReferenceHelper.getTypeOfEmployee())
                        .build();
    }
}
