package org.cyfwms.common.controller;

import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cyfwms.common.dto.AppointmentDto;
import org.cyfwms.common.dto.CalenderDto;
import org.cyfwms.common.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@Slf4j(topic = "Comman_Controller")
@AllArgsConstructor
@NoArgsConstructor
@RequestMapping("/v1/commanservice")
@CrossOrigin("*")
public class CommanApi {

    @Autowired
    AppointmentService appointmentService;
    @GetMapping(value = "/readOneAppointment/{appointmentId}", produces = "application/json")
    @ApiOperation("Read One Appointment Information")
    @ResponseStatus(HttpStatus.OK)
    public AppointmentDto readParticipantIdentity(@PathVariable("appointmentId") Long appointmentId) {
        return appointmentService.getOneAppointment(appointmentId);
    }

    @GetMapping(value = "/getAllCalenderdDate/{date}", produces = "application/json")
    @ApiOperation("Calender Api")
    @ResponseStatus(HttpStatus.OK)
    public List<CalenderDto> getAllDate(@PathVariable("date") String date) {
        LocalDate dateTime=null;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        dateTime = LocalDate.parse(date, formatter);
        return appointmentService.getAllDate(dateTime);
    }

}
