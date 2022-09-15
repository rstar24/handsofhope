package com.twn.cyfwms.initialContact.service;

import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.OK;

import java.time.LocalDate;
import java.util.Optional;

import com.twn.cyfwms.participant.entity.Participant;
import com.twn.cyfwms.participant.repository.ParticipantRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.twn.cyfwms.initialContact.dto.InitialContactFileDetailsDto;
import com.twn.cyfwms.initialContact.entity.InitialContactFileDetails;
import com.twn.cyfwms.initialContact.repository.InitialContactFileDetailsRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class InitialContactFileDetailsServiceImpl implements  InitialContactFileDetailsService{
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private InitialContactFileDetailsRepository fileDetailsRepo;
    @Autowired
    private ParticipantRepository participantRepository;

    @Override
    public InitialContactFileDetailsDto readAllFileDetails(Long fileDetailsID) {
        if (fileDetailsID != 0) {
            InitialContactFileDetailsDto initialContactFileDetailsDto = new InitialContactFileDetailsDto();
            InitialContactFileDetails initialContactFileDetails = fileDetailsRepo.findById(fileDetailsID).get();
            if (initialContactFileDetails != null) {
                if (!initialContactFileDetails.getStatusOfDeletion().equals("INACTIVE")){
                    modelMapper.map(initialContactFileDetails, initialContactFileDetailsDto);
                   Participant participant=participantRepository.findByParticipantId(Long.parseLong(initialContactFileDetailsDto.getClientName()));
                  if (!initialContactFileDetails.getClientName().equals("0")) {
                      initialContactFileDetailsDto.setClientName(participant.getFirstname() + " " + participant.getSurname());
                  }
                }
                else {
                    throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
                }
                if (initialContactFileDetailsDto.getDateClosed()==null){
                    initialContactFileDetailsDto.setDateClosed(LocalDate.of(1,1,1));
                }
            } else {
                throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
            }
            return initialContactFileDetailsDto;
        }
        throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
    }

    @Override
    public InitialContactFileDetailsDto saveAllFileDetails(InitialContactFileDetailsDto initialContactFileDetailsDto) {
        InitialContactFileDetails initialContactFileDetails = null;
        if (initialContactFileDetailsDto.getFileDetailsId() == 0) {
            initialContactFileDetails = new InitialContactFileDetails();
            modelMapper.map(initialContactFileDetailsDto, initialContactFileDetails);
            initialContactFileDetails.setStatusOfDeletion("ACTIVE");
            Optional<InitialContactFileDetails> initialContactFileDetailOpt = fileDetailsRepo.findTopByOrderByFileNumberDesc();
            if (initialContactFileDetailOpt.isPresent()) {
                InitialContactFileDetails initialContactFileDtls = initialContactFileDetailOpt.get();
                initialContactFileDetails.setFileNumber(initialContactFileDtls.getFileNumber()+1L);
            } else {
               initialContactFileDetails.setFileNumber(1L);
            }
        } else {
            initialContactFileDetails=fileDetailsRepo.findById(initialContactFileDetailsDto.getFileDetailsId()).get();
            modelMapper.map(initialContactFileDetailsDto, initialContactFileDetails);
        }
        initialContactFileDetails = fileDetailsRepo.save(initialContactFileDetails);
        initialContactFileDetailsDto.setFileDetailsId(initialContactFileDetails.getFileDetailsId());
        initialContactFileDetailsDto.setFileNumber(initialContactFileDetails.getFileNumber());
        return initialContactFileDetailsDto;
    }

    @Override
    public ResponseEntity<String> remove(Long fileNumber) {
        Optional<InitialContactFileDetails> ic = fileDetailsRepo.findByFileNumber(fileNumber);
        if (!ic.isPresent() || ic.get().getStatusOfDeletion().equalsIgnoreCase("INACTIVE")) {
            return new ResponseEntity<String>("Initial Contact not found!", NOT_FOUND);
        }
        ic.get().setStatusOfDeletion("INACTIVE");
        fileDetailsRepo.save(ic.get());
        return new ResponseEntity<String>(OK);
    }
}
