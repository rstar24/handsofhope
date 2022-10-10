package org.cyfwms.initialcontact.service;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cyfwms.common.exception.I18Constants;
import org.cyfwms.common.exception.MessageUtil;
import org.cyfwms.common.exception.NoSuchElementFoundException;
import org.cyfwms.initialcontact.dto.ICFileDetailsDto;
import org.cyfwms.initialcontact.entity.ICFileDetails;
import org.cyfwms.initialcontact.repository.ICFileDetailsRepository;
import org.cyfwms.participant.entity.Participant;
import org.cyfwms.participant.repository.ParticipantRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.Optional;
@Slf4j
@Service
@AllArgsConstructor
public class ICFileDetailsServiceImpl implements ICFileDetailsService {

    @Autowired
    MessageUtil messageUtil;
    @Autowired
    private ICFileDetailsRepository fileDetailsRepo;
    @Autowired
    private ParticipantRepository participantRepository;

    @Override
    public ICFileDetailsDto readAllFileDetails(Long fileDetailsID) {
        log.info("Reading InitialContact.");
        ICFileDetailsDto iCFileDetailsDto = new ICFileDetailsDto();
        if (fileDetailsID != 0) {
            ICFileDetails iCFileDetails = fileDetailsRepo.findById(
                    fileDetailsID).orElseThrow(() ->
                    new NoSuchElementFoundException(messageUtil.getLocalMessage(I18Constants.NO_ITEM_FOUND.getKey(), String.valueOf(fileDetailsID))));
            if (iCFileDetails != null) {
                if (iCFileDetails.getStatusOfDeletion().equals("ACTIVE")) {
                    BeanUtils.copyProperties(iCFileDetails, iCFileDetailsDto);
                    Participant participant = participantRepository.findByParticipantId(Long.parseLong(iCFileDetailsDto.getClientName()));
                    if (!iCFileDetails.getClientName().equals("0")) {
                        iCFileDetailsDto.setClientName(participant.getFirstname() + " " + participant.getSurname());
                        iCFileDetailsDto.setParticipantId(participant.getParticipantId());
                    }
                    if (iCFileDetailsDto.getDateClosed() == null) {
                        iCFileDetailsDto.setDateClosed(LocalDate.of(1, 1, 1));
                    }
                }

            }
        }
            return iCFileDetailsDto;
    }

    @Override
    public ICFileDetailsDto saveAllFileDetails(ICFileDetailsDto iCFileDetailsDto) {
        ICFileDetails iCFileDetails = null;
        if (iCFileDetailsDto.getFileDetailsId() == 0) {
            iCFileDetails = new ICFileDetails();
            BeanUtils.copyProperties(iCFileDetailsDto, iCFileDetails);
            iCFileDetails.setStatusOfDeletion("ACTIVE");
            Optional<ICFileDetails> initialContactFileDetailOpt = fileDetailsRepo.findTopByOrderByFileNumberDesc();
            if (initialContactFileDetailOpt.isPresent()) {
                ICFileDetails initialContactFileDtls = initialContactFileDetailOpt.get();
                iCFileDetails.setFileNumber(initialContactFileDtls.getFileNumber()+1L);
            } else {
                iCFileDetails.setFileNumber(1L);
            }
        } else {
            iCFileDetails=fileDetailsRepo.findById(iCFileDetailsDto.getFileDetailsId()).get();
            BeanUtils.copyProperties(iCFileDetailsDto, iCFileDetails);
        }
        iCFileDetails = fileDetailsRepo.save(iCFileDetails);
        iCFileDetailsDto.setFileDetailsId(iCFileDetails.getFileDetailsId());
        iCFileDetailsDto.setFileNumber(iCFileDetails.getFileNumber());
        return iCFileDetailsDto;
    }

    @Override
    public void removeICFileDetails(Long fileNumber) {
        Optional<ICFileDetails> iCFileDetailsOpt = fileDetailsRepo.findByFileNumber(fileNumber);
        if(iCFileDetailsOpt.isPresent()){
            ICFileDetails iCFileDetails = iCFileDetailsOpt.get();
            iCFileDetails.setStatusOfDeletion("INACTIVE");
            fileDetailsRepo.save(iCFileDetails);
        }
    }
}
