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
import java.util.ArrayList;
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
    private EducationRepository educationRepository;

    @Autowired
    private EmploymentRepository employmentRepository;

    @Autowired
    private CriminalHistoryRepository criminalHistoryRepo;

    @Autowired
    private ParticipantOtherInformationRepository participantOtherInformationRepository;

    @Override
    public ReadAllOutputParticipantDto readAllOutPutParticipant(Long referenceId) {
        if (referenceId != 0) {
            ReadAllOutputParticipantDto readAllOutputParticipantDto = new ReadAllOutputParticipantDto();
            Participant participant = readReference(referenceId);
            if (participant != null) {
                if (!participant.getStatus().equalsIgnoreCase("INACTIVE")) {
                    Long participantId = participant.getParticipantId();
                    modelMapper.map(participant, readAllOutputParticipantDto);
                    ParticipantContact participantContactOpt = participantContactRepository.findByParticipantId(participantId);
                    Education educationOpt = educationRepository.findByParticipantId(participantId);
                    Employment employmentOpt = employmentRepository.findByParticipantId(participantId);
                    Optional<CriminalHistory> criminalHistoryOpt = Optional.ofNullable(criminalHistoryRepo.findByParticipantId(participantId));
                    ParticipantOtherInformation participantOtherInformationOpt = participantOtherInformationRepository.findByParticipantId(participantId);
                    if (!participantContactOpt.getStatus().equalsIgnoreCase("INACTIVE")) {
                        readAllOutputParticipantDto.setParticipantContact(participantContactOpt);
                    }
                    Type householdMemberListType = new TypeToken<List<HouseholdMember>>() {}.getType();
                    List<HouseholdMember> householdMemberRecordList = new ArrayList<>();
                    List<HouseholdMember> householdMemberDTOList = modelMapper.map(participant.getHouseholdMemberList(), householdMemberListType);
                    for (int i = 0; i < householdMemberDTOList.size(); ++i) {
                        if (!participant.getHouseholdMemberList().get(i).getStatus().equalsIgnoreCase("INACTIVE")) {
                            householdMemberRecordList.add(householdMemberDTOList.get(i));
                        }
                    }
                    readAllOutputParticipantDto.setHouseholdMember(householdMemberRecordList);
                    for (int i = 0; i < readAllOutputParticipantDto.getHouseholdMember().size(); i++) {
                        if (readAllOutputParticipantDto.getHouseholdMember().get(i).getDateOfBirth() == null) {
                            readAllOutputParticipantDto.getHouseholdMember().get(i).setDateOfBirth(LocalDate.of(0, 0, 0));
                        }
                    }
                    modelMapper.map(educationOpt, readAllOutputParticipantDto);
                    modelMapper.map(employmentOpt, readAllOutputParticipantDto);
                    List<CriminalHistoryRecord> criminalHistoryRecordList = new ArrayList<>();
                    for (int i = 0; i < criminalHistoryOpt.get().getCriminalHistoryRecordList().size(); ++i) {
                        if (!criminalHistoryOpt.get().getCriminalHistoryRecordList().get(i).getStatus().equalsIgnoreCase("INACTIVE")) {
                            criminalHistoryRecordList.add(criminalHistoryOpt.get().getCriminalHistoryRecordList().get(i));
                        }
                    }
                    criminalHistoryOpt.get().setCriminalHistoryRecordList(criminalHistoryRecordList);
                    modelMapper.map(criminalHistoryOpt.get(),readAllOutputParticipantDto);
                    for (int i = 0; i < readAllOutputParticipantDto.getCriminalHistory().getCriminalHistoryRecordList().size(); ++i) {
                        if (readAllOutputParticipantDto.getCriminalHistory().getCriminalHistoryRecordList().get(i).getArrestDate() == null) {
                            readAllOutputParticipantDto.getCriminalHistory().getCriminalHistoryRecordList().get(i).setArrestDate(LocalDate.of(1, 1, 1));
                        }
                    }
                    Type FamilyPhysicianListType = new TypeToken<List<FamilyPhysician>>() {}.getType();
                    List<FamilyPhysician> familyPhysicianRecordList = new ArrayList<>();
                    List<FamilyPhysician> FamilyPhysicianDTOList = modelMapper.map(participant.getFamilyPhysicianList(), FamilyPhysicianListType);
                    for (int i = 0; i < FamilyPhysicianDTOList.size(); ++i) {
                        if (!participant.getFamilyPhysicianList().get(i).getStatus().equalsIgnoreCase("INACTIVE")) {
                            familyPhysicianRecordList.add(FamilyPhysicianDTOList.get(i));
                        }
                    }
                    readAllOutputParticipantDto.setFamilyPhysicians(familyPhysicianRecordList);
                    Type counselorCFSWorkerListType = new TypeToken<List<CounselorCFSWorker>>() {}.getType();
                    List<CounselorCFSWorker> counselorCFSWorkerRecordList = new ArrayList<>();
                    List<CounselorCFSWorker> counselorCFSWorkerDTOList = modelMapper.map(participant.getCounselorCFSWorkerList(), counselorCFSWorkerListType);
                    for (int i = 0; i < counselorCFSWorkerDTOList.size(); ++i) {
                        if (!participant.getCounselorCFSWorkerList().get(i).getStatus().equalsIgnoreCase("INACTIVE")) {
                            counselorCFSWorkerRecordList.add(counselorCFSWorkerDTOList.get(i));
                        }
                    }
                    readAllOutputParticipantDto.setCounselorCFSWorker(counselorCFSWorkerRecordList);
                    for (int i = 0; i < readAllOutputParticipantDto.getCounselorCFSWorker().size(); ++i) {
                        if (readAllOutputParticipantDto.getCounselorCFSWorker().get(i).getStartDate() == null) {
                            readAllOutputParticipantDto.getCounselorCFSWorker().get(i).setStartDate(LocalDate.of(1, 1, 1));
                        }
                        if (readAllOutputParticipantDto.getCounselorCFSWorker().get(i).getEndDate() == null) {
                            readAllOutputParticipantDto.getCounselorCFSWorker().get(i).setEndDate(LocalDate.of(1, 1, 1));
                        }
                    }
                    readAllOutputParticipantDto.setParticipantOtherInfo(participantOtherInformationOpt);
                }
                else{
                    throw new ResponseStatusException(NOT_FOUND, "Unable to find resource");
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
