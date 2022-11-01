package org.cyfwms.common.service;

import org.cyfwms.common.dto.AppointmentDto;
import org.cyfwms.common.dto.CalenderCommonDto;
import org.cyfwms.common.dto.CalenderDto;

import java.time.LocalDate;
import java.util.List;

public interface AppointmentService {

    AppointmentDto getOneAppointment(Long appointmentId);

    List<CalenderDto> getAllDate(LocalDate date);

    List<CalenderCommonDto> getAllCommonCalenderDate(LocalDate dateTime);
}
