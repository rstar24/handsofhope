package com.twn.cyfwms.initialContact.service;

import com.twn.cyfwms.initialContact.dto.InitialContactPresentConcernsDto;

public interface InitialContactPresentConcernsService {
    InitialContactPresentConcernsDto readAllPresentConcerns(Long fileDetailsId);
    InitialContactPresentConcernsDto saveAllPresentConcerns(InitialContactPresentConcernsDto initialContactPresentConcernsDto);
}
