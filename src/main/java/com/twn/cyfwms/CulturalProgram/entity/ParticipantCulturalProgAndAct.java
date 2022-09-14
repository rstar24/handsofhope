package com.twn.cyfwms.CulturalProgram.entity;
import lombok.*;
import javax.persistence.*;
import java.io.Serializable;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "participantculturalprogram")
public class ParticipantCulturalProgAndAct implements Serializable {
    @Id
    @Getter
    @Setter
    @Column(name = "participantculturalprogid", updatable = false, nullable = false)
    @SequenceGenerator(
            name = "participantculturalprogidgenerator",
            sequenceName = "participantculturalprogidgenerator",
            allocationSize = 100
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "participantculturalprogidgenerator"
    )
   private Long participantCulturalProId;
    @Getter @Setter @Column(name = "role")
    private String role ;
    @Getter @Setter @Column(name = "notes",length = 1000)
    private String notes;
    @Getter @Setter @Column(name = "status")
    private String status;
    @Getter @Setter @Column(name = "participantid")
    private String  participant;
    @Getter @Setter @Column(name = "culturalprogramid")
    private Long culturalProgramId;
}
