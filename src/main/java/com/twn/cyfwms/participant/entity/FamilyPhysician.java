package com.twn.cyfwms.participant.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "familyphysician")
public class FamilyPhysician implements Serializable {
    @Id @Column(name = "familyphysicianid", updatable = false, nullable = false)
    @Getter @Setter
    private Long familyPhysicianId;

    @Getter @Setter @Column(name = "name")
    private String name;
    @Getter @Setter @Column(name = "phone")
    private String phone;
    @Getter @Setter @Column(name = "cell")
    private String cell;
    @Getter @Setter @Column(name = "listofmedication")
    private String listOfMedication;
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
}
