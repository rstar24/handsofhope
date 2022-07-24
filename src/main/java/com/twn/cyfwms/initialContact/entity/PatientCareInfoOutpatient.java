package com.twn.cyfwms.initialContact.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@AllArgsConstructor
@Entity
@Data
@NoArgsConstructor
@Table(name = "patientcareinfooutpatient")
public class PatientCareInfoOutpatient {
    @Column(name = "therapyorcounseling")
    @Getter
    @Setter
    private String therapyOrCounseling;

    @Column(name = "therapytimeperiod")
    @Getter
    @Setter
    private String therapyTimePeriod;

    @Column(name = "therapylocation")
    @Getter
    @Setter
    private String therapyLocation;

    @Column(name = "reasonfortherapy")
    @Getter
    @Setter
    private String reasonForTherapy;

    @Column(name = "selfhelpgroup")
    @Getter
    @Setter
    private String selfHelpGroup;

    @Column(name = "selfhelpgroupperiod")
    @Getter
    @Setter
    private String selfHelpGroupPeriod;

    @Column(name = "selfhelpgrouplocation")
    @Getter
    @Setter
    private String selfHelpGroupLocation;

    @Column(name = "outpatientid", updatable = false, nullable = false)
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "outpatientidgenerator"
    )
    @Getter
    @Id
    @SequenceGenerator(
            name = "outpatientidgenerator",
            sequenceName = "outpatientidgenerator",
            allocationSize = 100
    )
    @Setter
    private Long outpatientId;

    @Column(name = "patientcareinfoid")
    @Getter
    @Setter
    private Long patientCareInfoId;

    @Column(name = "creationdate")
    @CreationTimestamp
    @Getter
    @Setter
    private LocalDate creationDate;

    @Column(name = "lastwritten")
    @Getter
    @Setter
    @UpdateTimestamp
    private LocalDateTime lastwritten;
}
