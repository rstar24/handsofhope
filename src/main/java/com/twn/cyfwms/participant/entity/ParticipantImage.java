package com.twn.cyfwms.participant.entity;


import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
@Table(name="participantimage")
@AllArgsConstructor
@NoArgsConstructor

public class ParticipantImage {
    @Id
    @Column(name="participantimageid", nullable = false )
    @Getter@Setter
    @SequenceGenerator(
            name = "participantimageIdGenerator",
            sequenceName = "participantimageIdGenerator",
            allocationSize = 100
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "participantimageIdGenerator"
    )
    private Long participantimageId;


    @Getter @Setter @Column(name="participantImageName")
    private String participantImageName;

    @Lob
    @Getter @Setter @Column(name="image")
    private byte[] image;

    @UpdateTimestamp
    @Getter @Setter @Column(name="uplodedDateTime")
    private LocalDateTime uplodedDateTime;

    @Getter @Setter @Column(name = "type")
    private String participantImageType;

    @Getter @Setter @Column(name = "participantid")
    private Long participantId;


}
