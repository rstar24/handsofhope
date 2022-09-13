package com.twn.cyfwms.participant.repository;

import com.twn.cyfwms.participant.entity.Participant;
import com.twn.cyfwms.participant.entity.ParticipantImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository

public interface ImageRepository extends JpaRepository<ParticipantImage, Long>{


    Optional<ParticipantImage> findByParticipantId(Long id);
}
