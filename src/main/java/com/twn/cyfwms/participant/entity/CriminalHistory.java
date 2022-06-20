package com.twn.cyfwms.participant.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "criminalhistory")
public class CriminalHistory implements Serializable {
    @Id @Column(name = "criminalhistoryid", updatable = false, nullable = false)
    @Getter @Setter
    @SequenceGenerator(
            name = "criminalHistoryIdGenerator",
            sequenceName = "criminalHistoryIdGenerator",
            allocationSize = 100
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "criminalHistoryIdGenerator"
    )
    private Long criminalHistoryId;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "criminalhistoryid", referencedColumnName = "criminalhistoryid")
    @Getter @Setter
    private List<CriminalHistoryRecord> criminalHistoryRecordList;
    @Getter @Setter @Column(name = "probation")
    private boolean probation;
    @Getter @Setter @Column(name = "parole")
    private boolean parole;
    @Getter @Setter @Column(name = "conditions")
    private String conditions;
    @Getter @Setter @Column(name = "courtworkerandcontactinfo")
    private String courtWorkerAndContactInfo;
    @Getter @Setter @Column(name = "status")
    private String status;
    @Getter @Setter @Column(name = "creationdate")
    private LocalDate creationDate;
    @Getter @Setter @Column(name = "startate")
    private LocalDate startDate;
    @Getter @Setter @Column(name = "enddate")
    private LocalDate endDate;
    @Getter @Setter @Column(name = "lastwritten")
    private LocalDateTime lastwritten;
}
