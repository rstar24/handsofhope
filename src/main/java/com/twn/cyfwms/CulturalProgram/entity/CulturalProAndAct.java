package com.twn.cyfwms.CulturalProgram.entity;

import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "culturalproandact")
public class CulturalProAndAct implements Serializable {

    @Id
    @Getter
    @Setter
    @Column(name = "culturalprogramid", updatable = false, nullable = false)
    @SequenceGenerator(
            name = "CulturalProgramIdGenerator",
            sequenceName = "CulturalProgramIdGenerator",
            allocationSize = 100
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "CulturalProgramIdGenerator"
    )
    private Long CulturalProgramId;
    @Getter @Setter @Column(name = "referenceid", updatable = false, nullable = false)
    private Long referenceId;
    @Getter @Setter @Column(name = "name")
    private String name;
    @Getter @Setter @Column(name = "type")
    private String type;
    @Getter @Setter @Column(name = "status")
    private String  status;
    @Getter @Setter @Column(name = "caseworker")
    private String     caseworker;
    @Getter @Setter @Column(name = "startDate")
    private LocalDate   startDate;
    @Getter @Setter @Column(name = "endDate")
    private LocalDate   endDate;
    @Getter @Setter @Column(name = "totalCost")
    private String totalCost;
    @Getter @Setter @Column(name = "totalParticipation")
    private String totalParticipation;
    @Getter @Setter @Column(name = "sessionDetails")
    private String sessionDetails;
    @Getter @Setter @Column(name = "costOrParticipationDetails")
    private String costOrParticipationDetails;
    @Getter @Setter @Column(name = "outcomes")
    private String outcomes;
    @Getter @Setter @Column(name = "notes")
    private String notes;
    @Getter @Setter @Column(name = "deletionofstatus")
    private String deletionOfStatus;
    @Getter @Setter @Column(name = "creationdate")
    private LocalDate creationDate;
    @UpdateTimestamp
    @Getter @Setter @Column(name = "lastwritten")
    private LocalDateTime lastWritten;

}
