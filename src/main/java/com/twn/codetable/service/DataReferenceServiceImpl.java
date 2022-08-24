package com.twn.codetable.service;

import com.twn.codetable.constants.ResponseDataType;
import com.twn.codetable.dto.DataResponseDto;
import com.twn.codetable.helper.DataReferenceParticipant;
import com.twn.codetable.helper.DataReferenceInitialcontact;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class DataReferenceServiceImpl implements DataReferenceService{

    private DataReferenceParticipant dataReferenceParticipant;
    private DataReferenceInitialcontact dataReferenceInitilcontact;

    public DataResponseDto getAllGenderTypes() {
        return DataResponseDto.builder()
                .type(ResponseDataType.gender.name())
                .valuesMap(dataReferenceParticipant.getGender())
                .build();
    }


    public DataResponseDto getAllMaritalStatusValue() {
        return
                DataResponseDto.builder()
                .type(ResponseDataType.maritalStatus.name())
                .valuesMap(dataReferenceParticipant.getMaritalStatus())
                .build();
}
public DataResponseDto getAllProvinceValue() {
        return
                DataResponseDto.builder()
                .type(ResponseDataType.provin.name())
                .valuesMap(dataReferenceParticipant.getProvince())
                .build();
}

    public DataResponseDto getAllRoleValue() {
        return
                DataResponseDto.builder()
                        .type(ResponseDataType.role.name())
                        .valuesMap(dataReferenceParticipant.getRole())
                        .build();
    }


    public DataResponseDto getAllEducationValue() {
        return
                DataResponseDto.builder()
                        .type(ResponseDataType.education.name())
                        .valuesMap(dataReferenceParticipant.getEducation())
                        .build();
    }

    public DataResponseDto getAllEmployeeValue() {
        return
                DataResponseDto.builder()
                        .type(ResponseDataType.typeOfEmployee.name())
                        .valuesMap(dataReferenceParticipant.getTypeOfEmployee())
                        .build();
    }

    @Override
    public DataResponseDto getAllInitialContactStatusValue() {
        return
                DataResponseDto.builder()
                        .type(ResponseDataType.initialContactStatus.name())
                        .valuesMap(dataReferenceInitilcontact.getInitialContactStatus())
                        .build();
    }

    @Override
    public DataResponseDto getAllInitialContactReferralValue() {
        return
                DataResponseDto.builder()
                        .type(ResponseDataType.initialContactReferral.name())
                        .valuesMap(dataReferenceInitilcontact.getInitialContactReferral())
                        .build();
    }

    @Override
    public DataResponseDto getAllPresentConcernsValue() {
        return
                DataResponseDto.builder()
                        .type(ResponseDataType.presentConcerns.name())
                        .valuesMap(dataReferenceInitilcontact.getPresentConcerns())
                        .build();
    }

    @Override
    public DataResponseDto getAllMentalHealthOrSubstanceAbuseValue() {
        return
                DataResponseDto.builder()
                        .type(ResponseDataType.mentalHealthOrSubstanceAbuse.name())
                        .valuesMap(dataReferenceInitilcontact.getMentalHealthOrSubstanceAbuse())
                        .build();
    }

    @Override
    public DataResponseDto getAllTypeOfPatientValue() {
        return
                DataResponseDto.builder()
                        .type(ResponseDataType.typeOfPatient.name())
                        .valuesMap(dataReferenceInitilcontact.getTypeOfPatient())
                        .build();
    }

    @Override
    public DataResponseDto getAllRiskValue() {
        return
                DataResponseDto.builder()
                        .type(ResponseDataType.risk.name())
                        .valuesMap(dataReferenceInitilcontact.getRisk())
                        .build();
    }

    @Override
    public DataResponseDto getAllContactMethodValue() {
        return  DataResponseDto.builder()
                .type(ResponseDataType.contactMethod.name())
                .valuesMap(dataReferenceInitilcontact.getContactMethod())
                .build();
    }

}
