package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.EducationDto;
import com.twn.cyfwms.participant.dto.EmploymentDto;
import com.twn.cyfwms.participant.entity.Education;
import com.twn.cyfwms.participant.entity.Employment;
import com.twn.cyfwms.participant.repository.EducationRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class EducationServiceImpl  implements EducationService{
    @Autowired
    private EducationRepository educationRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public EducationDto readEducation(Long participantId) {
        EducationDto educationDto = new EducationDto();
        if(participantId != 0) {
            Education education =
                    educationRepository.findByParticipantId(participantId);
            modelMapper.map(education, educationDto);
        }
        return educationDto;
    }

    @Override
    public EducationDto saveEducation(EducationDto educationDto) {
        Education education = null;
        if(educationDto.getEducationId() == 0){
            education = new Education();
            modelMapper.map(educationDto, education);
            education.setCreationDate(LocalDate.now());
            education.setStatus("ACTIVE");
        }else {
            education =
                    educationRepository.findById(educationDto.getEducationId()).get();
            modelMapper.map(educationDto, education);
        }
        education.setLastwritten(LocalDateTime.now());
        education = educationRepository.save(education);
        educationDto.setEducationId(education.getEducationId());
        return educationDto;
    }
}
