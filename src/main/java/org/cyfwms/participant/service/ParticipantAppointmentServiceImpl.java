package org.cyfwms.participant.service;

import lombok.extern.slf4j.Slf4j;
import org.cyfwms.common.dto.AppointmentDto;
import org.cyfwms.common.entity.Appointments;
import org.cyfwms.common.exception.I18Constants;
import org.cyfwms.common.exception.MessageUtil;
import org.cyfwms.common.exception.NoSuchElementFoundException;
import org.cyfwms.common.repository.AppointmentRepository;
import org.cyfwms.participant.dto.ParticipantAppointmentDto;
import org.cyfwms.participant.entity.ParticipantAppointment;
import org.cyfwms.participant.entity.ParticipantReminder;
import org.cyfwms.participant.repository.ParticipantAppointmentRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@Slf4j
public class ParticipantAppointmentServiceImpl implements ParticipantAppointmentService {
    @Autowired
    AppointmentRepository appointmentRepository;
    @Autowired
    ParticipantAppointmentRepo participantAppointmentRepo;
    @Autowired
    MessageUtil messageUtil;

    @Override
    public List<ParticipantAppointmentDto> saveParticipantAppointment(ParticipantAppointmentDto participantAppointmentDto) {
        log.info("Inside SaveParticipantAppointment");
        Appointments appointments = null;
        AppointmentDto appointmentDto = new AppointmentDto();
        ParticipantAppointmentDto participantAppointmentDto1 = new ParticipantAppointmentDto();
        List<ParticipantAppointmentDto>listparticipantAppointments = new ArrayList<>();
        ParticipantAppointment participantAppointment = new ParticipantAppointment();
        //if new user enter
        if (participantAppointmentDto.getParticipantAppointmentId() == 0) {
            if(participantAppointmentDto.getAppointmentdto().getRecurringAppointment().equalsIgnoreCase("Yes")){
                System.out.println(participantAppointmentDto);
                listparticipantAppointments = checkFrequency(participantAppointmentDto);
                System.out.println(listparticipantAppointments);
                return listparticipantAppointments;
            }
            appointments = new Appointments();
            BeanUtils.copyProperties(participantAppointmentDto.getAppointmentdto(), appointments);
            BeanUtils.copyProperties(participantAppointmentDto, participantAppointment);
            participantAppointment.setStatus("ACTIVE");
            appointments.setAppointmentStatus("ACTIVE");
        }
        //for update particular user appointment information
        else {
            participantAppointment = participantAppointmentRepo.findById(participantAppointmentDto.getParticipantAppointmentId()).get();
            appointments = appointmentRepository.findById(participantAppointmentDto.getAppointmentdto().getAppointmentId()).get();
            BeanUtils.copyProperties(participantAppointmentDto.getAppointmentdto(), appointments);
            BeanUtils.copyProperties(participantAppointmentDto, participantAppointment);

        }


        //save data if recurring appointment contain no value
                participantAppointment.setAppointments(appointments);
                participantAppointment = participantAppointmentRepo.save(participantAppointment);

        //copy save data into list
                BeanUtils.copyProperties(participantAppointment,participantAppointmentDto1);
                BeanUtils.copyProperties(appointments,appointmentDto);
                participantAppointmentDto1.setAppointmentdto(appointmentDto);
                listparticipantAppointments.add(participantAppointmentDto1);

                log.info("Exit SaveParticipantAppointment");
            return listparticipantAppointments;

        }
        public List<ParticipantAppointmentDto> checkFrequency(ParticipantAppointmentDto participantAppointmentDto){
            System.out.println(participantAppointmentDto);
            Period pd = Period.between(participantAppointmentDto.getAppointmentdto().getDate(), participantAppointmentDto.getAppointmentdto().getEndDate());
            int difference = pd.getDays();
            System.out.println(difference);
            int n = 0,counter=0;
            if(participantAppointmentDto.getAppointmentdto().getFrequency().equalsIgnoreCase("Daily")){
                n = difference+1;
                counter=1;
            } else if (participantAppointmentDto.getAppointmentdto().getFrequency().equalsIgnoreCase("Weekly")) {
                n = (difference+1)/7;
                counter=7;
            } else if (participantAppointmentDto.getAppointmentdto().getFrequency().equalsIgnoreCase("Monthly")) {
                n = (difference+1)/30;
                counter=30;
            }
            else {
                n = (difference+1)/3;
                counter=3;
            }
            List<ParticipantAppointmentDto>listparticipantAppointments = new ArrayList<>();
            listparticipantAppointments = saveFrequency(n,counter,participantAppointmentDto);
        return listparticipantAppointments;
        }
        public List<ParticipantAppointmentDto> saveFrequency(int n,int counter, ParticipantAppointmentDto participantAppointmentDto) {

            List<ParticipantAppointmentDto>listparticipantAppointments = new ArrayList<>();
            int cnt=0;
            for(int i=0;i<n;i++){
                //save data into table
                ParticipantAppointment participantAppointment = new ParticipantAppointment();
                Appointments appointments = new Appointments();
                BeanUtils.copyProperties(participantAppointmentDto,participantAppointment);
                BeanUtils.copyProperties(participantAppointmentDto.getAppointmentdto(),appointments);
                participantAppointment.setStatus("ACTIVE");
                appointments.setAppointmentStatus("ACTIVE");
                LocalDate l = participantAppointmentDto.getAppointmentdto().getDate().plusDays(cnt);
                appointments.setDate(l);
                participantAppointment.setAppointments(appointments);
                participantAppointment = participantAppointmentRepo.save(participantAppointment);
                //copy save data into list participantAppointment
                AppointmentDto appointmentDto = new AppointmentDto();

                ParticipantAppointmentDto participantAppointmentdto = new ParticipantAppointmentDto();
                BeanUtils.copyProperties(participantAppointment,participantAppointmentdto);
                BeanUtils.copyProperties(appointments,appointmentDto);
                participantAppointmentdto.setAppointmentdto(appointmentDto);
                listparticipantAppointments.add(participantAppointmentdto);
                cnt=cnt+counter;
            }

            return listparticipantAppointments;
        }




