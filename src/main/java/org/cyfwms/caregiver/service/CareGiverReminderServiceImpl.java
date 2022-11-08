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

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
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
    public List<CareGiverReminderDto> saveCGReminder(CareGiverReminderDto careGiverReminderDto) {
        log.info("Inside SaveCareGiverReminder");
        Reminder reminder = null;
        ReminderDto reminderDto=new ReminderDto();
        CareGiverReminderDto careGiverReminderDto1=new CareGiverReminderDto();
        List<CareGiverReminderDto> careGiverReminderDtoList=new ArrayList<>();
        CareGiverReminder  careGiverReminder = new CareGiverReminder();
        if (careGiverReminderDto.getCgReminderId() == 0) {
            careGiverReminderDtoList =checkFrequency(careGiverReminderDto);
            reminder = new Reminder();
            BeanUtils.copyProperties(careGiverReminderDto.getReminderDto(), reminder);
            BeanUtils.copyProperties(careGiverReminderDto, careGiverReminder);
            careGiverReminder.setStatusOfDeletion("ACTIVE");
            reminder.setStatusOfDeletion("ACTIVE");
        } else {
            careGiverReminder = careGiverReminderRepository.findById(careGiverReminderDto.getCgReminderId()).get();
            reminder = reminderRepository.findById(careGiverReminderDto.getReminderDto().getReminderId()).get();
            BeanUtils.copyProperties(careGiverReminderDto.getReminderDto(), reminder);
            BeanUtils.copyProperties(careGiverReminderDto, careGiverReminder);

        }
        careGiverReminder.setReminder(reminder);
        careGiverReminder = careGiverReminderRepository.save(careGiverReminder);

        BeanUtils.copyProperties(careGiverReminder,careGiverReminderDto1);
        BeanUtils.copyProperties(reminder,reminderDto);
        careGiverReminderDto1.setReminderDto(reminderDto);
        careGiverReminderDtoList.add(careGiverReminderDto1);

        log.info("Exit SaveCareGiverReminder");
        return careGiverReminderDtoList;

    }

    public List<CareGiverReminderDto> checkFrequency(CareGiverReminderDto careGiverReminderDto) {

        Period pd = Period.between(careGiverReminderDto.getReminderDto().getReminderDate() ,careGiverReminderDto.getReminderDto().getEndDate());
        int difference = pd.getDays();

        int n = 0,counter=0, rem =0;
        if(careGiverReminderDto.getReminderDto().getFrequency().equalsIgnoreCase("Daily")){
            n = difference+1;
            rem = n+1;
            counter=1;
        } else if (careGiverReminderDto.getReminderDto().getFrequency().equalsIgnoreCase("Weekly")) {
            n = (difference+1)/7;
            rem = n%7;
            if (rem>0){
                n=n+1;
            }
            counter=7;
        } else if (careGiverReminderDto.getReminderDto().getFrequency().equalsIgnoreCase("Monthly")) {
            n = (difference+1)/30;
            rem = n%30;
            if(rem>0){
                n=n+1;
            }
            counter=30;
        }else {
            n = (difference+1)/3;
            rem = n%3;
            if(rem>0){
                n=n+1;
            }
            counter=3;
        }
        List<CareGiverReminderDto> listcaregiverReminder =new ArrayList<>();
        listcaregiverReminder = saveFrequency(n,counter,rem,careGiverReminderDto);
        return listcaregiverReminder;
    }

    public List<CareGiverReminderDto> saveFrequency(int n, int counter, int rem, CareGiverReminderDto careGiverReminderDto) {
        List<CareGiverReminderDto> listcaregiverreminder = new ArrayList<>();
        int cnt=1;
        for(int i=1;i<n;i++){
            CareGiverReminder caregiverReminder=new CareGiverReminder();
            Reminder reminder=new Reminder();
            BeanUtils.copyProperties(careGiverReminderDto,caregiverReminder);
            BeanUtils.copyProperties(careGiverReminderDto.getReminderDto(),reminder);
            caregiverReminder.setStatusOfDeletion("ACTIVE");
            reminder.setStatusOfDeletion("ACTIVE");
            LocalDate localDate=careGiverReminderDto.getReminderDto().getReminderDate().plusDays(cnt);
            reminder.setReminderDate(localDate);
            caregiverReminder.setReminder(reminder);
            caregiverReminder = careGiverReminderRepository.save(caregiverReminder);

            ReminderDto reminderDto = new ReminderDto();

            CareGiverReminderDto careGiverReminderDto1=new CareGiverReminderDto();
            BeanUtils.copyProperties(caregiverReminder,careGiverReminderDto1);
            BeanUtils.copyProperties(reminder,reminderDto);
            reminderDto.setReminderId(caregiverReminder.getReminder().getReminderId());
            careGiverReminderDto1.setReminderDto(reminderDto);
            listcaregiverreminder.add(careGiverReminderDto1);
            if(i==n-1 && rem>0){
                cnt =cnt+1;

            }
            cnt=cnt+counter;
        }

        return listcaregiverreminder;
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
            c.getReminder().setStatusOfDeletion("INACTIVE");
        careGiverReminderRepository.save(c);
        log.info("Exit RemoveCGReminder");

    }

}
