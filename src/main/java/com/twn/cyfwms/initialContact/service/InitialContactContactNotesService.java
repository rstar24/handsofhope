package com.twn.cyfwms.initialContact.service;
import com.twn.cyfwms.initialContact.dto.InitialContactContactNotesDto;
import java.util.List;
public interface InitialContactContactNotesService {
    List<InitialContactContactNotesDto> saveAllContactNotes(List<InitialContactContactNotesDto> InitialContactContactNotesDtoList);
    List<InitialContactContactNotesDto> readAllContactNotes(Long fileDetailsID);
}
