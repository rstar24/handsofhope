package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.EducationDto;
import com.twn.cyfwms.participant.dto.EmploymentDto;

public interface EmploymentService {
    EmploymentDto readEmployment(Long participantId);

    EmploymentDto saveEmployment(EmploymentDto employmentDto);
}
