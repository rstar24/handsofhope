package com.twn.cyfwms.initialContact.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "patientcareinfooutpatient")
public class PatientCareInfoOutpatient {
    @Id
    @Getter
    @Setter
    @Column(name = "outpatientid", updatable = false, nullable = false)
    @SequenceGenerator(
            name = "outpatientidgenerator",
            sequenceName = "outpatientidgenerator",
            allocationSize = 100
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "outpatientidgenerator"
    )
    private Long outpatientId;

    @Getter @Setter @Column(name = "therapyorcounseling")
    private String therapyOrCounseling;

    @Getter @Setter @Column(name = "therapytimeperiod")
    private String therapyTimePeriod;

    @Getter @Setter @Column(name = "therapylocation")
    private String therapyLocation;

    @Getter @Setter @Column(name = "reasonfortherapy")
    private String reasonForTherapy;

    @Getter @Setter @Column(name = "selfhelpgroup")
    private String selfHelpGroup;

    @Getter @Setter @Column(name = "selfhelpgroupperiod")
    private String selfHelpGroupPeriod;

    @Getter @Setter @Column(name = "selfhelpgrouplocation")
    private String selfHelpGroupLocation;

   @Getter @Setter @Column(name = "patientcareinfoid")
    private Long patientCareInfoId;

    @CreationTimestamp
    @Getter @Setter @Column(name = "creationdate")
    private LocalDate creationDate;

    @UpdateTimestamp
    @Getter @Setter @Column(name = "lastwritten")
    private LocalDateTime lastwritten;
}
