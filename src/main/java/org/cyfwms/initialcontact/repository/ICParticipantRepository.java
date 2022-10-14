package org.cyfwms.initialcontact.repository;

import org.cyfwms.initialcontact.entity.ICParticipant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICParticipantRepository extends JpaRepository<ICParticipant,Long> {
    ICParticipant findByFileDetailsId(Long fileDetailsId);

}
