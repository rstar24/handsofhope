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
import org.cyfwms.participant.entity.Participant;
import org.cyfwms.participant.repository.ParticipantRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class CareGiverReminderServiceImpl implements CareGiverReminderService {

    @Autowired
    private CareGiverReminderRepository careGiverReminderRepository;

    @Autowired
    private ReminderRepository reminderRepository;

    @Autowired
    private MessageUtil messageUtil;

    @Autowired
    private ParticipantRepository participantRepository;

    @Override
    public CareGiverReminderDto saveCGReminder(CareGiverReminderDto careGiverReminderDto) {
        Reminder reminder = null;
        CareGiverReminder cgReminder = new CareGiverReminder();
        if (careGiverReminderDto.getCgReminderId() == 0) {
            reminder = new Reminder();
            BeanUtils.copyProperties(careGiverReminderDto.getReminderDto(), reminder);
            BeanUtils.copyProperties(careGiverReminderDto, cgReminder);
            cgReminder.setStatusOfDeletion("ACTIVE");
            reminder.setStatus("ACTIVE");
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
        log.info("Exit SaveCareGiversReminder");
        return careGiverReminderDto;

    }

    @Override
    public CareGiverReminderDto readCGReminder(Long cgReminderId) {
        log.info("Inside readCGReminder");
        CareGiverReminderDto careGiverReminderDto = new CareGiverReminderDto();
        ReminderDto reminderDto = new ReminderDto();
        if (cgReminderId != 0) {
            Optional<CareGiverReminder> careGiverReminder = careGiverReminderRepository.findById(cgReminderId);

            if (careGiverReminder.isPresent()) {
                if (careGiverReminder.get().getStatusOfDeletion().equals("ACTIVE")) {
                    BeanUtils.copyProperties(careGiverReminder.get(), careGiverReminderDto);
                    BeanUtils.copyProperties(careGiverReminder.get().getReminder(), reminderDto);

                    if (!reminderDto.getRegarding().isEmpty() && reminderDto.getRegarding() != null) {
                        Long participantId = Long.parseLong(reminderDto.getRegarding());
                        Participant participant = participantRepository.findByParticipantId(participantId);
                        reminderDto.setRegarding(participant.getFirstname() + " " + participant.getSurname());
                        reminderDto.setParticipantId(participant.getParticipantId());
                    }
                    careGiverReminderDto.setReminderDto(reminderDto);

                }
            }
        }
        log.info("Exit readCGReminder");
        return careGiverReminderDto;

    }


    @Override
    public void removeCGReminder(Long cgReminderId) {
        log.info("Inside RemoveCGReminder");
        CareGiverReminder c =
                    careGiverReminderRepository.findById(cgReminderId)
                            .orElseThrow(() -> new NoSuchElementFoundException(
                                    messageUtil.getLocalMessage(I18Constants.NO_ITEM_FOUND.getKey(),
                                            String.valueOf(cgReminderId))));

            if (c.getStatusOfDeletion().equalsIgnoreCase("INACTIVE")) {
                throw new NoSuchElementFoundException(
                        messageUtil.getLocalMessage(I18Constants.NO_ITEM_FOUND.getKey(),
                                String.valueOf(cgReminderId)));
            }
            c.setStatusOfDeletion("INACTIVE");
        careGiverReminderRepository.save(c);
        log.info("Exit RemoveCGReminder");

    }
}
