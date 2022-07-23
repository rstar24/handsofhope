package com.twn.cyfwms.initialContact.service;

import com.twn.cyfwms.initialContact.dto.InitialContactPresentConcernsDto;
import com.twn.cyfwms.initialContact.entity.InitialContactPresentConcerns;
import com.twn.cyfwms.initialContact.repository.InitialContactPresentConcernsRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@AllArgsConstructor
public class InitialContactPresentConcernsServiceImpl  implements InitialContactPresentConcernsService{
    @Autowired
    InitialContactPresentConcernsRepository initialContactPresentConcernsRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public InitialContactPresentConcernsDto readAllPresentConcerns(Long fileDetailsId) {
        if (fileDetailsId != 0) {
            InitialContactPresentConcernsDto initialContactPresentConcernsDto = new InitialContactPresentConcernsDto();
            InitialContactPresentConcerns initialContactPresentConcerns = initialContactPresentConcernsRepository.findByFileDetailsId(fileDetailsId);
            if (initialContactPresentConcerns != null) {
                modelMapper.map(initialContactPresentConcerns, initialContactPresentConcernsDto);
            } else {
                throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
            }
            return initialContactPresentConcernsDto;
        }
        throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
    }

    @Override
    public InitialContactPresentConcernsDto saveAllPresentConcerns(InitialContactPresentConcernsDto initialContactPresentConcernsDto) {
        InitialContactPresentConcerns initialContactPresentConcerns = null;
        if (initialContactPresentConcernsDto.getPresentConcernsId() == 0) {
            initialContactPresentConcerns = new InitialContactPresentConcerns();
            modelMapper.map(initialContactPresentConcernsDto, initialContactPresentConcerns);
        } else {
            initialContactPresentConcerns = initialContactPresentConcernsRepository.findById(initialContactPresentConcernsDto.getPresentConcernsId()).get();
            modelMapper.map(initialContactPresentConcernsDto, initialContactPresentConcerns);
        }
        initialContactPresentConcerns = initialContactPresentConcernsRepository.save(initialContactPresentConcerns);
        initialContactPresentConcernsDto.setFileDetailsId(initialContactPresentConcerns.getFileDetailsId());
        return initialContactPresentConcernsDto;
    }
}
