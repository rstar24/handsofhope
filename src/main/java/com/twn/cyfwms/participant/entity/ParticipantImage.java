package com.twn.cyfwms.participant.entity;


import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

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


    @Getter @Setter @Column(name="name")
    private String name;

    @Lob
    @Getter @Setter @Column(name="image")
    private byte[] image;

    @CreationTimestamp
    @Getter @Setter @Column(name="uplodedDateTime")
    private LocalDateTime uplodedDateTime;

    @Getter @Setter @Column(name = "type")
    private String type;

    @Getter @Setter @Column(name = "participantid")
    private Long participantId;


}
