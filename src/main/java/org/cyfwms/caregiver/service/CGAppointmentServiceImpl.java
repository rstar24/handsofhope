package org.cyfwms.caregiver.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cyfwms.caregiver.dto.CaregiverAppointmentDto;
import org.cyfwms.caregiver.entity.CaregiverAppointment;
import org.cyfwms.caregiver.repository.CareGiversAppointmentRepository;
import org.cyfwms.common.dto.AppointmentDto;
import org.cyfwms.common.entity.Appointments;
import org.cyfwms.common.exception.MessageUtil;
import org.cyfwms.common.repository.AppointmentRepository;
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
public class CGAppointmentServiceImpl implements CGAppointmentService {
    @Autowired
    CareGiversAppointmentRepository careGiversAppointmentRepository;
    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    private MessageUtil messageUtil;


    @Override
    public CaregiverAppointmentDto saveCgAppointment(CaregiverAppointmentDto caregiverAppointmentDto) {
        Appointments appointments = null;
        CaregiverAppointment caregiverAppointment = new CaregiverAppointment();
        if (caregiverAppointmentDto.getCgappointmentId() == 0) {
            appointments = new Appointments();
            BeanUtils.copyProperties(caregiverAppointmentDto.getAppointmentDto(), appointments);
            BeanUtils.copyProperties(caregiverAppointmentDto, caregiverAppointment);
            caregiverAppointment.setStatus("Active");
            appointments.setAppointmentStatus("Active");
        } else {
            caregiverAppointment = careGiversAppointmentRepository.findById(caregiverAppointmentDto.getCgappointmentId()).get();
            appointments = appointmentRepository.findById(caregiverAppointmentDto.getAppointmentDto().getAppointmentId()).get();
            BeanUtils.copyProperties(caregiverAppointmentDto.getAppointmentDto(), appointments);
            BeanUtils.copyProperties(caregiverAppointmentDto, caregiverAppointment);
        }
        caregiverAppointment.setAppointments(appointments);
        caregiverAppointment = careGiversAppointmentRepository.save(caregiverAppointment);
        caregiverAppointmentDto.setCgappointmentId(caregiverAppointment.getCgappointmentId());
        caregiverAppointmentDto.getAppointmentDto().setAppointmentId(caregiverAppointment.getAppointments().getAppointmentId());
        return caregiverAppointmentDto;
    }


  

    @Override
    public CaregiverAppointmentDto readOneAppointment(Long cgAppointmentId) {
        CaregiverAppointmentDto caregiverAppointmentDto = new CaregiverAppointmentDto();
        AppointmentDto appointmentDto = new AppointmentDto();
        if (cgAppointmentId != 0) {
            Optional<CaregiverAppointment> caregiverAppointment = careGiversAppointmentRepository.findById(cgAppointmentId);

            if (caregiverAppointment.isPresent()) {
                if (caregiverAppointment.get().getStatus().equalsIgnoreCase("Active")){

                    BeanUtils.copyProperties(caregiverAppointment.get(), caregiverAppointmentDto);
                    BeanUtils.copyProperties(caregiverAppointment.get().getAppointments(),appointmentDto);
                    caregiverAppointmentDto.setAppointmentDto(appointmentDto);
//                    if (iCContactNotesDto.getDate() == null) {
//                        iCContactNotesDto.setDate(LocalDate.of(1, 1, 1));
//                    }
//                    if (iCContactNotesDto.getTime() == null) {
//                        iCContactNotesDto.setTime(LocalTime.of(1, 1, 1));
//                    }
                }
            }
        }

        return caregiverAppointmentDto;
    }


    @Override
    public void removeICAppointment(Long cgAppointmentId) {
        Optional<CaregiverAppointment> AppointmentsOptional = careGiversAppointmentRepository.findById(cgAppointmentId);
        if (AppointmentsOptional.isPresent()) {
            CaregiverAppointment caregiverAppointment = AppointmentsOptional.get();
            caregiverAppointment.setStatus("INACTIVE");
            caregiverAppointment.getAppointments().setAppointmentStatus("INACTIVE");
            careGiversAppointmentRepository.save(caregiverAppointment);

    }

    }
}
