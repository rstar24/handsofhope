package org.cyfwms.participant.service;

import org.cyfwms.participant.dto.EducationAndEmploymentCompositeDto;
import org.cyfwms.participant.dto.EducationDto;
import org.cyfwms.participant.dto.EmploymentDto;
import org.cyfwms.participant.entity.Education;
import org.cyfwms.participant.entity.Employment;
import org.cyfwms.participant.repository.EducationRepository;
import org.cyfwms.participant.repository.EmploymentRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@AllArgsConstructor
public class EducationAndEmploymentServiceImpl implements EducationAndEmploymentService {
    @Autowired
    private EducationRepository educationRepository;

    @Autowired
    EmploymentRepository employmentRepository;

    @Autowired
    EmploymentService employmentService;

    @Autowired
    EducationService educationService;



    @Override
    public EducationAndEmploymentCompositeDto readEducationAndEmployment(Long participantId) {
        EducationAndEmploymentCompositeDto educationAndEmploymentCompositeDto = new EducationAndEmploymentCompositeDto();
        if (participantId != 0) {
            Education education =
                    educationRepository.findByParticipantId(participantId);
            if (education != null) {
                BeanUtils.copyProperties(education, educationAndEmploymentCompositeDto);
            }
            Employment employment = employmentRepository.findByParticipantId(participantId);
            if (employment != null) {
                BeanUtils.copyProperties(employment, educationAndEmploymentCompositeDto);
            }
        }
        return educationAndEmploymentCompositeDto;
    }

    @Override
    public EducationAndEmploymentCompositeDto saveEducationAndEmployment(EducationAndEmploymentCompositeDto educationAndEmploymentCompositeDto) {
        EducationDto educationDto = new EducationDto();
        BeanUtils.copyProperties(educationAndEmploymentCompositeDto,educationDto);
        educationService.saveEducation(educationDto);
        educationAndEmploymentCompositeDto.setEducationId(educationDto.getEducationId());
        EmploymentDto employmentDto = new EmploymentDto();
        BeanUtils.copyProperties(educationAndEmploymentCompositeDto,employmentDto);
        employmentService.saveEmployment(employmentDto);
        educationAndEmploymentCompositeDto.setEmploymentId(employmentDto.getEmploymentId());
        return educationAndEmploymentCompositeDto;
    }
}
