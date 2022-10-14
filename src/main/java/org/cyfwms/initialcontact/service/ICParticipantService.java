package org.cyfwms.initialcontact.service;
import org.cyfwms.initialcontact.dto.ICParticipantDto;
public interface ICParticipantService {
    ICParticipantDto saveICParticipant(ICParticipantDto iCParticipantDto);

    ICParticipantDto readICParticipant(Long fileDetailsId);
    void removeICParticipant(Long icParticipantId);
}
