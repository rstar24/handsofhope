package org.cyfwms.common.util;

import org.cyfwms.caregiver.entity.CareGiverReminder;
import org.cyfwms.caregiver.repository.CareGiverReminderRepository;
import org.cyfwms.participant.entity.Participant;
import org.cyfwms.participant.entity.ParticipantReminder;
import org.cyfwms.participant.repository.ParticipantReminderRepository;
import org.cyfwms.participant.repository.ParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class ReferenceIDGeneratorUtil {

    @Autowired
    private ParticipantRepository participantRepo;

    @Autowired
    private ParticipantReminderRepository participantReminderRepo;

    @Autowired
    private CareGiverReminderRepository careGiverReminderRepo;

    public Long generateParticipantReferenceID() {
        Long referenceId = 128L;
        Optional<Participant> participantOpt =
                participantRepo.findTopByOrderByCreationDateTimeDesc();
        if (participantOpt.isPresent()) {
            referenceId = participantOpt.get().getReferenceId() + 128L;
        }
        return referenceId;
    }

    public Long generateParticipantReminderReferenceID() {
        Long referenceId = 128L;
        Optional<ParticipantReminder> participantReminderOpt =
                participantReminderRepo.findTopByOrderByCreationDateTimeDesc();
        if (participantReminderOpt.isPresent()) {
            referenceId = participantReminderOpt.get().getReferenceId() + 128L;
        }
        return referenceId;
    }

  /*  public Long generateCareGiverReminderReferenceID() {
        Long referenceId = 128L;
        Optional<CareGiverReminder> careGiverReminder =
                careGiverReminderRepo.findTopByOrderByCreationDateTimeDesc();
        if (careGiverReminder.isPresent()) {
            referenceId = careGiverReminder.get().getReferenceId() + 128L;
        }
        return referenceId;
    }
*/

}
