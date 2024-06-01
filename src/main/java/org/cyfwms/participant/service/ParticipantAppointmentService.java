package org.cyfwms.participant.service;

import java.util.List;
import org.cyfwms.common.dto.AppointmentDto;
import org.cyfwms.participant.dto.ParticipantAppointmentDto;

public interface ParticipantAppointmentService {
	List<ParticipantAppointmentDto> saveParticipantAppointment(
		ParticipantAppointmentDto participantAppointmentDto
	);

	void removeParticipantAppointment(Long participantAppointmentId);
	ParticipantAppointmentDto readOneAppointment(Long participantAppointment);
}
