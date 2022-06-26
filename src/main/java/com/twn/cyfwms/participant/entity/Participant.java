package com.twn.cyfwms.participant.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Participant")
public class Participant implements Serializable {
    @Id @Getter @Setter
    @Column(name = "participantid", updatable = false, nullable = false)
    @SequenceGenerator(
            name = "participantIdGenerator",
            sequenceName = "participantIdGenerator",
            allocationSize = 100
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "participantIdGenerator"
    )
    private Long participantId;

    @Getter @Setter @Column(name = "firstname")
    private String firstname;
    @Getter @Setter @Column(name = "surname")
    private String surname;
    @Getter @Setter @Column(name = "middlename")
    private String middleName;
    @Getter @Setter @Column(name = "dateofbirth")
    private LocalDate dateOfBirth;
    @Getter @Setter @Column(name = "gender")
    private String gender;
    @Getter @Setter @Column(name = "maritalstatus")
    private String maritalStatus;
    @Getter @Setter @Column(name = "type")
    private String type;
    @Getter @Setter @Column(name = "status")
    private String status;
    @Getter @Setter @Column(name = "creationdate")
    private LocalDate creationDate;
    @Getter @Setter @Column(name = "lastwritten")
    private LocalDateTime lastwritten;
    @Getter @Setter @Column(name = "isprimary")
    private boolean isPrimary;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "participantid", referencedColumnName = "participantid")
    @Getter @Setter
    private ParticipantContact participantContact;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "participantid", referencedColumnName = "participantid")
    @Getter @Setter
    private List<HouseholdMember> householdMemberList;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "participantid", referencedColumnName = "participantid")
    @Getter @Setter
    private List<CounselorCFSWorker> counselorCFSWorkerList;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "participantid", referencedColumnName = "participantid")
    @Getter @Setter
    private List<CriminalHistory> criminalHistoryList;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "participantid", referencedColumnName = "participantid")
    @Getter @Setter
    private List<Education> educationList;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "participantid", referencedColumnName = "participantid")
    @Getter @Setter
    private List<Employment> employmentList;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "participantid", referencedColumnName = "participantid")
    @Getter @Setter
    private List<FamilyPhysician> familyPhysicianList;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "participantid", referencedColumnName = "participantid")
    @Getter @Setter
    private List<ParticipantOtherInformation> participantOtherInfoList;

}
