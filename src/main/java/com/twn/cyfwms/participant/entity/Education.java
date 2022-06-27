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
@Table(name = "education")
public class Education implements Serializable {
    @Id @Column(name = "educationid", nullable = false)
    @Getter @Setter
    @SequenceGenerator(
            name = "educationIdGenerator",
            sequenceName = "educationIdGenerator",
            allocationSize = 100
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "educationIdGenerator"
    )
    private Long educationId;
    @Getter @Setter @Column(name = "attendingschool")
    private String attendingSchool;
    @Getter @Setter @Column(name = "school")
    private String school;
    @Getter @Setter @Column(name = "grade")
    private String grade;
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
