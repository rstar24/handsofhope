package com.twn.cyfwms.initialContact.entity;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.stream.DoubleStream;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "initialcontactfiledetails")
public class InitialContactFileDetails implements Serializable {
    @Id
    @Getter
    @Setter
    @Column(name = "filedetailsid", updatable = false, nullable = false)
    @SequenceGenerator(
            name = "filedetailsidgenerator",
            sequenceName = "filedetailsidgenerator",
            allocationSize = 100
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "filedetailsidgenerator"
    )
    private Long fileDetailsId;

    @Getter @Setter @Column(name = "clientname")
    private String clientName;

    @Getter @Setter @Column(name = "caseworker")
    private String caseworker;

    @Getter @Setter @Column(name = "fileNumber")
    private Long fileNumber;

    @Getter @Setter @Column(name = "startingdate")
    private LocalDate startingDate;

    @Getter @Setter @Column(name = "dateclosed")
    private LocalDate dateClosed;

    @Getter @Setter @Column(name = "status")
    private String status;

    @CreationTimestamp
    @Getter @Setter @Column(name = "creationdate")
    private LocalDateTime creationDateTime;

    @UpdateTimestamp
    @Getter @Setter @Column(name = "lastwritten")
    private LocalDateTime lastwritten;

//    @Id
    @Getter @Setter @Column(name = "initialcontactreferenceid")
    private Long initialcontactReferenceId;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "filedetailsid", referencedColumnName = "filedetailsid")
    @Getter @Setter
    private InitialContactIncidentReport incidentReport;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "filedetailsid", referencedColumnName = "filedetailsid")
    @Getter @Setter
    private InitialContactPatientCareInfo patientCareInfo;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "filedetailsid", referencedColumnName = "filedetailsid")
    @Getter @Setter
    private InitialContactPresentConcerns presentConcerns;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "filedetailsid", referencedColumnName = "filedetailsid")
    @Getter @Setter
    private InitialContactReferralInfo referralInfo;


}
