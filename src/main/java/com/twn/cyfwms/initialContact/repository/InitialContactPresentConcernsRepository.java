package com.twn.cyfwms.initialContact.repository;

import com.twn.cyfwms.initialContact.entity.InitialContactPresentConcerns;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InitialContactPresentConcernsRepository extends JpaRepository<InitialContactPresentConcerns,Long> {
    InitialContactPresentConcerns findByFileDetailsId(Long fileDetailsId);
}
