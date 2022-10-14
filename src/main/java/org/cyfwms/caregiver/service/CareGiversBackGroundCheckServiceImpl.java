package org.cyfwms.caregiver.service;
import org.cyfwms.caregiver.dto.CareGiversBackGroundCheckDto;
import org.cyfwms.caregiver.entity.CareGiversBackGroundCheck;
import org.cyfwms.caregiver.repository.CareGiversBackGroundRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class CareGiversBackGroundCheckServiceImpl implements CareGiversBackGroundCheckService {
    @Autowired
    CareGiversBackGroundRepository cgBackGroundCheckRepo;
    @Override
    public CareGiversBackGroundCheckDto readCareGiversBackGroundCheck(Long cgProviderId) {
        CareGiversBackGroundCheckDto careGiverBGCheckDto = new CareGiversBackGroundCheckDto();
        if (cgProviderId != 0) {
            CareGiversBackGroundCheck cgBackGroundCheck = cgBackGroundCheckRepo.findByCgProviderId(cgProviderId);
            if (cgBackGroundCheck!=null)
            {
                BeanUtils.copyProperties(cgBackGroundCheck, careGiverBGCheckDto);
            }
        }
        return careGiverBGCheckDto;
    }

    @Override
    public CareGiversBackGroundCheckDto saveCareGiversBackGroundCheck(CareGiversBackGroundCheckDto careGiverBGCheckDto) {
        CareGiversBackGroundCheck careGiverBGCheck = null;
        if (careGiverBGCheckDto.getCgBackGroundCheckId() == 0) {
            careGiverBGCheck = new CareGiversBackGroundCheck();
            BeanUtils.copyProperties(careGiverBGCheckDto, careGiverBGCheck);
            careGiverBGCheck.setStatus("ACTIVE");
        } else {
            careGiverBGCheck = cgBackGroundCheckRepo.findById(careGiverBGCheckDto.getCgBackGroundCheckId()).get();
            BeanUtils.copyProperties(careGiverBGCheckDto, careGiverBGCheck);
        }
        careGiverBGCheck = cgBackGroundCheckRepo.save(careGiverBGCheck);
        careGiverBGCheckDto.setCgBackGroundCheckId(careGiverBGCheck.getCgBackGroundCheckId());
        return careGiverBGCheckDto;
    }
}
