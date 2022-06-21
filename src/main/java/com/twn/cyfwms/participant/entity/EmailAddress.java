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
@Table(name = "emailaddress")
public class EmailAddress implements Serializable {
    @Id
    @Column(name = "emailAddressid", updatable = false, nullable = false)
    @Getter @Setter
    @SequenceGenerator(
            name = "emailAddressIdGenerator",
            sequenceName = "emailAddressIdGenerator",
            allocationSize = 100
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "emailAddressIdGenerator"
    )
    private Long emailAddressId;
    @Getter @Setter @Column(name = "type")
    private String type;
    @Getter @Setter @Column(name = "status")
    private String status;
    @Getter @Setter @Column(name = "emailaddress")
    private String emailAddress;
    @Getter @Setter @Column(name = "creationdate")
    private LocalDate creationDate;
    @Getter @Setter @Column(name = "startate")
    private LocalDate startDate;
    @Getter @Setter @Column(name = "enddate")
    private LocalDate endDate;
    @Getter @Setter @Column(name = "lastwritten")
    private LocalDateTime lastwritten;
}
