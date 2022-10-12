package org.cyfwms.caregiver.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "caregivercontactnotes")
public class ContactNotes implements Serializable {
    @Id
    @Getter
    @Setter
    @Column(name = "cgcontactnotesid", updatable = false, nullable = false)
    @SequenceGenerator(
            name = "cgContactNotesIdGenerator",
            sequenceName = "cgContactNotesIdGenerator",
            allocationSize = 100
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "cgContactNotesIdGenerator"
    )
    private Long cgContactNotesId;

    @Getter @Setter @Column(name = "date")
    private LocalDate date;
    @Getter @Setter @Column(name = "time")
    private LocalTime time;
    @Getter @Setter @Column(name = "contactmethod")
    private String contactMethod;
    @Getter @Setter @Column(name = "needsaddressed")
    private String needsAddressed;
    @Getter @Setter @Column(name = "summary")
    private String summary;
    @Getter @Setter @Column(name = "results")
    private String results;
    @Getter @Setter @Column(name = "nextsteps")
    private String nextSteps;
    @Getter @Setter @Column(name = "progresstowardscaseplan")
    private String progressTowardsCP;
    @Getter @Setter @Column(name = "additionalinformation")
    private String additionalInfo;

    @Getter @Setter @Column(name = "status")
    private String status;

    @CreationTimestamp
    @Getter @Setter @Column(name = "creationdate")
    private LocalDate creationDate;

    @UpdateTimestamp
    @Getter @Setter @Column(name = "lastwritten")
    private LocalDateTime lastwritten;

    @Getter @Setter @Column(name = "cgproviderid")
    private Long cgProviderId;
}
