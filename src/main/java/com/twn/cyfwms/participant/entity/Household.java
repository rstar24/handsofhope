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
@Table(name = "household")
public class Household implements Serializable {
    @Id @Column(name = "householdid", updatable = false, nullable = false)
    @Getter @Setter
    @SequenceGenerator(
            name = "householdIdGenerator",
            sequenceName = "householdIdGenerator",
            allocationSize = 100
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "householdIdGenerator"
    )
    private Long householdId;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "householdid", referencedColumnName = "householdid")
    @Getter @Setter
    private List<HouseholdMember> householdMemberList;
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
