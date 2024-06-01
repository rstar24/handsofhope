package org.cyfwms.caregiver.service;

import java.util.List;
import org.cyfwms.caregiver.dto.CareGiverReminderDto;

public interface CareGiverReminderService {
	List<CareGiverReminderDto> saveCGReminder(CareGiverReminderDto careGiverReminderDto);

	CareGiverReminderDto readCGReminder(Long cgReminderId);

	void removeCGReminder(Long cgReminderId);
}
