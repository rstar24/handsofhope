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
}
