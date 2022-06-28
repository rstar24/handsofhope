package com.twn.cyfwms.participant.repository;

import com.twn.cyfwms.participant.entity.ParticipantContact;
import com.twn.cyfwms.participant.entity.ParticipantOtherInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParticipantOtherInformationRepository extends JpaRepository<ParticipantOtherInformation, Long> {
    ParticipantOtherInformation findByParticipantId(long participantId);
}
