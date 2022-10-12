package org.cyfwms.caregiver.repository;

import org.cyfwms.caregiver.entity.CareProvider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CareProviderRepository extends JpaRepository<CareProvider,Long> {
    Optional<CareProvider> findTopByOrderByReferenceIdDesc();
    Optional<CareProvider> findByReferenceId(Long referenceId);
}
