package org.cyfwms.common.service;

import org.cyfwms.common.dto.AppointmentDto;
import org.cyfwms.common.dto.CalenderDto;
import org.cyfwms.common.entity.Appointments;
import org.cyfwms.common.repository.AppointmentRepository;
import org.cyfwms.participant.dto.HouseholdMemberDto;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentServiceImpl implements  AppointmentService {
    @Autowired
    AppointmentRepository appointmentRepository;

    @Override
    public AppointmentDto getOneAppointment(Long appointmentId) {
        AppointmentDto appointmentDto = new AppointmentDto();
        if (appointmentId != 0) {
            Appointments appointments = appointmentRepository.findByAppointmentId(appointmentId);
            if (appointments != null) {
                BeanUtils.copyProperties(appointments, appointmentDto);
            }

        }
        return appointmentDto;
    }

    @Override
    public List<CalenderDto> getAllDate(LocalDate date) {
        List<Appointments> appointments = appointmentRepository.findByDate(date);
            List<CalenderDto> calenderDtos = appointments.stream().
                    map(hm -> {
                        CalenderDto calenderDto = new CalenderDto();
                        BeanUtils.copyProperties(hm, calenderDto);
                        return calenderDto;
                    }).collect(Collectors.toList());

        return calenderDtos;
    }
}
