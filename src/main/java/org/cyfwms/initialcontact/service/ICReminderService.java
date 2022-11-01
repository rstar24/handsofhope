package org.cyfwms.initialcontact.service;

import org.cyfwms.initialcontact.dto.ICReminderDto;

import java.util.List;

public interface ICReminderService {

    ICReminderDto saveICReminder(ICReminderDto icReminderDto);

    List<ICReminderDto> readICReminder(Long fileDetailsId);

    void removeICReminder(Long icReminderId);

}
