package com.twn.cyfwms.CulturalProgram.entity;

import java.time.LocalDateTime;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name="cpa_attachments")
public class AttachmentEntity {
  @Id
  @Column(name="culturalprogimageid", nullable=false)
  @SequenceGenerator(name="culturalprogimageIdGenerator", sequenceName="culturalprogimageIdGenerator", allocationSize=100)
  @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="culturalprogimageIdGenerator")
  private Long culturalProgImageId;

  private String name;

  @Column(name="culturamimagefile")
  @Lob
  private byte[] culturamImagefile;

  @Column(name="creationdatedime")
  @CreationTimestamp
  private LocalDateTime creationDateTime;

  private String type;

  @Column(name = "culturalprogramid")
  private Long culturalProgramId;

  @Column(name = "culturamimagetype")
  private String culturalImageType;

  private  String status;

  @Column(name="culturalimagename")
  private  String culturalimagename;

  @Column(name="updatedatedime")
  @UpdateTimestamp
  private LocalDateTime updateDateTime;
}
