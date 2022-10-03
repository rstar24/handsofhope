package org.cyfwms.initialcontact.repository;

import org.cyfwms.initialcontact.entity.InitialContactPresentConcerns;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InitialContactPresentConcernsRepository extends JpaRepository<InitialContactPresentConcerns, Long> {
    InitialContactPresentConcerns findByFileDetailsId(Long fileDetailsId);
}
