package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.EducationDto;
import com.twn.cyfwms.participant.entity.Education;
import com.twn.cyfwms.participant.repository.EducationRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

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
        if (participantId != 0) {
            Education education = educationRepository.findByParticipantId(participantId);
            if (education != null) {
                modelMapper.map(education, educationDto);
            } else {
                throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
            }
        }
        return educationDto;
    }

    @Override
    public EducationDto saveEducation(EducationDto educationDto) {
        Education education = null;
        if (educationDto.getEducationId() == 0) {
            education = new Education();
            modelMapper.map(educationDto, education);
        } else {
            education = educationRepository.findById(educationDto.getEducationId()).get();
            modelMapper.map(educationDto, education);
        }
        education = educationRepository.save(education);
        educationDto.setEducationId(education.getEducationId());
        return educationDto;
    }
}
