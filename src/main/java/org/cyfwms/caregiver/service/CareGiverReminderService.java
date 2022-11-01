package org.cyfwms.caregiver.service;

import org.cyfwms.caregiver.dto.CareGiverReminderDto;

import java.util.List;

public interface CareGiverReminderService {

    CareGiverReminderDto saveCGReminder(CareGiverReminderDto careGiverReminderDto);

    List<CareGiverReminderDto> readCGReminder(Long cgProviderId);

    void removeCGReminder(Long referenceId);
}
