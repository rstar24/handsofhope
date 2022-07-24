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
@Table(name = "patientcareinfoinpatient")
public class PatientCareInfoInpatient {
    @Id
    @Getter
    @Setter
    @Column(name = "inpatientid", updatable = false, nullable = false)
    @SequenceGenerator(
            name = "inpatientidgenerator",
            sequenceName = "inpatientidgenerator",
            allocationSize = 100
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "inpatientidgenerator"
    )
    private Long inpatientId;

    @Getter @Setter @Column(name = "hospitalizationrecord")
    private String hospitalizationRecord;

    @Getter @Setter @Column(name = "hospitalizationreasons")
    private String hospitalizationReasons;

    @Getter @Setter @Column(name = "patientcareinfoid")
    private Long patientCareInfoId;

    @CreationTimestamp
    @Getter @Setter @Column(name = "creationdate")
    private LocalDate creationDate;

    @UpdateTimestamp
    private LocalDateTime lastwritten;
}
