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
public DataResponseDto getAllProvinceValue() {
        return
                DataResponseDto.builder()
                .type(ResponseDataType.provin.name())
                .valuesMap(dataReferenceHelper.getProvince())
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

    @Override
    public DataResponseDto getAllInitialContactStatusValue() {
        return
                DataResponseDto.builder()
                        .type(ResponseDataType.initialContactStatus.name())
                        .valuesMap(dataReferenceHelper.getInitialContactStatus())
                        .build();
    }

    @Override
    public DataResponseDto getAllInitialContactReferralValue() {
        return
                DataResponseDto.builder()
                        .type(ResponseDataType.initialContactReferral.name())
                        .valuesMap(dataReferenceHelper.getInitialContactReferral())
                        .build();
    }

    @Override
    public DataResponseDto getAllPresentConcernsValue() {
        return
                DataResponseDto.builder()
                        .type(ResponseDataType.presentConcerns.name())
                        .valuesMap(dataReferenceHelper.getPresentConcerns())
                        .build();
    }

    @Override
    public DataResponseDto getAllMentalHealthOrSubstanceAbuseValue() {
        return
                DataResponseDto.builder()
                        .type(ResponseDataType.mentalHealthOrSubstanceAbuse.name())
                        .valuesMap(dataReferenceHelper.getMentalHealthOrSubstanceAbuse())
                        .build();
    }

    @Override
    public DataResponseDto getAllTypeOfPatientValue() {
        return
                DataResponseDto.builder()
                        .type(ResponseDataType.typeOfPatient.name())
                        .valuesMap(dataReferenceHelper.getTypeOfPatient())
                        .build();
    }

    @Override
    public DataResponseDto getAllRiskValue() {
        return
                DataResponseDto.builder()
                        .type(ResponseDataType.risk.name())
                        .valuesMap(dataReferenceHelper.getRisk())
                        .build();
    }

    @Override
    public DataResponseDto getAllContactMethodValue() {
        return  DataResponseDto.builder()
                .type(ResponseDataType.contactMethod.name())
                .valuesMap(dataReferenceHelper.getContactMethod())
                .build();
    }

}
