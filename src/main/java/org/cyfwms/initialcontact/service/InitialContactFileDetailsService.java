package org.cyfwms.initialcontact.service;

import org.cyfwms.initialcontact.dto.InitialContactFileDetailsDto;
import org.springframework.http.ResponseEntity;

public interface InitialContactFileDetailsService {
    InitialContactFileDetailsDto readAllFileDetails(Long fileDetailsID );
    InitialContactFileDetailsDto saveAllFileDetails(InitialContactFileDetailsDto initialContactFileDetailsDto);
    ResponseEntity<String> remove(Long fileNumber);
}
