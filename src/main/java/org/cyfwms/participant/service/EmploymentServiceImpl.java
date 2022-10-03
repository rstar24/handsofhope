package org.cyfwms.participant.service;

import org.cyfwms.participant.dto.EmploymentDto;
import org.cyfwms.participant.entity.Employment;
import org.cyfwms.participant.repository.EmploymentRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

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
        if (participantId != 0) {
            Employment employment = employmentRepository.findByParticipantId(participantId);
            if (employment != null) {
                modelMapper.map(employment, employmentDto);
            }
        }
        return employmentDto;
    }

    @Override
    public EmploymentDto saveEmployment(EmploymentDto employmentDto) {
        Employment employment = null;
        if (employmentDto.getEmploymentId() == 0) {
            employment = new Employment();
            modelMapper.map(employmentDto, employment);
        } else {
            employment = employmentRepository.findById(employmentDto.getEmploymentId()).get();
            modelMapper.map(employmentDto, employment);
        }
        employment = employmentRepository.save(employment);
        employmentDto.setEmploymentId(employment.getEmploymentId());
        return employmentDto;
    }
}
