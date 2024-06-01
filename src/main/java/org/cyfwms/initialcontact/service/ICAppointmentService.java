package org.cyfwms.initialcontact.service;

import java.util.List;
import org.cyfwms.initialcontact.dto.ICAppointmentDto;

public interface ICAppointmentService {
	List<ICAppointmentDto> saveICAppointment(ICAppointmentDto icAppointmentDto);
	List<ICAppointmentDto> readAllICAppointment(Long fileDetailsId) throws Exception;
	void removeICAppointment(Long ICAppointmentId);
	ICAppointmentDto readOneAppointment(Long ICAppointmentId);
}
