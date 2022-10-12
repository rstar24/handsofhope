package org.cyfwms.caregiver.service;
import org.cyfwms.caregiver.dto.CapacityDto;
import org.cyfwms.caregiver.entity.Capacity;
import org.cyfwms.caregiver.repository.CapacityRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class CapacityServiceImpl implements CapacityService {
    @Autowired
    CapacityRepository cGCapacityRepository;
    @Override
    public CapacityDto saveCapacity(CapacityDto cGCapacityDto) {
        Capacity cGCapacity = null;
        if (cGCapacityDto.getCgCapacityId() == 0) {
            cGCapacity = new Capacity();
            BeanUtils.copyProperties(cGCapacityDto, cGCapacity);
            cGCapacity.setStatus("ACTIVE");
        } else {
            cGCapacity = cGCapacityRepository.findById(cGCapacityDto.getCgCapacityId()).get();
            BeanUtils.copyProperties(cGCapacityDto, cGCapacity);
        }
        cGCapacity = cGCapacityRepository.save(cGCapacity);
        cGCapacityDto.setCgCapacityId(cGCapacity.getCgCapacityId());
        return cGCapacityDto;
    }

    @Override
    public CapacityDto readCapacity(Long cgProviderId) {
      CapacityDto cGCapacityDto = new CapacityDto();
        if (cgProviderId != 0) {
            Capacity CGCapacity = cGCapacityRepository.findByCgProviderId(cgProviderId);
            if (CGCapacity!=null)
            {
                BeanUtils.copyProperties(CGCapacity, cGCapacityDto);
            }
        }
        return cGCapacityDto;
    }
}
