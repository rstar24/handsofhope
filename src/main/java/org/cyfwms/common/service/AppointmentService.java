package org.cyfwms.common.service;

import org.cyfwms.common.dto.AppointmentDto;
import org.cyfwms.common.dto.CalenderDto;
import org.cyfwms.common.entity.Appointments;

import java.time.LocalDate;
import java.util.List;

public interface AppointmentService {

    AppointmentDto getOneAppointment(Long appointmentId);
    List<CalenderDto> getAllDate(LocalDate date);
}
