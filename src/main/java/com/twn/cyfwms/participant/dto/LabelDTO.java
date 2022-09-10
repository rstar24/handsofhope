package com.twn.cyfwms.participant.dto;

import lombok.*;

@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
public class LabelDTO {
  @Getter
  private Long id;

  @Getter
  private String tag;

  @Getter
  private String value;
}
