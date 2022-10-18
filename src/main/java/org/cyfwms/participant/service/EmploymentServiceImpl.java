package org.cyfwms.participant.service;

import lombok.AllArgsConstructor;
import org.cyfwms.participant.dto.EmploymentDto;
import org.cyfwms.participant.entity.Employment;
import org.cyfwms.participant.repository.EmploymentRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmploymentServiceImpl implements EmploymentService {
    @Autowired
    private EmploymentRepository employmentRepository;


    @Override
    public EmploymentDto readEmployment(Long participantId) {
        EmploymentDto employmentDto = new EmploymentDto();
        if (participantId != 0) {
            Employment employment = employmentRepository.findByParticipantId(participantId);
            if (employment != null) {
                BeanUtils.copyProperties(employment, employmentDto);
            }
        }
        return employmentDto;
    }

    @Override
    public EmploymentDto saveEmployment(EmploymentDto employmentDto) {
        Employment employment = null;
        if (employmentDto.getEmploymentId() == 0) {
            employment = new Employment();
            BeanUtils.copyProperties(employmentDto, employment);
        } else {
            employment = employmentRepository.findById(employmentDto.getEmploymentId()).get();
            BeanUtils.copyProperties(employmentDto, employment);
        }
        employment = employmentRepository.save(employment);
        employmentDto.setEmploymentId(employment.getEmploymentId());
        return employmentDto;
    }
}
