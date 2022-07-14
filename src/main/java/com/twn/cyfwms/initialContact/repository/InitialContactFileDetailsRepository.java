package com.twn.cyfwms.initialContact.repository;

import com.twn.cyfwms.initialContact.entity.InitialContactFileDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InitialContactFileDetailsRepository extends JpaRepository<InitialContactFileDetails, Long> {

}
