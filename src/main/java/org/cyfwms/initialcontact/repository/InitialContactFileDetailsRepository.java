package org.cyfwms.initialcontact.repository;

import org.cyfwms.initialcontact.entity.InitialContactFileDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InitialContactFileDetailsRepository extends JpaRepository<InitialContactFileDetails, Long> {
    Optional<InitialContactFileDetails> findTopByOrderByFileNumberDesc();

   @Query(value = "select * from initialcontactfiledetails i where i.statusofdeletion='ACTIVE' AND fileNumber=?",nativeQuery = true)
    Optional<InitialContactFileDetails> findByFileNumber(Long fileNumber);

    InitialContactFileDetails findByFileDetailsId(Long fileDetailsId);
}
