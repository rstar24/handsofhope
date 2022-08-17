package com.twn.cyfwms.initialContact.service;
import com.twn.cyfwms.initialContact.dto.InitialContactContactNotesDto;
import com.twn.cyfwms.initialContact.entity.InitialContactContactNotes;
import com.twn.cyfwms.initialContact.repository.InitialContactContactNotesRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import static org.springframework.http.HttpStatus.NOT_FOUND;
@Service
public class InitialContactContactNotesServiceImpl implements InitialContactContactNotesService{
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private InitialContactContactNotesRepository initialContactContactNotesRepository;
    @Override
    public InitialContactContactNotesDto saveAllContactNotes(InitialContactContactNotesDto initialContactContactNotesDto) {
        InitialContactContactNotes initialContactContactNotes = null;
        if (initialContactContactNotesDto.getContactNotesId() == 0) {
            initialContactContactNotes = new InitialContactContactNotes();
            modelMapper.map(initialContactContactNotesDto, initialContactContactNotes);

        } else {
            initialContactContactNotes=initialContactContactNotesRepository.findById(initialContactContactNotesDto.getContactNotesId()).get();
            modelMapper.map(initialContactContactNotesDto, initialContactContactNotes);
        }
        initialContactContactNotes = initialContactContactNotesRepository.save(initialContactContactNotes);
        initialContactContactNotesDto.setFileDetailsId(initialContactContactNotes.getFileDetailsId());

        return initialContactContactNotesDto;
    }

    @Override
    public InitialContactContactNotesDto readAllContactNotes(Long fileDetailsID) {

        if (fileDetailsID != 0) {
            InitialContactContactNotesDto initialContactContactNotesDto = new InitialContactContactNotesDto();
            InitialContactContactNotes initialContactIncidentReport = initialContactContactNotesRepository.findByFileDetailsId(fileDetailsID);
            if (initialContactIncidentReport != null) {
                modelMapper.map(initialContactIncidentReport, initialContactContactNotesDto);

            } else {
                throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
            }
            return initialContactContactNotesDto;
        }
        throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
    }
}
