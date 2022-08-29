package com.twn.cyfwms.initialContact.service;

import com.twn.cyfwms.initialContact.dto.InitialContactFileDetailsDto;
import com.twn.cyfwms.initialContact.entity.InitialContactFileDetails;
import com.twn.cyfwms.initialContact.repository.InitialContactFileDetailsRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDate;
import java.util.Optional;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@AllArgsConstructor
public class InitialContactFileDetailsServiceImpl implements  InitialContactFileDetailsService{
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private InitialContactFileDetailsRepository initialContactFileDetailsRepository;


    @Override
    public InitialContactFileDetailsDto readAllFileDetails(Long fileDetailsID) {
        if (fileDetailsID != 0) {
            InitialContactFileDetailsDto initialContactFileDetailsDto = new InitialContactFileDetailsDto();
            InitialContactFileDetails initialContactFileDetails = initialContactFileDetailsRepository.findById(fileDetailsID).get();
            if (initialContactFileDetails != null) {
                modelMapper.map(initialContactFileDetails, initialContactFileDetailsDto);
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
            Optional<InitialContactFileDetails> initialContactFileDetailOpt = initialContactFileDetailsRepository.findTopByOrderByFileNumberDesc();
            if (initialContactFileDetailOpt.isPresent()) {
                InitialContactFileDetails initialContactFileDtls = initialContactFileDetailOpt.get();
                initialContactFileDetails.setFileNumber(initialContactFileDtls.getFileNumber()+1L);
            } else {
               initialContactFileDetails.setFileNumber(1L);
            }
        } else {
            initialContactFileDetails=initialContactFileDetailsRepository.findById(initialContactFileDetailsDto.getFileDetailsId()).get();
            modelMapper.map(initialContactFileDetailsDto, initialContactFileDetails);
        }
        initialContactFileDetails = initialContactFileDetailsRepository.save(initialContactFileDetails);
        initialContactFileDetailsDto.setFileDetailsId(initialContactFileDetails.getFileDetailsId());
        initialContactFileDetailsDto.setFileNumber(initialContactFileDetails.getFileNumber());
        return initialContactFileDetailsDto;
    }
}
