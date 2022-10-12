package org.cyfwms.caregiver.service;
import org.cyfwms.caregiver.dto.CareProviderDto;
import org.cyfwms.caregiver.entity.CareProvider;
import org.cyfwms.caregiver.repository.CareProviderRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
@Service
public class CareProviderServiceImpl implements CareProviderService {
    @Autowired
    CareProviderRepository careProviderRepository;

    @Override
    public CareProviderDto CareProvider(CareProviderDto careProviderDto) {
        CareProvider careProvider = null;
        if (careProviderDto.getCgProviderId() == 0) {
            careProvider = new CareProvider();
            BeanUtils.copyProperties(careProviderDto, careProvider);
            careProvider.setStatusOfDeletion("ACTIVE");
            Optional<CareProvider> careGiverProviderOpt = careProviderRepository.findTopByOrderByReferenceIdDesc();
            if (careGiverProviderOpt.isPresent()) {
                CareProvider careGiverProviderDtls = careGiverProviderOpt.get();
                careProvider.setReferenceId(careGiverProviderDtls.getReferenceId()+128L);
            } else {
                careProvider.setReferenceId(128L);
            }

        } else {
            careProvider = careProviderRepository.findById(careProviderDto.getCgProviderId()).get();
            BeanUtils.copyProperties(careProviderDto, careProvider);
        }
        careProvider = careProviderRepository.save(careProvider);
        careProviderDto.setCgProviderId(careProvider.getCgProviderId());
        careProviderDto.setReferenceId(careProvider.getReferenceId());
        return careProviderDto;
    }

    @Override
    public CareProviderDto readCareProvider(Long cgProviderId) {
        CareProviderDto careProviderDto = new CareProviderDto();
        if (cgProviderId != 0) {
            Optional<CareProvider> careProvider = careProviderRepository.findById(cgProviderId);
            if (careProvider.isPresent() && careProvider.get().getStatusOfDeletion().equals("ACTIVE"))
            {
                BeanUtils.copyProperties(careProvider.get(), careProviderDto);
            }
        }
        return careProviderDto;
    }

    @Override
    public void removeCareProvider(Long referenceId) {
        Optional<CareProvider> careProviderOpt = careProviderRepository.findByReferenceId(referenceId);
        if(careProviderOpt.isPresent()){
            CareProvider careProvider = careProviderOpt.get();
            careProvider.setStatusOfDeletion("INACTIVE");
            careProviderRepository.save(careProvider);
        }
    }
}
