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
@Table(name = "counselorcfsworker")
public class CounselorCFSWorker implements Serializable {
    @Id @Column(name = "counselorcfsworkerid", updatable = false, nullable = false)
    @Getter @Setter
    @SequenceGenerator(
            name = "counselorIdGenerator",
            sequenceName = "counselorIdGenerator",
            allocationSize = 100
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "counselorIdGenerator"
    )
    private Long counselorCFSWorkerId;
    @Column(name = "role", nullable = false)
    @Getter @Setter
    private String role;
    @Column(name = "name", nullable = false)
    @Getter @Setter
    private String name;
    @Column(name = "contactinformation", nullable = false)
    @Getter @Setter
    private String contactInformation;
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
