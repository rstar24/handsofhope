package com.twn.cyfwms.initialContact.repository;
import com.twn.cyfwms.initialContact.entity.InitialContactContactNotes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface InitialContactContactNotesRepository extends JpaRepository<InitialContactContactNotes,Long> {
    InitialContactContactNotes findBycontactNotesId(Long contactNotesId);
}
