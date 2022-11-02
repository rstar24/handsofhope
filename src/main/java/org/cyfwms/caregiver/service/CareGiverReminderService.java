package org.cyfwms.caregiver.service;

import org.cyfwms.caregiver.dto.CareGiverReminderDto;

import java.util.List;

public interface CareGiverReminderService {

    CareGiverReminderDto saveCGReminder(CareGiverReminderDto careGiverReminderDto);

    CareGiverReminderDto readCGReminder(Long cgReminderId);

    void removeCGReminder(Long referenceId);
}
