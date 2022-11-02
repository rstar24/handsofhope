package org.cyfwms.caregiver.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cyfwms.caregiver.dto.CareGiverReminderDto;
import org.cyfwms.caregiver.entity.CareGiverReminder;
import org.cyfwms.caregiver.repository.CareGiverReminderRepository;
import org.cyfwms.common.dto.ReminderDto;
import org.cyfwms.common.entity.Reminder;
import org.cyfwms.common.exception.I18Constants;
import org.cyfwms.common.exception.MessageUtil;
import org.cyfwms.common.exception.NoSuchElementFoundException;
import org.cyfwms.common.repository.ReminderRepository;
import org.cyfwms.common.util.ReferenceIDGeneratorUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class CareGiverReminderServiceImpl implements CareGiverReminderService{

    @Autowired
    private CareGiverReminderRepository careGiverReminderRepository;

    @Autowired
    private ReferenceIDGeneratorUtil referenceIDGeneratorUtil;

    @Autowired
    private ReminderRepository reminderRepository;

    @Autowired
    private MessageUtil messageUtil;

    @Override
    public CareGiverReminderDto saveCGReminder(CareGiverReminderDto careGiverReminderDto) {
        log.info("Inside SaveCGReminder");
        Reminder reminder = null;
        CareGiverReminder cgReminder = new CareGiverReminder();
        if (careGiverReminderDto.getReminderDto().getReminderId() == 0) {
            reminder = new Reminder();
            BeanUtils.copyProperties(careGiverReminderDto.getReminderDto(), reminder);
            BeanUtils.copyProperties(careGiverReminderDto, cgReminder);
            cgReminder.setStatusOfDeletion("ACTIVE");
            cgReminder.setReferenceId(referenceIDGeneratorUtil.generateCareGiverReminderReferenceID());
        } else {
            cgReminder = careGiverReminderRepository.findById(careGiverReminderDto.getCgReminderId()).get();
            reminder = reminderRepository.findById(careGiverReminderDto.getReminderDto().getReminderId()).get();
            BeanUtils.copyProperties(careGiverReminderDto.getReminderDto(), reminder);

            BeanUtils.copyProperties(careGiverReminderDto, cgReminder);

        }
        cgReminder.setReminder(reminder);
        cgReminder = careGiverReminderRepository.save(cgReminder);
        careGiverReminderDto.setCgReminderId(cgReminder.getCgReminderId());
        careGiverReminderDto.getReminderDto().setReminderId(cgReminder.getReminder().getReminderId());
        careGiverReminderDto.setCgReminderId(cgReminder.getCgReminderId());
        careGiverReminderDto.setReferenceId(cgReminder.getReferenceId());
        log.info("Exit SaveCGReminder");
        return careGiverReminderDto;

    }

    @Override
    public CareGiverReminderDto readCGReminder(Long cgReminderId) {
        log.info("Inside readCGReminder");
        CareGiverReminderDto careGiverReminderDto = new CareGiverReminderDto();
        ReminderDto reminderDto = new ReminderDto();
        if (cgReminderId != 0) {
            Optional<CareGiverReminder> careGiverReminder = Optional.ofNullable(careGiverReminderRepository.findByCGReminderId(cgReminderId));

            if (careGiverReminder.isPresent()) {
                if (careGiverReminder.get().getStatusOfDeletion().equals("ACTIVE")) {
                    BeanUtils.copyProperties(careGiverReminder.get(), careGiverReminderDto);
                    BeanUtils.copyProperties(careGiverReminder.get().getReminder(), reminderDto);
                    careGiverReminderDto.setReminderDto(reminderDto);

                }
            }
        }
        log.info("Exit readCGReminder");
        return careGiverReminderDto;

    }


    @Override
    public void removeCGReminder(Long referenceId) {
        log.info("Inside RemoveCGReminder");
        CareGiverReminder c =
                    careGiverReminderRepository.findById(referenceId)
                            .orElseThrow(() -> new NoSuchElementFoundException(
                                    messageUtil.getLocalMessage(I18Constants.NO_ITEM_FOUND.getKey(),
                                            String.valueOf(referenceId))));

            if (c.getStatusOfDeletion().equalsIgnoreCase("INACTIVE")) {
                throw new NoSuchElementFoundException(
                        messageUtil.getLocalMessage(I18Constants.NO_ITEM_FOUND.getKey(),
                                String.valueOf(referenceId)));
            }
            c.setStatusOfDeletion("INACTIVE");
        careGiverReminderRepository.save(c);
        log.info("Exit RemoveCGReminder");

    }
}
