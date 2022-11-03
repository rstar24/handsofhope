package org.cyfwms.caregiver.service;

import org.cyfwms.caregiver.dto.CareGiverReminderDto;

public interface CareGiverReminderService {

    CareGiverReminderDto saveCGReminder(CareGiverReminderDto careGiverReminderDto);

    CareGiverReminderDto readCGReminder(Long cgReminderId);

    void removeCGReminder(Long cgReminderId);
}
