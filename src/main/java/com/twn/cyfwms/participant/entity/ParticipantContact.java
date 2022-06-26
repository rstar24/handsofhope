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
@Table(name = "participantcontact")
public class ParticipantContact implements Serializable {

    @Id @Getter @Setter
    @Column(name = "participantcontactid", updatable = false, nullable = false)
    @SequenceGenerator(
            name = "participantContactIdGenerator",
            sequenceName = "participantContactIdGenerator",
            allocationSize = 100
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "participantContactIdGenerator"
    )
    private Long participantContactId;
    @Getter @Setter @Column(name = "addressline1")
    private String addressLine1;
    @Getter @Setter @Column(name = "addressline2")
    private String addressLine2;
    @Getter @Setter @Column(name = "city")
    private String city;
    @Getter @Setter @Column(name = "province")
    private String province;
    @Getter @Setter @Column(name = "postalcode")
    private String postalCode;
    @Getter @Setter @Column(name = "homephone")
    private String homePhone;
    @Getter @Setter @Column(name = "workhhone")
    private String workPhone;
    @Getter @Setter @Column(name = "cellphone")
    private String cellPhone;
    @Getter @Setter @Column(name = "emailaddress")
    private String emailAddress;
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
    @Getter @Setter @Column(name = "participantid")
    private Long participantId;
}
