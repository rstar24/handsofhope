package com.twn.cyfwms.initialContact.service;

import com.twn.cyfwms.initialContact.dto.InitialContactFileDetailsDto;

public interface InitialContactFileDetailsService {
    InitialContactFileDetailsDto readAllFileDetails(Long fileDetailsID );
    InitialContactFileDetailsDto saveAllFileDetails(InitialContactFileDetailsDto initialContactFileDetailsDto);
}
