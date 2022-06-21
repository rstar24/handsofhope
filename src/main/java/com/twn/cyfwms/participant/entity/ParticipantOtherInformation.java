package com.twn.cyfwms.participant.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "participantotherinformation")
public class ParticipantOtherInformation implements Serializable {
    @Id @Column(name = "participantotherinfoid", updatable = false, nullable = false)
    @Getter @Setter
    @SequenceGenerator(
            name = "participantOtherInfoIdGenerator",
            sequenceName = "participantOtherInfoIdGenerator",
            allocationSize = 100
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "participantOtherInfoIdGenerator"
    )
    private Long participantOtherInfoId;
    @Getter @Setter @Column(name = "strength")
    private String strength;
    @Getter @Setter @Column(name = "weakness")
    private String weakness;
    @Getter @Setter @Column(name = "skills")
    private String skills;
    @Getter @Setter @Column(name = "experiences")
    private String experiences;
    @Getter @Setter @Column(name = "effectivecopingskills")
    private String effectiveCopingSkills;
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
