package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.EducationAndEmploymentCompositeDto;
import com.twn.cyfwms.participant.dto.EducationDto;

public interface EducationAndEmploymentService {
    EducationAndEmploymentCompositeDto readEducationAndEmployment(Long participantId);

    EducationAndEmploymentCompositeDto  saveEducationAndEmployment(EducationAndEmploymentCompositeDto educationAndEmploymentCompositeDto);
}
