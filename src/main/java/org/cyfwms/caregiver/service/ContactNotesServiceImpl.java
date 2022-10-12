package org.cyfwms.caregiver.service;
import org.cyfwms.caregiver.dto.ContactNotesDto;
import org.cyfwms.caregiver.entity.ContactNotes;
import org.cyfwms.caregiver.repository.ContactNotesRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
public class ContactNotesServiceImpl implements ContactNotesService {
    @Autowired
    ContactNotesRepository contactNotesRepository;

    @Override
    public List<ContactNotesDto> saveAllContactNotes(List<ContactNotesDto> cgContactNotesDtoList) {
        for (ContactNotesDto careGiverContactNotesDto: cgContactNotesDtoList) {
            ContactNotes careGiverContactNotes = null;
            if (careGiverContactNotesDto.getCgContactNotesId() == 0) {
                careGiverContactNotes = new ContactNotes();
                BeanUtils.copyProperties(careGiverContactNotesDto, careGiverContactNotes);
                careGiverContactNotes.setStatus("ACTIVE");
            } else {
                careGiverContactNotes = contactNotesRepository.findById(careGiverContactNotesDto.getCgContactNotesId()).get();
                BeanUtils.copyProperties(careGiverContactNotesDto,careGiverContactNotes);
            }
            careGiverContactNotes = contactNotesRepository.save(careGiverContactNotes);
            careGiverContactNotesDto.setCgContactNotesId(careGiverContactNotes.getCgContactNotesId());
        }
        return cgContactNotesDtoList;
    }

    @Override
    public List<ContactNotesDto> getAllContactNotes(Long cgProviderId) {
        List<ContactNotesDto> cnDtoList=new ArrayList<>();
        if (cgProviderId!=0) {
        cnDtoList = contactNotesRepository.findByCgProviderId(cgProviderId)
            .stream().
            map(cn -> {
                ContactNotesDto cnDTO = new ContactNotesDto();
                BeanUtils.copyProperties(cn, cnDTO);
                if (cnDTO.getDate() == null) {
                    cnDTO.setDate(LocalDate.of(1, 1, 1));
                }
                if (cnDTO.getTime() == null) {
                    cnDTO.setTime(LocalTime.of(1, 1, 1));
                }
                return cnDTO;
            }).collect(Collectors.toList());
       }
        return cnDtoList;
    }

    @Override
    public void removeContactNotes(Long cgContactNotesId) {
        Optional<ContactNotes> contactNotesOpt =
                contactNotesRepository.findById(cgContactNotesId);
        if(contactNotesOpt.isPresent()){
            ContactNotes contactNotes = contactNotesOpt.get();
            contactNotes.setStatus("INACTIVE");
            contactNotesRepository.save(contactNotes);
        }
    }
}
