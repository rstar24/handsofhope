package org.cyfwms.caregiver.service;

import java.util.List;
import org.cyfwms.caregiver.dto.CaregiverAppointmentDto;

public interface CGAppointmentService {
	List<CaregiverAppointmentDto> saveCgAppointment(
		CaregiverAppointmentDto caregiverAppointmentDto
	);

	void removeICAppointment(Long cgAppointmentId);

	CaregiverAppointmentDto readOneAppointment(Long cgAppointmentId);
}
