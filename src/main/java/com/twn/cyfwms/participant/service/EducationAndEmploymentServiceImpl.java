package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.EducationAndEmploymentCompositeDto;
import com.twn.cyfwms.participant.dto.EducationDto;
import com.twn.cyfwms.participant.dto.EmploymentDto;
import com.twn.cyfwms.participant.entity.Education;
import com.twn.cyfwms.participant.entity.Employment;
import com.twn.cyfwms.participant.repository.EducationRepository;
import com.twn.cyfwms.participant.repository.EmploymentRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
        if(participantId != 0) {
            Education education =
                    educationRepository.findByParticipantId(participantId);
            if(education!=null) {
                modelMapper.map(education, educationAndEmploymentCompositeDto);
            }else{
                throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
            }
            Employment employment= employmentRepository.findByParticipantId(participantId);
            if(employment!=null) {
                modelMapper.map(employment, educationAndEmploymentCompositeDto);
                if(educationAndEmploymentCompositeDto.getStartDate()==null){
                    educationAndEmploymentCompositeDto.setStartDate(LocalDate.of(1,1,1));
                }
                if (educationAndEmploymentCompositeDto.getEndDate()==null){
                    educationAndEmploymentCompositeDto.setEndDate(LocalDate.of(1,1,1));
                }

            }else{
                throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
            }
        }
        return educationAndEmploymentCompositeDto;
    }

    @Override
    public EducationAndEmploymentCompositeDto saveEducationAndEmployment(EducationAndEmploymentCompositeDto educationAndEmploymentCompositeDto) {

           EducationDto educationDto=new EducationDto();
           modelMapper.map(educationAndEmploymentCompositeDto,educationDto);
           educationService.saveEducation(educationDto);

        EmploymentDto employmentDto=new EmploymentDto();
        modelMapper.map(educationAndEmploymentCompositeDto,employmentDto);
        employmentService.saveEmployment(employmentDto);

        return educationAndEmploymentCompositeDto;
    }

}
