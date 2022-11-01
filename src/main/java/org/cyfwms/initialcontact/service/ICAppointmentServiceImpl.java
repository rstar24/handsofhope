package org.cyfwms.initialcontact.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cyfwms.common.dto.AppointmentDto;
import org.cyfwms.common.entity.Appointments;
import org.cyfwms.common.exception.MessageUtil;
import org.cyfwms.common.repository.AppointmentRepository;
import org.cyfwms.initialcontact.dto.ICAppointmentDto;
import org.cyfwms.initialcontact.entity.ICAppointment;
import org.cyfwms.initialcontact.repository.ICAppointmentRepository;
import org.cyfwms.participant.dto.ParticipantAppointmentDto;
import org.cyfwms.participant.entity.ParticipantAppointment;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class ICAppointmentServiceImpl implements ICAppointmentService {
    @Autowired
    private AppointmentRepository   appointmentRepository;
    @Autowired
     ICAppointmentRepository icAppointmentRepository;
    @Autowired
    private MessageUtil  messageUtil;


    @Override
    public ICAppointmentDto saveICAppointment(ICAppointmentDto icAppointmentDto) {
        System.out.println(icAppointmentDto);
        Appointments appointments = null;
        ICAppointment icAppointment = new ICAppointment();
        if (icAppointmentDto.getIcappointmentId() == 0) {
            appointments = new Appointments();
            BeanUtils.copyProperties(icAppointmentDto.getAppointmentDto(), appointments);
            BeanUtils.copyProperties(icAppointmentDto, icAppointment);
            icAppointment.setStatus("ACTIVE");
            appointments.setAppointmentStatus("ACTIVE");
        } else {
            icAppointment = icAppointmentRepository.findById(icAppointmentDto.getIcappointmentId()).get();
            appointments = appointmentRepository.findById(icAppointmentDto.getAppointmentDto().getAppointmentId()).get();
            BeanUtils.copyProperties(icAppointmentDto.getAppointmentDto(), appointments);
            BeanUtils.copyProperties(icAppointmentDto, icAppointment);

        }
        icAppointment.setAppointments(appointments);
        icAppointment = icAppointmentRepository.save(icAppointment);
        icAppointmentDto.setIcappointmentId(icAppointment.getIcappointmentId());
        icAppointmentDto.getAppointmentDto().setAppointmentId(icAppointment.getAppointments().getAppointmentId());
        return icAppointmentDto;
    }


    @Override
    public List<ICAppointmentDto> readAllICAppointment(Long fileDetailsId)  {
        List<ICAppointmentDto> participantAppointmentDto = new ArrayList<>();
        participantAppointmentDto = icAppointmentRepository.findByfileDetailsIdId(fileDetailsId).stream().map(a -> {
            AppointmentDto appointmentDto = new AppointmentDto();
            ICAppointmentDto icAppointmentDto = new ICAppointmentDto();
            BeanUtils.copyProperties(a.getAppointments(), appointmentDto);
            BeanUtils.copyProperties(a, icAppointmentDto);
            icAppointmentDto.setAppointmentDto(appointmentDto);
            return icAppointmentDto;
        }).collect(Collectors.toList());
        return participantAppointmentDto;
    }

    @Override
    public void removeICAppointment(Long ICAppointmentId) {
        Optional<ICAppointment> AppointmentsOptional = icAppointmentRepository.findById(ICAppointmentId);
        if (AppointmentsOptional.isPresent()) {
            ICAppointment icAppointment = AppointmentsOptional.get();
            icAppointment.setStatus("INACTIVE");
            icAppointment.getAppointments().setAppointmentStatus("INACTIVE");
            icAppointmentRepository.save(icAppointment);
        }

    }

    @Override
    public ICAppointmentDto readOneAppointment(Long ICAppontmentId) {
        ICAppointmentDto icAppointmentDto = new ICAppointmentDto();
        AppointmentDto appointmentDto = new AppointmentDto();
        if (ICAppontmentId != 0) {
            Optional<ICAppointment> ICAppointment = icAppointmentRepository.findById(ICAppontmentId);

            if (ICAppointment.isPresent()) {
                if (ICAppointment.get().getStatus().equals("ACTIVE")){
                    BeanUtils.copyProperties(ICAppointment.get(), icAppointmentDto);
                    BeanUtils.copyProperties(ICAppointment.get().getAppointments(),appointmentDto);
                    icAppointmentDto.setAppointmentDto(appointmentDto);
//                    if (iCContactNotesDto.getDate() == null) {
//                        iCContactNotesDto.setDate(LocalDate.of(1, 1, 1));
//                    }
//                    if (iCContactNotesDto.getTime() == null) {
//                        iCContactNotesDto.setTime(LocalTime.of(1, 1, 1));
//                    }
                }
            }
        }
        return icAppointmentDto;

    }

}
