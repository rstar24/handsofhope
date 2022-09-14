package com.twn.cyfwms.CulturalProgram.entity;

import com.twn.cyfwms.participant.entity.ParticipantImage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="culturalimage")
@AllArgsConstructor
@NoArgsConstructor
public class CulturalProgImage {
    @Id
    @Column(name="culturalprogimageid", nullable = false )
    @Getter
    @Setter
    @SequenceGenerator(
            name = "culturalprogimageIdGenerator",
            sequenceName = "culturalprogimageIdGenerator",
            allocationSize = 100
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "culturalprogimageIdGenerator"
    )
    private Long culturalProgImageId;


    @Getter @Setter @Column(name="name")
    private String name;

    @Lob
    @Getter @Setter @Column(name="culturamimagefile")
    private byte[] culturamImagefile;

    @CreationTimestamp
    @Getter @Setter @Column(name="uplodedDateTime")
    private LocalDateTime uplodedDateTime;

    @Getter @Setter @Column(name = "type")
    private String type;

    @Getter @Setter @Column(name = "culturalprogramid")
    private Long culturalProgramId;

    @Getter @Setter @Column(name = "culturamimagetype")
    private String culturalImageType;
}
