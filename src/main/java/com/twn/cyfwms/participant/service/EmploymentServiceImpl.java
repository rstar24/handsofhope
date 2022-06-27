package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.dto.EmploymentDto;
import com.twn.cyfwms.participant.entity.Employment;
import com.twn.cyfwms.participant.repository.EmploymentRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class EmploymentServiceImpl implements EmploymentService {
    @Autowired
    private EmploymentRepository employmentRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public EmploymentDto readEmployment(Long participantId) {
        EmploymentDto employmentDto = new EmploymentDto();
        if(participantId != 0) {
            Employment employment =
                    employmentRepository.findByParticipantId(participantId);
            modelMapper.map(employment, employmentDto);
        }
        return employmentDto;
    }

    @Override
    public EmploymentDto saveEmployment(EmploymentDto employmentDto) {
        Employment employment = null;
        if(employmentDto.getEmploymentId() == 0){
            employment = new Employment();
            modelMapper.map(employmentDto, employment);
            employment.setCreationDate(LocalDate.now());
            employment.setStatus("ACTIVE");
        }else {
            employment =
                    employmentRepository.findById(employmentDto.getEmploymentId()).get();
            modelMapper.map(employmentDto, employment);
        }
        employment.setLastwritten(LocalDateTime.now());
        employment = employmentRepository.save(employment);
        employmentDto.setEmploymentId(employment.getEmploymentId());
        return employmentDto;
    }
}
