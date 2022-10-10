package org.cyfwms.initialcontact.service;
import lombok.AllArgsConstructor;
import org.cyfwms.initialcontact.dto.ICPresentConcernsDto;
import org.cyfwms.initialcontact.entity.ICPresentConcerns;
import org.cyfwms.initialcontact.repository.ICPresentConcernsRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
@AllArgsConstructor
public class ICPresentConcernsServiceImpl implements ICPresentConcernsService {
    @Autowired
    ICPresentConcernsRepository iCPresentConcernsRepository;

    @Override
    public ICPresentConcernsDto readPresentConcerns(Long fileDetailsId) {
        ICPresentConcernsDto iCPresentConcernsDto = new ICPresentConcernsDto();
        if (fileDetailsId != 0) {
            ICPresentConcerns iCPresentConcerns = iCPresentConcernsRepository.findByFileDetailsId(fileDetailsId);
            if (iCPresentConcerns != null) {
                BeanUtils.copyProperties(iCPresentConcerns, iCPresentConcernsDto);
            }
        }
            return iCPresentConcernsDto;
    }

    @Override
    public ICPresentConcernsDto savePresentConcerns(ICPresentConcernsDto iCPresentConcernsDto) {
        ICPresentConcerns iCPresentConcerns = null;
        if(iCPresentConcernsDto.getPresentConcernsId() == 0) {
            iCPresentConcerns = new ICPresentConcerns();
            BeanUtils.copyProperties(iCPresentConcernsDto, iCPresentConcerns);
        } else {
            iCPresentConcerns = iCPresentConcernsRepository.findById(iCPresentConcernsDto.getPresentConcernsId()).get();
            BeanUtils.copyProperties(iCPresentConcernsDto, iCPresentConcerns);
        }
        iCPresentConcerns = iCPresentConcernsRepository.save(iCPresentConcerns);
        iCPresentConcernsDto.setFileDetailsId(iCPresentConcerns.getFileDetailsId());
        iCPresentConcernsDto.setPresentConcernsId(iCPresentConcerns.getPresentConcernsId());
        return iCPresentConcernsDto;
    }
}
