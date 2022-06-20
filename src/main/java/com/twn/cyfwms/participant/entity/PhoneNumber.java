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
@Table(name = "phonenumber")
public class PhoneNumber implements Serializable {
    @Id
    @Column(name = "phonenumberid", updatable = false, nullable = false)
    @Getter @Setter
    @SequenceGenerator(
            name = "phoneNumberIdGenerator",
            sequenceName = "phoneNumberIdGenerator",
            allocationSize = 100
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "phoneNumberIdGenerator"
    )
    private Long phoneNumberId;
    @Getter @Setter @Column(name = "type")
    private String type;
    @Getter @Setter @Column(name = "status")
    private String status;
    @Getter @Setter @Column(name = "phonenumber")
    private String phoneNumber;
    @Getter @Setter @Column(name = "creationdate")
    private LocalDate creationDate;
    @Getter @Setter @Column(name = "startate")
    private LocalDate startDate;
    @Getter @Setter @Column(name = "enddate")
    private LocalDate endDate;
    @Getter @Setter @Column(name = "lastwritten")
    private LocalDateTime lastwritten;
}
