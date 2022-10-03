package org.cyfwms.participant.service;

import org.cyfwms.participant.dto.EducationAndEmploymentCompositeDto;
import org.cyfwms.participant.dto.EducationDto;
import org.cyfwms.participant.dto.EmploymentDto;
import org.cyfwms.participant.entity.Education;
import org.cyfwms.participant.entity.Employment;
import org.cyfwms.participant.repository.EducationRepository;
import org.cyfwms.participant.repository.EmploymentRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
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

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public EducationAndEmploymentCompositeDto readEducationAndEmployment(Long participantId) {
        EducationAndEmploymentCompositeDto educationAndEmploymentCompositeDto = new EducationAndEmploymentCompositeDto();
        if (participantId != 0) {
            Education education =
                    educationRepository.findByParticipantId(participantId);
            if (education != null) {
                modelMapper.map(education, educationAndEmploymentCompositeDto);
            }
            Employment employment = employmentRepository.findByParticipantId(participantId);
            if (employment != null) {
                modelMapper.map(employment, educationAndEmploymentCompositeDto);
            }
        }
        return educationAndEmploymentCompositeDto;
    }

    @Override
    public EducationAndEmploymentCompositeDto saveEducationAndEmployment(EducationAndEmploymentCompositeDto educationAndEmploymentCompositeDto) {
        EducationDto educationDto = new EducationDto();
        modelMapper.map(educationAndEmploymentCompositeDto,educationDto);
        educationService.saveEducation(educationDto);
        EmploymentDto employmentDto = new EmploymentDto();
        modelMapper.map(educationAndEmploymentCompositeDto,employmentDto);
        employmentService.saveEmployment(employmentDto);
        return educationAndEmploymentCompositeDto;
    }
}
