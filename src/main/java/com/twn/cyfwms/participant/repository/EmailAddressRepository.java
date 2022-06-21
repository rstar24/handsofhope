package com.twn.cyfwms.participant.repository;

import com.twn.cyfwms.participant.entity.EmailAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailAddressRepository extends JpaRepository<EmailAddress, Long> {
}
