package org.cyfwms.caregiver.entity;
import lombok.*;
import org.cyfwms.common.entity.Appointments;
import org.cyfwms.culturalprogram.entity.AttachmentEntity;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "caregiverprovider")
public class CareProvider implements Serializable {
    @Id
    @Getter
    @Setter
    @Column(name = "cgproviderid", updatable = false, nullable = false)
    @SequenceGenerator(
            name = "cGProviderIdGenerator",
            sequenceName = "cGProviderIdGenerator",
            allocationSize = 100
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "cGProviderIdGenerator"
    )
    private Long cgProviderId;

    @Getter @Setter @Column(name = "name")
    private String name;
    @Getter @Setter @Column(name = "status")
    private String status;
    @Getter @Setter @Column(name = "type")
    private String type;
    @Getter @Setter @Column(name = "other_type")
    private String otherType;
    @Getter @Setter @Column(name = "address")
    private String address;
    @Getter @Setter @Column(name = "city")
    private String city;
    @Getter @Setter @Column(name = "postalcode")
    private String postalCode;
    @Getter @Setter @Column(name = "province")
    private String province;
    @Getter @Setter @Column(name = "phonenumber")
    private String phoneNumber;
    @Getter @Setter @Column(name = "email")
    private String email;
    @Getter @Setter @Column(name = "primarycaregiver")
    private String priCaregiver;
    @Getter @Setter @Column(name = "secondarycaregiver")
    private String secCaregiver;
    @Getter @Setter @Column(name = "referenceid", updatable = false, nullable = false, unique = true)
    private Long referenceId;
    @Getter @Setter @Column(name = "statusofdeletion")
    private String statusOfDeletion;
    @CreationTimestamp
    @Getter @Setter @Column(name = "creationdate")
    private LocalDate creationDate;
    @UpdateTimestamp
    @Getter @Setter @Column(name = "lastwritten")
    private LocalDateTime lastwritten;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "cgproviderid", referencedColumnName = "cgproviderid")
    @Getter @Setter
    private Capacity Capacity;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cgproviderid", referencedColumnName = "cgproviderid")
    @Getter @Setter

    private ContactNotes ContactNotesList;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "cgproviderid", referencedColumnName = "cgproviderid")
    @Getter @Setter
    private List<CGAttachmentEntity> cgAttachmentEntities;

}
