package org.cyfwms.participant.service;

import lombok.AllArgsConstructor;
import org.cyfwms.participant.dto.EducationDto;
import org.cyfwms.participant.entity.Education;
import org.cyfwms.participant.repository.EducationRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EducationServiceImpl  implements EducationService{
    @Autowired
    private EducationRepository educationRepository;


    @Override
    public EducationDto readEducation(Long participantId) {
        EducationDto educationDto = new EducationDto();
        if (participantId != 0) {
            Education education = educationRepository.findByParticipantId(participantId);
            if (education != null) {
                BeanUtils.copyProperties(education, educationDto);
            }
        }
        return educationDto;
    }

    @Override
    public EducationDto saveEducation(EducationDto educationDto) {
        Education education =  null;
        if (educationDto.getEducationId() == 0) {
            education = new Education();
            BeanUtils.copyProperties(educationDto, education);
        } else {
            education = educationRepository.findById(educationDto.getEducationId()).get();
            BeanUtils.copyProperties(educationDto, education);
        }
        education = educationRepository.save(education);
        educationDto.setEducationId(education.getEducationId());
        return educationDto;
    }
}
