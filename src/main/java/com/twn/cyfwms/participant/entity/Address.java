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
@Table(name = "address")
public class Address implements Serializable {

    @Id @Getter @Setter
    @Column(name = "addressid", updatable = false, nullable = false)
    @SequenceGenerator(
            name = "addressIdGenerator",
            sequenceName = "addressIdGenerator",
            allocationSize = 100
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "addressIdGenerator"
    )
    private Long addressId;
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
    @Getter @Setter @Column(name = "type")
    private String type;
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
    @Getter @Setter @Column(name = "isprimary")
    private boolean isPrimary;
    @Getter @Setter @Column(name = "participantid")
    private Long participantId;
}
