package org.cyfwms.common.service;

import java.time.LocalDate;
import java.util.List;
import org.cyfwms.common.dto.CalenderReminderDto;

public interface ReminderService {
	List<CalenderReminderDto> getAllReminderCalenderDate(LocalDate dateTime);
}
