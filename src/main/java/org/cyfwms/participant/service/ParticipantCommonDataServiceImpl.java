package org.cyfwms.participant.service;

import com.google.common.reflect.TypeToken;
import org.cyfwms.participant.dto.ParticipantCommonDataDto;
import org.cyfwms.participant.entity.*;
import org.cyfwms.participant.repository.*;
import org.cyfwms.participant.repository.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.lang.reflect.Type;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class ParticipantCommonDataServiceImpl implements ParticipantCommonDataService {
    @Autowired
    private ParticipantRepository participantRepo;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    private ParticipantContactRepository participantContactRepo;

    @Autowired
    private EducationRepository educationRepo;

    @Autowired
    private EmploymentRepository employmentRepo;

    @Autowired
    private CriminalHistoryRepository criminalHistoryRepo;

    @Autowired
    private HouseholdMemberRepository hhMemberRepo;

    @Autowired
    private ParticipantOtherInformationRepository participantOtherInformationRepo;

    @Override
    public ParticipantCommonDataDto readParticipantCommonData(Long referenceId) {
        ParticipantCommonDataDto participantCommonDataDto = new ParticipantCommonDataDto();
        if (referenceId != 0) {
            Participant participant = readReference(referenceId);
            if (participant != null) {
                System.out.println(participant.getParticipantId());
                /*if (!participant.getStatus().equalsIgnoreCase("INACTIVE")) {
                    Long participantId = participant.getParticipantId();
                    modelMapper.map(participant, participantCommonDataDto);

                    //Participant Contact
                    Optional<ParticipantContact> pContactOtp =
                            Optional.ofNullable(participantContactRepo.findByParticipantId(participantId));
                    if (pContactOtp.isPresent()) {
                        if (!pContactOtp.get().getStatus().equalsIgnoreCase("INACTIVE")) {
                            participantCommonDataDto.setParticipantContact(pContactOtp.get());
                        }
                    }

                    //Education
                    Optional<Education> educationOpt = Optional.ofNullable(educationRepo.findByParticipantId(participantId));
                    if (educationOpt.isPresent()) {
                        modelMapper.map(educationOpt.get(), participantCommonDataDto);
                    }

                    //Employment
                    Optional<Employment> employmentOpt = Optional.ofNullable(employmentRepo.findByParticipantId(participantId));
                    if (employmentOpt.isPresent()) {
                        modelMapper.map(employmentOpt.get(), participantCommonDataDto);
                    }

                    //Criminal History
                    Optional<CriminalHistory> criminalHistoryOpt = Optional.ofNullable(criminalHistoryRepo.findByParticipantId(participantId));
                    if (criminalHistoryOpt.isPresent()) {
                        CriminalHistory criminalHistory = criminalHistoryOpt.get();
                        List<CriminalHistoryRecord> criminalHistoryRecordList =
                                criminalHistory
                                        .getCriminalHistoryRecordList()
                                        .stream()
                                        .filter(chRecord ->
                                                chRecord.getStatus().equalsIgnoreCase("INACTIVE")
                                        )
                                        .map(cHistoryRecord -> {
                                            if (cHistoryRecord.getArrestDate() == null) {
                                                cHistoryRecord.setArrestDate(LocalDate.of(1, 1, 1));
                                            }
                                            return cHistoryRecord;
                                        })
                                        .collect(Collectors.toList());
                        criminalHistory.setCriminalHistoryRecordList(criminalHistoryRecordList);
                        modelMapper.map(criminalHistory, participantCommonDataDto);
                    }

                    //HouseholdMember
                    List<HouseholdMember> householdMemberList =
                            hhMemberRepo.findByParticipantId(participantId);
                            .stream()

                    //ParticipantOtherInformation participantOtherInformationOpt = participantOtherInformationRepo.findByParticipantId(participantId);

                    Type householdMemberListType = new TypeToken<List<HouseholdMember>>() {
                    }.getType();
                    List<HouseholdMember> householdMemberRecordList = new ArrayList<>();
                    List<HouseholdMember> householdMemberDTOList = modelMapper.map(participant.getHouseholdMemberList(), householdMemberListType);
                    for (int i = 0; i < householdMemberDTOList.size(); ++i) {
                        if (!participant.getHouseholdMemberList().get(i).getStatus().equalsIgnoreCase("INACTIVE")) {
                            householdMemberRecordList.add(householdMemberDTOList.get(i));
                        }
                    }
                    participantCommonDataDto.setHouseholdMember(householdMemberRecordList);
                    for (int i = 0; i < participantCommonDataDto.getHouseholdMember().size(); i++) {
                        if (participantCommonDataDto.getHouseholdMember().get(i).getDateOfBirth() == null) {
                            participantCommonDataDto.getHouseholdMember().get(i).setDateOfBirth(LocalDate.of(0, 0, 0));
                        }
                    }

                    Type FamilyPhysicianListType = new TypeToken<List<FamilyPhysician>>() {
                    }.getType();
                    List<FamilyPhysician> familyPhysicianRecordList = new ArrayList<>();
                    List<FamilyPhysician> FamilyPhysicianDTOList = modelMapper.map(participant.getFamilyPhysicianList(), FamilyPhysicianListType);
                    for (int i = 0; i < FamilyPhysicianDTOList.size(); ++i) {
                        if (!participant.getFamilyPhysicianList().get(i).getStatus().equalsIgnoreCase("INACTIVE")) {
                            familyPhysicianRecordList.add(FamilyPhysicianDTOList.get(i));
                        }
                    }
                    participantCommonDataDto.setFamilyPhysicians(familyPhysicianRecordList);
                    Type counselorCFSWorkerListType = new TypeToken<List<CounselorCFSWorker>>() {
                    }.getType();
                    List<CounselorCFSWorker> counselorCFSWorkerRecordList = new ArrayList<>();
                    List<CounselorCFSWorker> counselorCFSWorkerDTOList = modelMapper.map(participant.getCounselorCFSWorkerList(), counselorCFSWorkerListType);
                    for (int i = 0; i < counselorCFSWorkerDTOList.size(); ++i) {
                        if (!participant.getCounselorCFSWorkerList().get(i).getStatus().equalsIgnoreCase("INACTIVE")) {
                            counselorCFSWorkerRecordList.add(counselorCFSWorkerDTOList.get(i));
                        }
                    }
                    participantCommonDataDto.setCounselorCFSWorker(counselorCFSWorkerRecordList);
                    for (int i = 0; i < participantCommonDataDto.getCounselorCFSWorker().size(); ++i) {
                        if (participantCommonDataDto.getCounselorCFSWorker().get(i).getStartDate() == null) {
                            participantCommonDataDto.getCounselorCFSWorker().get(i).setStartDate(LocalDate.of(1, 1, 1));
                        }
                        if (participantCommonDataDto.getCounselorCFSWorker().get(i).getEndDate() == null) {
                            participantCommonDataDto.getCounselorCFSWorker().get(i).setEndDate(LocalDate.of(1, 1, 1));
                        }
                    }
                    participantCommonDataDto.setParticipantOtherInfo(participantOtherInformationOpt);
                }*/
            }
        }
        return participantCommonDataDto;
    }
    private Participant readReference(Long referenceId) {
        Participant participant = null;
        Optional<Participant> participantOpt = participantRepo.findByReferenceId(referenceId);
        if (participantOpt.isPresent()) {
            participant = participantOpt.get();
        }
        return participant;
    }
}
