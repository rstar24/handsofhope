package org.cyfwms.initialcontact.service;
import org.cyfwms.initialcontact.dto.ReadAllOutputInitialContactDto;
import org.cyfwms.initialcontact.entity.*;
import org.cyfwms.initialcontact.repository.*;
import org.cyfwms.initialcontact.entity.*;
import org.cyfwms.initialcontact.repository.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.Optional;
import static org.springframework.http.HttpStatus.NOT_FOUND;
@Service
public class ReadAllInitialContactServiceImpl implements ReadAllInitialContactService{
    @Autowired
    InitialContactFileDetailsRepository initialContactFileDetailsRepository;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    InitialContactIncidentReportRepository initialContactIncidentReportRepository;
    @Autowired
    InitialContactPatientCareInfoRepository initialContactPatientCareInfoRepository;
    @Autowired
    InitialContactPresentConcernsRepository initialContactPresentConcernsRepository;
    @Autowired
    InitialContactReferralInfoRepository initialContactReferralInfoRepository;
    @Override
    public ReadAllOutputInitialContactDto readAllOutPutInitialContact(Long fileNumber) {
        if (fileNumber!=0){
            ReadAllOutputInitialContactDto readAllOutputInitialContactDto = new ReadAllOutputInitialContactDto();
            InitialContactFileDetails initialContactFileDetails = readFileNumber(fileNumber);
            if (initialContactFileDetails!=null){
                Long fileDetailsId = initialContactFileDetails.getFileDetailsId();
                modelMapper.map(initialContactFileDetails, readAllOutputInitialContactDto);

                InitialContactIncidentReport initialContactIncidentReport=initialContactIncidentReportRepository.findByFileDetailsId(fileDetailsId);
               if (initialContactIncidentReport!=null) {
                   modelMapper.map(initialContactIncidentReport, readAllOutputInitialContactDto);
               }
                InitialContactPatientCareInfo initialContactPatientCareInfo=initialContactPatientCareInfoRepository.findByFileDetailsId(fileDetailsId);
               if (initialContactPatientCareInfo!=null){
                   modelMapper.map(initialContactPatientCareInfo,readAllOutputInitialContactDto);
               }
                InitialContactPresentConcerns initialContactPresentConcerns=initialContactPresentConcernsRepository.findByFileDetailsId(fileDetailsId);
               if (initialContactPresentConcerns!=null){
                   modelMapper.map(initialContactPresentConcerns,readAllOutputInitialContactDto);
               }
                InitialContactReferralInfo initialContactReferralInfo=initialContactReferralInfoRepository.findByFileDetailsId(fileDetailsId);
               if (initialContactReferralInfo!=null){
                   modelMapper.map(initialContactReferralInfo,readAllOutputInitialContactDto);
               }
            }
            else
            {
                throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
            }
            return readAllOutputInitialContactDto;
        }
        throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
    }

    private InitialContactFileDetails readFileNumber(Long fileNumber) {
        InitialContactFileDetails initialContactFileDetails = null;
        Optional<InitialContactFileDetails> InitialContactFileDetailsOpt = initialContactFileDetailsRepository.findByFileNumber(fileNumber);
        if (InitialContactFileDetailsOpt.isPresent()) {
            initialContactFileDetails = InitialContactFileDetailsOpt.get();
        }
        return initialContactFileDetails;
    }
}
