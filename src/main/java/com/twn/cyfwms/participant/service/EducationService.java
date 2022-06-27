package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.EducationDto;

public interface EducationService {
    EducationDto readEducation(Long participantId);

    EducationDto saveEducation(EducationDto educationDto);
}
