package org.cyfwms.caregiver.service;

import org.cyfwms.caregiver.dto.CareProviderDto;

public interface CareProviderService {
    CareProviderDto CareProvider(CareProviderDto careGiverProviderDto);
    CareProviderDto readCareProvider(Long cgProviderId);
    void removeCareProvider(Long referenceId);
}
