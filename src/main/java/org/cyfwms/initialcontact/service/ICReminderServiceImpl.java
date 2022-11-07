package org.cyfwms.initialcontact.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cyfwms.common.dto.ReminderDto;
import org.cyfwms.common.entity.Reminder;
import org.cyfwms.common.exception.I18Constants;
import org.cyfwms.common.exception.MessageUtil;
import org.cyfwms.common.exception.NoSuchElementFoundException;
import org.cyfwms.common.repository.ReminderRepository;
import org.cyfwms.initialcontact.dto.ICReminderDto;
import org.cyfwms.initialcontact.entity.ICReminder;
import org.cyfwms.initialcontact.repository.ICReminderRepository;
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
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class ICReminderServiceImpl implements ICReminderService {

    @Autowired
    private ICReminderRepository icReminderRepository;

    @Autowired
    private ReminderRepository reminderRepository;

    @Autowired
    private MessageUtil messageUtil;

    @Autowired
    private ParticipantRepository participantRepository;

    @Override
    public List<ICReminderDto> saveICReminder(ICReminderDto icReminderDto) {
        log.info("Inside SaveICtReminder");
        Reminder reminder = null;
        List<ICReminderDto> icReminderDtoList =new ArrayList<>();
        ICReminder participantReminder = new ICReminder();
        if (icReminderDto.getIcReminderId() == 0) {
            icReminderDtoList =checkFrequency(icReminderDto);
            reminder = new Reminder();
            BeanUtils.copyProperties(icReminderDto.getReminderDto(), reminder);
            BeanUtils.copyProperties(icReminderDto, participantReminder);
            participantReminder.setStatusOfDeletion("ACTIVE");
            reminder.setStatusOfDeletion("ACTIVE");

        } else {
            participantReminder = icReminderRepository.findById(icReminderDto.getIcReminderId()).get();
            reminder = reminderRepository.findById(icReminderDto.getReminderDto().getReminderId()).get();
            BeanUtils.copyProperties(icReminderDto.getReminderDto(), reminder);

            BeanUtils.copyProperties(icReminderDto, participantReminder);

        }
        log.info("Exit SaveICReminder");
        return icReminderDtoList;
    }

    public List<ICReminderDto> checkFrequency(ICReminderDto participantReminderDto) {
        Period pd = Period.between(participantReminderDto.getReminderDto().getReminderDate() ,participantReminderDto.getReminderDto().getEndDate());
        int difference = pd.getDays();

        int n = 0,counter=0, rem =0;
        if(participantReminderDto.getReminderDto().getFrequency().equalsIgnoreCase("Daily")){
            n = difference+1;
            rem = n+1;
            counter=1;
        } else if (participantReminderDto.getReminderDto().getFrequency().equalsIgnoreCase("Weekly")) {
            n = (difference+1)/7;
            rem = n%7;
            if (rem>0){
                n=n+1;
            }
            counter=7;
        } else if (participantReminderDto.getReminderDto().getFrequency().equalsIgnoreCase("Monthly")) {
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
        List<ICReminderDto> iCReminderDtoList =new ArrayList<>();
        iCReminderDtoList = saveFrequency(n,counter,rem,participantReminderDto);
        return iCReminderDtoList;
    }

    public List<ICReminderDto> saveFrequency(int n, int counter, int rem, ICReminderDto participantReminderDto) {
        List<ICReminderDto> iCReminderDtoList = new ArrayList<>();
        int cnt=0;
        for(int i=0;i<n;i++){
            ICReminder participantReminder=new ICReminder();
            Reminder reminder=new Reminder();
            BeanUtils.copyProperties(participantReminderDto,participantReminder);
            BeanUtils.copyProperties(participantReminderDto.getReminderDto(),reminder);
            participantReminder.setStatusOfDeletion("ACTIVE");
            reminder.setStatusOfDeletion("ACTIVE");
            LocalDate localDate=participantReminderDto.getReminderDto().getReminderDate().plusDays(cnt);
            reminder.setReminderDate(localDate);
            participantReminder.setReminder(reminder);
            participantReminder = icReminderRepository.save(participantReminder);

            ReminderDto reminderDto = new ReminderDto();

            ICReminderDto participantReminderDto1=new ICReminderDto();
            BeanUtils.copyProperties(participantReminder,participantReminderDto1);
            BeanUtils.copyProperties(reminder,reminderDto);
            participantReminderDto1.setReminderDto(reminderDto);
            iCReminderDtoList.add(participantReminderDto1);
            if(i==n-1 && rem>0){
                cnt =cnt+1;

            }
            cnt=cnt+counter;
        }
        log.info("Exit SaveICReminder");
        return iCReminderDtoList;
    }

    @Override
    public ICReminderDto readICReminder(Long icReminderId) {
        ICReminderDto icReminderDto = new ICReminderDto();
        ReminderDto reminderDto = new ReminderDto();
        if (icReminderId != 0) {
            Optional<ICReminder> icReminder = icReminderRepository.findById(icReminderId);

            if (icReminder.isPresent()) {
                if (icReminder.get().getStatusOfDeletion().equals("ACTIVE")) {
                    BeanUtils.copyProperties(icReminder.get(), icReminderDto);
                    BeanUtils.copyProperties(icReminder.get().getReminder(), reminderDto);

                    if(!reminderDto.getRegarding().isEmpty() && reminderDto.getRegarding()!=null){
                        Long participantId = Long.parseLong(reminderDto.getRegarding());
                        Participant participant = participantRepository.findByParticipantId(participantId);
                        reminderDto.setRegarding(participant.getFirstname() + " " + participant.getSurname());
                        reminderDto.setParticipantId(participant.getParticipantId());
                    }
                    icReminderDto.setReminderDto(reminderDto);
                }
            }
        }
        return icReminderDto;

    }

    @Override
    public List<ICReminderDto> readAllICReminder(Long fileDetailsId) {
        List<ICReminderDto> icReminderDtoList = new ArrayList<>();
        icReminderDtoList = icReminderRepository.findByFileDetailsId(fileDetailsId).stream().map(a -> {
            ReminderDto reminderDto = new ReminderDto();
            ICReminderDto icReminderDto = new ICReminderDto();
            BeanUtils.copyProperties(a.getReminder(), reminderDto);
            BeanUtils.copyProperties(a, icReminderDto);
            icReminderDto.setReminderDto(reminderDto);
            return icReminderDto;
        }).collect(Collectors.toList());
        return icReminderDtoList;
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
        icReminder.getReminder().setStatusOfDeletion("INACTIVE");
        icReminderRepository.save(icReminder);
        log.info("Exit RemoveICReminder");
    }

}