    @Override
    public void removeParticipantAppointment(Long participantAppointmentId) {
        log.info("Inside RemoveParticipantAppointment");
        ParticipantAppointment participantAppointment = participantAppointmentRepo.findById(participantAppointmentId).orElseThrow(()->new NoSuchElementFoundException(
                messageUtil.getLocalMessage(I18Constants.NO_ITEM_FOUND.getKey(),
                        String.valueOf(participantAppointmentId))));
        if (participantAppointment.getStatus().equalsIgnoreCase("INACTIVE")) {
            throw new NoSuchElementFoundException(
                    messageUtil.getLocalMessage(I18Constants.NO_ITEM_FOUND.getKey(),
                            String.valueOf(participantAppointment)));
        }
            participantAppointment.setStatus("INACTIVE");
            participantAppointment.getAppointments().setAppointmentStatus("INACTIVE");
            participantAppointmentRepo.save(participantAppointment);
            log.info("Exit RemoveParticipantAppointment");

        }

    @Override
    public ParticipantAppointmentDto readOneAppointment(Long participantAppontmentId) {
        log.info("Inside ReadOneAppointment");
        ParticipantAppointmentDto participantAppointmentDto = new ParticipantAppointmentDto();
        AppointmentDto appointmentDto = new AppointmentDto();
        if (participantAppontmentId != 0) {
            Optional<ParticipantAppointment> participantAppointment = participantAppointmentRepo.findById(participantAppontmentId);

            if (participantAppointment.isPresent()) {
                if (participantAppointment.get().getStatus().equals("ACTIVE")){
                    BeanUtils.copyProperties(participantAppointment.get(), participantAppointmentDto);
                    BeanUtils.copyProperties(participantAppointment.get().getAppointments(),appointmentDto);
                    participantAppointmentDto.setAppointmentdto(appointmentDto);
//                    if (iCContactNotesDto.getDate() == null) {
//                        iCContactNotesDto.setDate(LocalDate.of(1, 1, 1));
//                    }
//                    if (iCContactNotesDto.getTime() == null) {
//                        iCContactNotesDto.setTime(LocalTime.of(1, 1, 1));
//                    }
                }
            }
        }
        log.info("Exit ReadOneAppointment");
        return participantAppointmentDto;

    }


}
