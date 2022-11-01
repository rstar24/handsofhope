package org.cyfwms.participant.service;

import lombok.extern.slf4j.Slf4j;
import org.cyfwms.common.dto.AppointmentDto;
import org.cyfwms.common.entity.Appointments;
import org.cyfwms.common.exception.MessageUtil;
import org.cyfwms.common.repository.AppointmentRepository;
import org.cyfwms.participant.dto.ParticipantAppointmentDto;
import org.cyfwms.participant.entity.ParticipantAppointment;
import org.cyfwms.participant.repository.ParticipantAppointmentRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public ParticipantAppointmentDto saveParticipantAppointment(ParticipantAppointmentDto participantAppointmentDto) {
        log.info("Inside SaveParticipantAppointment");
        Appointments appointments = null;
        ParticipantAppointment participantAppointment = new ParticipantAppointment();
        if (participantAppointmentDto.getParticipantAppointmentId() == 0) {
            appointments = new Appointments();
            BeanUtils.copyProperties(participantAppointmentDto.getAppointmentdto(), appointments);
            BeanUtils.copyProperties(participantAppointmentDto, participantAppointment);
            participantAppointment.setStatus("ACTIVE");
            appointments.setAppointmentStatus("ACTIVE");
        } else {
            participantAppointment = participantAppointmentRepo.findById(participantAppointmentDto.getParticipantAppointmentId()).get();
            appointments = appointmentRepository.findById(participantAppointmentDto.getAppointmentdto().getAppointmentId()).get();
            BeanUtils.copyProperties(participantAppointmentDto.getAppointmentdto(), appointments);
            BeanUtils.copyProperties(participantAppointmentDto, participantAppointment);

        }
        participantAppointment.setAppointments(appointments);
        participantAppointment = participantAppointmentRepo.save(participantAppointment);
        participantAppointmentDto.setParticipantAppointmentId(participantAppointment.getParticipantAppointmentId());
        participantAppointmentDto.getAppointmentdto().setAppointmentId(participantAppointment.getAppointments().getAppointmentId());
        log.info("Exit SaveParticipantAppointment");
        return participantAppointmentDto;

    }



    @Override
    public void removeParticipantAppointment(Long participantAppointmentId) {
        log.info("Inside RemoveParticipantAppointment");
        Optional<ParticipantAppointment> AppointmentsOptional = participantAppointmentRepo.findById(participantAppointmentId);
        if (AppointmentsOptional.isPresent()) {
            ParticipantAppointment participantAppointment = AppointmentsOptional.get();
            participantAppointment.setStatus("INACTIVE");
            participantAppointment.getAppointments().setAppointmentStatus("Inactive");
            participantAppointmentRepo.save(participantAppointment);
            log.info("Exit RemoveParticipantAppointment");
        }
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
