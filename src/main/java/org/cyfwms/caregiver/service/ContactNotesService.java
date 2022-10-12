package org.cyfwms.caregiver.service;

import org.cyfwms.caregiver.dto.ContactNotesDto;

import java.util.List;

public interface ContactNotesService {
    List<ContactNotesDto> saveAllContactNotes(List<ContactNotesDto> cgContactNotesDtoList);
    List<ContactNotesDto> getAllContactNotes(Long cgProviderId);
    void removeContactNotes(Long cgContactNotesId);
}
