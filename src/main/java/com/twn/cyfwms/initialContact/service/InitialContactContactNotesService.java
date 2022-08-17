package com.twn.cyfwms.initialContact.service;

import com.twn.cyfwms.initialContact.dto.InitialContactContactNotesDto;

public interface InitialContactContactNotesService {
    InitialContactContactNotesDto saveAllContactNotes(InitialContactContactNotesDto initialContactContactNotesDto);
    InitialContactContactNotesDto readAllContactNotes(Long fileDetailsID);
}
