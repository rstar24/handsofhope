package org.cyfwms.caregiver.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name="cg_attachments")
public class CGAttachmentEntity {
    @Id
    @Column(name="cgimageid", nullable=false)
    @SequenceGenerator(name="cgimageIdGenerator", sequenceName="cgimageIdGenerator", allocationSize=100)
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator="cgimageIdGenerator")
    private Long cgImageId;

    @Column(name="name")
    private String name;
    @Lob
    @Column(name="cgimagefile")
    private byte[] cgImagefile;

    @CreationTimestamp
    @Column(name="creationdatedime")
    private LocalDateTime creationDateTime;

    @Column(name="type")
    private String type;

    @Column(name = "id")
    private Long id;

    @Column(name = "cgimagetype")
    private String cgImageType;

    @Column(name ="status")
    private  String status;

    @Column(name="cgimagename")
    private  String cgImagename;

    @Column(name="updatedatedime")
    @UpdateTimestamp
    private LocalDateTime updateDateTime;
}

