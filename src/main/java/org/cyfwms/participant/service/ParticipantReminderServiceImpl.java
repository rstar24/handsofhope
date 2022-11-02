package org.cyfwms.participant.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cyfwms.common.dto.ReminderDto;
import org.cyfwms.common.entity.Reminder;
import org.cyfwms.common.exception.I18Constants;
import org.cyfwms.common.exception.MessageUtil;
import org.cyfwms.common.exception.NoSuchElementFoundException;
import org.cyfwms.common.repository.ReminderRepository;
import org.cyfwms.common.util.ReferenceIDGeneratorUtil;
import org.cyfwms.participant.dto.ParticipantReminderDto;
import org.cyfwms.participant.entity.ParticipantReminder;
import org.cyfwms.participant.repository.ParticipantReminderRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class ParticipantReminderServiceImpl implements ParticipantReminderService {

    @Autowired
    private ParticipantReminderRepository participantReminderRepository;

    @Autowired
    private ReferenceIDGeneratorUtil referenceIDGeneratorUtil;

    @Autowired
    private ReminderRepository reminderRepository;

    @Autowired
    private MessageUtil messageUtil;

    @Override
    public ParticipantReminderDto readParticipantReminder(Long participantReminderId) {
        log.info("Inside ReadParticipantReminder");
        ParticipantReminderDto participantReminderDto = new ParticipantReminderDto();
        ReminderDto reminderDto = new ReminderDto();
        if (participantReminderId != 0) {
            Optional<ParticipantReminder> participantReminder = Optional.ofNullable(participantReminderRepository.findByParticipantReminderId(participantReminderId));

            if (participantReminder.isPresent()) {
                if (participantReminder.get().getStatusOfDeletion().equals("ACTIVE")) {
                    BeanUtils.copyProperties(participantReminder.get(), participantReminderDto);
                    BeanUtils.copyProperties(participantReminder.get().getReminder(), reminderDto);
                    participantReminderDto.setReminderDto(reminderDto);

                }
            }
        }
        log.info("Exit ReadOneAppointment");
        return participantReminderDto;
    }

    @Override
    public ParticipantReminderDto saveParticipantReminder(ParticipantReminderDto participantReminderDto) {
        log.info("Inside SaveParticipantReminder");
        Reminder reminder = null;
        ParticipantReminder participantReminder = new ParticipantReminder();
        if (participantReminderDto.getParticipantReminderId() == 0) {
            reminder = new Reminder();
            BeanUtils.copyProperties(participantReminderDto.getReminderDto(), reminder);
            BeanUtils.copyProperties(participantReminderDto, participantReminder);
            participantReminder.setStatusOfDeletion("ACTIVE");
            participantReminder.setReferenceId(referenceIDGeneratorUtil.generateParticipantReminderReferenceID());
        } else {
            participantReminder = participantReminderRepository.findById(participantReminderDto.getParticipantReminderId()).get();
            reminder = reminderRepository.findById(participantReminderDto.getReminderDto().getReminderId()).get();
            BeanUtils.copyProperties(participantReminderDto.getReminderDto(), reminder);

            BeanUtils.copyProperties(participantReminderDto, participantReminder);

        }
        participantReminder.setReminder(reminder);
        participantReminder = participantReminderRepository.save(participantReminder);
        participantReminderDto.setParticipantReminderId(participantReminder.getParticipantReminderId());
        participantReminderDto.getReminderDto().setReminderId(participantReminder.getReminder().getReminderId());
        participantReminderDto.setReferenceId(participantReminder.getReferenceId());
        log.info("Exit SaveParticipantReminder");
        return participantReminderDto;
    }

    @Override
    public void removeParticipantReminder(Long participantReminderId) {
        log.info("Inside RemoveParticipantReminder");
        ParticipantReminder p =
                participantReminderRepository.findById(participantReminderId)
                        .orElseThrow(() -> new NoSuchElementFoundException(
                                messageUtil.getLocalMessage(I18Constants.NO_ITEM_FOUND.getKey(),
                                        String.valueOf(participantReminderId))));

        if (p.getStatusOfDeletion().equalsIgnoreCase("INACTIVE")) {
            throw new NoSuchElementFoundException(
                    messageUtil.getLocalMessage(I18Constants.NO_ITEM_FOUND.getKey(),
                            String.valueOf(participantReminderId)));
        }
        p.setStatusOfDeletion("INACTIVE");
        participantReminderRepository.save(p);
        log.info("Exit RemoveParticipantReminder");
    }
}
