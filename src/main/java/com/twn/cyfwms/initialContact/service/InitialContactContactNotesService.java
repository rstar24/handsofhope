package com.twn.cyfwms.initialContact.service;
import com.twn.cyfwms.initialContact.dto.InitialContactContactNotesDto;
import java.util.List;
public interface InitialContactContactNotesService {
    InitialContactContactNotesDto saveAllContactNotes(InitialContactContactNotesDto initialContactContactNotesDto);
    InitialContactContactNotesDto readAllContactNotes(Long contactNotesId);
}
