package com.twn.cyfwms.participant.service;
import com.google.common.reflect.TypeToken;
import com.twn.cyfwms.participant.dto.ReadAllOutputParticipantDto;
import com.twn.cyfwms.participant.entity.*;
import com.twn.cyfwms.participant.repository.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.lang.reflect.Type;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import static org.springframework.http.HttpStatus.NOT_FOUND;
@Service
public class ReadAllOutputParticipantServiceImpl implements ReadAllOutputParticipantService {
    @Autowired
    private ParticipantRepository participantRepository;

     @Autowired
     ModelMapper modelMapper;
     @Autowired
     private ParticipantContactRepository participantContactRepository;
     @Autowired
     private HouseholdMemberRepository householdMemberRepo;
     @Autowired
     private EducationRepository educationRepository;
     @Autowired
     private EmploymentRepository employmentRepository;
     @Autowired
     private FamilyPhysicianRepository familyPhysicianRepository;
     @Autowired
     private CriminalHistoryRepository criminalHistoryRepo;
     @Autowired
     private CounselorCFSWorkerRepository counselorCFSWorkerRepository;
     @Autowired
     private ParticipantOtherInformationRepository participantOtherInformationRepository;
     @Override
     public ReadAllOutputParticipantDto readAllOutPutParticipant(Long referenceId) {
        if (referenceId != 0) {
            ReadAllOutputParticipantDto readAllOutputParticipantDto = new ReadAllOutputParticipantDto();
            Participant participant = readReference(referenceId);
            if (participant != null) {
                Long participantId=participant.getParticipantId();
                modelMapper.map(participant,readAllOutputParticipantDto);
                ParticipantContact participantContactOpt=participantContactRepository.findByParticipantId(participantId);
                Education educationOpt=educationRepository.findByParticipantId(participantId);
                Employment employmentOpt=employmentRepository.findByParticipantId(participantId);
                Optional<CriminalHistory> criminalHistoryOpt = Optional.ofNullable(criminalHistoryRepo.findByParticipantId(participantId));
                ParticipantOtherInformation participantOtherInformationOpt=participantOtherInformationRepository.findByParticipantId(participantId);
                readAllOutputParticipantDto.setParticipantContact(participantContactOpt);
                if (readAllOutputParticipantDto.getParticipantContact().getStartDate()==null){
                 readAllOutputParticipantDto.getParticipantContact().setStartDate(LocalDate.of(1,1,1));
                }
                if (readAllOutputParticipantDto.getParticipantContact().getEndDate()==null){
                    readAllOutputParticipantDto.getParticipantContact().setEndDate(LocalDate.of(1,1,1));
                }
                Type householdMemberListType = new TypeToken<List<HouseholdMember>>(){}.getType();
                List<HouseholdMember> householdMemberDTOList = modelMapper.map(participant.getHouseholdMemberList(), householdMemberListType);
                readAllOutputParticipantDto.setHouseholdMember(householdMemberDTOList);
               for (int i=0;i<readAllOutputParticipantDto.getHouseholdMember().size();i++){
               if (readAllOutputParticipantDto.getHouseholdMember().get(i).getDateOfBirth()==null){
                   readAllOutputParticipantDto.getHouseholdMember().get(i).setDateOfBirth(LocalDate.of(1,1,1));
               }
               if (readAllOutputParticipantDto.getHouseholdMember().get(i).getStartDate()==null) {
                   readAllOutputParticipantDto.getHouseholdMember().get(i).setStartDate(LocalDate.of(1, 1, 1));
               }
               if (readAllOutputParticipantDto.getHouseholdMember().get(i).getEndDate()==null){
                   readAllOutputParticipantDto.getHouseholdMember().get(i).setEndDate(LocalDate.of(1,1,1));
               }
           }
                modelMapper.map(educationOpt,readAllOutputParticipantDto);
          if (readAllOutputParticipantDto.getEducation().getStartDate()==null){
               readAllOutputParticipantDto.getEducation().setStartDate(LocalDate.of(1,1,1));
           }
          if (readAllOutputParticipantDto.getEducation().getEndDate()==null){
              readAllOutputParticipantDto.getEducation().setEndDate(LocalDate.of(1,1,1));
          }
             modelMapper.map(employmentOpt,readAllOutputParticipantDto);
           if (readAllOutputParticipantDto.getEmployment().getStartDate()==null){
               readAllOutputParticipantDto.getEmployment().setStartDate(LocalDate.of(1,1,1));
           }
           if (readAllOutputParticipantDto.getEmployment().getEndDate()==null){
               readAllOutputParticipantDto.getEmployment().setEndDate(LocalDate.of(1,1,1));
           }
                Type criminalHistoryListType = new TypeToken<CriminalHistory>(){}.getType();
                CriminalHistory criminalHistoryDTOList= modelMapper.map(criminalHistoryOpt.get(), criminalHistoryListType);
                readAllOutputParticipantDto.setCriminalHistory(criminalHistoryDTOList);
                if (readAllOutputParticipantDto.getCriminalHistory().getStartDate()==null){
                    readAllOutputParticipantDto.getCriminalHistory().setStartDate(LocalDate.of(1,1,1));
                }
                if (readAllOutputParticipantDto.getCriminalHistory().getEndDate()==null){
                    readAllOutputParticipantDto.getCriminalHistory().setEndDate(LocalDate.of(1,1,1));
                }
                for (int i=0;readAllOutputParticipantDto.getCriminalHistory().getCriminalHistoryRecordList().size()-1>=i;i++){
                    if (readAllOutputParticipantDto.getCriminalHistory().getCriminalHistoryRecordList().get(i).getArrestDate()==null){
                        readAllOutputParticipantDto.getCriminalHistory().getCriminalHistoryRecordList().get(i).setArrestDate(LocalDate.of(1,1,1));
                    }
                    if (readAllOutputParticipantDto.getCriminalHistory().getCriminalHistoryRecordList().get(i).getStartDate()==null){
                        readAllOutputParticipantDto.getCriminalHistory().getCriminalHistoryRecordList().get(i).setStartDate(LocalDate.of(1,1,1));
                    }
                    if (readAllOutputParticipantDto.getCriminalHistory().getCriminalHistoryRecordList().get(i).getEndDate()==null){
                        readAllOutputParticipantDto.getCriminalHistory().getCriminalHistoryRecordList().get(i).setEndDate(LocalDate.of(1,1,1));
                    }
                }
                Type FamilyPhysicianListType = new TypeToken<List<FamilyPhysician>>(){}.getType();
                List<FamilyPhysician> FamilyPhysicianDTOList = modelMapper.map(participant.getFamilyPhysicianList(), FamilyPhysicianListType);
                readAllOutputParticipantDto.setFamilyPhysicians(FamilyPhysicianDTOList);
                for (int i=0;readAllOutputParticipantDto.getFamilyPhysicians().size()-1>=i;i++){

                    if (readAllOutputParticipantDto.getFamilyPhysicians().get(i).getStartDate()==null) {
                        readAllOutputParticipantDto.getFamilyPhysicians().get(i).setStartDate(LocalDate.of(1, 1, 1));
                    }
                    if (readAllOutputParticipantDto.getFamilyPhysicians().get(i).getEndDate()==null){
                        readAllOutputParticipantDto.getFamilyPhysicians().get(i).setEndDate(LocalDate.of(1,1,1));
                    }
                }
                Type counselorCFSWorkerListType = new TypeToken<List<CounselorCFSWorker>>(){}.getType();
                List<CounselorCFSWorker> counselorCFSWorkerDTOList = modelMapper.map(participant.getCounselorCFSWorkerList(), counselorCFSWorkerListType);
                readAllOutputParticipantDto.setCounselorCFSWorker(counselorCFSWorkerDTOList);
                for (int i=0;readAllOutputParticipantDto.getCounselorCFSWorker().size()-1>=i;i++){
                    if (readAllOutputParticipantDto.getCounselorCFSWorker().get(i).getStartDate()==null) {
                        readAllOutputParticipantDto.getCounselorCFSWorker().get(i).setStartDate(LocalDate.of(1, 1, 1));
                    }
                    if (readAllOutputParticipantDto.getCounselorCFSWorker().get(i).getEndDate()==null){
                        readAllOutputParticipantDto.getCounselorCFSWorker().get(i).setEndDate(LocalDate.of(1,1,1));
                    }
                }
                readAllOutputParticipantDto.setParticipantOtherInfo(participantOtherInformationOpt);
                if (readAllOutputParticipantDto.getParticipantOtherInfo().getStartDate()==null){
                 readAllOutputParticipantDto.getParticipantOtherInfo().setStartDate(LocalDate.of(1,1,1));
             }
             if (readAllOutputParticipantDto.getParticipantOtherInfo().getEndDate()==null){
                 readAllOutputParticipantDto.getParticipantOtherInfo().setEndDate(LocalDate.of(1,1,1));
             }
            } else {
                throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
            }
            return readAllOutputParticipantDto;
        }
        throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
    }

    private Participant readReference(Long referenceId) {
        Participant participant = null;
        Optional<Participant> participantOpt = participantRepository.findByReferenceId(referenceId);
        if (participantOpt.isPresent()) {

            participant = participantOpt.get();
        }
        return participant;
    }
}
