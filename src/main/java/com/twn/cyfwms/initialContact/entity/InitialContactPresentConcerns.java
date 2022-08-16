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
@Table(name = "initialcontactpresentconcerns")
public class InitialContactPresentConcerns implements Serializable {
    @Id
    @Getter
    @Setter
    @Column(name = "presentconcernsid", updatable = false, nullable = false)
    @SequenceGenerator(
            name = "presentconcernsidgenerator",
            sequenceName = "presentconcernsidgenerator",
            allocationSize = 100
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "presentconcernsidgenerator"
    )
    private Long presentConcernsId;

    @Getter @Setter @Column(name = "selectpresentconcerns")
    private String selectPresentConcerns;

    @Getter @Setter @Column(length = 1000,name = "situation")
    private String situation;

    @Getter @Setter @Column(name = "substanceabuse")
    private String substanceAbuse;

    @Getter @Setter @Column(length = 1000,name = "explainmentalhealth")
    private String explainMentalHealth;

    @CreationTimestamp
    @Getter @Setter @Column(name = "creationdate")
    private LocalDate creationDate;

    @UpdateTimestamp
    @Getter @Setter @Column(name = "lastwritten")
    private LocalDateTime lastWritten;

    @Getter @Setter @Column(name = "filedetailsid")
    private Long fileDetailsId;


}
