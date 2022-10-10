package org.cyfwms.initialcontact.service;
import org.cyfwms.initialcontact.dto.ICContactNotesDto;
import org.cyfwms.initialcontact.entity.ICContactNotes;
import org.cyfwms.initialcontact.repository.ICContactNotesRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;
@Service
public class ICContactNotesServiceImpl implements ICContactNotesService {
    @Autowired
    private ICContactNotesRepository iCContactNotesRepository;
    @Override
    public ICContactNotesDto saveContactNotes(ICContactNotesDto iCContactNotesDto) {
        ICContactNotes iCContactNotes = null;
        if (iCContactNotesDto.getContactNotesId() == 0) {
            iCContactNotes = new ICContactNotes();
            BeanUtils.copyProperties(iCContactNotesDto, iCContactNotes);
            iCContactNotes.setStatus("ACTIVE");
        } else {
            iCContactNotes = iCContactNotesRepository.findById(iCContactNotesDto.getContactNotesId()).get();
            BeanUtils.copyProperties(iCContactNotesDto, iCContactNotes);
        }
        iCContactNotes = iCContactNotesRepository.save(iCContactNotes);
        iCContactNotesDto.setContactNotesId(iCContactNotes.getContactNotesId());
        return iCContactNotesDto;
    }
    @Override
    public ICContactNotesDto readContactNotes(Long fileDetailsID) {
        ICContactNotesDto iCContactNotesDto = new ICContactNotesDto();
        if (fileDetailsID != 0) {
            ICContactNotes iCContactNotes = iCContactNotesRepository.findByFileDetailsId(fileDetailsID);
            if (iCContactNotes != null) {
                BeanUtils.copyProperties(iCContactNotes, iCContactNotesDto);
                if (iCContactNotesDto.getDate() == null) {
                    iCContactNotesDto.setDate(LocalDate.of(1, 1, 1));
                }
                if (iCContactNotesDto.getTime() == null) {
                    iCContactNotesDto.setTime(LocalTime.of(1, 1, 1));
                }
            }
        }
            return iCContactNotesDto;

    }
    @Override
    public void removeContactNotes(Long contactNotesId) {
        Optional<ICContactNotes> iCContactNotesOpt = iCContactNotesRepository.findById(contactNotesId);
        if(iCContactNotesOpt.isPresent()){
            ICContactNotes iCContactNotes = iCContactNotesOpt.get();
            iCContactNotes.setStatus("INACTIVE");
            iCContactNotesRepository.save(iCContactNotes);
        }
    }
}
