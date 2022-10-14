package org.cyfwms.common.codetable.service;

import org.cyfwms.common.codetable.constants.ResponseDataType;
import org.cyfwms.common.codetable.dto.DataResponseDto;
import org.cyfwms.common.codetable.helper.DataRefCaregivers;
import org.cyfwms.common.codetable.helper.DataRefCluturalProgAndAct;
import org.cyfwms.common.codetable.helper.DataReferenceParticipant;
import org.cyfwms.common.codetable.helper.DataReferenceInitialcontact;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class DataReferenceServiceImpl implements DataReferenceService{

    private DataReferenceParticipant dataReferenceParticipant;
    private DataReferenceInitialcontact dataReferenceInitilcontact;
    private DataRefCluturalProgAndAct   dataRefCluturalProgAndAct;
    private DataRefCaregivers dataRefCaregivers;

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

    @Override
    public DataResponseDto getAllCulturalTypeValue() {
        return  DataResponseDto.builder()
                .type(ResponseDataType.cluturalType.name())
                .valuesMap(dataRefCluturalProgAndAct.getCulturalType())
                .build();
    }

    @Override
    public DataResponseDto getAllCulturalStatusValue() {
        return  DataResponseDto.builder()
                .type(ResponseDataType.culturalStatus.name())
                .valuesMap(dataRefCluturalProgAndAct.getCulturalStatus())
                .build();
    }
    @Override
    public DataResponseDto getAllCaregiversStatusValue() {
        return  DataResponseDto.builder()
                .type(ResponseDataType.caregiversStatus.name())
                .valuesMap(dataRefCaregivers.getCaregiversStatus())
                .build();
    }

    @Override
    public DataResponseDto getAllFrequencyValue() {
        return  DataResponseDto.builder()
                .type(ResponseDataType.frequency.name())
                .valuesMap(dataRefCaregivers.getFrequency())
                .build();
    }

}
