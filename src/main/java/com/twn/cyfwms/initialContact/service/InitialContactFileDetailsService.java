package com.twn.cyfwms.initialContact.service;

import com.twn.cyfwms.initialContact.dto.InitialContactFileDetailsDto;
import org.springframework.http.ResponseEntity;

public interface InitialContactFileDetailsService {
    InitialContactFileDetailsDto readAllFileDetails(Long fileDetailsID );
    InitialContactFileDetailsDto saveAllFileDetails(InitialContactFileDetailsDto initialContactFileDetailsDto);
    ResponseEntity removeInitialContactFileDetails(Long fileNumber);
}
