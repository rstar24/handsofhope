package com.twn.cyfwms.participant.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@AllArgsConstructor
@Entity
@Data
@NoArgsConstructor
@Table(name = "cyfmsLabels")
public class Label implements Serializable {
  @Column(updatable = false, nullable = false)
  @Getter
  @Id
  private long id;

  @Column(updatable = false, nullable = false)
  @Getter
  private String page;

  @Column(updatable = false, nullable = false)
  @Getter
  private String tag;

  @Column(updatable = false, nullable = false)
  @Getter
  private String value;
}
