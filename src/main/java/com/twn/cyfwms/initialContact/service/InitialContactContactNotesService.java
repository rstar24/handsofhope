package com.twn.cyfwms.initialContact.service;
import com.twn.cyfwms.initialContact.dto.InitialContactContactNotesDto;
import org.springframework.http.ResponseEntity;
public interface InitialContactContactNotesService {
    InitialContactContactNotesDto saveAllContactNotes(InitialContactContactNotesDto initialContactContactNotesDto);
    InitialContactContactNotesDto readAllContactNotes(Long contactNotesId);
    ResponseEntity removeContactNotes(Long contactNotesId);
}
