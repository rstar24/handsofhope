package org.cyfwms.caregiver.service;
import org.cyfwms.caregiver.dto.ContactNotesDto;
import org.cyfwms.caregiver.entity.ContactNotes;
import org.cyfwms.caregiver.repository.ContactNotesRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;
@Service
public class ContactNotesServiceImpl implements ContactNotesService {
    @Autowired
    ContactNotesRepository contactNotesRepository;

    @Override
    public ContactNotesDto saveAllContactNotes(ContactNotesDto cgContactNotesDto) {
            ContactNotes careGiverContactNotes = null;
            if (cgContactNotesDto.getCgContactNotesId() == 0) {
                careGiverContactNotes = new ContactNotes();
                BeanUtils.copyProperties(cgContactNotesDto, careGiverContactNotes);
                careGiverContactNotes.setStatus("ACTIVE");
            } else {
                careGiverContactNotes = contactNotesRepository.findById(cgContactNotesDto.getCgContactNotesId()).get();
                BeanUtils.copyProperties(cgContactNotesDto,careGiverContactNotes);
            }
            careGiverContactNotes = contactNotesRepository.save(careGiverContactNotes);
        cgContactNotesDto.setCgContactNotesId(careGiverContactNotes.getCgContactNotesId());

        return cgContactNotesDto;
    }

    @Override
    public ContactNotesDto getAllContactNotes(Long cgProviderId) {
        ContactNotesDto contactNotesDto=new ContactNotesDto();
        if (cgProviderId!=0) {
            ContactNotes contactNotes = contactNotesRepository.findByCgProviderId(cgProviderId);
            BeanUtils.copyProperties(contactNotes, contactNotesDto);
            if (contactNotesDto.getDate() == null) {
                contactNotesDto.setDate(LocalDate.of(1, 1, 1));
            }
            if (contactNotesDto.getTime() == null) {
                contactNotesDto.setTime(LocalTime.of(1, 1, 1));
            }
       }
        return contactNotesDto;
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
