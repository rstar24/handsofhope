package org.cyfwms.initialcontact.service;

import org.cyfwms.initialcontact.dto.InitialContactPresentConcernsDto;

public interface InitialContactPresentConcernsService {
    InitialContactPresentConcernsDto readAllPresentConcerns(Long fileDetailsId);
    InitialContactPresentConcernsDto saveAllPresentConcerns(InitialContactPresentConcernsDto initialContactPresentConcernsDto);
}
