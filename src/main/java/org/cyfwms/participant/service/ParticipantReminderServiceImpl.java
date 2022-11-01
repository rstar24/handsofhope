package org.cyfwms.participant.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cyfwms.common.entity.Reminder;
import org.cyfwms.common.exception.I18Constants;
import org.cyfwms.common.exception.MessageUtil;
import org.cyfwms.common.exception.NoSuchElementFoundException;
import org.cyfwms.common.repository.ReminderRepository;
import org.cyfwms.common.util.ReferenceIDGeneratorUtil;
import org.cyfwms.participant.dto.ParticipantReminderDto;
import org.cyfwms.common.dto.ReminderDto;
import org.cyfwms.participant.entity.ParticipantReminder;
import org.cyfwms.participant.repository.ParticipantReminderRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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
    public List<ParticipantReminderDto> readParticipantReminder(Long participantId) {
        log.info("Inside ReadParticipantReminder");
        List<ParticipantReminder> participantReminder = participantReminderRepository.findByParticipantId(participantId);
        List<ParticipantReminderDto> participantReminderDtoList = participantReminder.stream().map(pReminder -> {
            ParticipantReminderDto participantReminderDto = new ParticipantReminderDto();
            ReminderDto reminderDto = new ReminderDto();
            BeanUtils.copyProperties(pReminder.getReminder(), reminderDto);
            BeanUtils.copyProperties(pReminder, participantReminderDto);
            participantReminderDto.setReminderDto(reminderDto);
            return participantReminderDto;
        }).collect(Collectors.toList());
        log.info("Exit ReadParticipantReminder");
        return participantReminderDtoList;
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
    public void removeParticipantReminder(Long referenceId) {
        log.info("Inside RemoveParticipantReminder");
        ParticipantReminder p =
                participantReminderRepository.findByReferenceId(referenceId)
                        .orElseThrow(() -> new NoSuchElementFoundException(
                                messageUtil.getLocalMessage(I18Constants.NO_ITEM_FOUND.getKey(),
                                        String.valueOf(referenceId))));

        if (p.getStatusOfDeletion().equalsIgnoreCase("INACTIVE")) {
            throw new NoSuchElementFoundException(
                    messageUtil.getLocalMessage(I18Constants.NO_ITEM_FOUND.getKey(),
                            String.valueOf(referenceId)));
        }
        p.setStatusOfDeletion("INACTIVE");
        participantReminderRepository.save(p);
        log.info("Exit RemoveParticipantReminder");
    }
}
