package org.cyfwms.caregiver.service;

import org.cyfwms.caregiver.dto.CareGiverSearchAppointmentDto;
import org.cyfwms.caregiver.dto.CaregGiverSearchAppointmentResultDto;
import org.cyfwms.caregiver.repository.CareGiverSearchAppointmentRepo;
import org.cyfwms.participant.dto.ParticipantContactNotesSearchCriteriaDto;
import org.cyfwms.participant.dto.ParticipantContactNotesSearchResultsDto;
import org.cyfwms.participant.repository.ParticipantContactNotesSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CareGiverSearchAppointmentService {
    @Autowired
    CareGiverSearchAppointmentRepo careGiverSearchAppointmentRepo;
    public List<CaregGiverSearchAppointmentResultDto> searchCGAppointment(CareGiverSearchAppointmentDto careGiverSearchAppointmentDto) {
        return careGiverSearchAppointmentRepo.searchCGAppointment(careGiverSearchAppointmentDto);
    }
}
