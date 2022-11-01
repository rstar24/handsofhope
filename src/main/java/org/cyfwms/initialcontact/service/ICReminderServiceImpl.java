package org.cyfwms.initialcontact.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cyfwms.common.entity.Reminder;
import org.cyfwms.common.exception.I18Constants;
import org.cyfwms.common.exception.MessageUtil;
import org.cyfwms.common.exception.NoSuchElementFoundException;
import org.cyfwms.common.repository.ReminderRepository;
import org.cyfwms.common.util.ReferenceIDGeneratorUtil;
import org.cyfwms.initialcontact.dto.ICReminderDto;
import org.cyfwms.initialcontact.entity.ICReminder;
import org.cyfwms.initialcontact.repository.ICReminderRepository;
import org.cyfwms.common.dto.ReminderDto;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class ICReminderServiceImpl implements ICReminderService {

    @Autowired
    private ICReminderRepository icReminderRepository;

    @Autowired
    private ReferenceIDGeneratorUtil referenceIDGeneratorUtil;
    @Autowired
    private ReminderRepository reminderRepository;

    @Autowired
    private MessageUtil messageUtil;

    @Override
    public List<ICReminderDto> readICReminder(Long fileDetailsId) {
        log.info("Inside ReadICReminder");
        List<ICReminder> icReminders = icReminderRepository.findByFileDetailsId(fileDetailsId);
        List<ICReminderDto> icReminderDtoList = icReminders.stream().map(icReminder -> {
            ICReminderDto icReminderDto = new ICReminderDto();
            ReminderDto reminderDto = new ReminderDto();
            BeanUtils.copyProperties(icReminder.getReminder(), reminderDto);
            BeanUtils.copyProperties(icReminder, icReminderDto);
            icReminderDto.setReminderDto(reminderDto);
            return icReminderDto;
        }).collect(Collectors.toList());
        log.info("Exit ReadICReminder");
        return icReminderDtoList;
    }

    @Override
    public ICReminderDto saveICReminder(ICReminderDto icReminderDto) {
        log.info("Inside SaveICReminder");
        Reminder reminder = null;
        ICReminder icReminder = new ICReminder();
        if (icReminderDto.getReminderDto().getReminderId() == 0) {
            reminder = new Reminder();
            BeanUtils.copyProperties(icReminderDto.getReminderDto(), reminder);
            BeanUtils.copyProperties(icReminderDto, icReminder);
            icReminder.setStatusOfDeletion("ACTIVE");


        } else {
            icReminder = icReminderRepository.findById(icReminderDto.getFileDetailsId()).get();
            reminder = reminderRepository.findById(icReminderDto.getReminderDto().getReminderId()).get();
            BeanUtils.copyProperties(icReminderDto.getReminderDto(), reminder);

            BeanUtils.copyProperties(icReminderDto, icReminder);

        }
        icReminder.setReminder(reminder);
        icReminder = icReminderRepository.save(icReminder);
        icReminderDto.setFileDetailsId(icReminder.getFileDetailsId());
        icReminderDto.getReminderDto().setReminderId(icReminder.getReminder().getReminderId());
        icReminderDto.setIcReminderId(icReminder.getIcReminderId());
        log.info("Exit SaveICReminder");
        return icReminderDto;
    }

    @Override
    public void removeICReminder(Long icReminderId) {
        log.info("Inside RemoveICReminder");
        ICReminder icReminder =
                icReminderRepository.findById(icReminderId)
                        .orElseThrow(() -> new NoSuchElementFoundException(
                                messageUtil.getLocalMessage(I18Constants.NO_ITEM_FOUND.getKey(),
                                        String.valueOf(icReminderId))));

        if (icReminder.getStatusOfDeletion().equalsIgnoreCase("INACTIVE")) {
            throw new NoSuchElementFoundException(
                    messageUtil.getLocalMessage(I18Constants.NO_ITEM_FOUND.getKey(),
                            String.valueOf(icReminderId)));
        }
        icReminder.setStatusOfDeletion("INACTIVE");
        icReminderRepository.save(icReminder);
        log.info("Exit RemoveICReminder");
    }

}
