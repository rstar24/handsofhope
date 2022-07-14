package com.twn.cyfwms.initialContact.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "initialcontactpatientcareinfo")
public class InitialContactPatientCareInfo implements Serializable {
    @Id
    @Getter
    @Setter
    @Column(name = "patientcareinfoid", updatable = false, nullable = false)
    @SequenceGenerator(
            name = "patientcareinfoidgenerator",
            sequenceName = "patientcareinfoidgenerator",
            allocationSize = 100
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "patientcareinfoidgenerator"
    )
    private Long patientCareInfoId;

    @Getter @Setter @Column(name = "typeofpatient")
    private String typeOfPatient;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "patientcareinfoid", referencedColumnName = "patientcareinfoid")
    @Getter @Setter
    private PatientCareInfoOutpatient outpatient;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "patientcareinfoid", referencedColumnName = "patientcareinfoid")
    @Getter @Setter
    private PatientCareInfoInpatient inpatient;

    @CreationTimestamp
    @Getter @Setter @Column(name = "creationdate")
    private LocalDate creationDate;

    @UpdateTimestamp
    @Getter @Setter @Column(name = "lastwritten")
    private LocalDateTime lastwritten;

    @Getter @Setter @Column(name = "filedetailsid")
    private Long fileDetailsId;
}
