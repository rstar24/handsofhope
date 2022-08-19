package com.twn.cyfwms.initialContact.service;
import com.twn.cyfwms.initialContact.dto.InitialContactContactNotesDto;
import com.twn.cyfwms.initialContact.entity.InitialContactContactNotes;
import com.twn.cyfwms.initialContact.repository.InitialContactContactNotesRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import static org.springframework.http.HttpStatus.NOT_FOUND;
@Service
public class InitialContactContactNotesServiceImpl implements InitialContactContactNotesService{
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private InitialContactContactNotesRepository initialContactContactNotesRepository;
    @Override
    public List<InitialContactContactNotesDto> saveAllContactNotes(List<InitialContactContactNotesDto> InitialContactContactNotesDtoList) {
        for (com.twn.cyfwms.initialContact.dto.InitialContactContactNotesDto initialContactContactNotesDto: InitialContactContactNotesDtoList) {
            InitialContactContactNotes initialContactContactNotes = null;
            if (initialContactContactNotesDto.getContactNotesId() == 0) {
                initialContactContactNotes = new InitialContactContactNotes();
                modelMapper.map(initialContactContactNotesDto, initialContactContactNotes);
                initialContactContactNotes.setStatus("ACTIVE");
            } else {
                initialContactContactNotes = initialContactContactNotesRepository.findById(initialContactContactNotesDto.getContactNotesId()).get();
                modelMapper.map(initialContactContactNotesDto,initialContactContactNotes);
            }
            initialContactContactNotes = initialContactContactNotesRepository.save(initialContactContactNotes);
            initialContactContactNotesDto.setContactNotesId(initialContactContactNotes.getContactNotesId());
        }
        return InitialContactContactNotesDtoList;
    }
    @Override
    public List<InitialContactContactNotesDto> readAllContactNotes(Long fileDetailsID) {
        List<InitialContactContactNotesDto> InitialContactContactNotesDtoList = new ArrayList<InitialContactContactNotesDto>();
        if (fileDetailsID != 0) {
            List<InitialContactContactNotes> InitialContactContactNotesList = initialContactContactNotesRepository.findByFileDetailsId(fileDetailsID);
            if (InitialContactContactNotesList != null) {
                List<InitialContactContactNotes> InitialContactContactNotesActive = new ArrayList<>();
                for (int i = 0; i < InitialContactContactNotesList.size(); ++i) {
                    if (!InitialContactContactNotesList.get(i).getStatus().equalsIgnoreCase("INACTIVE")) {
                        InitialContactContactNotesActive.add(InitialContactContactNotesList.get(i));
                    }
                }
                InitialContactContactNotesDtoList = modelMapper.map(InitialContactContactNotesActive, new TypeToken<List<InitialContactContactNotesDto>>() {}.getType());
                for (int i = 0;i < InitialContactContactNotesDtoList.size(); ++i) {
                    if (InitialContactContactNotesDtoList.get(i).getDate() == null) {
                        InitialContactContactNotesDtoList.get(i).setDate(LocalDate.of(1,1,1));
                    }
                    if (InitialContactContactNotesDtoList.get(i).getTime() == null) {
                        InitialContactContactNotesDtoList.get(i).setTime(LocalTime.of(1,1,1));
                    }
                }
            } else {
                throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
            }
        }
        return InitialContactContactNotesDtoList;
    }
}
