package org.cyfwms.initialcontact.service;

import java.util.List;
import org.cyfwms.initialcontact.dto.ICReminderDto;

public interface ICReminderService {
	List<ICReminderDto> saveICReminder(ICReminderDto icReminderDto);

	ICReminderDto readICReminder(Long icReminderId);

	List<ICReminderDto> readAllICReminder(Long fileDetailsId);

	void removeICReminder(Long icReminderId);
}
