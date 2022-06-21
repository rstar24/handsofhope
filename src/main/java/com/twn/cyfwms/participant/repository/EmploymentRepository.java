package com.twn.cyfwms.participant.repository;

import com.twn.cyfwms.participant.entity.Employment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmploymentRepository extends JpaRepository<Employment, Long> {
}
