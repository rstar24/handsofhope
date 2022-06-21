package com.twn.cyfwms.participant.repository;

import com.twn.cyfwms.participant.entity.FamilyPhysician;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FamilyPhysicianRepository extends JpaRepository<FamilyPhysician, Long> {
}
