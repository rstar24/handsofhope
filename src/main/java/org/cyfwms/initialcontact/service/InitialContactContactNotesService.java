package org.cyfwms.initialcontact.service;
import org.cyfwms.initialcontact.dto.InitialContactContactNotesDto;
import org.springframework.http.ResponseEntity;
public interface InitialContactContactNotesService {
    InitialContactContactNotesDto saveAllContactNotes(InitialContactContactNotesDto initialContactContactNotesDto);
    InitialContactContactNotesDto readAllContactNotes(Long contactNotesId);
    ResponseEntity removeContactNotes(Long contactNotesId);
}
